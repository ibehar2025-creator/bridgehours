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
const matcherButton = document.querySelector("#matcherButton");
const matcherResults = document.querySelector("#matcherResults");
const interestComfort = document.querySelector("#interestComfort");
const interestSetting = document.querySelector("#interestSetting");
const interestGroup = document.querySelector("#interestGroup");

let activeFilter = "all";

const recommendationMap = {
  elderly: {
    people: {
      indoor: [
        ["Senior companion visits", "Great for volunteers who like conversation, patience, and one-on-one support."],
        ["Phone and reminder setup", "A good fit if you want calm indoor help that still feels personal."]
      ],
      outdoor: [
        ["Porch check-ins and light yard help", "A nice mix of direct support and simple outdoor tasks for older adults."],
        ["Seasonal walkway cleanup", "Helpful for safety and mobility, especially if you like being active outside."]
      ],
      either: [
        ["Senior companion visits", "A strong match if you enjoy direct human connection and gentle support."],
        ["Grocery unloading help", "Simple, practical, and appreciated by older neighbors."]
      ]
    },
    active: {
      indoor: [
        ["Light moving support", "Ideal if you do not mind carrying, organizing, and helping with small physical tasks."],
        ["Home organization visits", "Helpful for sorting boxes, shelves, and safe indoor cleanup."]
      ],
      outdoor: [
        ["Yard cleanup for seniors", "A strong fit if you like staying active and helping with visible results."],
        ["Walkway and leaf clearing", "Useful for mobility and home safety."]
      ],
      either: [
        ["Light moving support", "A practical starter role for active volunteers."],
        ["Seasonal cleanup visits", "Lets you help with indoor or outdoor physical tasks depending on need."]
      ]
    },
    tech: {
      indoor: [
        ["Phone and app setup", "Perfect if you enjoy explaining technology in a simple, patient way."],
        ["Calendar and reminder help", "Great for organized volunteers who like solving little problems."]
      ],
      outdoor: [
        ["Outdoor tech check-ins", "Useful if you want to pair a short setup visit with a simple outside task."],
        ["Photo or document organization", "Still a strong fit if outdoor preference is flexible."]
      ],
      either: [
        ["Phone and app setup", "One of the best matches for tech-comfortable student volunteers."],
        ["Medication reminder setup assistance", "Helpful, structured, and meaningful."]
      ]
    }
  },
  accessibility: {
    people: {
      indoor: [
        ["Accessibility support companion visits", "A good fit if you like helping directly and paying attention to comfort needs."],
        ["Errand and unpacking support", "Useful for calm indoor help with clear supervision."]
      ],
      outdoor: [
        ["Ramp-area cleanup", "Supports safer access while still helping someone directly."],
        ["Entryway assistance visits", "Good for simple supervised outdoor tasks."]
      ],
      either: [
        ["Accessibility support companion visits", "A thoughtful option for volunteers who connect well with people."],
        ["Errand and unpacking support", "Practical and flexible."]
      ]
    },
    active: {
      indoor: [
        ["Room setup and organizing help", "Best for volunteers comfortable with hands-on indoor tasks."],
        ["Supply carrying assistance", "Useful when someone needs practical physical support."]
      ],
      outdoor: [
        ["Ramp-area cleanup", "A strong match for active volunteers who want visible impact."],
        ["Pathway sweeping and setup", "Simple and safety-focused."]
      ],
      either: [
        ["Room setup and organizing help", "A flexible active role with clear tasks."],
        ["Ramp-area cleanup", "Good if you want practical service work."]
      ]
    },
    tech: {
      indoor: [
        ["Device accessibility setup", "Perfect for helping with fonts, reminders, accessibility tools, and communication apps."],
        ["Digital form or account assistance", "Useful if you are patient and organized online."]
      ],
      outdoor: [
        ["Hybrid setup visits", "A short device-help visit plus a quick outdoor support task can fit well here."],
        ["Digital form assistance", "Still a strong fit even if the setting varies."]
      ],
      either: [
        ["Device accessibility setup", "One of the best matches for tech-friendly volunteers."],
        ["Digital form or account assistance", "Helpful and easy to verify for service hours."]
      ]
    }
  },
  community: {
    people: {
      indoor: [
        ["Grocery unloading help", "Great if you want quick, practical help for families and neighbors."],
        ["Pantry organization visits", "A good indoor role with a strong personal impact."]
      ],
      outdoor: [
        ["Community yard cleanup", "A strong fit if you like active neighborhood help."],
        ["Donation drive support", "Works well for outgoing volunteers who like being around people."]
      ],
      either: [
        ["Grocery unloading help", "Simple, useful, and easy to start with."],
        ["Family support visits", "Flexible tasks that still feel personal."]
      ]
    },
    active: {
      indoor: [
        ["Donation sorting and moving", "Good for volunteers who like staying busy and organized."],
        ["Apartment move-in support", "A practical way to help families directly."]
      ],
      outdoor: [
        ["Community yard cleanup", "A very natural match for active volunteers."],
        ["Neighborhood event setup", "Good if you like physical tasks with teamwork."]
      ],
      either: [
        ["Donation sorting and moving", "A flexible active option with clear results."],
        ["Community yard cleanup", "Visible impact and easy to understand."]
      ]
    },
    tech: {
      indoor: [
        ["Homework and basic tech help", "Great for students who like tutoring, setup, or digital organization."],
        ["Community form support", "A solid fit if you are organized and comfortable online."]
      ],
      outdoor: [
        ["Event check-in tech support", "A nice blend of people-facing and tech-friendly help."],
        ["Community form support", "Still useful even when the setting changes."]
      ],
      either: [
        ["Homework and basic tech help", "A strong option for volunteers who like using tech to help others."],
        ["Community form support", "Helpful, structured, and easy to document."]
      ]
    }
  }
};

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

function renderRecommendations() {
  const group = interestGroup.value;
  const comfort = interestComfort.value;
  const setting = interestSetting.value;
  const picks = recommendationMap[group][comfort][setting];

  matcherResults.innerHTML = picks
    .slice(0, 2)
    .map(
      ([title, description]) => `
        <div class="recommendation-card">
          <strong>${title}</strong>
          <span>${description}</span>
        </div>
      `
    )
    .join("");
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
matcherButton.addEventListener("click", renderRecommendations);

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    sideMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

setActiveView("dashboard");
setProfile("volunteer");
renderCards();
