module.exports = drawImageCover;
function drawImageCover (ctx, image) {
  var tAspect = image.width / image.height;
  var pWidth = ctx.canvas.width;
  var pHeight = ctx.canvas.height;
  var pAspect = pWidth / pHeight;
  var width, height;
  if (tAspect > pAspect) {
    height = pHeight;
    width = height * tAspect;
  } else {
    width = pWidth;
    height = width / tAspect;
  }
  var x = (pWidth - width) / 2;
  var y = (pHeight - height) / 2;
  ctx.drawImage(image, x, y, width, height);
}
