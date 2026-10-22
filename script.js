// Link database
const supabaseUrl = "https://uzqxwqlmqyfsjjayeptc.supabase.co";
const supabaseKey = "sb_publishable_j3_5xVK9QJfBzeQhTB70Og_kBS91v_f";
// REMEMBER!! READ ACCESS ONLY!!

const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// get game data from database
async function getGames() {
    const { data, error } = await supabaseClient
        .from("games")
        .select("*");

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}


// Create game ad
function createGameAd(game) {
    const element = document.createElement("a");
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

// list all game ads
function renderGames(games) {
    const gameAds = document.querySelector(".game-list");
    gameAds.innerHTML = "";
    games.forEach(game => {
        let ad = createGameAd(game);
        gameAds.appendChild(ad);
    });
}

// filter game list
function filterGames(games) {
    const languageFilter = document.getElementById("language-filter").value || null;
    const conditionFilter = document.getElementById("condition-filter").value || null;
    const priceFilter = document.getElementById("price-filter").value || null;
    const searchFilter = document.getElementById("search-filter").value;

    const filteredGames = games.filter(game => languageFilter != null ? game.language === languageFilter : true)
        .filter(game => conditionFilter != null ? game.condition === conditionFilter : true)
        .filter(game => priceFilter != null ? game.price <= priceFilter : true)
        .filter(game => game.title.toLowerCase().includes(searchFilter.toLowerCase()))

    return filteredGames;
}

// sort game list
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

    return sortedGames;
}


// If there is a game-list class, then create game-list and update on filters and sort selections

async function showGames() {
    const games = await getGames();

    const filteredGames = filterGames(games)
    const sortedGames = sortGames(filteredGames)
    renderGames(sortedGames);

    document.querySelector(".filters").addEventListener("change", function () {
        const filteredGames = filterGames(games)
        const sortedGames = sortGames(filteredGames)
        renderGames(sortedGames);
    });
}

if (document.querySelector(".game-list")) {
    showGames();
}

// Search for game ad ID, to open the correct game ad on game.html
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

// Creat content on game.html?id= page

async function showGame() {
    const games = await getGames();

    const main = document.querySelector("main")
    const game = games.find(game => game.id === id);
    if (!game) {
        const element = document.createElement("div");
        main.appendChild(element);
        element.innerHTML = `
            <h1>Vi har desværre ikke et spil med dét ID</h1>
        `;
        return;
    }
    
    const element = document.createElement("div");
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
if (params.has("id")) {
    showGame();
}
