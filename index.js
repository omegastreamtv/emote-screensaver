const emotes = [
    "https://cdn.betterttv.net/emote/6017e691f1cfbf65dbe15033/3x",
    "https://cdn.betterttv.net/emote/61b07d7a002cdeedc21eb069/3x",
    "https://cdn.betterttv.net/emote/6168eb62054a252a431f208a/3x",
    "https://cdn.betterttv.net/emote/5d61b1b14932b21d9c332f1b/3x",
    "https://static-cdn.jtvnw.net/emoticons/v2/120232/default/dark/3.0",
    "https://cdn.frankerfacez.com/emote/309114/4",
    "https://cdn.frankerfacez.com/emote/243789/4",
    "https://cdn.frankerfacez.com/emote/236895/4",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_82e0a6d4b07c4bf7a80f8da94a79d144/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_33ed49acc9dd47eca43b4bee741d73b3/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_38b199e51ccb4d57aeca1ea21354aa8a/default/dark/3.0",
    "https://cdn.betterttv.net/emote/5590b223b344e2c42a9e28e3/3x",
    "https://cdn.betterttv.net/emote/61353547af28e956864c1b25/3x",
    "https://cdn.betterttv.net/emote/5c447084f13c030e98f74f58/3x",
    "https://cdn.betterttv.net/emote/5e87b595acae25096140ca84/3x",
    "https://cdn.betterttv.net/emote/5f1b0186cf6d2144653d2970/3x",
    "https://cdn.betterttv.net/emote/617fb9861f8ff7628e6be0b8/3x",
    "https://cdn.frankerfacez.com/emote/139407/4",
    "https://cdn.7tv.app/emote/61d74d13600369a98b37ec20/3x",
    "https://static-cdn.jtvnw.net/emoticons/v2/58765/default/dark/3.0",
    "https://cdn.betterttv.net/emote/6059546b7493072efdeb2c8f/3x",
    "https://cdn.betterttv.net/emote/5f3f650bafb6965d6e7c3e68/3x",
    "https://cdn.betterttv.net/emote/60a0ab7b67644f1d67e8707c/3x",
    "https://cdn.betterttv.net/emote/609431bc39b5010444d0cbdc/3x",
    "https://cdn.betterttv.net/emote/61d4dce106fd6a9f5bdf5fd5/3x",
    "https://cdn.betterttv.net/emote/6066beb6a407570b72f298fd/3x",
    "https://cdn.frankerfacez.com/emote/652079/4",
    "https://cdn.betterttv.net/emote/603ab5387c74605395f35825/3x",
    "https://cdn.betterttv.net/emote/5b7e01fbe429f82909e0013a/3x",
    "https://cdn.betterttv.net/emote/608c66e639b5010444d094d4/3x",
    "https://cdn.betterttv.net/emote/5a8314b61686393232d31027/3x",
];

(function ($, window, undefined) {
    $.fn.marqueeify = function (options) {
        var settings = $.extend({
            horizontal: true,
            vertical: true,
            speed: 100, // In pixels per second
            container: $(this).parent(),
            bumpEdge: function () { }
        }, options);

        return this.each(function () {
            var containerWidth, containerHeight, elWidth, elHeight, move, getSizes,
                $el = $(this);

            getSizes = function () {

                containerWidth = settings.container.outerWidth();
                containerHeight = settings.container.outerHeight();
                elWidth = $el.outerWidth();
                elHeight = $el.outerHeight();
            };

            move = {
                right: function () {
                    getSizes();
                    $el.animate({ left: (containerWidth - elWidth) }, {
                        duration: ((containerWidth / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
                            settings.bumpEdge();
                            move.left();
                        }
                    });
                },
                left: function () {
                    getSizes();
                    $el.animate({ left: 0 }, {
                        duration: ((containerWidth / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
                            settings.bumpEdge();
                            move.right();
                        }
                    });
                },
                down: function () {
                    getSizes();
                    $el.animate({ top: (containerHeight - elHeight) }, {
                        duration: ((containerHeight / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
                            settings.bumpEdge();
                            move.up();
                        }
                    });
                },
                up: function () {
                    getSizes();
                    $el.animate({ top: 0 }, {
                        duration: ((containerHeight / settings.speed) * 1000), queue: false, easing: "linear", complete: function () {
                            settings.bumpEdge();
                            move.down();
                        }
                    });
                }
            };

            getSizes();

            if (settings.horizontal) {
                move.right();
            }
            if (settings.vertical) {
                move.down();
            }

            // Make that shit responsive!
            $(window).resize(function () {
                getSizes();
            });
        });
    };
})(jQuery, window);

$(document).ready(function () {

    $('.marquee').marqueeify({
        speed: 150,
        bumpEdge: function () {
            $('img').attr('src', emotes[Math.floor(Math.random() * emotes.length)]);
        }
    });
});