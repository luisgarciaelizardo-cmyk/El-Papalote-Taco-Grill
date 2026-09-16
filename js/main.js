(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Render digital menu from MENU_DATA ---
  var filtersEl = document.querySelector(".menu-filters");
  var groupsEl = document.getElementById("menu-groups");

  function renderFilters() {
    var allBtn = document.createElement("button");
    allBtn.className = "filter-pill is-active";
    allBtn.type = "button";
    allBtn.textContent = "Todo";
    allBtn.dataset.target = "all";
    filtersEl.appendChild(allBtn);

    MENU_DATA.forEach(function (cat) {
      var btn = document.createElement("button");
      btn.className = "filter-pill";
      btn.type = "button";
      btn.textContent = cat.name;
      btn.dataset.target = cat.id;
      filtersEl.appendChild(btn);
    });

    filtersEl.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-pill");
      if (!btn) return;
      filtersEl.querySelectorAll(".filter-pill").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var target = btn.dataset.target;
      groupsEl.querySelectorAll(".menu-group").forEach(function (group) {
        var show = target === "all" || group.dataset.category === target;
        group.style.display = show ? "" : "none";
      });
    });
  }

  function renderGroups() {
    MENU_DATA.forEach(function (cat) {
      var group = document.createElement("div");
      group.className = "menu-group";
      group.dataset.category = cat.id;
      group.id = "cat-" + cat.id;

      var heading = document.createElement("div");
      heading.className = "menu-group-heading";
      heading.innerHTML =
        '<h3>' + cat.name + (cat.tag ? ' <span class="tag">' + cat.tag + '</span>' : '') + '</h3>' +
        (cat.note ? '<p class="menu-group-note">' + cat.note + '</p>' : '');
      group.appendChild(heading);

      var list = document.createElement("div");
      list.className = "menu-items";

      cat.items.forEach(function (item) {
        var row = document.createElement("div");
        row.className = "menu-item";
        row.innerHTML =
          '<div class="menu-item-top">' +
            '<h4>' + item.name + (item.tag ? ' <span class="tag">' + item.tag + '</span>' : '') + '</h4>' +
            (item.price ? '<span class="menu-item-price">' + item.price + '</span>' : '') +
          '</div>' +
          (item.desc ? '<p class="menu-item-desc">' + item.desc + '</p>' : '');
        list.appendChild(row);
      });

      group.appendChild(list);

      if (cat.footnote) {
        var fn = document.createElement("p");
        fn.className = "menu-group-footnote";
        fn.textContent = cat.footnote;
        group.appendChild(fn);
      }

      groupsEl.appendChild(group);
    });
  }

  renderFilters();
  renderGroups();
})();
