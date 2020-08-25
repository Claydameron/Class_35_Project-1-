//edited
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var feedButton, addButton;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500,500);

  database = firebase.database();
  
  dog = createSprite(250,226,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.25;

  foodstock = database.ref("Food");
  foodstock.on("value",readStock);

  feedButton = createButton("Feed Drago");
  feedButton.position(580,65);

  addButton = createButton("Add food");
  addButton.position(675,65);
  
  
}


function draw() {  
  background("lightBlue");

 /* fill("black");
stroke("black");
if (foodS <= 10) {
  stroke("red");
  fill("red");
text("Food remaining : "+foodS,195,450);
} else {
stroke("black");
fill("black");
text("Food remaining : "+foodS,195,450);
}
fill("black");
stroke("black");
textSize(13);
text("Note: Press the UP ARROW Key To Feed Drago Milk!",115,10,300,20);
*/




  

  drawSprites();
  

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0) {
    x = 0;
  } else{x--}
  database.ref("/").update({Food: x});

  
}

function keyPressed() {
  if(keyCode === UP_ARROW) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
}

