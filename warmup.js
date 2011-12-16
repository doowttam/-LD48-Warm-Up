WARMUP = function() {

    var canvas  = null;
    var context = null;

    var frameInterval = null;

    var zoe     = null;
    var gravity = null;
    var map     = null;
    var baddie  = null;

    var creatures = [];

    var loadResources = function( playCallback ) {
        var imageCount = 0;
        var audioCount = 0;

        var images = [ 'sprite.png' ];
        var audios = [ 'jump.wav', 'squash.wav' ];

        var resourceOnLoad = function(type) {
            console.info(type);

            if ( type == 'image' ) {
                imageCount++;
            }
            if ( type == 'audio' ) {
                audioCount++;
            }

            if ( imageCount == images.length && audioCount == audios.length ) {
                playCallback();
            }
        };

        for ( var i = 0; i < images.length; i++ ) {
            var img    = new Image();
            img.src    = images[i];
            img.onload = function() { resourceOnLoad('image'); };
            WARMUP.resource[images[i]] = img;
        }

        for ( var i = 0; i < audios.length; i++ ) {
            var sound          = new Audio();
            sound.src          = audios[i];
            sound.onloadeddata = function() { resourceOnLoad('audio'); };
            WARMUP.resource[audios[i]] = sound;
        }
    }

    return {
        init: function(doc, win) {
            canvas  = doc.getElementById("game_canvas");
            context = canvas.getContext("2d");

            map = WARMUP.map({
                "canvas":  canvas,
                "context": context,
                "platforms": [
                    [ 0, 300, canvas.width, 300 ],
                    [ 60, 260, 100, 260 ],
                    [ 100, 220, 140, 220 ],
                    [ 340, 260, 375, 260 ]
                ]
            });

            zoe = WARMUP.zoe({
                "context": context,
                "canvas":  canvas,
                "startX":  350,
                "startY":  40,
                "size":    16,
                "map":     map,
                "color":   "black"
            });

            baddie = WARMUP.baddie({
                "context": context,
                "canvas":  canvas,
                "startX":  120,
                "startY":  40,
                "size":    16,
                "map":     map,
                "color":   "red"
            });

            gravity = WARMUP.gravity();

            creatures.push(zoe);
            creatures.push(baddie);

            win.onkeyup = function(e) {
                WARMUP.key.onKeyUp(e);
            };
            win.onkeydown = function(e) {
                WARMUP.key.onKeyDown(e);
            };

            loadResources(function() {
                frameInterval = WARMUP.play();
            });
        },

        play: function() {
            return setInterval( function() {
                WARMUP.drawFrame();
            }, 20 );
        },

        pause: function() {
            if ( frameInterval ) {

                clearInterval( frameInterval );
                clearInterval = null;

                context.font = "bold 12px sans-serif";
                context.textAlign = "right";
                context.textBaseline = "top";
                context.fillText("PAUSED", canvas.width - 20, 20);
            }
            else {
                frameInterval = this.play();
            }
        },

        resetCanvas: function() {
            canvas.width = canvas.width;
        },

        drawFrame: function() {
            this.resetCanvas();

            gravity.pull(creatures);

            map.draw();
            zoe.draw();
            baddie.draw();
            
            if ( zoe.hit(baddie) ) {
                baddie.faint();
            }
        },

        resource: {}
    };
}();
