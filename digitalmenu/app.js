// Authentic Ethiopian Restaurant Dataset & Application Logic for SELAM Restaurant
export const RESTAURANT_INFO = {
  name: 'SELAM',
  subtitle: 'Authentic Ethiopian Restaurant & Fine Dining',
  heroImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  openHours: 'Open Today: 11:30 AM - 11:00 PM',
  address: 'Bole Road, Addis Ababa',
  wifiName: 'SelamGuest',
  wifiPass: 'Selam2026'
};

export const CURRENCY_RATES = {
  ETB: { symbol: 'Br', rate: 1.0, position: 'after' },
  USD: { symbol: '$', rate: 0.0078, position: 'before' },
  EUR: { symbol: '€', rate: 0.0072, position: 'before' },
  GBP: { symbol: '£', rate: 0.0061, position: 'before' }
};

export const TRANSLATIONS = {
  en: {
    brandName: 'SELAM',
    brandSubtitle: 'Authentic Ethiopian Cuisine',
    tableNotice: 'Universal Restaurant Table Menu',
    generalWelcome: 'Welcome to Selam Restaurant',
    openHours: 'Open Today: 11:30 AM - 11:00 PM',
    searchPlaceholder: 'Search Ethiopian stews, tibs, coffee...',
    allCategories: 'All Categories',
    mySelection: 'My Selection',
    clearAll: 'Clear All',
    shareMenu: 'Share Menu',
    leaveFeedback: 'Give Feedback',
    rateDish: 'Rate Your Dining Experience',
    submitFeedback: 'Submit Review',
    yourName: 'Your Name (Optional)',
    yourComment: 'Share your thoughts on taste & presentation...',
    feedbackSuccess: 'Thank you for your feedback!',
    selectionEmpty: 'Your selection is empty',
    selectionSubhead: 'Tap the 🔖 icon on any Ethiopian dish to save your selection.',
    prepTime: 'Prep Time',
    calories: 'Calories',
    allergens: 'Allergens & Ingredients',
    chefTip: 'Chef Signature Tip',
    recommendedPairing: 'Recommended Drink Pairing',
    printQr: 'Print QR Code',
    qrCodeTest: 'Universal Table QR Code',
    qrSubtitle: 'Print or display this single QR code on all restaurant tables.',
    soldOut: 'Sold Out',
    inStock: 'In Stock',
    filters: {
      vegan: '🌱 Vegan',
      vegetarian: '🥗 Fasting',
      glutenFree: '🌾 Gluten-Free',
      halal: '🥩 Halal',
      nutFree: '🥜 Nut-Free',
      spicy: '🌶️ Spicy'
    }
  },
  am: {
    brandName: 'ሰላም',
    brandSubtitle: 'ባህላዊ የኢትዮጵያ ምግብ ቤት',
    tableNotice: 'የሬስቶራንቱ ሁለንተናዊ የጠረጴዛ ሜኑ',
    generalWelcome: 'እንኳን ወደ ሰላም ባህላዊ ምግብ ቤት በደህና መጡ',
    openHours: 'ዛሬ ክፍት ነው፡ 5:30 ጠዋት - 5:00 ማታ',
    searchPlaceholder: 'ወጥ፡ ጥብስ፡ ቡና፡ መጠጥ ይፈልጉ...',
    allCategories: 'ሁሉም ዓይነቶች',
    mySelection: 'የመረጥኳቸው ምግቦች',
    clearAll: 'ሁሉንም አጽዳ',
    shareMenu: 'ሜኑ አጋራ',
    leaveFeedback: 'አስተያየት ይስጡ',
    rateDish: 'የምግብ ተሞክሮዎን ይገምግሙ',
    submitFeedback: 'አስተያየት ላክ',
    yourName: 'ስምዎ (አማራጭ)',
    yourComment: 'ስለ ምግቡ ጣዕምና አቀራረብ አስተያየትዎን ያካፍሉ...',
    feedbackSuccess: 'ስለ አስተያየትዎ እናመሰግናለን!',
    selectionEmpty: 'ምንም ምግብ አልመረጡም',
    selectionSubhead: 'የሚፈልጉትን ምግብ ለመምረጥ በምግቡ ላይ የሚገኘውን 🔖 ምልክት ይጫኑ።',
    prepTime: 'የዝግጅት ጊዜ',
    calories: 'ካሎሪ',
    allergens: 'የምግብ ይዘትና አለርጂ',
    chefTip: 'የሼፉ ልዩ ምክር',
    recommendedPairing: 'ተስማሚ መጠጥ',
    printQr: 'QR ኮድ አትም',
    qrCodeTest: 'የጠረጴዛ ሁለንተናዊ QR ኮድ',
    qrSubtitle: 'ይህንን አንድ QR ኮድ በማንኛውም የሬስቶራንቱ ጠረጴዛ ላይ ይጠቀሙ።',
    soldOut: 'አልቋል (ተሸጧል)',
    inStock: 'አለ',
    filters: {
      vegan: '🌱 የቪጋን',
      vegetarian: '🥗 የጾም',
      glutenFree: '🌾 ግሉተን-ነፃ',
      halal: '🥩 ሀላል',
      nutFree: '🥜 ለውዝ-ነፃ',
      spicy: '🌶️ ቃሪያ ያለው'
    }
  },
  om: {
    brandName: 'SELAM',
    brandSubtitle: 'Mana Nyaata Aadaa Itoophiyaa',
    tableNotice: 'Meenuu Gabatee Mana Nyaataa',
    generalWelcome: 'Baga gara Mana Nyaata Selam nagaan dhuftan',
    openHours: 'Banaadha: Waaree booda 5:30 - Halkan 5:00',
    searchPlaceholder: 'Wat, Tibsi, Buna barbaadaa...',
    allCategories: 'Gosa Hunda',
    mySelection: 'Filannoo Koo',
    clearAll: 'Hunda Haqi',
    shareMenu: 'Meenuu Qooddiin',
    leaveFeedback: 'Yaada Kenni',
    rateDish: 'Muuxannoo Nyaataa Madaali',
    submitFeedback: 'Yaada Ergi',
    yourName: 'Maqaa Keessan (Filannoo)',
    yourComment: 'Mijaawina dhandhamaa fi dhiyeessii irratti yaada kennai...',
    feedbackSuccess: 'Yaada keessaniif galatoomaa!',
    selectionEmpty: 'Filannoon keessan duudaadha',
    selectionSubhead: 'Nyaata filachuuf mallattoo 🔖 tuqaa.',
    prepTime: 'Yeroo Qophii',
    calories: 'Kaaloorii',
    allergens: 'Qabiyyee Nyaataa',
    chefTip: 'Gorsa Addaa Kookii',
    recommendedPairing: 'Dhugaatii Wajjin Deemu',
    printQr: 'QR Kodii Maxxansi',
    qrCodeTest: 'QR Kodii Gabatee Universal',
    qrSubtitle: 'Kodii QR kana gabatee mana nyaataa hunda irratti fayyadamaa.',
    soldOut: 'Dhumera',
    inStock: 'Jira',
    filters: {
      vegan: '🌱 Veegaanii',
      vegetarian: '🥗 Soomaa',
      glutenFree: '🌾 Gluten-Free',
      halal: '🥩 Halaal',
      nutFree: '🥜 Nut-Free',
      spicy: '🌶️ Mi\'aawaa'
    }
  }
};

