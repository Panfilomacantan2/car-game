const WIDTH = 300;
const HEIGHT = 500;

const enemyBox = document.querySelector(".enemy");
const carBox = document.querySelector(".car");

let score = 0



let gameLoopInterval;

let car = {
  x: 0,
  y: 0,
};

let enemy = {
  enemyX: 0,
  enemyY: 0,
};

let { x, y } = car;
let { enemyX, enemyY } = enemy;

document.addEventListener("keydown", (e) => {
  // 39 right
  if (e.keyCode === 39 && x < WIDTH - 100) {
    moveLeft();
  }

  // 37 left
  if (e.keyCode === 37 && x > 0) {
    moveRight();
  }
});

const moveLeft = () => {
  x += 15;
  carBox.style.left = `${x}px`;
  console.log("box left: ", Math.floor(carBox.getBoundingClientRect().left));
  console.log(
    "enemy right: ",
    Math.floor(enemyBox.getBoundingClientRect().right)
  );
};

const moveRight = () => {
  x -= 15;
  carBox.style.left = `${x}px`;
  console.log("box left: ", Math.floor(carBox.getBoundingClientRect().left));
  console.log(
    "enemy right: ",
    Math.floor(enemyBox.getBoundingClientRect().right)
  );
};

const updateEnemy = () => {
  let randomEnemyPosition = Math.floor(Math.random() * 3);
  let enemyCarRandom = Math.floor(Math.random() * 4) + 1;

  let enemyPosLeft = randomEnemyPosition * 100;

  enemyBox.style.left = `${enemyPosLeft}px`;

  enemyBox.style.background = `url(car${enemyCarRandom}.png)`;
  enemyBox.style.backgroundSize = "100% 100%";
};

const moveEnemy = () => {
  if (enemyY > HEIGHT) {
    console.log("THe enemy surpassed");
    enemyY = 0;
    score += 1
    document.querySelector(".score").innerHTML = score
    updateEnemy();
  } else {
    enemyY += 1;
    enemyBox.style.top = `${enemyY}px`;
  }
};

const checkCollision = () => {
  if (
    carBox.getBoundingClientRect().top <
      enemyBox.getBoundingClientRect().bottom &&
    carBox.getBoundingClientRect().bottom >
      enemyBox.getBoundingClientRect().top &&
    carBox.getBoundingClientRect().left <
      enemyBox.getBoundingClientRect().right - 50 &&
    carBox.getBoundingClientRect().right - 50 >
      enemyBox.getBoundingClientRect().left
  ) {
    console.log("collision");
    document.querySelector(".score").innerHTML = 'Game Over!'

    enemyY += 1;

    clearInterval(gameLoopInterval);
  }

  // console.log("box left: ", Math.floor(carBox.getBoundingClientRect().left));
  // console.log(
  //   "enemy right: ",
  //   Math.floor(enemyBox.getBoundingClientRect().right)
  // );
  // console.log("box top: ", Math.floor(carBox.getBoundingClientRect().top));
  // console.log(
  //   "enemy bottom: ",
  //   Math.floor(enemyBox.getBoundingClientRect().bottom)
  // );
};

const gameLoop = () => {
  moveEnemy();
  checkCollision();
};

gameLoopInterval = setInterval(gameLoop, 1);
