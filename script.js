const board = document.querySelector(".board");
const form = document.querySelector("form");
const formButton = form.querySelector("button");
const result = document.querySelector(".game-result");

const gameboard = (function () {
    const arr = Array(9).fill(0);
    const get = (y, x) => arr[y * 3 + x];
    const set = (y, x, val) => (arr[y * 3 + x] = val);
    const full = () => arr.every((curr) => curr !== 0);
    const reset = () => arr.fill(0);
    return { set, get, full, reset };
})();

function createPlayer(name, marker) {
    const m_name = name;
    const m_marker = marker;

    const win = () => (result.textContent = `${m_name} wins!`);
    return { win, m_marker };
}

let players = [createPlayer("Player 1", 1), createPlayer("Player 2", 2)];

function winCheck(marker) {
    for (let i = 0; i < 3; ++i) {
        let won = true;
        for (let j = 0; j < 3; ++j) {
            if (gameboard.get(i, j) === marker) continue;
            won = false;
            break;
        }
        if (won) return true;
    }

    for (let i = 0; i < 3; ++i) {
        let won = true;
        for (let j = 0; j < 3; ++j) {
            if (gameboard.get(j, i) === marker) continue;
            won = false;
            break;
        }
        if (won) return true;
    }

    let won = true;
    for (let i = 0; i < 3; ++i) {
        if (gameboard.get(i, i) === marker) continue;
        won = false;
        break;
    }
    if (won) return true;

    won = true;
    for (let i = 0; i < 3; ++i) {
        if (gameboard.get(i, 2 - i) === marker) continue;
        won = false;
        break;
    }
    return won;
}

const game = (function () {
    let turnOne = false;
    let gameDone = false;
    function playRound(y, x) {
        const marker = players[turnOne ? 1 : 0].m_marker;
        gameboard.set(y, x, marker);
        if (winCheck(marker)) {
            players[turnOne ? 1 : 0].win();
            gameDone = true;
        } else if (gameboard.full()) {
            result.textContent = "Tie! Both players draw.";
            gameDone = true;
        }
        turnOne = !turnOne;
    }

    const finished = () => gameDone;
    const getTurn = () => turnOne;
    const reset = () => {
        turnOne = false;
        gameDone = false;
    };
    return { playRound, finished, getTurn, reset };
})();

board.addEventListener("click", (e) => {
    const cell = e.target;
    if (cell.className !== "cell" || game.finished()) return;
    cell.className = game.getTurn() ? "player-two" : "player-one";
    game.playRound(+cell.dataset.y, +cell.dataset.x);
});

formButton.addEventListener("click", (e) => {
    reset();
    e.preventDefault();
});

function reset() {
    const playerOne = form.querySelector(".player-one-name").value;
    const playerTwo = form.querySelector(".player-two-name").value;
    players = [createPlayer(playerOne, 1), createPlayer(playerTwo, 2)];
    const childArr = [];
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            const cell = document.createElement("div");
            cell.classList = "cell";
            cell.dataset.y = i;
            cell.dataset.x = j;
            childArr.push(cell);
        }
    }
    board.replaceChildren(...childArr);
    game.reset();
    gameboard.reset();
    result.textContent = "";
}
reset();
