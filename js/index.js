let inputDir = {x:0 ,y:0};

const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3');
const moveSound = new Audio('../music/move.mp3');
const musicSound = new Audio('../music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime =0;
let snakeArr = [
    { x: 13, y:13}
]

let food = {
    x: 3, y: 3
}
let HighScore = JSON.parse(localStorage.getItem('HighScore')) || 0;
hiscore.innerHTML = "Hi-Score : " + HighScore;


const isCollide = (snakeArr)=>{
    for(let i=1; i<snakeArr.length; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x >= 18 || snakeArr[0].y >= 18 || snakeArr[0].x <= 0 || snakeArr[0].y <= 0){
        
        return true; 
    }
}

function main(ctime) {

    window.requestAnimationFrame(main);

    if((ctime- lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine()

}

function gameEngine(){

    musicSound.play()

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir= { x: 0, y: 0 };
        alert("Game Over, Press any key to play again!");
        snakeArr= [ { x: 13, y:13}];
        musicSound.play();
        score = 0;
    }

    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        foodSound.play();
        score += 5;
        speed += 1;
        if(score > HighScore){
            HighScore = score;
            hiscore.innerHTML = "Hi-Score : " + HighScore;
            localStorage.setItem("HighScore", JSON.stringify(HighScore));
        }
        document.getElementById("score").innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {
            x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())
        }
    }

    for(let i = snakeArr.length - 2; i >=0; i--){
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x ;
    snakeArr[0].y += inputDir.y ;

    board.innerHTML = "";

    snakeArr.forEach((e,i)=>{
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart= e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(i == 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })


    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e)=>{
    inputDir = {x: 0 , y: 1};
    moveSound.play();

    switch (e.key) {
        case 'ArrowDown':
            inputDir.x =0;
            inputDir.y = 1;
            break;
            
        case 'ArrowUp':
            inputDir.x =0;
            inputDir.y = -1;
            break;
            
        case 'ArrowLeft':
            inputDir.x =-1;
            inputDir.y = 0;
            break;
           
         case 'ArrowRight':
            inputDir.x =1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

})