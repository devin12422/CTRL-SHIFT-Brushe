var seedRandom = require('seed-random');
var createRandomRange = require('./lib/random-range');
var mapSrc = 'images/cbk.jpg';
module.exports = function(seed) {
    if(typeof seed === 'undefined') {
        seed = String(Math.floor(Math.random() * 1000000));
        //random number used to seed the randomness for the drawing
    }
    console.log('Seed:', seed);
    var randomFunc = seedRandom(seed);
    var random = createRandomRange(randomFunc);
    return {
        random: randomFunc,
        seedName: seed,
        globalAlpha: 0.5,
        //         pointilism:0.06987586950510738,// random(0.0698, 0.06995),
        interval: 0.0, //the time in between each call of the render function
        steps: 10000,
        backgroundSrc: mapSrc,
        palette: getColors()
    };

    function hslToHex(h, s, l) {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = n => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function getColors() {
        var newPalette = [];
        var color = document.getElementById("backgroundColor");
        //         for(var i = 0; i < colors.length; i++) {
        newPalette.push(color.value, hslToHex(document.getElementById("colorHueSlider").value, document.getElementById("colorSatSlider").value, document.getElementById("colorLightSlider").value));
        //         console.log(inputColor);
        //         }
        return newPalette;
    }
};