
var Game = function(size, mines){
	//this.size = size;
	this.board = new Grid(size);
	this.board.build();
	this.board.setMine(mines); //call the set mine function to randomly assign a mine
	this.board.setDanger();
	this.over = false;
	this.score = 0; //later, use this to check for win
	this.winningScore = size*size - mines;
  this.win = false; //change to true if there is a win!
}

//does this need to include a callback and a .done structure?
Game.prototype.check = function(x, y) {
	var clickedCell = this.board.grid[x][y];

	clickedCell.visible = true;

	if(clickedCell.danger == 0){
		//call check on neighbors! 
		this.checkNeigbhors(x, y, 1);
	}

  this.getScore();
};

Game.prototype.isMine = function(x, y){
	return this.board.grid[x][y].hasMine;
};

Game.prototype.checkNeigbhors = function(x, y, range){
	
	cells = this.board.grid;

	//loop through neighboring cells
	for(var i = x-range; i <= x+range; i++){
		for(var j = y-range; j <= y+range; j++){
			
			if(this.isThere(i,j) && cells[i][j].hasMine == false){ //check edge and mine status
				var cell = this.board.grid[i][j];

				if(cell.visible == false){ //this will prevent a circular loop
					cell.visible = true;

					if(cell.danger == 0){
						this.checkNeigbhors(i,j, 1);
					}
				}
			}
		}//end y loop			
	}//end x loop

  this.getScore();
}

Game.prototype.isThere = function(x, y){
	//first check to see if the row exists
	//then check to see if the cell exists
	//pass true if both exist
	return this.board.grid[x] && this.board.grid[x][y];
}

Game.prototype.getScore = function(){
	//set score equal to the grid countVisible result
	this.score = this.board.countVisible();
	return this.score
}

Game.prototype.checkWin = function(){
  if(this.score == this.winningScore){
    console.log('player wins')
    this.win = true;
  }
  return this.win;
}
