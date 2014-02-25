movsim.namespace('movsim.renderer');

(function (ns) {

    // private vars
    var canvas;
    var ctx;
    var images = movsim.resources.getImages();
    var backgroundImage;

    // public methods
    ns.init = function () {
        canvas = document.getElementById("animation-canvas");
        ctx = canvas.getContext("2d");
        backgroundImage = images.bgRoundabout;
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
    };

    ns.drawBackground = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    ns.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    ns.drawVehicles = function () {

    };

    /*ns.getCanvas = function () {
     return canvas;
     };

     ns.getCtx = function () {
     return ctx;
     };*/

    return ns;

})(movsim.renderer);
