movsim.namespace('movsim.renderer');

(function (ns) {
    "use strict";

    ns.RingRoadRenderer = function () {

        var self = this;

        var canvas = ns.getCanvas();
        var ctx = canvas.getContext("2d");
        var images = movsim.resources.getImages();

        var car = images.car2;
        var truck = images.truck1;
        var roadOneLane = images.ringRoadOneLane;
        var backgroundImage = images.bgRoundabout;

        var width = canvas.width = backgroundImage.width;
        var height = canvas.height = backgroundImage.height;

        var roadRadius = 120;
        var roadLen = roadRadius * 2 * Math.PI;

        var scaleFactorImg = roadRadius / 230; // *Paris* image
        var center_x = 0.50 * width * scaleFactorImg;
        var center_y = 0.48 * height * scaleFactorImg;

        var scale = 2;
        var laneWidth = 10;
        var nLanes = 1;

        self.drawBackground = function () {
//            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            // reset transform matrix and draw background
            // (only needed if no explicit road drawn)

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            var scaleImg = scale * scaleFactorImg;
            ctx.drawImage(backgroundImage, 0, 0, scaleImg * width, scaleImg * height);

        };

        self.drawVehicles = function (roadNetwork) {
            roadNetwork.roadSections.forEach(function (roadSection) {
                roadSection.roadLanes.forEach(function (roadLane) {
                    roadLane.vehicles.forEach(function (vehicle, index) {


                        // create graphical objects representing the vehicle occupation
//                        vehPix[index]=new vehPix_cstr(vehicle);
//
////                    for(var i=0; i<n; i++){
//                        var veh_len=vehicle.length;
//                        var veh_w= vehicle.width;
//                        var x=vehPix[index].x;
//                        var y=vehPix[index].y;
//                        var sinphi=vehPix[index].sphi;
//                        var cosphi=vehPix[index].cphi;
//
//                        ctx.setTransform(cosphi, sinphi, -sinphi, cosphi, x, y);
//                        var vehImage = vehicle.isTruck ? truck : car;
//                        ctx.drawImage(vehImage, -0.5*veh_len, -0.5* veh_w, veh_len, veh_w);
//                    }

                        var x = vehicle.position;
                        var y = 300;
                        var vehImage = vehicle.isTruck ? truck : car;
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        var scaleImg = scale * scaleFactorImg;
                        ctx.drawImage(vehImage, x, y, scaleImg * 30, scaleImg * 20);
//                        ctx.drawImage(vehImage, x, y, 30, 20);
                    });
                });
            });
        };

        self.drawRoads = function () {

            var nSegm = 60;
            var factor = 1 + (nLanes + 0.9) * laneWidth / roadRadius;
            var segmLen = scale * factor * roadLen / nSegm;
            var segmWidth = scale * (nLanes + 0.9) * laneWidth;
            //var segmWidth=scale*3.1*laneWidth;
            for (var iSegm = 0; iSegm < nSegm; iSegm++) {
                var u = roadLen * iSegm / nSegm;
                var cosphi = get_cphi(u);
                var sinphi = get_sphi(u);
                // road center of two-lane road has v=1
                var vCenter = 0.5 * nLanes;
                ctx.setTransform(cosphi, sinphi, -sinphi, cosphi,
                    get_x(u, vCenter), get_y(u, vCenter));
                ctx.drawImage(roadOneLane, -0.5 * segmLen, -0.5 * segmWidth, segmLen, segmWidth);
            }

        };


// x coordinate from arc length u and transversal logical coordinate v
// v=0 at median (left border of directional road)
// arc road=u/roadRadius; -sin(..) since yPix downwards

        function get_x(u, v) {
            return scale * (center_x + (roadRadius + laneWidth * v) * Math.cos(u / roadRadius));
        }

        function get_y(u, v) {
            return scale * (center_y - (roadRadius + laneWidth * v) * Math.sin(u / roadRadius));
        }

// cos car rotation (pi/2 shifted w/respect to road angular coordinate)

        function get_cphi(u) {
            //return -Math.sin(u/roadRadius);
            return Math.cos(u / roadRadius + 0.5 * Math.PI);
        }

        function get_sphi(u) {
            //return -Math.cos(u/roadRadius);
            return -Math.sin(u / roadRadius + 0.5 * Math.PI);
        }

        function get_phi(u) {
            //return -Math.cos(u/roadRadius);
            return u / roadRadius + 0.5 * Math.PI;
        }


// pixel representation of a vehicle
// -Math.atan(vehicle.dvdu)=vehicle orient relative to road axis
// (if change to right => dvdu>0 => phi smaller, therefore minus sign)
        function vehPix_cstr(veh){
            this.type=veh.type;
            this.length=scale*veh.length;
            this.width=scale*veh.width;
            this.x=get_x(veh.u-0.5*veh.length,veh.v+0.5);  // horiz: pixels incr to the right
            this.y=get_y(veh.u-0.5*veh.length,veh.v+0.5);  // vert: pixels incr downwards
//            this.phi=get_phi(veh.u-0.5*veh.length)-Math.atan(veh.dvdu);

            this.phi=get_phi(veh.id-0.5*veh.length)-Math.atan(1);

            this.cphi=Math.cos(this.phi);  // cos (orientation phi)
            this.sphi=-Math.sin(this.phi); // - sin since y points downwards
        }



        return self;
    };

    return ns;

})(movsim.renderer);