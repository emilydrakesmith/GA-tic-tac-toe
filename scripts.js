/******* STATE *******/

const gameState = {
    player1Turn: true,
    p1Boxes: [],
    p2Boxes: [],
    totalTurns: 0,
    winner: false
}

/******* RENDER FUNCTIONS *******/

function renderMain() {
    document.getElementById('body').innerHTML = `<main id='main'>
                                                    <section id='game-board'></section>
                                                    <section id='outcome'></section>
                                                 </main>`;
}

function renderGameDivs() {
    const gameBoard = document.getElementById('game-board');
    for (let i=0; i<9; i++) {
        gameBoard.insertAdjacentHTML('beforeend', `<div class='game-box' 
                                                        id=${i+1}
                                                        onclick='handleClick(event)'
                                                   </div>`
                                    );
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
            gameState.p1Boxes.push(clickedBoxId);
            console.log(gameState.p1Boxes);
            clickedBox.className += ' p1-box';
            clickedBox.innerHTML = 'X';
            gameState.player1Turn = false;
        }
    } else if (gameState.player1Turn === false) {
        if (clickedBoxClasses === 'game-box') {
            gameState.p2Boxes.push(clickedBoxId);
            console.log(gameState.p2Boxes);
            clickedBox.className += ' p2-box';
            clickedBox.innerHTML = 'O';
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
                console.log(`p1Boxes length: ${gameState.p1Boxes.length}`)
                if (gameState.p1Boxes.length >= 3
                    && gameState.p1Boxes.includes(winConditions[i][0])
                    && gameState.p1Boxes.includes(winConditions[i][1])
                    && gameState.p1Boxes.includes(winConditions[i][2])) {
                        declareWinner('p1');
                }
            }
    } else if (gameState.player1Turn === true) {
        for (let i=0; i<winConditions.length; i++) {
                console.log(`p2Boxes length: ${gameState.p2Boxes.length}`)
                if (gameState.p2Boxes.length >= 3
                    && gameState.p2Boxes.includes(winConditions[i][0])
                    && gameState.p2Boxes.includes(winConditions[i][1])
                    && gameState.p2Boxes.includes(winConditions[i][2])) {
                        declareWinner('p2');
                }
            }
        }

    if (gameState.totalTurns === 9 && gameState.winner === false) {
        declareStalemate();
    }
}

function declareWinner(color) {
    gameState.winner = true;
    console.log(`${color} wins`);
    const messageBox = document.getElementById('outcome');
    if (color === 'p1') {
        messageBox.innerHTML = `<h2>X Wins!</h2>`;
    } else if (color === 'p2') {
        messageBox.innerHTML = `<h2>O Wins!</h2>`;
    }
    document.getElementById('body').setAttribute('style', 'pointer-events:none');
}

function declareStalemate() {
    document.getElementById('outcome').innerHTML = `<h2>It's a stalemate!</h2>`;
    console.log(`stalemate`);
    document.getElementById('body').setAttribute('style', 'pointer-events:none');
}

/******* INITIALIZE FUNCTION *******/

function initialize() {
    renderMain();
    renderGameDivs();
}

initialize();