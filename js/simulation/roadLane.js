movsim.namespace('movsim.simulation.roadLane');

(function (ns) {
    "use strict";

    // Constructor
    function RoadLane(roadSegment) {
        this.vehicles = [];
        this.roadSegment = roadSegment;
    }

    // Factory
    ns.create = function (ringRoad) {
        return new RoadLane(ringRoad);
    };

    var p = RoadLane.prototype;
    p.addVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };

    p.calcAccelerations = function () {
        for (var i = 0, len = this.vehicles.length; i < len; i++) {
            var vehicle = this.vehicles[i];
            var leader = this._getLeader(i);
            vehicle.updateAcceleration(leader);
        }
    };

    p.updateSpeedAndPosition = function (dt) {
        this.vehicles.forEach(function (vehicle) {
            vehicle.updateSpeedAndPosition(dt);
        });
    };
    
    p.updateOutflow = function (dt) {
        // remove vehicles with position > this.roadSegment.roadLength (later: assign to linked lane)
        // for ringroad set vehicle at beginning of lane (periodic boundary conditions)
        // TODO not efficient, find better js-like coding with closure or so, add tests!!
//        for (var i = 0, len = this.vehicles.length; i < len; i++) {
//            var vehicle = this.vehicles[i];
//            if (vehicle.position > this.roadSegment.roadLength) {
//                //this.vehicles.remove(i);
//                delete this.vehicles[i]; // TODO how to remove?
//            }
//        }
    };
    
    p.updateInflow = function (dt) {
        // TODO
    };

    p._sortVehicles = function () {
        this.vehicles.sort(function (a, b) {
            return a.position - b.position;
        });
    };
    
    p._getLeader = function (vehicleIndex) {
        if (this.vehicles.length <= 1) {
            return null;
        }
        if (vehicleIndex === this.vehicles.length-1) {
            return this.roadSegment.ringRoad === true ? this.vehicles[0] : null;
        }
        return this.vehicles[vehicleIndex + 1];
    };

    return ns;

})(movsim.simulation.roadLane);