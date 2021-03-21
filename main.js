//---querys

let gameboard = (
    function(){
    let gameboardCells = ['', '', '', '', '', '', '', '', ''];

    const changeCellFunc = (cellNum, val) => {
        let temp = val.toString().toUpperCase();
        if(temp === 'X' || temp === 'O'){
            gameboardCells[cellNum] = temp;
        }
    } 
    const getGameboardCellsFunc = () => {
        return gameboardCells;
    }

    const getCellValFunc = (cellNum) => {
        return gameboardCells[cellNum];
    }

    const clearBoardFunc = () => {
        gameboardCells = ['', '', '', '', '', '', '', '', ''];
    }

    const areAllCellsFullFunc = () => {
        for(let i = 0; i < gameboardCells.length; i++){
            if(gameboardCells[i] == ''){
                return false
            }
        }
        return true;
    }

    return{
        changeCell: changeCellFunc,
        getGameboardCells: getGameboardCellsFunc,
        getCellVal: getCellValFunc,
        clearBoard: clearBoardFunc,
        areAllCellsFull: areAllCellsFullFunc
    }
})();

function playerConstructor(name, markerType){
    let score = 0;
    const getName = () => name;
    const getMarkerType = () => markerType;
    const getScore = () => score;
    function changeScore(){
        score += 1;
    }
    return{
        getName,
        getMarkerType,
        changeScore,
        getScore
    }
}

let gameController = (
    () => {
        let players = [];
        let currentPlayer = '';

        // create 2 players with prompt
        // const createTwoPlayersFunc = () => {
        //     alert('Create Player 1');
        //     let P1name = prompt('Player 1 name');
        //     alert('Create Player 2');
        //     let P2name = prompt('Player 2 name');
        //     let player1 = playerConstructor(P1name, 'X');
        //     let player2 = playerConstructor(P2name, 'O');
        //     players = [];
        //     players.push(player1);
        //     players.push(player2);
        //     console.log(players);
        //     currentPlayer = 0;
        // }

        const addTwoPlayersFunc = (p1name, p2name) => {
            let player1 = playerConstructor(p1name, 'X');
            let player2 = playerConstructor(p2name, 'O');
            players = [];
            players.push(player1);
            players.push(player2);
            console.log(players);
            currentPlayer = 0;
            displayController.alterPlayerNames(p1name, p2name);
            displayController.alterPlayerScores('0', '0');
            displayController.alterWinningh3('');
            displayController.alterCurrentPlayer(players[currentPlayer].getName());
        }

        const getCurrentPlayerFunc = () => {
            return players[currentPlayer];
        }

        const changeCurrentPlayerFunc = () => {
            if(currentPlayer == 0){
                currentPlayer = 1;
            }else{
                currentPlayer = 0;
            }
        }

        const makeMoveFunc = (cellNum) => {
            if(gameboard.getCellVal(cellNum) != '') return;
            displayController.changeCell(cellNum, getCurrentPlayerFunc().getMarkerType());
            gameboard.changeCell(cellNum, getCurrentPlayerFunc().getMarkerType());
            checkCells();
            changeCurrentPlayerFunc();
            displayController.alterCurrentPlayer(players[currentPlayer].getName());
        }

        const checkCells = () => {
            if(gameboard.getCellVal(0) == gameboard.getCellVal(1) && gameboard.getCellVal(1) == gameboard.getCellVal(2) && gameboard.getCellVal(2) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(3) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(5) && gameboard.getCellVal(5) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(6) == gameboard.getCellVal(7) && gameboard.getCellVal(7) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(0) == gameboard.getCellVal(3) && gameboard.getCellVal(3) == gameboard.getCellVal(6) && gameboard.getCellVal(6) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(1) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(7) && gameboard.getCellVal(7) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(2) == gameboard.getCellVal(5) && gameboard.getCellVal(5) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(0) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != ''){
                getWinner()
            }
            else if(gameboard.getCellVal(2) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(6) && gameboard.getCellVal(6) != ''){
                getWinner()
            }
            if(gameboard.areAllCellsFull()){
                restartGame();
            }
        }

        const getWinner = () => {
            displayController.alterWinningh3(players[currentPlayer].getName() + ' Won and earned a point');
            players[currentPlayer].changeScore();
            checkFullWinner();
            restartGame();
            displayController.alterPlayerScores(players[0].getScore(), players[1].getScore());
        }

        const checkFullWinner = () => {
            for(let i = 0; i < players.length; i++){
                if(players[i].getScore() == 3){
                    displayController.alterWinningh3(players[i].getName() + ' WON THE COMPETITION!!!');
                    players = [];
                    displayController.alterPlayerNames("player 1 name", "player 2 name");
                    displayController.alterPlayerScores("player 1 score", "player 2 score");
                }
            }
        }

        const restartGame = () => {
            gameboard.clearBoard();
            displayController.clearBoard();
        }

        return {
            //createTwoPlayers: createTwoPlayersFunc,
            getCurrentPlayer: getCurrentPlayerFunc,
            changeCurrentPlayer: changeCurrentPlayerFunc,
            makeMove: makeMoveFunc,
            addTwoPlayers: addTwoPlayersFunc
        }
    }
)();

