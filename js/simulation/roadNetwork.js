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
    p.timeStep = function (dt) {

        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.makeLaneChanges(dt);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateVehicleAccelerations(dt);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateVehiclePositionsAndSpeeds(dt);
        });
        
        // for debugging
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.checkForInconsistencies(dt);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateOutflow(dt);
        });
        
        this.roadSegments.forEach(function (roadSegmet) {
            roadSegmet.updateInflow(dt);
        });

    };

    return ns;

})(movsim.simulation.roadNetwork);