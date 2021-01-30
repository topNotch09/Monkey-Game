var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey,monkey_running
var ground, invisibleGround, groundImage;

var obsGroup, obstaceImage;

var score;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
}

function setup() {
  createCanvas(600, 200);
  

  monkey = createSprite(50,180,20,50);
  
  monkey.addAnimation("running", monkey_running);
  

  monkey.scale = 0.15;
  
  ground = createSprite(600,180,400,5);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Banana Groups
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();

  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){
    //move the 
    //change the monkey animation
      monkey.changeAnimation("running", monkey_running);
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    //stop monkey from falling down
    monkey.collide(ground);
    
    if(obstaclesGroup.isTouching(monkey)){
        //monkey.velocityY = -12;
        gameState = END;
      
    }
  }
   else if (gameState === END) {
       
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);    
     
  
 
  //stop monkey from falling down
  monkey.collide(ground);
  
  
  
   }
  drawSprites();
}

function reset(){
 gameState = PLAY
 obstaclesGroup.destroyEach();
 bananasGroup.destroyEach();
 score = 0
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBananas() {
  //write code here to spawn the bananas
 if (frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
}

