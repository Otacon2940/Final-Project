let planeswalkers = [];
const planeswalkersPerPage = 5; // Number of planeswalkers to show per page
let currentPage = 1;

// Fetch planeswalker data from the JSON file
fetch('planeswalkers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch planeswalker data. Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        planeswalkers = data;
        console.log("Planeswalkers loaded successfully:", planeswalkers); // Debugging
        displayPlaneswalkerResults(planeswalkers); // Display all on page load
    })
    .catch(error => console.error("Error loading planeswalker data:", error));

// Attach event listener to the search form
document.getElementById("planeswalker-search-form").addEventListener("submit", searchPlaneswalkers);

// Handle "Surprise Me" button
document.getElementById("random-planeswalker").addEventListener("click", () => {
    if (planeswalkers.length === 0) {
        alert("Planeswalker data is not loaded yet.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * planeswalkers.length);
    displayPlaneswalkerResults([planeswalkers[randomIndex]]);
});

// Search function
function searchPlaneswalkers(event) {
    event.preventDefault();

    const nameInput = document.getElementById("planeswalker-name");
    const colorInput = document.getElementById("planeswalker-color");

    if (!nameInput || !colorInput) {
        console.error("Input fields not found. Check the IDs in your HTML.");
        return;
    }

    const name = nameInput.value.toLowerCase();
    const color = colorInput.value.toLowerCase();

    console.log("Search criteria:", { name, color }); // Debugging

    const results = planeswalkers.filter(pw => {
        return (
            (!name || pw.name.toLowerCase().includes(name)) &&
            (!color || pw.color.toLowerCase().includes(color))
        );
    });

    console.log("Filtered results:", results); // Debugging

    currentPage = 1; // Reset to the first page
    displayPlaneswalkerResults(results);
}

// Function to display results with pagination
function displayPlaneswalkerResults(results) {
    const resultsDiv = document.getElementById("planeswalker-results");
    const paginationDiv = document.getElementById("pagination");

    if (!resultsDiv || !paginationDiv) {
        console.error("Results or pagination container not found. Check your HTML.");
        return;
    }

    resultsDiv.innerHTML = "";
    paginationDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No planeswalkers found matching your criteria.</p>";
        return;
    }

    // Pagination logic
    const totalPages = Math.ceil(results.length / planeswalkersPerPage);
    const start = (currentPage - 1) * planeswalkersPerPage;
    const paginatedResults = results.slice(start, start + planeswalkersPerPage);

    // Display paginated planeswalkers
    paginatedResults.forEach(pw => {
        const pwElement = document.createElement("div");
        pwElement.classList.add("card");
        pwElement.innerHTML = `
            <h3>${pw.name}</h3>
            <p>Color: ${pw.color}</p>
            <p>${pw.description}</p>
        `;
        resultsDiv.appendChild(pwElement);
    });

    // Generate pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");
        if (i === currentPage) button.classList.add("active");
        button.addEventListener("click", () => {
            currentPage = i;
            displayPlaneswalkerResults(results);
        });
        paginationDiv.appendChild(button);
    }
}
