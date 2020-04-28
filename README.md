# LED-AnimationDesigner
A simple web interface that simplifies making animations for LED strips and keyboards.
[Try it here.](https://nicolasdeory.github.io/LED-AnimationDesigner/)

## Usage
Click "Start", and you will be able to edit individual LEDs by clicking on them.
Click "Export to File" when you are done editing the animation.

## Keyboard control
Press the left and right arrow keys to change the selected LED.
Press the up and down arrow keys to change the current frame.
Double click on frame to apply the selected color.
Ctrl + click on frame to clear.
Move the cursor above the buttons to see the keys.

## Buttons
- **Next Frame / Previous Frame**: Changes the selected animation frame.
- **Add New Frame**: Adds an empty frame **after** the frame selected.
- **Copy Last Frame**: Copies the color information from the selected frame and creates a new one.
- **Delete Frame**: Deletes the selected frame.
- **Shift Left**: Moves the led colors one to the left. The right-most led will turn black.
- **Shift Right**: Moves the led colors one to the right. The left-most led will turn black.
- **Copy Strip to Keyboard**: Copies the colors from the LED strip to the keyboard.
- **Copy Strip to Mousepad**: Copies the colors from the LED strip to the mousepad.
File Import/Export:
- **Import from file**: Imports an animation.
- **Import legacy file**: Imports an animation with the old legacy format.
- **Export to file**: Generates the animation code and exports it to a file with the specified name.
- **Export**: Generates the animation code and displays it in the output textarea.

## Export Format
The first line is a number that indicates the file format version (current = 2), and the number of animation frames.
Each of the following lines is an animation frame. The different frame data arrays are separated by a semicolon.

Each frame is composed of 7 different comma-separated color byte (0-255) arrays, in this order:
- Keyboard (should be of length 88 keys + 17 numpad = 105)
- LED Strip (must be of length 170)
- Mouse (LEDs in this order: Main Logo, Scrollwheel, 7x LEDs left side, 7x LEDs right side)
- Mousepad (must be of length 16 - left to right order)
- Headset (must be of length 2 - First color is left side, second color is right side)
- 2D Keypad (must be of length 5x4 - 2D array, row order starting in the top-left)
- General-purpose LEDs (LEDs in this order: Main Moodlight, Secondary LED 1,2,3,4)

An example animation file might look like this:
```
VERSION,NUM_FRAMES
RGB_ARRAY_KEYBOARD;RGB_ARRAY_STRIP;RGB_ARRAY_MOUSE;RGB_ARRAY_MOUSEPAD;RGB_ARRAY_HEADSET;RGB_ARRAY_KEYPAD;RGB_ARRAY_GENERAL\n
...
```
![](readme/demo-anim.gif)

