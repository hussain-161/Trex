//declaring variable
var restart;
var restartImage;
var gameOverImage;
var checkPointSound;
var dieSound;
var jumpSound;
var trex_collided;
var END=0;
var PLAY=1;
var gameState=PLAY;
var cloudGroup;
var obstacleGroup;
var trex ,trex_running;
var ground ,groundImage;
var score=0;
//load images in this function
  function preload(){
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
   groundImage=loadImage("ground2.png");
    
   cloudImage=loadImage("cloud.png") ;
    
   obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png"); 
   obstacle3=loadImage("obstacle3.png"); 
   obstacle4=loadImage("obstacle4.png"); 
    obstacle5=loadImage("obstacle5.png");
    obstacle6=loadImage("obstacle6.png");
    
   trex_collided=loadImage("trex_collided.png");

   dieSound=loadSound("die.mp3")
   checkPointSound=loadSound("checkPoint.mp3")
   jumpSound=loadSound("jump.mp3")
   restartImage=loadImage("restart.png")
   gameOverImage=loadImage("gameOver.png")
  }

//create sprites and add images in this function
    function setup(){
    createCanvas(600,200);

    //create a trex sprite
    trex = createSprite(50,160,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided",trex_collided);
    trex.scale=0.5;
    
    
    //create a ground sprite
    ground=createSprite(30,170,600,20);
    ground.addImage("ground",groundImage);
    ground.velocityX=-4;
    
    //creating an invisible ground
    invisibleGround=createSprite(30,190,600,20);
    invisibleGround.visible=false;
    
   // create obstacle Group
   obstacleGroup=new Group();
   
  trex.setCollider("rectangle",0,0,80,100)  
  //trex.debug=true   
       
   cloudGroup=createGroup();
    
   restart=createSprite(300,120);
   restart.addImage(restartImage);
   restart.scale=0.5;
   restart.visible=false
   gameOver=createSprite(300,70);
   gameOver.addImage(gameOverImage);
   gameOver.visible=false
  }


  function draw(){
    
    background("blue");
    
    // making the game state play 
    if(gameState===PLAY){
    console.log("PLAY")
      fill("white")
    text("score : "+score,300,20)
    score=score+Math.round(frameRate()/60);
      if (score>0 && score %200===0){
       checkPointSound.play();
        console.log("CHECKPOINT")
}
    //making trex jump
    if(keyDown("space") && trex.y>=150){
      trex.velocityY=-12;
      jumpSound.play();
      
    }
    
    //gravity
    trex.velocityY=trex.velocityY+0.8;
  
    //making the ground stay on the canvas
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    ground.velocityX=-4;
     
     spawnClouds();
    spawnObstacles(); 
      // checking if trex is colliding the obstacle 
    if(trex.isTouching(obstacleGroup)){
     gameState=END ;
     dieSound.play();
    }  
      
      
    }
    // changing the gamestate to end
   else if (gameState===END){
    restart.visible=true
    gameOver.visible=true
    ground.velocityX=0;  
   console.log("END")  
   trex.velocityY=0;
   obstacleGroup.setVelocityXEach(0);  
   cloudGroup.setVelocityXEach(0); 
   trex.changeAnimation("collided",trex_collided);
   obstacleGroup.setLifetimeEach(-1); 
    cloudGroup.setLifetimeEach(-1);   
    fill("white")
    text("score : "+score,300,20) 
   }
   
    if(mousePressedOver(restart)) {
     reset();
    }
    //making the trex stay on the ground
    trex.collide(invisibleGround);
    drawSprites();

  }
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 600/3;
    //lifetime=distance/velocity
    console.log(trex.depth) 
    console.log(cloud.depth)
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
     cloudGroup.add(cloud);
    }

  
}

function spawnObstacles(){
  if(frameCount%60===0){
  var obstacle=createSprite(600,160,10,40) 
obstacle.velocityX=-6; 
    obstacle.scale=0.5;
    obstacle.lifetime=600/6;
  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: obstacle.addImage(obstacle1);  
    break;  
     case 2: obstacle.addImage(obstacle2);  
    break;    
     case 3: obstacle.addImage(obstacle3);  
    break;    
     case 4: obstacle.addImage(obstacle4);  
    break;    
      case 5: obstacle.addImage(obstacle5);  
    break;  
     case 6: obstacle.addImage(obstacle6);  
    break;  
    default:break;
  }
  
  obstacleGroup.add(obstacle);
  }

  
}

function reset(){
console.log("inside the resetet button")  
 gameState=PLAY 
 obstacleGroup.destroyEach();
 cloudGroup.destroyEach();
 restart.visible=false
gameOver.visible=false
  trex.changeAnimation("running",trex_running);
  score=0;
}