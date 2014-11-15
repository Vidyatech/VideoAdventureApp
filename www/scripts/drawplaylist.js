var vList = new Array();
var xmlString = "";
var currplid;
function createXml(doc) {
    xml1 = doc;
    var topicDoc = loadxml(xml1);
    var LID = currPid;
    var topicCt = $(topicDoc).find("playlist[id='" + LID + "']").find("video").length;
    var title = $(topicDoc).find("playlist[id='" + LID + "']").attr("label");
    currvid = $(topicDoc).find("playlist[id='" + LID + "']").find("video:eq(0)").attr("id");  
    
    $("#themeName").text(title);
    
    //background-image:url('./images/mobile-video-1.png');background-repeat:no-repeat;height:36px;background-position: left top;
    for (var i = 0; i < topicCt; i++) {
        var id = $(topicDoc).find("playlist[id='" + LID + "']").find("video:eq(" + i + ")").attr("id");
        var title = $(topicDoc).find("playlist[id='" + LID + "']").find("video:eq(" + i + ")").attr("title");
        var duration = $(topicDoc).find("playlist[id='" + LID + "']").find("video:eq(" + i + ")").attr("duration");
        var imageurl = "http://i3.ytimg.com/vi/" + id + "/mqdefault.jpg";

        vList.push(id);
    }
}
function onDraw() {
    if (viewport.width > viewport.height) {
        $("#listV").hide();
        $("#listH").show();
        drawList();
    }
    else {
        $("#listH").hide();
        $("#listV").show();
        drawListVertically();
    }
}

function drawListVertically() {
    var rpwidth = $("#VideoTd").width();
    var rpheight = $("#VideoTd").height();
    $("#listV").find("div:eq(0)").html("");
    $("#listV").css("width", rpwidth);
    $("#listV").css("padding-left", "20px");
    $("#listV").css("padding-top", "1px");
    $("#listV").css("padding-right", "20px");
    var inHtml = '<div style="overflow:auto" id="scrollDiv2"><table cellspacing="0" cellpadding="0" id="lstpanel" style="height:100%;" border="0" bordercolor="blue"><tr id="mrow"></tr></table></div>';
    $("#listV").find("div:eq(0)").append(inHtml);
    $("#scrollDiv2").width(rpwidth);
    FillList(xmlString);
}
function drawList() {
    var rpwidth = $("#VideoTd").width();
    var rpheight = $("#VideoTd").height();
    $("#listH").find("div:eq(0)").html("");
    $("#listH").css("height", rpheight);
    $("#listH").css("padding-left", "20px");
    $("#listH").css("padding-right", "10px");
    $("#listH").css("padding-top", "10px");
    var inHtml = '<div style="overflow:auto" id="scrollDiv1" ><table cellspacing="0" cellpadding="0" id="lstpanel" style="width:100%;height:auto;" border="0" bordercolor="red"></table></div>';
    $("#listH").find("div:eq(0)").append(inHtml);
    $("#scrollDiv1").height(rpheight);
    FillList(xmlString);
}

