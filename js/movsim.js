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
    var gui;
    var running = false;
    var dt = 1;
    var simulationTime = 0;
    var iterationCount = 0;
    var time;
    var roadNetwork;

    // public methods
    ns.init = function () {
        console.log('movsim.init() is called');

        // init simulation
        roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
        simulator = movsim.simulation.simulator;
        simulator.init(roadNetwork);

        // init gui
        gui = movsim.gui;
        gui.init();

        // init renderer (drawing utilities)
        renderer = movsim.renderer;
        renderer.init(roadNetwork);
        renderer.drawRoads();
        renderer.drawBackground();

        // start default simulation
        ns.start();
    };

    ns.start = function () {
        running = true;
        time = new Date().getTime();
        mainLoop();
    };

    ns.stop = function () {
        running = false;
    };

    ns.reset = function () {
        dt = 1;
        simulationTime = 0;
        iterationCount = 0;
    };

//    var fps = 60;
//    var interval = 1000 / fps;

    function mainLoop() {
        if (running) {

            // request new frame see http://creativejs.com/resources/requestanimationframe/
            requestAnimationFrame(mainLoop);

            var now = new Date().getTime();
            dt = (now - (time || now)) / 1000;
            time = now;

            // update state
            simulationTime = simulationTime + dt;
            iterationCount++;
            simulator.timeStep(dt, simulationTime, iterationCount);

            // draw stuff
            renderer.clear();
            renderer.drawBackground();
            renderer.drawRoads();
            renderer.drawVehicles(roadNetwork);

            // just 10 iterations for now
            if (iterationCount >= 1000) {
                running = false;
            }

            if (iterationCount % 100 === 0) {
                console.log('timeStep: ', dt, ' -- simTime: ', simulationTime, ' -- iterationcount: ', iterationCount);
            }

        } else {
            console.log('simulation paused. simulationTime: ', simulationTime, '  iterationCount: ', iterationCount);
            roadNetwork.roadSections[0].roadLanes[0].vehicles.forEach(function (vehicle) {
//                console.log('vehicle: ', vehicle);
                console.log('vehicle: ', vehicle.id , '  pos: ' ,vehicle.position.toFixed(2), '  speed: ', vehicle.speed.toFixed(2), '  acc: ', vehicle.acc.toFixed(4));
            });
        }

    }

    return ns;

})(movsim);
