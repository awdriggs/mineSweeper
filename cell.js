
//cell object
var Cell = function(row, col){
	this.hasMine = false;
	this.visible = false;
	this.row = row;
	this.col = col;
	this.danger = 0; //remain unset until actually clicked?
}
