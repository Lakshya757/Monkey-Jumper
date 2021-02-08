var PLAY = 1;
var END = 0;
var gameState = PLAY;
  


var monkey , monkey_running, monkey_hit;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

var ground;

var score, survivalTime;

var gameOver, gameOverImage;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_hit = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  gameOverImage = loadImage("Game_Over.png")
 
}



function setup() {
  createCanvas(600,600);
  
  monkey = createSprite(120,475);
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.15;
  monkey.setCollider("rectangle",0,-100,monkey.length,monkey.height);
  //monkey.debug = true;
  
  
  ground = createSprite(300,515,1200,20)
  ground.velocityX=-5;
  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  
  score = 0;
  
  survivalTime = 0;
}


function draw() {
  background(rgb(115,235,255));
  
  fill(rgb(255,0,0))
  textSize(17)
  text("Score: "+score,450,50)
  
  text("Survival Time: "+ survivalTime,250,50)

  if(gameState === PLAY){
    
    
    if(keyDown("space")){
      
      monkey.velocityY = -13;
    }
    
    
    if(foodGroup.isTouching(monkey)){
      
      score += 1;
      
      foodGroup.destroyEach();
    }
    
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    spawnObstacle();
    spawnBananana();
    
    
    if(obstacleGroup.isTouching(monkey)){
    
    gameState = END;

   }
    
    //Survival Time
    
    survivalTime = survivalTime + Math.round(getFrameRate()/61)
    
  }
  

  else if(gameState === END){
    
    hit();
    
  }
  
  
  
      
  monkey.velocityY = monkey.velocityY + 1;
  
  monkey.collide(ground);
  
 //Depth 

  monkey.depth = ground.depth
  monkey.depth = monkey.depth + 1;
  
  drawSprites();
}

function spawnBananana(){
  
  if(frameCount % 175 === 0){
    
   var banana = createSprite(600,Math.round(random(120,200)));
    banana.addImage(bananaImage);
    banana.velocityX=-5;
    banana.scale=0.132;
    banana.lifetime = 130;
    
    foodGroup.add(banana)
  }

}

function spawnObstacle(){
  
  if(frameCount % 215 === 0){
    
    var obstacle = createSprite(600,460);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-5;
    obstacle.scale = 0.3;
    
    obstacleGroup.add(obstacle)
  }
}

function hit(){

  
  gameOver = createSprite(300,300)
  gameOver.addImage(gameOverImage);
  
  ground.velocityX = 0;
  obstacleGroup.setVelocityXEach(0);
  foodGroup.setVelocityXEach(0);
  
  monkey.addAnimation("hit",monkey_hit);

    
}



