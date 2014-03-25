movsim.namespace('movsim.simulation.roadNetwork');

(function (ns) {
    "use strict";

    // @constructor
    function RoadNetwork() {
        this.roadSegments = [];
    }

    ns.RoadNetwork = RoadNetwork;

    // Factory
    ns.create = function () {
        return new RoadNetwork();
    };

    var p = RoadNetwork.prototype;
    p.addRoadSegment = function (roadSegmet) {
        this.roadSegments.push(roadSegmet);
    };

    // parallel update of all road segments
    p.timeStep = function (dt, simulationTime, iterationCount) {

        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.makeLaneChanges(dt, simulationTime, iterationCount);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateVehicleAccelerations(dt, simulationTime, iterationCount);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateVehiclePositionsAndSpeeds(dt, simulationTime, iterationCount);
        });
        
        // for debugging
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.checkForInconsistencies(dt, simulationTime, iterationCount);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateOutflow(dt, simulationTime, iterationCount);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateInflow(dt, simulationTime, iterationCount);
        });

    };

    return ns;

})(movsim.simulation.roadNetwork);