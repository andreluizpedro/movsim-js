movsim.namespace('movsim.resources');

(function (ns) {
    "use strict";

    // private vars
    var images = {};
    var sources = {
        car1: '../img/redCarSmall.png',
        car2: '../img/carSmall2.png',
        truck1: '../img/truck1Small.png',
        bgRoundabout: '../img/backgroundParis.gif',
        luechow: '../img/luechow.png',
        ringRoadOneLane: '../img/oneLanesRoadRealistic_wideBoundaries_cropped2.png'
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
            };
            images[src].src = sources[src];
        }
    };

    ns.getImage = function (imgName) {
        if (images[imgName]) {
            return images[imgName];
        }
        throw new Error(imgName + ' image not defined in movsim.ressources');
    };

    ns.getImages = function () {
        return images;
    };

    return ns;

})(movsim.resources);