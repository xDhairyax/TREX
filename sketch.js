var PLAY=1;
var END=0;
var gameState=PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudImg,CloudsGroup;
var ob1,ob2,ob3,ob4,ob5,ob6,ObstaclesGroup;

var score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImg=loadImage("cloud.png");
  
  ob1=loadImage("obstacle1.png");
  ob2=loadImage("obstacle2.png");
  ob3=loadImage("obstacle3.png");
  ob4=loadImage("obstacle4.png");
  ob5=loadImage("obstacle5.png");
  ob6=loadImage("obstacle6.png");
  
}

function setup() {
  createCanvas(500,200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(0,180,600,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  CloudsGroup=new Group();
  ObstaclesGroup=new Group();

  camera.position.x=trex.x;
}

function draw() {
  background(180);
  text("Score: "+score,220,50);

  //console.log(trex.y);

 
  camera.position.y=100;
  trex.collide(invisibleGround);

  if(gameState===PLAY){

    score=score+Math.round(getFrameRate()/60);
  
    if(keyDown("space") && trex.y>100) {
      trex.velocityY = -15;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(ObstaclesGroup.x-trex.x<trex.width/2+ObstaclesGroup.width/2 &&
       trex.x-ObstaclesGroup.x<trex.width/2+ObstaclesGroup.width/2 &&
       ObstaclesGroup.y-trex.y<trex.height/2+ObstaclesGroup.height/2 &&
       trex.y-ObstaclesGroup.y<trex.height/2+ObstaclesGroup.height/2){

         gameState=END;
       
        }
    }
  
  if(gameState===END){
    ground.velocityX=0;
    trex.velocityY=0;
  }

  
  spawnClouds();
  
  spawnObstacles();
  
  drawSprites();
}

function spawnClouds(){
  if(frameCount % 60===0){
  var cloud = createSprite(600,120,40,10);
    cloud.y=Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale=0.5;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    
    CloudsGroup.add(cloud);  
  }
}

function spawnObstacles(){
  if(frameCount % 100===0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX=-5;
    var rand=Math.round(random(1,6));
     switch(rand){
       case 1:obstacle.addImage(ob1);
         break;
        case 2:obstacle.addImage(ob2);
         break; 
         case 3:obstacle.addImage(ob3);
         break;
         case 4:obstacle.addImage(ob4);
         break;
         case 5:obstacle.addImage(ob5);
         break;
         case 6:obstacle.addImage(ob6);
         break;
         default :break;
     }
    obstacle.scale=0.5;
    obstacle.lifetime=120;
    ObstaclesGroup.add(obstacle);
  }
}