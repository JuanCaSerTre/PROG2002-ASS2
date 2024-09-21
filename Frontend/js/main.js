// main.js
// Fetch all active fundraisers and display them on the Home page
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/fundraisers")
    .then((response) => response.json())
    .then((fundraisers) => {
      const fundraisersContainer = document.getElementById("fundraisers");
      fundraisers.forEach((fundraiser) => {
        const fundraiserDiv = document.createElement("div");
        fundraiserDiv.innerHTML = `
                    <h3>${fundraiser.CAPTION}</h3>
                    <p>Organizer: ${fundraiser.ORGANIZER}</p>
                    <p>Target: $${fundraiser.TARGET_FUNDING}</p>
                    <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
                    <p>City: ${fundraiser.CITY}</p>
                    <p>Category: ${fundraiser.CATEGORY}</p>
                    <a href="fundraiser.html?id=${fundraiser.FUNDRAISER_ID}">View Details</a>
                `;
        fundraisersContainer.appendChild(fundraiserDiv);
      });
    })
    .catch((error) => console.error("Error fetching fundraisers:", error));
});
