var Alien, AlienImg, AlienGroup; 
var Spaceship, SpaceshipImg;
var lazerGroup;
var Sky, SkyImg;
var gamestate = "start";
var score = 0;
var line;

function preload(){
  AlienImg = loadImage("Alien.png");
  SpaceshipImg = loadImage("Spaceship.png");
  SkyImg = loadImage("Night-Sky-With-Stars.jpg");
}
function setup(){
  createCanvas(windowWidth, windowHeight, windowWidth, windowHeight);

  lazerGroup = new Group();
  AlienGroup = new Group();

  Sky = createSprite(width/2, height/2,);
  Sky.addImage(SkyImg);
  Sky.scale = 5;
  Sky.velocityY = 2;

  line = createSprite(width/2, height-50, width, 2);
  line.visible = false;

  Spaceship = createSprite(width/2, height- 80);
  Spaceship.addImage(SpaceshipImg)
  Spaceship.scale = 0.1;
  
  
  
  
  
}

function draw() {
  background(0);
  drawSprites();

  if(gamestate == "start"){
    fill("white");
    textSize(30);
    text("Click to start", width/2 - 90, height/2);

    if(keyDown("space")){
      gamestate = "play";
    }
  }
  else if(gamestate == "play"){
    if(keyWentDown("space")){
      shootLazer();
    }
  
    if(keyDown("left")){
      Spaceship.x = Spaceship.x -10 - score/50;
    }
  
    if(keyDown("right")){
      Spaceship.x = Spaceship.x + 10 + score/50;
    }
  
    if(Spaceship.x < 20){
      Spaceship.x = 20;
    }
    if(Spaceship.x > width - 20){
      Spaceship.x = width - 20;
    }
  
    AlienGroup.bounceOff(lazerGroup, lazerHit);
  
    
    spawnAlien();

  
    if( AlienGroup.isTouching(Spaceship) || AlienGroup.isTouching(line)){
        gamestate = "end";
    }

  }
  else if(gamestate == "end"){
    fill("yellow");
    textSize(150);
    text("GAME OVER", width/4 - 145, height/2);
  }
  
  if(Sky.y > width/2-150){
    Sky.y = Sky.width/2
  }


  
  fill("white");
  textSize(20);
  text("Score: "+ score, 100, height - 40);
}

function lazerHit(lazer, Alien){
  lazer.remove();
  Alien.remove();
  score += 10;
}

function shootLazer(){
  var lazer = createSprite(200, 200, 3, 10);
  lazer.x = Spaceship.x;
  lazer.y = Spaceship.y;
  lazer.shapeColor = "red"
  lazer.scale = 1.5;
  lazer.velocityY = -5;
  lazer.lifetime = 600;

  lazerGroup.add(lazer);

}

function spawnAlien(){
  if(frameCount %100 ==0){
    Alien = createSprite(200, -50);
    Alien.rotation = Alien.rotation + 180;
    Alien.x = Math.round(random(50, width-50));
    Alien.addImage(AlienImg);
    Alien.scale = 0.1;
    Alien.velocityY = 5 + score/200;
    Alien.lifetime = 600;
    AlienGroup.add(Alien);
  }
  
  
}


