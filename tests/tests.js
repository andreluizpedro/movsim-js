// https://qunitjs.com/cookbook/

// ok( truthy [, message ] )
// equal( actual, expected [, message ] )
// deepEqual( actual, expected [, message ] )

module('test');

test("hello test", function () {
    "use strict";
    ok("1" === "1", "Passed!");
});


module('movsim utilities');
test("namespace function", function () {
    "use strict";
    var ns = movsim.namespace('movsim.simulation.roadnetwork');
    deepEqual(ns, movsim.simulation.roadnetwork);
});


module('car following models and parameters');
test('IDM parameters car default', function () {
    "use strict";
    var carDefaultIdmParameters = movsim.carfollowing.idmParameters.getDefaultCar();

    ok(carDefaultIdmParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    deepEqual(carDefaultIdmParameters.v0, 20, 'v0');
    deepEqual(carDefaultIdmParameters.a, 1.2, 'a');
    deepEqual(carDefaultIdmParameters.b, 1.2, 'b');
    deepEqual(carDefaultIdmParameters.T, 1.5, 'T');
    deepEqual(carDefaultIdmParameters.s0, 2, 's0');
    deepEqual(carDefaultIdmParameters.s1, 0, 's1');
});

test('IDM parameters truck default', function () {
    "use strict";
    var truckDefaultIdmParameters = movsim.carfollowing.idmParameters.getDefaultTruck();

    ok(truckDefaultIdmParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    deepEqual(truckDefaultIdmParameters.v0, 16, 'v0');
    deepEqual(truckDefaultIdmParameters.a, 0.8 * 1.2, 'a');
    deepEqual(truckDefaultIdmParameters.b, 1.2, 'b');
    deepEqual(truckDefaultIdmParameters.T, 1.2 * 1.5, 'T');
    deepEqual(truckDefaultIdmParameters.s0, 2, 's0');
    deepEqual(truckDefaultIdmParameters.s1, 0, 's1');
});

test('models simple acceleration function', function () {
    "use strict";
    var maxDifference = 0.0001;
    var modelParameters = movsim.carfollowing.idmParameters.createParameters(20, 1.2, 1.2, 1.5, 2, 0);
    ok(modelParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    var v0eff=modelParameters.v0;
    
    QUnit.close(movsim.carfollowing.models.calculateAcceleration(100000, 0, modelParameters.v0, v0eff, modelParameters), modelParameters.a, maxDifference);
    QUnit.close(movsim.carfollowing.models.calculateAcceleration(100000, v0eff, modelParameters.v0, v0eff, modelParameters), 0,  maxDifference);
	QUnit.close(movsim.carfollowing.models.calculateAcceleration(100, v0eff, 0.5*v0eff, v0eff, modelParameters), -1.5962, maxDifference);
    QUnit.close(movsim.carfollowing.models.calculateAcceleration(10, v0eff, 0.5*v0eff, v0eff, modelParameters), -movsim.carfollowing.models.getMaxDeceleration(), maxDifference);
});


module('vehicle');
test('vehicle parameter', function () {
    "use strict";
    var vehicleParameters = movsim.simulation.vehicle.getDefaultParameters();
    var vehicle = movsim.simulation.vehicle.create(vehicleParameters);
    var vehicle2 = movsim.simulation.vehicle.create();

    ok(vehicle instanceof movsim.simulation.vehicle.Vehicle);
    ok(vehicle2 instanceof movsim.simulation.vehicle.Vehicle);
//    deepEqual(vehicle, vehicle2, 'vehicle.create() === vehicle.create(vehicle.getDefaultParameters())');
    ok(vehicle.id !== vehicle2.id, 'two veh with different ids');
    deepEqual(vehicle.position, vehicleParameters.position, 'position');
    deepEqual(vehicle.speed, vehicleParameters.speed, 'speed');
    deepEqual(vehicle.acc, vehicleParameters.acc, 'acc');
    deepEqual(vehicle.length, vehicleParameters.length, 'length');
    deepEqual(vehicle.width, vehicleParameters.width, 'width');
    
    ok(vehicle.carFollowingModelParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
});

test('vehicle idm acceleration function', function () {
    "use strict";
    var maxDifference = 0.0001;
    var vehicleParameters = movsim.simulation.vehicle.getDefaultParameters();
    
    var followingVehicle = movsim.simulation.vehicle.create();
    var leadingVehicle = movsim.simulation.vehicle.create();
    ok(followingVehicle.carFollowingModelParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    
    leadingVehicle.position = 1000000;
    followingVehicle.speed = 0;
    followingVehicle.updateAcceleration(leadingVehicle);
	QUnit.close(followingVehicle.acc, followingVehicle.carFollowingModelParameters.a, maxDifference);
    
    followingVehicle.speed = followingVehicle.carFollowingModelParameters.v0;
    leadingVehicle.speed = followingVehicle.carFollowingModelParameters.v0;
    followingVehicle.updateAcceleration(leadingVehicle);
    QUnit.close(followingVehicle.acc, 0,  maxDifference);
    
    leadingVehicle.position = followingVehicle.position + 100;
    leadingVehicle.speed = 0.5*followingVehicle.carFollowingModelParameters.v0;
    followingVehicle.updateAcceleration(leadingVehicle);
    QUnit.close(followingVehicle.acc, -1.84554, maxDifference);
    
    leadingVehicle.position = followingVehicle.position + 10;
    followingVehicle.updateAcceleration(leadingVehicle);
    QUnit.close(followingVehicle.acc, -movsim.carfollowing.models.getMaxDeceleration(), maxDifference);
});


module('road network');
test('road network ring road creation', function () {
    "use strict";
    var roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
    console.log('roadNetwork: ', roadNetwork);

    ok(roadNetwork instanceof movsim.simulation.roadNetwork.RoadNetwork, 'ring road from factory is a compliant road network');
    ok(roadNetwork.roadSegments.length === 1, '1 road section');
    ok(roadNetwork.roadSegments[0].roadLanes.length === 1, '1 road lane');
    ok(roadNetwork.roadSegments[0].parameters.ringRoad === true, 'is ring road');
    deepEqual(roadNetwork.roadSegments[0].roadLanes[0].vehicles.length, 20, 'with 20 vehicles');
});
