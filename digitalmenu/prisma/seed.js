import { PrismaClient } from '@prisma/client';
import { CATEGORIES, MENU_ITEMS } from '../menuData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding PostgreSQL database with Prisma ORM...');

  // 1. Seed Restaurant Settings
  await prisma.restaurant.deleteMany();
  await prisma.restaurant.create({
    data: {
      name: 'LUMIÈRE',
      subtitle: 'Gourmet Digital Menu',
      heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      openHours: 'Open Today: 11:30 AM - 11:00 PM',
      address: 'Bole Road, Addis Ababa',
      wifiName: 'LumiereGuest',
      wifiPass: 'Lumiere2026'
    }
  });

  // 2. Clean existing data
  await prisma.categoryTranslation.deleteMany();
  await prisma.menuItemTranslation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.customerFeedback.deleteMany();

  // 3. Seed Categories & Translations (EN, AM, OM)
  const categoryMap = new Map();

  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    const createdCat = await prisma.category.create({
      data: {
        slug: cat.id,
        icon: cat.icon,
        sortOrder: i + 1,
        translations: {
          create: [
            { language: 'EN', title: cat.title.en },
            { language: 'AM', title: cat.title.am },
            { language: 'OM', title: cat.title.om }
          ]
        }
      }
    });
    categoryMap.set(cat.id, createdCat.id);
  }
  console.log(`✅ Seeded ${CATEGORIES.length} Categories with EN, AM, OM translations.`);

  // 4. Seed Menu Items & Translations (EN, AM, OM)
  for (const item of MENU_ITEMS) {
    const categoryDbId = categoryMap.get(item.categoryId);
    if (!categoryDbId) continue;

    await prisma.menuItem.create({
      data: {
        categoryId: categoryDbId,
        priceETB: item.priceETB,
        rating: item.rating,
        reviewCount: item.reviewCount,
        spiciness: item.spiciness,
        prepMinutes: item.prepMinutes,
        calories: item.calories,
        isPopular: item.isPopular,
        isChefSpecial: item.isChefSpecial,
        dietaryTags: item.dietary,
        image: item.image,
        translations: {
          create: [
            {
              language: 'EN',
              title: item.title.en,
              description: item.description.en,
              allergens: item.allergens?.en || [],
              chefTip: item.chefTip?.en || null,
              pairing: item.pairing?.en || null
            },
            {
              language: 'AM',
              title: item.title.am,
              description: item.description.am,
              allergens: item.allergens?.am || [],
              chefTip: item.chefTip?.am || null,
              pairing: item.pairing?.am || null
            },
            {
              language: 'OM',
              title: item.title.om,
              description: item.description.om,
              allergens: item.allergens?.om || [],
              chefTip: item.chefTip?.om || null,
              pairing: item.pairing?.om || null
            }
          ]
        }
      }
    });
  }

  console.log(`✅ Seeded ${MENU_ITEMS.length} Menu Items with full multi-language translations into PostgreSQL.`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
