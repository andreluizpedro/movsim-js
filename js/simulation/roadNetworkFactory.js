movsim.namespace('movsim.simulation.roadNetworkFactory');

(function (ns) {
    "use strict";

    ns.createRingRoad = function (roadLength, numberOfLanes) {
        var roadNetwork = movsim.simulation.roadNetwork.create();

        // create one roadSection representing a ring road (anti-clockwise driving direction)
        var roadSegmentParameters = movsim.simulation.roadSegment.getDefaultParameters();
        roadSegmentParameters.ringRoad = true;
        roadSegmentParameters.roadLength = roadLength;
        roadSegmentParameters.numberOfLanes = numberOfLanes;
        roadSegmentParameters.globalX = 0;
        roadSegmentParameters.globalY = 0;//
        roadSegmentParameters.heading = 0;
        roadSegmentParameters.curvature = 2*Math.PI/roadLength;
        
        var roadSection = movsim.simulation.roadSegment.create(roadSegmentParameters);

        roadNetwork.addRoadSegment(roadSection);
        return roadNetwork;
    };

    return ns;

})(movsim.simulation.roadNetworkFactory);