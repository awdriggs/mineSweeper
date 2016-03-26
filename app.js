
window.onload = function(){
	test.render();
	test.setListen();
}


//cell object
var Cell = function(row, col){
	this.hasMine = false;
	this.hidden = true;
	this.row = row;
	this.col = col;
	this.danger = 0;
}

var Grid = function(size){
	this.size = size;
	this.grid = [];

	this.setMine(); //call the set mine function to randomly assign a mine
}

Grid.prototype.build = function() {
	for(var i = 0; i < this.size; i++){
		var row = [];
		for(var j = 0; j < this.size; j++){
			row.push(new Cell(i,j));
		}
		this.grid.push(row);
	}
};

Grid.prototype.render = function() {
	//nested for loop to go through the grid, build to dom
	var wrapper = document.getElementById('wrapper');

	for(var i = 0; i < this.grid.length; i++){
		var row = document.createElement('div');
		//row.innerHTML = i + ':'; //remove later
		
		for(var j = 0; j < this.grid.length; j++){
			var cell = document.createElement('div');
			//console.log("i:" + i + " j:" + j);
			//apply the tag name of the index i and j, target this is equal to a cell index
			cell.id = i + "-" + j;
			// cell.innerHTML = i + " " + j;
			cell.className = 'cell';
			//debugger;
			row.appendChild(cell);
		}
		wrapper.appendChild(row);
	}
};

Grid.prototype.setListen = function(first_argument) {
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].addEventListener('click', clicked);
	};
};

Grid.prototype.setMine = function(numMines) {
	console.log('mine set!');
}

//game functions?
var clicked = function(e){
	//alert(e.target.id);
	var coord = {
		x:e.target.id.split('-')[0],
		y:e.target.id.split('-')[1]
	}

	//add logic here for calling the check mine.

	console.log(test.grid[coord.x][coord.y].hasMine);
	console.log(this)
	// debugger;
}



//grid object
//size, must be a square number

//build grid
//use the size to build an array of rows and columns

//render, function, go through the grid array

//set danger, iterate through the cells, get them to set the danger
//get danger, get the danger of cells

//grid check
//g

var test = new Grid(10);

test.build();


