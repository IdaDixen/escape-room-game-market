function createGameAd(game) {
    let element = document.createElement("div");
    element.classList.add("game");
    element.innerHTML = `
        <h3>${game.title}</h3>
        <p>Sprog: ${game.language}</p>
        <p>Stand: ${game.condition}</p>
        <p>Antal gange spillet: ${game.timesPlayed}</p>
        <p class="price">${game.price} kr.</p>
    `;
    return element;
}

function renderGames(games) {
    const gameAds = document.querySelector(".game-list");
    gameAds.innerHTML = "";
    games.forEach(game => {
        let ad = createGameAd(game);
        gameAds.appendChild(ad);
    });
}

function filterGames(games) {
    const languageFilter = document.getElementById("language-filter").value || null;
    const conditionFilter = document.getElementById("condition-filter").value || null;
    const priceFilter = document.getElementById("price-filter").value || null;
    const searchFilter = document.getElementById("search-filter").value;

    const filteredGames = games.filter(game => languageFilter != null ? game.language === languageFilter : true)
        .filter(game => conditionFilter != null ? game.condition === conditionFilter : true)
        .filter(game => priceFilter != null ? game.price <= priceFilter : true)
        .filter(game => game.title.toLowerCase().includes(searchFilter.toLowerCase()))

    return filteredGames
}

function sortGames(games) {
    const sortFilter = document.getElementById("sort-filter").value
    let sortedGames = [...games]

    switch (sortFilter) {
        case "price-asc":
            sortedGames.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            sortedGames.sort((a, b) => b.price - a.price);
            break;
        case "title-asc":
            sortedGames.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case "title-desc":
            sortedGames.sort((a, b) => b.title.localeCompare(a.title));
            break;
        default:
            break;
    }

    return sortedGames
}

const games = [
    {
        title: "Unlock 2",
        language: "Engelsk",
        price: 120,
        condition: "Som ny",
        timesPlayed: 5
        // imageUrl: "images/escape-room-the-game.jpg"
    },
    {
        title: "Exit: The Game",
        language: "Dansk",
        price: 80,
        condition: "God, men brugt",
        timesPlayed: 1
        // imageUrl: "images/exit-the-game.jpg"
    },
    {
        title: "Escape Room: The Game 2",
        language: "Dansk",
        price: 150,
        condition: "Uåbnet",
        timesPlayed: 0
        // imageUrl: "images/escape-room-the-game.jpg"
    },
    {
        title: "Deckscape: Test Time",
        language: "Engelsk",
        price: 100,
        condition: "God, men brugt",
        timesPlayed: 3
        // imageUrl: "images/deckscape-test-time.jpg"
    }
];

const filteredGames = filterGames(games)
const sortedGames = sortGames(filteredGames)
renderGames(sortedGames);

document.querySelector(".filters").addEventListener("change", function () {
    const filteredGames = filterGames(games)
    const sortedGames = sortGames(filteredGames)
    renderGames(sortedGames);
});