export const FALLBACK_CATEGORIES = [
  {
    id: 'starters',
    icon: '🥣',
    title: { en: 'Starters & Breakfast', am: 'ቁርስና መክሰስ', om: 'Ciree fi Qophii' }
  },
  {
    id: 'traditional-mains',
    icon: '🍲',
    title: { en: 'Traditional Meat Mains', am: 'የስጋ ምግቦች', om: 'Nyaata Foonii Aadaa' }
  },
  {
    id: 'veggie-fasting',
    icon: '🥗',
    title: { en: 'Fasting & Vegan Specials', am: 'የጾም ምግቦች', om: 'Nyaata Soomaa & Veegaan' }
  },
  {
    id: 'seafood',
    icon: '🐟',
    title: { en: 'Fish & Seafood', am: 'የዓሳ ምግቦች', om: 'Nyaata Qurxummii' }
  },
  {
    id: 'desserts-drinks',
    icon: '☕',
    title: { en: 'Coffee Ceremony & Drinks', am: 'ቡናና መጠጦች', om: 'Buna Aadaa & Dhugaatii' }
  }
];

export const FALLBACK_MENU = [
  {
    id: 'doro-wat-special',
    categoryId: 'traditional-mains',
    priceETB: 950,
    rating: 4.9,
    reviewCount: 142,
    spiciness: 3,
    prepMinutes: 25,
    calories: 680,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Royal Doro Wat (ልዩ ዶሮ ወጥ)',
      am: 'ልዩ የዶሮ ወጥ በአይብና በእንቁላል',
      om: 'Doro Wat Addaa (Kukkuuu Aadaa)'
    },
    description: {
      en: 'Slow-simmered tender chicken leg cooked in aromatic berbere chili spice blend, served with hard-boiled organic egg, ayib cottage cheese, and freshly baked injera.',
      am: 'በበሰለ በርበሬና ቅቤ በዝግታ የተሰራ የዶሮ ወጥ ከቀነበሰ እንቁላልና አይብ ጋር ከጥሩ እንጀራ ጋር ይቀርባል።',
      om: 'Foon lukuu barbaree aadaatiin suuta leemmanfame, kuuphee haaraa fi ayib wajjin injeraa haaraarratti dhihaata.'
    },
    allergens: {
      en: ['Eggs', 'Dairy (Ayib)', 'Gluten (Injera)'],
      am: ['እንቁላል', 'አይብ', 'እንጀራ'],
      om: ['Hanqaaquu', 'Ayib', 'Injeraa']
    },
    chefTip: {
      en: 'Best enjoyed by pairing each bite of spicy doro wat with cool house-made ayib cottage cheese.',
      am: 'የዶሮ ወጡን ቃሪያ ከለሰለሰው አይብ ጋር አጣጥመው ይመገቡ።',
      om: 'Mi\'aawina barbaree ayib qabbanaawaa wajjin makanii nyaachuun mi\'aa addaa kenne.'
    },
    pairing: {
      en: 'House Tej (Traditional Ethiopian Honey Wine)',
      am: 'የቤት ውስጥ ንጹህ ማር ጠጅ',
      om: 'Daadhii Dammaa Aadaa'
    }
  },
  {
    id: 'special-kitfo',
    categoryId: 'traditional-mains',
    priceETB: 890,
    rating: 4.8,
    reviewCount: 118,
    spiciness: 2,
    prepMinutes: 15,
    calories: 720,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    dietary: ['halal', 'glutenFree'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Gurage Special Kitfo (ክትፎ)',
      am: 'የጉራጌ ልዩ ክትፎ በጎመንና በአይብ',
      om: 'Kitfoo Gurragee Addaa'
    },
    description: {
      en: 'Finely minced lean beef seasoned with clarified niter kibbeh butter, mitmita chili pepper, and korarima spice, served with gomen spinach and ayib cheese.',
      am: 'በጥንቃቄ የተከተፈስጋ በሚጥሚጣና በሚጣፈጥ የለሰለሰ ቅቤ ተለውሶ ከጎመንና ከለስላሳ አይብ ጋር ይቀርባል።',
      om: 'Foon loonii bulchaan mitmiitaa fi niter kibbeh kornii wajjin waadame, goomana fi ayib wajjin dhihaata.'
    },
    allergens: {
      en: ['Dairy (Kibbeh Butter)', 'Beef'],
      am: ['ቅቤ', 'የበሬ ስጋ'],
      om: ['Kibbeh', 'Foon Loonii']
    },
    chefTip: {
      en: 'Specify your cooking preference: Raw (Tire), Medium Rare (Lebleb), or Well Done (Wotet).',
      am: 'እንደ ምርጫዎ ጥሬ፣ ለብለብ ወይም የበሰለ ብለው ይዘዙ።',
      om: 'Dhaala keessan: Dheedhi (Tire), Lebleb akkasumas well done jennee qopheessina.'
    },
    pairing: {
      en: 'St. George Premium Lager or Honey Tej',
      am: 'ቅዱስ ጊዮርጊስ ቢራ ወይም ንጹህ ጠጅ',
      om: 'Biraa St. George ykn Daadhii Dammaa'
    }
  },
  {
    id: 'beef-tibs-sizzling',
    categoryId: 'traditional-mains',
    priceETB: 850,
    rating: 4.9,
    reviewCount: 96,
    spiciness: 2,
    prepMinutes: 18,
    calories: 610,
    isPopular: true,
    isChefSpecial: false,
    isAvailable: true,
    dietary: ['halal'],
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Sizzling Beef Shekla Tibs (ሽክላ ጥብስ)',
      am: 'የሸክላ የበሬ ጥብስ በቃሪያና በሽንኩርት',
      om: 'Tibsi Foon Loonii Sheklaa'
    },
    description: {
      en: 'Sautéed tender beef tenderloin cubes cooked on a traditional clay burner with sliced red onions, garlic, fresh rosemary, and green jalapeño peppers.',
      am: 'በሸክላ ላይ በደመቀ እሳት የተጠበሰ የበሬ ስጋ በሽንኩርት፣ በነጭ ሽንኩርትና በቃሪያ ተራይቶ የሚቀርብ።',
      om: 'Foon loonii lallaafaan sheklaa aadaa irratti shunkurtii diimaa, qullubbii adii fi qorii jalapeño wajjin waadame.'
    },
    allergens: {
      en: ['Beef', 'Gluten (Injera)'],
      am: ['የበሬ ስጋ', 'እንጀራ'],
      om: ['Foon Loonii', 'Injeraa']
    },
    chefTip: {
      en: 'Poured hot on a sizzling clay burner with charcoal beneath to keep every piece tender.',
      am: 'በሸክላው ፍም እሳት ላይ ትኩሱን ተመገቡ።',
      om: 'Gubbaa sheklaa oo\'aa irratti dhihaata.'
    },
    pairing: {
      en: 'Habesha Cold Beer',
      am: 'ሐበሻ ቀዝቃዛ ቢራ',
      om: 'Biraa Qabbanaawaa Habesha'
    }
  },
  {
    id: 'beyaynetu-grand-platter',
    categoryId: 'veggie-fasting',
    priceETB: 720,
    rating: 5.0,
    reviewCount: 210,
    spiciness: 1,
    prepMinutes: 12,
    calories: 520,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    dietary: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Grand Yetsom Beyaynetu (ልዩ የጾም በያይነቱ)',
      am: 'ልዩ የጾም በያይነቱ ከሽንብራ፣ ምስርና አትክልት ጋር',
      om: 'Beyaynetu Soomaa Addaa'
    },
    description: {
      en: 'Vibrant feast of plant-based dishes: Shiro wot chickpea stew, Misir red lentil stew, Kik yellow split peas, Gomen collard greens, Atkilt wot cabbage & carrots, and Beetroot salad.',
      am: 'በቀይና በቢጫ ምስር፣ በሽሮ፣ በጎመን፣ በጥቅል ጎመንና በቀይ ስር ያሸበረቀ ባህላዊ የጾም በያይነቱ።',
      om: 'Nyaata biqiltuu aadaa: Shiroo, Misira diimaa, Kik wallagaa, Goomana, Atkil tii fi Beetroot wajjin injeraarratti dhihaata.'
    },
    allergens: {
      en: ['Legumes (Lentils, Chickpeas)'],
      am: ['ምስርና ሽንብራ'],
      om: ['Misira fi Shamburaa']
    },
    chefTip: {
      en: '100% Vegan & Fasting friendly, loaded with fiber and authentic herbs.',
      am: '100% የቪጋንና የጾም ምግብ፣ በፕሮቲንና በፋይበር የበለጸገ።',
      om: '100% Veegaanii fi Soomaa, nyaata fayyaalessa.'
    },
    pairing: {
      en: 'Fresh Passionfruit Juice',
      am: 'የተፈጥሮ ፓሽን ፍሩት ጁስ',
      om: 'Juusii Paashinii Haaraa'
    }
  },
  {
    id: 'shiro-tegabino',
    categoryId: 'veggie-fasting',
    priceETB: 580,
    rating: 4.8,
    reviewCount: 165,
    spiciness: 2,
    prepMinutes: 15,
    calories: 450,
    isPopular: true,
    isChefSpecial: false,
    isAvailable: true,
    dietary: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Clay Pot Shiro Tegabino (ተጋቢኖ ሽሮ)',
      am: 'በትኩስ የሸክላ ድስት የሚፈካ የትጋቢኖ ሽሮ',
      om: 'Shiroo Tegabinoo Sheklaa'
    },
    description: {
      en: 'Rich, bubbling chickpea flour stew spiced with berbere, garlic, and herbs, served bubbling hot in an authentic clay pot with teff injera.',
      am: 'በሽንብራ ዱቄትና በበርበሬ ተክክሎ በሸክላ ድስት ውስጥ እየተከተከተ ትኩሱን የሚቀርብ ጣፋጭ ሽሮ።',
      om: 'Shiroo shamburaa barbaree fi qullubbii adii wajjin danfe, sheklaa aadaa keessatti injeraa teffii wajjin dhihaata.'
    },
    allergens: {
      en: ['Chickpea Flour'],
      am: ['የሽንብራ ዱቄት'],
      om: ['Daakuu Shamburaa']
    },
    chefTip: {
      en: 'Add a touch of spiced niter kibbeh or olive oil for extra richness.',
      am: 'የለሰለሰ ቅቤ ወይም የወይራ ዘይት በመጨመር ጣዕሙን ያጎልብቱ።',
      om: 'Zeyitii uumaa ykn Kibbeh itti dabaluun mi\'aa dabala.'
    },
    pairing: {
      en: 'Traditional Spiced Black Tea',
      am: 'የቅመም ሻይ',
      om: 'Shaayee Qorichaa Aadaa'
    }
  },
  {
    id: 'chechebsa-special',
    categoryId: 'starters',
    priceETB: 520,
    rating: 4.9,
    reviewCount: 88,
    spiciness: 1,
    prepMinutes: 15,
    calories: 580,
    isPopular: true,
    isChefSpecial: false,
    isAvailable: true,
    dietary: ['vegetarian', 'halal'],
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Special Chechebsa / Kita Firfir (ጨጨብሳ)',
      am: 'ልዩ ጨጨብሳ በማርና በአይብ',
      om: 'Chechebsaa Addaa (Kitaa Firfir)'
    },
    description: {
      en: 'Shredded flatbread (kita) pan-fried with spiced niter kibbeh butter, berbere, served with a drizzle of organic Ethiopian honey and fresh ayib cheese.',
      am: 'የተቆራረሰ ቂጣ በበርበሬና በቅቤ ተጥብሶ በንጹህ ማርና በአይብ አጊጦ የሚቀርብ የቁርስ ምግብ።',
      om: 'Kitaa ciccite barbaree fi kibbeh niter wajjin waadame, damma aadaa fi ayib haaraa wajjin dhihaata.'
    },
    allergens: {
      en: ['Wheat (Kita)', 'Dairy (Kibbeh, Ayib)'],
      am: ['ስንዴ', 'ቅቤና አይብ'],
      om: ['Qamadii', 'Kibbeh fi Ayib']
    },
    chefTip: {
      en: 'The classic Ethiopian breakfast of Champions! Perfect when paired with Jebena Coffee.',
      am: 'ከጀበና ቡና ጋር የሚወሰድ ምርጥ ባህላዊ የቁርስ ምግብ።',
      om: 'Ciree aadaa beekamaa! Buna jebenaa wajjin baay\'ee deema.'
    },
    pairing: {
      en: 'Jebena Buna (Ethiopian Coffee)',
      am: 'የጀበና ቡና',
      om: 'Buna Jebenaa'
    }
  },
  {
    id: 'asa-tibs-fish',
    categoryId: 'seafood',
    priceETB: 780,
    rating: 4.7,
    reviewCount: 64,
    spiciness: 1,
    prepMinutes: 20,
    calories: 490,
    isPopular: false,
    isChefSpecial: true,
    isAvailable: true,
    dietary: ['halal', 'glutenFree', 'nutFree'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Lake Tana Asa Tibs (የዓሳ ጥብስ)',
      am: 'የጣና ዓሳ ጥብስ በነጭ ሽንኩርትና በቃሪያ',
      om: 'Tibsi Qurxummii Tana Addaa'
    },
    description: {
      en: 'Crispy cubed freshwater tilapia fillet sautéed with onions, garlic, fresh rosemary, black pepper, and lemon juice, served with fresh salad and injera.',
      am: 'ጥሩ የጣና ዓሳ በሽንኩርት፣ በነጭ ሽንኩርት፣ በሎሚና በቃሪያ ተጥብሶ የሚቀርብ።',
      om: 'Qurxummii haroo Tana lallaafaan shunkurtii, qullubbii adii fi lomiin waadame injeraa wajjin dhihaata.'
    },
    allergens: {
      en: ['Fish (Tilapia)'],
      am: ['ዓሳ'],
      om: ['Qurxummii']
    },
    chefTip: {
      en: 'Squeeze extra fresh lime over the hot fish cubes for an electrifying zest.',
      am: 'ትኩሱ ዓሳ ላይ ተጨማሪ የሎሚ ጭማቂ አፍስሰው ይመገቡ።',
      om: 'Lomii haaraa gubbaa qurxummii oo\'aa irratti cobsaa.'
    },
    pairing: {
      en: 'Chilled White Wine or Sparking Water',
      am: 'ቀዝቃዛ ነጭ ወይን ወይም ጋዝ ያለው ውኃ',
      om: 'Diini Adii Qabbanaawaa ykn Bishaan Gaazii'
    }
  },
  {
    id: 'jebena-coffee-ceremony',
    categoryId: 'desserts-drinks',
    priceETB: 350,
    rating: 5.0,
    reviewCount: 310,
    spiciness: 0,
    prepMinutes: 20,
    calories: 80,
    isPopular: true,
    isChefSpecial: true,
    isAvailable: true,
    dietary: ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Full Ethiopian Coffee Ceremony (የጀበና ቡና ስነ-ስርዓት)',
      am: 'ሙሉ የጀበና ቡና ስነ-ስርዓት በእጣንና በፖፕኮርን',
      om: 'Sirna Buna Jebenaa Guutuu'
    },
    description: {
      en: 'Authentic 3-round Ethiopian coffee ceremony brewed in a traditional clay jebena pot, served with frankincense smoke, fresh popcorn, and traditional tenadam herbs.',
      am: 'በጀበና የተፈሉ 3 ዙር ቡናዎች (አቦል፣ ቶና፣ በረካ) ከዕጣን፣ ከጤናዳም እና ከፖፕኮርን ጋር የሚቀርብ።',
      om: 'Buna jebenaa aadaa marsaa 3 (Abol, Tona, Bereka) iitana, popcorn fi tenadam wajjin dhihaata.'
    },
    allergens: {
      en: ['None'],
      am: ['የለም'],
      om: ['Homaa']
    },
    chefTip: {
      en: 'Includes 3 rounds of coffee: Abol (1st strong round), Tona (2nd round), and Bereka (3rd blessing round).',
      am: '3ቱን ዙሮች (አቦል፣ ቶና፣ በረካ) ተራ በተራ ያጣጥሙ።',
      om: 'Marsaa 3n bunaa: Abol, Tona fi Bereka dhandhamaa.'
    },
    pairing: {
      en: 'Fresh Roasted Popcorn & Tenadam Herbs',
      am: 'ፈንድሻና ጤናዳም',
      om: 'Popcorn fi Tenadam'
    }
  },
  {
    id: 'honey-tej-carafe',
    categoryId: 'desserts-drinks',
    priceETB: 450,
    rating: 4.9,
    reviewCount: 175,
    spiciness: 0,
    prepMinutes: 5,
    calories: 210,
    isPopular: true,
    isChefSpecial: false,
    isAvailable: true,
    dietary: ['glutenFree', 'halal', 'nutFree'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    title: {
      en: 'Authentic Ethiopian Honey Tej (የቤት ማር ጠጅ)',
      am: 'የቤት ውስጥ ንጹህ የማር ጠጅ በብረሌ',
      om: 'Daadhii Dammaa Aadaa (Tej)'
    },
    description: {
      en: 'Traditional home-brewed honey wine fermented with gesho hops in an authentic Berele flask, offering a rich sweet and aromatic flavor.',
      am: 'በጌሾና በንጹህ ማር በቤት ውስጥ የተጠመቀ ባህላዊ የኢትዮጵያ ጠጅ በብረሌ የሚቀርብ።',
      om: 'Daadhii dammaa aadaa geeshoo fi damma aadaatiin bokoke, berele keessatti dhihaata.'
    },
    allergens: {
      en: ['Alcohol (Honey Wine)'],
      am: ['አልኮል (ማር ጠጅ)'],
      om: ['Alkoolii (Daadhii)']
    },
    chefTip: {
      en: 'Served cold in a long-necked Berele glass. Pairs exquisitely with spicy meat mains.',
      am: 'በቀዝቃዛ ብረሌ ተሞልቶ ይቀርባል። ከስጋ ምግቦች ጋር ምርጥ ጥምረት አለው።',
      om: 'Berele qabbanaawaa keessatti dhihaata.'
    },
    pairing: {
      en: 'Special Kitfo or Sizzling Beef Tibs',
      am: 'ልዩ ክትፎ ወይም የሸክላ ጥብስ',
      om: 'Kitfoo Addaa ykn Tibsi Sheklaa'
    }
  }
];

