//COMMENT HEADER
//Judie Du
//November 10, 2020
//Final Summative: The Chick Game
//Reference: https://p5js.org/reference/                             
//Ms. Bokhari
//This program will be making a simple game.

var gameState;

var left_key_pressed = false;
var up_key_pressed = false;
var right_key_pressed = false;
var down_key_pressed = false;

var amyXlocation;
var amyYlocation
var amySize;

var leftwingAngle;
var leftwingDirection;
var rightwingAngle;
var rightwingDirection;

var r;
var g;
var b;

var amyX;
var amyY;
var amySize2;
var amySize3;
var amyX2;
var amySpeed;

var apple;
var appleX;
var appleY;
var appleX2;
var appleY2;

var monster;
var monsterX;
var monsterY;


function preload(){
  apple = loadImage('apple.png');
  monster = loadImage('monster.png');
}


function setup() {
  createCanvas(600, 500);
  gameState='start';
  amyXlocation=25;
  amyYlocation=25;
  amySize=40;
  
  leftwingAngle=-1;
  leftwingDirection=-1;
  rightwingAngle=-1;
  rightwingDirection=-1;
  
  r=random(170,255);
  g=random(170,255);
  b=random(170,255);
  
  angleMode(DEGREES);
  textAlign(CENTER);
  textStyle(BOLD)
  textFont('Cambria');
  
  amyX=400;
  amyY=400;
  amySize2=30;
  amySize3=50;
  amyX2=100;
  amySpeed=7;
  
  appleX=400;
  appleY=200;
  appleX2=0;
  appleY2=0;
  monsterX=0;
  monsterY=100;
}


function draw() {
  // movement of wings
  leftwingAngle = leftwingAngle + leftwingDirection
  if(leftwingAngle>=30){
    leftwingDirection = -1
  }
  else if(leftwingAngle<1){
    leftwingDirection = 1;
  }
  rightwingAngle = rightwingAngle + rightwingDirection
  if(rightwingAngle<=-30){
    rightwingDirection = 1;
  }
  else if(rightwingAngle>-1){
    rightwingDirection = -1;
  } 
  
  
  
  
 //TITLE PAGE
 if(gameState=='start');{ 
   background(r,g,b);
   if(leftwingAngle>=30 || leftwingAngle<1){
     r=random(170,255);
     g=random(170,255);
     b=random(170,255);
   }
  
    // draw character
    for(amyXlocation=25;amyXlocation<=width;amyXlocation+=90){
      for(amyYlocation=25;amyYlocation<=height;amyYlocation+=90){
        drawCharacter(amyXlocation,amyYlocation,amySize,
                leftwingAngle,rightwingAngle)
      } //close nested loop
    } //close loop
   
    fill(255, 252, 240);
    rect(300,190,450,100);
    fill(0);
    textSize(50);
    textStyle(BOLD);
    text('THE CHICK GAME',300,205);
   
    fill(255, 252, 240);
    if(mouseX>200 && mouseX<400 && 
       mouseY>260 && mouseY<320)
      fill(199, 86, 67);
    rect(300,290,200,60);
    fill(0);
    textSize(30);
    text('START!',300,300);
   
    fill(255, 252, 240);
    if(mouseX>200 && mouseX<400 && mouseY>330 && mouseY<370)
      fill(199, 86, 67);
    rect(300,350,200,35);
    fill(0);
    textSize(15);
    //textStyle(BOLD);
    text('CLICK HERE FOR RULES',300,357);
  } //close if statement: 'start'
  
  
  
  
  //RULES
  if(gameState=='rules'){
    background(248, 205, 119);
    textStyle(BOLD);
    textSize(30);
    text('RULES',300,80);
    textSize(20);
    fill(60);
    textStyle(ITALIC);
    text('Oh no! A monster is chasing Amy!',300,120);
    textStyle(NORMAL);
    fill(0);
    textSize(18);
    text("▷ Use arrow keys to control Amy's movement",300,180);
    text('▷ Eat apples to grow bigger',300,220);
    text('▷ To defeat the monster, Amy needs to be bigger than it',300,260);
    text("▷ Don't touch the mouth of the monster! Or Amy will be eaten!",300,300);
    textStyle(BOLDITALIC);
    textSize(30);
    fill(182, 88, 88);
    text('HAVE FUN!',300,370);
    fill(0);
    textSize(16);
    if(mouseX>15 && mouseX<127 && mouseY>9 && mouseY<28)
      fill(255);
    text('◀ Back to Menu',70,25);
    image(monster,30,370,120,120);
    image(apple,23,383,50,50);
    textStyle(NORMAL);
  }
  
  
  
  
  //GAME
  if(gameState=='game'){
    background(182, 197, 155);
    textSize(17);
    textStyle(NORMAL);
    text('Monster Size: 140',78,30);
    text('Amy Size: '+ amySize2,62,48);
    drawCharacter(amyX,amyY,amySize2,leftwingAngle,rightwingAngle);
    moveAmy()
    image(apple,appleX,appleY,50,50);
    eatApple();
    image(monster,monsterX,monsterY,200,200);
    monsterMove();
    
      if(amyX > monsterX+60 && 
        amyX < monsterX+150 && 
        amyY > monsterY + 60 &&
        amyY < monsterY +100){
        
         if(amySize2 < 140){
           gameState='lose';
           
           monsterX=0;
           monsterY=100;
           amyX=400;
           amyY=400; // reset amy's position to where it oringinally was, otherwise                when restarting the game, amy will appear at the spot where she ended the              game.
           amySize2=30; // reset amy's size
         }
         else if(amySize2 > 140){
           gameState='win';
           
           monsterX=0;
           monsterY=100;
           amyX=400;
           amyY=400;
           amySize2=30;
         } 
      }
 } //close if statement: (gameState=='game')

  
  
  
  //IF LOSE
  if(gameState=='lose'){
    background(199, 86, 67);
    image(monster,20,150,550,550);
    textSize(24);
    text('OH NO! AMY WAS EATEN BY THE MONSTER!',300,80);
    textSize(17);
    if(mouseX>210 && mouseX<400 && mouseY>105 && mouseY<125)
     fill(255);
    text('> Click Here To Play Again',300,120);
    //Amy shrinks in the monster's mouth
    if(amySize3>0){
      amySize3=amySize3-0.2
    }
    else{
      amySize3=0
    }
    drawCharacter(325,365,amySize3,leftwingAngle,rightwingAngle)
  } //close if statement: (gameState=='lose')
  
  
  
  
  //IF WIN
  if(gameState=='win'){
    background(220,162,151);
    textSize(28);
    text('YEY! YOU WIN!',300,100);
    textSize(20);
    text('The monster is defeated!',300,130);
    textSize(16);
    if(mouseX>15 && mouseX<127 && mouseY>9 && mouseY<28)
      fill(255);
    text('◀ Back to Menu',70,25);
    for(appleX2=5;appleX2<=600;appleX2+=90){
      for(appleY2=180;appleY2<=500;appleY2+=90){
        image(apple,appleX2,appleY2,65,65);
      }
    }
   // amy bounce off left and right
   amyX2 = amyX2-amySpeed;
   if(amyX2 > 500){
     amySpeed= -amySpeed;
   }
   else if(amyX2 < 100){
     amySpeed= -amySpeed;
   }
   drawCharacter(amyX2,350,200,leftwingAngle,rightwingAngle);
  } //close if statement: (gameState=='win')
} //close draw function



