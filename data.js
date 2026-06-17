// بيانات الموقع: الأكل والفعاليات في جدة
// كل قسم يحتوي على أنواع، وكل نوع يحتوي على قائمة مطاعم/أماكن تُعرض على شكل دائرة.

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
            places: [
              { name: "تميس الباشا", area: "البلد", emoji: "🫓" },
              { name: "فول وتميس الديوان", area: "الصفا", emoji: "🍲" },
              { name: "مطعم الطباخ", area: "الروضة", emoji: "🥘" },
              { name: "فطور أبو زيد", area: "السامر", emoji: "🍳" },
              { name: "بيت الفول", area: "النزهة", emoji: "🫘" },
            ],
          },
          pancakes: {
            title: "بان كيك ووافل",
            emoji: "🥞",
            places: [
              { name: "The Pancake Co.", area: "الزهراء", emoji: "🥞" },
              { name: "Waffle House", area: "حي الشاطئ", emoji: "🧇" },
              { name: "Sugar & Spice", area: "الحمراء", emoji: "🍯" },
              { name: "Morning Glory", area: "الروضة", emoji: "🥐" },
            ],
          },
          breakfastCafe: {
            title: "كافيهات فطور",
            emoji: "☕",
            places: [
              { name: "Brew92", area: "حي الشاطئ", emoji: "☕" },
              { name: "Half Million", area: "الأندلس", emoji: "🥐" },
              { name: "Overdose", area: "التحلية", emoji: "🍩" },
              { name: "Elixir Bunn", area: "الزهراء", emoji: "🫖" },
              { name: "Draft Coffee", area: "حي البساتين", emoji: "☕" },
            ],
          },
          pastries: {
            title: "معجنات وفطائر",
            emoji: "🥐",
            places: [
              { name: "فطائر الديرة", area: "البوادي", emoji: "🥟" },
              { name: "معجنات الريف", area: "السلامة", emoji: "🧆" },
              { name: "أويا للمعجنات", area: "النعيم", emoji: "🥖" },
              { name: "تنور المدينة", area: "الفيصلية", emoji: "🫓" },
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
            places: [
              { name: "مطعم الرومانسية", area: "حي الشاطئ", emoji: "🍚" },
              { name: "مندي الضيافة", area: "الروضة", emoji: "🍛" },
              { name: "حضرموت", area: "الحمراء", emoji: "🥘" },
              { name: "بيت المندي", area: "السلامة", emoji: "🍚" },
              { name: "كبسة الأصايل", area: "النزهة", emoji: "🍗" },
            ],
          },
          burger: {
            title: "برجر",
            emoji: "🍔",
            places: [
              { name: "Burgerizzr", area: "التحلية", emoji: "🍔" },
              { name: "Section B", area: "حي الشاطئ", emoji: "🍔" },
              { name: "Salt", area: "الكورنيش", emoji: "🧂" },
              { name: "Meat & Shake", area: "الأندلس", emoji: "🥤" },
              { name: "Buns & Co", area: "الزهراء", emoji: "🍟" },
            ],
          },
          seafood: {
            title: "بحري وأسماك",
            emoji: "🐟",
            places: [
              { name: "توفيق للأسماك", area: "البلد", emoji: "🐟" },
              { name: "مطعم بيع السمك", area: "الكورنيش", emoji: "🦐" },
              { name: "سمك الخليج", area: "حي الشاطئ", emoji: "🦞" },
              { name: "بحر جدة", area: "الشرفية", emoji: "🐠" },
            ],
          },
          indian: {
            title: "هندي وآسيوي",
            emoji: "🍛",
            places: [
              { name: "Mumbai Spice", area: "الحمراء", emoji: "🍛" },
              { name: "Bukhari Nights", area: "السلامة", emoji: "🥘" },
              { name: "Wok Box", area: "التحلية", emoji: "🥢" },
              { name: "Curry House", area: "الروضة", emoji: "🍜" },
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
            places: [
              { name: "Switch", area: "حي الشاطئ", emoji: "🥩" },
              { name: "مشويات الشلال", area: "الكورنيش", emoji: "🍢" },
              { name: "Charcoal Grill", area: "الأندلس", emoji: "🔥" },
              { name: "النخبة جريل", area: "النزهة", emoji: "🍗" },
            ],
          },
          steak: {
            title: "ستيك",
            emoji: "🥩",
            places: [
              { name: "Steak House", area: "الروضة", emoji: "🥩" },
              { name: "Prime & Toast", area: "التحلية", emoji: "🍷" },
              { name: "The Butcher", area: "حي الشاطئ", emoji: "🔪" },
              { name: "Black Angus", area: "الحمراء", emoji: "🥩" },
            ],
          },
          sushi: {
            title: "سوشي وياباني",
            emoji: "🍣",
            places: [
              { name: "Myazu", area: "حي الشاطئ", emoji: "🍣" },
              { name: "Yumna Sushi", area: "التحلية", emoji: "🍱" },
              { name: "Nozomi", area: "الكورنيش", emoji: "🍤" },
              { name: "Tokyo Bay", area: "الأندلس", emoji: "🥢" },
            ],
          },
          shami: {
            title: "شامي ولبناني",
            emoji: "🥙",
            places: [
              { name: "مطعم لبنان", area: "الحمراء", emoji: "🥙" },
              { name: "بيروت ستريت", area: "الروضة", emoji: "🧆" },
              { name: "Mama Noura", area: "التحلية", emoji: "🌯" },
              { name: "زاد الشام", area: "السلامة", emoji: "🍢" },
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
            places: [
              { name: "Brew92", area: "حي الشاطئ", emoji: "☕" },
              { name: "Camel Step", area: "الأندلس", emoji: "🐫" },
              { name: "% Arabica", area: "الكورنيش", emoji: "☕" },
              { name: "Barn's", area: "النزهة", emoji: "🥤" },
            ],
          },
          dessert: {
            title: "حلى ودونات",
            emoji: "🍩",
            places: [
              { name: "Overdose", area: "التحلية", emoji: "🍩" },
              { name: "Cacao", area: "الحمراء", emoji: "🍫" },
              { name: "Saadeddin", area: "الروضة", emoji: "🍰" },
              { name: "Kunafa House", area: "البلد", emoji: "🧁" },
            ],
          },
          icecream: {
            title: "آيس كريم",
            emoji: "🍦",
            places: [
              { name: "Gelato Roma", area: "حي الشاطئ", emoji: "🍨" },
              { name: "Baskin Robbins", area: "السلامة", emoji: "🍦" },
              { name: "Frozen Yard", area: "الأندلس", emoji: "🍧" },
            ],
          },
          juice: {
            title: "عصيرات وموهيتو",
            emoji: "🥤",
            places: [
              { name: "Juicy", area: "النزهة", emoji: "🥤" },
              { name: "Fresh Squeeze", area: "الروضة", emoji: "🍹" },
              { name: "Mojito Bar", area: "الكورنيش", emoji: "🍸" },
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
        // الفعاليات الصباحية تُعرض مباشرة على شكل دائرة
        places: [
          { name: "كورنيش جدة", area: "الواجهة البحرية", emoji: "🌊" },
          { name: "ممشى الواجهة البحرية", area: "الكورنيش", emoji: "🚶" },
          { name: "حديقة الملك فهد", area: "الصفا", emoji: "🌳" },
          { name: "رياضة بحرية / جت سكي", area: "أبحر", emoji: "🌅" },
          { name: "ركوب دراجات", area: "الواجهة البحرية", emoji: "🚴" },
          { name: "متحف عبدالرؤوف خليل", area: "النزهة", emoji: "🏛️" },
          { name: "سوق البلد التاريخي", area: "البلد", emoji: "🛍️" },
          { name: "فطور على البحر", area: "أبحر", emoji: "☕" },
        ],
      },
      evening: {
        title: "مساء",
        emoji: "🌃",
        places: [
          { name: "جدة سوبر دوم", area: "أبحر", emoji: "🎪" },
          { name: "البوليفارد / موسم جدة", area: "أبحر الشمالية", emoji: "🎡" },
          { name: "سينما VOX", area: "ريد سي مول", emoji: "🎬" },
          { name: "نافورة الملك فهد", area: "الكورنيش", emoji: "⛲" },
          { name: "بولينج وألعاب", area: "الأندلس مول", emoji: "🎳" },
          { name: "جلسة شيشة بإطلالة", area: "الكورنيش", emoji: "🌃" },
          { name: "حفلة / كونسرت", area: "موسم جدة", emoji: "🎤" },
          { name: "عشاء على البحر", area: "أبحر", emoji: "🍽️" },
        ],
      },
    },
  },
};
