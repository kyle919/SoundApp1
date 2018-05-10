XnumCirc=7;
YnumCirc=9;
XborderFactor = 4;
YborderFactor = XborderFactor+2;
MaxRad=50;
Row1Counter=0;
colSpace = 0;
var rowDraw;
var bg;
var play = 'Play';
var isOverCircle;


function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function setup() {
  song = loadSound('It G Ma - Medasin Remix (Cut).mp3',loaded);
  //volumeSlider = createSlider(0,1,0.5,0.01);
  //volumeSlider.position(25, 86);
  amp = new p5.Amplitude();
  fft = new p5.FFT([0.8],[64]);
  bg = loadImage("670ae372.jpg");
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  stroke(200);
  background(bg);
}

function loaded(){
  console.log("Song loaded");
  //jumpButton = createButton("Jump");
  //jumpButton.mousePressed(jumpSong);
  //jumpButton.position(windowWidth/2-windowWidth/3.5, 20);
  //volumeSlider = createSlider(0,1,0.5,0.01);
  //volumeSlider.position(windowWidth/2-windowWidth/4, 20);
}

function draw() {
  background(bg);
  stroke(200);
  noFill();
  //song.setVolume(volumeSlider.value());
  song.setVolume(0.8);
  var vol = amp.getLevel();
  var diam = map(vol,0,0.8,10,200);
  var spectrum = fft.analyze();


  borderSpaceWidth = windowWidth/XborderFactor;
  circleSpaceWidth = windowWidth-borderSpaceWidth;
  borderSpaceHeight = windowHeight/YborderFactor;
  circleSpaceHeight = windowHeight-borderSpaceHeight;
  circCanvasX= 0+borderSpaceWidth/4;
  circCanvasY= 0+borderSpaceHeight/2;


  getMaxRad();
  //rect(circCanvasX,circCanvasY,circleSpaceWidth+borderSpaceWidth/2,circleSpaceHeight);
  YcircStart=circCanvasY+MaxRad*2;
  XcircSTart=circCanvasX+MaxRad;

  textSize(15);
  fill(255);
  textAlign(LEFT);
  text('Song: IT G MA Remix (josh pan Opus)',windowWidth*(3/4),windowHeight-circCanvasY/2);
  text('Artist: Keith Ape',windowWidth*(3/4),windowHeight-circCanvasY/7);
  //text('Artist: Keith Ape',windowWidth*(3/4.5),circCanvasY+circCanvasY/2);

  noFill();
  stroke(255);
  rect(windowWidth*(1/2)-windowWidth/16,circCanvasY-windowHeight/18,windowWidth/8,windowHeight/4);

  if (mouseX >= windowWidth*(1/2)-windowWidth/16 && mouseX <= windowWidth*(1/2)-windowWidth/16+windowWidth/8 && mouseY >= circCanvasY-windowHeight/18 && mouseY <= circCanvasY-windowHeight/18+windowHeight/4)
   {
     isOverRectangle = true;
   } else {
     isOverRectangle = false;
   }

   if(isOverRectangle == true)
 {
   fill(100);
   cursor(HAND);
 } else {
 fill(200);
 cursor(ARROW);
 }

    // textSize(30);
    // textAlign(CENTER);
    // playWidth = textWidth(play);
    // text(play,windowWidth*(1/2)-playWidth/2.6,circCanvasY,50,50);

  rowDraw = 0;
  fill(255);
  for(i=0; i<YnumCirc; i++){
    for(j=0; j<XnumCirc; j++){
      fill(255);
      noStroke();
      ellipse(XcircSTart+Row1Counter,YcircStart+colSpace,map(spectrum[i+rowDraw],0,255,10,MaxRad*2),map(spectrum[i+rowDraw],0,255,10,MaxRad*2));
      Row1Counter=Row1Counter+spacing;

    }

    //Reset X spacing for next draw
    Row1Counter=0;
    colSpace=colSpace+spacing;
      rowDraw = rowDraw+7;
  }
//Reset Y spacing for next draw
  colSpace=0;



  var vol = amp.getLevel();
  ellipse(windowWidth*(3/3.85),windowHeight/2,map(vol, 0, 0.8, 30, MaxRad*10),map(vol, 0, 0.8, 30, MaxRad*10));

}
  function getMaxRad(){
    //height of window will be deciding dimention
    if(windowHeight<windowWidth){
      diamSize=circleSpaceHeight/YnumCirc;
      MaxRad = diamSize/2;
      spacing = MaxRad*2;
    }else {
      diamSize=circleSpaceWidth/XnumCirc;
      MaxRad = diamSize/2;
      spacing = MaxRad*2;
    }
  }

  function mousePressed(){
    if(isOverRectangle == true && !song.isPlaying()){
      song.play();
      play='Pause';
      textSize(30);
      textAlign(CENTER);
      playWidth = textWidth(play);
      text(play,windowWidth*(1/2)-playWidth/2.6,circCanvasY,50,50);
    } else if(isOverRectangle == true && song.isPlaying()){
      song.pause();
      play='Play';
      textSize(30);
      textAlign(CENTER);
      playWidth = textWidth(play);
      text(play,windowWidth*(1/2)-playWidth/2.6,circCanvasY,50,50);
    }
  }

function jumpSong(){
  var length = song.duration();
  song.jump(song.currentTime()+length/16);
}
