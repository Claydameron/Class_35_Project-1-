//edited
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var feedButton, addButton;
var foodObj, fedTime, lastFed;

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

  foodObj = new Food(200,200);

  feedButton.mousePressed(feedDog);
  addButton.mousePressed(addFood);

  
  
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

foodObj.display();
  

  drawSprites();

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12) {
    text("Last fed at: " + lastFed % 12 + "PM", 50,30);
  } else if(lastFed == 0) {
    text("Last fed at: 12 AM",50,30);
  } else{
    text("Last fed at: " + lastFed + "AM", 50,30);
  }
  

}
//function to read the foodStock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

/*function writeStock(x){
  if(x <= 0) {
    x = 0;
  } else{x--}
  database.ref("/").update({Food: x});

  
}*/
//function to update the foodStock and feedTime
function feedDog() {
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    feedTime: hour()
  })
}

//function to add food
function addFood() {
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

