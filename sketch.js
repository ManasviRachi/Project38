var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var score=0;

//var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
  monkey_running =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png",
  "sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  
  //groundImage = loadImage("backroundimg.jpg");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("Daco_445224.png");
  obstacle2 = loadImage("Daco_4156055.png");
  obstacle3 = loadImage("Daco_4156278.png");
 
  
 // gameOverImg = loadImage("gameOver.png");
  //restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  //trex.addAnimation("collided", trex_collided);
  monkey.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
 // restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;

 // gameOver.visible = false;
  //restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("white");
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

