"use strict";

//---querys
var gameboard = function () {
  var gameboardCells = ['', '', '', '', '', '', '', '', ''];

  var changeCellFunc = function changeCellFunc(cellNum, val) {
    var temp = val.toString().toUpperCase();

    if (temp === 'X' || temp === 'O') {
      gameboardCells[cellNum] = temp;
    }
  };

  var getGameboardCellsFunc = function getGameboardCellsFunc() {
    return gameboardCells;
  };

  var getCellValFunc = function getCellValFunc(cellNum) {
    return gameboardCells[cellNum];
  };

  var clearBoardFunc = function clearBoardFunc() {
    gameboardCells = ['', '', '', '', '', '', '', '', ''];
  };

  var areAllCellsFullFunc = function areAllCellsFullFunc() {
    for (var i = 0; i < gameboardCells.length; i++) {
      if (gameboardCells[i] == '') {
        return false;
      }
    }

    return true;
  };

  return {
    changeCell: changeCellFunc,
    getGameboardCells: getGameboardCellsFunc,
    getCellVal: getCellValFunc,
    clearBoard: clearBoardFunc,
    areAllCellsFull: areAllCellsFullFunc
  };
}();

function playerConstructor(name, markerType) {
  var score = 0;

  var getName = function getName() {
    return name;
  };

  var getMarkerType = function getMarkerType() {
    return markerType;
  };

  var getScore = function getScore() {
    return score;
  };

  function changeScore() {
    score += 1;
  }

  return {
    getName: getName,
    getMarkerType: getMarkerType,
    changeScore: changeScore,
    getScore: getScore
  };
}

var gameController = function () {
  var players = [];
  var currentPlayer = ''; // create 2 players with prompt
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

  var addTwoPlayersFunc = function addTwoPlayersFunc(p1name, p2name) {
    var player1 = playerConstructor(p1name, 'X');
    var player2 = playerConstructor(p2name, 'O');
    players = [];
    players.push(player1);
    players.push(player2);
    console.log(players);
    currentPlayer = 0;
    displayController.alterPlayerNames(p1name, p2name);
    displayController.alterPlayerScores('0', '0');
    displayController.alterWinningh3('');
    displayController.alterCurrentPlayer(players[currentPlayer].getName());
  };

  var getCurrentPlayerFunc = function getCurrentPlayerFunc() {
    return players[currentPlayer];
  };

  var changeCurrentPlayerFunc = function changeCurrentPlayerFunc() {
    if (currentPlayer == 0) {
      currentPlayer = 1;
    } else {
      currentPlayer = 0;
    }
  };

  var makeMoveFunc = function makeMoveFunc(cellNum) {
    if (gameboard.getCellVal(cellNum) != '') return;
    displayController.changeCell(cellNum, getCurrentPlayerFunc().getMarkerType());
    gameboard.changeCell(cellNum, getCurrentPlayerFunc().getMarkerType());
    checkCells();
    changeCurrentPlayerFunc();
    displayController.alterCurrentPlayer(players[currentPlayer].getName());
  };

  var checkCells = function checkCells() {
    if (gameboard.getCellVal(0) == gameboard.getCellVal(1) && gameboard.getCellVal(1) == gameboard.getCellVal(2) && gameboard.getCellVal(2) != '') {
      getWinner();
    } else if (gameboard.getCellVal(3) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(5) && gameboard.getCellVal(5) != '') {
      getWinner();
    } else if (gameboard.getCellVal(6) == gameboard.getCellVal(7) && gameboard.getCellVal(7) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != '') {
      getWinner();
    } else if (gameboard.getCellVal(0) == gameboard.getCellVal(3) && gameboard.getCellVal(3) == gameboard.getCellVal(6) && gameboard.getCellVal(6) != '') {
      getWinner();
    } else if (gameboard.getCellVal(1) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(7) && gameboard.getCellVal(7) != '') {
      getWinner();
    } else if (gameboard.getCellVal(2) == gameboard.getCellVal(5) && gameboard.getCellVal(5) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != '') {
      getWinner();
    } else if (gameboard.getCellVal(0) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(8) && gameboard.getCellVal(8) != '') {
      getWinner();
    } else if (gameboard.getCellVal(2) == gameboard.getCellVal(4) && gameboard.getCellVal(4) == gameboard.getCellVal(6) && gameboard.getCellVal(6) != '') {
      getWinner();
    }

    if (gameboard.areAllCellsFull()) {
      restartGame();
    }
  };

  var getWinner = function getWinner() {
    displayController.alterWinningh3(players[currentPlayer].getName() + ' Won and earned a point');
    players[currentPlayer].changeScore();
    checkFullWinner();
    restartGame();
    displayController.alterPlayerScores(players[0].getScore(), players[1].getScore());
  };

  var checkFullWinner = function checkFullWinner() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].getScore() == 3) {
        displayController.alterWinningh3(players[i].getName() + ' WON THE COMPETITION!!!');
        players = [];
        displayController.alterPlayerNames("player 1 name", "player 2 name");
        displayController.alterPlayerScores("player 1 score", "player 2 score");
      }
    }
  };

  var restartGame = function restartGame() {
    gameboard.clearBoard();
    displayController.clearBoard();
  };

  return {
    //createTwoPlayers: createTwoPlayersFunc,
    getCurrentPlayer: getCurrentPlayerFunc,
    changeCurrentPlayer: changeCurrentPlayerFunc,
    makeMove: makeMoveFunc,
    addTwoPlayers: addTwoPlayersFunc
  };
}();

