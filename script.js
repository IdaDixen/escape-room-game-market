function createGameAd(game) {
    let element = document.createElement("a");
    element.classList.add("game");
    element.href = `game.html?id=${game.id}`
    element.innerHTML = `
        <img src="${game.imageUrl}">
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


// Temporary game data
const games = [
    {
        title: "Unlock 1! Escape adventures (Dansk)",
        language: "Dansk",
        price: 120,
        condition: "Som ny",
        timesPlayed: 1,
        imageUrl: "images/Unlock1-escape-adventures-dansk.jpg",
        id: "1"
    },
    {
        title: "Exit The Game 13: Bortført i Fortune city",
        language: "Dansk",
        price: 60,
        condition: "God, men brugt",
        timesPlayed: 1,
        imageUrl: "images/exit13-bortført-i-fortune-city.jpg",
        id: "2"
    },
    {
        title: "Escape Room Spillet 2",
        language: "Dansk",
        price: 50,
        condition: "Kræver reperation",
        timesPlayed: 1,
        imageUrl: "images/escape-room-spillet-2.jpg",
        id: "3"
    },
    {
        title: "Unlock 11! Extraordinary adventures",
        language: "Engelsk",
        price: 120,
        condition: "Som ny",
        timesPlayed: 1,
        imageUrl: "images/Unlock11-extraordinary-adventures.jpg",
        id: "4"
    },
    {
        title: "Unlock! Fantastiske eventyr",
        language: "Engelsk",
        price: 120,
        condition: "Som ny",
        timesPlayed: 1,
        imageUrl: "images/Unlock-fantastiske-eventyr-dansk.jpg",
        id: "5"
    }
];

// If there is a game-list class, then create game-list and update on filters and sort selections
if (document.querySelector(".game-list")) {
    const filteredGames = filterGames(games)
    const sortedGames = sortGames(filteredGames)
    renderGames(sortedGames);

    document.querySelector(".filters").addEventListener("change", function () {
        const filteredGames = filterGames(games)
        const sortedGames = sortGames(filteredGames)
        renderGames(sortedGames);
    });
}

// Search for game ad ID, to open the correct game ad on game.html
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id != null) {
    const game = games.find(game => game.id === id);
    const main = document.querySelector("main")
    let element = document.createElement("div");
    element.classList.add("game");
    main.appendChild(element);
    
    element.innerHTML = `
        <h2>${game.title}</h2>
        <img src="${game.imageUrl}">
        <p>Sprog: ${game.language}</p>
        <p>Stand: ${game.condition}</p>
        <p>Antal gange spillet: ${game.timesPlayed}</p>
        <p class="price">${game.price} kr.</p>
    `;
}
