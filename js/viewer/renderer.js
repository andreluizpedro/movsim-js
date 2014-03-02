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

        car = images.car2;
        truck = images.truck1;
    };

    ns.drawBackground = function () {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    };

    ns.clear = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    ns.drawRoads = function () {

    };

    ns.drawVehicles = function () {
        roadNetwork.roadSections.forEach(function (roadSection) {
            roadSection.roadLanes.forEach(function (roadLane) {
                roadLane.vehicles.forEach(function (vehicle) {
////                    for(var i=0; i<n; i++){
//                        var veh_len=vehicle.length;
//                        var veh_w= vehicle.width;
//                        var x=vehPix[i].x;
//                        var y=vehPix[i].y;
//                        var sinphi=vehPix[i].sphi;
//                        var cosphi=vehPix[i].cphi;
//
//                        ctx.setTransform(cosphi, sinphi, -sinphi, cosphi, x, y);
//                        vehImg=(veh[i].type=="car") ? carImg : truckImg;
//                        ctx.drawImage(vehImg, -0.5*veh_len, -0.5* veh_w, veh_len, veh_w);
////                    }

                    var x = vehicle.position / 2;
                    var y = 300;
                    var vehImage = vehicle.isTruck ? truck : car;
                    ctx.drawImage(vehImage, x, y, 30, 20);
                })
            })
        });

    };

    return ns;

})(movsim.renderer);
