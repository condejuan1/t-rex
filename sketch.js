var trex, trex_running, trex_dead, edges;
var groundImage, ground;
var invisibleGround
var cloud,cloudImage;
var obstacle
var obstacleimage1
var obstacleimage2
var obstacleimage3
var obstacleimage4
var obstacleimage5
var obstacleimage6
var score = 0
var gameEstate="play"
var obstacleGroup,clouneGroup
var sound_checkpoint,jump_sound,die_sound
var gameover,gameoverImage,restart,restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
cloudImage=loadImage("cloud (1).png")
 obstacleimage1=loadImage("obstacle1.png");
 obstacleimage2=loadImage("obstacle2.png");
 obstacleimage3=loadImage("obstacle3.png");
 obstacleimage4=loadImage("obstacle4.png");
 obstacleimage5=loadImage("obstacle5.png");
 obstacleimage6=loadImage("obstacle6.png");
 trex_dead=loadAnimation("trex_collided.png");

 sound_checkpoint=loadSound("checkPoint.mp3")
 jump_sound=loadSound("jump.mp3")
 die_sound=loadSound("die.mp3")
restartImage=loadImage("restart.png")
gameoverImage=loadImage("gameOver.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight  );
  
  //criando o trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("morreu",trex_dead);
  edges = createEdgeSprites();


  
//criando o chao

ground = createSprite(width  /2,height-10, 1600  , 5)
ground.velocityX=-6
ground.addImage(groundImage)
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
//chao invisivel
invisibleGround=createSprite(300,height-5,700,2)
invisibleGround.visible=false

obstaclesGroup=new Group()
cloundGroup=new Group()

trex.debug=false
trex.setCollider("circle",0,0,30)

gameover=createSprite(width/2,100)
gameover.addImage(gameoverImage)
gameover.scale=0.5;

restart=createSprite(width/2,150)
restart.addImage(restartImage)
restart.scale=0.5
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  text("score "+ score ,width-100,50)
  
  
  //registrando a posição y do trex
  console.log(trex.y)
  
  
 
  
  trex.velocityY = trex.velocityY + 0.8;
  
 //impedir que o trex caia
  trex.collide(invisibleGround)
  trex.collide(edges[2])
  drawSprites();
 
 
if (gameEstate === "play"){
  gameover.visible=false;
  restart.visible=false;
  score=score+Math.round(getFrameRate()/60)
  obstaclesGroup.setVelocityXEach(-(6+3*score/100))
ground.velocityX= -(6+3*score/100)

  if(score>0 && score%100===0){

    sound_checkpoint.play()

  }

  if(touches.length>0||keyDown("space")&& trex.y>=height-32){

    trex.velocityY = -11;
    jump_sound.play()
    touches=[]
  }
  if(ground.x<0){

    ground.x=ground.width/2;
      }
      createClouds()
      createobstacle();
 if(trex.isTouching(obstaclesGroup)){
gameEstate='end'
die_sound.play()
//trex.velocityY = -11;
   // jump_sound.play()
 }

}
else if(gameEstate === "end"){
  gameover.visible=true;
  restart.visible=true;
ground.velocityX=0
trex.velocityX=0;
obstaclesGroup.setVelocityXEach(0);
cloundGroup.setVelocityXEach(0);
obstaclesGroup.setLifetimeEach(-1);
cloundGroup.setLifetimeEach(-1);
trex.collide(obstaclesGroup)
trex.changeAnimation('morreu');
if(touches.length>0||mousePressedOver(restart)){
  reset()
  touches=[]
}

}
}

function reset(){
gameEstate="play";
obstaclesGroup.destroyEach();
cloundGroup.destroyEach();
score=0
trex.changeAnimation("running");
trex.x=50
}
//nuvem
function createClouds(){
  if(frameCount %60 === 0) {
    cloud=createSprite(width,100,30,40 )
    cloud.velocityX=-6
    cloud.addImage(cloudImage)
    cloud.y     = Math.round(random(20,100))
    cloud.lifetime=width/6
trex.depth=cloud.depth;
trex.depth+= 1;
cloundGroup.add(cloud)
  }
}
function createobstacle(){
  if(frameCount %60 === 0) {
    obstacle=createSprite(width,height-31,30,40 )
    obstacle.velocityX=-6
    obstacle.lifetime=width/6
 obstacle.scale=0.5
    var aleatorio=Math.round(random(1,6))
obstaclesGroup.add(obstacle)

switch(aleatorio){
  case 1:obstacle.addImage(obstacleimage1);
  break
  case 2:obstacle.addImage(obstacleimage2);
  break
  case 3:obstacle.addImage(obstacleimage3);
  break
  case 4:obstacle.addImage(obstacleimage4);
  break
  case 5:obstacle.addImage(obstacleimage5);
  break
  case 6:obstacle.addImage(obstacleimage6);
  break
}
  }
}