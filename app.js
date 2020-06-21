function hex2dec(hex)
{
    return parseInt("0x" + hex);
}

function dec2hex(dec)
{
    var str = dec.toString(16);
    if (str.length == 0) return "00";
    return str.length == 1 ? "0" + str : str;
}

function map(val, in_min, in_max, out_min, out_max)
{
    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

Array.prototype.chunk = function (chunk_size)
{
    var index = 0;
    var arrayLength = this.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size)
    {
        myChunk = this.slice(index, index + chunk_size);
        // Do something if you want with the group
        tempArray.push(myChunk);
    }

    return tempArray;
}

$(document).ready(() =>
{


    const NUMLEDS_KEYBOARD = KEYBOARD_LAYOUT.length;
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

    $("#setup").on('submit', function (e)
    {
        e.preventDefault();
        if (!generated || !changed || confirm("Are you sure you want to create a new animations? Export your animations if you want to save your changes."))
            generateLEDS();

    });

    function generateLEDS()
    {
        $(".led-container").empty();
        FRAMES = [{}];
        // ledstrip layout
        FRAMES[0].strip = [];
        for (let i = 0; i < 170; i++)
        {
            if (NUMLEDS_STRIP > 180)
            {
                $("#strip-container").append("<div class='led small'></div>");
            } else
            {
                $("#strip-container").append("<div class='led'></div>");
            }
            FRAMES[0].strip.push(0);
            FRAMES[0].strip.push(0);
            FRAMES[0].strip.push(0); // 3 color channels
        }

        // keyboard layout
        FRAMES[0].keyboard = [];
        KEYBOARD_LAYOUT.forEach(key =>
        {
            $("#keyboard-container").append(`<div class='led keyboard key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].keyboard.push(0);
            FRAMES[0].keyboard.push(0);
            FRAMES[0].keyboard.push(0); // 3 color channels
        });

        $("#keyboard-container").css("width", KEYBOARD_LAYOUT_WIDTH + "px");
        $("#keyboard-container").css("height", KEYBOARD_LAYOUT_HEIGHT + "px");


        // mouse layout
        FRAMES[0].mouse = [];
        MOUSE_LAYOUT.forEach(key =>
        {
            $("#mouse-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].mouse.push(0);
            FRAMES[0].mouse.push(0);
            FRAMES[0].mouse.push(0); // 3 color channels
        });

        $("#mouse-container").css("width", MOUSE_LAYOUT_WIDTH + "px");
        $("#mouse-container").css("height", MOUSE_LAYOUT_HEIGHT + "px");

        // mousepad layout
        FRAMES[0].mousepad = [];
        MOUSEPAD_LAYOUT.forEach(key =>
        {
            $("#mousepad-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].mousepad.push(0);
            FRAMES[0].mousepad.push(0);
            FRAMES[0].mousepad.push(0); // 3 color channels
        });

        $("#mousepad-container").css("width", MOUSEPAD_LAYOUT_WIDTH + "px");
        $("#mousepad-container").css("height", MOUSEPAD_LAYOUT_HEIGHT + "px");

        // headset layout
        FRAMES[0].headset = [];
        HEADSET_LAYOUT.forEach(key =>
        {
            $("#headset-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].headset.push(0);
            FRAMES[0].headset.push(0);
            FRAMES[0].headset.push(0); // 3 color channels
        });

        $("#headset-container").css("width", HEADSET_LAYOUT_WIDTH + "px");
        $("#headset-container").css("height", HEADSET_LAYOUT_HEIGHT + "px");

        // headset layout
        FRAMES[0].keypad = [];
        KEYPAD_LAYOUT.forEach(key =>
        {
            $("#keypad-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].keypad.push(0);
            FRAMES[0].keypad.push(0);
            FRAMES[0].keypad.push(0); // 3 color channels
        });

        $("#keypad-container").css("width", KEYPAD_LAYOUT_WIDTH + "px");
        $("#keypad-container").css("height", KEYPAD_LAYOUT_WIDTH + "px");

        // general leds layout
        FRAMES[0].general = [];
        GENERAL_LEDS_LAYOUT.forEach(key =>
        {
            $("#general-container").append(`<div class='led key' style="width: ${key.width ?? 20}px; height: ${key.height ?? 20}px; left: ${key.x}px; top: ${key.y}px">${key.key}</div>`);
            FRAMES[0].general.push(0);
            FRAMES[0].general.push(0);
            FRAMES[0].general.push(0); // 3 color channels
        });

        $("#general-container").css("width", GENERAL_LEDS_LAYOUT_WIDTH + "px");
        $("#general-container").css("height", GENERAL_LEDS_LAYOUT_HEIGHT + "px");

        $(".led").click(onLedClicked);
        $(".led").click(function (e) {
            if ( e.ctrlKey ) {
                let last_color = $("#color").val();
                $("#color").val('000000').change();
                $("#color").val(last_color);
            }
        }); 
        $(".led").dblclick(() => $("#color").change());
        
        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        refreshFrameText();
    }

    function pointToKey(x, y) 
    {
        return KEYBOARD_POINT_TO_KEY_ARRAY[y][x];
    }

    var FRAMES = [{}];
    var selectedFrameIndex = 0;
    var selectedLEDIndex = 0;
    var selectedLEDClass = "";
    $("#next-frame").click(nextFrame);
    $("#prev-frame").click(prevFrame);

    $("#new-frame").click(() =>
    {
        FRAMES.splice(selectedFrameIndex + 1, 0,
            {
                keyboard: [],
                strip: [],
                mouse: [],
                mousepad: [],
                headset: [],
                keypad: [],
                general: []
            });

        selectedFrameIndex++;
        for (let i = 0; i < NUMLEDS_KEYBOARD * 3; i++)
        {
            FRAMES[selectedFrameIndex].keyboard.push(0); // 3 color channels
        }
        for (let i = 0; i < NUMLEDS_STRIP * 3; i++)
        {
            FRAMES[selectedFrameIndex].strip.push(0);
        }
        for (let i = 0; i < NUMLEDS_MOUSE * 3; i++)
        {
            FRAMES[selectedFrameIndex].mouse.push(0);
        }
        for (let i = 0; i < NUMLEDS_MOUSEPAD * 3; i++)
        {
            FRAMES[selectedFrameIndex].mousepad.push(0);
        }
        for (let i = 0; i < NUMLEDS_HEADSET * 3; i++)
        {
            FRAMES[selectedFrameIndex].headset.push(0);
        }
        for (let i = 0; i < NUMLEDS_KEYPAD * 3; i++)
        {
            FRAMES[selectedFrameIndex].keypad.push(0);
        }
        for (let i = 0; i < NUMLEDS_GENERAL * 3; i++)
        {
            FRAMES[selectedFrameIndex].general.push(0);
        }
        refreshFrameText();
        updateLeds();
    });

    $("#copy-last").click(() =>
    {
        FRAMES.splice(selectedFrameIndex + 1, 0, JSON.parse(JSON.stringify(FRAMES[selectedFrameIndex])));
        selectedFrameIndex++;
        refreshFrameText();
        updateLeds();
    });

    $("#delete-frame").click(() =>
    {
        if (FRAMES.length == 1) return;
        FRAMES.splice(selectedFrameIndex, 1);
        selectedFrameIndex--;
        refreshFrameText();
        updateLeds();
    });

    // Shifts right LED STRIP
    $("#shift-right").click(() =>
    {
        for (let i = NUMLEDS_STRIP - 1; i >= 1; i--)
        {
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
    $("#shift-left").click(() =>
    {
        for (let i = 0; i < NUMLEDS_STRIP - 1; i++)
        {
            FRAMES[selectedFrameIndex].strip[i * 3 + 0] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 0]
            FRAMES[selectedFrameIndex].strip[i * 3 + 1] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 1]
            FRAMES[selectedFrameIndex].strip[i * 3 + 2] = FRAMES[selectedFrameIndex].strip[(i + 1) * 3 + 2]
        }
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 0] = 0;
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 1] = 0;
        FRAMES[selectedFrameIndex].strip[(NUMLEDS_STRIP - 1) * 3 + 2] = 0;
        updateLeds();
    });

    $("#copy-strip-to-keyboard").click(() =>
    {

        // reset keyboard
        for (let i = 0; i < KEYBOARD_LAYOUT.length * 3; i++)
        {
            FRAMES[selectedFrameIndex].keyboard[i] = 0;
        }
        for (let i = 0; i < NUMLEDS_STRIP - 1; i++)
        {
            const r = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 0]);
            const g = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 1]);
            const b = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 2]);
            const stripColorHex = dec2hex(r) + dec2hex(g) + dec2hex(b);
            if (stripColorHex == '000000') continue;
            const mappedX = parseInt(map(i, 0, NUMLEDS_STRIP, 0, 22), 10); // 19 is kb width w/o numpad
            for (let j = 0; j < 6; j++)
            {
                const key = pointToKey(mappedX, j);
                if (key == -1) continue;
                const kr = FRAMES[selectedFrameIndex].keyboard[key * 3 + 0];
                const kg = FRAMES[selectedFrameIndex].keyboard[key * 3 + 1];
                const kb = FRAMES[selectedFrameIndex].keyboard[key * 3 + 2];
                const kbColorHex = dec2hex(kr) + dec2hex(kg) + dec2hex(kb);
                if (kbColorHex == '000000')
                {
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 0] = r;
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 1] = g;
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 2] = b;
                } else
                {
                    // in order for average to work, it needs to work on HSV not RGB
                    /* FRAMES[selectedFrameIndex].keyboard[key*3 + 0] = parseInt((r + kr) / 2, 10);
                     FRAMES[selectedFrameIndex].keyboard[key*3 + 1] = parseInt((b + kb) / 2, 10);
                     FRAMES[selectedFrameIndex].keyboard[key*3 + 2] = parseInt((g + kg) / 2, 10);*/
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 0] = r;
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 1] = g;
                    FRAMES[selectedFrameIndex].keyboard[key * 3 + 2] = b;
                }
            }
        }
        updateLeds();
    });

    $("#copy-strip-to-mousepad").click(() =>
    {

        // reset mousepad
        for (let i = 0; i < MOUSEPAD_LAYOUT.length * 3; i++)
        {
            FRAMES[selectedFrameIndex].mousepad[i] = 0;
        }
        for (let i = 0; i < NUMLEDS_STRIP - 1; i++)
        {
            const r = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 0]);
            const g = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 1]);
            const b = parseInt(FRAMES[selectedFrameIndex].strip[i * 3 + 2]);
            const stripColorHex = dec2hex(r) + dec2hex(g) + dec2hex(b);
            if (stripColorHex == '000000') continue;
            const mappedX = parseInt(map(i, 0, NUMLEDS_STRIP, 0, NUMLEDS_MOUSEPAD), 10);
            const mr = FRAMES[selectedFrameIndex].keyboard[mappedX * 3 + 0];
            const mg = FRAMES[selectedFrameIndex].keyboard[mappedX * 3 + 1];
            const mb = FRAMES[selectedFrameIndex].keyboard[mappedX * 3 + 2];
            const mColorHex = dec2hex(mr) + dec2hex(mg) + dec2hex(mb);
            if (mColorHex == '000000')
            {
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 0] = r;
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 1] = g;
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 2] = b;
            } else
            {
                // in order for average to work, it needs to work on HSV not RGB
                /* FRAMES[selectedFrameIndex].keyboard[key*3 + 0] = parseInt((r + kr) / 2, 10);
                 FRAMES[selectedFrameIndex].keyboard[key*3 + 1] = parseInt((b + kb) / 2, 10);
                 FRAMES[selectedFrameIndex].keyboard[key*3 + 2] = parseInt((g + kg) / 2, 10);*/
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 0] = r;
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 1] = g;
                FRAMES[selectedFrameIndex].mousepad[mappedX * 3 + 2] = b;
            }
        }
        updateLeds();
    });

    $("#export").click(() =>
    {
        var fileString = `2,${FRAMES.length}\n`
        FRAMES.forEach(frame =>
        {
            fileString += frame.keyboard.toString() + ";";
            fileString += frame.strip.toString() + ";";
            fileString += frame.mouse.toString() + ";";
            fileString += frame.mousepad.toString() + ";";
            fileString += frame.headset.toString() + ";";
            fileString += frame.keypad.toString() + ";";
            fileString += frame.general.toString() + "\n";
        });
        $("#exported-anim").val(fileString);
    });

    $("#export-file").click(() =>
    {

        $("#export").click();

        var blob = new Blob([$("#exported-anim").val()], { type: 'text/plain' });
        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.setAttribute("download", $('#project-name').val() + '.txt');
        a.click();
    });

    $("#import-legacy").click(() =>
    {
        var input = document.createElement("input");
        input.type = 'file';
        input.click();

        input.onchange = function ()
        {
            var reader = new FileReader();
            reader.onload = function ()
            {
                importFramesLegacy(reader.result);
            };
            let file = input.files[0];
            reader.readAsText(file);
            $('#project-name').val(file.name.split('.')[0]);
        };
    });

    $("#import").click(() =>
    {
        var input = document.createElement("input");
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
        };
    });

    $("#copy-to-clipboard").click(() =>
    {
        // Step 1: Select the Text
        $("#exported-anim").select();
        // Step 2: Copying the Text
        document.execCommand("copy");
    });


    function importFrames(text)
    {
        generateLEDS();

        let pattern = /^(\d+),(\d+)\r?\n(((((\d+,)+\d);?)+\r?\n)+)$/;
        let matches = text.match(pattern);

        if (matches == null)
        {
            alert("Failed to read animation file. Make sure the file has a supported format.");
            return;
        }
        
        let formatVersion = matches[1];
        if (formatVersion != "2") 
        {
            alert("Invalid file version");
            return;
        }
        let numFrames = matches[2];
        let frameStrings = matches[3].split('\n');
        FRAMES = [];
        
        let error = false;

        frameStrings.forEach(str =>
        {
            if (str == "") return;
            var parts = str.split(";");
            if (parts.length != 7)
            {
                alert("Error reading animation file. Frame doesn't have the correct format. (wrong parts)");
                error = true;
                return;
            }
            var object = {};

            for(let i = 0; i < parts.length; i++)
            {
                let device = "";
                let ledCount = 0;
                switch(i)
                {
                    case 0:
                        device = "keyboard";
                        ledCount = 109;
                        break;
                    case 1:
                        device = "strip";
                        ledCount = 170;
                        break;
                    case 2:
                        device = "mouse";
                        ledCount = 16;
                        break;
                    case 3:
                        device = "mousepad";
                        ledCount = 16;
                        break;
                    case 4:
                        device = "headset";
                        ledCount = 2;
                        break;
                    case 5:
                        device = "keypad";
                        ledCount = 20;
                        break;
                    case 6:
                        device = "general";
                        ledCount = 5;
                        break;
                }
                let tempFrames = parts[i].replace(";","").split(',');
                
                tempFrames = tempFrames.map((p) => +p);
                if (tempFrames.length != ledCount * 3)
                {
                    alert("Error reading animation file. Frame doesn't have the correct format (wrong ledcount)");
                    error = true;
                    return;
                }

                object[device] = tempFrames;
            }
            FRAMES.push(object);
        });
        if (error) return;

        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        updateLeds();
        refreshFrameText();
        
    }

    function importFramesLegacy(text)
    {

        generateLEDS();

        let pattern = /^(\d+),(\d+)\r?\n((\d+,)*\d+)(\r?\n)?$/;
        let matches = text.match(pattern);

        if (matches == null)
        {
            alert("Text of file invalid");
            return;
        }

        let tempNumLeds = matches[1] == 88 ? -1 : matches[1];
        let tempFrames = matches[3].split(',');
        tempFrames = tempFrames.map((p) => +p);
        tempFrames = tempFrames.chunk(matches[1] * 3);

        let lastFrameLength = tempFrames[tempFrames.length - 1].length;
        if (lastFrameLength !== tempNumLeds * 3)
        {
            for (var i = lastFrameLength; i < matches[1] * 3; i++)
            {
                tempFrames[tempFrames.length - 1].push(0)
            }
        }

        if (tempNumLeds == -1) // keyboard
        {
            let i = 0;
            tempFrames.forEach(frame =>
            {
                if (i == 0)
                {
                    FRAMES[0].keyboard = frame;
                } else
                {
                    FRAMES.push(
                        {
                            keyboard: frame,
                            strip: Array.apply(null, Array(NUMLEDS_STRIP * 3)).map(Number.prototype.valueOf, 0),
                            mouse: Array.apply(null, Array(NUMLEDS_MOUSEPAD * 3)).map(Number.prototype.valueOf, 0),
                            mousepad: Array.apply(null, Array(NUMLEDS_MOUSEPAD * 3)).map(Number.prototype.valueOf, 0),
                            headset: Array.apply(null, Array(NUMLEDS_HEADSET * 3)).map(Number.prototype.valueOf, 0),
                            keypad: Array.apply(null, Array(NUMLEDS_KEYPAD * 3)).map(Number.prototype.valueOf, 0),
                            general: Array.apply(null, Array(NUMLEDS_GENERAL * 3)).map(Number.prototype.valueOf, 0),
                        });
                }
                i++;
            });
        } else if (tempNumLeds == 170) // strip
        {
            let i = 0;
            tempFrames.forEach(frame =>
            {
                if (i == 0)
                {
                    FRAMES[0].strip = frame;
                } else
                {
                    FRAMES.push(
                        {
                            keyboard: Array.apply(null, Array(NUMLEDS_KEYBOARD * 3)).map(Number.prototype.valueOf, 0),
                            strip: frame,
                            mouse: Array.apply(null, Array(NUMLEDS_MOUSEPAD * 3)).map(Number.prototype.valueOf, 0),
                            mousepad: Array.apply(null, Array(NUMLEDS_MOUSEPAD * 3)).map(Number.prototype.valueOf, 0),
                            headset: Array.apply(null, Array(NUMLEDS_HEADSET * 3)).map(Number.prototype.valueOf, 0),
                            keypad: Array.apply(null, Array(NUMLEDS_KEYPAD * 3)).map(Number.prototype.valueOf, 0),
                            general: Array.apply(null, Array(NUMLEDS_GENERAL * 3)).map(Number.prototype.valueOf, 0),
                        });
                }
                i++;
            });
        }


        generated = true;
        changed = false;
        selectedFrameIndex = 0;
        selectedLEDIndex = 0;
        updateLeds();
        refreshFrameText();
    }

    function refreshFrameText()
    {
        $("#frame").text("Frame: " + (selectedFrameIndex + 1) + " / " + FRAMES.length);
    }

    function onLedClicked()
    {

        if (selectedLEDIndex != -1)
            $(".led").removeClass("selected");
        selectedLEDIndex = $(this).index();
        selectedLEDClass = $(this).parent().attr("id").replace("-container", "");
        $(this).addClass("selected");

    }

    function prevFrame()
    {
        if (selectedFrameIndex == 0) return;
        selectedFrameIndex--;
        refreshFrameText();
        updateLeds();
    }

    function nextFrame()
    {
        if (selectedFrameIndex == FRAMES.length - 1) return;
        selectedFrameIndex++;
        refreshFrameText();
        updateLeds();
    }

    function updateLeds()
    {
        var keyboardChildren = $("#keyboard-container").children();
        for (let i = 0; i < NUMLEDS_KEYBOARD; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].keyboard[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(keyboardChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(keyboardChildren).eq(i).addClass("border");
            } else
            {
                $(keyboardChildren).eq(i).removeClass("border");
            }
        }
        var stripChildren = $("#strip-container").children();
        for (let i = 0; i < NUMLEDS_STRIP; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].strip[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].strip[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].strip[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(stripChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(stripChildren).eq(i).addClass("border");
            } else
            {
                $(stripChildren).eq(i).removeClass("border");
            }
        }
        var mouseChildren = $("#mouse-container").children();
        for (let i = 0; i < NUMLEDS_MOUSE; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].mouse[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(mouseChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(mouseChildren).eq(i).addClass("border");
            } else
            {
                $(mouseChildren).eq(i).removeClass("border");
            }
        }
        var mousepadChildren = $("#mousepad-container").children();
        for (let i = 0; i < NUMLEDS_MOUSEPAD; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].mousepad[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(mousepadChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(mousepadChildren).eq(i).addClass("border");
            } else
            {
                $(mousepadChildren).eq(i).removeClass("border");
            }
        }
        var headsetChildren = $("#headset-container").children();
        for (let i = 0; i < NUMLEDS_HEADSET; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].headset[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(headsetChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(headsetChildren).eq(i).addClass("border");
            } else
            {
                $(headsetChildren).eq(i).removeClass("border");
            }
        }
        var keypadChildren = $("#keypad-container").children();
        for (let i = 0; i < NUMLEDS_KEYPAD; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].keypad[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(keypadChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(keypadChildren).eq(i).addClass("border");
            } else
            {
                $(keypadChildren).eq(i).removeClass("border");
            }
        }
        var generalChildren = $("#general-container").children();
        for (let i = 0; i < NUMLEDS_GENERAL; i++)
        {
            var r = dec2hex(FRAMES[selectedFrameIndex].general[i * 3]);
            var g = dec2hex(FRAMES[selectedFrameIndex].general[i * 3 + 1]);
            var b = dec2hex(FRAMES[selectedFrameIndex].general[i * 3 + 2]);
            var fullColor = r + "" + g + "" + b;
            $(generalChildren).eq(i).css("background-color", "#" + fullColor);
            if (fullColor.toLowerCase() == "ffffff")
            {
                $(generalChildren).eq(i).addClass("border");
            } else
            {
                $(generalChildren).eq(i).removeClass("border");
            }
        }
        changed = true;
    }

    function nextLed()
    {
        if (selectedLEDIndex < NUM_LEDS[selectedLEDClass] - 1)
        {
            $(".led").removeClass("selected");
            selectedLEDIndex++;
            $("#" + selectedLEDClass + "-container :nth-child(" + (selectedLEDIndex + 1) + ")").addClass("selected");
        }
    }

    function prevLed()
    {
        if (selectedLEDIndex > 0)
        {
            $(".led").removeClass("selected");
            selectedLEDIndex--;
            $("#" + selectedLEDClass + "-container :nth-child(" + (selectedLEDIndex + 1) + ")").addClass("selected");
        }
    }

    $("#color").change(function ()
    {
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
        changed = true;
    });

    $(document).keydown(function (e) {
        // Get the pressed key code
        let key = e.which;
        //  When pressed with ctrl, runs other function
        if ( e.ctrlKey ) key += 1000;

        switch (key) {
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

            case 46: // Delete
                $("#delete-frame").click();
                break;

            case 1065: // Ctrl + A
                $("#new-frame").click();
                break;

            case 1067: // Ctrl + C
                $("#copy-last").click();
                break;
            
            case 1037: // Ctrl + Left
                $("#shift-left").click();
                break;
            
            case 1039: // Ctrl + Right
                $("#shift-right").click();
                break;

            case 1013: // Ctrl + Enter
                $("#export").click();
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });



});

