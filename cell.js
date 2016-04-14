
//cell object
var Cell = function(row, col){
	this.hasMine = false;
	this.hidden = true;
	this.row = row;
	this.col = col;
	this.danger = 0; //remain unset until actually clicked?
}
