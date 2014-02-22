ts.namespace('ts.project');

(function (ns) {

    // private vars
    var name;
    var accelerationModel;
    var laneChangeModel;

    // public methods
    ns.setProject = function (options) {
        name = options.name || 'ring road';
        accelerationModel = options.accelerationModel || 'IDM';
        laneChangeModel = options.laneChangeModel || 'MOBIL';
    };

    ns.getName = function () {
        return name;
    };

    ns.getAccelerationModel = function () {
        return accelerationModel;
    };

    ns.getLaneChangeModel = function () {
        return laneChangeModel;
    };

    return ns;

})(ts.project);
