# LED-AnimationDesigner
A simple web interface that simplifies making animations for LED strips.
[Try it here.](https://nicolasdeory.github.io/LED-AnimationDesigner/)

## Usage
Specify the number of LEDs you wish to make an animation for. A black LED strip will appear.
Click on any LED to select it, and choose a color for the light with the color picker. 

## Keyboard control
Press the left and right arrow keys to change the selected LED.
Press the up and down arrow keys to change the current frame.

## Buttons
- Next Frame / Previous Frame: Changes the selected animation frame.
- Add New Frame: Adds an empty frame **after** the frame selected.
- Copy Last Frame: Copies the color information from the selected frame and creates a new one.
- Delete Frame: Deletes the selected frame.
- Shift Left: Moves the led colors one to the left. The right-most led will turn black.
- Shift Right: Moves the led colors one to the right. The left-most led will turn black.
- EXPORT: Generates the animation code and displays it in the output textarea.

## Export Format
The format is similar to a DMX color array.
The first line indicates the following information:
- LED count
- Frame count

The following data is a byte array containing FRAME_COUNT * NUM_LEDS * 3 color channel bytes (RGB order, starting by LED 0).
A two-frame animation for a 5 LED strip will look like this:
```
5,2
0,0,0,59,255,62,255,51,210,0,0,0,0,0,0,0,0,0,0,0,0,59,255,62,255,51,210,0,0,0
```
![](readme/demo-anim.gif)

