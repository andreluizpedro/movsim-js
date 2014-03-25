movsim.namespace('movsim.renderer');

(function (ns) {
    "use strict";

    ns.StartStopRenderer = function () {
        var self = this;

        var canvas = ns.getCanvas();
        var ctx = canvas.getContext("2d");
        var images = movsim.resources.getImages();

        var car = images.car2;
        var truck = images.truck1;
        var backgroundImage = images.luechow;

        var width = canvas.width = backgroundImage.width;
        var height = canvas.height = backgroundImage.height;


        var scaleFactorImg = 0.5;
        var scale = 2;

        self.drawBackground = function () {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            var scaleImg = scale * scaleFactorImg;
            ctx.drawImage(backgroundImage, 0, 0, scaleImg * width, scaleImg * height);

        };

        self.drawVehicles = function (roadNetwork) {
            roadNetwork.roadSegments.forEach(function (roadSection) {
                roadSection.roadLanes.forEach(function (roadLane) {
                    roadLane.vehicles.forEach(function (vehicle, index) {

                        var x = vehicle.position;
                        var y = 160;
                        var vehImage = vehicle.isTruck ? truck : car;
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        var scaleImg = scale * scaleFactorImg;
                        ctx.drawImage(vehImage, x, y, scaleImg * 30, scaleImg * 20);
                    });
                });
            });
        };

        self.drawRoads = function () {

        };


        return self;

    };

})(movsim.renderer);