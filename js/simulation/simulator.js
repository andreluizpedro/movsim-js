movsim.namespace('movsim.simulation.simulator');

(function (ns) {

    var roadNetwork = {};

    ns.init = function (roadNetworkParam) {
        roadNetwork = $.extend(roadNetwork, roadNetworkParam);
    };

    /**
     * Performs a single time step of the simulation
     * @param {number} dt - delta t, simulation time interval in seconds
     * @param {number} simulationTime - current simulation time in seconds
     * @param {number} iterationCount
     */
    ns.timeStep = function (dt, simulationTime, iterationCount) {
        console.log('timeStep: ', dt, ' -- simTime: ', simulationTime, ' -- iterationcount: ', iterationCount);
        roadNetwork.timeStep(dt, simulationTime, iterationCount);
    };

    ns.reset = function () {
    };

    return ns;

})(movsim.simulation.simulator);
