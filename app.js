
window.onload = function(){
	render(size);
	setListener();
}
//app

//create a new game with a size value

//render the game board

//set listeners

//


//move this to be a app function...no game logic anyhwo
render = function(size) {
	//nested for loop to go through the grid, build to dom
	var wrapper = document.getElementById('wrapper');

	for(var i = 0; i < size; i++){
		var row = document.createElement('div');
		//row.innerHTML = i + ':'; //remove later
		
		for(var j = 0; j < size; j++){
			var cell = document.createElement('div');
			//console.log("i:" + i + " j:" + j);
			//apply the tag name of the index i and j, target this is equal to a cell index
			cell.id = i + "-" + j;
			cell.innerHTML = test.grid[i][j].danger;
			cell.className = 'cell';
			//debugger;
			row.appendChild(cell);
		}
		wrapper.appendChild(row);
	}
};

//app function
setListener = function(first_argument) {
	var gridArray = document.getElementsByClassName('cell');
	
	for(var i = 0; i < gridArray.length; i++){
		gridArray[i].addEventListener('click', clicked);
	};
};


//game functions?
var clicked = function(e){
	//alert(e.target.id);
	
	//coord is the x,y pair
	var coord = e.target.id.split('-')

	//add logic here for calling the check mine.

	console.log(test.grid[coord[0]][coord[1]].hasMine);
	console.log(this)
	
	test.getDanger(coord[0], coord[1]);
	//return(coord);

	//do something here
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
var size = 10;
var test = new Grid(size);

test.build();
test.setMine(10); //call the set mine function to randomly assign a mine
test.setDanger();
