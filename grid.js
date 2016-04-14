//refactoring
var Grid = function(size){
	this.size = size;
	this.grid = [];
	this.mines = [];

	//
}

Grid.prototype.getDanger = function(x, y) {
	
	if(this.grid[x][y].hasMine){
		console.log('boom');
	} else {
		//check the neighbors
		console.log('safe');
		
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

Grid.prototype.setMine = function(numMines) {
	var amt = numMines;

	for(var i = 0; i < amt; i++){
		// debugger;
		//select a random x,y coord
		x = Math.floor(Math.random(0)*this.size);
		y = Math.floor(Math.random(0)*this.size);


		console.log('secret ', x, y);
		this.mines.push([x,y]);
		//give the cell at the current coord a mine
		this.grid[x][y].hasMine = true;
		this.grid[x][y].danger = 10;
		//debugger;
		//maybe store and return the mines in an array? useful elsewhere?

	}
	console.log(this.mines)
	console.log('mine set!');
}

Grid.prototype.setDanger = function(){
	var range = 1;
	
	//for each item in the mine array, set the danger of the neighboring cells.
	for(var i = 0; i < this.mines.length; i++){
		
		var x = this.mines[i][0];
		var y = this.mines[i][1];
		
		this.setNeigbhors(x, y, range)
		
	}//end mine loop
}

Grid.prototype.setNeigbhors = function(x, y, range){
	for(var i = x-range; i <= x+range; i++){
			for(var j = y-range; j <= y+range; j++){
				if(this.isCell(i,j) && !this.grid[i][j].hasMine){ //check edge and mine status
					this.grid[i][j].danger++;
			}
		}//end y loop			
	}//end x loop

	//BUG if a safe cell is sandwiched by two mines, it will incorrectly read that it is touching 3 bombs
	//this is because i'm setting the mines around the cells and not checking the cells around the mines
	//you could refactor to only get the danger when a cell is revealed. same edge casing would apply.
}

Grid.prototype.isCell = function(x, y){
	//first check to see if the row exists
	//then check to see if the cell exists
	//pass true if both exist
	return this.grid[x] && this.grid[x][y];
}
