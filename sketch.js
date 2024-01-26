let data = {};             //variable to hold the JSON data
let players = [];          //array to store the JSON data
let opponents = [];        //array to store the JSON data
let sponsors = [];         //Array of sponsors
let playerPics = [];       //Array of the Player Pictures
let myImg;                 //Variable to build and store the Graphic
let smallImage;
let bgF;                   //Variable for the background Image
let whiteBG;
let sponsorsImage;          //Variable for the sponsors image
let sel;                   //Variable for the currently Selected Player
let tG = [];               //Array for the textGraphics
let badges = [];            //Array for the badge graphics
let pPpath, bGpath, tGpath;//Variables for the image paths.
let teamsX = 700;
let homeX = 183;
let awayX = 1008;
let homeY = 957;
let awayY = 957;
let townBadge, townBadgeLarge;
let badgeX = 600;
let unkownPlayer;
let fileString;
let tweetstring, playerString;
let hashtags;
let div;
let homeBadge, awayBadge;
let drawText = false;
let myTeamString = "S\u0162 HELENS" + "\n" + "TOWN A.F.C.";
let tellinsBlue;
let noSponsor;
let sponsString = "";

function preload() {

  /* LOAD FONTS */

  f_Black = loadFont("01_font/HoghtonRoad.ttf");
  f_Light = loadFont("01_font/HoghtonRoad.ttf");
  f_Semi = loadFont("01_font/HoghtonRoad.ttf");
  /*END LOAD FONTS *?


  /* Set the paths for the images */

  pPpath = "0playerPics/";
  bGpath = "img/";
  tGpath = "0tG_Images/";

  /*
  Import the JSON data;
  */

  let url = "data.json";
  data = loadJSON(url);

}

function setup() {
  div = createDiv(''); //Create element to contain the post's text
  div.id('textDiv');

  hashtags = "<br>@PDigitalLtd @thegriffininn #TellinsTown #StHelensTogether #StHelens #ExTerraLucem #nonleague";
  redCardIMG = loadImage("img/redCard.png");
  oops = loadImage("img/oops.png");
  townBadge = loadImage("0badges/town.png"); //Load town image
  tellinsBlue = color(0,0,135);

  /*Load The BG Images */
  bgF = loadImage(bGpath + "bg.png");
  whiteBG = loadImage(bGpath + "white_screen.png");
  sponsorsImage = loadImage(bGpath + "sponsors1.png");

  createCanvas(600, 600);                  //Make a smaller Canvas to display the image scaled down.
  myImg = createGraphics(1200, 1200);       //The image will be made at a higher resolution.
  smallImage = createGraphics(800, 800);
  noLoop();
  players = data.players;                   //Pass the JSON data into the players array
  opponents = data.opponents;
  //sponsors = data.sponsors;


  /*
  Populate a dropdown box for the player's names
  Add the player's images into the playerPics array
  The picture url is obtained from adding together the names in the player's data in the JSON.
  eg: - FirstName_Surname.png
  */

  sel = select('#playerSelect');  //Assigns the Dropbox to a variable

  for (i = 0; i < players.length; i++) {
    n = players[i].firstName + " " + players[i].surName; //USes the players array to combine the player's names
    sel.option(n, i); //Creates a new option in the Dropdown

    /* add images to the array */
    n = pPpath + players[i].playerImg;
    playerPics.push(loadImage(n));
  }

  /* Populate the Opposition Dropdownbox and Badge Array */

  opp = select('#opponents');

  for (i = 0; i < opponents.length; i++) {
    n = opponents[i].name;
    opp.option(n, i);
    console.log(opponents[i].badge);
    badges.push(loadImage(opponents[i].badge));
  }



  // /* LOAD TEXT GRAPHICS */
  // n = tGpath + "goal_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "red_card_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "own_goal_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "hat_trick_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "kick_off_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "half_time_0.png";
  // tG.push(loadImage(n));
  // n = tGpath + "full_time_0.png";
  // tG.push(loadImage(n));
  // /* END LOAD TEXT GRAPHICS */
}
//End of setup()

/* ----------------------------------------------- */


