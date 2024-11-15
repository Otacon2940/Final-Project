let cards = [];

// Fetch card data from the JSON file
fetch('cards.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to load cards data");
        }
        return response.json();
    })
    .then(data => {
        cards = data;
        console.log("Cards loaded:", cards);
    })
    .catch(error => console.error("Error loading cards data:", error));

// Function to handle card search
function searchCards(event) {
    event.preventDefault(); // Prevent default form submission

    const color = document.getElementById("color").value.toLowerCase();
    const manaCost = document.getElementById("mana-cost").value
        ? parseInt(document.getElementById("mana-cost").value)
        : null;
    const type = document.getElementById("type").value.toLowerCase();

    const results = cards.filter(card => {
        return (
            (!color || card.color === color) &&
            (!manaCost || card.manaCost === manaCost) &&
            (!type || card.type.toLowerCase().includes(type))
        );
    });

    displayResults(results);
}

// Function to display search results
function displayResults(results) {
    const resultsDiv = document.getElementById("search-results");
    resultsDiv.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No cards found matching your criteria.</p>";
        return;
    }

    results.forEach(card => {
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
}

// Attach event listener to the form's submit event
document.getElementById("search-form").addEventListener("submit", searchCards);