movsim.namespace('movsim.simulation.simulator');

(function (ns) {

    var roadNetwork;

    ns.init = function (network) {
        roadNetwork = network;
    };

    /**
     * Performs a single time step of the simulation
     * @param {number} dt - delta t, simulation time interval in seconds
     * @param {number} simulationTime - current simulation time in seconds
     * @param {number} iterationCount
     */
    ns.timeStep = function (dt, simulationTime, iterationCount) {
        roadNetwork.timeStep(dt, simulationTime, iterationCount);
    };

    ns.reset = function () {
    };

    return ns;

})(movsim.simulation.simulator);