const displayController = (() => {
    const cells = document.querySelectorAll(".table-cell");
    const player1NameInp = document.querySelector("#player-1-name");
    const player2NameInp = document.querySelector("#player-2-name");
    const enterBtn = document.querySelector("#enter-player-info");

    const p1nameDisplay = document.querySelector("#p1-name");
    const p1scoreDisplay = document.querySelector("#p1-score");
    const p2nameDisplay = document.querySelector("#p2-name");
    const p2scoreDisplay = document.querySelector("#p2-score");

    const winningh3 = document.querySelector("#winning-h3");
    const currentPlayerDisplay = document.querySelector("#current-player-display");

    const distplayGameTableArrayToTableFunc = () => {
        for(let i = 0; i < gameboard.getGameboardCells().length; i++){
            cells[i].textContent = gameboard.getGameboardCells()[i];
        }
    }
    
    const addEventListenersToCellsFunc = () => {
        for(let i = 0; i < cells.length; i++){
            cells[i].addEventListener('click', () => {
                gameController.makeMove(i);
            })
        }
    }

    const changeCellFunc = (cellNum, text) => {
        cells[cellNum].textContent = text;
    }

    const clearBoardFunc = () => {
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = '';
        }
    }

    const addPlayerNameEnterBtnEventListenerFunc = () => {
        enterBtn.addEventListener('click', () => {
            let player1name = player1NameInp.value;
            let player2name = player2NameInp.value;
            if(player1name != '' && player2name != ''){
                gameController.addTwoPlayers(player1name, player2name);
                player1NameInp.value = '';
                player2NameInp.value = '';
            }
        })
    }

    const alterPlayerNamesFunc = (p1name, p2name) => {
        p1nameDisplay.textContent = p1name;
        p2nameDisplay.textContent = p2name;
    }

    const alterPlayerScoresFunc = (p1score, p2score) => {
        p1scoreDisplay.textContent = p1score;
        p2scoreDisplay.textContent = p2score;
    }

    const alterWinningh3Func = (txt) => {
        winningh3.textContent = txt;
    }

    const alterCurrentPlayerFunc = (name) => {
        currentPlayerDisplay.textContent = name;
    }

    return{
        distplayGameTableArrayToTable: distplayGameTableArrayToTableFunc,
        addEventListenersToCells: addEventListenersToCellsFunc,
        changeCell: changeCellFunc,
        clearBoard: clearBoardFunc,
        addPlayerNameEnterBtnEventListener: addPlayerNameEnterBtnEventListenerFunc,
        alterPlayerNames: alterPlayerNamesFunc,
        alterPlayerScores: alterPlayerScoresFunc,
        alterWinningh3: alterWinningh3Func,
        alterCurrentPlayer: alterCurrentPlayerFunc
    }
}
)();

displayController.distplayGameTableArrayToTable();
displayController.addEventListenersToCells();
displayController.addPlayerNameEnterBtnEventListener();
//gameController.createTwoPlayers();