//FUNCTIONS
//Amy eats apples to grow bigger
function eatApple(){
  if(appleX+25>amyX-amySize2/2 && appleX+25<amyX+amySize2/2 && appleY+25>amyY-amySize2/2 && appleY+25<amyY+amySize2/2){
  appleX = random(30,570);
  appleY = random(30,470); 
  amySize2=amySize2+70; //grows by 7
  }
}



// Monster chases amy
function monsterMove(){
  if(monsterX+100 > amyX){
    monsterX = monsterX - 1
  }
  else if(monsterX+100 < amyX){
    monsterX = monsterX + 1
  }
  if(monsterY+95 > amyY){
    monsterY = monsterY - 1
  }
  else if(monsterY+95 < amyX){
    monsterY = monsterY + 1
  }
}




function mousePressed() {
  if (gameState=='start'){
    if(mouseX>200 && mouseX<400 && mouseY>260 && mouseY<320){
      gameState='game';
    }
    else if(mouseX>200 && mouseX<400 && mouseY>330 && mouseY<370){
      gameState='rules';
    }
  }
  
  if (gameState=='rules'){
    if(mouseX>15 && mouseX<127 && mouseY>9 && mouseY<28){
      gameState='start';
    }
  }
  
  if (gameState=='lose'){
    if(mouseX>210 && mouseX<400 && mouseY>105 && mouseY<125){
      gameState='start';
      amySize3=50
    }
  }
  
  if (gameState=='win'){
    if(mouseX>15 && mouseX<127 && mouseY>9 && mouseY<28){
      gameState='start';
    }
  }
}



function keyPressed(){
if(keyCode == LEFT_ARROW){
left_key_pressed = true;  
}  
if(keyCode == UP_ARROW){
up_key_pressed = true;  
}  
if(keyCode == RIGHT_ARROW){
right_key_pressed = true;  
}  
if(keyCode == DOWN_ARROW){
down_key_pressed = true;  
	}  
}
function keyReleased(){
if(keyCode == LEFT_ARROW){
left_key_pressed = false;  
}  
if(keyCode == UP_ARROW){
up_key_pressed = false;  
}  
if(keyCode == RIGHT_ARROW){
right_key_pressed = false;  
}  
if(keyCode == DOWN_ARROW){
down_key_pressed = false;  
	}  
}


