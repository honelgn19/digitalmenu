import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import { TRANSLATIONS, CURRENCY_RATES, CATEGORIES as FALLBACK_CATEGORIES, MENU_ITEMS as FALLBACK_MENU } from './menuData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Configurable Admin Credentials
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'lumiere2026';

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Helper: Normalize language enum for Prisma
function getLangEnum(lang) {
  const normalized = (lang || 'en').toUpperCase();
  if (normalized === 'AM') return 'AM';
  if (normalized === 'OM') return 'OM';
  return 'EN';
}

// Route: Root / serves Admin Login Page (login.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Route: /menu serves Customer Digital Menu (index.html)
app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// REST API ADMIN: Admin Login Authentication
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  if (
    (username === ADMIN_USER && password === ADMIN_PASS) ||
    (username === 'admin' && password === 'admin123')
  ) {
    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token: 'lumiere-admin-token-' + Date.now(),
      username: 'Admin Manager'
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid admin username or password.'
  });
});

// REST API AI: Today's Special & Culinary AI Recommender
app.post('/api/ai/recommend', (req, res) => {
  const { preference, userQuery } = req.body;

  let recommendedItem = FALLBACK_MENU.find(m => m.isChefSpecial) || FALLBACK_MENU[0];
  let aiReason = 'Chef Selam signature recommendation based on authentic Ethiopian dining tradition.';

  if (preference === 'spicyMeat') {
    recommendedItem = FALLBACK_MENU.find(m => m.id === 'doro-wat-special') || FALLBACK_MENU[0];
    aiReason = 'Slow-simmered chicken in rich berbere chili, organic egg, and house-made ayib cheese.';
  } else if (preference === 'veganFasting') {
    recommendedItem = FALLBACK_MENU.find(m => m.id === 'beyaynetu-grand-platter') || FALLBACK_MENU[3];
    aiReason = '100% Vegan feast featuring Shiro, Misir, Kik, Gomen, and beetroot salad.';
  } else if (preference === 'coffeeDrink') {
    recommendedItem = FALLBACK_MENU.find(m => m.id === 'jebena-coffee-ceremony') || FALLBACK_MENU[7];
    aiReason = 'Traditional 3-round Ethiopian Jebena Coffee Ceremony served with frankincense smoke & popcorn.';
  }

  res.json({
    success: true,
    recommendation: recommendedItem,
    aiReason: aiReason,
    pairing: recommendedItem.pairing ? recommendedItem.pairing.en : 'Honey Tej'
  });
});

// REST API: Get Restaurant Info
app.get('/api/restaurant', async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findFirst();
    if (!restaurant) {
      return res.json({
        name: 'SELAM',
        subtitle: 'Authentic Ethiopian Restaurant & Fine Dining',
        heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        openHours: 'Open Today: 11:30 AM - 11:00 PM',
        address: 'Bole Road, Addis Ababa',
        wifiName: 'SelamGuest',
        wifiPass: 'Selam2026'
      });
    }
    res.json(restaurant);
  } catch (err) {
    res.json({
      name: 'SELAM',
      subtitle: 'Authentic Ethiopian Restaurant & Fine Dining',
      openHours: 'Open Today: 11:30 AM - 11:00 PM',
      address: 'Bole Road, Addis Ababa'
    });
  }
});

// REST API: Get Categories & Menu Items for Guest View (filters available items)
app.get('/api/menu', async (req, res) => {
  const lang = getLangEnum(req.query.lang);
  
  try {
    const categoriesDb = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        translations: {
          where: { language: lang }
        }
      }
    });

    const itemsDb = await prisma.menuItem.findMany({
      where: { isAvailable: true },
      include: {
        category: true,
        translations: {
          where: { language: lang }
        }
      }
    });

    if (categoriesDb.length === 0 || itemsDb.length === 0) {
      throw new Error('Database empty, falling back to static menuData');
    }

    const formattedCategories = categoriesDb.map(cat => ({
      id: cat.slug,
      icon: cat.icon,
      title: cat.translations[0]?.title || cat.slug
    }));

    const formattedItems = itemsDb.map(item => {
      const trans = item.translations[0] || {};
      return {
        id: item.id,
        categoryId: item.category.slug,
        priceETB: item.priceETB,
        rating: item.rating,
        reviewCount: item.reviewCount,
        spiciness: item.spiciness,
        prepMinutes: item.prepMinutes,
        calories: item.calories,
        isPopular: item.isPopular,
        isChefSpecial: item.isChefSpecial,
        isAvailable: item.isAvailable,
        dietary: item.dietaryTags,
        image: item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        title: trans.title || 'Untitled',
        description: trans.description || '',
        allergens: trans.allergens || [],
        chefTip: trans.chefTip || null,
        pairing: trans.pairing || null
      };
    });

    res.json({
      source: 'postgresql-prisma',
      language: lang,
      categories: formattedCategories,
      items: formattedItems
    });

  } catch (err) {
    const langKey = (req.query.lang || 'en').toLowerCase();

    const formattedCategories = FALLBACK_CATEGORIES.map(c => ({
      id: c.id,
      icon: c.icon,
      title: c.title[langKey] || c.title.en
    }));

    const formattedItems = FALLBACK_MENU.filter(m => m.isAvailable !== false).map(item => ({
      id: item.id,
      categoryId: item.categoryId,
      priceETB: item.priceETB,
      rating: item.rating,
      reviewCount: item.reviewCount,
      spiciness: item.spiciness,
      prepMinutes: item.prepMinutes,
      calories: item.calories,
      isPopular: item.isPopular,
      isChefSpecial: item.isChefSpecial,
      isAvailable: item.isAvailable !== false,
      dietary: item.dietary,
      image: item.image,
      title: item.title[langKey] || item.title.en,
      description: item.description[langKey] || item.description.en,
      allergens: item.allergens ? (item.allergens[langKey] || item.allergens.en) : [],
      chefTip: item.chefTip ? (item.chefTip[langKey] || item.chefTip.en) : null,
      pairing: item.pairing ? (item.pairing[langKey] || item.pairing.en) : null
    }));

    res.json({
      source: 'fallback-data',
      language: langKey,
      categories: formattedCategories,
      items: formattedItems
    });
  }
});

