//edited
var dog, dogImg, happyDogImg, database, foodS, foodStock;
var feedButton, addButton;
var foodObj, fedTime, lastFed;
var washroomDog, bedroomDog, gardenDog;
var gameState;
var currentTime;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  washroomDog = loadImage("Wash Room.png");
  bedroomDog = loadImage("Bed Room.png");
  gardenDog = loadImage("Garden.png");

}

function setup() {
  createCanvas(430,430);

  database = firebase.database();
  
  dog = createSprite(215, 320, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.20;

  foodstock = database.ref("Food");
  foodstock.on("value",readStock);

  feedButton = createButton("Feed Drago");
  feedButton.position(680,110);
  feedButton.hide();

  addButton = createButton("Add food");
  addButton.position(775,110);
  addButton.hide();

  foodObj = new Food(1000,1000);

  feedButton.mousePressed(feedDog);
  addButton.mousePressed(addFood);

  gameState = "Hungry"

  currentTime = hour()
  
  
}


function draw() {  

  if(gameState === "Hungry") {
  background("lightBlue");

foodObj.display();
  

  drawSprites();

  fill(255,255,254);
  textSize(15);
  var ref = database.ref("fedTime");
  ref.on("value",function(data) {
    lastFed = data.val();
  })
  if(lastFed >= 12) {
    text("Last fed at: " + lastFed % 12 + " pm", 10,25);
  } else if(lastFed == 0) {
    text("Last fed at: 12 AM",50,30);
  } else{
    text("Last fed at: " + lastFed + " am", 10,25);
  }
  
  console.log(currentTime)

  if(currentTime === lastFed + 1) {
    GardenState();
  }

  if(currentTime === (lastFed + 2) && currentTime > (lastFed + 4) || currentTime > (lastFed + 2) && currentTime > (lastFed + 4)) {
    WashroomState();
  }

}

if(gameState === "Garden") {
  background("black")
}

if(gameState === "Bathing") {
  background("black")
}

}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    fedTime: hour()
  })
}

function addFood() {
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

function GardenState() {
    gameState = "Garden"
}

function WashroomState() {
  gameState = "Bathing"
}



