// global root object for project. Everything else resides inside this object.
var movsim = {};

movsim.namespace = function (name) {
    "use strict";

    var parts = name.split('.');
    var obj = window;
    parts.forEach(function (ns) {
        obj[ns] = obj[ns] || {};
        obj = obj[ns];
    });
    return obj;
};

(function (ns) {
    "use strict";

    // private vars
    var dt = 0.2;  
    var simulationTime = 0;
    var iterationCount = 0;

    var simulator;
    var renderer;
    var gui;
    var running = false;
    var time;
    var timeWarp = 4;
    var roadNetwork;
    var scenarioName = 'ringRoad';

    // public methods
    ns.init = function () {
        console.log('movsim.init() is called');

        // init simulation
        roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(1000, 1);
        simulator = movsim.simulation.simulator;
        simulator.init(roadNetwork);

        // init gui
        gui = movsim.gui;
        gui.init();
        gui.reset('ring road');

        // init renderer (drawing utilities)
        renderer = movsim.renderer;
        renderer.init(roadNetwork);
        renderer.setRenderer(new renderer.RingRoadRenderer());
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
        dt = 0.2;
        simulationTime = 0;
        iterationCount = 0;
    };

    ns.setScenario = function (scenario) {
        scenario = scenario || scenarioName;
        scenarioName = scenario;
        switch (scenario) {
            case 'startStop' :
                roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
                movsim.renderer.setRenderer(new renderer.StartStopRenderer());
                break;
            case 'ringRoad' :
                roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
                movsim.renderer.setRenderer(new renderer.RingRoadRenderer());
                // apply initial perturbation by reducing speed
                var vehicles = roadNetwork.roadSegments[0].roadLanes[0].vehicles;
                var veh = vehicles[Math.floor(vehicles.length/2)];
                veh.speed = 0.75*veh.speed;
                break;
            default :
                throw new Error('scenario name has no match');
        }

        simulator.init(roadNetwork);
        renderer.init(roadNetwork);
        gui.reset(scenario);
        ns.reset();
        ns.start();

    };

    ns.setTimeWarp = function (warpFactor) {
        timeWarp = warpFactor;
    };

//    var fps = 60;
//    var interval = 1000 / fps;

    function mainLoop() {
        if (running) {

            // request new frame see http://creativejs.com/resources/requestanimationframe/
            requestAnimationFrame(mainLoop);

            var now = new Date().getTime();
            dt = (now - (time || now)) / 1000;
            dt *= timeWarp;
            time = now;

            // update state
            simulationTime += dt;
            iterationCount++;
            simulator.timeStep(dt, simulationTime, iterationCount);

            // draw stuff
            renderer.clear();
            renderer.drawBackground();
            renderer.drawRoads();
            renderer.drawVehicles(roadNetwork);

            // limit iterations for now
            if (iterationCount >= 10000) {
                running = false;
            }

            if (iterationCount % 100 === 0) {
                console.log('timeStep: ', dt, ' -- simTime: ', simulationTime, ' -- iterationcount: ', iterationCount);
            }

        } else {
            console.log('simulation paused. simulationTime: ', simulationTime, '  iterationCount: ', iterationCount);
            roadNetwork.roadSegments[0].roadLanes[0].vehicles.forEach(function (vehicle) {
//                console.log('vehicle: ', vehicle);
                console.log('vehicle: ', vehicle.id , '  pos: ' ,vehicle.position.toFixed(2), '  speed: ', vehicle.speed.toFixed(2), '  acc: ', vehicle.acc.toFixed(4), '   a: ', vehicle.carFollowingModelParameters.a);
            });
        }

    }

    return ns;

})(movsim);
