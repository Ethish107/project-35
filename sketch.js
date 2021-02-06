//Create variables here
var dog;
var dogImg,happyDogImg;
var database,foodS,foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("Dog.png");
  happyDodImg = loadImage("happydog.png");
}

function setup() {

  database = firebase.database();


  createCanvas(500, 500);
  
  dog = createSprite(250,350);
  dog.addImage(dogImg,"img");
  dog.scale = 0.3;
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);


}


function draw() {  
   
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDodImg,"img");
  }

  console.log(foodS);

  drawSprites();

  fill(255);
  textSize(30);
  text("remaining food :" + foodS,120,220 );

  textSize(24);
  text("NOTE : press upArrow to feed the dog",70,100);

}

function writeStock(petMilk){
  if(petMilk <= 0){
    petMilk = 0;
  }else{
    petMilk = petMilk - 1;
  }

  database.ref('/').update({
    Food:petMilk
  })
}

function readStock(data){
  foodS = data.val();
}



