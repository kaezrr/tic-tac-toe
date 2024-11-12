const gameboard = (function () {
    const arr = Array(9).fill(0);
    const get = (y, x) => arr[y * 3 + x];
    const set = (y, x, val) => (arr[y * 3 + x] = val);
    const full = () => arr.every((curr) => curr !== 0);
    return { set, get, full };
})();

function createPlayer(name, marker) {
    const m_name = name;
    const m_marker = marker;

    const win = () => console.log(`Player ${m_name} wins!`);
    return { win, m_marker };
}

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
    const players = [createPlayer("One", 1), createPlayer("Two", 2)];
    let turnOne = false;
    let gameDone = false;
    function playRound(y, x) {
        if (gameboard.get(y, x) !== 0) return;
        const marker = players[turnOne ? 1 : 0].m_marker;
        gameboard.set(y, x, marker);
        if (winCheck(marker)) {
            players[turnOne ? 1 : 0].win();
            gameDone = true;
        } else if (gameboard.full()) {
            console.log("Tie! Both players draw.");
            gameDone = true;
        }
        turnOne = !turnOne;
    }
    return { playRound, gameDone };
})();

function display() {
    for (let i = 0; i < 3; ++i) {
        let line = "";
        for (let j = 0; j < 3; ++j) {
            switch (gameboard.get(i, j)) {
                case 0:
                    line += " - ";
                    break;
                case 1:
                    line += " X ";
                    break;
                case 2:
                    line += " O ";
                    break;
            }
        }
        console.log(line);
    }
    console.log("-----------------------------");
}

game.playRound(0, 0);
display();
game.playRound(1, 2);
display();
game.playRound(1, 1);
display();
game.playRound(1, 0);
display();
game.playRound(2, 2);
display();
