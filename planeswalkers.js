let planeswalkers = [];

// Fetch planeswalker data from the JSON file
fetch('planeswalkers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load planeswalkers data");
        }
        return response.json();
    })
    .then(data => {
        planeswalkers = data;
        console.log("Planeswalkers loaded:", planeswalkers);
    })
    .catch(error => console.error("Error loading planeswalkers data:", error));

// Function to handle planeswalker search
function searchPlaneswalkers(event) {
    event.preventDefault(); // Prevent default form submission

    const searchTerm = document.getElementById("planeswalker-search").value.toLowerCase();

    const results = planeswalkers.filter(pw => pw.name.toLowerCase().includes(searchTerm));

    displayPlaneswalkerResults(results);
}

// Function to display search results
function displayPlaneswalkerResults(results) {
    const resultsDiv = document.getElementById("planeswalker-results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No planeswalkers found matching your search.</p>";
        return;
    }

    results.forEach(pw => {
        const pwElement = document.createElement("div");
        pwElement.classList.add("card");
        pwElement.innerHTML = `
            <h3>${pw.name}</h3>
            <p>Color: ${pw.color}</p>
            <p>${pw.description}</p>
        `;
        resultsDiv.appendChild(pwElement);
    });
}

// Attach event listener to the form's submit event
document.getElementById("search-form").addEventListener("submit", searchPlaneswalkers);