movsim.namespace('movsim.simulation.roadLane');

(function (ns) {
    "use strict";

    // Constructor
    function RoadLane() {
        this.vehicles = [];
    }

    // Factory
    ns.create = function () {
        return new RoadLane();
    };

    var p = RoadLane.prototype;
    p.addVehicle = function (vehicle) {
        this.vehicles.push(vehicle);
    };

    p.calcAccelerations = function () {
        for (var i = 0, len = this.vehicles.length; i < len; i++) {
            var vehicle = this.vehicles[i];
            // TODO special case ringroad
            if (len > 1) {
                var leader = (i === len - 1) ? this.vehicles[0] : this.vehicles[i + 1];
                vehicle.updateAcceleration(leader);
            }
            else {
                vehicle.updateAcceleration();
            }
        }
    };

    p.updateSpeedAndPosition = function (dt) {
        this.vehicles.forEach(function (vehicle) {
            // TODO better naming for ide
            vehicle.updateSpeedAndPosition(dt)
        });
    };

    p._sortVehicles = function () {
        // TODO sort according to Vehicle.position
    };

    return ns;

})(movsim.simulation.roadLane);