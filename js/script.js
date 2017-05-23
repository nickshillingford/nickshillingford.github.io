// JQUERY KEYFRAMES LIBRARY - CDN LINK NOT WORKING SO I HAD TO INCLUDE THE CODE HERE
(function() {
    var animationSupport = false,
        animationString = 'animation',
        vendorPrefix = prefix = '',
        domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'];

    $(document).ready(function(){
        var style = document.body.style;
        if( style.animationName !== undefined ) { animationSupport = true; }

        if( animationSupport === false ) {
            for( var i = 0; i < domPrefixes.length; i++ ) {
                if( style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                    prefix = domPrefixes[ i ];
                    animationString = prefix + 'Animation';
                    vendorPrefix = '-' + prefix.toLowerCase() + '-';
                    animationSupport = true;
                    break;
                }
            }
        }
    });


    var $createKeyframeStyleTag = function(id, css) {
        if($.keyframe.debug){ console.log(id + " " + css); }
        return $("<style>" + css + "</style>").attr({
            "class": "keyframe-style",
            id: id,
            type: "text/css"
        }).appendTo("head");
    };

    $.keyframe = {
        debug: false,
        getVendorPrefix: function() {
            return vendorPrefix;
        },
        isSupported: function() {
            return animationSupport;
        },
        generate: function(frameData) {
            var frameName = frameData.name || "";
            var css = "@" + vendorPrefix + "keyframes " + frameName + " {";

            for (var key in frameData) {
                if (key !== "name" && key !== "media" && key !== "complete") {
                    css += key + " {";

                    for (var property in frameData[key]) {
                        css += property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }
            if(window.PrefixFree)
                css = PrefixFree.prefixCSS(css + "}");
            else 
                css += "}";
            if(frameData.media){
                css = "@media " + frameData.media + "{" + css + "}";
            }

            var $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                var $elems = $("*").filter(function() {
                    return this.style[animationString + "Name"] === frameName;
                });

                $elems.each(function() {
                    var $el = $(this);
                    var options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $createKeyframeStyleTag(frameName, css);
            }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                this.generate(frameData);
            }
        }
    };

    var animationPlayState = "animation-play-state";
    var playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        
        var animObjToStr = function(obj){
            obj = $.extend({
                duration: '0s',
                timingFunction: "ease",
                delay: '0s',
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [obj.name, obj.duration, obj.timingFunction, obj.delay, obj.iterationCount, obj.direction, obj.fillMode].join(" ");
        };

        var animationcss = "";

        if($.isArray(frameOptions)){
            var frameOptionsStrings = [];
            for(var i = 0; i < frameOptions.length; i++){
                if (typeof frameOptions[i] === 'string') {
                    frameOptionsStrings.push(frameOptions[i]);
                }else{
                    frameOptionsStrings.push(animObjToStr(frameOptions[i]));
                }
            }
            animationcss = frameOptionsStrings.join(", ");
        }else if (typeof frameOptions === 'string') {
            animationcss = frameOptions;
        }else{
            animationcss = animObjToStr(frameOptions);
        }

        var animationkey = vendorPrefix + "animation";
        var pfx = ["webkit", "moz", "MS", "o", ""];

        if(!callback && frameOptions.complete){
            callback = frameOptions.complete;
        }

        var _prefixEvent = function(element, type, callback) {
            for(var i = 0; i < pfx.length; i++){
                if (!pfx[i]) {
                    type = type.toLowerCase();
                }
                var evt = pfx[i] + type;
                element.off(evt).on(evt, callback);
            }
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);
            if($.keyframe.debug){
                console.group();
                if(vendorPrefix){ console.log("Vendor Prefix: " + vendorPrefix); }
                console.log("Style Applied: " + animationcss);
                var testCss = $el.css(animationkey);
                console.log("Rendered Style: " + (testCss ? testCss : $el[0].style.animation));
                console.groupEnd();
            }
            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
        return this;
    };

    $createKeyframeStyleTag("boost-keyframe", " .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");

}).call(this);
// END OF JQUERY KEYFRAMES LIBRARY

const ogColor = "#D2D7D3"; 
const minTop = 35; 
const maxTop = 60; 
const minLeft = 25;
const midLeft = 45;
const maxLeft = 65;

var count = 0;
var timer = 0;
var delay = 1;
var pos = 0;
var x = 0;

var ids = ["two", "three", "four", "five", "six"];
var strs = ['Music','Fitness','Geometry','Outdoors','New York','JavaScript'];
var texts = ["name", "info", "love", "also", "interest"];

var ls = [6.5, 4, 0.5, 1.3, 0.5, 0];
var widths = [100, 270, 250, 75, 160];
var heights = [30, 30, 50, 30, 30];
var delays = [0.8, 1, 1.5, 2, 2.3];
        
setTimeout(function() {
    $("#greet").css("visibility", "visible");
}, 1500);//1500
        
timer = setInterval(function() {
    revealBubbles();
}, 1500);//1500
        
function revealBubbles() {
      
    $.keyframe.define([{
        name: 'expand' + count,
        '0%': {'background': "#D2D7D3",'width': '0px','height': '0px'},
        '30%,100%': {'width': widths[count] + 'px'},
        '100%': {'background': "#D2D7D3",'height': heights[count] + 'px'}
    }]);
            
    $("#" + ids[count]).playKeyframe({
        name: 'expand' + count,duration: '0.8s',timingFunction: 'linear', 
        delay: delays[count] + 's',direction: 'normal',fillMode: 'forwards',
        complete: function() {
            $("#" + texts[0]).css("visibility", "visible");
            texts.shift();
        }
    });

    count++;
    
    // count > 5
    if (count > 4) {
        clearInterval(timer);
    }
}
        
setTimeout(function() {
    $("#heart").css("visibility", "visible");
}, 10600);
        
function square() {
    $("#heart").css("visibility", "hidden");
    $("#one").playKeyframe('square1 3s ease-in-out 0s normal forwards');
    $("#two").playKeyframe('square2 3s ease-in-out 0s normal forwards');
    $("#three").playKeyframe('square3 3s ease-in-out 0s normal forwards');
    $("#four").playKeyframe('square4 3s ease-in-out 0s normal forwards');
    $("#five").playKeyframe('square5 3s ease-in-out 0s normal forwards');
    $("#six").playKeyframe({name: 'square6', duration: '3s', timingFunction: 'ease-in-out', 
                            delay: '0s', direction: 'normal', fillMode: 'forwards',
                            complete: function() {$("#heart").css("visibility", "visible");}});
}

function spin() {
    $("#heart").css("visibility", "hidden");
    $("#one").playKeyframe('spin1 5s ease-in-out 0s normal forwards');
    $("#two").playKeyframe('spin2 5.1s ease-in-out 0s normal forwards');
    $("#three").playKeyframe('spin3 5.05s ease-in-out 0s normal forwards');
    $("#four").playKeyframe('spin4 5.15s ease-in-out 0s normal forwards');
    $("#five").playKeyframe('spin5 5s ease-in-out 0s normal forwards');
    $("#six").playKeyframe({name: 'spin6', duration: '5.05s', timingFunction: 'ease-in-out', 
                            delay: '0s', direction: 'normal', fillMode: 'forwards',
                            complete: function() {$("#heart").css("visibility", "visible")}});
}

function playAnimation() {
    ((x % 2) == 0) ? square() : spin();
    x++;
}

/*SQUARE ANIMATION*/
        $.keyframe.define([ { name: 'square1', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '40px','height': '20px','top':'18%','left':'23%'},
                              '20%': {'background': '#1abc9c','border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '30%': {'top':minTop+'%','left':midLeft+'%'},
                              '40%': {'top':minTop+'%','left':maxLeft+'%'},
                              '50%': {'top':maxTop+'%','left':maxLeft+'%'},
                              '60%': {'top':maxTop+'%','left':midLeft+'%'},
                              '70%': {'top':maxTop+'%','left':minLeft+'%'},
                              '80%': {'background': '#1abc9c','border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '40px', 'height': '20px','top':'18%','left':'23%'}
                            } ]);
        
        $.keyframe.define([ { name: 'square2', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '70px','height': '22.5px','top':'26%','left':'23%'},
                              '20%': {'background': '#34495e','border-radius': '100px','width': '1px','height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '30%': {'border-radius': '100px','width': '1px','height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '40%': {'border-radius': '100px','width': '1px','height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '50%': {'border-radius': '100px','width': '1px','height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '60%': {'border-radius': '100px','width': '1px','height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '70%': {'border-radius': '100px','width': '1px','height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '80%': {'background': '#34495e','border-radius': '100px','width': '1px','height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '70px', 'height': '22.5px','top':'26%','left':'23%'} 
                            } ]);
        
        $.keyframe.define([ { name: 'square3', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '190px','height': '22.5px','top':'34%','left':'23%'},
                              '20%': {'background': '#e67e22','border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '30%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '40%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '50%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '60%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '70%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '80%': {'background': '#e67e22','border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '190px', 'height': '22.5px','top':'34%','left':'23%'}
                            } ]);
        
        $.keyframe.define([ { name: 'square4', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '190px','height': '45px','top':'48%','left':'23%'},
                              '20%': {'background': '#34495e','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '30%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '40%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '50%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '60%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '70%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '80%': {'background': '#34495e','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '190px', 'height': '45px','top':'48%','left':'23%'}
                            } ]);
        
        $.keyframe.define([ { name: 'square5', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '50px','height': '22.5px','top':'59%','left':'23%'},
                              '20%': {'background': '#9b59b6','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '30%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '40%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '50%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '60%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '70%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '80%': {'background': '#9b59b6','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '50px', 'height': '22.5px','top':'59%','left':'23%'}
                            } ]);
        
        $.keyframe.define([ { name: 'square6', 
                              '0%': {'background': ogColor,'border-radius': '3px','width': '100px','height': '22.5px','top':'67%','left':'23%'},
                              '20%': {'background': '#1abc9c','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '30%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':midLeft+'%'},
                              '40%': {'border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':minLeft+'%'},
                              '50%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':minLeft+'%'},
                              '60%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':midLeft+'%'},
                              '70%': {'border-radius': '100px','width': '1px', 'height': '1px','top':minTop+'%','left':maxLeft+'%'},
                              '80%': {'background': '#1abc9c','border-radius': '100px','width': '1px', 'height': '1px','top':maxTop+'%','left':maxLeft+'%'},
                              '100%': {'background': ogColor,'border-radius': '3px','width': '100px', 'height': '22.5px','top':'67%','left':'23%'}
                            } ]);
/*SQUARE ANIMATION*/

/* SPIN ANIMATION*/
$.keyframe.define([{ 'name': 'spin1',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'40px','height':'20px','top':'18%','left':'23%'},
                     '5%': {'background':'#4285F4','border-radius':'100px','width':'1px','height':'1px','top':'24%','left':'45%'},
                     '10%': {'transform':'translate(-25px)'},
                     '20%': {'transform':'translate(25px)'},
                     '30%': {'transform':'translate(-25px)'},
                     '40%': {'transform':'translate(25px)'},
                     '50%': {'transform':'translate(-25px)'},
                     '60%': {'transform':'translate(25px)'},
                     '70%': {'transform':'translate(-25px)'},
                     '80%': {'transform':'translate(25px)'},
                     '90%': {'transform':'translate(-25px)'},
                     '95%': {'background':'#4285F4','border-radius':'100px','width':'1px','height':'1px','top':'24%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'40px','height': '20px','top':'18%','left':'23%'}
    
}]);

$.keyframe.define([{ 'name': 'spin2',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'70px','height':'22.5px','top':'26%','left':'23%'},
                     '5%': {'background':'#EA4335','border-radius':'100px','width':'1px','height':'1px','top':'34%','left':'45%'},
                     '10%': {'transform':'translate(50px)'},
                     '20%': {'transform':'translate(-50px)'},
                     '30%': {'transform':'translate(50px)'},
                     '40%': {'transform':'translate(-50px)'},
                     '50%': {'transform':'translate(50px)'},
                     '60%': {'transform':'translate(-50px)'},
                     '70%': {'transform':'translate(50px)'},
                     '80%': {'transform':'translate(-50px)'},
                     '90%': {'transform':'translate(50px)'},
                     '95%': {'background':'#EA4335','border-radius':'100px','width':'1px','height':'1px','top':'34%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'70px','height': '22.5px','top':'26%','left':'23%'}
    
}]);

$.keyframe.define([{ 'name': 'spin3',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'190px','height':'22.5px','top':'34%','left':'23%'},
                     '5%': {'background':'#FBBC05','border-radius':'100px','width':'1px','height':'1px','top':'44%','left':'45%'},
                     '10%': {'transform':'translate(-35px)'},
                     '20%': {'transform':'translate(35px)'},
                     '30%': {'transform':'translate(-35px)'},
                     '40%': {'transform':'translate(35px)'},
                     '50%': {'transform':'translate(-35px)'},
                     '60%': {'transform':'translate(35px)'},
                     '70%': {'transform':'translate(-35px)'},
                     '80%': {'transform':'translate(35px)'},
                     '90%': {'transform':'translate(-35px)'},
                     '95%': {'background':'#FBBC05','border-radius':'100px','width':'1px','height':'1px','top':'44%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'190px','height': '22.5px','top':'34%','left':'23%'}
    
}]);

$.keyframe.define([{ 'name': 'spin4',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'190px','height':'45px','top':'48%','left':'23%'},
                     '5%': {'background':'#4285F4','border-radius':'100px','width':'1px','height':'1px','top':'54%','left':'45%'},
                     '10%': {'transform':'translate(36px)'},
                     '20%': {'transform':'translate(-36px)'},
                     '30%': {'transform':'translate(36px)'},
                     '40%': {'transform':'translate(-36px)'},
                     '50%': {'transform':'translate(36px)'},
                     '60%': {'transform':'translate(-36px)'},
                     '70%': {'transform':'translate(36px)'},
                     '80%': {'transform':'translate(-36px)'},
                     '90%': {'transform':'translate(36px)'},
                     '95%': {'background':'#4285F4','border-radius':'100px','width':'1px','height':'1px','top':'54%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'190px','height': '45px','top':'48%','left':'23%'}
    
}]);

$.keyframe.define([{ 'name': 'spin5',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'50px','height':'22.5px','top':'59%','left':'23%'},
                     '5%': {'background':'#34A853','border-radius':'100px','width':'1px','height':'1px','top':'64%','left':'45%'},
                     '10%': {'transform':'translate(-25px)'},
                     '20%': {'transform':'translate(25px)'},
                     '30%': {'transform':'translate(-25px)'},
                     '40%': {'transform':'translate(25px)'},
                     '50%': {'transform':'translate(-25px)'},
                     '60%': {'transform':'translate(25px)'},
                     '70%': {'transform':'translate(-25px)'},
                     '80%': {'transform':'translate(25px)'},
                     '90%': {'transform':'translate(-25px)'},
                     '95%': {'background':'#34A853','border-radius':'100px','width':'1px','height':'1px','top':'64%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'50px','height': '22.5px','top':'59%','left':'23%'}
    
}]);

$.keyframe.define([{ 'name': 'spin6',
                     '0%': {'background':ogColor,'border-radius':'3px','width':'100px','height':'22.5px','top':'67%','left':'23%'},
                     '5%': {'background':'#EA4335','border-radius':'100px','width':'1px','height':'1px','top':'74%','left':'45%'},
                     '10%': {'transform':'translate(20px)'},
                     '20%': {'transform':'translate(-20px)'},
                     '30%': {'transform':'translate(20px)'},
                     '40%': {'transform':'translate(-20px)'},
                     '50%': {'transform':'translate(20px)'},
                     '60%': {'transform':'translate(-20px)'},
                     '70%': {'transform':'translate(20px)'},
                     '80%': {'transform':'translate(-20px)'},
                     '90%': {'transform':'translate(20px)'},
                     '95%': {'background':'#EA4335','border-radius':'100px','width':'1px','height':'1px','top':'74%','left':'45%'},
                     '100%': {'background':ogColor,'border-radius':'3px','width':'100px','height': '22.5px','top':'67%','left':'23%'}
    
}]);

$.keyframe.define([{
    'name': 'shake',
    '0%': {'left': '23%','width':'100px','height':'22.5px','background':ogColor},
    '10%': {'left': '30%'},'20%': {'left': '21%'},'30%': {'left': '30%'},
    '40%': {'left': '21%'},'50%': {'left': '30%'},'60%': {'left': '21%'},
    '70%': {'left': '30%'},'80%': {'left': '21%'},'90%': {'left': '30%'},
    '100%': {'left': '23%','width':'100px','height':'22.5px','background':ogColor}
}]);

function shake() {
    $("#six").playKeyframe({name: 'shake', duration: '0.5s', timingFunction: 'ease-in-out', 
                            delay: '0s', direction: 'normal', fillMode: 'forwards',
                            complete: function() {
                                $(this).resetKeyframe();
                                $(this).css("width", "100px");
                                $(this).css("height", "22.5px");
                                $(this).css("backgroundColor", ogColor);
                            }});
    

    document.getElementById("six").childNodes[0].textContent = strs[pos];
    document.getElementById("six").childNodes[0].style.letterSpacing = ls[pos] + 'px';
    
    pos++;
    (pos == 6) ? pos = 0 : pos = pos;
}
