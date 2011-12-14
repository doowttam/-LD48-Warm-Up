WARMUP.gravity = function(spec, my) {
    var that = {};
    my = my || {};

    var rate = 2;

    var drop = function(item) {
        if ( item.canFall() ) {
            item.fall(rate);
        }
    }

    that.pull = function( items ) {
        for ( var i = 0; i < items.length; i++ ) {
            drop( items[i] );
        }
    };

    return that;
};