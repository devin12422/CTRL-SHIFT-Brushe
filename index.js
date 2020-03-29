var open = 0;

function moreOpening() {
  open += 1;
  if(open % 2 == 0) {
    document.getElementById("nav").style.height = "5vh";
    document.getElementById("nav").style.width = "20vw";
    document.getElementById("nav").style.gridTemplateRows = "auto";
    document.getElementById("nav").style.gridTemplateColumns = "auto auto auto";
    document.getElementById("nav").style.textAlign = "center";
    //     document.getElementsByClassName("extendedNav navBlock").style.display = "none";
    document.getElementsByClassName('extendedNav')[1].style.display = "none";
    document.getElementsByClassName('extendedNav')[0].style.display = "none";
    document.getElementsByClassName('extendedNav')[2].style.display = "none";
  } else {
    document.getElementById("nav").style.height = "90vh";
    document.getElementById("nav").style.width = "8vw";
    document.getElementById("nav").style.textAlign = "left";
    document.getElementById("nav").style.gridTemplateRows = "10% 10% 10% 10% 10% 10% 10% 10% 10% 10%";
    document.getElementById("nav").style.gridTemplateColumns = "auto";
    document.getElementsByClassName('extendedNav')[1].style.display = "initial";
    document.getElementsByClassName('extendedNav')[0].style.display = "initial";
    document.getElementsByClassName('extendedNav')[2].style.display = "initial";
  }
  //   alert("oogabooga");
}
(function() {
  "use strict";
  var cvs, ctx;
  var nodes = 9;
  var waves = [];
  var waveHeight = 90;
  var colours = ["#6B2737", "#EDAE49", "#EC4E20"];
  // Initiator function

  function init() {
    cvs = document.getElementById("canvas");
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
      console.log(temp);
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
})();