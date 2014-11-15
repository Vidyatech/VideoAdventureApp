function getCachedFile() {
    if (typeof (Storage) !== "undefined") {
        var xmlStr = localStorage.getItem("menuxmlstring");
        return xmlStr;
    }
}

function setCachedFile(strVal) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("menuxmlstring", strVal);
    }
}

function getFileFromServer(docu) {
    //var chachedFile = getCachedFile();
    //if (chachedFile != null) {
    //    var chachedXml = loadxml(chachedFile);
    //    var serverXml = loadxml(docu);
    //    var chachedVersion = parseFloat($(chachedXml).find("root").attr("version"));
    //    var serverVersion = parseFloat($(serverXml).find("root").attr("version"));
    //    if (serverVersion > chachedVersion) {
    //        setCachedFile(docu);
    //        return docu;
    //    }
    //    else {
    //        return chachedFile;
    //    }
    //}
    //else {
    //    setCachedFile(docu);
    //    return docu;
    //}

    return docu;
}


function gotXML(xmlstring) {
    if (xmlstring != "") {
        var xml = getFileFromServer(xmlstring)
        gotXMLString(xml);
    }
    else {
        gotXMLString(xmlstring);
    }
}

function getXMLString() {
    if (checkNetwork() == "true") {
        $.ajaxSetup({ cache: false });
        $.ajax({
            
            //todo: Uncomment the reqiured one only...
            url: 'http://videoadventure.vidyatech.biz/Playlist/menu.xml',
            //url: "data/menu.xml",

            dataType: 'text',
            success: function (response) { gotXML(response); },
            error: function (e) { gotXML(""); }
        });
    }
    else {
        gotXML("");
    }
}


function checkNetwork() {
    var flag = "true";
    if (navigator.onLine) {
        flag = "true";
    }
    else {
        flag = "false";
    }
    return flag;
}

function loadfromlocal() {
    var localfile = getCachedFile();
    FillLessons(localfile);

}