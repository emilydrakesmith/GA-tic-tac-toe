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
    document.getElementById('body').innerHTML = `<header>
                                                    <h1>Tic Tac Toe!</h1>
                                                </header>
                                                <main id='main'>
                                                    <section id='game-board'></section>
                                                    <section id='outcome'>Player X Goes First!<br>Click a square!</section>
                                                    <section id='restart-box' onclick='resetGame()'>
                                                        <h2>Click to Restart</h2>
                                                    </section>
                                                </main>
                                                <footer id='footer'>
                                                    <div>© Marty Smith 2021</div>
                                                    <div>
                                                        <a href='https://github.com/mhsmith321/GA-tic-tac-toe' target='_blank' class='footer-link'>GitHub Repo</a>  •
                                                        <a href='https://martysmith.tech/' target='_blank' class='footer-link'>Developer Webpage</a>
                                                    </div>
                                                </footer>`;
}

function renderGameDivs() {
    const gameBoard = document.getElementById('game-board');
    for (let i=0; i<9; i++) {
        gameBoard.insertAdjacentHTML('beforeend',  `<div class='game-box' 
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
    if (gameState.player1Turn === true) {
        if (clickedBoxClasses === 'game-box') {
            gameState.p1Boxes.push(clickedBoxId);
            clickedBox.className += ' p1-box';
            clickedBox.innerHTML = 'X';
            document.getElementById('outcome').innerHTML = 'Player O Goes!';
            gameState.player1Turn = false;
        }
    } else if (gameState.player1Turn === false) {
        if (clickedBoxClasses === 'game-box') {
            gameState.p2Boxes.push(clickedBoxId);
            clickedBox.className += ' p2-box';
            clickedBox.innerHTML = 'O';
            document.getElementById('outcome').innerHTML = 'Player X Goes!';
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
                if (gameState.p1Boxes.length >= 3
                    && gameState.p1Boxes.includes(winConditions[i][0])
                    && gameState.p1Boxes.includes(winConditions[i][1])
                    && gameState.p1Boxes.includes(winConditions[i][2])) {
                        declareWinner('p1');
                }
            }
    } else if (gameState.player1Turn === true) {
        for (let i=0; i<winConditions.length; i++) {
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
    const messageBox = document.getElementById('outcome');
    const p1WinOutput = `<h2 class='outcome-text'>X Wins!</h2>`;
    const p2WinOutput = `<h2 class='outcome-text'>O Wins!</h2>`;
    messageBox.innerHTML = (color === 'p1') ? p1WinOutput : p2WinOutput;
    document.getElementsByClassName('game-box').setAttribute('style', 'pointer-events:none');
}

function declareStalemate() {
    document.getElementById('outcome').innerHTML = `<h2 class='outcome-text'>It's a stalemate!</h2>`;
    document.getElementById('body').setAttribute('style', 'pointer-events:none');
}

function resetGame() {
    gameState.player1Turn = true;
    gameState.p1Boxes = [];
    gameState.p2Boxes = [];
    gameState.totalTurns = 0;
    gameState.winner = false;
    initialize();
}

/******* INITIALIZE FUNCTION *******/

function initialize() {
    renderMain();
    renderGameDivs();
}

initialize();