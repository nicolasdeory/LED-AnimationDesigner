function hex2dec(hex) {
    return parseInt("0x" + hex);
}

function dec2hex(dec) {
    var str = dec.toString(16);
    if (str.length == 0) return "00";
    return str.length == 1 ? "0" + str : str;
}

Array.prototype.chunk = function (chunk_size) {
    var index = 0;
    var arrayLength = this.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = this.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

$(document).ready(() => {


    const NUMLEDS_KEYBOARD = KEYBOARD_LAYOUT.length; // TODO: ADD NUMPAD
    const NUMLEDS_STRIP = 170;
    const NUMLEDS_MOUSE = MOUSE_LAYOUT.length;
    const NUMLEDS_MOUSEPAD = MOUSEPAD_LAYOUT.length;
    const NUMLEDS_HEADSET = HEADSET_LAYOUT.length;
    const NUMLEDS_KEYPAD = KEYPAD_LAYOUT.length;
    const NUMLEDS_GENERAL = GENERAL_LEDS_LAYOUT.length;

    const NUM_LEDS =
    {
        keyboard: NUMLEDS_KEYBOARD,
        strip: NUMLEDS_STRIP,
        mouse: NUMLEDS_MOUSE,
        mousepad: NUMLEDS_MOUSEPAD,
        headset: NUMLEDS_HEADSET,
        keypad: NUMLEDS_KEYPAD,
        general: NUMLEDS_GENERAL
    };

    var generated = false;
    var changed = false;

    $("#setup").on('submit', function (e) {
        //setLed( $("input[name='numLeds']").val() );
        e.preventDefault();
        if (!generated || !changed || confirm("Are you sure you want to create a new animations? Export your animations if you want to save your changes."))
            generateLEDS();
        
    });
    $(".pre-defined-setup button").on('click', function (e) {
        setLed($(this).data('value'));
    });

    function generateLEDS() {
        $("#led-container").empty();
        FRAMES = [{}];

        // ledstrip layout
        FRAMES[0].strip = [];
        for (let i = 0; i < 170; i++) {
            if (NUMLEDS_STRIP > 180) {
                $("#strip-container").append("<div class='led small'></div>");
            } else {
                $("#strip-container").append("<div class='led'></div>");
            }
            FRAMES[0].strip.push(0);
            FRAMES[0].strip.push(0);
            FRAMES[0].strip.push(0); // 3 color channels
        }

        // keyboard layout
        FRAMES[0].keyboard = [];
        KEYBOARD_LAYOUT.forEach(key => {
            $("#keyboard-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].keyboard.push(0);
            FRAMES[0].keyboard.push(0);
            FRAMES[0].keyboard.push(0); // 3 color channels
        });

        $("#keyboard-container").css("width", KEYBOARD_LAYOUT_WIDTH + "px");
        $("#keyboard-container").css("height", KEYBOARD_LAYOUT_HEIGHT + "px");


        // mouse layout
        FRAMES[0].mouse = [];
        MOUSE_LAYOUT.forEach(key => {
            $("#mouse-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].mouse.push(0);
            FRAMES[0].mouse.push(0);
            FRAMES[0].mouse.push(0); // 3 color channels
        });

        $("#mouse-container").css("width", MOUSE_LAYOUT_WIDTH + "px");
        $("#mouse-container").css("height", MOUSE_LAYOUT_HEIGHT + "px");

        // mousepad layout
        FRAMES[0].mousepad = [];
        MOUSEPAD_LAYOUT.forEach(key => {
            $("#mousepad-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].mousepad.push(0);
            FRAMES[0].mousepad.push(0);
            FRAMES[0].mousepad.push(0); // 3 color channels
        });

        $("#mousepad-container").css("width", MOUSEPAD_LAYOUT_WIDTH + "px");
        $("#mousepad-container").css("height", MOUSEPAD_LAYOUT_HEIGHT + "px");

        // headset layout
        FRAMES[0].headset = [];
        HEADSET_LAYOUT.forEach(key => {
            $("#headset-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].headset.push(0);
            FRAMES[0].headset.push(0);
            FRAMES[0].headset.push(0); // 3 color channels
        });

        $("#headset-container").css("width", HEADSET_LAYOUT_WIDTH + "px");
        $("#headset-container").css("height", HEADSET_LAYOUT_HEIGHT + "px");

        // headset layout
        FRAMES[0].keypad = [];
        KEYPAD_LAYOUT.forEach(key => {
            $("#keypad-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].keypad.push(0);
            FRAMES[0].keypad.push(0);
            FRAMES[0].keypad.push(0); // 3 color channels
        });

        $("#keypad-container").css("width", KEYPAD_LAYOUT_WIDTH + "px");
        $("#keypad-container").css("height", KEYPAD_LAYOUT_WIDTH + "px");

        // general leds layout
        FRAMES[0].general = [];
        GENERAL_LEDS_LAYOUT.forEach(key => {
            $("#general-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].general.push(0);
            FRAMES[0].general.push(0);
            FRAMES[0].general.push(0); // 3 color channels
        });

        $("#general-container").css("width", GENERAL_LEDS_LAYOUT_WIDTH + "px");
        $("#general-container").css("height", GENERAL_LEDS_LAYOUT_HEIGHT + "px");

        $(".led").click(onLedClicked);

        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        refreshFrameText();
    }

    var FRAMES = [{}];
    var selectedFrameIndex = 0;
    var selectedLEDIndex = 0;
    var selectedLEDClass = "";
    $("#next-frame").click(nextFrame);
    $("#prev-frame").click(prevFrame);

    $("#new-frame").click(() => {
        FRAMES.splice(selectedFrameIndex + 1, 0, {});
        selectedFrameIndex++;
        for (let i = 0; i < NUMLEDS_KEYBOARD.length * 3; i++) {
            FRAMES[selectedFrameIndex].keyboard.push(0); // 3 color channels
        }
        for (let i = 0; i < NUMLEDS_STRIP.length * 3; i++) {
            FRAMES[selectedFrameIndex].strip.push(0);
        }
        for (let i = 0; i < NUMLEDS_MOUSE.length * 3; i++) {
            FRAMES[selectedFrameIndex].mouse.push(0);
        }
        for (let i = 0; i < NUMLEDS_MOUSEPAD.length * 3; i++) {
            FRAMES[selectedFrameIndex].mousepad.push(0);
        }
        for (let i = 0; i < NUMLEDS_HEADSET.length * 3; i++) {
            FRAMES[selectedFrameIndex].headset.push(0);
        }
        for (let i = 0; i < NUMLEDS_KEYPAD.length * 3; i++) {
            FRAMES[selectedFrameIndex].keypad.push(0);
        }
        for (let i = 0; i < NUMLEDS_GENERAL.length * 3; i++) {
            FRAMES[selectedFrameIndex].general.push(0);
        }
        refreshFrameText();
        updateLeds();
    });

    $("#copy-last").click(() => {
        FRAMES.splice(selectedFrameIndex + 1, 0, FRAMES[selectedFrameIndex].slice());
        selectedFrameIndex++;
        refreshFrameText();
        updateLeds();
    });

    $("#delete-frame").click(() => {
        if (FRAMES.length == 1) return;
        FRAMES.splice(selectedFrameIndex, 1);
        selectedFrameIndex--;
        refreshFrameText();
        updateLeds();
    });

    // Shifts right LED STRIP
    $("#shift-right").click(() => {
        for (let i = NUMLEDS_STRIP - 1; i >= 1; i--) {
            FRAMES[selectedFrameIndex].strip[i * 3 + 0] = FRAMES[selectedFrameIndex].strip[(i - 1) * 3 + 0]
            FRAMES[selectedFrameIndex].strip[i * 3 + 1] = FRAMES[selectedFrameIndex].strip[(i - 1) * 3 + 1]
            FRAMES[selectedFrameIndex].strip[i * 3 + 2] = FRAMES[selectedFrameIndex].strip[(i - 1) * 3 + 2]
        }
        FRAMES[selectedFrameIndex].strip[0] = 0;
        FRAMES[selectedFrameIndex].strip[1] = 0;
        FRAMES[selectedFrameIndex].strip[2] = 0;
        updateLeds();
    });

    // Shifts left LED STRIP
    $("#shift-left").click(() => {
        for (let i = 0; i < NUMLEDS_STRIP - 1; i++) {
            FRAMES[selectedFrameIndex].strip[i * 3 + 0] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 0]
            FRAMES[selectedFrameIndex].strip[i * 3 + 1] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 1]
            FRAMES[selectedFrameIndex].strip[i * 3 + 2] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 2]
        }
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 0] = 0;
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 1] = 0;
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 2] = 0;
        updateLeds();
    });

    $("#export").click(() => {
        console.error("Export unimplemented");
        /* var prefix = (NUMLEDS_STRIP==-1? 88 : NUMLEDS_STRIP) + "," + FRAMES.length + "\n";
         $("#exported-anim").val(prefix + FRAMES.toString());*/
    });

    $("#export-file").click(() => {
        console.error("Export unimplemented");
        /*
        $("#export").click();

        var blob = new Blob( [$("#exported-anim").val()], {type: 'text/plain'} );
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.setAttribute( "download", $( '#project-name' ).val() + '.txt' );
        a.click();*/
    });

    $("#import").click(() => {
        console.error("Import unimplemented");
        /*var input = document.createElement("input");
        input.type = 'file';
        input.click();

        input.onchange = function() {
            var reader = new FileReader();
            reader.onload = function() {
                importFrames( reader.result );
            };
            let file = input.files[0];
            reader.readAsText(file);
            $( '#project-name' ).val( file.name.split('.')[0] );
        };*/
    });

    function importFrames(text) {
        let pattern = /^(\d+),(\d+)\r?\n((\d+,)*\d+)(\r?\n)?$/;
        let matches = text.match(pattern);

        if (matches == null) {
            alert("Text of file invalid");
            return;
        }

        let tempNumLeds = matches[1] == 88 ? -1 : matches[1];
        let tempFrames = matches[3].split(',');
        tempFrames = tempFrames.map((p) => +p);
        tempFrames = tempFrames.chunk(matches[1] * 3);

        let lastFrameLength = tempFrames[tempFrames.length - 1].length;
        if (lastFrameLength !== tempNumLeds * 3) {
            for (var i = lastFrameLength; i < matches[1] * 3; i++) {
                tempFrames[tempFrames.length - 1].push(0)
            }
        }

        NUMLEDS_STRIP = tempNumLeds;
        setLed(NUMLEDS_STRIP);

        FRAMES = tempFrames;

        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        updateLeds();
        refreshFrameText();
    }

    function refreshFrameText() {
        $("#frame").text("Frame: " + (selectedFrameIndex + 1) + " / " + FRAMES.length);
    }

    function onLedClicked() {

        if (selectedLEDIndex != -1)
            $(".led").removeClass("selected");
        selectedLEDIndex = $(this).index();
        selectedLEDClass = $(this).parent().attr("id").replace("-container", "");
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

    function updateLeds() {
        var keyboardChildren = $("#keyboard-container").children();
        for (let i = 0; i < NUMLEDS_KEYBOARD.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(children).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(children).eq(i).addClass("border");
            } else {
                $(children).eq(i).removeClass("border");
            }
        }
        var stripChildren = $("#strip-container").children();
        for (let i = 0; i < NUMLEDS_STRIP.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(children).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(children).eq(i).addClass("border");
            } else {
                $(children).eq(i).removeClass("border");
            }
        }
        var mouseChildren = $("#mouse-container").children();
        for (let i = 0; i < NUMLEDS_MOUSE.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(mouseChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(mouseChildren).eq(i).addClass("border");
            } else {
                $(mouseChildren).eq(i).removeClass("border");
            }
        }
        var mousepadChildren = $("#mousepad-container").children();
        for (let i = 0; i < NUMLEDS_MOUSEPAD.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(mousepadChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(mousepadChildren).eq(i).addClass("border");
            } else {
                $(mousepadChildren).eq(i).removeClass("border");
            }
        }
        var headsetChildren = $("#headset-container").children();
        for (let i = 0; i < NUMLEDS_HEADSET.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(headsetChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(headsetChildren).eq(i).addClass("border");
            } else {
                $(headsetChildren).eq(i).removeClass("border");
            }
        }
        var keypadChildren = $("#keypad-container").children();
        for (let i = 0; i < NUMLEDS_KEYPAD.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(keypadChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(keypadChildren).eq(i).addClass("border");
            } else {
                $(keypadChildren).eq(i).removeClass("border");
            }
        }
        var generalChildren = $("#general-container").children();
        for (let i = 0; i < NUMLEDS_GENERAL.length; i++) {
            var r = dec2hex(FRAMES[selectedFrameIndex].general[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].general[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].general[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(generalChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff") {
                $(generalChildren).eq(i).addClass("border");
            } else {
                $(generalChildren).eq(i).removeClass("border");
            }
        }
        changed = true;
    }

    function nextLed() {
        if (selectedLEDIndex < NUM_LEDS[selectedLEDClass] - 1) {
            $(".led").removeClass("selected");
            selectedLEDIndex++;
            $("#" + selectedLEDClass + "-container :nth-child(" + (selectedLEDIndex + 1) + ")").addClass("selected");
        }
    }

    function prevLed() {
        if (selectedLEDIndex > 0) {
            $(".led").removeClass("selected");
            selectedLEDIndex--;
            $("#" + selectedLEDClass + "-container :nth-child(" + (selectedLEDIndex + 1) + ")").addClass("selected");
        }
    }

    $("#color").change(function () {
        var val = $(this).val();
        $("#" + selectedLEDClass + "-container").children().eq(selectedLEDIndex).css("background-color", "#" + val);
        if (val.toLowerCase() == "ffffff")
            $("#" + selectedLEDClass + "-container").children().eq(selectedLEDIndex).addClass("border");
        else $("#" + selectedLEDClass + "-container").children().eq(selectedLEDIndex).removeClass("border");
        var r = hex2dec(val[0] + val[1]);
        var g = hex2dec(val[2] + val[3]);
        var b = hex2dec(val[4] + val[5]);
        FRAMES[selectedFrameIndex][selectedLEDClass][selectedLEDIndex * 3 + 0] = r;
        FRAMES[selectedFrameIndex][selectedLEDClass][selectedLEDIndex * 3 + 1] = g;
        FRAMES[selectedFrameIndex][selectedLEDClass][selectedLEDIndex * 3 + 2] = b;
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

