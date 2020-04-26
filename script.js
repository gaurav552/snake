var canvas, ctx;


// game world
var gridSizex = 35
var gridSizey = 20
var tileSize = 20
var nextX = (nextY = 0);

// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
var appleX, appleY;

var size = tailSize
var pause = false


window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    // render X times per second
    var x = 8;
    setInterval(draw, 900 / x);
};


function setApple() {
    let test = true

    while (test) {
        let x = Math.floor(Math.random() * gridSizex);
        let y = Math.floor(Math.random() * gridSizey);
        if (x != snakeX && y != snakeY) {
            test = false
            appleX = x
            appleY = y
        }
    }
}


// apple
setApple()
    // draw
function draw() {
    // move snake in next pos

    if(!pause){
        snakeX += nextX;
        snakeY += nextY;
        tailSize = size
    }

    // snake over game world?
    if (snakeX < 0) {
        snakeX = gridSizex - 1;
    }
    if (snakeX > gridSizex - 1) {
        snakeX = 0;
    }

    if (snakeY < 0) {
        snakeY = gridSizey - 1;
    }
    if (snakeY > gridSizey - 1) {
        snakeY = 0;
    }

    //snake bite apple?
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        size = tailSize

        appleX = Math.floor(Math.random() * gridSizex);
        appleY = Math.floor(Math.random() * gridSizey);
    }

    //paint background
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // paint snake
    ctx.fillStyle = "green";
    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        //snake bites it's tail?
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            if(!pause){
                tailSize = defaultTailSize
                size = tailSize
                pause = true
                snakeTrail.push({ x: snakeX, y: snakeY });
                while (snakeTrail.length > tailSize) {
                    snakeTrail.shift();
                }
            } 
            
        }
    }

    // paint apple
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    //set snake trail
    if(!pause){
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
            snakeTrail.shift();
        }
    }

}

// input
function keyDownEvent(e) {

    size = tailSize
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            pause = false
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            pause = false
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            pause = false
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            pause = false
            break;
        case 32:
            if(!pause){
                pause = true
                nextX = 0
                nextY = 0
                myFunction()
            }
            break;
    }
}



function myFunction() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
  
    // Add the "show" class to DIV
    x.className = "show";
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }




// var canvas, ctx;

// var defaultTailSize = 3;
// var tailSize = defaultTailSize;
// var snakeTrail = [];
// var snakeX = snakeY = 15;

// var gridSizex = 35 // 20 x 20 = 400
// var gridSizey = 20
// var tileSize = 20
// var nextX = nextY = 0;
// var appleX
// var appleY
// var size = tailSize
// var pause = false

// var hor = false
// var ver = false

// window.onload = function() {
//     canvas = document.querySelector("#canvas");
//     ctx = canvas.getContext("2d");
//     document.addEventListener("keydown", keyDownEvent);
//         // render X times per second
//     setApple()
//     var x = 5;
//     setInterval(draw, 1000 / x);
// };

// function setApple() {
//     let test = true

//     while (test) {
//         let x = Math.floor(Math.random() * gridSizex);
//         let y = Math.floor(Math.random() * gridSizey);
//         if (x != snakeX && y != snakeY) {
//             test = false
//             appleX = x
//             appleY = y
//         }
//     }
// }

// function draw() {
//         // move snake in next pos
//         snakeX += nextX;
//         snakeY += nextY;
//         tailSize = size

//         // snake over game world?
//         if (snakeX < 0) {
//             snakeX = gridSizex - 1;
//         }
//         if (snakeX > gridSizex - 1) {
//             snakeX = 0;
//         }

//         if (snakeY < 0) {
//             snakeY = gridSizey - 1;
//         }
//         if (snakeY > gridSizey - 1) {
//             snakeY = 0;
//         }

//         //snake bite apple?
//         if (snakeX == appleX && snakeY == appleY) {
//             tailSize++;
//             size = tailSize

//             this.setApple()
//         }

//         //paint background
//         ctx.fillStyle = "#222";
//         ctx.fillRect(0, 0, canvas.width, canvas.height);

//         // paint snake
//         ctx.fillStyle = "#00a86b";

//         for (var i = 0; i < snakeTrail.length; i++) {
//             ctx.fillRect(
//               snakeTrail[i].x * tileSize,
//               snakeTrail[i].y * tileSize,
//               tileSize,
//               tileSize
//             );

//             //snake bites it's tail?
//             if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
//               tailSize = defaultTailSize;
//                 size = tailSize
//                 setApple()
//                 pause = true
//                 console.log("out")
//             }
//           }

//         // paint apple
//         ctx.fillStyle = "#ff2400";
//         ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

//         //set snake trail
//         snakeTrail.push({ x: snakeX, y: snakeY });
//         while (snakeTrail.length > tailSize) {
//             snakeTrail.shift();
//         }
// }


// function keyDownEvent(e) {
//     switch (e.keyCode) {
//         case 37:
//             if(!hor){
//                 hor = true
//                 ver = false
//                 nextX = -1;
//                 nextY = 0;
//             }
//             break;

//         case 38:
//             if(!ver){
//                 ver = true
//                 hor = false
//                 nextX = 0;
//                 nextY = -1;
//             }
//             break;

//         case 39:
//             if(!hor){
//                 hor = true
//                 ver = false
//                 nextX = 1;
//                 nextY = 0;
//             }
//             break;

//         case 40:
//             if(!ver){
//                 ver = true
//                 hor = false
//                 nextX = 0;
//                 nextY = 1;
//             }
//             break;

//         case 32:

//             break;
//     }
// }