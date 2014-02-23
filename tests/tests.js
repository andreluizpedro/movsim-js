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


module('car following model parameters');
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

module('road network');
test('road network', function () {
    var roadNetwork = movsim.simulation.roadNetworkFactory.createRingRoad(2000, 1);
    console.log('roadNetwork: ', roadNetwork);

    ok(roadNetwork instanceof movsim.simulation.roadNetwork.RoadNetwork, 'ring road from factory is a compliant road network');
    ok(roadNetwork.roadSections.length === 1, '1 road section');
    ok(roadNetwork.roadSections[0].roadLanes.length === 1, '1 road lane');
    deepEqual(roadNetwork.roadSections[0].roadLanes[0].vehicles.length, 20, 'with 20 vehicles');
});