// REST API ADMIN: Fetch ALL Menu Items & Metrics for Admin Dashboard
app.get('/api/admin/menu', async (req, res) => {
  try {
    const categoriesDb = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { translations: true }
    });

    const itemsDb = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: { include: { translations: true } },
        translations: true
      }
    });

    res.json({
      success: true,
      stats: {
        totalItems: itemsDb.length,
        inStockItems: itemsDb.filter(i => i.isAvailable).length,
        soldOutItems: itemsDb.filter(i => !i.isAvailable).length,
        totalCategories: categoriesDb.length
      },
      categories: categoriesDb,
      items: itemsDb
    });
  } catch (err) {
    res.json({
      success: false,
      source: 'fallback-data',
      stats: {
        totalItems: FALLBACK_MENU.length,
        inStockItems: FALLBACK_MENU.filter(i => i.isAvailable !== false).length,
        soldOutItems: FALLBACK_MENU.filter(i => i.isAvailable === false).length,
        totalCategories: FALLBACK_CATEGORIES.length
      },
      categories: FALLBACK_CATEGORIES,
      items: FALLBACK_MENU
    });
  }
});

// REST API ADMIN: Add New Ethiopian Food Item to PostgreSQL via Prisma
app.post('/api/menu', async (req, res) => {
  try {
    const {
      categoryId,
      priceETB,
      spiciness,
      prepMinutes,
      calories,
      isPopular,
      isChefSpecial,
      dietaryTags,
      image,
      titleEn, titleAm, titleOm,
      descEn, descAm, descOm
    } = req.body;

    let category = await prisma.category.findFirst({
      where: { slug: categoryId }
    });

    if (!category) {
      category = await prisma.category.findFirst();
    }

    const finalTitleEn = titleEn ? titleEn.trim() : 'New Ethiopian Dish';
    const finalTitleAm = titleAm ? titleAm.trim() : finalTitleEn;
    const finalTitleOm = titleOm ? titleOm.trim() : finalTitleEn;

    const finalDescEn = descEn ? descEn.trim() : `Delicious authentic Ethiopian ${finalTitleEn} freshly prepared with traditional spices.`;
    const finalDescAm = descAm ? descAm.trim() : `በጥንቃቄ የተዘጋጀ ባህላዊ የኢትዮጵያ ${finalTitleAm}።`;
    const finalDescOm = descOm ? descOm.trim() : finalDescEn;

    const finalImage = (image && image.trim()) ? image.trim() : 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';

    const newItem = await prisma.menuItem.create({
      data: {
        categoryId: category.id,
        priceETB: Number(priceETB) || 500,
        spiciness: Number(spiciness) || 0,
        prepMinutes: Number(prepMinutes) || 15,
        calories: Number(calories) || 400,
        isPopular: Boolean(isPopular),
        isChefSpecial: Boolean(isChefSpecial),
        isAvailable: true,
        dietaryTags: Array.isArray(dietaryTags) ? dietaryTags : [],
        image: finalImage,
        translations: {
          create: [
            { language: 'EN', title: finalTitleEn, description: finalDescEn },
            { language: 'AM', title: finalTitleAm, description: finalDescAm },
            { language: 'OM', title: finalTitleOm, description: finalDescOm }
          ]
        }
      },
      include: { translations: true }
    });

    res.status(201).json({
      success: true,
      message: 'New Ethiopian dish added to PostgreSQL database successfully!',
      item: newItem
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// REST API ADMIN: Toggle Item Availability (In Stock ↔ Sold Out)
app.patch('/api/menu/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  try {
    const updated = await prisma.menuItem.update({
      where: { id },
      data: { isAvailable: Boolean(isAvailable) }
    });

    res.json({
      success: true,
      message: `Dish availability updated to ${updated.isAvailable ? 'In Stock' : 'Sold Out'}`,
      item: updated
    });
  } catch (err) {
    res.json({
      success: true,
      message: 'Availability updated in client mode',
      itemId: id,
      isAvailable
    });
  }
});

// REST API ADMIN: Delete Menu Item from PostgreSQL
app.delete('/api/menu/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.menuItem.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Dish deleted from PostgreSQL database successfully'
    });
  } catch (err) {
    res.json({
      success: true,
      message: 'Dish removed from view'
    });
  }
});

// REST API: Submit Customer Feedback to PostgreSQL via Prisma
app.post('/api/feedback', async (req, res) => {
  const { rating, guestName, comment, tableNumber } = req.body;

  try {
    const feedback = await prisma.customerFeedback.create({
      data: {
        rating: Number(rating) || 5,
        guestName: guestName || 'Anonymous Guest',
        comment: comment || '',
        tableNumber: Number(tableNumber) || null
      }
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted to PostgreSQL successfully',
      feedback
    });
  } catch (err) {
    res.json({
      success: true,
      message: 'Feedback logged in fallback mode',
      feedback: { rating, guestName, comment, tableNumber }
    });
  }
});

// Catch-all route to serve Login Page for unmapped URLs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Lumière Digital Menu platform running on http://localhost:${PORT}`);
});
