document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fundraiserId = urlParams.get("id");

  fetch(`http://localhost:3000/api/fundraisers/${fundraiserId}`)
    .then((response) => response.json())
    .then((fundraiser) => {
      const detailsContainer = document.getElementById("fundraiser-details");
      const imageElement = document.getElementById("fundraiser-image");

      // Set the image source based on the CAPTION and display it
      const imagePath = `src/${fundraiser.CAPTION}.jpg`;
      imageElement.src = imagePath;
      imageElement.style.display = "block"; // Display the image

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

  document.getElementById("donate-btn").addEventListener("click", () => {
    alert("This feature is under construction");
  });

  document.getElementById("back-btn").addEventListener("click", () => {
    window.history.back();
  });
});
