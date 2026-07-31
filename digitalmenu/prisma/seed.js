import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed for SELAM Restaurant...');

  // 1. Clean existing records
  await prisma.customerFeedback.deleteMany();
  await prisma.menuItemTranslation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.categoryTranslation.deleteMany();
  await prisma.category.deleteMany();
  await prisma.restaurant.deleteMany();

  // 2. Create Restaurant Record
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'SELAM',
      subtitle: 'Authentic Ethiopian Restaurant & Fine Dining',
      heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
      openHours: 'Open Today: 11:30 AM - 11:00 PM',
      address: 'Bole Road, Addis Ababa',
      wifiName: 'SelamGuest',
      wifiPass: 'Selam2026'
    }
  });

  console.log('✅ Created Restaurant:', restaurant.name);

  // 3. Create Categories
  const catMains = await prisma.category.create({
    data: {
      slug: 'traditional-mains',
      icon: '🍲',
      sortOrder: 1,
      translations: {
        create: [
          { language: 'EN', title: 'Traditional Meat Mains' },
          { language: 'AM', title: 'የስጋ ምግቦች' },
          { language: 'OM', title: 'Nyaata Foonii Aadaa' }
        ]
      }
    }
  });

  const catVeggie = await prisma.category.create({
    data: {
      slug: 'veggie-fasting',
      icon: '🥗',
      sortOrder: 2,
      translations: {
        create: [
          { language: 'EN', title: 'Fasting & Vegan Specials' },
          { language: 'AM', title: 'የጾም ምግቦች' },
          { language: 'OM', title: 'Nyaata Soomaa & Veegaan' }
        ]
      }
    }
  });

  const catStarters = await prisma.category.create({
    data: {
      slug: 'starters',
      icon: '🥣',
      sortOrder: 3,
      translations: {
        create: [
          { language: 'EN', title: 'Starters & Breakfast' },
          { language: 'AM', title: 'ቁርስና መክሰስ' },
          { language: 'OM', title: 'Ciree fi Qophii' }
        ]
      }
    }
  });

  const catDrinks = await prisma.category.create({
    data: {
      slug: 'desserts-drinks',
      icon: '☕',
      sortOrder: 4,
      translations: {
        create: [
          { language: 'EN', title: 'Coffee Ceremony & Drinks' },
          { language: 'AM', title: 'ቡናና መጠጦች' },
          { language: 'OM', title: 'Buna Aadaa & Dhugaatii' }
        ]
      }
    }
  });

  console.log('✅ Created Categories');

  // 4. Create Menu Items
  await prisma.menuItem.create({
    data: {
      categoryId: catMains.id,
      priceETB: 950,
      rating: 4.9,
      reviewCount: 142,
      spiciness: 3,
      prepMinutes: 25,
      calories: 680,
      isPopular: true,
      isChefSpecial: true,
      isAvailable: true,
      dietaryTags: ['halal'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Royal Doro Wat (ልዩ ዶሮ ወጥ)',
            description: 'Slow-simmered tender chicken leg cooked in berbere spice, served with hard-boiled egg, ayib cottage cheese, and teff injera.',
            allergens: ['Eggs', 'Dairy (Ayib)', 'Gluten (Injera)'],
            chefTip: 'Best enjoyed by pairing each bite of doro wat with cool house-made ayib.',
            pairing: 'House Tej (Ethiopian Honey Wine)'
          },
          {
            language: 'AM',
            title: 'ልዩ የዶሮ ወጥ በአይብና በእንቁላል',
            description: 'በበሰለ በርበሬና ቅቤ በዝግታ የተሰራ የዶሮ ወጥ ከቀነበሰ እንቁላልና አይብ ጋር ከጥሩ እንጀራ ጋር ይቀርባል።',
            allergens: ['እንቁላል', 'አይብ', 'እንጀራ'],
            chefTip: 'የዶሮ ወጡን ቃሪያ ከለሰለሰው አይብ ጋር አጣጥመው ይመገቡ።',
            pairing: 'የቤት ውስጥ ንጹህ ማር ጠጅ'
          },
          {
            language: 'OM',
            title: 'Doro Wat Addaa (Kukkuuu Aadaa)',
            description: 'Foon lukuu barbaree aadaatiin suuta leemmanfame, kuuphee haaraa fi ayib wajjin injeraa haaraarratti dhihaata.',
            allergens: ['Hanqaaquu', 'Ayib', 'Injeraa'],
            chefTip: 'Mi\'aawina barbaree ayib qabbanaawaa wajjin makanii nyaachuun mi\'aa addaa kenne.',
            pairing: 'Daadhii Dammaa Aadaa'
          }
        ]
      }
    }
  });

  await prisma.menuItem.create({
    data: {
      categoryId: catMains.id,
      priceETB: 890,
      rating: 4.8,
      reviewCount: 118,
      spiciness: 2,
      prepMinutes: 15,
      calories: 720,
      isPopular: true,
      isChefSpecial: true,
      isAvailable: true,
      dietaryTags: ['halal', 'glutenFree'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Gurage Special Kitfo (ክትፎ)',
            description: 'Finely minced lean beef seasoned with niter kibbeh butter, mitmita chili pepper, and korarima spice, served with gomen spinach and ayib cheese.',
            allergens: ['Dairy (Kibbeh Butter)', 'Beef'],
            chefTip: 'Specify your cooking preference: Raw (Tire), Medium Rare (Lebleb), or Well Done (Wotet).',
            pairing: 'St. George Premium Lager or Honey Tej'
          },
          {
            language: 'AM',
            title: 'የጉራጌ ልዩ ክትፎ በጎመንና በአይብ',
            description: 'በጥንቃቄ የተከተፈስጋ በሚጥሚጣና በሚጣፈጥ የለሰለሰ ቅቤ ተለውሶ ከጎመንና ከለስላሳ አይብ ጋር ይቀርባል።',
            allergens: ['ቅቤ', 'የበሬ ስጋ'],
            chefTip: 'እንደ ምርጫዎ ጥሬ፣ ለብለብ ወይም የበሰለ ብለው ይዘዙ።',
            pairing: 'ቅዱስ ጊዮርጊስ ቢራ ወይም ንጹህ ጠጅ'
          },
          {
            language: 'OM',
            title: 'Kitfoo Gurragee Addaa',
            description: 'Foon loonii bulchaan mitmiitaa fi niter kibbeh kornii wajjin waadame, goomana fi ayib wajjin dhihaata.',
            allergens: ['Kibbeh', 'Foon Loonii'],
            chefTip: 'Dhaala keessan: Dheedhi, Lebleb ykn Well Done jennee qopheessina.',
            pairing: 'Biraa St. George ykn Daadhii Dammaa'
          }
        ]
      }
    }
  });

  await prisma.menuItem.create({
    data: {
      categoryId: catVeggie.id,
      priceETB: 720,
      rating: 5.0,
      reviewCount: 210,
      spiciness: 1,
      prepMinutes: 12,
      calories: 520,
      isPopular: true,
      isChefSpecial: true,
      isAvailable: true,
      dietaryTags: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Grand Yetsom Beyaynetu (ልዩ የጾም በያይነቱ)',
            description: 'Vibrant feast of plant-based dishes: Shiro wot, Misir red lentil stew, Kik yellow split peas, Gomen collard greens, Atkilt wot, and beetroot salad.',
            allergens: ['Legumes (Lentils, Chickpeas)'],
            chefTip: '100% Vegan & Fasting friendly, loaded with fiber and authentic herbs.',
            pairing: 'Fresh Passionfruit Juice'
          },
          {
            language: 'AM',
            title: 'ልዩ የጾም በያይነቱ ከሽንብራ፣ ምስርና አትክልት ጋር',
            description: 'በቀይና በቢጫ ምስር፣ በሽሮ፣ በጎመን፣ በጥቅል ጎመንና በቀይ ስር ያሸበረቀ ባህላዊ የጾም በያይነቱ።',
            allergens: ['ምስርና ሽንብራ'],
            chefTip: '100% የቪጋንና የጾም ምግብ፣ በፕሮቲንና በፋይበር የበለጸገ።',
            pairing: 'የተፈጥሮ ፓሽን ፍሩት ጁስ'
          },
          {
            language: 'OM',
            title: 'Beyaynetu Soomaa Addaa',
            description: 'Nyaata biqiltuu aadaa: Shiroo, Misira diimaa, Kik wallagaa, Goomana, Atkil tii fi Beetroot wajjin injeraarratti dhihaata.',
            allergens: ['Misira fi Shamburaa'],
            chefTip: '100% Veegaanii fi Soomaa, nyaata fayyaalessa.',
            pairing: 'Juusii Paashinii Haaraa'
          }
        ]
      }
    }
  });

  await prisma.menuItem.create({
    data: {
      categoryId: catDrinks.id,
      priceETB: 350,
      rating: 5.0,
      reviewCount: 310,
      spiciness: 0,
      prepMinutes: 20,
      calories: 80,
      isPopular: true,
      isChefSpecial: true,
      isAvailable: true,
      dietaryTags: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Full Ethiopian Coffee Ceremony (የጀበና ቡና ስነ-ስርዓት)',
            description: 'Authentic 3-round Ethiopian coffee ceremony brewed in a traditional clay jebena pot, served with frankincense smoke and fresh popcorn.',
            allergens: ['None'],
            chefTip: 'Includes 3 rounds of coffee: Abol (1st round), Tona (2nd round), and Bereka (3rd round).',
            pairing: 'Fresh Roasted Popcorn & Tenadam Herbs'
          },
          {
            language: 'AM',
            title: 'ሙሉ የጀበና ቡና ስነ-ስርዓት በእጣንና በፖፕኮርን',
            description: 'በጀበና የተፈሉ 3 ዙር ቡናዎች (አቦል፣ ቶና፣ በረካ) ከዕጣን፣ ከጤናዳም እና ከፖፕኮርን ጋር የሚቀርብ።',
            allergens: ['የለም'],
            chefTip: '3ቱን ዙሮች (አቦል፣ ቶና፣ በረካ) ተራ በተራ ያጣጥሙ።',
            pairing: 'ፈንድሻና ጤናዳም'
          },
          {
            language: 'OM',
            title: 'Sirna Buna Jebenaa Guutuu',
            description: 'Buna jebenaa aadaa marsaa 3 (Abol, Tona, Bereka) iitana, popcorn fi tenadam wajjin dhihaata.',
            allergens: ['Homaa'],
            chefTip: 'Marsaa 3n bunaa: Abol, Tona fi Bereka dhandhamaa.',
            pairing: 'Popcorn fi Tenadam'
          }
        ]
      }
    }
  });

  console.log('✅ Created Menu Items with Multi-Language Translations for Selam Restaurant');
  console.log('🎉 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
