let main = document.querySelector(".main")
main.appendChild(getTemplate("start_template"))

var canvas, ctx;

var interval_id

// game world
var gridSizex = 35
var gridSizey = 20
var tileSize = 20
var nextX = (nextY = 0);
var previous = 0

var interval_started = false

// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);
var appleX, appleY;

var size = tailSize
var pause = false
console.log(localStorage.getItem("highScore"+1))

game_strter()


// display score at start screen
function score_side(){
    let start_screen = document.querySelector(".start-screen")
    let right_side = start_screen.querySelector(".right")

    if(localStorage.getItem("highScore1") === null && localStorage.getItem("highScore1") === null && localStorage.getItem("highScore1") === null){
        right_side.setAttribute("style","display:none")
    } else {
        right_side.setAttribute("style","display:block")
        for(let i = 1; i<= 3; i++){
            if(localStorage.getItem("highScore"+i) !== null){
                right_side.querySelector(".high-score>.highScore"+i).innerText = localStorage.getItem("highScore"+i)
            }
            
        }
        
    }
}


// add eventlistener to the game start button everytime it is loaded from template
function game_strter() {
    let start_button = document.querySelector("div#start")

    let start_screen = document.querySelector(".start-screen")

    score_side()

    start_button.addEventListener("click", e => {

        start_button.classList.add("flip")

        setTimeout(() => {
            start_screen.classList.add("zoomOut")
            setTimeout(() => {
                main.replaceChild(getTemplate("game_template"), start_screen)
                canvas = document.getElementById("canvas");
                ctx = canvas.getContext("2d");
                let controls = document.querySelector(".controls")
                controls.classList.add('slideInLeft')
                controls.style.display = "block"

                setTimeout(() => {
                    controls.classList.remove('slideInLeft')
                }, 500)

                document.addEventListener("keydown", keyDownEvent);
                // render X times per second
                var x = 9;
                interval_id = setInterval(draw, 1000 / x);
                
            }, 500)
        }, 1000)
    })
}


function getTemplate(TId) {
    if (!window.templates) {
        window.templates = {}
    }

    if (!window.templates[TId]) {
        window.templates[TId] = document.querySelector(`template#${TId}`).content
    }
    // return window.templates[TId].content.cloneNode(true)
    return document.importNode(window.templates[TId], true)
}

// window.onload = function() {
//     canvas = document.getElementById("canvas");
//     ctx = canvas.getContext("2d");

//     document.addEventListener("keydown", keyDownEvent);

//     // render X times per second
//     var x = 8;
//     setInterval(draw, 900 / x);
// };

// set random apple locations
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
    // draw the game in canvas

function draw() {
    // move snake in next pos

    if (!pause) {
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

        let score = (tailSize*10-30)
        size = tailSize

        appleX = Math.floor(Math.random() * gridSizex);
        appleY = Math.floor(Math.random() * gridSizey);

        let highScore1 = (localStorage.getItem("highScore1") | 0)
        let highScore2 = (localStorage.getItem("highScore2") | 0)
        let highScore3 = (localStorage.getItem("highScore3") | 0)

        if(score>highScore1){
            localStorage.setItem("highScore1", score)
        } else if(score > highScore2){
            localStorage.setItem("highScore2", score)
        } else if(score > highScore3){
            localStorage.setItem("highScore3", score)
        }
        
    }

    //paint background
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // paint snake

    for (var i = 0; i < snakeTrail.length; i++) {
        if (i == (snakeTrail.length - 1)) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(
                snakeTrail[i].x * tileSize,
                snakeTrail[i].y * tileSize,
                tileSize,
                tileSize
            );
        } else {
            ctx.fillStyle = "#9c9c9c";
            ctx.fillRect(
                snakeTrail[i].x * tileSize,
                snakeTrail[i].y * tileSize,
                tileSize,
                tileSize
            );
        }


        //snake bites it's tail?
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
            if (!pause && previous != 0) {
                let score = (tailSize * 10 - 30)
                myFunction('You Died. Your Score is : ' + score)
                tailSize = defaultTailSize
                size = tailSize
                pause = true
                setApple()
                document.querySelector(".pos_top").innerHTML = "Previous Score: " + score
                document.querySelector(".pos_top").style.display = "block"
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
    if (!pause) {
        snakeTrail.push({ x: snakeX, y: snakeY });
        while (snakeTrail.length > tailSize) {
            snakeTrail.shift();
        }
    }

}

// input
function keyDownEvent(e) {

    size = tailSize
    if (pause && (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)) {
        myFunction("Now Playing")
    }

    switch (e.keyCode) {
        case 37:
            if (previous != 39) {
                nextX = -1;
                nextY = 0;
                pause = false
                previous = e.keyCode
            } else {
                previous = 39
                myFunction("Cannot go that Direction")
            }
            break;
        case 38:
            if (previous != 40) {
                nextX = 0;
                nextY = -1;
                pause = false
                previous = e.keyCode
            } else {
                previous = 40
                myFunction("Cannot go that Direction")
            }
            break;
        case 39:
            if (previous != 37) {
                nextX = 1;
                nextY = 0;
                pause = false
                previous = e.keyCode
            } else {
                previous = 37
                myFunction("Cannot go that Direction")
            }
            break;
        case 40:
            if (previous != 38) {
                nextX = 0;
                nextY = 1;
                pause = false
                previous = e.keyCode
            } else {
                previous = 38
                myFunction("Cannot go that Direction")
            }
            break;
        case 32:
            if (!pause) {
                pause = true
                nextX = 0
                nextY = 0
                myFunction("Game Paused")
            } else {
                myFunction("Use arrow Keys to Play")
            }
            break;
    }
}


// simple toast message
function myFunction(text, time = 3000, dur = "show") {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = dur;
    x.innerText = text

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() { x.className = x.className.replace("show", ""); }, time);
}


// play pause button
document.querySelector(".play_pause").addEventListener("click", e => {
    if (!pause) {
        pause = true
        nextX = 0
        nextY = 0
        myFunction("Game Paused")
    } else {
        myFunction("Use arrow Keys to Play")
    }
})

// help button
document.querySelector(".help").addEventListener("click", e => {

    myFunction("Arrows to play: Space to Pause", 8000, "long_show")
})


// close button
document.querySelector(".close").addEventListener("click", e => {

    clearInterval(interval_id)
    pause = true
    document.removeEventListener("keydown", keyDownEvent);

    let game = document.querySelector(".game")
    let controls = document.querySelector(".controls")

    controls.classList.add("slideOutLeft")

    setTimeout(() => {
        document.querySelector(".pos_top").style.display = "none"
        controls.classList.remove("slideOutLeft")
        controls.style.display = "none"

        main.replaceChild(getTemplate("start_template"), game)
        score_side()
        document.querySelector(".start-screen").classList.add("zoomIn")

        setTimeout(() => {
            game_strter()
            document.querySelector(".start-screen").classList.remove("zoomIn")
        }, 500)
    }, 500)


})