// Application State
const state = {
  currentLang: localStorage.getItem('lumiere_lang') || 'en',
  currentCurrency: localStorage.getItem('lumiere_currency') || 'ETB',
  theme: localStorage.getItem('lumiere_theme') || 'dark',
  activeCategory: 'all',
  searchQuery: '',
  activeFilters: new Set(),
  mySelection: new Set(JSON.parse(localStorage.getItem('lumiere_selection') || '[]')),
  categories: FALLBACK_CATEGORIES,
  menuItems: FALLBACK_MENU,
  dataSource: 'initial'
};

// DOM Elements
const elements = {
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  langSelect: document.getElementById('langSelect'),
  currencySelect: document.getElementById('currencySelect'),
  tableNoticeBar: document.getElementById('tableNoticeBar'),
  searchInput: document.getElementById('searchInput'),
  filterPills: document.getElementById('filterPills'),
  categoryNav: document.getElementById('categoryNav'),
  menuContainer: document.getElementById('menuContainer'),
  selectionCountBadge: document.getElementById('selectionCountBadge'),
  mobileSelectionCount: document.getElementById('mobileSelectionCount'),
  openSelectionBtn: document.getElementById('openSelectionBtn'),
  openSelectionBtnMobile: document.getElementById('openSelectionBtnMobile'),
  selectionDrawerOverlay: document.getElementById('selectionDrawerOverlay'),
  closeSelectionBtn: document.getElementById('closeSelectionBtn'),
  drawerItemsList: document.getElementById('drawerItemsList'),
  clearSelectionBtn: document.getElementById('clearSelectionBtn'),
  dishModalOverlay: document.getElementById('dishModalOverlay'),
  closeDishModalBtn: document.getElementById('closeDishModalBtn'),
  modalContent: document.getElementById('modalContent'),
  qrModalOverlay: document.getElementById('qrModalOverlay'),
  closeQrBtn: document.getElementById('closeQrBtn'),
  qrCanvasBox: document.getElementById('qrCanvasBox'),
  printQrBtn: document.getElementById('printQrBtn'),
  copyUrlBtn: document.getElementById('copyUrlBtn'),
  shareMenuBtn: document.getElementById('shareMenuBtn'),
  openFeedbackBtn: document.getElementById('openFeedbackBtn'),
  feedbackModalOverlay: document.getElementById('feedbackModalOverlay'),
  closeFeedbackBtn: document.getElementById('closeFeedbackBtn'),
  feedbackForm: document.getElementById('feedbackForm'),
  // AI Elements
  openAiRecommendBtn: document.getElementById('openAiRecommendBtn'),
  heroAiBtn: document.getElementById('heroAiBtn'),
  mobileAiBtn: document.getElementById('mobileAiBtn'),
  aiRecommendModalOverlay: document.getElementById('aiRecommendModalOverlay'),
  closeAiModalBtn: document.getElementById('closeAiModalBtn'),
  aiTodaysSpecialCard: document.getElementById('aiTodaysSpecialCard'),
  aiCravingChips: document.getElementById('aiCravingChips'),
  aiPromptForm: document.getElementById('aiPromptForm'),
  aiQueryInput: document.getElementById('aiQueryInput')
};

