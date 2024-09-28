// main.js

// Wait for the DOM to fully load before executing any code
document.addEventListener("DOMContentLoaded", () => {
  // Fetch all active fundraisers from the API
  fetch("http://localhost:3000/api/fundraisers")
    .then((response) => response.json()) // Convert the response to JSON
    .then((fundraisers) => {
      // Get the HTML container where the fundraiser cards will be displayed
      const fundraisersContainer = document.getElementById("fundraisers");

      // Loop through each fundraiser and create a card for it
      fundraisers.forEach((fundraiser) => {
        // Create a div element to serve as the card container
        const fundraiserCard = document.createElement("div");
        fundraiserCard.classList.add("card"); // Add the 'card' class for styling

        // Populate the card with fundraiser data using template literals
        fundraiserCard.innerHTML = `
                      <img src="src/${fundraiser.CAPTION}.jpg" alt="${fundraiser.CAPTION}" style="width: 100%; height: auto;" onerror="this.src='src/default.jpg';"/>
                      <h3>${fundraiser.CAPTION}</h3>
                      <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                      <p><strong>Target:</strong> $${fundraiser.TARGET_FUNDING}</p>
                      <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                      <p><strong>City:</strong> ${fundraiser.CITY}</p>
                      <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
                      <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                  `;

        // Append the populated card to the fundraisers container in the DOM
        fundraisersContainer.appendChild(fundraiserCard);
      });
    })
    .catch(
      (error) => console.error("Error fetching fundraisers:", error) // Log any errors encountered
    );
});
