// search.js
// Populate the category dropdown and handle search functionality
document.addEventListener("DOMContentLoaded", () => {
  // Fetch categories to populate the dropdown
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

  // Handle the search form submission
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
            // Create a card for each fundraiser result
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                            <h3>${fundraiser.CAPTION}</h3>
                            <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                            <p><strong>Target:</strong> $${fundraiser.TARGET_FUNDING}</p>
                            <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                            <p><strong>City:</strong> ${fundraiser.CITY}</p>
                            <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
                            <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                        `;

            // Add the card to the results container
            resultsContainer.appendChild(card);
          });
        }
      })
      .catch((error) => console.error("Error fetching search results:", error));
  });

  // Clear button functionality
  document.getElementById("clear-btn").addEventListener("click", () => {
    document.getElementById("organizer").value = "";
    document.getElementById("city").value = "";
    document.getElementById("category").value = "";
    document.getElementById("search-results").innerHTML = ""; // Clear search results
  });
});
