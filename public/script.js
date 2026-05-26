const filterPills = document.querySelectorAll(".filter-pill");
const searchInput = document.querySelector("#searchInput");
const cards = document.querySelectorAll(".opportunity-card");

let activeFilter = "all";

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const category = card.dataset.category;
    const searchText = card.dataset.search;
    const matchesFilter = activeFilter === "all" || category === activeFilter;
    const matchesQuery = !query || searchText.includes(query);

    card.classList.toggle("hidden", !(matchesFilter && matchesQuery));
  });
}

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    activeFilter = pill.dataset.filter;

    filterPills.forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
    renderCards();
  });
});

searchInput.addEventListener("input", renderCards);
renderCards();
