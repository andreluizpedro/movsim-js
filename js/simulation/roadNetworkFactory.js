movsim.namespace('movsim.simulation.roadNetworkFactory');

(function (ns) {

    ns.createRingRoad = function (roadLength, numberOfLanes) {
        var roadNetwork = movsim.simulation.roadNetwork.create();

        // create one roadSection
        var roadSectionParameters = movsim.simulation.roadSection.getDefaultParameters();
        roadSectionParameters.roadLength = roadLength;
        roadSectionParameters.numberOfLanes = numberOfLanes;
        var roadSection = movsim.simulation.roadSection.create(roadSectionParameters);

        roadNetwork.addRoadSection(roadSection);
        return roadNetwork;
    };

    return ns;

})(movsim.simulation.roadNetworkFactory);