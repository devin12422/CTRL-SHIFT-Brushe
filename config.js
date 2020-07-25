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
  return {
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),
    noiseScalar: [random(0.000001, 0.000001), random(0.0002, 0.004)],
    globalAlpha: 0.5,
    startArea: random(0.5, 2.0),
    maxRadius: random(5, 40),
    lineStyle: random(1) > 0.5 ? 'round' : 'square',
    interval: random(0.001, 0.01),
    count: Math.floor(random(500, 5000)),
    steps: Math.floor(random(200, 800)),
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
        for (var i = 0; i < colors.length; i++) {
          var inputColor = colors[i].value;
          newPalette.push(inputColor);  
        }
    return newPalette;
  }
  function getValues(){
    
  }
};