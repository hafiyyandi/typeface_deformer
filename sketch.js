// only works with opentype fonts

let font;
let fontData_1;
let fontData_2;
let fontData_3;
let selectedFont;

var snapStrength = 50;
var snapDistance = 1000;
var snapX = 0;
var snapY = 0;

let sampleText1 = 'ABCDEFGHIJKLMN';
let sampleText2 = 'OPQRSTUVWXYZ abcdefghijlkm';
let sampleText3 = 'nopqrstuvwxyz';

function preload() {
  fontData_1 = loadBytes('LeagueGothic-Regular.otf');
  fontData_2 = loadBytes('Cinzel-Regular.otf');
  fontData_3 = loadBytes('ChopinScript.otf');
}

function modifyPath(p) {
  let newCommands = [];
  strength = snapStrength / 100;
  for (let cmd of p.commands) { 
    //console.log(cmd);
    //TAKEN FROM OPENTYPE.JS HOMEPAGE
    if (cmd.type !== 'Z') {
      cmd.x = snap(cmd.x + snapX, snapDistance, strength) - snapX;
      cmd.y = snap(cmd.y + snapY, snapDistance, strength) - snapY;
    }
  	if (cmd.type === 'Q' || cmd.type === 'C') {
    	cmd.x1 = snap(cmd.x1 + snapX, snapDistance, strength) - snapX;
      cmd.y1 = snap(cmd.y1 + snapY, snapDistance, strength) - snapY;
    }
    if (cmd.type === 'C') {
      cmd.x2 = snap(cmd.x2 + snapX, snapDistance, strength) - snapX;
      cmd.y2 = snap(cmd.y2 + snapY, snapDistance, strength) - snapY;
    }
    
    let newC = Object.assign({}, cmd);
    newCommands.push(newC);
  }
  let newPath = new opentype.Path();
  newPath.extend(newCommands);
  return newPath;
} 

let path;

function setup() {
	createCanvas(800, 400);
	renderText();
  noLoop();
}

function snap(v, distance, strength) {
    return (v * (1.0 - strength)) + (strength * Math.round(v / distance) * distance);
}

function renderText(){
  selectedFont = document.getElementById("fontselect").value;
  switch (selectedFont){
    case "leaguegothic" :
      font = opentype.parse(fontData_1.bytes.buffer);
      break;
      //font = font_1;
    case "cinzel" :
      font = opentype.parse(fontData_2.bytes.buffer);
      break;
      //font = font_2;
    case "chopinscript" :
      font = opentype.parse(fontData_3.bytes.buffer);
      //font = font_3;
      break;
  }
  background(255);

  console.log("modifying glyphs");
  for (let i = 0; i < font.glyphs.length; i++) {
  //for (let i = 0; i < 100; i++) {
    let glyph = font.glyphs.glyphs[i];
    glyph.path = modifyPath(glyph.path);
    // this is needed by getPath but is usually set when loading from a file...
    glyph.path.unitsPerEm = font.unitsPerEm;
    //console.log("glyph.path", glyph.path, glyph.path.commands, glyph.path.unitsPerEm);
    //console.log("getpath", glyph.getPath(0, 0, 72, {hinting: false}, font));
  }
  console.log("done");
  // set this to what you want the name of the font to be...
  font.names.fontFamily.en = 'Deformed Type';
  font.draw(drawingContext, sampleText1, 0, 100, 60);
  font.draw(drawingContext, sampleText2, 0, 200, 60);
  font.draw(drawingContext, sampleText3, 0, 300, 60);
  //font.download(); 
}

