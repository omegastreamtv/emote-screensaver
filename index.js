const emotes = [
    "https://cdn.7tv.app/emote/61c4cf18b3cc6a0abefc8c97/3x",
    "https://static-cdn.jtvnw.net/emoticons/v2/300272604/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_53463131dd7c46dfb74ef209e25d2ab6/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/307047539/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_38b199e51ccb4d57aeca1ea21354aa8a/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/1086325/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/301622790/default/dark/3.0",
    "https://cdn.7tv.app/emote/60bd31df45d2e7506fe2a018/3x",
    "https://cdn.7tv.app/emote/618db963d34608492cc2d6fb/3x",
    "https://cdn.frankerfacez.com/emote/128054/4",
    "https://cdn.betterttv.net/emote/6194b95354f3344f8805fd7b/3x",
    "https://cdn.betterttv.net/emote/60d211128ed8b373e4217d8b/3x",
    "https://cdn.betterttv.net/emote/61060daa2d1eba5400d2bbad/3x",
    "https://cdn.betterttv.net/emote/60d61d228ed8b373e42197f4/3x",
    "https://cdn.betterttv.net/emote/6019cb5282cf6865d553b0d3/3x",
    "https://cdn.betterttv.net/emote/5e87b595acae25096140ca84/3x",
    "https://cdn.betterttv.net/emote/5fd707c6a926f43485ce5e82/3x",
    "https://cdn.betterttv.net/emote/5a8314b61686393232d31027/3x",
    "https://cdn.betterttv.net/emote/618354c71f8ff7628e6c5b03/3x",
    "https://cdn.betterttv.net/emote/61cefa60c8cc7f36d52b217c/3x",
    "https://cdn.betterttv.net/emote/61807e741f8ff7628e6bfbe0/3x",
    "https://cdn.7tv.app/emote/60e4fd747fa83e524442eff8/3x",
    "https://cdn.7tv.app/emote/619fb59915b3ff4a5bb7a90a/3x",
    "https://cdn.betterttv.net/emote/5fc19cede2900c6f07dfc836/3x",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_af715ca82e9145719203afa76710b08c/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_21f1b9cecdd44355961d343f6e88789d/default/dark/3.0",
    "https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_fb1673c5061b4286a802b8b549c91196/default/dark/3.0",
    "https://cdn.7tv.app/emote/61d4bba4752f555bcde9acbb/3x",
    "https://cdn.7tv.app/emote/60ae7b00c4b981d367cd0123/3x",
    "https://cdn.betterttv.net/emote/5ed5943f924aa35e32a6963c/3x",
    "https://cdn.betterttv.net/emote/604104b7306b602acc596df6/3x",
    "https://cdn.betterttv.net/emote/610f7d9e76ea4e2b9f760126/3x",
    "https://cdn.betterttv.net/emote/5f076ee2a2ac620530366f7a/3x",
    "https://cdn.betterttv.net/emote/5e500538e383e37d5d9dd3ec/3x",
    "https://cdn.frankerfacez.com/emote/262149/4",
    "https://cdn.frankerfacez.com/emote/229486/4",
    "https://cdn.7tv.app/emote/615636736251d7e000db35ec/3x",
    "https://cdn.7tv.app/emote/60caf39c3591d98c4059c5c0/3x",
    "https://cdn.betterttv.net/emote/61cd58a7c8cc7f36d52b01a9/3x",
    "https://cdn.betterttv.net/emote/609431bc39b5010444d0cbdc/3x",
    "https://cdn.betterttv.net/emote/603451b77c74605395f3295d/3x",
    "https://cdn.betterttv.net/emote/5ffd66da465444316bf608ab/3x",
    "https://cdn.betterttv.net/emote/608c699d39b5010444d094ef/3x",
    "https://cdn.betterttv.net/emote/618019f01f8ff7628e6beb1a/3x",
    "https://cdn.betterttv.net/emote/61cef923c8cc7f36d52b2168/3x",
    "https://cdn.betterttv.net/emote/5fa01b3740eb9502e22399bb/3x",
    "https://cdn.betterttv.net/emote/5f99d6d3710f8302f0c96316/3x",
    "https://cdn.betterttv.net/emote/603fcd96306b602acc59651e/3x",
    "https://cdn.betterttv.net/emote/60b5121ff8b3f62601c363a2/3x",
    "https://cdn.betterttv.net/emote/5f9b383540eb9502e2234d56/3x",
    "https://cdn.betterttv.net/emote/60ff190b2d1eba5400d1b4b6/3x",
    "https://cdn.betterttv.net/emote/617fba2c1f8ff7628e6be0da/3x",
    "https://cdn.betterttv.net/emote/617fba081f8ff7628e6be0cb/3x"

];

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

    // {name: "", link: ""}
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