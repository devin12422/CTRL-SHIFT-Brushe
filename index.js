var open = 0;

function moreOpening() {
  open += 1;
  if(open % 2 == 0) {
    var i;
    for(i = 0; i < document.getElementsByClassName("extendedNav").length; i++) {
      var iWidth = i * 48 * -1;
      document.getElementsByClassName("extendedNav")[i].style.display = "inline-flex";
      var translateString = 'translate(' + iWidth + 'px,0px)';
      document.getElementsByClassName("extendedNav")[i].style.opacity = 0;
      document.getElementsByClassName("extendedNav")[i].style.transform = translateString;
    }
    var displayNone = setTimeout(function() {
      for(i = 0; i < document.getElementsByClassName("extendedNav").length; i++) {
        document.getElementsByClassName("extendedNav")[i].style.display = "none";
        document.getElementById("nav").style.width = "3.4vw";
        console.log("dsgfd");
      }
    }, 500);
  } else {
    clearTimeout(displayNone);
    var i;
    document.getElementById("nav").style.width = "22.4vw";
    for(i = 0; i < document.getElementsByClassName("extendedNav").length; i++) {
      document.getElementsByClassName("extendedNav")[i].style.display = "inline-flex";
      document.getElementsByClassName("extendedNav")[i].style.opacity = 1;
      document.getElementsByClassName("extendedNav")[i].style.transform = 'translate(0px,0px)';
    }
  }
}
(function() {
  if(document.location.pathname == "/html/home.html") {
    "use strict";
    var cvs, ctx;
    var nodes = 9;
    var waves = [];
    var waveHeight = 90;
    var colours = ["#6B2737", "#EDAE49", "#EC4E20"];

    function init() {
      cvs = document.getElementById("waves");
      ctx = cvs.getContext("2d");
      for(var i = 0; i < 3; i++) {
        waves.push(new wave(colours[i], 1, nodes));
      }
      update();
    }

    function update() {
      ctx.fillStyle = "#85D8CE";
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, cvs.width, cvs.height);
      ctx.globalCompositeOperation = "screen";
      for(var i = 0; i < waves.length; i++) {
        for(var j = 0; j < waves[i].nodes.length; j++) {
          bounce(waves[i].nodes[j]);
        }
        drawWave(waves[i]);
      }
      //     ctx.fillStyle = fill;
      requestAnimationFrame(update);
    }

    function wave(colour, lambda, nodes) {
      this.colour = colour;
      this.lambda = lambda;
      this.nodes = [];
      var tick = 1;
      for(var i = 0; i <= nodes + 2; i++) {
        var temp = [(i - 1) * cvs.width / nodes, 0, Math.random() * 200, .3];
        this.nodes.push(temp);
      }
      console.log(this.nodes);
    }

    function bounce(nodeArr) {
      nodeArr[1] = waveHeight / 2 * Math.sin(nodeArr[2] / 20) + cvs.height / 2;
      nodeArr[2] = nodeArr[2] + nodeArr[3];
    }

    function drawWave(obj) {
      var diff = function(a, b) {
        return(b - a) / 2 + a;
      }
      ctx.fillStyle = obj.colour;
      ctx.beginPath();
      ctx.moveTo(0, cvs.height);
      ctx.lineTo(obj.nodes[0][0], obj.nodes[0][1]);
      for(var i = 0; i < obj.nodes.length; i++) {
        if(obj.nodes[i + 1]) {
          ctx.quadraticCurveTo(obj.nodes[i][0], obj.nodes[i][1], diff(obj.nodes[i][0], obj.nodes[i + 1][0]), diff(obj.nodes[i][1], obj.nodes[i + 1][1]));
        } else {
          ctx.lineTo(obj.nodes[i][0], obj.nodes[i][1]);
          ctx.lineTo(cvs.width, cvs.height);
        }
      }
      ctx.closePath();
      ctx.fill();
    }

    function drawNodes(array) {
      ctx.strokeStyle = "#888";
      for(var i = 0; i < array.length; i++) {
        ctx.beginPath();
        ctx.arc(array[i][0], array[i][1], 4, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      }
    }

    function drawLine(array) {
      ctx.strokeStyle = "#888";
      for(var i = 0; i < array.length; i++) {
        if(array[i + 1]) {
          ctx.lineTo(array[i + 1][0], array[i + 1][1]);
        }
      }
      ctx.stroke();
    }
    document.addEventListener("DOMContentLoaded", init, false);
  }
})();
var slideIndex = 1;
carousel();
document.onload

function carousel(n) {
  var x = document.getElementsByClassName("afterSlide");
  var y = document.getElementsByClassName("beforeSlide");
  if(x[slideIndex - 1] != null) {
    var i;
    for(i = 0; i < x.length; i++) {
      x[i].style.display = "none";
      y[i].style.display = "none";
    }
    slideIndex += n;
    if(slideIndex < 1) {
      slideIndex = x.length;
    }
    if(slideIndex > x.length) {
      slideIndex = 1
    }
    x[slideIndex - 1].style.display = "block";
    y[slideIndex - 1].style.display = "block";
  }
}