var displayController = function () {
  var cells = document.querySelectorAll(".table-cell");
  var player1NameInp = document.querySelector("#player-1-name");
  var player2NameInp = document.querySelector("#player-2-name");
  var enterBtn = document.querySelector("#enter-player-info");
  var p1nameDisplay = document.querySelector("#p1-name");
  var p1scoreDisplay = document.querySelector("#p1-score");
  var p2nameDisplay = document.querySelector("#p2-name");
  var p2scoreDisplay = document.querySelector("#p2-score");
  var winningh3 = document.querySelector("#winning-h3");
  var currentPlayerDisplay = document.querySelector("#current-player-display");

  var distplayGameTableArrayToTableFunc = function distplayGameTableArrayToTableFunc() {
    for (var i = 0; i < gameboard.getGameboardCells().length; i++) {
      cells[i].textContent = gameboard.getGameboardCells()[i];
    }
  };

  var addEventListenersToCellsFunc = function addEventListenersToCellsFunc() {
    var _loop = function _loop(i) {
      cells[i].addEventListener('click', function () {
        gameController.makeMove(i);
      });
    };

    for (var i = 0; i < cells.length; i++) {
      _loop(i);
    }
  };

  var changeCellFunc = function changeCellFunc(cellNum, text) {
    cells[cellNum].textContent = text;
  };

  var clearBoardFunc = function clearBoardFunc() {
    for (var i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
    }
  };

  var addPlayerNameEnterBtnEventListenerFunc = function addPlayerNameEnterBtnEventListenerFunc() {
    enterBtn.addEventListener('click', function () {
      var player1name = player1NameInp.value;
      var player2name = player2NameInp.value;

      if (player1name != '' && player2name != '') {
        gameController.addTwoPlayers(player1name, player2name);
        player1NameInp.value = '';
        player2NameInp.value = '';
      }
    });
  };

  var alterPlayerNamesFunc = function alterPlayerNamesFunc(p1name, p2name) {
    p1nameDisplay.textContent = p1name;
    p2nameDisplay.textContent = p2name;
  };

  var alterPlayerScoresFunc = function alterPlayerScoresFunc(p1score, p2score) {
    p1scoreDisplay.textContent = p1score;
    p2scoreDisplay.textContent = p2score;
  };

  var alterWinningh3Func = function alterWinningh3Func(txt) {
    winningh3.textContent = txt;
  };

  var alterCurrentPlayerFunc = function alterCurrentPlayerFunc(name) {
    currentPlayerDisplay.textContent = name;
  };

  return {
    distplayGameTableArrayToTable: distplayGameTableArrayToTableFunc,
    addEventListenersToCells: addEventListenersToCellsFunc,
    changeCell: changeCellFunc,
    clearBoard: clearBoardFunc,
    addPlayerNameEnterBtnEventListener: addPlayerNameEnterBtnEventListenerFunc,
    alterPlayerNames: alterPlayerNamesFunc,
    alterPlayerScores: alterPlayerScoresFunc,
    alterWinningh3: alterWinningh3Func,
    alterCurrentPlayer: alterCurrentPlayerFunc
  };
}();

displayController.distplayGameTableArrayToTable();
displayController.addEventListenersToCells();
displayController.addPlayerNameEnterBtnEventListener(); //gameController.createTwoPlayers();