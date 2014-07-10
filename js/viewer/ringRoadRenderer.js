movsim.namespace('movsim.renderer');

(function (ns) {
    "use strict";

    // TODO use geometry from roadSegments to draw roadSegments independent from any assumptions!
    
    ns.RingRoadRenderer = function () {

        var self = this;

        var canvas = ns.getCanvas();
        var ctx = canvas.getContext("2d");
        var images = movsim.resources.getImages();

        var car = images.car2;
        var truck = images.truck1;
        var roadOneLane = images.ringRoadOneLane;  
        // var backgroundImage = images.bgRoundabout;

        var width = canvas.width = 800; //backgroundImage.width;
        var height = canvas.height = 800; // backgroundImage.height;

        // TODO replace fixed scale numbers
        var scaleFactorImg = 1; 
        var center_x = 0.50 * width * scaleFactorImg;
        var center_y = 0.48 * height * scaleFactorImg;
        var scale = 0.8;

        self.drawBackground = function () {
        	// ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
            // reset transform matrix and draw background
            // (only needed if no explicit road drawn)
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            // var scaleImg = scale * scaleFactorImg;
            //ctx.drawImage(backgroundImage, 0, 0, scaleImg * width, scaleImg * height);
        };

        self.drawVehicles = function (roadNetwork) {
            roadNetwork.roadSegments.forEach(function (roadSection) {
            	// console.log("drawVehicles: curvature = " + roadSection.parameters.curvature);
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

                    	// TODO calculate correct screen coordinates from roadSegment geometry
                        var x = vehicle.position;  // ringroad !!  
                        var y = roadSection.parameters.globalY;
                        var vehImage = vehicle.isTruck ? truck : car;
                        ctx.setTransform(1, 0, 0, 1, 0, 0);
                        var scaleImg = scale * scaleFactorImg;
                        ctx.drawImage(vehImage, x, y, scaleImg * 30, scaleImg * 20);
                    });
                });
            });
        };

	    self.drawRoads = function(roadNetwork) {
			roadNetwork.roadSegments.forEach(function(roadSegment) {
				// console.log("drawRoad: laneWidth = " + roadSegment.parameters.laneWidth);
				var nSegm = 60;
				var factor = 1 + (roadSegment.parameters.numberOfLanes + 0.9) * roadSegment.parameters.laneWidth *roadSegment.parameters.curvature;
				var segmLen = scale * factor * roadSegment.parameters.roadLength / nSegm;
				var segmWidth = scale * (roadSegment.parameters.numberOfLanes + 0.9) * roadSegment.parameters.laneWidth;
				// var segmWidth=scale*3.1*roadSection.parameters.laneWidth;
				for (var iSegm = 0; iSegm < nSegm; iSegm++) {
					var u = roadSegment.parameters.roadLength * iSegm / nSegm;
					var cosphi = get_cphi(u, roadSegment.parameters);
					var sinphi = get_sphi(u, roadSegment.parameters);
					// road center of two-lane road has v=1
					var vCenter = 0.5 * roadSegment.parameters.numberOfLanes;
					var x = get_x(u, vCenter, roadSegment.parameters);
					var y = get_y(u, vCenter, roadSegment.parameters);
					ctx.setTransform(cosphi, sinphi, -sinphi, cosphi, x, y);
					ctx.drawImage(roadOneLane, -0.5 * segmLen, -0.5 * segmWidth, segmLen, segmWidth);
				}
			});

		};


// x coordinate from arc length u and transversal logical coordinate v
// v=0 at median (left border of directional road)
// arc road=u/roadRadius; -sin(..) since yPix downwards

        function get_x(u, v, roadSegmentParameters) {
            return scale * (center_x  + (1./roadSegmentParameters.curvature + roadSegmentParameters.laneWidth * v) * Math.cos(u * roadSegmentParameters.curvature));
        }

        function get_y(u, v, roadSegmentParameters) {
            return scale * (center_y - (1./roadSegmentParameters.curvature + roadSegmentParameters.laneWidth * v) * Math.sin(u * roadSegmentParameters.curvature));
        }

// cos car rotation (pi/2 shifted w/respect to road angular coordinate)

        function get_cphi(u, roadSegmentParameters) {
            //return -Math.sin(u/roadRadius);
            return Math.cos(u * roadSegmentParameters.curvature + 0.5 * Math.PI);
        }

        function get_sphi(u, roadSegmentParameters) {
            //return -Math.cos(u/roadRadius);
            return -Math.sin(u * roadSegmentParameters.curvature + 0.5 * Math.PI);
        }

        function get_phi(u, roadSegmentParameters) {
            //return -Math.cos(u/roadRadius);
            return u * roadSegmentParameters.curvature + 0.5 * Math.PI;
        }


// pixel representation of a vehicle
// -Math.atan(vehicle.dvdu)=vehicle orient relative to road axis
// (if change to right => dvdu>0 => phi smaller, therefore minus sign)
        function vehPix_cstr(veh, roadSegmentParameters) {
            this.type = veh.type;
            this.length = scale * veh.length;
            this.width = scale * veh.width;
            this.x = get_x(veh.u - 0.5 * veh.length, veh.v + 0.5, roadSegmentParameters);  // horiz: pixels incr to the right
            this.y = get_y(veh.u - 0.5 * veh.length, veh.v + 0.5, roadSegmentParameters);  // vert: pixels incr downwards
//            this.phi=get_phi(veh.u-0.5*veh.length)-Math.atan(veh.dvdu);

            this.phi = get_phi(veh.id - 0.5 * veh.length) - Math.atan(1);

            this.cphi = Math.cos(this.phi);  // cos (orientation phi)
            this.sphi = -Math.sin(this.phi); // - sin since y points downwards
        }


        return self;
    };

    return ns;

})(movsim.renderer);