ts.namespace('ts.sim');

(function (ns) {

    ns.init = function () {

        // process input data

        // reset

        // test Vehicle class
        var veh1 = new ns.Vehicle(1, 0);
        var veh2 = new ns.Vehicle(9,10);
        veh1.updateAcceleration();
        veh1.updateAcceleration();
        veh2.updateAcceleration();
        var count = veh1.getVehiclesCreatedCount();
    };

    /**
     * Performs a single time step of the simulation
     * @param {number} dt - delta t, simulation time interval in seconds
     * @param {number} simulationTime - current simulation time in seconds
     * @param {number} iterationCount
     */
    ns.timeStep = function (dt, simulationTime, iterationCount) {
        console.log('timeStep: ', dt, ' -- simTime: ', simulationTime, ' -- iterationcount: ', iterationCount);

    };

    ns.reset = function () {

    };

    // TODO completion event

    return ns;

})(ts.sim);
