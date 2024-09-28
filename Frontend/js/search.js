// search.js

// Wait for the DOM to fully load before executing any code
document.addEventListener("DOMContentLoaded", () => {
  // Fetch categories from the API to populate the category dropdown
  fetch("http://localhost:3000/api/categories")
    .then((response) => response.json()) // Convert the response to JSON
    .then((categories) => {
      // Get the category dropdown element
      const categorySelect = document.getElementById("category");

      // Loop through each category and add it as an option in the dropdown
      categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.NAME; // Set the option's value attribute
        option.textContent = category.NAME; // Set the option's display text
        categorySelect.appendChild(option); // Add the option to the dropdown
      });
    })
    .catch(
      (error) => console.error("Error fetching categories:", error) // Log any errors encountered
    );

  // Get the search form element
  const searchForm = document.getElementById("fundraiser-search-form");

  // Handle the search form submission
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the form's default submission behavior

    // Retrieve values from the search form inputs
    const organizer = document.getElementById("organizer").value;
    const city = document.getElementById("city").value;
    const category = document.getElementById("category").value;

    // Fetch search results based on the input values
    fetch(
      `http://localhost:3000/api/fundraisers/search?organizer=${organizer}&city=${city}&category=${category}`
    )
      .then((response) => response.json()) // Convert the response to JSON
      .then((results) => {
        // Get the container element for displaying search results
        const resultsContainer = document.getElementById("search-results");
        resultsContainer.innerHTML = ""; // Clear any previous search results

        // Check if any results were returned
        if (results.length === 0) {
          // Display a message if no fundraisers are found
          resultsContainer.innerHTML =
            '<p class="error">No fundraisers found.</p>';
        } else {
          // Loop through each fundraiser result and create a card for it
          results.forEach((fundraiser) => {
            const card = document.createElement("div");
            card.classList.add("card"); // Add the 'card' class for styling

            // Populate the card with fundraiser data using template literals
            card.innerHTML = `
                              <img src="src/${fundraiser.CAPTION}.jpg" alt="${fundraiser.CAPTION}" style="width: 100%; height: auto;" onerror="this.src='src/default.jpg';"/>
                              <h3>${fundraiser.CAPTION}</h3>
                              <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                              <p><strong>Target:</strong> $${fundraiser.TARGET_FUNDING}</p>
                              <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                              <p><strong>City:</strong> ${fundraiser.CITY}</p>
                              <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
                              <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                          `;

            // Append the populated card to the search results container
            resultsContainer.appendChild(card);
          });
        }
      })
      .catch(
        (error) => console.error("Error fetching search results:", error) // Log any errors encountered
      );
  });

  // Clear button functionality
  document.getElementById("clear-btn").addEventListener("click", () => {
    // Clear the values of the search form inputs
    document.getElementById("organizer").value = "";
    document.getElementById("city").value = "";
    document.getElementById("category").value = "";

    // Clear the search results display area
    document.getElementById("search-results").innerHTML = "";
  });
});
