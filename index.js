let emoteData = [];
(async () => {
    let bttvFetch = await fetch(`https://api.betterttv.net/3/cached/users/twitch/38746172`);
    let bttvData = await bttvFetch.json();

    let bttvGlobalDataFetch = await fetch("https://api.betterttv.net/3/cached/emotes/global");
    let bttvGlobalData = await bttvGlobalDataFetch.json();

    let ffzDataFetch = await fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/38746172`);
    let ffzData = await ffzDataFetch.json();

    // Fetching channel and shared BTTV emotes
    if (bttvData) {
        for (let i = 0; i < bttvData["channelEmotes"].length; i++) {
            emoteData.push({ name: bttvData["channelEmotes"][i]["code"], link: `https://cdn.betterttv.net/emote/${bttvData["channelEmotes"][i]["id"]}/3x` });
        }
        for (let i = 0; i < bttvData["sharedEmotes"].length; i++) {
            emoteData.push({ name: bttvData["sharedEmotes"][i]["code"], link: `https://cdn.betterttv.net/emote/${bttvData["sharedEmotes"][i]["id"]}/3x` });
        }
    }

    // BTTV Global emotes
    if (bttvGlobalData) {
        for (let i = 0; i < bttvGlobalData.length; i++) {
            emoteData.push({ name: bttvGlobalData[i]["code"], link: `https://cdn.betterttv.net/emote/${bttvGlobalData[i]["id"]}/3x` });
        }
    }

    // Fetching FFZ emotes
    if (ffzData) {
        for (let i = 0; i < ffzData.length; i++) {
            emoteData.push({ name: ffzData[i]["code"], link: `https://cdn.betterttv.net/frankerfacez_emote/${ffzData[i]["id"]}/4` });
        }
    }

    let sevenTVDataFetch = await fetch("https://api.7tv.app/v2/users/esfandtv/emotes");
    let sevenTVData = await sevenTVDataFetch.json();
    if (sevenTVData) {
        for (let i = 0; i < sevenTVData.length; i++) {
            emoteData.push({ name: sevenTVData[i]["name"], link: `https://cdn.7tv.app/emote/${sevenTVData[i]["id"]}/4x` });
        }
    }
    
    let subemotes = await fetch("https://api.retpaladinbot.com/emotes/esfandtv");
    let subData = await subemotes.json();
    if (subData) {
        for (let i = 0; i < subData["data"].length; i++) {
            emoteData.push({ name: subData["data"][i]["Name"], link: subData["data"][i]["URL"] })
        }
    }

})();

(function ($, window, undefined) {
    $.fn.marqueeify = function (options) {
        var settings = $.extend({
            horizontal: true,
            vertical: true,
            speed: 50, // In pixels per second
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
            let randomEmoteIndex = Math.floor(Math.random() * emoteData.length);
            $('#emoteName').text(emoteData[randomEmoteIndex]["name"])
            $('img').attr('src', emoteData[randomEmoteIndex]["link"]);
        }
    });
});