// Modal Helpers
function showModal(el) {
  if (!el) return;
  el.style.display = 'flex';
  el.classList.add('open');
}

function hideModal(el) {
  if (!el) return;
  el.style.display = 'none';
  el.classList.remove('open');
}

// Initialize Application
function init() {
  document.documentElement.setAttribute('data-theme', state.theme);
  
  if (elements.langSelect) elements.langSelect.value = state.currentLang;
  if (elements.currencySelect) elements.currencySelect.value = state.currentCurrency;

  applyTranslations();

  renderCategoryNav();
  renderDietaryFilters();
  renderMenuGrid();
  updateSelectionCount();

  bindEvents();

  loadMenuData().then(() => {
    renderCategoryNav();
    renderDietaryFilters();
    renderMenuGrid();
  }).catch(err => {
    console.log('Using local embedded dataset');
  });
}

// Background Fetch Menu Data from API
async function loadMenuData() {
  try {
    const res = await fetch(`/api/menu?lang=${state.currentLang}&currency=${state.currentCurrency}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.items && Array.isArray(data.items) && data.items.length > 0) {
        state.categories = (data.categories && data.categories.length > 0) 
          ? data.categories.map(c => ({
              id: c.id,
              icon: c.icon || '🍽️',
              title: typeof c.title === 'string' ? { [state.currentLang]: c.title, en: c.title } : (c.title || { en: c.id })
            }))
          : FALLBACK_CATEGORIES;

        state.menuItems = data.items.map(item => ({
          id: item.id,
          categoryId: item.categoryId,
          priceETB: item.priceETB || 500,
          rating: item.rating || 4.8,
          reviewCount: item.reviewCount || 50,
          spiciness: item.spiciness || 0,
          prepMinutes: item.prepMinutes || 15,
          calories: item.calories || 400,
          isPopular: Boolean(item.isPopular),
          isChefSpecial: Boolean(item.isChefSpecial),
          dietary: Array.isArray(item.dietary) ? item.dietary : (Array.isArray(item.dietaryTags) ? item.dietaryTags : []),
          image: item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
          title: typeof item.title === 'string' ? { [state.currentLang]: item.title, en: item.title } : (item.title || { en: 'Ethiopian Dish' }),
          description: typeof item.description === 'string' ? { [state.currentLang]: item.description, en: item.description } : (item.description || { en: '' }),
          allergens: item.allergens || [],
          chefTip: item.chefTip || null,
          pairing: item.pairing || null
        }));

        state.dataSource = data.source;
        return;
      }
    }
  } catch (err) {
    console.warn('API fetch error, using fallback dataset:', err);
  }

  state.categories = FALLBACK_CATEGORIES;
  state.menuItems = FALLBACK_MENU;
  state.dataSource = 'fallback-data';
}

// Translate Static Page Elements
function applyTranslations() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;

  if (state.currentLang === 'am') {
    document.body.classList.add('ethiopic-text');
  } else {
    document.body.classList.remove('ethiopic-text');
  }

  document.querySelectorAll('[data-t]').forEach(el => {
    const key = el.getAttribute('data-t');
    if (t[key]) el.textContent = t[key];
  });

  if (elements.searchInput) {
    elements.searchInput.placeholder = t.searchPlaceholder;
  }
}

// Format Price
function formatPrice(priceETB) {
  const currencyInfo = CURRENCY_RATES[state.currentCurrency] || CURRENCY_RATES.ETB;
  const converted = (priceETB * currencyInfo.rate).toFixed(
    state.currentCurrency === 'ETB' ? 0 : 2
  );
  
  if (currencyInfo.position === 'before') {
    return `${currencyInfo.symbol}${converted}`;
  } else {
    return `${converted} ${currencyInfo.symbol}`;
  }
}

// AI Recommendation Engine
function renderAiRecommendation(cravingKey = 'todaySpecial', userQuery = '') {
  if (!elements.aiTodaysSpecialCard) return;

  let targetItem;
  let aiReason = '';

  if (userQuery.trim() !== '') {
    const q = userQuery.toLowerCase();
    targetItem = state.menuItems.find(m => {
      const t = (typeof m.title === 'string' ? m.title : (m.title[state.currentLang] || m.title.en)).toLowerCase();
      const d = (typeof m.description === 'string' ? m.description : (m.description[state.currentLang] || m.description.en)).toLowerCase();
      return t.includes(q) || d.includes(q);
    });

    if (!targetItem) {
      if (q.includes('mild') || q.includes('kid')) {
        targetItem = state.menuItems.find(m => m.id === 'beyaynetu-grand-platter' || m.id === 'chechebsa-special');
        aiReason = 'Selected for zero spiciness, high nutritional value, and crowd-pleasing taste.';
      } else if (q.includes('spicy') || q.includes('hot')) {
        targetItem = state.menuItems.find(m => m.id === 'doro-wat-special');
        aiReason = 'Rich berbere spice with organic egg and ayib cottage cheese to balance the heat.';
      } else {
        targetItem = state.menuItems.find(m => m.isChefSpecial) || state.menuItems[0];
        aiReason = 'Top-rated Ethiopian culinary masterpiece selected based on your query.';
      }
    } else {
      aiReason = `Matches your personal craving for "${userQuery}".`;
    }
  } else {
    const hour = new Date().getHours();

    if (cravingKey === 'todaySpecial') {
      if (hour < 11) {
        targetItem = state.menuItems.find(m => m.id === 'chechebsa-special') || state.menuItems[0];
        aiReason = 'Morning Specialty: Pan-fried flatbread with niter kibbeh, organic honey, and fresh ayib.';
      } else {
        targetItem = state.menuItems.find(m => m.id === 'doro-wat-special') || state.menuItems[0];
        aiReason = "Chef Selam's Today's Special: Royal Doro Wat slow-simmered in berbere spice with organic egg and house ayib.";
      }
    } else if (cravingKey === 'spicyMeat') {
      targetItem = state.menuItems.find(m => m.id === 'beef-tibs-sizzling' || m.id === 'special-kitfo');
      aiReason = 'Sizzling hot beef tenderloin cooked on traditional clay burner with jalapeños and rosemary.';
    } else if (cravingKey === 'veganFasting') {
      targetItem = state.menuItems.find(m => m.id === 'beyaynetu-grand-platter' || m.id === 'shiro-tegabino');
      aiReason = '100% Vegan & Fasting friendly: Vibrant array of Shiro, Misir, Kik, Gomen, and beetroot.';
    } else if (cravingKey === 'coffeeDrink') {
      targetItem = state.menuItems.find(m => m.id === 'jebena-coffee-ceremony' || m.id === 'honey-tej-carafe');
      aiReason = 'Authentic 3-round Ethiopian Jebena Coffee Ceremony served with frankincense smoke and popcorn.';
    }
  }

  if (!targetItem) targetItem = state.menuItems[0];

  const title = typeof targetItem.title === 'string' ? targetItem.title : (targetItem.title[state.currentLang] || targetItem.title.en);
  const desc = typeof targetItem.description === 'string' ? targetItem.description : (targetItem.description[state.currentLang] || targetItem.description.en);
  const priceFormatted = formatPrice(targetItem.priceETB);
  const pairing = targetItem.pairing ? (typeof targetItem.pairing === 'string' ? targetItem.pairing : (targetItem.pairing[state.currentLang] || targetItem.pairing.en)) : 'House Honey Tej';
  const isBookmarked = state.mySelection.has(targetItem.id);

  elements.aiTodaysSpecialCard.innerHTML = `
    <div class="flex items-center justify-between text-[11px] font-bold text-amber-400 mb-2">
      <span class="flex items-center gap-1.5">🌟 Chef Selam's AI Pick</span>
      <span class="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full">★ ${targetItem.rating} Rating</span>
    </div>
    <div class="flex flex-col sm:flex-row gap-3 items-center">
      <img src="${targetItem.image}" alt="${title}" class="w-full sm:w-28 h-28 object-cover rounded-xl border border-white/10" />
      <div class="flex-1">
        <div class="flex items-center justify-between gap-2 mb-1">
          <h3 class="font-bold text-white text-base leading-tight">${title}</h3>
          <span class="font-bold text-amber-400 text-sm whitespace-nowrap">${priceFormatted}</span>
        </div>
        <p class="text-xs text-slate-300 line-clamp-2 mb-2">${desc}</p>
        <div class="text-[11px] text-purple-300 bg-purple-950/50 p-2 rounded-lg border border-purple-500/30 mb-3">
          <span class="font-bold">🤖 Why AI Recommends:</span> ${aiReason}
        </div>
        <div class="flex items-center justify-between gap-2">
          <span class="text-[10px] text-slate-400">🍷 Pair with: <strong class="text-slate-200">${pairing}</strong></span>
          <button class="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-transform" id="aiAddSelectionBtn" data-id="${targetItem.id}">
            <span>${isBookmarked ? '🔖' : '➕'}</span> ${isBookmarked ? 'Saved' : 'Add to Selection'}
          </button>
        </div>
      </div>
    </div>
  `;

  const addBtn = document.getElementById('aiAddSelectionBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      toggleWishlist(targetItem.id);
      renderAiRecommendation(cravingKey, userQuery);
    });
  }
}

// Render Category Nav
function renderCategoryNav() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  
  let html = `
    <button class="cat-tab ${state.activeCategory === 'all' ? 'active' : ''}" data-cat="all">
      🍽️ ${t.allCategories}
    </button>
  `;

  state.categories.forEach(cat => {
    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en || cat.id);
    html += `
      <button class="cat-tab ${state.activeCategory === cat.id ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.icon} ${catTitle}
      </button>
    `;
  });

  if (elements.categoryNav) {
    elements.categoryNav.innerHTML = html;

    elements.categoryNav.querySelectorAll('.cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat');
        state.activeCategory = catId;
        renderCategoryNav();
        renderMenuGrid();
        
        if (catId !== 'all') {
          const sec = document.getElementById(`sec-${catId}`);
          if (sec) {
            const yOffset = -120;
            const y = sec.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      });
    });
  }
}

// Render Dietary Pills
function renderDietaryFilters() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  const filterKeys = ['vegan', 'vegetarian', 'glutenFree', 'halal', 'nutFree', 'spicy'];

  let html = '';
  filterKeys.forEach(key => {
    const isActive = state.activeFilters.has(key);
    html += `
      <button class="pill-btn ${isActive ? 'active' : ''}" data-filter="${key}">
        ${t.filters[key]}
      </button>
    `;
  });

  if (elements.filterPills) {
    elements.filterPills.innerHTML = html;

    elements.filterPills.querySelectorAll('.pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        if (state.activeFilters.has(filter)) {
          state.activeFilters.delete(filter);
        } else {
          state.activeFilters.add(filter);
        }
        renderDietaryFilters();
        renderMenuGrid();
      });
    });
  }
}

// Filter Menu Items
function getFilteredItems() {
  return state.menuItems.filter(item => {
    if (state.activeCategory !== 'all' && item.categoryId !== state.activeCategory) {
      return false;
    }

    for (let f of state.activeFilters) {
      if (f === 'spicy') {
        if (item.spiciness === 0) return false;
      } else {
        if (!item.dietary || !item.dietary.includes(f)) return false;
      }
    }

    if (state.searchQuery.trim() !== '') {
      const query = state.searchQuery.toLowerCase();
      const title = (typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en || '')).toLowerCase();
      const desc = (typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en || '')).toLowerCase();
      return title.includes(query) || desc.includes(query);
    }

    return true;
  });
}

// Render Menu Grid
function renderMenuGrid() {
  if (!elements.menuContainer) return;
  
  const filtered = getFilteredItems();
  
  if (filtered.length === 0) {
    elements.menuContainer.innerHTML = `
      <div style="text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <div style="font-size: 3rem; margin-bottom: 10px;">🔍</div>
        <h3 style="color: var(--text-main);">No Ethiopian dishes match your search or filters</h3>
        <p style="font-size: 0.9rem; margin-top: 5px;">Try clearing filters or adjusting your search term.</p>
      </div>
    `;
    return;
  }

  const categoriesToRender = state.activeCategory === 'all' 
    ? state.categories 
    : state.categories.filter(c => c.id === state.activeCategory);

  let containerHtml = '';

  categoriesToRender.forEach(cat => {
    const catItems = filtered.filter(item => item.categoryId === cat.id);
    if (catItems.length === 0) return;

    const catTitle = typeof cat.title === 'string' ? cat.title : (cat.title[state.currentLang] || cat.title.en || cat.id);

    containerHtml += `
      <section class="category-section mb-8" id="sec-${cat.id}">
        <div class="category-header flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
          <span class="text-xl">${cat.icon}</span>
          <h2 class="font-display font-bold text-lg text-amber-400">${catTitle}</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          ${catItems.map(item => createDishCardHtml(item)).join('')}
        </div>
      </section>
    `;
  });

  elements.menuContainer.innerHTML = containerHtml;

  elements.menuContainer.querySelectorAll('.dish-card').forEach(card => {
    const itemId = card.getAttribute('data-id');

    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-bookmark-btn')) return;
      openDishModal(itemId);
    });

    const favBtn = card.querySelector('.fav-bookmark-btn');
    if (favBtn) {
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(itemId);
      });
    }
  });
}

// Generate Dish Card HTML
function createDishCardHtml(item) {
  const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en || 'Ethiopian Dish');
  const desc = typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en || '');
  const priceFormatted = formatPrice(item.priceETB);
  const isBookmarked = state.mySelection.has(item.id);

  let badgeHtml = '';
  if (item.isChefSpecial) {
    badgeHtml = `<span class="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-md text-[10px] font-bold">Chef Signature</span>`;
  } else if (item.isPopular) {
    badgeHtml = `<span class="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-md text-[10px] font-bold">Popular</span>`;
  }

  const dietaryIcons = (item.dietary || []).map(d => {
    if (d === 'vegan') return '🌱';
    if (d === 'vegetarian') return '🥗';
    if (d === 'glutenFree') return '🌾';
    if (d === 'halal') return '🥩';
    return '';
  }).join(' ');

  return `
    <div class="dish-card bg-[#141824] border border-white/10 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer hover:border-amber-400/40 transition-all" data-id="${item.id}">
      <div class="relative h-44 w-full overflow-hidden bg-slate-900">
        <img src="${item.image}" alt="${title}" class="w-full h-full object-cover" loading="lazy" />
        <div class="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
          <div class="pointer-events-auto">${badgeHtml}</div>
          <button class="fav-bookmark-btn pointer-events-auto w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center text-xs ${isBookmarked ? 'bg-amber-500 text-black' : ''}" title="Save to My Selection">
            ${isBookmarked ? '🔖' : '📑'}
          </button>
        </div>
      </div>
      <div class="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <div class="flex items-start justify-between gap-2 mb-1">
            <h3 class="font-display font-bold text-sm sm:text-base text-white leading-snug">${title}</h3>
            <span class="font-bold text-amber-400 text-sm sm:text-base whitespace-nowrap">${priceFormatted}</span>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2">${desc}</p>
        </div>
        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-white/5">
          <span class="text-amber-400 font-semibold">★ ${item.rating} (${item.reviewCount})</span>
          <span>${dietaryIcons}</span>
        </div>
      </div>
    </div>
  `;
}

// Toggle Wishlist
function toggleWishlist(id) {
  if (state.mySelection.has(id)) {
    state.mySelection.delete(id);
  } else {
    state.mySelection.add(id);
  }
  
  localStorage.setItem('lumiere_selection', JSON.stringify(Array.from(state.mySelection)));
  updateSelectionCount();
  renderMenuGrid();
  renderSelectionDrawer();
}

// Update Wishlist Badges
function updateSelectionCount() {
  const count = state.mySelection.size;
  if (elements.selectionCountBadge) {
    elements.selectionCountBadge.textContent = count;
    elements.selectionCountBadge.style.display = count > 0 ? 'flex' : 'none';
  }

  if (elements.mobileSelectionCount) {
    elements.mobileSelectionCount.textContent = count;
  }
}

// Open Dish Detail Modal
function openDishModal(id) {
  const item = state.menuItems.find(m => m.id === id);
  if (!item) return;

  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en);
  const desc = typeof item.description === 'string' ? item.description : (item.description[state.currentLang] || item.description.en);
  const priceFormatted = formatPrice(item.priceETB);
  
  let allergens = 'None';
  if (Array.isArray(item.allergens)) {
    allergens = item.allergens.join(', ');
  } else if (item.allergens && item.allergens[state.currentLang]) {
    allergens = Array.isArray(item.allergens[state.currentLang]) ? item.allergens[state.currentLang].join(', ') : item.allergens[state.currentLang];
  }

  const chefTip = item.chefTip ? (typeof item.chefTip === 'string' ? item.chefTip : (item.chefTip[state.currentLang] || item.chefTip.en)) : null;
  const pairing = item.pairing ? (typeof item.pairing === 'string' ? item.pairing : (item.pairing[state.currentLang] || item.pairing.en)) : null;
  const isBookmarked = state.mySelection.has(item.id);

  elements.modalContent.innerHTML = `
    <img src="${item.image}" alt="${title}" class="w-full h-56 object-cover" />
    <div class="p-5">
      <h2 class="text-xl font-bold font-display text-white mb-2">${title}</h2>
      <div class="flex items-center justify-between mb-4">
        <span class="text-xl font-bold text-amber-400">${priceFormatted}</span>
        <button class="fav-bookmark-btn w-9 h-9 rounded-full bg-slate-800 border border-white/10 text-white flex items-center justify-center ${isBookmarked ? 'bg-amber-500 text-black' : ''}" id="modalFavBtn">
          ${isBookmarked ? '🔖' : '📑'}
        </button>
      </div>

      <p class="text-xs text-slate-300 mb-5 leading-relaxed">${desc}</p>

      <div class="grid grid-cols-3 gap-2 bg-slate-900/80 p-3 rounded-xl border border-white/10 text-center mb-4 text-xs">
        <div>
          <div class="text-[10px] text-slate-500">${t.prepTime}</div>
          <div class="font-bold text-white mt-0.5">⏱️ ${item.prepMinutes}m</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-500">${t.calories}</div>
          <div class="font-bold text-white mt-0.5">🔥 ${item.calories}k</div>
        </div>
        <div>
          <div class="text-[10px] text-slate-500">Rating</div>
          <div class="font-bold text-amber-400 mt-0.5">★ ${item.rating}</div>
        </div>
      </div>

      <div class="mb-4">
        <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">${t.allergens}</div>
        <p class="text-xs text-slate-300">${allergens}</p>
      </div>

      ${chefTip ? `
        <div class="mb-4 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl text-xs text-amber-300">
          <div class="font-bold mb-0.5">💡 ${t.chefTip}</div>
          <div>"${chefTip}"</div>
        </div>
      ` : ''}

      ${pairing ? `
        <div class="bg-slate-900 p-3 rounded-xl border border-white/10 flex items-center gap-3 text-xs">
          <span class="text-xl">🍷</span>
          <div>
            <div class="font-bold text-white">${pairing}</div>
            <div class="text-[10px] text-slate-400">Recommended drink pairing</div>
          </div>
        </div>
      ` : ''}
    </div>
  `;

  showModal(elements.dishModalOverlay);

  const modalFavBtn = document.getElementById('modalFavBtn');
  if (modalFavBtn) {
    modalFavBtn.addEventListener('click', () => {
      toggleWishlist(item.id);
      openDishModal(item.id);
    });
  }
}

// Render Selection Drawer
function renderSelectionDrawer() {
  const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
  if (!elements.drawerItemsList) return;

  if (state.mySelection.size === 0) {
    elements.drawerItemsList.innerHTML = `
      <div class="text-center py-10 text-slate-400">
        <div class="text-3xl mb-2">📑</div>
        <h4 class="font-bold text-white text-sm">${t.selectionEmpty}</h4>
        <p class="text-xs mt-1 text-slate-500">${t.selectionSubhead}</p>
      </div>
    `;
    return;
  }

  const selectedItems = state.menuItems.filter(m => state.mySelection.has(m.id));
  let html = '';
  let totalETB = 0;

  selectedItems.forEach(item => {
    totalETB += item.priceETB;
    const title = typeof item.title === 'string' ? item.title : (item.title[state.currentLang] || item.title.en);
    const priceFormatted = formatPrice(item.priceETB);

    html += `
      <div class="flex items-center gap-3 p-2.5 bg-slate-900/80 border border-white/10 rounded-xl">
        <img src="${item.image}" class="w-12 h-12 rounded-lg object-cover" alt="${title}" />
        <div class="flex-1">
          <div class="font-semibold text-xs text-white">${title}</div>
          <div class="font-bold text-amber-400 text-xs">${priceFormatted}</div>
        </div>
        <button class="text-slate-400 hover:text-rose-400 px-2 py-1 text-xs" data-remove="${item.id}" title="Remove">✕</button>
      </div>
    `;
  });

  html += `
    <div class="mt-3 pt-3 border-t border-dashed border-white/10 flex justify-between font-bold text-sm">
      <span class="text-slate-300">Total Estimated:</span>
      <span class="text-amber-400">${formatPrice(totalETB)}</span>
    </div>
  `;

  elements.drawerItemsList.innerHTML = html;

  elements.drawerItemsList.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove');
      toggleWishlist(id);
    });
  });
}

// Generate Universal Table QR Code
function renderUniversalQrCode() {
  const universalUrl = window.location.origin + '/menu';
  if (!elements.qrCanvasBox) return;

  elements.qrCanvasBox.innerHTML = `
    <div class="bg-white p-3.5 rounded-xl inline-block shadow-xl">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(universalUrl)}" alt="Universal Restaurant Table QR Code" class="block mx-auto w-44 h-44" />
    </div>
    <p class="text-xs text-slate-400 mt-3 break-all">
      📍 <span class="text-amber-400 font-semibold">Table QR Menu URL:</span> ${universalUrl}
    </p>
  `;
}

// Bind Event Handlers
function bindEvents() {
  if (elements.themeToggleBtn) {
    elements.themeToggleBtn.addEventListener('click', () => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('lumiere_theme', state.theme);
      elements.themeToggleBtn.textContent = state.theme === 'dark' ? '🌙' : '☀️';
    });
  }

  if (elements.langSelect) {
    elements.langSelect.addEventListener('change', async (e) => {
      state.currentLang = e.target.value;
      localStorage.setItem('lumiere_lang', state.currentLang);
      applyTranslations();
      await loadMenuData();
      renderCategoryNav();
      renderDietaryFilters();
      renderMenuGrid();
      renderSelectionDrawer();
    });
  }

  if (elements.currencySelect) {
    elements.currencySelect.addEventListener('change', (e) => {
      state.currentCurrency = e.target.value;
      localStorage.setItem('lumiere_currency', state.currentCurrency);
      renderMenuGrid();
      renderSelectionDrawer();
    });
  }

  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMenuGrid();
    });
  }

  // AI Modal Triggers
  const openAiModalHandler = () => {
    renderAiRecommendation('todaySpecial');
    showModal(elements.aiRecommendModalOverlay);
  };

  if (elements.openAiRecommendBtn) elements.openAiRecommendBtn.addEventListener('click', openAiModalHandler);
  if (elements.heroAiBtn) elements.heroAiBtn.addEventListener('click', openAiModalHandler);
  if (elements.mobileAiBtn) elements.mobileAiBtn.addEventListener('click', openAiModalHandler);

  if (elements.closeAiModalBtn) {
    elements.closeAiModalBtn.addEventListener('click', () => {
      hideModal(elements.aiRecommendModalOverlay);
    });
  }

  if (elements.aiRecommendModalOverlay) {
    elements.aiRecommendModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.aiRecommendModalOverlay) {
        hideModal(elements.aiRecommendModalOverlay);
      }
    });
  }

  // AI Craving Chips
  if (elements.aiCravingChips) {
    elements.aiCravingChips.querySelectorAll('.ai-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        elements.aiCravingChips.querySelectorAll('.ai-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cravingKey = chip.getAttribute('data-craving');
        renderAiRecommendation(cravingKey);
      });
    });
  }

  // AI Natural Language Form
  if (elements.aiPromptForm) {
    elements.aiPromptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryText = elements.aiQueryInput?.value || '';
      renderAiRecommendation('customQuery', queryText);
    });
  }

  const openDrawerHandler = () => {
    renderSelectionDrawer();
    showModal(elements.selectionDrawerOverlay);
  };

  if (elements.openSelectionBtn) elements.openSelectionBtn.addEventListener('click', openDrawerHandler);
  if (elements.openSelectionBtnMobile) elements.openSelectionBtnMobile.addEventListener('click', openDrawerHandler);

  if (elements.closeSelectionBtn) {
    elements.closeSelectionBtn.addEventListener('click', () => {
      hideModal(elements.selectionDrawerOverlay);
    });
  }

  if (elements.clearSelectionBtn) {
    elements.clearSelectionBtn.addEventListener('click', () => {
      state.mySelection.clear();
      localStorage.removeItem('lumiere_selection');
      updateSelectionCount();
      renderMenuGrid();
      renderSelectionDrawer();
    });
  }

  if (elements.closeDishModalBtn) {
    elements.closeDishModalBtn.addEventListener('click', () => {
      hideModal(elements.dishModalOverlay);
    });
  }

  if (elements.dishModalOverlay) {
    elements.dishModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.dishModalOverlay) {
        hideModal(elements.dishModalOverlay);
      }
    });
  }

  document.querySelectorAll('[data-open-qr]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderUniversalQrCode();
      showModal(elements.qrModalOverlay);
    });
  });

  if (elements.closeQrBtn) {
    elements.closeQrBtn.addEventListener('click', () => {
      hideModal(elements.qrModalOverlay);
    });
  }

  if (elements.qrModalOverlay) {
    elements.qrModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.qrModalOverlay) {
        hideModal(elements.qrModalOverlay);
      }
    });
  }

  if (elements.copyUrlBtn) {
    elements.copyUrlBtn.addEventListener('click', () => {
      const menuUrl = window.location.origin + '/menu';
      navigator.clipboard.writeText(menuUrl);
      alert('Table QR Menu URL copied to clipboard!');
    });
  }

  if (elements.printQrBtn) {
    elements.printQrBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (elements.shareMenuBtn) {
    elements.shareMenuBtn.addEventListener('click', () => {
      const menuUrl = window.location.origin + '/menu';
      if (navigator.share) {
        navigator.share({
          title: 'Selam Restaurant Digital Menu',
          text: 'Explore Selam Restaurant authentic Ethiopian digital menu with AI recommendations!',
          url: menuUrl
        }).catch(() => {});
      } else {
        navigator.clipboard.writeText(menuUrl);
        alert('Menu link copied to clipboard!');
      }
    });
  }

  if (elements.openFeedbackBtn) {
    elements.openFeedbackBtn.addEventListener('click', () => {
      showModal(elements.feedbackModalOverlay);
    });
  }

  if (elements.closeFeedbackBtn) {
    elements.closeFeedbackBtn.addEventListener('click', () => {
      hideModal(elements.feedbackModalOverlay);
    });
  }

  if (elements.feedbackModalOverlay) {
    elements.feedbackModalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.feedbackModalOverlay) {
        hideModal(elements.feedbackModalOverlay);
      }
    });
  }

  if (elements.feedbackForm) {
    elements.feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const t = TRANSLATIONS[state.currentLang] || TRANSLATIONS.en;
      
      const inputs = elements.feedbackForm.querySelectorAll('input, textarea');
      const guestName = inputs[0]?.value || 'Anonymous Guest';
      const comment = inputs[1]?.value || '';

      try {
        await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating: 5, guestName, comment })
        });
      } catch (err) {
        console.log('Feedback logged client-side');
      }

      alert(t.feedbackSuccess);
      hideModal(elements.feedbackModalOverlay);
      elements.feedbackForm.reset();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
