const emotes = [
    "https://cdn.7tv.app/emote/61c4cf18b3cc6a0abefc8c97/3x",
    "https://static-cdn.jtvnw.net/emoticons/v2/300272604/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_53463131dd7c46dfb74ef209e25d2ab6/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/307047539/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_38b199e51ccb4d57aeca1ea21354aa8a/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/1086325/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/301622790/default/dark/2.0",
    "https://cdn.7tv.app/emote/60bd31df45d2e7506fe2a018/2x",
    "https://cdn.7tv.app/emote/618db963d34608492cc2d6fb/2x",
    "https://cdn.frankerfacez.com/emote/128054/2",
    "https://cdn.betterttv.net/emote/6194b95354f3344f8805fd7b/2x",
    "https://cdn.betterttv.net/emote/60d211128ed8b373e4217d8b/2x",
    "https://cdn.betterttv.net/emote/61060daa2d1eba5400d2bbad/2x",
    "https://cdn.betterttv.net/emote/60d61d228ed8b373e42197f4/2x",
    "https://cdn.betterttv.net/emote/6019cb5282cf6865d553b0d3/2x",
    "https://cdn.betterttv.net/emote/5e87b595acae25096140ca84/2x",
    "https://cdn.betterttv.net/emote/5fd707c6a926f43485ce5e82/2x",
    "https://cdn.betterttv.net/emote/5a8314b61686393232d31027/2x",
    "https://cdn.betterttv.net/emote/618354c71f8ff7628e6c5b03/2x",
    "https://cdn.betterttv.net/emote/61cefa60c8cc7f36d52b217c/2x",
    "https://cdn.betterttv.net/emote/61807e741f8ff7628e6bfbe0/2x",
    "https://cdn.7tv.app/emote/60e4fd747fa83e524442eff8/2x",
    "https://cdn.7tv.app/emote/619fb59915b3ff4a5bb7a90a/2x",
    "https://cdn.betterttv.net/emote/5fc19cede2900c6f07dfc836/2x",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_af715ca82e9145719203afa76710b08c/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_21f1b9cecdd44355961d343f6e88789d/default/dark/2.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_fb1673c5061b4286a802b8b549c91196/default/dark/2.0",
    "https://cdn.7tv.app/emote/61d4bba4752f555bcde9acbb/2x",
    "https://cdn.7tv.app/emote/60ae7b00c4b981d367cd0123/2x",
    "https://cdn.betterttv.net/emote/5ed5943f924aa35e32a6963c/2x",
    "https://cdn.betterttv.net/emote/604104b7306b602acc596df6/2x",
    "https://cdn.betterttv.net/emote/610f7d9e76ea4e2b9f760126/2x",
    "https://cdn.betterttv.net/emote/5f076ee2a2ac620530366f7a/2x",
    "https://cdn.betterttv.net/emote/5e500538e383e37d5d9dd3ec/2x",
    "https://cdn.frankerfacez.com/emote/262149/2",
    "https://cdn.frankerfacez.com/emote/229486/2"
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