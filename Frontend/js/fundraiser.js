// fundraiser.js

// Wait for the DOM to fully load before executing any code
document.addEventListener("DOMContentLoaded", () => {
  // Extract the fundraiser ID from the URL's query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const fundraiserId = urlParams.get("id"); // Get the 'id' parameter value

  // Fetch fundraiser details from the server using the extracted ID
  fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`)
    .then((response) => response.json()) // Convert the response to JSON
    .then((fundraiser) => {
      // Get the HTML container where fundraiser details will be displayed
      const detailsContainer = document.getElementById("fundraiser-details");

      // Populate the container with fundraiser information using template literals
      detailsContainer.innerHTML = `
                  <h2>${fundraiser.CAPTION}</h2>
                  <p><strong>Organizer:</strong> ${fundraiser.ORGANIZER}</p>
                  <p><strong>Target Funding:</strong> $${fundraiser.TARGET_FUNDING}</p>
                  <p><strong>Current Funding:</strong> $${fundraiser.CURRENT_FUNDING}</p>
                  <p><strong>City:</strong> ${fundraiser.CITY}</p>
                  <p><strong>Category:</strong> ${fundraiser.CATEGORY}</p>
              `;
    })
    .catch(
      (error) => console.error("Error fetching fundraiser details:", error) // Log any errors encountered
    );

  // Attach an event listener to the "Donate" button
  document.getElementById("donate-btn").addEventListener("click", () => {
    // Display a message indicating that the feature is not yet implemented
    alert("This feature is under construction");
  });

  // Attach an event listener to the "Back" button
  document.getElementById("back-btn").addEventListener("click", () => {
    // Navigate the user back to the previous page
    window.history.back();
  });
});
