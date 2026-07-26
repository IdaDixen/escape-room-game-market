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
/*     const languageFilter = document.getElementById("language-filter").value;
    const conditionFilter = document.getElementById("condition-filter").value;
    const priceFilter = document.getElementById("price-filter").value;
 */
    const languageFilter = null;//"Dansk";
    const conditionFilter = null;
    const priceFilter = null;//100;

    const filteredGames = games.filter(game => languageFilter != null? game.language === languageFilter: true)
                                .filter(game => conditionFilter != null? game.condition === conditionFilter: true)
                                .filter(game => priceFilter != null? game.price <= priceFilter: true)

    return filteredGames
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

renderGames(filteredGames);