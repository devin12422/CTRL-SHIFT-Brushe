var seedRandom = require('seed-random');
var createRandomRange = require('./lib/random-range');
var imageBase;
var mapSrc = 'images/CBK.png';
module.exports = function(seed) {
  if(typeof seed === 'undefined') {
    seed = String(Math.floor(Math.random() * 1000000));
    //random number used to seed the randomness for the drawing
  }
  console.log('Seed:', seed);
  var randomFunc = seedRandom(seed);
  var random = createRandomRange(randomFunc);
  var valuesArray = getValues();
  return {
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),//unsure
    noiseScalar: [0.0000001, valuesArray[1]],//essentially the detail level
    globalAlpha: 0.5,
    startArea: valuesArray[0], //the spread of the start of the lines
    maxRadius: valuesArray[3], // the largest the thickness of the lines / dots can be
    lineStyle: 'square',
    interval: random(0.001, 0.01),//the time in between each call of the render function
    count: valuesArray[2], //number of lines
    steps: Math.floor(random(200, 800)), //how many times the render function is called
    endlessBrowser: false,
    debugLuma: false,
    backgroundScale: 1,
    backgroundSrc: mapSrc,
    pixelRatio: 1,
    width: 1280 * 2,
    height: 720 * 2,
    palette: getColors(),
    asVideoFrames: false,
    filename: 'render',
    outputDir: 'output'
  };

  function getColors() {
    var newPalette = [];
    var colors = document.getElementsByClassName("rendererColors");
    for(var i = 0; i < colors.length; i++) {
      var inputColor = colors[i].value;
      newPalette.push(inputColor);
    }
    return newPalette;
  }

  function getValues() {
    //sending the values of the slider to the catalouge of values
    var newValueArray = [];
    newValueArray.push(document.getElementById("startArea").value);
    newValueArray.push(document.getElementById("scale").value);
    newValueArray.push(document.getElementById("count").value);
    newValueArray.push(document.getElementById("brushSize").value);
    console.log(newValueArray);
    return newValueArray;
  }
};