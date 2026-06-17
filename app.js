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

  // أداة مساعدة لإنشاء عناصر
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
    Object.entries(DATA.food.meals).forEach(([key, meal]) => {
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
          go(() => renderWheel(cat.title, cat.places, "مطعمك"))
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
        optionCard(t.emoji, t.title, t.places.length + " فعالية", () =>
          go(() => renderWheel("فعاليات " + t.title, t.places, "وجهتك")), true
        )
      );
    });
    s.appendChild(grid);
    app.appendChild(s);
  }

  // ===== الدائرة (الروليت) =====
  function renderWheel(title, items, resultLabel) {
    const s = el("div", "screen");
    s.appendChild(head(title, "اختر من الدائرة أو اضغط الزر يختار لك"));

    const wrap = el("div", "wheel-wrap");
    const stage = el("div", "wheel-stage");
    const wheel = el("div", "wheel");

    const n = items.length;
    const stageSize = Math.min(window.innerWidth * 0.88, 460);
    const radius = stageSize / 2 - 56; // مسافة العناصر عن المركز

    const nodes = [];
    items.forEach((item, i) => {
      const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const node = el("div", "node");
      node.style.transform = `translate(${x}px, ${y}px)`;
      node.appendChild(el("span", "n-emoji", item.emoji));
      node.appendChild(el("span", "n-name", item.name));
      node.title = item.name + " · " + item.area;
      node.addEventListener("click", () => {
        if (spinning) return;
        select(i);
        showResult(item, resultLabel, title, items);
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
      const spins = 4 + Math.floor(Math.random() * 3); // عدد اللفات
      rotation += spins * 360 + Math.floor(Math.random() * 360);
      wheel.style.transform = `rotate(${rotation}deg)`;

      // نلغي دوران العناصر نفسها حتى تبقى مقروءة
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
        showResult(items[pick], resultLabel, title, items);
      }, 4200);
    });

    stage.appendChild(wheel);
    stage.appendChild(center);
    wrap.appendChild(stage);
    wrap.appendChild(el("p", "hint", "🔄 العناصر مرتبة على شكل دائرة — اضغط على أي وحدة أو خلّ الزر يقرر"));

    s.appendChild(wrap);

    const resultHolder = el("div");
    resultHolder.id = "resultHolder";
    s.appendChild(resultHolder);
    app.appendChild(s);
  }

  function showResult(item, resultLabel, title, items) {
    const holder = document.getElementById("resultHolder");
    if (!holder) return;
    holder.innerHTML = "";
    const wrap = el("div", "wheel-wrap");
    const r = el("div", "result");
    r.appendChild(el("div", "r-emoji", item.emoji));
    r.appendChild(el("div", "r-title", resultLabel + " هو 🎉"));
    r.appendChild(el("div", "r-name", item.name));
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
