// منطق التنقل بين الشاشات وعرض الدائرة
(function () {
  const app = document.getElementById("app");
  const backBtn = document.getElementById("backBtn");
  const homeLink = document.getElementById("homeLink");

  // مكدّس التنقل: كل عنصر دالة ترسم شاشة
  let stack = [];

  function go(renderFn) {
    stack.push(renderFn);
    paint();
  }

  function back() {
    if (stack.length > 1) {
      stack.pop();
      paint();
    }
  }

  function home() {
    stack = [renderHome];
    paint();
  }

  function paint() {
    const fn = stack[stack.length - 1];
    app.innerHTML = "";
    fn();
    backBtn.hidden = stack.length <= 1;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  backBtn.addEventListener("click", back);
  homeLink.addEventListener("click", home);

  // ===== أدوات مساعدة =====
  function el(tag, className, html) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (html != null) e.innerHTML = html;
    return e;
  }

  function head(title, subtitle) {
    const h = el("div", "screen-head");
    h.appendChild(el("h1", null, title));
    if (subtitle) h.appendChild(el("p", null, subtitle));
    return h;
  }

  // رمز السعر
  function priceLabel(p) {
    return "﷼".repeat(p || 1);
  }
  const PRICE_NAMES = { 1: "اقتصادي", 2: "متوسط", 3: "فخم" };

  // نجوم التقييم
  function stars(rating) {
    const full = Math.round(rating);
    return "⭐".repeat(full) + ` ${rating.toFixed(1)}`;
  }

  // رابط صورة (مع كلمة مفتاحية + قفل ثابت لكل مكان)
  function imgUrl(keyword, seed) {
    return `https://loremflickr.com/600/400/${encodeURIComponent(keyword)}?lock=${seed}`;
  }
  function hashStr(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 100000;
    return h;
  }

  // بطاقة خيار
  function optionCard(emoji, label, sub, onClick, big) {
    const c = el("div", "card" + (big ? " card-big" : ""));
    c.appendChild(el("span", "emoji", emoji));
    c.appendChild(el("div", "label", label));
    if (sub) c.appendChild(el("div", "sub", sub));
    c.addEventListener("click", onClick);
    return c;
  }

  // ===== الشاشة الرئيسية =====
  function renderHome() {
    const s = el("div", "screen");
    s.appendChild(head("وش نسوي اليوم؟", "اختر وخلّ الباقي علينا — كل شي في جدة"));
    const grid = el("div", "grid grid-2");
    grid.appendChild(
      optionCard(DATA.events.emoji, DATA.events.title, "صباح ومساء", () => go(renderEventTimes), true)
    );
    grid.appendChild(
      optionCard(DATA.food.emoji, DATA.food.title, "فطور · غداء · عشاء · سناكات", () => go(renderMeals), true)
    );
    s.appendChild(grid);
    app.appendChild(s);
  }

  // ===== الأكل: الوجبات الأربع =====
  function renderMeals() {
    const s = el("div", "screen");
    s.appendChild(head("الأكل 🍽️", "تبغى وجبة وش؟"));
    const grid = el("div", "grid grid-2");
    Object.values(DATA.food.meals).forEach((meal) => {
      grid.appendChild(
        optionCard(meal.emoji, meal.title, null, () => go(() => renderCategories(meal)), true)
      );
    });
    s.appendChild(grid);
    app.appendChild(s);
  }

  // ===== أنواع الأكل المتوفرة في جدة لكل وجبة =====
  function renderCategories(meal) {
    const s = el("div", "screen");
    s.appendChild(head(meal.emoji + " " + meal.title, "الخيارات المتوفرة في جدة"));
    const grid = el("div", "grid grid-auto");
    Object.values(meal.categories).forEach((cat) => {
      grid.appendChild(
        optionCard(cat.emoji, cat.title, cat.places.length + " مطاعم", () =>
          go(() => renderWheel(cat.title, cat.places, "مطعمك", cat.img))
        )
      );
    });
    s.appendChild(grid);
    app.appendChild(s);
  }

  // ===== الفعاليات: صباح ومساء =====
  function renderEventTimes() {
    const s = el("div", "screen");
    s.appendChild(head("الفعاليات 🎉", "تطلع بأي وقت؟"));
    const grid = el("div", "grid grid-2");
    Object.values(DATA.events.times).forEach((t) => {
      grid.appendChild(
        optionCard(
          t.emoji,
          t.title,
          t.places.length + " فعالية",
          () => go(() => renderWheel("فعاليات " + t.title, t.places, "وجهتك", t.img)),
          true
        )
      );
    });
    s.appendChild(grid);
    app.appendChild(s);
  }

  // ===== الدائرة (الروليت) =====
  function renderWheel(title, allItems, resultLabel, imgKeyword) {
    const s = el("div", "screen");
    s.appendChild(head(title, "صفِّ حسب الميزانية، اختر من الدائرة أو خلّ الزر يقرر"));

    // فلتر الميزانية
    let activePrice = 0; // 0 = الكل
    const filterBar = el("div", "filter-bar");
    const filters = [
      { v: 0, t: "الكل" },
      { v: 1, t: "﷼ اقتصادي" },
      { v: 2, t: "﷼﷼ متوسط" },
      { v: 3, t: "﷼﷼﷼ فخم" },
    ];
    const wheelHolder = el("div");

    filters.forEach((f) => {
      const chip = el("button", "chip" + (f.v === 0 ? " active" : ""), f.t);
      chip.addEventListener("click", () => {
        activePrice = f.v;
        filterBar.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        drawWheel();
      });
      filterBar.appendChild(chip);
    });
    s.appendChild(filterBar);
    s.appendChild(wheelHolder);

    const resultHolder = el("div");
    resultHolder.id = "resultHolder";

    function drawWheel() {
      wheelHolder.innerHTML = "";
      resultHolder.innerHTML = "";
      const items = activePrice === 0 ? allItems : allItems.filter((i) => i.price === activePrice);

      const wrap = el("div", "wheel-wrap");

      if (items.length === 0) {
        wrap.appendChild(el("p", "hint", "ما في خيارات بهذه الميزانية 🙈 — جرب فلتر ثاني"));
        wheelHolder.appendChild(wrap);
        return;
      }

      const stage = el("div", "wheel-stage");
      const wheel = el("div", "wheel");
      const n = items.length;
      const stageSize = Math.min(window.innerWidth * 0.88, 460);
      const radius = stageSize / 2 - 56;

      const nodes = [];
      items.forEach((item, i) => {
        const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const node = el("div", "node");
        node.style.transform = `translate(${x}px, ${y}px)`;
        node.appendChild(el("span", "n-emoji", item.emoji));
        node.appendChild(el("span", "n-name", item.name));
        node.appendChild(el("span", "n-price", priceLabel(item.price)));
        node.title = `${item.name} · ${item.area} · ${stars(item.rating)}`;
        node.addEventListener("click", () => {
          if (spinning) return;
          select(i);
          showResult(item, resultLabel, imgKeyword);
        });
        nodes.push(node);
        wheel.appendChild(node);
      });

      const center = el("button", "wheel-center", "اختر لي 🎯");
      let spinning = false;
      let rotation = 0;

      function select(idx) {
        nodes.forEach((nd) => nd.classList.remove("selected"));
        if (idx != null) nodes[idx].classList.add("selected");
      }

      center.addEventListener("click", () => {
        if (spinning) return;
        spinning = true;
        center.disabled = true;
        select(null);

        const pick = Math.floor(Math.random() * n);
        const spins = 4 + Math.floor(Math.random() * 3);
        rotation += spins * 360 + Math.floor(Math.random() * 360);
        wheel.style.transform = `rotate(${rotation}deg)`;

        // نُبقي العناصر مقروءة بعكس دوران العجلة
        setTimeout(() => {
          nodes.forEach((nd, i) => {
            const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            nd.style.transform = `translate(${x}px, ${y}px) rotate(${-rotation}deg)`;
          });
        }, 10);

        setTimeout(() => {
          spinning = false;
          center.disabled = false;
          select(pick);
          showResult(items[pick], resultLabel, imgKeyword);
        }, 4200);
      });

      stage.appendChild(wheel);
      stage.appendChild(center);
      wrap.appendChild(stage);
      wrap.appendChild(el("p", "hint", "🔄 الخيارات مرتبة على شكل دائرة — اضغط على أي وحدة أو خلّ الزر يقرر"));
      wheelHolder.appendChild(wrap);
    }

    drawWheel();
    s.appendChild(resultHolder);
    app.appendChild(s);
  }

  function showResult(item, resultLabel, imgKeyword) {
    const holder = document.getElementById("resultHolder");
    if (!holder) return;
    holder.innerHTML = "";
    const wrap = el("div", "wheel-wrap");
    const r = el("div", "result");

    // صورة مع احتياط (إيموجي) إذا فشل التحميل
    const photo = el("div", "result-photo");
    const img = document.createElement("img");
    img.alt = item.name;
    img.loading = "lazy";
    img.src = imgUrl(imgKeyword || "food", hashStr(item.name));
    img.onerror = () => {
      photo.classList.add("fallback");
      photo.innerHTML = `<span>${item.emoji}</span>`;
    };
    photo.appendChild(img);
    r.appendChild(photo);

    r.appendChild(el("div", "r-title", resultLabel + " هو 🎉"));
    r.appendChild(el("div", "r-name", item.name));
    const meta = el("div", "r-meta");
    meta.appendChild(el("span", "r-badge", stars(item.rating)));
    meta.appendChild(el("span", "r-badge", priceLabel(item.price) + " " + PRICE_NAMES[item.price || 1]));
    r.appendChild(meta);
    r.appendChild(el("div", "r-area", "📍 " + item.area));

    const actions = el("div", "result-actions");
    const mapBtn = el("button", "btn btn-primary", "افتح في الخرائط 🗺️");
    mapBtn.addEventListener("click", () => {
      const q = encodeURIComponent(item.name + " " + item.area + " جدة");
      window.open("https://www.google.com/maps/search/?api=1&query=" + q, "_blank");
    });
    const againBtn = el("button", "btn", "جرب غيره 🔁");
    againBtn.addEventListener("click", () => {
      holder.innerHTML = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    actions.appendChild(mapBtn);
    actions.appendChild(againBtn);
    r.appendChild(actions);
    wrap.appendChild(r);
    holder.appendChild(wrap);
    holder.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // بدء التطبيق
  home();
})();
