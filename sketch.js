
var monkey , monkey_running;
var fruit ,bananaImage, obstacle, obstacleImage;
var FoodGrp, obstacleGrp;
var score;
var play = 1;
var end = 0;
var gameState = play;
var gameoverImage,gameover,restart,restartImage;

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bgg = loadImage("back.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameoverImage = loadImage("gameover.png");
  restartImage = loadImage("restart.png");
}



function setup() {
  createCanvas(400,400);
  
  score = 0;
  
  obstacleGrp = new Group();
  FoodGrp = new Group();
  
  ground = createSprite(200,370,800,20);
  ground.debug = false;
  ground.setCollider("rectangle",0,0,800,29);
  
  bg = createSprite(200,200);
  bg.addImage(bgg);
  
  monkey = createSprite(60,313)
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.15; 
  monkey.debug = false;
  monkey.setCollider("circle",0,4,220);
  
  gameover = createSprite(200,150);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(200,200);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  restart.visible = false;
}


function draw() {
  background(255);
  console.log(getFrameRate());
  
  if(gameState === play){
     
     bg.velocityX = -5;
    
     if(bg.x < 0){
      bg.x = bg.width/2;
     } 
     
     monkey.play();
    
     gameover.visible = false;
     restart.visible = false;
    
     score = score + Math.round(getFrameRate()/60);
    
     if(keyDown("space") && monkey.y > 300){
      SpaceButton();
     }
     if(monkey.isTouching(FoodGrp)){
      FoodGrp.destroyEach();
     }
     monkey.velocityY = monkey.velocityY+0.5;

     Fruit();
     Enemy();
  }
  else if(gameState === end){
     monkey.pause();
     monkey.setVelocity(0,0);
     
     bg.velocityX = 0;
    
     gameover.visible = true;
     restart.visible = true;
    
     ground.velocityX = 0;

     obstacleGrp.setVelocityXEach(0);
     FoodGrp.setVelocityXEach(0);

     obstacleGrp.setLifetimeEach(-1);
     FoodGrp.setLifetimeEach(-1);
     
     if(mousePressedOver(restart)){
       gameState = play;
       score = 0;
       
       obstacleGrp.destroyEach();
       FoodGrp.destroyEach();
     }
    }
    if(monkey.isTouching(obstacleGrp)){
     gameState = end;
  }
  monkey.collide(ground);
  drawSprites();
  fill("black");
  textSize(20);
  text("Survival Time :"+" "+score,120,50);
}
function SpaceButton(){
    monkey.velocityY = -12;
}
function Enemy(){
  if(frameCount%180 === 0){
    obstacle = createSprite(700,344);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -5;
    obstacle.lifetime = 200;
    obstacleGrp.add(obstacle);
    obstacle.debug = false;
    obstacle.setCollider("circle",-2,2,200)
  }
}
function Fruit(){
  if(frameCount%80 === 0){
   fruit = createSprite(500,Math.round(random(120,200)));
   fruit.addImage(bananaImage);
   fruit.scale = 0.12;
   fruit.velocityX = -5;
   fruit.lifetime = 100;
   FoodGrp.add(fruit); 
 }
}




