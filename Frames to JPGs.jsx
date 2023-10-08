// written by Josh Stratton (2015) - strattonbrazil.com

/*

// BEGIN__HARVEST_EXCEPTION_ZSTRING

<javascriptresource>
<name>$$$/JavaScripts/FramesToJPGs/Menu=Frames to JPGs</name>
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
    //var idslct = charIDToTypeID("slct");
    //var desc236 = new ActionDescriptor();
    //var idnull = charIDToTypeID("null");
    //var ref2 = new ActionReference();
    //var idanimationFrameClass = stringIDToTypeID("animationFrameClass");
    //ref2.putIndex(idanimationFrameClass, frameNumber);
    //desc236.putReference(idnull, ref2);
    //executeAction(idslct, desc236, DialogModes.NO);

    var desc = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putIndex( stringIDToTypeID( "animationFrameClass" ), frameNumber );
    desc.putReference( charIDToTypeID( "null" ), ref1 );
    executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
}

function saveJPEG() {
    var savedDisplayDialogs = app.displayDialogs;
    app.displayDialogs = DialogModes.NO;

    try {
        var tmp = app.activeDocument.fullName.name;
        ftype = decodeURI(tmp.substring(tmp.lastIndexOf("."),)).toLowerCase();
        if (ftype == ".nef" || ftype == ".cr2" || ftype == ".crw" || ftype == ".dcs" || ftype == ".raf" || ftype == ".arw" || ftype == ".orf") {
            throw "error1";
        }
        fname = app.activeDocument.name.replace(/\.[^\.]+$/, '');
        SaveAsJPEG(10, new File(activeDocument.path + "/" + fname), true, true);
        // or (SaveOptions.SAVECHANGES) or (SaveOptions.PROMPTTOSAVECHANGES)
        app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        // alert("The document has been saved as a JPEG!");
    } catch (e) {
        alert("The document has not been saved yet!")
    }

    app.displayDialogs = savedDisplayDialogs;
}

var numFrames = getFrameCount();

var mainDocument = app.activeDocument;

var savedDisplayDialogs = app.displayDialogs;
app.displayDialogs = DialogModes.NO;

try {
    for (var i = 1; i <= numFrames; i++) {
        jumpToFrame(i);
        var fileName = "frame_" + i + ".jpg";
        var outFile = new File(fileName);

        var jpgOptions = new JPEGSaveOptions();
        jpgOptions.quality = 10;
        jpgOptions.embedColorProfile = true;
        jpgOptions.formatOptions = FormatOptions.PROGRESSIVE;
        if (jpgOptions.formatOptions == FormatOptions.PROGRESSIVE) { jpgOptions.scans = 5; }
        jpgOptions.matte = MatteType.NONE;

        app.activeDocument.saveAs(outFile, jpgOptions);
    }

    alert("Files saved to " + mainDocument.path + "/frame_*.jpg");
} catch (e) {
    alert("Something failed");
    alert(e);
} finally {
    app.displayDialogs = savedDisplayDialogs;
}