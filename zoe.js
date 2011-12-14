WARMUP.zoe = function(spec, my) {
    my = my || {};
    var that = WARMUP.creature(spec, my);

    var jumpStart  = 0;
    var jumpHeight = 50;
    var jumping    = false;
    var jumpSpeed  = 2;

    my.tick = function() {
        if ( jumping ) {
            if ( jumpStart - my.y < jumpHeight ) {
                my.y = my.y - jumpSpeed;
            }
            else {
                jumping = false;
            }
        }
        move();
    };

    var jump = function() {
        if ( jumping ) {
            return;
        }

        if (!my.map.onPlatform(that)) {
            return;
        }

        jumping   = true;
        jumpStart = my.y;
    };

    var move = function() {
        if ( WARMUP.key.isDown(WARMUP.key.codes.LEFT) ) {
            if ( my.x <= 0 ) {
                return;
            }

            my.x = my.x - my.speed;
        }
        if ( WARMUP.key.isDown(WARMUP.key.codes.RIGHT) ) {
            if ( my.x + my.size >= my.canvas.width ) {
                return;
            }

            my.x = my.x + my.speed;
        }
        if ( WARMUP.key.isDown(WARMUP.key.codes.UP) ) {
            jump(jumpHeight);
        }
    };

    that.canFall = function() {
        if ( jumping ) {
            return false;
        }
        return !my.map.onPlatform(that);
    };

    that.hit = function(baddie) {
        var stompLine = [ my.x + 5, my.x + (my.size - 5) ];

        var baddiePos = baddie.getPos();

        if ( baddiePos.x <= stompLine[0] 
             && baddiePos.x + baddiePos.size >= stompLine[1]
             && my.y >= baddiePos.y - baddiePos.size
             && my.y < baddiePos.y 
           ) {
            return true;
        }

        return false;
    };


    return that;
};
