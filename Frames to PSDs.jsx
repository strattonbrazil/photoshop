// written by Josh Stratton (2015) - strattonbrazil.com

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

function removeHiddenLayers(layerNode) {
    for (var i = 0; i < layerNode.length; i++) {
        removeHiddenLayers(layerNode[i].layerSets);
        
        var layersToRemove = [];
        for (var layerIndex = 0; layerIndex < layerNode[i].artLayers.length; layerIndex++) {
            var layer = layerNode[i].artLayers[layerIndex];
            alert("processing layer: " + layer);
            if (!layer.visible) {
                alert("scheduling for removal!");
                layersToRemove.push(layer);
            }
        }
    
        for (var j = 0; j < layersToRemove.length; j++) {
            layersToRemove[j].remove();
            alert("layer removed!");
        }
    }
}

var dstFolder = Folder.selectDialog ("Select folder where files will be saved");
if (dstFolder != null) {

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

        // delete hidden layers
        //for (var j = 0; j < frameDocument.layerSets.length; j++) {
          //  var layerSet = frameDocument.layerSets[j];
         //   removeHiddenLayers(layerSet);
        //}
        removeHiddenLayers(frameDocument.layerSets);
        
        var outFile = new File(dstFolder + "/frame_" + (i+1));
        frameDocument.saveAs(outFile);
        //frameDocument.close();
    
        // return to original document
        app.activeDocument = mainDocument;
    }
}