function makeImage() {

  /*
  This function is called when the MAKE IMAGE button is pressed.
  */

  //The Main Function

  div.html("");
  tweetstring = "";
  //Get opposition
  oT = opp.value();

  //Set Home and Away and load the badges
  //homeOrAway = select('#homeOrAway').value();

  var cb3 = document.getElementById("cb3");

  if(cb3.checked == true){
    homeOrAway = "a";
  } else {
    homeOrAway = "h";
  }

  if (homeOrAway == 'h') {
    homeTeam = myTeamString;
    awayTeam = opponents[oT].string;
    // townY = homeY - 10;
    // oppY = awayY - 10;
    homeBadge = townBadge;
    awayBadge = badges[oT];
  } else {
    awayTeam = myTeamString;
    homeTeam = opponents[oT].string;
    // oppY = awayY - 10;
    // townY = homeY - 10;
    awayBadge = townBadge;
    homeBadge = badges[oT];
  }


  background(tellinsBlue);  //Reset the Graphic

  doBG(myImg);      //Draw the background - currently just one image. No need for a function if it stays as is.

  //get selected player from the Dropdown box
  aP = sel.value();
  console.log(aP);

  /*

  See what action is wanted by checking the radio boxe

  */

  if (select('#goal:checked')) {
    tweetstring += "GOAL!<br>"
    fileString = "goal_";
    // myImg.imageMode(CENTER);
    // //myImg.image(tG[0], 600, 390);
    // myImg.imageMode(CORNER);
    myImg.fill(255);
    myImg.textSize(345);
    myImg.textAlign(RIGHT);
    myImg.textFont(f_Black);
    myImg.text("GOAL!", 1188, 280);

    /* Place the selected player's Image */
    drawPlayer(aP);
    drawPlayerName();
    drawScore();
    drawTime();
  };

  if (select('#hattrick:checked')) {
    tweetstring += "GOAL!<br>HAT-TRICK!<br>"
    fileString = "hattrick_";

    myImg.fill(255);

    myImg.textAlign(RIGHT);
    myImg.textFont(f_Black);
    myImg.textSize(290);
    myImg.text("GOAL!", 1188, 240);
    myImg.textSize(100);
    myImg.text("HAT-TRICK!", 1188, 320);

    /* Place the selected player's Image */

    drawPlayer(aP);
    drawPlayerName();
    drawScore();
    drawTime();
  };

  if (select('#penScored:checked')) {
    tweetstring += "GOAL!<br>PENALTY!<br>"
    fileString = "goal_";

    myImg.fill(255);

    myImg.textAlign(RIGHT);
    myImg.textFont(f_Black);
    myImg.textSize(290);
    myImg.text("GOAL!", 1188, 240);
    myImg.textSize(100);
    myImg.text("PENALTY!", 1188, 320);

    /* Place the selected player's Image */
   
    drawPlayer(aP);
    drawPlayerName();
    drawScore();
    drawTime();
  };

  if (select('#kickOff:checked')) {
    tweetstring += "KICK OFF!<br>"
    fileString = "KO_"+day()+month()+year();
    //drawBadge();
    myImg.fill(255);
    myImg.textAlign(CENTER);
    myImg.textFont(f_Black);
    myImg.textSize(345);
    myImg.textLeading(270);
    myImg.text("KICK\nOFF!", 600, 310);
    drawBox();
    drawScore();
    //drawPlayerName();

  };

  if (select('#halfTime:checked')) {
    tweetstring += "HALF TIME!<br>"
    fileString = "HT_"+day()+month()+year();
    //drawBadge();
    myImg.fill(255);
    myImg.textAlign(CENTER);
    myImg.textFont(f_Black);
    myImg.textSize(345);
    myImg.textLeading(270);
    myImg.text("HALF\nTIME", 600, 310);
    drawBox();
    drawScore();
    //drawPlayerName();
  };

  if (select('#fullTime:checked')) {
    tweetstring += "FULL TIME!<br>"
    fileString = "FT_"+day()+month()+year();
    myImg.fill(255);
    myImg.textAlign(CENTER);
    myImg.textFont(f_Black);
    myImg.textSize(345);
    myImg.textLeading(270);
    myImg.text("FULL\nTIME", 600, 310);
    drawBox();
    drawScore();
    //drawPlayerName();
  };

  if (select('#redCard:checked')) {
    fileString = "redCard_";
    
    myImg.fill(255);
    myImg.textSize(320);
    myImg.textAlign(RIGHT);
    myImg.textFont(f_Black);
    myImg.text("RED CARD!", 1188, 260);
    /* Place the selected player's Image */
    //drawPlayer(aP);
    myImg.image(redCardIMG, 230,200);
    drawBox();
    drawPlayerName("noSponsor");
    drawScore();
    drawTime();
  };

  if (select('#ownGoal:checked')) {
    tweetstring += "OWN GOAL!<br>"
    fileString = "owngoal_";
    
    myImg.fill(255);
    myImg.textSize(262);
    myImg.textAlign(RIGHT);
    myImg.textFont(f_Black);
    myImg.text("OWN GOAL!", 1188, 260);
    /* Place the selected player's Image */
    //drawPlayer(aP);
    myImg.image(oops, 50,200);
    drawBox();
    drawPlayerName("noSponsor");
    drawScore();
    drawTime();
  };



  /* Place the selected Action's Text Graphic /*
  doTextGraphic();



  /* DRAW THE TEAMS */


  myImg.imageMode(CENTER);
  myImg.image(homeBadge, 178, 798);
  myImg.image(awayBadge, 1008, 798);
  myImg.imageMode(CORNER);




  setTeamText();
  myImg.fill(tellinsBlue);
  match(homeTeam, "\n") ? hY = homeY: hY = homeY + 18;
  myImg.text(homeTeam, homeX, hY);
  match(awayTeam, "\n") ? aY = awayY : aY = awayY + 18;
  myImg.text(awayTeam, awayX, aY);

  /* ------------------------------------------------ */

  //Draw SCORE WENT HERE


  //if (select('#mog').value()!=""){
  if (drawText && select('#mog').value() != "") {
    //tweetstring += select('#mog').value() + " mins";
    tweetstring = select('#mog').value() + "' : " + tweetstring;
  }

  /*Draw the minutes */

  /* Display a small version of the final image on the page */

  image(myImg, 0, 0, width, height);

  tweetstring += hashtags;
  tweetstring = tweetstring.replace('\u0162', 'T');
  div.html(tweetstring, false);
  };