function FillList(doc) {
    currplid = currPid;
    xml1 = doc;
    var chDoc1 = loadxml(xml1);
    var lessCount = $(chDoc1).find("playlist[id=" + currplid + "]").find("video").length;
    var playmenu1 = new Array();
    for (var i = 0; i < lessCount; i++) {
        var id = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("id");
        var title = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("title");
        var imageurl = "http://i3.ytimg.com/vi/" + id + "/mqdefault.jpg";
        var duration = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("duration");
        var item = { ID: id, Title: title, BGImage: imageurl, Duration: duration };
        playmenu1.push(item);
    }
    if (viewport.width > viewport.height) {
        for (var i = 0; i < playmenu1.length; i++) {
            $("#lstpanel").append("<tr><td id=" + playmenu1[i].ID + " style='border-bottom: 1px solid green; padding: 5px 5px 5px 5px;width:96px'><div style='float: left; margin-right: 5px;height: 54px; width: 96px;cursor:pointer'></div></td><td id=" + playmenu1[i].ID + "_details class='clsVideoNormalPlayer' style='border-bottom: 1px solid green; padding: 5px 5px 5px 5px;'><div><table cellspacing='0' cellpadding='0' style='width:100%;'><tr><td style='height:40px'>" + playmenu1[i].Title + "</td></tr><tr><td><div class='durationTxt'>" + playmenu1[i].Duration + "</div><div class='curPlico' id=" + playmenu1[i].ID + " style='text-align:right;float:right;width:20px;height:27px'></div></td></tr></table></div></td></tr>");
            var videoid;
            $("#" + playmenu1[i].ID).bind("click", function () {
                videoid = $(this).attr("id");
                playThisVideo(videoid);
            });
            $("#" + playmenu1[i].ID + "_details").bind("click", function () {
                videoid = $(this).attr("id");
                videoid = videoid.substring(0, videoid.length - 8);
                playThisVideo(videoid)
            });
            $("#" + playmenu1[i].ID).find("div:eq(0)").css("background-image", "url('" + playmenu1[i].BGImage + "')");
            $("#" + playmenu1[i].ID).find("div:eq(0)").css("background-size", "96px 54px");
        }
        $("div[id=" + currvid + "]").html("");
        $("div[id=" + currvid + "]").html("<img src='images/cureentplay.png'>");
        $("td[id=" + currvid + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + currvid + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + currvid + "_details]").addClass("clsVideoSelectedPlayer");

    }
    else {
        $("#mrow").append("<td class='scrolltd' style='padding:0'><table border='0' bordercolor='red' cellspacing='0' id='ch_" + currplid + "' style='height:100%'></table></td>");

        var rowcount = 2;
        var total = parseInt(playmenu1.length);
        if (total <= rowcount)
            cellcount = 1;
        else {
            cellcount = total % rowcount;
            if (cellcount != 0) {
                cellcount = parseInt(total / rowcount);
                cellcount++;
            }
            else
                cellcount = total / rowcount;
        }
        for (var c = 1; c <= rowcount; c++) {
            $("#ch_" + currplid).append("<tr id='row_" + currplid + "_" + c + "'></tr>");
        }
        var ctr = 0;
        for (var lct = 0; lct < cellcount; lct++) {
            for (var i = 1; i <= rowcount; i++) {
                ctr++;
                $("#row_" + currplid + "_" + i).append("<td id=" + playmenu1[ctr - 1].ID + " style='border-top:3px solid green;padding: 5px 5px 5px 5px;width:112px'><div style='float: left; margin-right: 5px;height: 63px; width: 112px;cursor:pointer'></div></td><td class='clsVideoNormalPlayer' id=" + playmenu1[ctr - 1].ID + "_details style='border-top:3px solid green;padding: 5px 5px 5px 5px;height: 63px;'><div style='width: 200px'><table cellspacing='0' cellpadding='0' style='width:100%;'><tr><td style='height:40px;font-size:15px'>" + playmenu1[ctr - 1].Title + "</td></tr><tr><td><div class='durationTxt'>" + playmenu1[ctr - 1].Duration + "</div><div class='curPlico' id=" + playmenu1[ctr - 1].ID + " style='text-align:right;float:right;width:20px;height:27px'></div></td></tr></table></div></td><td>&nbsp;&nbsp;&nbsp;</td>");
                $("#" + playmenu1[ctr - 1].ID + "_details").bind("click", function () {
                    videoid = $(this).attr("id");
                    videoid = videoid.substring(0, videoid.length - 8);
                    playThisVideo(videoid)
                });
                $("#" + playmenu1[ctr - 1].ID).bind("click", function () {
                    playThisVideo(videoid)
                });
                $("#" + playmenu1[ctr - 1].ID).find("div:eq(0)").css("background-image", "url('" + playmenu1[ctr - 1].BGImage + "')");
                $("#" + playmenu1[ctr - 1].ID).find("div:eq(0)").css("background-size", "112px 63px");
                if (ctr == total)
                    break;
            }

        }
        $("div[id=" + currvid + "]").html("");
        $("div[id=" + currvid + "]").html("<img src='images/cureentplay.png'>");
        $("td[id=" + currvid + "_details]").removeClass("clsVideoNormalPlayer");
        $("td[id=" + currvid + "]").addClass("clsVideoSelectedPlayer");
        $("td[id=" + currvid + "_details]").addClass("clsVideoSelectedPlayer");
    }
}

function onMobileDraw() {
    drawMobileList();
}

function drawMobileList() {
	if(myScroll != null)
    {
    	myScroll.destroy();
    	myScroll = null;
    }
	/*$(".mobile-footer").show();
    $(".mobile-footer").height(78);
    $(".mobile-footer").css("height", "78px");*/
    var rpwidth = $("#mainTbl").width();
    var rpheight = (viewport.height) - $(".mobile-logoDiv").height() - 35;    
    $("#listH").find("div:eq(0)").empty();
    //$("#listH").height(rpheight);
    $("#listH").css("padding-left", "15px");
    var inHtml = '<div id="scrollDiv1" style="position:relative;top:0"><table cellspacing="0" cellpadding="0" id="lstpanel" style="width:100%;height:auto; min-width: 342px;" border="0" bordercolor="red"></table></div>';
    $("#listH").find("div:eq(0)").empty();
    $("#listH").find("div:eq(0)").append(inHtml);
    $("#scrollDiv1").height(rpheight);
    FillMobileList(xmlString);
}

