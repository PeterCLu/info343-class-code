
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    navigator.getUserMedia = navigator.getUserMedia
                            || navigator.webkitGetUserMedia
                            || navigator.mozGetUserMedia
                            || navigator.msGetUserMedia

    var video = document.querySelector('video');
    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var videoStream;

    navigator.getUserMedia({video: true}, function(stream) {
        videoStream = stream;
        video.src = window.URL.createObjectURL(stream);
    }, function(err) {
        console.error(err);
    });

    video.addEventListener('click', function() {
        if (videoStream) {
            canvas.width = video.clientWidth;
            canvas.height = video.clientHeight;
            ctx.drawImage(video, 0, 0);
        }
    });


    var color = document.getElementById('line-color-inp').value;
    var width;

    var mouseDown = false;

    document.addEventListener('mousedown', function(evt) {
        mouseDown = true;
        ctx.beginPath();
        width = document.getElementById('line-width-inp').value;
    });

    document.addEventListener('mouseup', function(evt) {
        mouseDown = false;
    });

    document.addEventListener('mousemove', function(evt) {
        if (mouseDown) {
            ctx.lineTo(evt.clientX - canvas.offsetLeft, evt.clientY - canvas.offsetTop + window.scrollY);
            ctx.lineWidth = width;
            console.log(width);
            ctx.stroke();
        }
    });

    document.addEventListener('change', function(evt) {
        var color = document.getElementById('line-color-inp').value
        ctx.strokeStyle = color;
        console.log(color);
    });

    document.querySelector('#btnSnapshot').addEventListener('click', function() {
        document.querySelector('img').src = canvas.toDataURL();
    })


});

