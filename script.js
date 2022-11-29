let okStopPlaying;
let x, y;
let okFood, okLost;
let setIntervalID ;


let playCells = Array(11).fill(0).map(() => Array(11).fill(0));

function startGame(){
    x = 5;
    y = 5;
    okLost = 0;
    clearInterval(setIntervalID);
    for (let i = 1; i <= 9; ++i) {
        document.getElementById(i).innerHTML = "";
        for (let j = 1; j <= 9; ++j) {
            playCells[i][j] = 0;
        }
    }
    for (let i = 0; i < 10; ++i) {
        playCells[i][0] = 100;
        playCells[0][i] = 100;
        playCells[10][i] = 100;
        playCells[i][10] = 100;
    }
    document.getElementById("YouLostMessage").innerHTML = "";
    document.getElementById("startGame").innerHTML = "Restart";

    for (let i = 1; i <= 9; ++i) {
        for (let j = 1; j <= 9; ++j) {
            const playingCells = document.createElement("img");
            Object.assign(playingCells, {
                id : i * 10 + j,
                src :  'empty_cell.png',
            })
            document.getElementById(i).appendChild(playingCells);
        }
    }
    document.getElementById(55).src = 'body_cell.png';
    document.getElementById(54).src = 'body_cell.png';
    document.getElementById(53).src = 'body_cell.png';
    playCells[5][5] = 1;
    playCells[5][4] = 2;
    playCells[5][3] = 3;

    okFood = 0;
    while (okFood == 0) {
        let foodRow = Math.floor(Math.random() * 9) + 1;
        let foodColumn = Math.floor(Math.random() * 9) + 1;
        if (playCells[foodRow][foodColumn] == 0) {
            playCells[foodRow][foodColumn] = -1;
            document.getElementById(foodRow * 10 + foodColumn).src = 'food_cell.png'
            okFood = 1;
        }
    }
    
    //clearInterval(setIntervalID);
}


document.addEventListener('keydown', (event)=> {  
    //setIntervalID = setInterval(function () {
        if (event.key == "d") {
            if (playCells[x][y + 1] == -1) {
                okFood = 0;
            }
            if ((playCells[x][y + 1] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById(x * 10 + y + 1).src = 'body_cell.png';
                playCells[x][y + 1] = 1;
                moveCells(x, y);
                ++y;
                console.log(playCells[x][y]);
            } else if (playCells[x][y + 1] != 2){
                okLost = 1;
            } 
        } 

        if (event.key == "w") {
            if (playCells[x - 1][y] == -1) {
                okFood = 0;
            }
            if ((playCells[x - 1][y] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById((x - 1) * 10 + y).src = 'body_cell.png';
                playCells[x - 1][y] = 1;
                moveCells(x, y);
                --x;
                console.log(playCells[x][y]);
            } else if (playCells[x - 1][y] != 2) {
                okLost = 1;
            }
        } 
        if (event.key == "a") {
            if (playCells[x][y - 1] == -1) {
                okFood = 0;
            }
            if ((playCells[x][y - 1] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById(x * 10 + y - 1).src = 'body_cell.png';
                playCells[x][y - 1] = 1;
                moveCells(x, y);
                --y;
                console.log(playCells[x][y]);
            } else if (playCells[x][y - 1] != 2){
                okLost = 1;
            }
        } 

        if (event.key == "s") {    
            if (playCells[x + 1][y] == -1) {
                okFood = 0;
            }
            if ((playCells[x + 1][y] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById((x + 1) * 10 + y).src = 'body_cell.png';
                playCells[x + 1][y] = 1;
                moveCells(x, y);
                ++x;
                console.log(playCells[x][y]);
            } else if (playCells[x + 1][y] != 2) {
                okLost = 1 ;
            }
        }
    //}, 500)
    if (okLost == 1) {
        clearInterval(setIntervalID);
        document.getElementById('YouLostMessage').innerHTML = "You Lost"
    }
});



function moveCells(X, Y) {
    let row = X, column = Y;
    let ok = 0;

    while (ok == 0) {
        if (playCells[row][column] == playCells[row][column - 1] - 1 ) {
            ++playCells[row][column];
            --column;
        } else if (playCells[row][column] == playCells[row][column + 1] - 1 ) {
            ++playCells[row][column];
            ++column;
        } else if (playCells[row][column] == playCells[row - 1][column] - 1 ) {
            ++playCells[row][column];
            --row;
        } else if (playCells[row][column] == playCells[row + 1][column] - 1 ) {
            ++playCells[row][column];
            ++row;
        } else if (okFood == 0) {
            document.getElementById(row * 10 + column).src = 'body_cell.png';
            ++playCells[row][column];
            ok = 1;
            while (okFood == 0) {
                let foodRow = Math.floor(Math.random() * 9) + 1;
                let foodColumn = Math.floor(Math.random() * 9) + 1;
                if (playCells[foodRow][foodColumn] == 0) {
                    playCells[foodRow][foodColumn] = -1;
                    document.getElementById(foodRow * 10 + foodColumn).src = 'food_cell.png'
                    okFood = 1;
                }
            }
        } else {
            document.getElementById(row * 10 + column).src = 'empty_cell.png';
            playCells[row][column] = 0;
            ok = 1;
        }
    }
    
}


