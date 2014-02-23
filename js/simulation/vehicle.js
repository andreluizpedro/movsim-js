movsim.namespace('movsim.simulation.vehicle')

(function (ns) {
    "use strict";

    // Constructor
    function Vehicle(vehicleParameters) {
        // console.log(' * new Vehicle length: ', length);
        this.carFollowingModel = new movsim.carFollowingModel.idm();
        var modelParameters = vehicleParameters.isTruck ? movsim.carFollowingModel.idmParameters.getDefaultTruck() : movsim.carFollowingModel.idmParameters.getDefaultCar();
        this.carFollowingModel.setParameters(modelParameters);

        // TODO create MOBIL lane-changing model
        this.vLimit = modelParameters.v0; // if effective speed limits, vLimit<v0
        this.vMax = modelParameters.v0; // if vehicle restricts speed, vMax<vLimit, v0

        // public variables
        this.length = vehicleParameters.length;
        this.width = vehicleParameters.width;
        this.position = vehicleParameters.position;
        this.speed = vehicleParameters.speed;
        this.acc = vehicleParameters.acc;
    };

    // Factory
    ns.create = function (vehicleParameters) {
        return new Vehicle(vehicleParameters);
    };

    ns.getDefaultParameters = function (isTruck) {
        var vehicleParameters = {};
        vehicleParameters.isTruck = isTruck;
        vehicleParameters.length = (isTruck) ? 15 : 7;
        vehicleParameters.width = (isTruck) ? 3 : 2.5;
        vehicleParameters.position = 0;
        vehicleParameters.speed = 0;
        vehicleParameters.acc = 0;
        return vehicleParameters;
    };

    // public functions
    var p = Vehicle.prototype;
    p.updateAcceleration = function (leader) {
        this.acc = this.carFollowingModel.calculateAcceleration(this, leader);
    };

    p.updateSpeedAndPosition = function (dt) {
        this.position += this.speed * dt + 0.5 * this.acc * dt * dt;
        this.speed += this.acc * dt;
        if (this.speed < 0) {
            this.speed = 0;
        }
    };

    return ns;

})(movsim.simulation.vehicle);