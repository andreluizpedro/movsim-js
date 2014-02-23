// global root object for project. Everything else resides inside this object.
var movsim = {};

movsim.namespace = function (name) {
    var parts = name.split('.');
    var obj = window;
    parts.forEach(function (ns) {
        obj[ns] = obj[ns] || {};
        obj = obj[ns];
    });
    return obj;
};

(function (ns) {

    // private vars
    var simulator;
    var renderer;
    var running = false;
    var dt = 0;
    var simulationTime = 0;
    var iterationCount = 0;

    // public methods
    ns.init = function () {
        console.log('movsim.init() is called');

        var roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);

        simulator = movsim.simulation.simulator.init(roadNetwork);

        // init gui
        movsim.gui.init();
        // init renderer (drawing utilities)
        renderer = movsim.renderer;
        renderer.init();

        // start default simulation
        ns.start();
    };

    ns.start = function () {
        running = true;
        mainLoop();
    };

    ns.stop = function () {
        running = false;
    };

    ns.reset = function () {
        dt = 0;
        simulationTime = 0;
        iterationCount = 0;
    };

    function mainLoop() {
        if (running) {

            // update state
            simulator.timeStep(dt, simulationTime, iterationCount);

            // draw stuff
            renderer.clear();
            renderer.drawBackground();
            renderer.drawVehicles();

            // request new frame
//        requestAnimationFrame(function() {
//            mainLoop();
//        });
        }

    }

    return ns;

})(movsim);
