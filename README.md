# Hydratelyn WaveForms capture scripts

`shallow_watering_capture.js` captures an air calibration, a dry-soil
calibration, and then waits for confirmation that the sample has been watered
before starting a one-hour impedance series at one-minute intervals.

Before running it, configure `Impedance1` in the WaveForms GUI and update the
`folder` and `sample_prefix` variables near the top of the script for the
sample being tested.

WaveForms confirmation dialogs use **Yes** to continue. Choosing **No** at any
checkpoint cancels the run before the next acquisition begins.
