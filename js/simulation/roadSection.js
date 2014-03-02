movsim.namespace('movsim.simulation.roadSection');

(function (ns) {
    "use strict";

    // Constructor
    function RoadSection(roadSectionParameters) {
        this.roadLanes = [];

        for (var i = 0; i < roadSectionParameters.numberOfLanes; i++) {
            var roadLane = movsim.simulation.roadLane.create();
            this.roadLanes.push(roadLane);
        }
        var vehiclesInOneLane = roadSectionParameters.roadLength * roadSectionParameters.initDensityPerLane;
        var numberOfVehicles = Math.floor(roadSectionParameters.numberOfLanes * vehiclesInOneLane);
        this._initializeVehicles(numberOfVehicles, roadSectionParameters.initTruckFraction);
    }

    // Factory
    ns.create = function (roadSectionParameters) {
        return new RoadSection(roadSectionParameters);
    };

    ns.getDefaultParameters = function () {
        var roadSectionParameters = {};
        roadSectionParameters.roadLength = 1000;
        roadSectionParameters.numberOfLanes = 1;
        roadSectionParameters.initDensityPerLane = 10 / 1000;
        roadSectionParameters.initTruckFraction = 0.1;
        return roadSectionParameters;
    };

    var p = RoadSection.prototype;
    p.timeStep = function (dt, simulationTime, iterationCount) {
        this.calcAccelerations();
        // changeLanes(veh);
        this.updateSpeedAndPositions(dt);
        // update sinks and sources
    };

    p.calcAccelerations = function () {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.calcAccelerations();
        });
    };

    p.updateSpeedAndPositions = function (dt) {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.updateSpeedAndPosition(dt);
        });
    };

    p._initializeVehicles = function (numberOfVehicles, truckFraction) {
        for (var i = 0; i < numberOfVehicles; i++) {
            var vehicleParameters = movsim.simulation.vehicle.getDefaultParameters();
            vehicleParameters.isTruck = Math.random() < truckFraction;
            // initialize all vehicles with same speed determined by slower trucks
            vehicleParameters.speed = 0.8 * movsim.carFollowingModel.idmParameters.getDefaultTruck().v0;
            vehicleParameters.position = i * 100; // TODO init correctly
            var vehicle = movsim.simulation.vehicle.create(vehicleParameters);
            var lane = i % this.roadLanes.length;
            this.roadLanes[lane].addVehicle(vehicle);
        }
    };

    return ns;

})(movsim.simulation.roadSection);