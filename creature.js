WARMUP.creature = function(spec, my) {
    var that = {};
    my = my || {};

    my.speed = 3;

    my.size = spec.size;
    my.x    = spec.startX;
    my.y    = spec.startY;

    my.context = spec.context;
    my.canvas  = spec.canvas;
    my.map     = spec.map;

    my.tick = function() {};

    that.draw = function() {
        my.tick();

        my.context.fillStyle = "black";
        
        var topLeftY = my.y - my.size;

        my.context.fillRect(my.x, topLeftY, my.size, my.size);
    };

    that.getPos = function() {
        return {
            "x": my.x,
            "y": my.y,
            "size": my.size
        };
    };

    that.canFall = function() {
        return !my.map.onPlatform(that);
    };

    that.fall = function(rate) {
        var nextPlatform       = my.map.getNextPlatform(that);
        var distanceToPlatform = nextPlatform - my.y;

        var fallRate = distanceToPlatform > rate ? rate : distanceToPlatform;

        my.y = my.y + fallRate;
    };
    
    return that;
};