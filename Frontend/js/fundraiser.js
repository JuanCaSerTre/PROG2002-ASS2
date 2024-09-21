// fundraiser.js
// Fetch and display fundraiser details based on ID from URL
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fundraiserId = urlParams.get("id");

  fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`)
    .then((response) => response.json())
    .then((fundraiser) => {
      const detailsContainer = document.getElementById("fundraiser-details");
      detailsContainer.innerHTML = `
                <h2>${fundraiser.CAPTION}</h2>
                <p>Organizer: ${fundraiser.ORGANIZER}</p>
                <p>Target Funding: $${fundraiser.TARGET_FUNDING}</p>
                <p>Current Funding: $${fundraiser.CURRENT_FUNDING}</p>
                <p>City: ${fundraiser.CITY}</p>
                <p>Category: ${fundraiser.CATEGORY}</p>
            `;
    })
    .catch((error) =>
      console.error("Error fetching fundraiser details:", error)
    );

  document.getElementById("donate-btn").addEventListener("click", () => {
    alert("This feature is under construction");
  });
});
