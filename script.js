
function createGameElement(game) {
    let element = document.createElement("div");
    element.classList.add("game");
    element.innerHTML = `
        <h3>${game.title}</h3>
        <p>Pris: ${game.price} kr.</p>
        <p>Stand: ${game.condition}</p>
        <p>Antal gange spillet: ${game.timesPlayed}</p>
    `;
    return element;
}


const game = {
    title: "Unlock 2",
    price: 120,
    condition: "Som ny",
    timesPlayed: 5,
    // description: "Et spændende escape room spil, der kan spilles hjemme. Indeholder flere scenarier og gåder.",
    // imageUrl: "images/escape-room-the-game.jpg"
};

let ad = createGameElement(game);
document.querySelector(".game-list").appendChild(ad);


console.log(ad);