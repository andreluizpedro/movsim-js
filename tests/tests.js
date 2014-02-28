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
    var carDefaultIdmParameters = movsim.carFollowingModel.idmParameters.getDefaultCar();

    ok(carDefaultIdmParameters instanceof movsim.carFollowingModel.idmParameters.IdmParameters);
    deepEqual(carDefaultIdmParameters.v0, 20, 'v0');
    deepEqual(carDefaultIdmParameters.a, 1.2, 'a');
    deepEqual(carDefaultIdmParameters.b, 1.2, 'b');
    deepEqual(carDefaultIdmParameters.T, 1.5, 'T');
    deepEqual(carDefaultIdmParameters.s0, 2, 's0');
    deepEqual(carDefaultIdmParameters.s1, 0, 's1');
});
test('IDM parameters truck default', function () {
    var truckDefaultIdmParameters = movsim.carFollowingModel.idmParameters.getDefaultTruck();

    ok(truckDefaultIdmParameters instanceof movsim.carFollowingModel.idmParameters.IdmParameters);
    deepEqual(truckDefaultIdmParameters.v0, 16, 'v0');
    deepEqual(truckDefaultIdmParameters.a, 0.8 * 1.2, 'a');
    deepEqual(truckDefaultIdmParameters.b, 1.2, 'b');
    deepEqual(truckDefaultIdmParameters.T, 1.2 * 1.5, 'T');
    deepEqual(truckDefaultIdmParameters.s0, 2, 's0');
    deepEqual(truckDefaultIdmParameters.s1, 0, 's1');
});

test('IDM acceleration function', function () {
    var modelParameters = movsim.carFollowingModel.idmParameters.createParameters(20, 1.2, 1.2, 1.5, 2, 0);
	var idmModel = movsim.carFollowingModel.idm;
	idmModel.setParameters(modelParameters);

    ok(modelParameters instanceof movsim.carFollowingModel.idmParameters.IdmParameters);
    //ok(idmModel instanceof movsim.carFollowingModel.idm);
    
    deepEqual(idmModel.getParameters(), modelParameters, 'setter');
    //s, v, vl, v0eff
    // todo 
    var v0eff=modelParameters.v0;
    var maxDifference = 0.0001;
    QUnit.close(idmModel.calculateAccelerationSimple(100000, v0eff, modelParameters.v0, v0eff), 0,  maxDifference);
	QUnit.close(idmModel.calculateAccelerationSimple(100000, 0, modelParameters.v0, v0eff), modelParameters.a, maxDifference);
	QUnit.close(idmModel.calculateAccelerationSimple(100, v0eff, 0.5*v0eff, v0eff), -1.5962, maxDifference);
    
    // todo further situations
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
