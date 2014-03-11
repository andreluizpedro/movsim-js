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
            var leader = this.vehicles[i+1];
            vehicle.updateAcceleration(leader);
        }
    };

    p.updateSpeedAndPosition = function (dt) {
        this.vehicles.forEach(function (vehicle) {
            vehicle.updateSpeedAndPosition(dt);
        });
    };

    p._sortVehicles = function () {
        this.vehicles.sort(function (a, b) {
            return a.position - b.position;
        });
    };

    return ns;

})(movsim.simulation.roadLane);