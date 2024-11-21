let cards = [];
const cardsPerPage = 5; // Number of cards per page
let currentPage = 1;

// Fetch card data
fetch('cards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch card data.");
        }
        return response.json();
    })
    .then(data => {
        cards = data;
        console.log("Cards loaded successfully:", cards);
        displayResults(cards); // Display all cards on page load
    })
    .catch(error => console.error("Error loading cards:", error));

// Attach event listener to the search form
document.getElementById("search-form").addEventListener("submit", searchCards);

// Attach event listener to the "Surprise Me" button
document.getElementById("random-card").addEventListener("click", () => {
    if (cards.length === 0) {
        alert("Card data is not loaded yet.");
        return;
    }
    const randomIndex = Math.floor(Math.random() * cards.length);
    console.log("Random Card:", cards[randomIndex]); // Debugging
    displayResults([cards[randomIndex]]);
});

// Search function
function searchCards(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const colorInput = document.getElementById("color");
    const manaCostInput = document.getElementById("mana-cost");
    const typeInput = document.getElementById("type");

    const name = nameInput.value.toLowerCase();
    const color = colorInput.value.toLowerCase();
    const manaCost = manaCostInput.value ? parseInt(manaCostInput.value) : null;
    const type = typeInput.value.toLowerCase();

    const results = cards.filter(card => {
        return (
            (!name || card.name.toLowerCase().includes(name)) &&
            (!color || card.color.toLowerCase().includes(color)) &&
            (!manaCost || card.manaCost === manaCost) &&
            (!type || card.type.toLowerCase().includes(type))
        );
    });

    currentPage = 1; // Reset to the first page
    displayResults(results);
}

// Function to display results with pagination
function displayResults(results) {
    const resultsDiv = document.getElementById("search-results");
    const paginationDiv = document.getElementById("pagination");
    resultsDiv.innerHTML = "";
    paginationDiv.innerHTML = "";

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No cards found matching your criteria.</p>";
        return;
    }

    // Pagination logic
    const totalPages = Math.ceil(results.length / cardsPerPage);
    const start = (currentPage - 1) * cardsPerPage;
    const paginatedResults = results.slice(start, start + cardsPerPage);

    // Display paginated cards
    paginatedResults.forEach(card => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.innerHTML = `
            <h3>${card.name}</h3>
            <p>Color: ${card.color}</p>
            <p>Mana Cost: ${card.manaCost}</p>
            <p>Type: ${card.type}</p>
        `;
        resultsDiv.appendChild(cardElement);
    });

    // Generate pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-button");
        if (i === currentPage) button.classList.add("active");
        button.addEventListener("click", () => {
            currentPage = i;
            displayResults(results);
        });
        paginationDiv.appendChild(button);
    }
}