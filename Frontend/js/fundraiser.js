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
                <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p>
                <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                <p><strong>City:</strong> ${fundraiser.CITY}</p>
                <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
            `;
    })
    .catch((error) =>
      console.error("Error fetching fundraiser details:", error)
    );

  // Donate button event listener
  document.getElementById("donate-btn").addEventListener("click", () => {
    alert("This feature is under construction");
  });

  // Back to previous page button event listener
  document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back(); // Takes the user back to the previous page
  });
});
