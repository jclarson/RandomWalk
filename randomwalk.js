const size = 30; // size of ball
const balls = []; // array to hold all free balls
const stepSize = 5; // step size every update
const gravity = 1;
let speed = 5; // wind speed

// this function makes a ball with position and velocity set
function makeBall(xcoord, ycoord, color, velx = 0, vely = 0, fixed = 0) {
  let statObj = {x: xcoord, y: ycoord, velx: velx, vely: vely};
  ball = document.createElement("div");
  ball.style.backgroundColor = color;
  ball.className = "ball";
  ball.style.height = ball.style.width = size;
  ball.style.top = ycoord;
  ball.style.left = xcoord;
  document.body.appendChild(ball);
  if (!fixed) {
    // only free balls will be updated
    balls.push([ball,statObj]);
  }
}

function getRandom(step) {
  // return value between +step and -step
  return Math.random() * 2 * step - step;
}

function update() {
  // the wind speed is added to x direction
  for (let i = 0; i < balls.length; i++) {
    let stats = balls[i][1];
    stats.x += getRandom(stepSize) + speed;
    stats.y += getRandom(stepSize) + gravity;
    if (stats.y <= (400 - size)) {
      balls[i][0].style.left = stats.x;
      balls[i][0].style.top = stats.y;
    }
  }
  setTimeout(update, 100); // this calls update every 1/10 second
}

function factory(total) {
  for (let i = balls.length; i < total; i++) {
    let x = 100;
    let y = 300;
    let colorNumber = Math.floor(getRandom(16777215));
    makeBall(x, y, colorNumber.toString(16));
    let stats = balls[i][1];
    stats.x = x;
    stats.y = y;
    
  }
  update();
}

function addDiv(id) {
  let div = document.createElement('div');
  div.id = id;
  document.getElementsByTagName('body')[0].appendChild(div);
}

makeBall(100, 300, "red");
factory(5);
update();