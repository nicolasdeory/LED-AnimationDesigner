function hex2dec(hex){
    return parseInt("0x"+hex);
}

function dec2hex(dec) {
    var str = dec.toString(16);
    if (str.length == 0) return "00";
    return str.length == 1 ? "0"+str : str;
}

$(document).ready(() => {

    NUM_LEDS = 0;
    var generated = false;
    var changed = false;

    $("#setup").on('submit', function(e) {
        setLed( $("input[name='numLeds']").val() );
    });
    $(".pre-defined-setup button").on('click', function(e) {
        setLed( $(this).data('value') );
    });

    function setLed( num ) {
        NUM_LEDS = num;
        if (!generated || !changed || confirm("Are you sure you want to create a new animation? Export your animation if you want to save your changes."))
            generateLEDS();
        return false;
    }

    function generateLEDS() {
        $("#led-container").empty();
        FRAMES = [[]];
        if (NUM_LEDS == -1) {
            // keyboard layout
            $("#led-container").addClass("keyboard-layout");
            KEYBOARD_LAYOUT.forEach(key => {
                $("#led-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
                FRAMES[0].push(0);
                FRAMES[0].push(0);
                FRAMES[0].push(0); // 3 color channels
            });
            
        } else {
            $("#led-container").removeClass("keyboard-layout");
            for(let i = 0; i < NUM_LEDS; i++) {
                if(NUM_LEDS > 180) {
                    $("#led-container").append("<div class='led small'></div>");
                } else {
                    $("#led-container").append("<div class='led'></div>");
                }
    
                
                FRAMES[0].push(0);
                FRAMES[0].push(0);
                FRAMES[0].push(0); // 3 color channels
            }
        }
        $(".led").click(onLedClicked);
        
        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        refreshFrameText();
    }

    var FRAMES = [[]];
    var selectedFrameIndex = 0;
    var selectedLEDIndex = 0;
    $("#next-frame").click(nextFrame);
    $("#prev-frame").click(prevFrame);

    $("#new-frame").click(() => {
        FRAMES.splice(selectedFrameIndex+1,0,[]);
        selectedFrameIndex++;
        var ledCount = NUM_LEDS == -1 ? 88 : NUM_LEDS;
        for(let i = 0; i < ledCount; i++) {

            FRAMES[selectedFrameIndex].push(0);
            FRAMES[selectedFrameIndex].push(0);
            FRAMES[selectedFrameIndex].push(0); // 3 color channels
        }
        refreshFrameText();
        updateLeds();
    });

    $("#copy-last").click(() => {
        FRAMES.splice(selectedFrameIndex+1,0,FRAMES[selectedFrameIndex].slice());
        selectedFrameIndex++;
        refreshFrameText();
        updateLeds();
    });

    $("#delete-frame").click(() => {
        if(FRAMES.length == 1) return;
        FRAMES.splice(selectedFrameIndex,1);
        selectedFrameIndex--;
        refreshFrameText();
        updateLeds();
    });

    $("#shift-right").click(() => {
        var ledCount = NUM_LEDS == -1 ? 88 : NUM_LEDS;
        for(let i = ledCount - 1; i >= 1; i--) {
            FRAMES[selectedFrameIndex][i*3+0] = FRAMES[selectedFrameIndex][(i-1)*3+0]
            FRAMES[selectedFrameIndex][i*3+1] = FRAMES[selectedFrameIndex][(i-1)*3+1]
            FRAMES[selectedFrameIndex][i*3+2] = FRAMES[selectedFrameIndex][(i-1)*3+2]
        }
        FRAMES[selectedFrameIndex][0] = 0;
        FRAMES[selectedFrameIndex][1] = 0;
        FRAMES[selectedFrameIndex][2] = 0;
        updateLeds();
    });

    $("#shift-left").click(() => {
        var ledCount = NUM_LEDS == -1 ? 88 : NUM_LEDS;
        for(let i = 0; i < ledCount - 1; i++) {
            FRAMES[selectedFrameIndex][i*3+0] = FRAMES[selectedFrameIndex][(i+1)*3+0]
            FRAMES[selectedFrameIndex][i*3+1] = FRAMES[selectedFrameIndex][(i+1)*3+1]
            FRAMES[selectedFrameIndex][i*3+2] = FRAMES[selectedFrameIndex][(i+1)*3+2]
        }
        FRAMES[selectedFrameIndex][(NUM_LEDS-1)*3+0] = 0;
        FRAMES[selectedFrameIndex][(NUM_LEDS-1)*3+1] = 0;
        FRAMES[selectedFrameIndex][(NUM_LEDS-1)*3+2] = 0;
        updateLeds();
    });

    $("#export").click(() => {
        var prefix = (NUM_LEDS==-1? 88 : NUM_LEDS) + "," + FRAMES.length + "\n";
        $("#exported-anim").val(prefix + FRAMES.toString());
    });

    $("#export-file").click(() => {
        $("#export").click();

        var blob = new Blob( [$("#exported-anim").val()], {type: 'text/plain'} );
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", 'led animation.txt');
        a.click();
    });

    function refreshFrameText() {
        $("#frame").text("Frame: " + (selectedFrameIndex + 1) + " / " + FRAMES.length);
    }

    function onLedClicked() {

        if (selectedLEDIndex != -1)
            $("#led-container").children().removeClass("selected");
        selectedLEDIndex = $(this).index();
        $(this).addClass("selected");

    }

    function prevFrame() {
        if (selectedFrameIndex == 0) return;
        selectedFrameIndex--;
        refreshFrameText();
        updateLeds();
    }

    function nextFrame() {
        if (selectedFrameIndex == FRAMES.length - 1) return;
        selectedFrameIndex++;
        refreshFrameText();
        updateLeds();
    }

    function updateLeds(){
        var children = $("#led-container").children();
        var ledCount = NUM_LEDS == -1 ? 88 : NUM_LEDS;
        for(let i = 0; i < ledCount; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex][i*3]);
            var g = dec2hex(FRAMES[selectedFrameIndex][i*3+1]);
            var b = dec2hex(FRAMES[selectedFrameIndex][i*3+2]);
            var fullColor = r + "" + g + "" + b;
            $(children).eq(i).css("background-color","#"+fullColor);
            if(fullColor.toLowerCase()=="ffffff") {
                $(children).eq(i).addClass("border");
            } else {
                $(children).eq(i).removeClass("border");
            }
        }
        changed = true;
    }

    function nextLed() {
        if ((NUM_LEDS == -1 && selectedLEDIndex < KEYBOARD_LAYOUT.length-1) || selectedLEDIndex < NUM_LEDS - 1) {
            $("#led-container").children().removeClass("selected");
            selectedLEDIndex++;
            $("#led-container :nth-child(" + (selectedLEDIndex+1) + ")").addClass("selected");
        }
    }

    function prevLed() {
        if (selectedLEDIndex > 0) {
            $("#led-container").children().removeClass("selected");
            selectedLEDIndex--;
            $("#led-container :nth-child(" + (selectedLEDIndex+1) + ")").addClass("selected");
        }
    }

    $("#color").change(function() {
        var val = $(this).val();
        $("#led-container").children().eq(selectedLEDIndex).css("background-color", "#" + val);
        if(val.toLowerCase()=="ffffff") 
            $("#led-container").children().eq(selectedLEDIndex).addClass("border");
        else $("#led-container").children().eq(selectedLEDIndex).removeClass("border");
        var r = hex2dec(val[0]+val[1]);
        var g = hex2dec(val[2]+val[3]);
        var b = hex2dec(val[4]+val[5]);
        FRAMES[selectedFrameIndex][selectedLEDIndex*3+0] = r;
        FRAMES[selectedFrameIndex][selectedLEDIndex*3+1] = g;
        FRAMES[selectedFrameIndex][selectedLEDIndex*3+2] = b;
    });

    $(document).keydown(function (e) {
        switch (e.which) {
            case 37: // left
                prevLed();
                break;

            case 38: // up
                nextFrame();
                break;

            case 39: // right
                nextLed();
                break;

            case 40: // down
                prevFrame();
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    

});