function FillMobileList(doc) {
    currplid = currPid;
    xml1 = doc;
    var chDoc1 = loadxml(xml1);
    var lessCount = $(chDoc1).find("playlist[id=" + currplid + "]").find("video").length;
    var playmenu1 = new Array();
    for (var i = 0; i < lessCount; i++) {
        var id = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("id");
        var title = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("title");
        var imageurl = "http://i3.ytimg.com/vi/" + id + "/mqdefault.jpg";
        var duration = $(chDoc1).find("playlist[id=" + currplid + "]").find("video:eq(" + i + ")").attr("duration");
        var item = { ID: id, Title: title, BGImage: imageurl, Duration: duration };
        playmenu1.push(item);
    }
    for (var i = 0; i < playmenu1.length; i++) {
        $("#lstpanel").append("<tr><td id=" + playmenu1[i].ID + " style='border-top: 1px solid #7C7B7F;border-bottom: 1px solid #7c7b7f; padding: 5px 5px 5px 5px;width:96px;vertical-align: bottom;'><div style='float: left; margin-right: 5px;height: 54px; width: 96px;cursor:pointer'></div></td><td id=" + playmenu1[i].ID + "_details class='mobile-clsVideoNormalPlayer' style='border-top: 1px solid #7C7B7F;border-bottom: 1px solid #7c7b7f; padding: 10px 5px 0px 5px;'><div><table cellspacing='0' cellpadding='0' style='width:100%;'><tr><td style='height:40px;color: #066DCB;'>" + playmenu1[i].Title + "</td></tr><tr><td style='float: right;'  ><div class='durationTxt' style=' text-align: right; padding-right: 10px;'>" + playmenu1[i].Duration + "</div><div class='curPlico' id=" + playmenu1[i].ID + " style='text-align:right;float:right; width:15px;height:15px;'></div></td></tr></table></div></td></tr>");
        var videoid;
        $("#" + playmenu1[i].ID).bind("click", function () {
            videoid = $(this).attr("id");
            _gaq.push(['_trackEvent', "Video", videoid]);
            playThisMobileVideo(videoid);
        });
        $("#" + playmenu1[i].ID + "_details").bind("click", function () {
        	videoid = $(this).attr("id");
            videoid = videoid.substring(0, videoid.length - 8);
            _gaq.push(['_trackEvent', "Video", videoid]);
            playThisMobileVideo(videoid);
        });
        $("#" + playmenu1[i].ID).find("div:eq(0)").css("background-image", "url('" + playmenu1[i].BGImage + "')");
        $("#" + playmenu1[i].ID).find("div:eq(0)").css("background-size", "cover");
    }
    $("div[id=" + currvid + "]").html("");
    $("div[id=" + currvid + "]").html("<img src='images/cureentplay-mobile.png'>");
    $("td[id=" + currvid + "_details]").removeClass("mobile-clsVideoNormalPlayer");
    $("td[id=" + currvid + "]").addClass("mobile-clsVideoSelectedPlayer");
    $("td[id=" + currvid + "_details]").addClass("mobile-clsVideoSelectedPlayer");

    var rpwidth = $("#mainTbl").width();
    //Calculating height of first 3 rows
    var fisrt3VedHight = eval($("#lstpanel").find("tr:first").siblings().siblings().slice(0, 3).map(function () { return $(this).height() }).get().join("+"));
    var rpheight = (viewport.height - $(".mobile-logoDiv").height()) - 35;
    //alert("rpheight : " + rpheight);
    /*if ((rpwidth > $("#mainTbl").height()) && (rpheight < (fisrt3VedHight))) {
        $(".mobile-footer").height(0);
        $(".mobile-footer").css("height","0px");
        $(".mobile-footer").hide();
    }
    else {
        $(".mobile-footer").show();
        $(".mobile-footer").height(78);
        $(".mobile-footer").css("height", "78px");
    }*/
    rpheight = (viewport.height - $(".mobile-logoDiv").height()) - 35;
    if (rpheight < fisrt3VedHight) {
        rpheight = fisrt3VedHight - 35;
        //$("#scrollDiv1").height(rpheight);
    }
    $("#scrollDiv1").height(rpheight);
    //alert($(".mobile-footer").height());
    //alert("rpheight : " + rpheight);
    setTimeout(function () {
        myScroll = new iScroll('scrollDiv1', { hScroll: false});
    }, 100);
}

function setScrollPosition(currvid)
{
	var yp,xp;
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
	$(".curPlico").each(function () {
		if ($(this).html() != "") {
			//alert("1 : "+$(this).html());
			$(this).html("");
		}
		if ($(this).attr("id") == currvid) {
			$(this).html("<img id='playimage' src='images/cureentplay-mobile.png'>");
			var pos = $("td[id=" + currvid + "]").position();
			xp = pos.left;
			yp = pos.top;			
		}
	});
	var containerpos = $("#listH").position();	
	if ((yp + 150) > viewport.height || yp < containerpos.top) {
		//alert("called");
		setTimeout(function () {
			myScroll.scrollTo(0, yp, 200, true);
		}, 100);
	}
}

