// global root object for project. Everything else resides inside this object.
var ts = ts || {};

ts.namespace = function (name) {
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
        console.log('ts.init() is called');

        // init simulator
        ts.project.setProject({});
        simulator = ts.sim;
        simulator.init();

        // init gui
        ts.gui.init();

        // init renderer (drawing utilities)
        renderer = ts.renderer;
        renderer.init();

        // start default simulation
        running = true;
        mainLoop();

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

})(ts);
