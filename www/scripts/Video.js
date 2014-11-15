var isMobile, mobileCircularVedeolst,bestUrl;
var ctr=0;
function getURL(vid) {
	myfunction(vid);
}
function checkUrl(bestUrl,vid)
{
	/*ctr++;
	if(ctr>9)
		return;*/	
	if(typeof bestUrl =='undefined' || bestUrl=="")
	{
		myfunction(vid);
	}
	else
	{
		if (isMobile == false)
            playVideoSrc(bestUrl);
        else
            playMobileVideoSrc(bestUrl);
        return;
	}
}
function myfunction(vid)
{	
	ShowLoading();
	var hurl, murl, surl;
	bestUrl="";
	var urlValue = 'http://www.youtube.com/watch?v=' + vid + '&feature=player_embedded';
	var oReq = new XMLHttpRequest();
    oReq.open("GET", urlValue, true);
    oReq.onload = function () {
    	var index1 = this.responseText.indexOf("try {");
        var index2 = this.responseText.indexOf("catch (e)"); 
        var news = this.responseText.substring(index1, index2 - 1);
        var test = news.split('url');
        for (var ctr1 = 1; ctr1 < 4; ctr1++) {
            tmp = test[ctr1];
            tmp = tmp.replace(/\/\/\//g, "/");
            tmp = tmp.replace(/\\\//g, "/");
            tmp = tmp.replace(/\\u0026/g, "&");
            var tmp3 = tmp.replace(/\/\/\//g, "/");
            tmp3 = tmp3.replace(/\\\//g, "/");
            tmp3 = tmp3.replace(/\\u0026/g, "&");
            tmp3 = tmp3.replace(/}, {/g, "");
            tmp3 = tmp3.replace(/\"/g, '');
            tmp3 = tmp3.replace(/\\/g, '');
            var newarr = tmp3.split(',');
            for (var ct = 0; ct < newarr.length; ct++) {
                if (newarr[ct].indexOf(":") != -1) {
                    var detail = newarr[ct].split(":");
                    var Q = detail[0];
                    /*if (detail[1].indexOf('hd720') > -1) {
                        hurl = newarr[0].split('http')[1];
                    }
                    else if (detail[1].indexOf('medium') > -1) {
                        murl = newarr[0].split('http')[1];
                    }
                    else if (detail[1].indexOf('small') > -1) {
                        surl = newarr[0].split('http')[1];
                    }*/
                    if (detail[1].indexOf('small') > -1) {
                        surl = newarr[0].split('http')[1];
                    }
                    else if (detail[1].indexOf('medium') > -1) {
                        murl = newarr[0].split('http')[1];
                    }
                    else if (detail[1].indexOf('hd720') > -1) {
                    	hurl = newarr[0].split('http')[1];
                    }

                }
            }
        }
         
        if (typeof surl != 'undefined' && surl != "")
            bestUrl = 'http' + surl;
        else if (typeof murl != 'undefined' && murl != "")
            bestUrl = 'http' + murl;
        else if (typeof hurl != 'undefined' && hurl != "")
            bestUrl = 'http' + hurl; 
        checkUrl(bestUrl,vid);
        return;
    };
    oReq.send(null);
	}

function playVideoSrc(URL) {
    $("#VideoID").attr("src", URL);
    var vid = document.getElementById('VideoID');
    vid.play();
}


function playMobileVideoSrc(URL) {
	HideLoading();
    //Code to trigger URL using Mobile Inernal Vedioplayer
    window.plugins.videoPlayer.play(URL);
}

function playVideoBlank() {
    $("#VideoID").attr("src", "");
    //var vid = document.getElementById('VideoID');
    //vid.play();
}

function ShowLoading() {   
	jQuery("#loadingGrayscreen").show();
	$("#loadingGrayscreen").css("width","100%");
	$("#loadingGrayscreen").css("height","100%");
	$("#loadingGrayscreen").css("top",viewport.height/2 - $("#loadingGrayscreen").height()/2);
	$("#loadingGrayscreen").css("left",viewport.width/2 - $("#loadingGrayscreen").width()/2);
    $("#loadingGrayscreen_table").css("height", "20px");
    $("#loadingGrayscreen_table").css("width", "100px"); 
	$("#loadingGrayscreen_table").find("td").css("background-image","url('images/load.gif')");
	$("#loadingGrayscreen_table").find("td").css("background-size","100px 20px");
	$("#loadingGrayscreen_table").find("td").css("background-repeat","no-repeat");
	$("#loadingGrayscreen_table").css("position","relative");
	$("#loadingGrayscreen_table").css("top",$("#loadingGrayscreen").height()/2 - $("#loadingGrayscreen_table").height()/2);
	$("#loadingGrayscreen_table").css("left",$("#loadingGrayscreen").width()/2 - $("#loadingGrayscreen_table").width()/2);
}

function HideLoading() {
    jQuery('#loadingGrayscreen').hide();
}


function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}

function loadxml(xmlstring) {
    //  var moz = (typeof document.implementation != 'undefined') && (typeof document.implementation.createDocument != 'undefined');
    //  var ie = (typeof window.ActiveXObject != 'undefined');
    /*
    if (moz) {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xmlstring, "application/xml");
    }
    else {
    var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.loadXML(xmlstring);
    }
    */

    //if(xmlstring.xml!= 'undefined'){
    //	var xmlDoc =  $.parseXML(xmlstring.xml);
    // 	return xmlDoc;}
    //else 

    return xmlstring;

}

function setMobileVideo() {
    isMobile = true;
}

function setVideo() {
    isMobile = false;

    var container = $("#VideoDiv");
    var id = container.attr("id");
    //var Vcontainer = "";
    //var v = "";
    //$("#" + id).html(Vcontainer);
    //$("#main").html(v);
    $("#VideoID").unbind("timeupdate");
    $("#VideoID").bind("timeupdate", function () {
        timeUpdate();
    });
    $("#" + id).addClass("Player");
    $("#" + id).css("width", "100%");

    $("#" + id).css("height", "100%");
    $("#" + "main").css("width", "100%");
    $("#" + "main").css("height", "100%");
    $("#" + "divVideo").addClass("VideoClass");
    $("#" + "divVideo").css("height", "100%");
    $("#" + "VideoID").css("width", "100%");
    $("#" + "VideoID").css("height", "100%");
    $("#" + "divVideo").addClass("VideoClass");
}


var funCall = false;
var xp = 0;
var yp = 0;
function timeUpdate() {
    if (funCall == true) {
        return;
    }
    var video = document.getElementById('VideoID');
    if (video.currentTime >= video.duration) {
        funCall = true;
        video.pause();
        setTimeout(function () {
            changeVideo();
        }, 1000);
    }
}


function changeVideo() {

    var selectedVD, LastVD, FirstVD; // Changes by sibu .. on work
    isMobile = false;

    currplid = currPid;
    var positionv = vList.indexOf(currvid);
    var nextPosition = parseInt(positionv) + 1;
    if (nextPosition < vList.length)
        currvid = vList[nextPosition];
    else
        currvid = vList[0];
    if (viewport.width < viewport.height) {
        $("#ch_" + currplid).find("td").each(function () {
            if ($(this).hasClass("clsVideoSelectedPlayer")) {
                $(this).removeClass("clsVideoSelectedPlayer");
                if ($(this).attr("id").indexOf("_details") != -1) {
                    $(this).addClass("clsVideoNormalPlayer");
                }
            }
        });
        $("td[id=" + currvid + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + currvid + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + currvid + "_details]").addClass("clsVideoSelectedPlayer");
        $("#ch_" + currplid).find(".curPlico").each(function () {
            if ($(this).html() != "") {
                $(this).html("");
            }
        });
        $("#ch_" + currplid).find(".curPlico").each(function () {
            if ($(this).attr("id") == currvid) {
                $(this).html("<img id='playimage' src='images/cureentplay.png'>");
                var pos = $("td[id=" + currvid + "]").position();
                xp = pos.left;
                yp = pos.top;
                $("td[id=" + currvid + "]").focus();
            }
        });
    }
    else {
        $("#lstpanel").find("tr").find("td").each(function () {
            if ($(this).hasClass("clsVideoSelectedPlayer")) {
                $(this).removeClass("clsVideoSelectedPlayer");
                if ($(this).attr("id").indexOf("_details") != -1) {
                    $(this).addClass("clsVideoNormalPlayer");
                }
            }
        });
        $("td[id=" + currvid + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + currvid + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + currvid + "_details]").addClass("clsVideoSelectedPlayer");
        $(".curPlico").each(function () {
            if ($(this).html() != "") {
                $(this).html("");
            }
            if ($(this).attr("id") == currvid) {
                $(this).html("<img id='playimage' src='images/cureentplay.png'>");
                var pos = $("td[id=" + currvid + "]").position();
                xp = pos.left;
                yp = pos.top;
                $("td[id=" + currvid + "]").focus();
            }
        });

    }
    funCall = false;
    getURL(currvid);
}


function playThisMobileVideo(idd) {
	currTime = 0;
    currvid = idd;
    isMobile = true;
    $("#lstpanel").find("tr").find("td").each(function () {
        if ($(this).hasClass("mobile-clsVideoSelectedPlayer")) {
            $(this).removeClass("mobile-clsVideoSelectedPlayer");
            if ($(this).attr("id").indexOf("_details") != -1) {
                $(this).addClass("mobile-clsVideoNormalPlayer");
            }
        }
    });
    $("td[id=" + currvid + "_details]").removeClass("mobile-clsVideoNormalPlayer");
    $("td[id=" + currvid + "]").addClass("mobile-clsVideoSelectedPlayer");
    $("td[id=" + currvid + "_details]").addClass("mobile-clsVideoSelectedPlayer");
    $("#lstpanel").find(".curPlico").each(function () {
        if ($(this).html() != "") {
            $(this).empty();
        }
    });
    $("#" + idd).next("td").find(".curPlico").each(function () {
        if ($(this).attr("id") == currvid) {
            $(this).html("<img src='images/cureentplay-mobile.png'>");
        }
    });
    //Todo: uncomect following to play all vedio after impliment in Mobile
    PlayMobileCirclularList();
    //alert("1");
   getURL(currvid);
}



function PlayMobileCirclularList() {
    isMobile = true;
    var $curVdtr = $("td[id=" + currvid + "]").parent("tr").first();


    mobileCircularVedeolst = currvid;
    mobileCircularVedeolst = $.makeArray(mobileCircularVedeolst);

    $.each($curVdtr.nextAll().map(function () {
        return $(this).children("td:first").attr("id")
    }).get(), function (index, value) {
        mobileCircularVedeolst.push(value);
    });


    var $firstVdtr = $("#lstpanel").find("tr:first");

    if (console.log) {

        console.log("Vedio List in Original Order:-");

        console.log($firstVdtr.children("td:first").attr("id"));

        $.each($firstVdtr.nextAll().map(function () {
            return $(this).children("td:first").attr("id")
        }).get(), function (index, value) {
            console.log(value);
        });
    }


    if ($firstVdtr.children("td:first").attr("id") != $curVdtr.children("td:first").attr("id")) {
        mobileCircularVedeolst.push($firstVdtr.children("td:first").attr("id"));

        $.each($firstVdtr.nextUntil($curVdtr).map(function () {
            return $(this).children("td:first").attr("id")
        }).get(), function (index, value) {
            mobileCircularVedeolst.push(value);
        });
    }

    mobileCircularVedeolst.reverse();
    playMobileAllVedios(mobileCircularVedeolst);
}


function playMobileAllVedios(Vedeolst) {
    isMobile = true;
    //Todo: impliment here the mobile internal player to run all vedios
    //  Vedeolst: is the requred Array
    //  getURL(currvid): is the play funttion
    // Create a callback function that returns vedio ended event to run next vedio.

    if (console.log) {
        console.log("\n\nVedio list modified for mobile internal player based on selected one:-");
        console.log(Vedeolst);
    }


}



function playThisVideo(idd) {
    currTime = 0;
    currvid = idd;
    isMobile = false;

    if (viewport.width < viewport.height) {
        $("#ch_" + currplid).find("td").each(function () {
            if ($(this).hasClass("clsVideoSelectedPlayer")) {
                $(this).removeClass("clsVideoSelectedPlayer");
                if ($(this).attr("id").indexOf("_details") != -1) {
                    $(this).addClass("clsVideoNormalPlayer");
                }
            }
        });
        $("td[id=" + idd + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + idd + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + idd + "_details]").addClass("clsVideoSelectedPlayer");
        $("#ch_" + currplid).find(".curPlico").each(function () {
            if ($(this).html() != "") {
                $(this).html("");
            }
        });
        $("#ch_" + currplid).find(".curPlico").each(function () {
            if ($(this).attr("id") == currvid) {
                $(this).html("<img src='images/cureentplay-mobile.png'>");
            }
        });
    }
    else {
        $("#lstpanel").find("tr").find("td").each(function () {
            if ($(this).hasClass("clsVideoSelectedPlayer")) {
                $(this).removeClass("clsVideoSelectedPlayer");
                if ($(this).attr("id").indexOf("_details") != -1) {
                    $(this).addClass("clsVideoNormalPlayer");
                }
            }
        });
        $("td[id=" + currvid + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + currvid + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + currvid + "_details]").addClass("clsVideoSelectedPlayer");
        $("#lstpanel").find(".curPlico").each(function () {
            if ($(this).html() != "") {
                $(this).html("");
            }
        });
        $("#" + idd).next("td").find(".curPlico").each(function () {
            if ($(this).attr("id") == currvid) {
                $(this).html("<img src='images/cureentplay.png'>");
            }
        });
    }
    getURL(currvid);
}