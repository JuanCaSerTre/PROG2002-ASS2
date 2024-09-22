// main.js
// Fetch all active fundraisers and display them on the Home page
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/fundraisers")
    .then((response) => response.json())
    .then((fundraisers) => {
      const fundraisersContainer = document.getElementById("fundraisers");
      fundraisers.forEach((fundraiser) => {
        // Create a card div
        const fundraiserCard = document.createElement("div");
        fundraiserCard.classList.add("card");

        // Populate the card with fundraiser data
        fundraiserCard.innerHTML = `
                    <h3>${fundraiser.CAPTION}</h3>
                    <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                    <p><strong>Target:</strong> $${fundraiser.TARGET_FUNDING}</p>
                    <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                    <p><strong>City:</strong> ${fundraiser.CITY}</p>
                    <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
                    <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                `;

        // Add the card to the grid container
        fundraisersContainer.appendChild(fundraiserCard);
      });
    })
    .catch((error) => console.error("Error fetching fundraisers:", error));
});
