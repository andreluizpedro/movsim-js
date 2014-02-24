movsim.namespace('movsim.simulation.roadNetwork');

(function (ns) {
    "use strict";

    // Constructor
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

    p.timeStep = function (dt, simulationTime, iterationCount) {
        this.roadSections.forEach(function (roadSecton) {
            roadSecton.timeStep(dt, simulationTime, iterationCount);
        });
    };

    return ns;

})(movsim.simulation.roadNetwork);