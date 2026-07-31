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

  const catSeafood = await prisma.category.create({
    data: {
      slug: 'seafood',
      icon: '🐟',
      sortOrder: 4,
      translations: {
        create: [
          { language: 'EN', title: 'Fish & Seafood' },
          { language: 'AM', title: 'የዓሳ ምግቦች' },
          { language: 'OM', title: 'Nyaata Qurxummii' }
        ]
      }
    }
  });

  const catDrinks = await prisma.category.create({
    data: {
      slug: 'desserts-drinks',
      icon: '☕',
      sortOrder: 5,
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

  // 4. Create Menu Items with Unique Dish Images
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
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
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
      categoryId: catMains.id,
      priceETB: 850,
      rating: 4.9,
      reviewCount: 96,
      spiciness: 2,
      prepMinutes: 18,
      calories: 610,
      isPopular: true,
      isChefSpecial: false,
      isAvailable: true,
      dietaryTags: ['halal'],
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Sizzling Beef Shekla Tibs (ሽክላ ጥብስ)',
            description: 'Sautéed tender beef tenderloin cubes cooked on a traditional clay burner with sliced red onions, garlic, fresh rosemary, and green jalapeño peppers.',
            allergens: ['Beef', 'Gluten (Injera)'],
            chefTip: 'Poured hot on a sizzling clay burner with charcoal beneath.',
            pairing: 'Habesha Cold Beer'
          },
          {
            language: 'AM',
            title: 'የሸክላ የበሬ ጥብስ በቃሪያና በሽንኩርት',
            description: 'በሸክላ ላይ በደመቀ እሳት የተጠበሰ የበሬ ስጋ በሽንኩርት፣ በነጭ ሽንኩርትና በቃሪያ ተራይቶ የሚቀርብ።',
            allergens: ['የበሬ ስጋ', 'እንጀራ'],
            chefTip: 'በሸክላው ፍም እሳት ላይ ትኩሱን ተመገቡ።',
            pairing: 'ሐበሻ ቀዝቃዛ ቢራ'
          },
          {
            language: 'OM',
            title: 'Tibsi Foon Loonii Sheklaa',
            description: 'Foon loonii lallaafaan sheklaa aadaa irratti shunkurtii diimaa, qullubbii adii fi qorii jalapeño wajjin waadame.',
            allergens: ['Foon Loonii', 'Injeraa'],
            chefTip: 'Gubbaa sheklaa oo\'aa irratti dhihaata.',
            pairing: 'Biraa Qabbanaawaa Habesha'
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
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
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
      categoryId: catVeggie.id,
      priceETB: 580,
      rating: 4.8,
      reviewCount: 165,
      spiciness: 2,
      prepMinutes: 15,
      calories: 450,
      isPopular: true,
      isChefSpecial: false,
      isAvailable: true,
      dietaryTags: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Clay Pot Shiro Tegabino (ተጋቢኖ ሽሮ)',
            description: 'Rich, bubbling chickpea flour stew spiced with berbere, garlic, and herbs, served bubbling hot in an authentic clay pot with teff injera.',
            allergens: ['Chickpea Flour'],
            chefTip: 'Add a touch of spiced niter kibbeh or olive oil for extra richness.',
            pairing: 'Traditional Spiced Black Tea'
          },
          {
            language: 'AM',
            title: 'በትኩስ የሸክላ ድስት የሚፈካ የትጋቢኖ ሽሮ',
            description: 'በሽንብራ ዱቄትና በበርበሬ ተክክሎ በሸክላ ድስት ውስጥ እየተከተከተ ትኩሱን የሚቀርብ ጣፋጭ ሽሮ።',
            allergens: ['የሽንብራ ዱቄት'],
            chefTip: 'የለሰለሰ ቅቤ ወይም የወይራ ዘይት በመጨመር ጣዕሙን ያጎልብቱ።',
            pairing: 'የቅመም ሻይ'
          },
          {
            language: 'OM',
            title: 'Shiroo Tegabinoo Sheklaa',
            description: 'Shiroo shamburaa barbaree fi qullubbii adii wajjin danfe, sheklaa aadaa keessatti injeraa teffii wajjin dhihaata.',
            allergens: ['Daakuu Shamburaa'],
            chefTip: 'Zeyitii uumaa ykn Kibbeh itti dabaluun mi\'aa dabala.',
            pairing: 'Shaayee Qorichaa Aadaa'
          }
        ]
      }
    }
  });

  await prisma.menuItem.create({
    data: {
      categoryId: catStarters.id,
      priceETB: 520,
      rating: 4.9,
      reviewCount: 88,
      spiciness: 1,
      prepMinutes: 15,
      calories: 580,
      isPopular: true,
      isChefSpecial: false,
      isAvailable: true,
      dietaryTags: ['vegetarian', 'halal'],
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Special Chechebsa / Kita Firfir (ጨጨብሳ)',
            description: 'Shredded flatbread (kita) pan-fried with spiced niter kibbeh butter, berbere, served with a drizzle of organic Ethiopian honey and fresh ayib cheese.',
            allergens: ['Wheat (Kita)', 'Dairy (Kibbeh, Ayib)'],
            chefTip: 'The classic Ethiopian breakfast of Champions!',
            pairing: 'Jebena Buna (Ethiopian Coffee)'
          },
          {
            language: 'AM',
            title: 'ልዩ ጨጨብሳ በማርና በአይብ',
            description: 'የተቆራረሰ ቂጣ በበርበሬና በቅቤ ተጥብሶ በንጹህ ማርና በአይብ አጊጦ የሚቀርብ የቁርስ ምግብ።',
            allergens: ['ስንዴ', 'ቅቤና አይብ'],
            chefTip: 'ከጀበና ቡና ጋር የሚወሰድ ምርጥ ባህላዊ የቁርስ ምግብ።',
            pairing: 'የጀበና ቡና'
          },
          {
            language: 'OM',
            title: 'Chechebsaa Addaa (Kitaa Firfir)',
            description: 'Kitaa ciccite barbaree fi kibbeh niter wajjin waadame, damma aadaa fi ayib haaraa wajjin dhihaata.',
            allergens: ['Qamadii', 'Kibbeh fi Ayib'],
            chefTip: 'Ciree aadaa beekamaa!',
            pairing: 'Buna Jebenaa'
          }
        ]
      }
    }
  });

  await prisma.menuItem.create({
    data: {
      categoryId: catSeafood.id,
      priceETB: 780,
      rating: 4.7,
      reviewCount: 64,
      spiciness: 1,
      prepMinutes: 20,
      calories: 490,
      isPopular: false,
      isChefSpecial: true,
      isAvailable: true,
      dietaryTags: ['halal', 'glutenFree', 'nutFree'],
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Lake Tana Asa Tibs (የዓሳ ጥብስ)',
            description: 'Crispy cubed freshwater tilapia fillet sautéed with onions, garlic, fresh rosemary, black pepper, and lemon juice.',
            allergens: ['Fish (Tilapia)'],
            chefTip: 'Squeeze extra fresh lime over the hot fish cubes.',
            pairing: 'Chilled White Wine or Sparking Water'
          },
          {
            language: 'AM',
            title: 'የጣና ዓሳ ጥብስ በነጭ ሽንኩርትና በቃሪያ',
            description: 'ጥሩ የጣና ዓሳ በሽንኩርት፣ በነጭ ሽንኩርት፣ በሎሚና በቃሪያ ተጥብሶ የሚቀርብ።',
            allergens: ['ዓሳ'],
            chefTip: 'ትኩሱ ዓሳ ላይ ተጨማሪ የሎሚ ጭማቂ አፍስሰው ይመገቡ።',
            pairing: 'ቀዝቃዛ ነጭ ወይን ወይም ጋዝ ያለው ውኃ'
          },
          {
            language: 'OM',
            title: 'Tibsi Qurxummii Tana Addaa',
            description: 'Qurxummii haroo Tana lallaafaan shunkurtii, qullubbii adii fi lomiin waadame.',
            allergens: ['Qurxummii'],
            chefTip: 'Lomii haaraa gubbaa qurxummii oo\'aa irratti cobsaa.',
            pairing: 'Diini Adii Qabbanaawaa ykn Bishaan Gaazii'
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
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Full Ethiopian Coffee Ceremony (የጀበና ቡና ስነ-ስርዓት)',
            description: 'Authentic 3-round Ethiopian coffee ceremony brewed in a traditional clay jebena pot, served with frankincense smoke and fresh popcorn.',
            allergens: ['None'],
            chefTip: 'Includes 3 rounds of coffee: Abol, Tona, and Bereka.',
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

  await prisma.menuItem.create({
    data: {
      categoryId: catDrinks.id,
      priceETB: 450,
      rating: 4.9,
      reviewCount: 175,
      spiciness: 0,
      prepMinutes: 5,
      calories: 210,
      isPopular: true,
      isChefSpecial: false,
      isAvailable: true,
      dietaryTags: ['glutenFree', 'halal', 'nutFree'],
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      translations: {
        create: [
          {
            language: 'EN',
            title: 'Authentic Ethiopian Honey Tej (የቤት ማር ጠጅ)',
            description: 'Traditional home-brewed honey wine fermented with gesho hops in an authentic Berele flask.',
            allergens: ['Alcohol (Honey Wine)'],
            chefTip: 'Served cold in a long-necked Berele glass.',
            pairing: 'Special Kitfo or Sizzling Beef Tibs'
          },
          {
            language: 'AM',
            title: 'የቤት ውስጥ ንጹህ የማር ጠጅ በብረሌ',
            description: 'በጌሾና በንጹህ ማር በቤት ውስጥ የተጠመቀ ባህላዊ የኢትዮጵያ ጠጅ በብረሌ የሚቀርብ።',
            allergens: ['አልኮል (ማር ጠጅ)'],
            chefTip: 'በቀዝቃዛ ብረሌ ተሞልቶ ይቀርባል።',
            pairing: 'ልዩ ክትፎ ወይም የሸክላ ጥብስ'
          },
          {
            language: 'OM',
            title: 'Daadhii Dammaa Aadaa (Tej)',
            description: 'Daadhii dammaa aadaa geeshoo fi damma aadaatiin bokoke, berele keessatti dhihaata.',
            allergens: ['Alkoolii (Daadhii)'],
            chefTip: 'Berele qabbanaawaa keessatti dhihaata.',
            pairing: 'Kitfoo Addaa ykn Tibsi Sheklaa'
          }
        ]
      }
    }
  });

  console.log('✅ Created Menu Items with Unique Dish Images for Selam Restaurant');
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
