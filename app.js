var size = 30;
var mines = 100;
var game = null;

window.onload = function(){
	game = new Game(size, mines);

	render(size);
	setListener();
	
}
//app

//create a new game with a size value

//render the game board

//set listeners

//


//move this to be a app function...no game logic anyhwow
render = function(size) {
	//nested for loop to go through the grid, build to dom
	var wrapper = document.getElementById('wrapper');

	for(var i = 0; i < size; i++){
		var row = document.createElement('div');
		//row.innerHTML = i + ':'; //remove later
		
		for(var j = 0; j < size; j++){
			var cell = document.createElement('div');
			//apply the tag name of the index i and j, target this is equal to a cell index
			cell.id = i + "-" + j;
			cell.innerHTML = '&#8203';
			cell.className = 'cell';
			//debugger;
			row.appendChild(cell);
		}
		wrapper.appendChild(row);
	}
};

//app function
setListener = function() {
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].addEventListener('click', clicked);
	};
};

removeListener = function(){
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].removeEventListener('click', clicked);
	};
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
		update(); //does this need to be a callback to handle async?

	};
}

var gameOver = function(){
	game.over = true;
	//remove the event listeners
	removeListener();

	//loop over mines, set to visible, set characther to &#9883
	var mines = game.board.mines;
	
	for(var i = 0; i < mines.length; i++){
		var x = mines[i][0];
		var y = mines[i][1];

		var mine = document.getElementById(x + '-' + y);
		//mine.classList.add('bomb');
		mine.innerHTML = '&#9679'
	}
	
	//reload the game	
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
		}
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

//this isn't working, the innerhtml returns the x instead of the unicode
//maybe use a css rule instead
var toggleFlag = function(cell){
	var flagged = false
	debugger;
	console.log(cell.innerHTML)
	if(cell.innerHTML == '&#10006'){
		debugger;
		cell.innerHTML = '';
		flagged = false;
	}else{
		cell.innerHTML = '&#10006';	
		flagged = true;
	}
	return flagged;
}

//updateScore
//target the scoreboard
//call the game.getScore to get the current score
//set the score to the current score

//check win!
//if the 


