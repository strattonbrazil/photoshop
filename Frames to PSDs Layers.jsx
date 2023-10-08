// written by Josh Stratton (2015) - strattonbrazil.com

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/FramesToPSDsLayers/Menu=Frames to PSDs Layers</name>
<category>Frames</category>
<enableinfo>true</enableinfo>
</javascriptresource>

// END__HARVEST_EXCEPTION_ZSTRING

*/

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

var numFrames = getFrameCount();

function deleteCurrentFrame() {
    // =======================================================
    var idDlt = charIDToTypeID( "Dlt " );
    var desc6 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref4 = new ActionReference();
    var idanimationFrameClass = stringIDToTypeID( "animationFrameClass" );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref4.putEnumerated( idanimationFrameClass, idOrdn, idTrgt );
    desc6.putReference( idnull, ref4 );
    executeAction( idDlt, desc6, DialogModes.NO );
}

function deleteHiddenLayers() {
    // =======================================================
    var idDlt = charIDToTypeID( "Dlt " );
    var desc2 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idhidden = stringIDToTypeID( "hidden" );
    ref1.putEnumerated( idLyr, idOrdn, idhidden );
    desc2.putReference( idnull, ref1 );
    executeAction( idDlt, desc2, DialogModes.NO );
}

var mainDocument = app.activeDocument;

for (var i = 0; i < numFrames; i++) {
    jumpToFrame(i+1);
 
    var frameDocument = mainDocument.duplicate("frame_" + (i+1));
    app.activeDocument = frameDocument;
    
    // remove frames before
    jumpToFrame(1); // jump to first frame
    for (var j = 0; j < i; j++) {
        deleteCurrentFrame();
    }
    
    // remove frames after
    for (var j = 0; j < numFrames - i - 1; j++) { // just for counting
        jumpToFrame(2);
        deleteCurrentFrame();
    }

    deleteHiddenLayers();

    var outFile = new File(mainDocument.path + "/frame_" + (i+1));
    frameDocument.saveAs(outFile);
    frameDocument.close();
    
    // return to original document
    app.activeDocument = mainDocument;
}

alert("Files saved to " + mainDocument.path + "/frame_*.psd");