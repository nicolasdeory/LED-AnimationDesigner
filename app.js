function hex2dec(hex){
    return parseInt("0x"+hex);
}

function dec2hex(dec) {
    return dec.toString(16);
}

$(document).ready(() => {

    NUM_LEDS = 0;
    var generated = false;
    $("#setup").on('submit', function(e) {
        NUM_LEDS = $("input[name='numLeds']").val();
       // $("#setup").remove();
        if (!generated || confirm("Are you sure you want to create a new animation? Export your animation if you want to save your changes."))
            generateLEDS();
        return false;
    });

    function generateLEDS() {
        $("#led-container").empty();
        FRAMES = [[]];
        for(let i = 0; i < NUM_LEDS; i++) {
            if(NUM_LEDS > 180) {
                $("#led-container").append("<div class='led small'></div>");
            } else {
                $("#led-container").append("<div class='led'></div>");
            }

            $(".led").click(onLedClicked);
            FRAMES[0].push(0);
            FRAMES[0].push(0);
            FRAMES[0].push(0); // 3 color channels
        }
        generated = true;
    }

    var FRAMES = [[]];
    var selectedFrameIndex = 0;
    var selectedLEDIndex = 0;
    $("#next-frame").click(nextFrame);
    $("#prev-frame").click(prevFrame);

    $("#new-frame").click(() => {
        FRAMES.splice(selectedFrameIndex+1,0,[]);
        selectedFrameIndex++;
        for(let i = 0; i < NUM_LEDS; i++) {

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
        for(let i = NUM_LEDS - 1; i >= 1; i--) {
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
        for(let i = 0; i < NUM_LEDS - 1; i++) {
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
        var prefix = NUM_LEDS + "," + FRAMES.length + "\n";
        $("#exported-anim").val(prefix + FRAMES.toString());
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
        for(let i = 0; i < NUM_LEDS; i++) {
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
    }

    function nextLed() {
        if (selectedLEDIndex < NUM_LEDS - 1) {
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
