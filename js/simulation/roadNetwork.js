movsim.namespace('movsim.simulation.roadNetwork');

(function (ns) {
    "use strict";

    // @constructor
    function RoadNetwork() {
        this.roadSections = [];
    }

    ns.RoadNetwork = RoadNetwork;

    // Factory
    ns.create = function () {
        return new RoadNetwork();
    };

    var p = RoadNetwork.prototype;
    p.addRoadSection = function (roadSection) {
        this.roadSections.push(roadSection);
    };

    // parallel update of all road segments
    p.timeStep = function (dt, simulationTime, iterationCount) {

        this.roadSections.forEach(function (roadSection) {
            roadSection.makeLaneChanges(dt, simulationTime, iterationCount);
        });
        
        this.roadSections.forEach(function (roadSection) {
            roadSection.updateVehicleAccelerations(dt, simulationTime, iterationCount);
        });
        
        this.roadSections.forEach(function (roadSection) {
            roadSection.updateVehiclePositionsAndSpeeds(dt, simulationTime, iterationCount);
        });
        
        // for debugging
        this.roadSections.forEach(function (roadSection) {
            roadSection.checkForInconsistencies(dt, simulationTime, iterationCount);
        });
        
        // update sinks (outflow)
        // update sources (inflow)
    };

    return ns;

})(movsim.simulation.roadNetwork);