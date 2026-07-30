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

// REST API: Get Restaurant Info
app.get('/api/restaurant', async (req, res) => {
  try {
    const restaurant = await prisma.restaurant.findFirst();
    if (!restaurant) {
      return res.json({
        name: 'LUMIÈRE',
        subtitle: 'Gourmet Digital Menu',
        heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        openHours: 'Open Today: 11:30 AM - 11:00 PM',
        address: 'Bole Road, Addis Ababa',
        wifiName: 'LumiereGuest',
        wifiPass: 'Lumiere2026'
      });
    }
    res.json(restaurant);
  } catch (err) {
    console.warn('Prisma query warning, serving fallback restaurant data:', err.message);
    res.json({
      name: 'LUMIÈRE',
      subtitle: 'Gourmet Digital Menu',
      openHours: 'Open Today: 11:30 AM - 11:00 PM',
      address: 'Bole Road, Addis Ababa'
    });
  }
});

// REST API: Get Categories & Menu Items from PostgreSQL via Prisma
app.get('/api/menu', async (req, res) => {
  const lang = getLangEnum(req.query.lang);
  
  try {
    // 1. Fetch Categories with requested translation
    const categoriesDb = await prisma.category.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        translations: {
          where: { language: lang }
        }
      }
    });

    // 2. Fetch Menu Items with requested translation
    const itemsDb = await prisma.menuItem.findMany({
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

    // Format output
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
        dietary: item.dietaryTags,
        image: item.image,
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
    console.warn('Prisma DB query fallback:', err.message);

    // Fallback formatting from menuData.js
    const langKey = (req.query.lang || 'en').toLowerCase();

    const formattedCategories = FALLBACK_CATEGORIES.map(c => ({
      id: c.id,
      icon: c.icon,
      title: c.title[langKey] || c.title.en
    }));

    const formattedItems = FALLBACK_MENU.map(item => ({
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
    console.warn('PostgreSQL feedback creation fallback:', err.message);
    res.json({
      success: true,
      message: 'Feedback logged in fallback mode',
      feedback: { rating, guestName, comment, tableNumber }
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', database: 'postgresql', prisma: 'connected' });
  } catch (err) {
    res.json({ status: 'ok', database: 'standalone-mode', message: err.message });
  }
});

// Catch-all route to serve SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Lumière Digital Menu platform running on http://localhost:${PORT}`);
});
