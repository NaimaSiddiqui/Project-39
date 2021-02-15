var path,mainCyclist;
var pathImg,mainRacerImg1, mainRacerFall;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var cycleBell,pinkCG,yellowCG,redCG;
var player1 ,player2 ,player3 ;
var player1Img,player2Img,
    player3Img;
var player1Fall,player2Fall,player3Fall
var edges;
var gameOverImg

function preload(){
  pathImg = loadImage("images/Road.png");
 
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");

  
  mainRacerFall= loadAnimation("images/mainPlayer3.png");
  
  cycleBell=loadSound("sound/bell.mp3")


player1Img=loadAnimation("images/opponent1.png","images/opponent2.png");
player2Img=loadAnimation("images/opponent4.png","images/opponent5.png");
player3Img=loadAnimation("images/opponent7.png","images/opponent8.png");
  
  player1Fall=loadAnimation("images/opponent3.png");
  player2Fall=loadAnimation("images/opponent6.png");
  player3Fall=loadAnimation("images/opponent9.png");

  gameOverImg=loadImage("images/gameOver.png")
  
  
  pinkCG = new Group();
  yellowCG=new Group();
  redCG = new Group();
  
}

function setup(){
  
createCanvas(windowWidth,windowHeight);


//creating boy running
mainCyclist  = createSprite(50,displayHeight/2,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  mainCyclist.debug=true;
  mainCyclist.setCollider("circle",0,0,70)
  mainCyclist.addAnimation( "SahilFalling",mainRacerFall);
  
}

function draw() {
  background(0);
  camera.position.x=mainCyclist.x;
 camera.position.y= mainCyclist.y;
  
  textSize(20);
  fill(255);
  imageMode(CENTER)
image(pathImg,0,height/2,width*4,height)

  
  
  if(gameState===PLAY){
 
 

    distance+=Math.round(getFrameRate()/50)
 

   if(keyDown("right")){
    mainCyclist.x+=5;
   }
   if(keyDown("up")){
    mainCyclist.y-=5;
   }
   if(keyDown("down")){
    mainCyclist.y+=5;
   }
  
  
   
  
 
    
    if(keyDown(32)){
      cycleBell.play();
      }
     
    
 
  
  var selectPlayer=Math.round(random(1,3))
  //console.log(selectPlayer)
  if(frameCount%50===0){
    switch(selectPlayer){
      case 1: pinkCyclists();
        break;
        case 2: redCyclists();
        break;
        case 3: yellowCyclists();
        break;
            }  }
    
    if(pinkCG.isTouching(mainCyclist) )
    {
      player1.changeAnimation("opponentPlayer1",player1Fall);
      gameState=END;
    }
    
    if(redCG.isTouching(mainCyclist) )
    {
      player2.changeAnimation("opponentPlayer2",player2Fall);
     // player2.changeAnimation("Falling2",player2Fall);
      gameState=END;
    }
    
    if(yellowCG.isTouching(mainCyclist) )
    {
      player3.changeAnimation("opponentPlayer3",player3Fall);
      gameState=END;
    }
    
    
    
  }  
  drawSprites();
    if(gameState===END){
            console.log("gameOver")
            mainCyclist.changeAnimation( "SahilFalling",mainRacerFall);
            //cycleBell.play();
            pinkCG.setVelocityXEach(0);
            redCG.setVelocityXEach(0);
            yellowCG.setVelocityXEach(0);  
            //drawSprites();
            image(gameOverImg,mainCyclist.x,mainCyclist.y-50)
    }
  
  

  
  text("Distance: "+ distance,mainCyclist.x+500,mainCyclist.y-300);
}



function pinkCyclists(){
  console.log("pink")
  player1= createSprite(4000,Math.round(random(50,height-50)));
  player1.addAnimation("opponentPlayer1",player1Img)
  player1.velocityX=-(5+5*distance/150);
  player1.scale=0.07;
  player1.lifetime=3000;
  pinkCG.add(player1);
}

function yellowCyclists(){
  console.log("yellow")
  player2= createSprite(4100,Math.round(random(50,height-50)));
  player2.addAnimation("opponentPlayer2",player2Img)
  player2.velocityX=-(5+2*distance/150);
  player2.scale=0.07;
  player2.lifetime=3000;
  yellowCG.add(player2);
  
}

function redCyclists(){
  console.log("red")
  player3= createSprite(4100,Math.round(random(50,height-50)));
  player3.addAnimation("opponentPlayer3",player3Img)
  player3.velocityX=-(5+2*distance/150);
  player3.scale=0.07;
  player3.lifetime=3000;
  redCG.add(player3);
}

