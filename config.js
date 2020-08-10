var seedRandom = require('seed-random');
var createRandomRange = require('./lib/random-range');
var imageBase;
var mapSrc = 'images/CBK.jpg';
module.exports = function(seed) {
  if(typeof seed === 'undefined') {
    seed = String(Math.floor(Math.random() * 1000000));
  }
  console.log('Seed:', seed);
  var randomFunc = seedRandom(seed);
  var random = createRandomRange(randomFunc);
  var valuesArray = getValues();
  return {
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),
    noiseScalar: [0.0000001,valuesArray[1]],
    globalAlpha: 0.5,
    startArea: valuesArray[0],
    maxRadius: valuesArray[3],
    lineStyle: 'round',
    interval: random(0.001, 0.01),
    count: valuesArray[2],//number of lines
    steps: Math.floor(random(200, 800)),//duration
    endlessBrowser: false,
    debugLuma: false,
    backgroundScale: valuesArray[4],
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
        for (var i = 0; i < colors.length; i++) {
          var inputColor = colors[i].value;
          newPalette.push(inputColor);  
        }
    return newPalette;
  }
  function getValues(){
    var newValueArray = [];
    newValueArray.push(document.getElementById("startArea").value);
    newValueArray.push(document.getElementById("scale").value);
    newValueArray.push(document.getElementById("count").value);
    newValueArray.push(document.getElementById("brushSize").value);
    newValueArray.push(document.getElementById("zoom").value);
    return newValueArray;
  }
};