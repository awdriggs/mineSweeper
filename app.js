
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
	this.danger = 0; //remain unset until actually clicked?
}




var Grid = function(size){
	this.size = size;
	this.grid = [];

	//
}

Grid.prototype.getDanger = function(first_argument) {
	if(this.hasMine){
		alert('boom');
	} else {
		//check the neighbors
		
	}

};

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
		gridArray[i].addEventListener('click', function(e){
			debugger;
			clicked(e, this); //not working, start here!!!!!
		});
	};
};

Grid.prototype.setMine = function(numMines) {
	var amt = numMines;

	for(var i = 0; i < amt; i++){
		// debugger;
		//select a random x,y coord
		x = Math.floor(Math.random(0)*this.size);
		y = Math.floor(Math.random(0)*this.size);


		console.log('secret ', x, y);

		//give the cell at the current coord a mine
		this.grid[x][y].hasMine = true;
		//debugger;

	}

	console.log('mine set!');
}

//game functions?
var clicked = function(e, grid){
	//alert(e.target.id);
	var gridObj = grid;
	//coord is the x,y pair
	var coord = e.target.id.split('-')

	//add logic here for calling the check mine.

	//console.log(test.grid[coord[0]][coord[1]].hasMine);
	//console.log(this)
	debugger;
	//test.getDanger(coord[0], coord[1]);
	//return(coord);
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
test.setMine(3); //call the set mine function to randomly assign a mine

