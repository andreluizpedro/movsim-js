movsim.namespace('movsim.simulation.roadNetwork');

(function (ns) {
    "use strict";

    // Constructor
    function RoadNetwork(){
        this.roadSections = [];
    };

    // Factory
    ns.create = function (){
        return new RoadNetwork();
    };

    var p = RoadNetwork.prototype;
    p.addRoadSection = function (roadSection){
        this.roadSections.push(roadSection);
    };

    p.timeStep = function (dt, simulationTime, iterationCount){
        for(var i=0; i<roadSections.length; i++){
            this.roadSections[i].timeStep(dt, simulationTime, iterationCount);
        }
    };

    return ns;

})(movsim.simulation.roadNetwork);