//end of makeImage()

function doBG(targetCanvas) {
  background(tellinsBlue);
  targetCanvas.image(bgF, 0, 0);
};
//end of doBG

function doTextGraphic() {

}
//end of doTextGraphic

function drawPlayer(n) {
  /**
  myImg.imageMode(CENTER);
  myImg.image(playerPics[n], 350,800);
  myImg.imageMode(CORNER);
  **/
  console.log("Player Image = ", players[n].playerImg);
  if (players[n].playerImg == "unknownPlayer.png") {
    myImg.imageMode(CENTER);
    myImg.blendMode(MULTIPLY);
    myImg.tint(40, 40, 255, 90);
    myImg.image(playerPics[n], 288, 344, 725, 644);
    myImg.imageMode(CORNER);
    myImg.tint(255, 255)
    myImg.blendMode(BLEND);
  } else {
    myImg.imageMode(CENTER);
    myImg.image(playerPics[n], 288, 344, 725, 644);
    myImg.imageMode(CORNER);
  };
  //Add the white box with the painty texture over the top of the player
  drawBox();
};


//end of drawPlayer

function drawBox() {
  myImg.blendMode(SCREEN);
  myImg.image(whiteBG, 0, 0);
  myImg.blendMode(BLEND);
  myImg.image(sponsorsImage, 0, 0);
}


function drawScore() {
  /* DRAW THE SCORE */
  homeScore = select('#homeS').value();
  awayScore = select('#awayS').value();
  myImg.fill(tellinsBlue);
  myImg.textAlign(CENTER);
  myImg.textSize(275);
  myImg.text(homeScore, 452, 900);
  myImg.text(awayScore, 737, 900);
  myImg.textSize(160);
  myImg.text("-", 600, 850);


  tweetstring += homeTeam.replace('\n', " ") + " " + homeScore + " v " + awayScore + " " + awayTeam.replace('\n', " ") + "<br>";

}