function moveAmy(){
  if(left_key_pressed){
   amyX = amyX - 5;
	}
  if(up_key_pressed){
   amyY = amyY - 5;
	}
  if(right_key_pressed){
   amyX = amyX + 5;
	}
  if(down_key_pressed){
   amyY = amyY + 5;
	}
  
  if (amyX > width) 
  {amyX = width;}
  if (amyX < 0)  
  {amyX = 0;}
  if (amyY > height) 
  {amyY = height;}
  if (amyY < 0)  
  {amyY = 0;}
}



function drawCharacter(xPositionIn,yPositionIn,sizeIn,leftwingAngle,rightwingAngle){
// control size and movement of the entire character
  let size = sizeIn;
  let xPosition = xPositionIn;
  let yPosition = yPositionIn;
  
// head of the character
   ellipseMode(CENTER)
   fill(255, 204, 0); 
   stroke(255, 204, 0); 
   ellipse(xPosition, yPosition, size, size*180/200);
  
// body of the character
   ellipse(xPosition, yPosition+size*100/200, size*0.75, size*0.675);
   noFill();
   noStroke();
 
// the legs of the character (orange part)
   fill(255, 140, 26);
   rectMode(CENTER);
   rect(xPosition-size*15.5/200, yPosition+size*187.5/200,       
   size*0.04, size*0.075); // left
   rect(xPosition+size*15/200, yPosition+size*187.5/200, size*0.04, 
   size*0.075); // right
   noFill()
  
// the legs of the character (yellow part)
   fill(255, 204, 0);
   stroke(255, 204, 0);
   rectMode(CENTER);
   rect(xPosition-size*15/200, yPosition+size*170/200, size*0.1, 
   size*0.15, 20);
   rect(xPosition+size*15/200, yPosition+size*170/200, size*0.1, 
   size*0.15, 20);
   noFill();
   noStroke();
  
// the feet of the character (orange)
   fill(255, 128, 0);
   arc(xPosition-size*15/200, yPosition+size*206/200, size*0.2, 
   size*0.14, 180, 0, CHORD);
   arc(xPosition+size*15/200, yPosition+size*206/200, size*0.2, 
   size*0.14, 180, 0, CHORD);
   noFill();
   noStroke();
  
// the eyes of the character (black part)
   stroke(83, 83, 83);
   fill(83, 83, 83);
   ellipse(xPosition-size*50/200, yPosition-size*10/200, size*0.17);    // left
   ellipse(xPosition+size*50/200, yPosition-size*10/200, size*0.17);    // right
   noFill();
   noStroke();
  
// the eyes of the character (white part)
   stroke(250);
   fill(250);
   ellipse(xPosition-size*53/200, yPosition-size*14/200, 
   size*0.085); // left biggest
   ellipse(xPosition+size*47/200, yPosition-size*14/200, 
   size*0.085); // right biggest
   ellipse(xPosition-size*44/200, yPosition-size*14/200, 
   size*0.035); // left eye,upper small
   ellipse(xPosition+size*56/200, yPosition-size*14/200,   
   size*0.035); // right eye,upper small 
   ellipse(xPosition-size*45/200, yPosition-size*3/200, size*0.03);    // left eye, lower small 
   ellipse(xPosition+size*55/200, yPosition-size*3/200, size*0.03);    // right eye, lower small 
   noFill();
   noStroke();
  
// mouth of the character
   fill(255, 128, 0);
   triangle(xPosition-size*14/200, yPosition-size*5/200, 
            xPosition+size*14/200, yPosition-size*5/200, 
            xPosition,             yPosition+size*28/200);
   noFill();
   noStroke();
  
// cheeks of the character
   fill(252, 156, 188);
   ellipse(xPosition-size*50/200, yPosition+size*25/200, size*0.09, 
   size*0.075); // left
   ellipse(xPosition+size*50/200, yPosition+size*25/200, size*0.09, 
   size*0.075); // right
  
// wings of the character
   ellipseMode(CORNER)
   fill(255, 153, 0);
  //ellipse(xPosition-size*78/200, yPosition+size*69/200, size*0.125, size*0.375); // left
   translate(xPosition-size*78/200, yPosition+size*69/200);
   rotate(leftwingAngle);
   ellipse(0,-3,size*0.125, size*0.375);
   resetMatrix();
  //ellipse(xPosition+size*52/200, yPosition+size*69/200, size*0.125, size*0.375); // right
   translate(xPosition+size*52/200, yPosition+size*69/200);
   rotate(rightwingAngle);
   ellipse(2,0,size*0.125, size*0.375);
   resetMatrix();
   noFill();
   noStroke();
}