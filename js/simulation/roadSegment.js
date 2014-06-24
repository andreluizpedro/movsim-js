movsim.namespace('movsim.simulation.roadSegment');

(function (ns) {
    "use strict";

    // @Constructor
    function RoadSegment(roadSegmentParameters) {
        this.roadLanes = [];
        this.ringRoad = roadSegmentParameters.ringRoad;  // TODO necessary?
        this.roadLength = roadSegmentParameters.roadLength;
        this.globalX = roadSegmentParameters.globalX;
        this.globalY = roadSegmentParameters.globalY;
        this.heading = roadSegmentParameters.heading;
        this.curvature = roadSegmentParameters.curvature;
        
        for (var i = 0; i < roadSegmentParameters.numberOfLanes; i++) {
            var roadLane = movsim.simulation.roadLane.create(this);
            this.roadLanes.push(roadLane);
        }
        
        var vehiclesInOneLane = roadSegmentParameters.roadLength * roadSegmentParameters.initDensityPerLane;
        var numberOfVehicles = Math.floor(roadSegmentParameters.numberOfLanes * vehiclesInOneLane);
        this._initializeVehicles(numberOfVehicles, roadSegmentParameters.initTruckFraction);
    }

    // Factory
    ns.create = function (roadSectionParameters) {
        return new RoadSegment(roadSectionParameters);
    };

    ns.getDefaultParameters = function () {
        var roadSectionParameters = {};
        roadSectionParameters.roadLength = 1000;
        roadSectionParameters.numberOfLanes = 1;
        roadSectionParameters.initDensityPerLane = 10 / 1000;
        roadSectionParameters.initTruckFraction = 0.1;
        roadSectionParameters.ringRoad = false;
        roadSectionParameters.globalX = 0;
        roadSectionParameters.globalY = 0;
        roadSectionParameters.heading = 0;
        roadSectionParameters.curvature = 0;
        return roadSectionParameters;
    };

    var p = RoadSegment.prototype;
    p.makeLaneChanges = function (dt) {
        // TODO implement lane changes
    };

    p.updateVehicleAccelerations = function (dt) {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.calcAccelerations();
        });
    };
    
    p.updateVehiclePositionsAndSpeeds = function (dt) {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.updateSpeedAndPosition(dt);
        });
    };
    
    p.updateOutflow = function (dt) {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.updateOutflow(dt);
        });
    };
    
    p.updateInflow = function (dt) {
        this.roadLanes.forEach(function (roadLane) {
            roadLane.updateInflow(dt);
        });
    };
    
    p.getRearVehicle = function(lane, position) {
        return this.roadLanes[lane-1].getRearVehicle(position);
    };

    p.getFrontVehicle = function(lane, position) {
        return this.roadLanes[lane-1].getFrontVehicle(position);
    };

    p.checkForInconsistencies = function (dt) {
       // TODO implement check for negative vehicle distances 
    };

    p._initializeVehicles = function (numberOfVehicles, truckFraction) {
        for (var i = 0; i < numberOfVehicles; i++) {
            var vehicleParameters = movsim.simulation.vehicle.getDefaultParameters();
            vehicleParameters.isTruck = Math.random() < truckFraction;
            // initialize all vehicles with same speed determined by slower trucks
            vehicleParameters.speed = 0.8 * movsim.carfollowing.idmParameters.getDefaultTruck().v0;
            vehicleParameters.position = i * 100; // TODO init correctly
            var vehicle = movsim.simulation.vehicle.create(vehicleParameters);
            var lane = i % this.roadLanes.length;
            this.roadLanes[lane].addVehicle(vehicle);
        }
    };

    return ns;

})(movsim.simulation.roadSegment);