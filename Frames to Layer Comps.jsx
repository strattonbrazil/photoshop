// written by Josh Stratton (2013) - strattonbrazil@gmail.com

function getFrameCount() {
    for (var i = 1; i < 10000; i++) {
        try {
            jumpToFrame(i);
        } catch (err) {
            return i-1;
        }
    }
}

function jumpToFrame(frameNumber) {
    var desc = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIndex( stringIDToTypeID( "animationFrameClass" ), frameNumber );
    desc.putReference( charIDToTypeID( "null" ), ref1 );
    executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
 }

// save off layer comp names
var layerCompNames = new Array();
for (var i = 0; i < app.activeDocument.layerComps.length; i++) {
    layerCompNames.push(app.activeDocument.layerComps[i].name);
}
app.activeDocument.layerComps.removeAll();

var numFrames = getFrameCount();

for (var i = 0; i < numFrames; i++) {
    jumpToFrame(i+1);
    layerCompName = "layerComp" + (i + 1);
    if (i < layerCompNames.length) {
        layerCompName = layerCompNames[i];
    }
    app.activeDocument.layerComps.add(layerCompName, "", true, true, true);
}
