require('fastclick')(document.body);
var assign = require('object-assign');
var createConfig = require('./config'); // grabbing the config
var createRenderer = require('./lib/createRenderer'); //grabbing the renderer
var contrast = require('wcag-contrast'); //Produces WCAG contrast ratio
var createLoop = require('raf-loop'); //High performance render loop for animations and renders and such
var loop = createLoop();
var canvas = document.querySelector('#brusheCanvas'); // grabbing canvas to draw on
var context = canvas.getContext('2d');
var background = new window.Image();
var imageSrc;
document.body.style.margin = '0';
var randomize = (ev) => {
    if(ev) ev.preventDefault();
    reload(createConfig());
};
randomize();

function submitBrushe(event) {
    randomize(event);
}

function change(event) {
    //file upload code from stackoverflow
    const file = document.querySelector('#file').files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
        imageSrc = reader.result;
    }, false);
    if(file) {
        reader.readAsDataURL(file);
    }
}

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

function hueChange(event) {
    document.getElementById("HSLpreview").style.backgroundColor = hslToHex(document.getElementById("colorHueSlider").value, document.getElementById("colorSatSlider").value, document.getElementById("colorLightSlider").value);
}
document.getElementById('brusheForm').addEventListener('submit', submitBrushe);
document.querySelector('#file').addEventListener('change', change);
document.querySelector('#colorHueSlider').addEventListener('change', hueChange);
document.querySelector('#colorSatSlider').addEventListener('change', hueChange);
document.querySelector('#colorLightSlider').addEventListener('change', hueChange);

function reload(config) {
    console.log(config);
    loop.removeAllListeners('tick');
    loop.stop();
    var opts = assign({
        backgroundImage: background,
        context: context
    }, config);
    canvas.width = 2560;
    canvas.height = 1440;
    background.onload = () => {
        var renderer = createRenderer(opts);
        renderer.clear();
        var stepCount = 0;
        loop.on('tick', () => {
            renderer.step(0.0000001);
            stepCount++;
            if(stepCount > opts.steps) {
                loop.stop();
            }
        });
        loop.start();
    };
    if(imageSrc != null) {
        background.src = imageSrc;
    } else {
        background.src = config.backgroundSrc;
    }
}