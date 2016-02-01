process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

/*
function City(station, nearest) {
	this.init = function(){
		this.station = station;
		this.nearest = nearest;
	}
	this.init();
}
*/

function main() {
/*
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var m = parseInt(n_temp[1]);
    c = readLine().split(' ');
    c = c.map(Number);
*/
	var n=6, m=4, c=[1,2,4,3], cities=[];
	var longestSpan=0;
	c.sort( (a,b) => a-b );
	for( var ii = 0; ii < m-1; ii++) longestSpan = Math.max(longestSpan, c[ii+1]-c[ii]);
	var longestHike = Math.floor(longestSpan / 2);
	var left  = c[0]   === 0 ? 0 : c[0];
	var right = c[m-1] === n-1 ? 0 : n-1 - c[m-1];
	console.log(left, right);
	longestHike = Math.max(longestHike, left, right );  // edge cases
	process.stdout.write(longestHike.toString());
	
/*
	//for( var ii = 0; ii < n; ii++) cities.push([false, -1]);
	c.forEach((x)=> { cities[x][0] = true; 
					  cities[x][1] = 0; });
	var findNearest = (city, ii) => {
		if(city[0]) return;
		var tempDistance = Number.MAX_SAFE_INTEGER;
		cities.forEach( (x, jj) => x[0]? 
			tempDistance = Math.min( tempDistance, Math.abs(ii-jj) ):x );
		longestHike = Math.max(longestHike, tempDistance);
		city[1] = tempDistance;
	};
	cities.forEach(findNearest);
*/
	//process.stdout.write(longestHike.toString());		
}
main();























