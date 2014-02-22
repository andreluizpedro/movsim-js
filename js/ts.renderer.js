ts.namespace('ts.renderer');

(function (ns) {

    // private vars
    var canvas;
    var ctx;
    var images = ts.res.getImages();
    var backgroundImage;

    // public methods
    ns.init = function () {
        canvas = document.getElementById("tscanvas");
        ctx = canvas.getContext("2d");
        backgroundImage = images.luechow;
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

})(ts.renderer);
