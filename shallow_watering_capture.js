// Hydratelyn shallow-watering capture sequence for Digilent WaveForms.
// Impedance1 should be configured in the WaveForms workspace before running.

clear();

var folder = "G:/My Drive/Projects/Hydratelyn/Raw_Data/Shallow/5/";
var sample_prefix = "5_shallow";
var hours = 1;
var interval_ms = 1 * 60 * 1000;

function captureAndExport(label, filename) {
    print("Starting " + label + " sweep...");
    Impedance1.single();

    if (!Impedance1.wait()) {
        print(label + " sweep stopped or failed.");
        return false;
    }

    Impedance1.Export(folder + filename);
    print("Saved " + folder + filename);
    return true;
}

// Checkpoint 1: leave the probes in air, then click Yes.
if (!Tool.question("Place the probes in air. Capture the air calibration now?")) {
    throw "Cancelled before air calibration.";
}
if (!captureAndExport("air calibration", "5_air_calibration.csv")) {
    throw "Air calibration failed.";
}

// Checkpoint 2: place the probes in the dry sample, then click Yes.
if (!Tool.question("Place the probes in the dry soil. Capture the dry calibration now?")) {
    throw "Cancelled before dry calibration.";
}
if (!captureAndExport("dry calibration", "5_dry_calibration.csv")) {
    throw "Dry calibration failed.";
}

// The collection timer is deliberately not started until watering is complete.
if (!Tool.question("Water the sample now. Click Yes only when watering is complete and you want to start the timed series.")) {
    throw "Cancelled before timed collection.";
}

var sweep_count = hours * 60;
var start_ms = new Date().getTime();

for (var i = 0; i < sweep_count; i++) {
    var target_ms = start_ms + i * interval_ms;
    var remaining_s = (target_ms - new Date().getTime()) / 1000;

    if (remaining_s > 0 && !wait(remaining_s)) {
        break;
    }

    if (!captureAndExport("timed sweep " + i, sample_prefix + "_" + i + ".csv")) {
        break;
    }
}

print("Timed collection finished.");
