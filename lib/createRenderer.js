var newArray = require('new-array');
var lerp = require('lerp');
var clamp = require('clamp');
var randomRange = require('./random-range');
var vec2 = require('gl-vec2');
var SimplexNoise = require('simplex-noise');
var getLumaPixels = require('./getLumaPixels');
module.exports = function createRenderer(opt) {
    opt = opt || {};
    var randFunc = opt.random || Math.random;
    var random = randomRange(randFunc);
    var simplex = new SimplexNoise(randFunc);
    var ctx = opt.context;
    var canvas = ctx.canvas;
    var width = canvas.width;
    var height = canvas.height;
    var count = 10000;
    var palette = opt.palette;
    var backgroundImage = opt.backgroundImage;
//     var pointilism = lerp(0.000001, 0.5, 0.06987586950510738);
    var noiseScalar = [0.000001, 0.001397]; //random(0.0002, 0.004)];
    var globalAlpha = typeof opt.globalAlpha === 'number' ? opt.globalAlpha : 1;
    var heightMapImage = getLumaPixels(ctx, backgroundImage, {
        fillStyle: opt.backgroundFill
    });
    var heightMap = heightMapImage.data;
    var time = 0;
    var particles = newArray(count).map(() => resetParticle());
    return {
        clear: clear,
        step: step,
    };

    function clear() {
        ctx.fillStyle = palette[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function step(dt) {
        time += dt;
        particles.forEach((p, i) => {
            var x = p.position[0];
            var y = p.position[1];
            var fx = clamp(Math.round(x), 0, canvas.width - 1);
            var fy = clamp(Math.round(y), 0, canvas.height - 1);
            var heightIndex = fx + (fy * canvas.width);
            var heightValue = heightMap[heightIndex * 4] / 255;
            var pS = lerp(noiseScalar[0], noiseScalar[1], heightValue);
            var n = simplex.noise3D(fx * pS, fy * pS, p.duration + time);
            var angle = n * Math.PI * 2;
            var speed = p.speed + lerp(0.0, 2, 1 - heightValue);
            vec2.add(p.velocity, p.velocity, [Math.cos(angle), Math.sin(angle)]);
            vec2.normalize(p.velocity, p.velocity);
            var move = vec2.scale([], p.velocity, speed);
            vec2.add(p.position, p.position, move);
            var s2 = lerp(0.000001, 0.5, 0.06987586950510738);
            var r = p.radius * simplex.noise3D(x * s2, y * s2, p.duration + time);
            r *= lerp(0.01, 1.0, heightValue);
            ctx.beginPath();
            ctx.lineTo(x, y);
            ctx.lineTo(p.position[0], p.position[1]);
            ctx.lineWidth = r * (p.time / p.duration);
            ctx.lineCap = random(1) > 0.5 ? 'round' : 'square';
            ctx.lineJoin = random(1) > 0.5 ? 'round' : 'square';
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = globalAlpha;
            ctx.stroke();
            p.time += dt;
            if(p.time > p.duration) {
                resetParticle(p);
            }
        });
    }

    function resetParticle(p) {
        p = p || {};
        var scale = Math.min(width, height) / 2;
        p.position = randomSphere([], random(0, scale * 1.7));
        p.position[0] += width / 2;
        p.position[1] += height / 2;
        p.radius = random(0.01, 5);
        p.duration = random(1, 500);
        p.time = random(0, p.duration);
        p.velocity = [random(-1, 1), random(-1, 1)];
        p.speed = random(0.5, 2);
        p.color = palette[Math.floor(random(palette.length))];
        return p;
    }

    function randomSphere(out, scale) {
        scale = scale || 1.0;
        var r = randFunc() * 2.0 * Math.PI;
        out[0] = Math.cos(r) * scale;
        out[1] = Math.sin(r) * scale;
        return out;
    }
};