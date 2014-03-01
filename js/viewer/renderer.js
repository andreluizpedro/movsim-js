movsim.namespace('movsim.renderer');

(function (ns) {

    // private vars
    var canvas;
    var ctx;
    var images = movsim.resources.getImages();
    var backgroundImage;
    var roadNetwork;
    var car;
    var truck;

    // public methods
    ns.init = function (network) {
        roadNetwork = network;
        canvas = document.getElementById("animation-canvas");
        ctx = canvas.getContext("2d");
        backgroundImage = images.bgRoundabout;
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
        car = images.car1;
        truck = images.car2;
    };

    ns.drawBackground = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    ns.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    ns.drawVehicles = function () {
        roadNetwork.roadSections.forEach(function (roadSection) {
            roadSection.roadLanes.forEach(function (roadLane) {
                roadLane.vehicles.forEach(function (vehicle) {
                    var x = vehicle.position/2;
                    var y = 300;
                    var vehImage = vehicle.isTruck ? truck : car;
                    ctx.drawImage(vehImage, x, y, 30, 20);
                })
            })
        })

    };

    /*ns.getCanvas = function () {
     return canvas;
     };

     ns.getCtx = function () {
     return ctx;
     };*/

    return ns;

})(movsim.renderer);
