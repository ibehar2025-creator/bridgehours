const menuToggle = document.querySelector("#menuToggle");
const menuClose = document.querySelector("#menuClose");
const sideMenu = document.querySelector("#sideMenu");
const viewButtons = document.querySelectorAll("[data-view-target]");
const views = document.querySelectorAll(".view");
const menuLinks = document.querySelectorAll(".menu-link");
const filterPills = document.querySelectorAll(".filter-pill");
const searchInput = document.querySelector("#searchInput");
const cards = document.querySelectorAll(".opportunity-card");
const roleSwitches = document.querySelectorAll(".role-switch");
const profilePanels = document.querySelectorAll("[data-profile-panel]");

let activeFilter = "all";

function closeMenu() {
  sideMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}

function openMenu() {
  sideMenu.classList.add("open");
  menuToggle.setAttribute("aria-expanded", "true");
}

function setActiveView(viewId) {
  views.forEach((view) => {
    view.classList.toggle("active", view.id === viewId);
  });

  menuLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.viewTarget === viewId);
  });

  if (window.innerWidth <= 1080) {
    closeMenu();
  }
}

function setProfile(profile) {
  roleSwitches.forEach((button) => {
    button.classList.toggle("active", button.dataset.profile === profile);
  });

  profilePanels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.profilePanel === profile);
  });
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesQuery = !query || card.dataset.search.includes(query);
    card.classList.toggle("hidden", !(matchesFilter && matchesQuery));
  });
}

menuToggle.addEventListener("click", () => {
  if (sideMenu.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

menuClose.addEventListener("click", closeMenu);

viewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextView = button.dataset.viewTarget;
    const nextRole = button.dataset.roleSelect;

    if (nextRole) {
      setProfile(nextRole);
    }

    if (nextView) {
      setActiveView(nextView);
    }
  });
});

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    activeFilter = pill.dataset.filter;
    filterPills.forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
    renderCards();
  });
});

roleSwitches.forEach((button) => {
  button.addEventListener("click", () => {
    setProfile(button.dataset.profile);
  });
});

searchInput.addEventListener("input", renderCards);

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    sideMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

setActiveView("dashboard");
setProfile("volunteer");
renderCards();
