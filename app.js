var size = 30;
var mines = 100;
var game = null;

window.onload = function(){
  start();  
}

var start = function(){
	game = new Game(size, mines);
   
	render(size);
	setListener();
  setReset();
  
  var setTitle = document.getElementById('titleBar').innerHTML = '<h1 id="title" class="iblock">mineSweep</h1>';
  var showMines = document.getElementById('mines').innerHTML = 'Mines: ' + mines;
  
  updateScore();
}

render = function(size) {

	//nested for loop to go through the grid, build to dom
	var board = document.getElementById('board');

  //for reset, clear all the child elements
  while(board.firstChild){
    board.removeChild(board.firstChild);
  }

  //build the game board
	for(var i = 0; i < size; i++){
		var row = document.createElement('div');
		//row.innerHTML = i + ':'; //for testing
		
		for(var j = 0; j < size; j++){
			var cell = document.createElement('div');
			//apply the tag name of the index i and j, target this is equal to a cell index
			cell.id = i + "-" + j;
			cell.innerHTML = '&#8203'; //this is for formatting, stop the drop
      cell.className = 'cell';
			//debugger;
			row.appendChild(cell);
		}
		board.appendChild(row);
	}
};

//set a on click listener to all cells
setListener = function() {
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].addEventListener('click', clicked);
	};
};

var setReset = function(){
  var titleBar = document.getElementById('titleBar').addEventListener("click", function(e) {
    if(e.target.nodeName = "BUTTON"){
     start(); 
    }
  });
}

removeAllListeners = function(){
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].removeEventListener('click', clicked);
	};
}

//not being used.
var removeClick = function(cell){
  console.log('removed click', cell)
  cell.removeEventListener('click', clicked);

}

var clicked = function(e){
	//coord is the x,y pair
	var coord = e.target.id.split('-')
	var x = parseInt(coord[0]); //these are strings, should be parsed
	var y = parseInt(coord[1]);
	
	if(e.shiftKey){
		//set flag
		var flag = document.getElementById(x + '-' + y);
		toggleFlag(flag);
	}else if(game.isMine(x, y)){
		gameOver();
	}else {
		game.check(x, y);
		update(); //does this need to be a callback to handle async? nope!
    //removeClick(e.target); //so this is getting call all the time, better way?
	};
}

var gameOver = function(){
	game.over = true;
	//remove the event listeners
	removeAllListeners();

	//loop over mines, set to visible, set characther to &#9883
	var mines = game.board.mines;
	
	for(var i = 0; i < mines.length; i++){
		var x = mines[i][0];
		var y = mines[i][1];

		var mine = document.getElementById(x + '-' + y);
		//mine.classList.add('bomb');
		mine.innerHTML = '&#9679'
	}

  var title = document.getElementById('title');
  //check game to see if it is a win or loss for the user
  if(game.win){
    console.log('You win!');
    title.innerHTML = "You Win!"; 
  } else {
    console.log('You lose!');
    title.innerHTML = "You Lose!"; 
  }

  //add button to reload game 
  var titleBar = document.getElementById('titleBar');
  var button = document.createElement('button');
  button.innerHTML = "Reset";
  titleBar.appendChild(button);
}

var update = function(){
	console.log('time to update the displays')
	//loop through all the dom boxes
	var cells = document.getElementsByClassName('cell')
	
	for(var i = 0; i < cells.length; i++){
		
		var coord = cells[i].id.split('-')
		
		var x = coord[0];
		var y = coord[1];

		var cell = game.board.grid[x][y]
		var visible = cell.visible;
		
		if(visible){
			cells[i].classList.add('visible');
			
			if(cell.danger){
				cells[i].innerHTML = cell.danger;
				cells[i].classList.add(findColor(cell.danger));
			}

      //removeClick(cells[i]); //get called to frequently
		}
	}

  updateScore();  
  
  //check to see if there is a win
  if(game.checkWin()){
    gameOver();    
  }
}

var findColor = function(danger){
	var className;

	if(danger == 1){
		className = 'green';
	} else if(danger == 2){
		className = 'yellow';
	} else if(danger == 3){
		className = 'orange';
	} else if(danger > 3){
		className = 'red';
	}

	return className;
}

//called when user shift clicks, toggle the flag
var toggleFlag = function(cell){
	var flagged = false

	if(cell.classList.contains("flag")){
	  cell.classList.remove("flag");	
		cell.innerHTML = '&#8203';
		flagged = false;
	}else{
		cell.innerHTML = '&#10006';	
    cell.classList.add("flag");
		flagged = true;
	}
	return flagged;
}

//updateScore
var updateScore = function(){
  //set the contents of the box to equal the score
  var score = document.getElementById('score');
  score.innerHTML = "Score: " + game.score;
}

