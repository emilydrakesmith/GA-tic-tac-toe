/******* STATE *******/

const gameState = {
    player1Turn: true,
    redBoxes: [],
    greenBoxes: [],
    totalTurns: 0,
    winner: false
}

/******* RENDER FUNCTIONS *******/

function renderMain() {
    const body = document.getElementById('body');
    body.innerHTML = `<main id='main'>
                        <section id='game-board'></section>
                        <section id='outcome'></section>
                      </main>`;
}

function renderGameDivs() {
    const gameBoard = document.getElementById('game-board');
    for (let i=0; i<9; i++) {
        gameBoard.insertAdjacentHTML('beforeend', `<div class='game-box' 
                                                        id=${i+1}
                                                        onclick='handleClick(event)'>
                                                   </div>`);
    }
}

/******* EVENT LISTENER *******/

function handleClick(event) {
    gameState.totalTurns += 1;
    const clickedBox = event.currentTarget;
    const clickedBoxClasses = clickedBox.getAttribute('class');
    const clickedBoxId = parseInt(clickedBox.getAttribute('id'));
    console.log(clickedBoxId)

    if (gameState.player1Turn === true) {
        if (clickedBoxClasses === 'game-box') {
            gameState.redBoxes.push(clickedBoxId);
            console.log(gameState.redBoxes);
            clickedBox.className += ' red-box';
            gameState.player1Turn = false;
        }
    } else if (gameState.player1Turn === false) {
        if (clickedBoxClasses === 'game-box') {
            gameState.greenBoxes.push(clickedBoxId);
            console.log(gameState.greenBoxes);
            clickedBox.className += ' green-box';
            gameState.player1Turn = true;
        }
    }
    checkWin();
}

/******* STRUCTURAL FUNCTION *******/

function checkWin() {
    const winConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];



    if (gameState.player1Turn === false) {
        for (let i=0; i<winConditions.length; i++) {
                console.log(`redBoxes length: ${gameState.redBoxes.length}`)
                if (gameState.redBoxes.length >= 3
                    && gameState.redBoxes.includes(winConditions[i][0])
                    && gameState.redBoxes.includes(winConditions[i][1])
                    && gameState.redBoxes.includes(winConditions[i][2])) {
                        declareWinner('red');
                }
            }
    } else if (gameState.player1Turn === true) {
        for (let i=0; i<winConditions.length; i++) {
                console.log(`greenBoxes length: ${gameState.greenBoxes.length}`)
                if (gameState.greenBoxes.length >= 3
                    && gameState.greenBoxes.includes(winConditions[i][0])
                    && gameState.greenBoxes.includes(winConditions[i][1])
                    && gameState.greenBoxes.includes(winConditions[i][2])) {
                        declareWinner('green');
                }
            }
        }

    if (gameState.totalTurns === 9 && gameState.winner === false) {
        declareStalemate();
    }
}

function declareWinner(color) {
    gameState.winner = true;
    console.log(`${color} wins`)
}

function declareStalemate() {
    gameState.winner = true;
    console.log(`stalemate`)
}

/******* INITIALIZE FUNCTION *******/

function initialize() {
    renderMain();
    renderGameDivs();}

initialize();