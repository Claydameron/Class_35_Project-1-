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
  createCanvas(430,430);

  database = firebase.database();
  
  dog = createSprite(215, 320, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.20;

  foodstock = database.ref("Food");
  foodstock.on("value",readStock);

  feedButton = createButton("Feed Drago");
  feedButton.position(680,110);

  addButton = createButton("Add food");
  addButton.position(775,110);

  foodObj = new Food(1000,1000);

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
    fedTime: hour()
  })
}

//function to add food
function addFood() {
  foodS++;
  database.ref("/").update({
    Food: foodS
  })
}