function setTeamText() {
  myImg.textFont(f_Semi);
  myImg.textSize(52);
  myImg.fill(tellinsBlue);
  myImg.textAlign(CENTER);
  myImg.textLeading(42);
}

function drawPlayerName(arg) {
  /* Draw the Player's Name */

  if (aP == 0) {
    PfN = select('#alt1').value();
    PsN = select('#alt2').value();
  } else {
    PfN = players[aP].firstName;
    PsN = players[aP].surName;
    

    if (players[aP].sponsor != "" && arg!="noSponsor"){
      myImg.textSize(30);
      myImg.fill(255);
      myImg.textAlign(LEFT);
      myImg.text("Sponsored by", 620, 575);
      let sponsSize = shrinkText(players[aP].sponsor, 68, 560);
      myImg.textSize(sponsSize);
      myImg.text(players[aP].sponsor, 620, 635);
      sponsString = players[aP].sponsor;
    };

  }

  fileString += PsN;
  playerString = PfN + " " + PsN;

  tweetstring += playerString;

  if (sponsString != "" && arg!="noSponsor"){

    if (players[aP].sponsTag) {
      sponsString = players[aP].sponsTag;
    } 
    
    tweetstring += " sponsored by " + sponsString;

  
  }
  
  sponsString = "";

  tweetstring +="<br>";

  myImg.fill(255, 255, 255);
  myImg.textAlign(LEFT);
  myImg.textSize(54);
  myImg.text(PfN, 620, 403);
  //surnameSize = 130;
  surnameSize = shrinkText(PsN, 130, 550);
  myImg.textSize(surnameSize);
  myImg.text(PsN, 620, 518);

  //console.log("Name: " + players[aP].firstName);
}

function drawTime() {
  drawText = true;
  if (select('#mog').value() == "") {
    return;
  }
  myImg.blendMode(BLEND);
  myImg.textFont(f_Black);
  myImg.textSize(58);
  myImg.fill(tellinsBlue);
  myImg.textAlign(CENTER);
  myImg.text(select('#mog').value(), 600, 999);
  myImg.textSize(24);
  myImg.text("mins", 600, 1016);

  fileString += "_" + select('#mog').value();

}

function drawBadge() {

  myImg.imageMode(CENTER);
  myImg.tint(255, 150);
  myImg.image(townBadgeLarge, 270, 820);
  myImg.imageMode(CORNER);
  myImg.tint(255, 255)

}

function saveImage() {
  smallImage.image(myImg, 0, 0, 800, 800);

  fileString += ".png";
  saveCanvas(smallImage, fileString);
}

function copyText() {
  let copyString = tweetstring.replace(/<br>/g, '\n');
  copyString = copyString.replace('\u0162', 'T');
  copyToClipboard(copyString);
};

function copyToClipboard(text) {
  var dummy = document.createElement("textarea");
  // to avoid breaking orgain page when copying more words
  // cant copy when adding below this code
  // dummy.style.display = 'none'
  document.body.appendChild(dummy);
  //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
  dummy.value = text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

function clearMyText(elementID) {
  var textBoxToClear = document.getElementById(elementID);
  textBoxToClear.value = "";
}

function resetPLAYERBOX() {
  var playerBox = document.getElementById("playerSelect");
  playerBox.value = 0;

}

function shrinkText(inString, infontSize, maxW){
  textFont(f_Black);
  var tempTextSize = infontSize;
  textSize(tempTextSize);
  myWidth = textWidth(inString);
  console.log(inString," = ", textWidth(inString));
  console.log("Text Size = ", tempTextSize);

  while (myWidth >= maxW) {
    tempTextSize -= 1;
    textSize(tempTextSize);
    myWidth = textWidth(inString);
  }
  console.log(inString," = ", textWidth(inString));
  console.log("Text Size = ", tempTextSize);
  return (tempTextSize);
}