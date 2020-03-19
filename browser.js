require('fastclick')(document.body);

var assign = require('object-assign');
var createConfig = require('./config');
var createRenderer = require('./lib/createRenderer');
var createLoop = require('raf-loop');
var contrast = require('wcag-contrast');

var canvas = document.querySelector('#brusheCanvas');
var background = new window.Image();
var context = canvas.getContext('2d');

var loop = createLoop();
var seedContainer = document.querySelector('.seed-container');
var seedText = document.querySelector('.seed-text');
window.addEventListener('resize', resize);
document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
var randomize = (ev) => {
  if (ev) ev.preventDefault();
  reload(createConfig());
};
randomize();
resize();

const addEvents = (element) => {
  element.addEventListener('mousedown', (ev) => {
    if (ev.button === 0) {
//       randomize(ev); THIS STARTS A NEW PAINTING
      randomize(ev); 
    }
  });
  element.addEventListener('touchstart', randomize);
};

function reload (config) {
  loop.removeAllListeners('tick');
  loop.stop();

  var opts = assign({
    backgroundImage: background,
    context: context
  }, config);
  var pixelRatio = typeof opts.pixelRatio === 'number' ? opts.pixelRatio : 1;
  canvas.width = opts.width * pixelRatio;
  canvas.height = opts.height * pixelRatio;

  seedText.textContent = opts.seedName;

  background.onload = () => {
    var renderer = createRenderer(opts);

    if (opts.debugLuma) {
      renderer.debugLuma();
    } else {
      renderer.clear();
      var stepCount = 0;
      loop.on('tick', () => {
        renderer.step(opts.interval);
        stepCount++;
        if (!opts.endlessBrowser && stepCount > opts.steps) {
          loop.stop();
        }
      });
      loop.start();
    }
  };

  background.src = config.backgroundSrc;
}

function resize () {
  letterbox(canvas, [ window.innerWidth, window.innerHeight ]);
}


function letterbox (element, parent) {
  var aspect = element.width / element.height;
  var pwidth = parent[0]*.85;
  var pheight = parent[1];

  var width = pwidth;
  var height = Math.round(width / aspect);
  var y = Math.floor(pheight - height) / 2;

  element.style.top = y + 'px';
  element.style.width = width + 'px';
  element.style.height = height + 'px';
}
