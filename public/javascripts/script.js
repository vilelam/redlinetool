var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var canvas;
var context;
var originalImage;

function prepareCanvas() {

    originalImage = document.getElementById("image");
    canvas = document.getElementById("canvas");
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    context = canvas.getContext("2d");
    context.drawImage(originalImage, 0, 0);

    $('#canvas').mousedown(function(e) {

        console.log('chegou');
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });


    $('#canvas').mouseup(function(e) {
        paint = false;
    });

    $('#canvas').mouseleave(function(e) {
        paint = false;
    });

}

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {

    //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function clearCanvas() {
    context.clearRect(0, 0, originalImage.width, originalImage.height);
    context.drawImage(originalImage, 0, 0);
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
}


function saveCanvas() {

    var img = canvas.toDataURL("image/jpeg");
    var http = new XMLHttpRequest();
    var url = '/redline/saveImage';
    http.open('POST', url, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    };

    var imageLink = originalImage.src;

    var imageNameStartPosition = imageLink.lastIndexOf('/') + 1;

    var imageNameLastPosition = imageLink.length;

    var imageName = imageLink.substring(imageNameStartPosition, imageNameLastPosition);

    http.send(JSON.stringify({ 'image': img, 'imageName': imageName }));

}