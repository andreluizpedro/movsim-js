ts.namespace('ts.res');

(function (ns) {

    // private vars
    var images = {};
    var sources = {
        car1: '../img/redCarSmall.png',
        car2: '../img/blueCarSmall.png',
        bgRoundabout: '../img/backgroundParis.gif',
        luechow: '../img/luechow.png'
    };

    // public functions
    /**
     * Loads all images declared in sources variable and stores them in images variable.
     * After all images are loaded the callback function is called.
     * @param {Function} callback - Called when all images are loaded.
     */
    ns.loadResources = function (callback) {
        var loadedImages = 0;
        var numImagesToLoad = Object.keys(sources).length;
        for (var src in sources) {
            images[src] = new Image();
            images[src].onload = function () {
                loadedImages++;
                if (loadedImages >= numImagesToLoad) {
                    callback();
                }
            }
            images[src].src = sources[src];
        }
    };

    ns.getImage = function (imgName) {
        if (images[imgName]) {
            return images[imgName]
        }
        throw new Error(imgName + ' image not defined in ts.res');
    };

    ns.getImages = function () {
        return images;
    };

    return ns;

})(ts.res);