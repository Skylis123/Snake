let rowX, columnY;
let okFood, okLost;
let setIntervalIDw, setIntervalIDa, setIntervalIDs, setIntervalIDd ;


let playCells = Array(11).fill(0).map(() => Array(11).fill(0));

function startGame(){
    okLost = 0;
    for (let i = 1; i <= 9; ++i) {
        document.getElementById(i).innerHTML = "";
        for (let j = 1; j <= 9; ++j) {
            playCells[i][j] = 0;
        }
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

    for (let i = 0; i <= 10; ++i) {
        playCells[i][0] = 100;
        playCells[0][i] = 100;
        playCells[10][i] = 100;
        playCells[i][10] = 100;
    }

    rowX = 5;
    columnY = 5;
    document.getElementById(rowX * 10 + columnY).src = 'body_cell.png';
    document.getElementById(rowX * 10 + columnY - 1).src = 'body_cell.png';
    document.getElementById(rowX * 10 + columnY - 2).src = 'body_cell.png';
    playCells[rowX][columnY] = 1;
    playCells[rowX][columnY - 1] = 2;
    playCells[rowX][columnY - 2] = 3;

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
}


document.addEventListener('keydown', (event)=> {  
    if (event.key == "d") {
        clearInterval(setIntervalIDa);
        clearInterval(setIntervalIDs);
        clearInterval(setIntervalIDw);
        setIntervalIDd = setInterval(function () {
            if (playCells[rowX][columnY + 1] == -1) {
                okFood = 0;
            }
            if ((playCells[rowX][columnY + 1] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById(rowX * 10 + columnY + 1).src = 'body_cell.png';
                playCells[rowX][columnY + 1] = 1;
                moveCells(rowX, columnY);
                ++columnY;
            } else {
                okLost = 1 ;
                clearInterval(setIntervalIDs);
                clearInterval(setIntervalIDa);
                clearInterval(setIntervalIDw);
                clearInterval(setIntervalIDd);
                document.getElementById('YouLostMessage').innerHTML = "You Lost"
            } 
        },200)
    } 

    if (event.key == "w") {
        clearInterval(setIntervalIDa);
        clearInterval(setIntervalIDs);
        clearInterval(setIntervalIDd);
        setIntervalIDw = setInterval(function () {
            if (playCells[rowX - 1][columnY] == -1) {
                okFood = 0;
            }
            if ((playCells[rowX - 1][columnY] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById((rowX - 1) * 10 + columnY).src = 'body_cell.png';
                playCells[rowX - 1][columnY] = 1;
                moveCells(rowX, columnY);
                --rowX;
            } else {
                okLost = 1 ;
                clearInterval(setIntervalIDs);
                clearInterval(setIntervalIDa);
                clearInterval(setIntervalIDw);
                clearInterval(setIntervalIDd);
                document.getElementById('YouLostMessage').innerHTML = "You Lost"
            }
        },200)
    } 

    if (event.key == "a") {
        clearInterval(setIntervalIDw);
        clearInterval(setIntervalIDs);
        clearInterval(setIntervalIDd);
        setIntervalIDa = setInterval(function () {
            if (playCells[rowX][columnY - 1] == -1) {
                okFood = 0;
            }
            if ((playCells[rowX][columnY - 1] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById(rowX * 10 + columnY - 1).src = 'body_cell.png';
                playCells[rowX][columnY - 1] = 1;
                moveCells(rowX, columnY);
                --columnY;
            } else {
                okLost = 1 ;
                clearInterval(setIntervalIDs);
                clearInterval(setIntervalIDa);
                clearInterval(setIntervalIDw);
                clearInterval(setIntervalIDd);
                document.getElementById('YouLostMessage').innerHTML = "You Lost"
            }
        },200)
        } 

    if (event.key == "s") {  
        clearInterval(setIntervalIDa);
        clearInterval(setIntervalIDw);
        clearInterval(setIntervalIDd);
        setIntervalIDs = setInterval(function () {
            if (playCells[rowX + 1][columnY] == -1) {
                okFood = 0;
            }
            if ((playCells[rowX + 1][columnY] == 0 || okFood == 0) && okLost == 0) {
                document.getElementById((rowX + 1) * 10 + columnY).src = 'body_cell.png';
                playCells[rowX + 1][columnY] = 1;
                moveCells(rowX, columnY);
                ++rowX;
            } else {
                okLost = 1 ;
                clearInterval(setIntervalIDs);
                clearInterval(setIntervalIDa);
                clearInterval(setIntervalIDw);
                clearInterval(setIntervalIDd);
                document.getElementById('YouLostMessage').innerHTML = "You Lost"
            }
        },200)
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


