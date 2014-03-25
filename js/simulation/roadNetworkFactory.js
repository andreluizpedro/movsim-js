movsim.namespace('movsim.simulation.roadNetworkFactory');

(function (ns) {
    "use strict";

    ns.createRingRoad = function (roadLength, numberOfLanes) {
        var roadNetwork = movsim.simulation.roadNetwork.create();

        // create one roadSection
        var roadSegmentParameters = movsim.simulation.roadSegment.getDefaultParameters();
        roadSegmentParameters.ringRoad = true;
        roadSegmentParameters.roadLength = roadLength;
        roadSegmentParameters.numberOfLanes = numberOfLanes;
        var roadSection = movsim.simulation.roadSegment.create(roadSegmentParameters);

        roadNetwork.addRoadSegment(roadSection);
        return roadNetwork;
    };

    return ns;

})(movsim.simulation.roadNetworkFactory);