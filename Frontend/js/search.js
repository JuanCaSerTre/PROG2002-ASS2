// search.js
// Populate the category dropdown and handle search functionality
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categorySelect = document.getElementById("category");
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.NAME;
        option.textContent = category.NAME;
        categorySelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching categories:", error));

  const searchForm = document.getElementById("fundraiser-search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const organizer = document.getElementById("organizer").value;
    const city = document.getElementById("city").value;
    const category = document.getElementById("category").value;

    fetch(
      `http://localhost:3000/api/fundraisers/search?organizer=${organizer}&city=${city}&category=${category}`
    )
      .then((response) => response.json())
      .then((results) => {
        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = ""; // Clear previous results

        if (results.length === 0) {
          resultsContainer.innerHTML =
            '<p class="error">No fundraisers found.</p>';
        } else {
          results.forEach((fundraiser) => {
            const resultDiv = document.createElement("div");
            resultDiv.innerHTML = `<a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">${fundraiser.CAPTION}</a>`;
            resultsContainer.appendChild(resultDiv);
          });
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  });

  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("organizer").value = "";
    document.getElementById("city").value = "";
    document.getElementById("category").value = "";
  });
});
