// بيانات الموقع: الأكل والفعاليات في جدة
// كل قسم يحتوي على أنواع، وكل نوع يحتوي على قائمة مطاعم/أماكن تُعرض على شكل دائرة.
// price: مستوى السعر (1 = اقتصادي، 2 = متوسط، 3 = فخم)
// rating: التقييم من 5
// img: كلمة مفتاحية لجلب صورة

const DATA = {
  food: {
    title: "أكل",
    emoji: "🍽️",
    meals: {
      breakfast: {
        title: "الفطور",
        emoji: "🍳",
        categories: {
          shaabi: {
            title: "فطور شعبي",
            emoji: "🫓",
            img: "arabic,breakfast",
            places: [
              { name: "تميس الباشا", area: "البلد", emoji: "🫓", price: 1, rating: 4.5 },
              { name: "فول وتميس الديوان", area: "الصفا", emoji: "🍲", price: 1, rating: 4.3 },
              { name: "مطعم الطباخ", area: "الروضة", emoji: "🥘", price: 2, rating: 4.4 },
              { name: "فطور أبو زيد", area: "السامر", emoji: "🍳", price: 1, rating: 4.1 },
              { name: "بيت الفول", area: "النزهة", emoji: "🫘", price: 1, rating: 4.2 },
            ],
          },
          pancakes: {
            title: "بان كيك ووافل",
            emoji: "🥞",
            img: "pancakes",
            places: [
              { name: "The Pancake Co.", area: "الزهراء", emoji: "🥞", price: 2, rating: 4.6 },
              { name: "Waffle House", area: "حي الشاطئ", emoji: "🧇", price: 2, rating: 4.3 },
              { name: "Sugar & Spice", area: "الحمراء", emoji: "🍯", price: 2, rating: 4.4 },
              { name: "Morning Glory", area: "الروضة", emoji: "🥐", price: 3, rating: 4.7 },
            ],
          },
          breakfastCafe: {
            title: "كافيهات فطور",
            emoji: "☕",
            img: "coffee,breakfast",
            places: [
              { name: "Brew92", area: "حي الشاطئ", emoji: "☕", price: 2, rating: 4.6 },
              { name: "Half Million", area: "الأندلس", emoji: "🥐", price: 2, rating: 4.5 },
              { name: "Overdose", area: "التحلية", emoji: "🍩", price: 2, rating: 4.4 },
              { name: "Elixir Bunn", area: "الزهراء", emoji: "🫖", price: 2, rating: 4.3 },
              { name: "Draft Coffee", area: "حي البساتين", emoji: "☕", price: 2, rating: 4.5 },
            ],
          },
          pastries: {
            title: "معجنات وفطائر",
            emoji: "🥐",
            img: "pastry,bakery",
            places: [
              { name: "فطائر الديرة", area: "البوادي", emoji: "🥟", price: 1, rating: 4.2 },
              { name: "معجنات الريف", area: "السلامة", emoji: "🧆", price: 1, rating: 4.0 },
              { name: "أويا للمعجنات", area: "النعيم", emoji: "🥖", price: 1, rating: 4.3 },
              { name: "تنور المدينة", area: "الفيصلية", emoji: "🫓", price: 1, rating: 4.1 },
            ],
          },
        },
      },
      lunch: {
        title: "الغداء",
        emoji: "🍛",
        categories: {
          mandi: {
            title: "مندي وكبسة",
            emoji: "🍚",
            img: "rice,middle-eastern,food",
            places: [
              { name: "مطعم الرومانسية", area: "حي الشاطئ", emoji: "🍚", price: 2, rating: 4.5 },
              { name: "مندي الضيافة", area: "الروضة", emoji: "🍛", price: 2, rating: 4.3 },
              { name: "حضرموت", area: "الحمراء", emoji: "🥘", price: 2, rating: 4.4 },
              { name: "بيت المندي", area: "السلامة", emoji: "🍚", price: 1, rating: 4.2 },
              { name: "كبسة الأصايل", area: "النزهة", emoji: "🍗", price: 2, rating: 4.1 },
            ],
          },
          burger: {
            title: "برجر",
            emoji: "🍔",
            img: "burger",
            places: [
              { name: "Burgerizzr", area: "التحلية", emoji: "🍔", price: 2, rating: 4.4 },
              { name: "Section B", area: "حي الشاطئ", emoji: "🍔", price: 3, rating: 4.6 },
              { name: "Salt", area: "الكورنيش", emoji: "🧂", price: 2, rating: 4.5 },
              { name: "Meat & Shake", area: "الأندلس", emoji: "🥤", price: 2, rating: 4.3 },
              { name: "Buns & Co", area: "الزهراء", emoji: "🍟", price: 2, rating: 4.2 },
            ],
          },
          seafood: {
            title: "بحري وأسماك",
            emoji: "🐟",
            img: "seafood,fish",
            places: [
              { name: "توفيق للأسماك", area: "البلد", emoji: "🐟", price: 2, rating: 4.5 },
              { name: "مطعم بيع السمك", area: "الكورنيش", emoji: "🦐", price: 2, rating: 4.3 },
              { name: "سمك الخليج", area: "حي الشاطئ", emoji: "🦞", price: 3, rating: 4.6 },
              { name: "بحر جدة", area: "الشرفية", emoji: "🐠", price: 2, rating: 4.2 },
            ],
          },
          indian: {
            title: "هندي وآسيوي",
            emoji: "🍛",
            img: "indian,food",
            places: [
              { name: "Mumbai Spice", area: "الحمراء", emoji: "🍛", price: 2, rating: 4.4 },
              { name: "Bukhari Nights", area: "السلامة", emoji: "🥘", price: 2, rating: 4.2 },
              { name: "Wok Box", area: "التحلية", emoji: "🥢", price: 2, rating: 4.3 },
              { name: "Curry House", area: "الروضة", emoji: "🍜", price: 2, rating: 4.1 },
            ],
          },
        },
      },
      dinner: {
        title: "العشاء",
        emoji: "🌙",
        categories: {
          grills: {
            title: "مشاوي",
            emoji: "🍢",
            img: "grill,barbecue",
            places: [
              { name: "Switch", area: "حي الشاطئ", emoji: "🥩", price: 3, rating: 4.7 },
              { name: "مشويات الشلال", area: "الكورنيش", emoji: "🍢", price: 2, rating: 4.3 },
              { name: "Charcoal Grill", area: "الأندلس", emoji: "🔥", price: 2, rating: 4.4 },
              { name: "النخبة جريل", area: "النزهة", emoji: "🍗", price: 2, rating: 4.1 },
            ],
          },
          steak: {
            title: "ستيك",
            emoji: "🥩",
            img: "steak",
            places: [
              { name: "Steak House", area: "الروضة", emoji: "🥩", price: 3, rating: 4.6 },
              { name: "Prime & Toast", area: "التحلية", emoji: "🍷", price: 3, rating: 4.7 },
              { name: "The Butcher", area: "حي الشاطئ", emoji: "🔪", price: 3, rating: 4.5 },
              { name: "Black Angus", area: "الحمراء", emoji: "🥩", price: 3, rating: 4.4 },
            ],
          },
          sushi: {
            title: "سوشي وياباني",
            emoji: "🍣",
            img: "sushi",
            places: [
              { name: "Myazu", area: "حي الشاطئ", emoji: "🍣", price: 3, rating: 4.7 },
              { name: "Yumna Sushi", area: "التحلية", emoji: "🍱", price: 2, rating: 4.3 },
              { name: "Nozomi", area: "الكورنيش", emoji: "🍤", price: 3, rating: 4.6 },
              { name: "Tokyo Bay", area: "الأندلس", emoji: "🥢", price: 2, rating: 4.2 },
            ],
          },
          shami: {
            title: "شامي ولبناني",
            emoji: "🥙",
            img: "lebanese,food",
            places: [
              { name: "مطعم لبنان", area: "الحمراء", emoji: "🥙", price: 2, rating: 4.5 },
              { name: "بيروت ستريت", area: "الروضة", emoji: "🧆", price: 2, rating: 4.4 },
              { name: "Mama Noura", area: "التحلية", emoji: "🌯", price: 1, rating: 4.3 },
              { name: "زاد الشام", area: "السلامة", emoji: "🍢", price: 2, rating: 4.1 },
            ],
          },
        },
      },
      snacks: {
        title: "سناكات",
        emoji: "🍿",
        categories: {
          coffee: {
            title: "قهوة وكافيهات",
            emoji: "☕",
            img: "coffee,cafe",
            places: [
              { name: "Brew92", area: "حي الشاطئ", emoji: "☕", price: 2, rating: 4.6 },
              { name: "Camel Step", area: "الأندلس", emoji: "🐫", price: 2, rating: 4.5 },
              { name: "% Arabica", area: "الكورنيش", emoji: "☕", price: 3, rating: 4.7 },
              { name: "Barn's", area: "النزهة", emoji: "🥤", price: 1, rating: 4.2 },
            ],
          },
          dessert: {
            title: "حلى ودونات",
            emoji: "🍩",
            img: "dessert,donut",
            places: [
              { name: "Overdose", area: "التحلية", emoji: "🍩", price: 2, rating: 4.5 },
              { name: "Cacao", area: "الحمراء", emoji: "🍫", price: 3, rating: 4.6 },
              { name: "Saadeddin", area: "الروضة", emoji: "🍰", price: 2, rating: 4.3 },
              { name: "Kunafa House", area: "البلد", emoji: "🧁", price: 1, rating: 4.4 },
            ],
          },
          icecream: {
            title: "آيس كريم",
            emoji: "🍦",
            img: "icecream",
            places: [
              { name: "Gelato Roma", area: "حي الشاطئ", emoji: "🍨", price: 2, rating: 4.5 },
              { name: "Baskin Robbins", area: "السلامة", emoji: "🍦", price: 2, rating: 4.2 },
              { name: "Frozen Yard", area: "الأندلس", emoji: "🍧", price: 2, rating: 4.3 },
            ],
          },
          juice: {
            title: "عصيرات وموهيتو",
            emoji: "🥤",
            img: "juice,smoothie",
            places: [
              { name: "Juicy", area: "النزهة", emoji: "🥤", price: 1, rating: 4.3 },
              { name: "Fresh Squeeze", area: "الروضة", emoji: "🍹", price: 1, rating: 4.2 },
              { name: "Mojito Bar", area: "الكورنيش", emoji: "🍸", price: 2, rating: 4.4 },
            ],
          },
        },
      },
    },
  },

  events: {
    title: "فعاليات",
    emoji: "🎉",
    times: {
      morning: {
        title: "صباح",
        emoji: "🌅",
        img: "beach,morning",
        // الفعاليات الصباحية تُعرض مباشرة على شكل دائرة
        places: [
          { name: "كورنيش جدة", area: "الواجهة البحرية", emoji: "🌊", price: 1, rating: 4.6 },
          { name: "ممشى الواجهة البحرية", area: "الكورنيش", emoji: "🚶", price: 1, rating: 4.5 },
          { name: "حديقة الملك فهد", area: "الصفا", emoji: "🌳", price: 1, rating: 4.2 },
          { name: "رياضة بحرية / جت سكي", area: "أبحر", emoji: "🌅", price: 3, rating: 4.7 },
          { name: "ركوب دراجات", area: "الواجهة البحرية", emoji: "🚴", price: 1, rating: 4.4 },
          { name: "متحف عبدالرؤوف خليل", area: "النزهة", emoji: "🏛️", price: 2, rating: 4.3 },
          { name: "سوق البلد التاريخي", area: "البلد", emoji: "🛍️", price: 1, rating: 4.5 },
          { name: "فطور على البحر", area: "أبحر", emoji: "☕", price: 2, rating: 4.6 },
        ],
      },
      evening: {
        title: "مساء",
        emoji: "🌃",
        img: "city,night,lights",
        places: [
          { name: "جدة سوبر دوم", area: "أبحر", emoji: "🎪", price: 2, rating: 4.5 },
          { name: "البوليفارد / موسم جدة", area: "أبحر الشمالية", emoji: "🎡", price: 2, rating: 4.7 },
          { name: "سينما VOX", area: "ريد سي مول", emoji: "🎬", price: 2, rating: 4.4 },
          { name: "نافورة الملك فهد", area: "الكورنيش", emoji: "⛲", price: 1, rating: 4.6 },
          { name: "بولينج وألعاب", area: "الأندلس مول", emoji: "🎳", price: 2, rating: 4.3 },
          { name: "جلسة شيشة بإطلالة", area: "الكورنيش", emoji: "🌃", price: 2, rating: 4.4 },
          { name: "حفلة / كونسرت", area: "موسم جدة", emoji: "🎤", price: 3, rating: 4.8 },
          { name: "عشاء على البحر", area: "أبحر", emoji: "🍽️", price: 3, rating: 4.6 },
        ],
      },
    },
  },
};
