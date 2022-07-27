

const canvas = document.querySelector("canvas");
canvas.style.border = "2px solid grey";

let ctx = canvas.getContext('2d');
let startScreen = document.querySelector(".game-intro");
let intervalId = 0;
let isGameOver = false;
let score = 0;
let background = new Image();
background.src = "images/road.png";
let car = new Image();
car.src = "images/car.png";
let carX = 250;
let carY = 400;
let carWidth = 80;
let carLength = 130;
//obstacle car
let obCar = new Image();
obCar.src = 'images/car.png';
let obCarX = 50 + Math.floor(Math.random() * 350);
let obCarY = -400;
let gameOverFoto = document.querySelector('.gameOverPic');






window.onload = () => {
  canvas.style.display = 'none';


  document.getElementById('start-button').onclick = () => {
    startGame();
  };
  document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowRight' && carX + carWidth < canvas.width - 50) {
      carX += 4;
    } else if (event.code === 'ArrowLeft' && carX > 50) {
      carX -= 4;
    }
    else if (event.code === 'ArrowUp' && carY + carLength > 130) {
      carY -= 4;
    }
    else if (event.code === 'ArrowDown' && carY < canvas.height - carLength ) {
      carY += 4;

    }
  }); 



  
 

  function startGame() {
    canvas.style.display = 'block';
    startScreen.style.display = 'none';
    

  



    //drawing the background and the cars
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(car, carX, carY, carWidth, carLength);
    ctx.drawImage(obCar, obCarX, obCarY, carWidth, carLength);



    //obCar movement
    obCarY += 2;
    if (obCarY > canvas.height) {
      obCarY = -400;
      score++;
      obCarX = 50 + Math.floor(Math.random() * 350);
      ;
    }

    

    //collision with cars
    if (
      carY < obCarY + carLength &&
      carX < obCarX + carWidth - 5 &&
      carX + carWidth > obCarX &&
      carY + carLength > obCarY
    ) {
      isGameOver = true;
      canvas.style.display = 'none';
      gameOverFoto.style.display="block";
      document.querySelector(".gameOverBtn").style.display="block";
     
      
      
    }

  
   
    
    //scoreboard
    ctx.font = '30px Georgia';
    ctx.fillText(`Score:${score}`, 100, 40);
    intervalId = requestAnimationFrame(startGame);
    if (isGameOver) {
      cancelAnimationFrame(intervalId);


    }
  }

  
    
 

};

document.querySelector(".gameOverBtn").onclick = () => {
  location.reload();
  }

