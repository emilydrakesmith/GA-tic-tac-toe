/******* START: STATE *******/
const gameState = {
    player1Turn: true,
    p1Boxes: [],
    p2Boxes: [],
    totalTurns: 0,
    winner: false
}
/******* START: STATE *******/


/******* START: RENDER FUNCTIONS *******/
function renderMain() {
    const docBody = document.getElementById('body');
    const bodyTemplate =   `<header>
                                <h1>Tic Tac Toe!</h1>
                            </header>
                            <main id='main'>
                                <section id='game-board'></section>
                                <section id='outcome'>Player X Goes First!<br>Click a square!</section>
                                <section id='restart-box' onclick='resetGame()'><h2>Click to Restart</h2></section>
                            </main>
                            <footer>
                                <div>© Emily 2021</div>
                                <div>
                                    <a href='https://github.com/mhsmith321/GA-tic-tac-toe' target='_blank' class='footer-link'>GitHub Repo</a>  •
                                    <a href='https://emilysmith.tech/' target='_blank' class='footer-link'>Developer Webpage</a>
                                </div>
                            </footer>`;
    docBody.innerHTML = bodyTemplate;
}

function renderGameDivs() {
    const gameBoard = document.getElementById('game-board');
    for (let i=0; i<9; i++) {
        const gameBoxTemplate = `<div class='game-box unclaimed-box' id=${i+1} onclick='handleClick(event)'></div>`;
        gameBoard.insertAdjacentHTML('beforeend', gameBoxTemplate);
    }
}
/******* END: RENDER FUNCTIONS *******/


/******* START: EVENT LISTENERS *******/
function handleClick(event) {
    const clickedBox = event.currentTarget;
    const clickedBoxId = parseInt(clickedBox.getAttribute('id'));
    const currentPlayer = gameState.player1Turn === true ? 'player1' : 'player2';
    const outcomeBox = document.getElementById('outcome');
    processTurn(currentPlayer, clickedBox, clickedBoxId, outcomeBox);
    checkEndGame(currentPlayer);
}

function resetGame() {
    gameState.player1Turn = true;
    gameState.p1Boxes = [];
    gameState.p2Boxes = [];
    gameState.totalTurns = 0;
    gameState.winner = false;
    initialize();
}
/******* END: EVENT LISTENERS *******/


/******* START: STRUCTURAL FUNCTIONS *******/
function processTurn(player, clickedBox, clickedBoxId, outcomeBox) {
    gameState.totalTurns ++;
    clickedBox.onclick = null;
    if (player === 'player1') processPlayerOneMove(clickedBox, clickedBoxId, outcomeBox);
    if (player === 'player2') processPlayerTwoMove(clickedBox, clickedBoxId, outcomeBox);
}

function processPlayerOneMove(box, boxId, resultsBox) {
    box.innerHTML = 'X';
    box.classList.replace('unclaimed-box', 'p1-box');
    gameState.p1Boxes.push(boxId);
    resultsBox.innerHTML = 'Player O Goes!';
    gameState.player1Turn = false;
}

function processPlayerTwoMove(box, boxId, resultsBox) {
    box.innerHTML = 'O';
    box.classList.replace('unclaimed-box', 'p2-box');
    gameState.p2Boxes.push(boxId);
    resultsBox.innerHTML = 'Player X Goes!';
    gameState.player1Turn = true;
}

function checkEndGame(currentPlayer) {
    if (gameState.totalTurns >= 5) checkForWin(currentPlayer);
    if (gameState.totalTurns === 9 && gameState.winner === false) declareStalemate();
}

function checkForWin(player) {
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
    
    const playerBoxes = player === 'player1' ? gameState.p1Boxes : gameState.p2Boxes;
    
    winConditions.forEach(winCondition => {
        if (playerBoxes.includes(winCondition[0])
            && playerBoxes.includes(winCondition[1])
            && playerBoxes.includes(winCondition[2])) {
                declareWinner(player, winCondition);
            }
    })
}

function declareWinner(player, winArray) {
    gameState.winner = true;
    const messageBox = document.getElementById('outcome');
    winArray.forEach(boxId => document.getElementById(boxId).classList.add('win-background'));
    const p1WinOutput = `<h2 class='outcome-text'>X Wins!</h2>`;
    const p2WinOutput = `<h2 class='outcome-text'>O Wins!</h2>`;
    messageBox.innerHTML = (player === 'player1') ? p1WinOutput : p2WinOutput;
    document.getElementById('game-board').setAttribute('style', 'pointer-events:none');
}

function declareStalemate() {
    document.getElementById('outcome').innerHTML = `<h2 class='outcome-text'>It's a stalemate!</h2>`;
    document.getElementById('game-board').setAttribute('style', 'pointer-events:none');
}
/******* END: STRUCTURAL FUNCTIONS *******/


/******* START: INITIALIZE FUNCTION *******/
function initialize() {
    renderMain();
    renderGameDivs();
}
/******* END: INITIALIZE FUNCTION *******/

initialize();