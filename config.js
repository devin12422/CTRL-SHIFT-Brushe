var seedRandom = require('seed-random');
var palettes = require('./lib/color-palettes.json');
var createRandomRange = require('./lib/random-range');
var imageBase;
var mapSrc = 'maps/architecture.jpg';
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
    backgorundFille: 'black',
    backgroundSrc: mapSrc,
    pixelRatio: 1,
    width: 1280 * 2,
    height: 720 * 2,
    palette: getPalette(),
    asVideoFrames: false,
    filename: 'render',
    outputDir: 'output'
  };

  function getPalette() {
    var paletteColors = palettes[Math.floor(random() * palettes.length)];
    return arrayShuffle(paletteColors);
  }

  function arrayShuffle(arr) {
    var rand;
    var tmp;
    var len = arr.length;
    var ret = arr.slice();
    while(len) {
      rand = Math.floor(random(1) * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }
    return ret;
  }
};