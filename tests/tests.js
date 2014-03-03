// https://qunitjs.com/cookbook/

// ok( truthy [, message ] )
// equal( actual, expected [, message ] )
// deepEqual( actual, expected [, message ] )

module('test');
test("hello test", function () {
    ok(1 == "1", "Passed!");
});


module('movsim utilities');
test("namespace function", function () {
    var ns = movsim.namespace('movsim.simulation.roadnetwork');
    deepEqual(ns, movsim.simulation.roadnetwork);
});


module('idm car following model and parameters');
test('IDM parameters car default', function () {
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
    var truckDefaultIdmParameters = movsim.carfollowing.idmParameters.getDefaultTruck();

    ok(truckDefaultIdmParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    deepEqual(truckDefaultIdmParameters.v0, 16, 'v0');
    deepEqual(truckDefaultIdmParameters.a, 0.8 * 1.2, 'a');
    deepEqual(truckDefaultIdmParameters.b, 1.2, 'b');
    deepEqual(truckDefaultIdmParameters.T, 1.2 * 1.5, 'T');
    deepEqual(truckDefaultIdmParameters.s0, 2, 's0');
    deepEqual(truckDefaultIdmParameters.s1, 0, 's1');
});

test('IDM simple acceleration function', function () {
    var modelParameters = movsim.carfollowing.idmParameters.createParameters(20, 1.2, 1.2, 1.5, 2, 0);
	var idmModel = movsim.carfollowing.idm;
	idmModel.setParameters(modelParameters);
    
    //var idmTruck = movsim.carfollowing.idm;
    //var idmTruckParam = movsim.carfollowing.idmParameters.getDefaultTruck();
    //idmTruck.setParameters(idmTruckParam);

    ok(modelParameters instanceof movsim.carfollowing.idmParameters.IdmParameters);
    
    deepEqual(idmModel.getParameters(), modelParameters, 'setter 1');
    //deepEqual(idmTruck.getParameters(), idmTruckParam, 'setter 2' );
    
    //s, v, vl, v0eff
    // todo 
    var v0eff=modelParameters.v0;
    var maxDifference = 0.0001;
    QUnit.close(idmModel.calculateAccelerationSimple(100000, v0eff, modelParameters.v0, v0eff), 0,  maxDifference);
	QUnit.close(idmModel.calculateAccelerationSimple(100000, 0, modelParameters.v0, v0eff), modelParameters.a, maxDifference);
	QUnit.close(idmModel.calculateAccelerationSimple(100, v0eff, 0.5*v0eff, v0eff), -1.5962, maxDifference);
    QUnit.close(idmModel.calculateAccelerationSimple(10, v0eff, 0.5*v0eff, v0eff), -idmModel.getMaxDeceleration(), maxDifference);
    // todo further situations
});

module('vehicle');
test('vehicle parameter', function () {
    var vehicleParameters = movsim.simulation.vehicle.getDefaultParameters();
    var vehicle = movsim.simulation.vehicle.create(vehicleParameters);
    var vehicle2 = movsim.simulation.vehicle.create();

    ok(vehicle instanceof movsim.simulation.vehicle.Vehicle, "type check");
//    deepEqual(vehicle, vehicle2, 'vehicle.create() === vehicle.create(vehicle.getDefaultParameters())');
    ok(vehicle.id !== vehicle2.id, 'two veh with different ids');
    deepEqual(vehicle.position, vehicleParameters.position, 'position');
    deepEqual(vehicle.speed, vehicleParameters.speed, 'speed');
    deepEqual(vehicle.acc, vehicleParameters.acc, 'acc');
    deepEqual(vehicle.length, vehicleParameters.length, 'length');
    deepEqual(vehicle.width, vehicleParameters.width, 'width');

    
});


module('road network');
test('road network', function () {
    var roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
    console.log('roadNetwork: ', roadNetwork);

    ok(roadNetwork instanceof movsim.simulation.roadNetwork.RoadNetwork, 'ring road from factory is a compliant road network');
    ok(roadNetwork.roadSections.length === 1, '1 road section');
    ok(roadNetwork.roadSections[0].roadLanes.length === 1, '1 road lane');
    deepEqual(roadNetwork.roadSections[0].roadLanes[0].vehicles.length, 20, 'with 20 vehicles');
});
