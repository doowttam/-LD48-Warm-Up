WARMUP.zoe = function(spec, my) {
    my = my || {};
    var that = WARMUP.creature(spec, my);

    var jumpStart  = 0;
    var jumpHeight = 50;
    var jumping    = false;
    var jumpSpeed  = 2;
    var moving     = false;

    var frame = 1;

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

        if ( frame <= 9 ) {
            frame++;
        }
        else {
            frame = 1;
        }
    };

    var jump = function() {
        if ( jumping ) {
            return;
        }

        if (!my.map.onPlatform(that)) {
            return;
        }

        WARMUP.resource['jump.wav'].play();

        jumping   = true;
        jumpStart = my.y;
    };

    var move = function() {
        moving = false;

        if ( WARMUP.key.isDown(WARMUP.key.codes.LEFT) ) {
            if ( my.x > 0 ) {
                my.x   = my.x - my.speed;
                moving = true;
            }
        }
        if ( WARMUP.key.isDown(WARMUP.key.codes.RIGHT) ) {
            if ( my.x + my.size < my.canvas.width ) {
                my.x   = my.x + my.speed;
                moving = true;
            }
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

    that.draw = function() {
        my.tick();

        var topLeftY = my.y - my.size;

        if ( frame <= 5 || moving == false ) {
            my.context.drawImage( WARMUP.resource['sprite.png'], 0, 0, 16, 16, my.x, topLeftY, 16, 16 );
        }
        else {
            my.context.drawImage( WARMUP.resource['sprite.png'], 16, 0, 16, 16, my.x, topLeftY, 16, 16 );
        }
    };

    return that;
};
