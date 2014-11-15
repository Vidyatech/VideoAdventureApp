var playmenu, xml = "", isMobile;


//ToDo Edit after Visit: 
//            http://www.designyourway.net/blog/resources/detecting-and-redirecting-mobile-users/ 
//            http://www.android.com/devices/compare/?d=nexus-7&d=excite-77-tablet  

mobileMaximumWidth = 437;
mobileMaximumHeight = 1600;


//detects device using jquery
function detectDevice() {
    isMobile = false;
    if ((viewport.width <= mobileMaximumWidth && viewport.height <= mobileMaximumHeight) ||
     (viewport.width <= mobileMaximumHeight && viewport.height <= mobileMaximumWidth))
        isMobile = true;
}



function setMobileSizePlayer() {
    viewport = { width: $(window).width(), height: $(window).height() };
    $('body').width(viewport.width);
    $('body').height(viewport.height);
    $('#mainDiv').width(viewport.width);
    $('#mainDiv').height(viewport.height);
    var logoDivH=$(".mobile-logoDiv").height();
    var logoDivW=$(".mobile-logoDiv").width();
    $('#contentBg').height(viewport.height - logoDivH);
    $('#contentBg').width(logoDivW);
    $('#mainTbl').width(logoDivW);
    $('#mainTbl').height(viewport.height - logoDivH);
    if (viewport.width > 640) {
    	$(".mobileThemeNameClsPlayer").css("font-size", "20px");
        $(".mobileThemeNameClsPlayerPlyayer").css("font-size", "20px");
        //$("#mobile-bkbtn").css("background-size", "3vw 3vw");
    }

}

function setMobileSizeIndex() {
    viewport = { width: $(window).width(), height: $(window).height() };
    $('body').width(viewport.width);
    $('body').height(viewport.height);
    $('#mainDiv').width(viewport.width);
    $('#mainDiv').height(viewport.height);
    $('#mainTbl').width(viewport.width);
    $('#mainTbl').height(viewport.height - 118);
    $('#rightTbl').height(viewport.height - 128);
    $('#contentBg').height(viewport.height - 128);
    $("#mrow").html("");
}
function setSizePlayer() {
    $('body').width(viewport.width - 30);
    $('body').height(viewport.height - 50);
    var h = $(window).height();
    var w = $(window).width();
    $('#mainDiv').width(viewport.width - 40);
    $('#mainDiv').height(viewport.height - 180);
    $('#mainTbl').width(viewport.width - 40);
    $('#mainTbl').height(viewport.height - 180);
    $('#rightTbl').height(viewport.height - 230);
}
function setSizeIndex() {
    viewport = { width: $(window).width(), height: $(window).height() };
    $('body').width(viewport.width);
    $('body').height(viewport.height);    
    $('#mainDiv').width(viewport.width);
    $('#mainDiv').height(viewport.height);
    $('#mainTbl').width(viewport.width);
    $('#mainTbl').height(viewport.height - 118);
    $('#rightTbl').height(viewport.height - 118);
    $('#contentBg').height(viewport.height - 128); 
    
    $("#themeName").css("background-image","url('./images/330.png')");

}

function FillLessons(docu) {
	if (docu.toLowerCase().indexOf("<root>")!=-1) {
        $("#noNetworkDivParent").hide();
        $("#contentBg").css("opacity", "0");
        xml = docu;
        var chDoc = loadxml(xml);
        var lessCt = $(chDoc).find("playlist").length;
        playmenu = new Array();
        for (var i = 0; i < lessCt; i++) {
            var id = $(chDoc).find("playlist:eq(" + i + ")").attr("id");
            var title = $(chDoc).find("playlist:eq(" + i + ")").attr("label");
            var bgImage = $(chDoc).find("playlist:eq(" + i + ")").attr("imagname");
            var item = { ID: id, Title: title, BGImage: bgImage };
            playmenu.push(item);
        }
        var objmrow = document.getElementById("mrow");
        var tempTd1 = document.createElement("td");
        objmrow.innerHTML = "";
        objmrow.appendChild(tempTd1);

        tempTd1.className = "scrolltd";

        var ttable = document.createElement("table");
        ttable.style.height="100%";
        tempTd1.appendChild(ttable);

        var ttr = document.createElement("tr");
        ttable.appendChild(ttr);

        var ttd = document.createElement("td");
        ttr.appendChild(ttd);

        var innerTable = document.createElement("table");
        ttd.appendChild(innerTable);

        innerTable.border = 0;
        innerTable.borderColor = "red";
        innerTable.cellSpacing = 15;
        innerTable.id = "videoTable";
        innerTable.style.height="100%";


        FillExercisesPortrait();
        setTimeout(function () {
            $("#contentBg").css("opacity", "1");
            myScroll = new iScroll('contentBg', {hScroll:false});
        }, 100);

    }
    else {
        $("#contentBgMain").hide();
        $("#showCmdTd").hide();
        $("#noNetworkDivParent").show();
        $("#btnRetry").show();
        $("#btnRetry").bind("click", function () {
            $("#noNetworkDivParent").hide();
            $("#btnRetry").hide();
            $("#contentBgMain").show();
            $("#showCmdTd").show();
            setSizeIndex();
            $("#loadingTextParent").show();
            getXMLString();
        });
    }
}
function FillMobileLessons(docu) {
	if (docu.toLowerCase().indexOf("<root>")!=-1) {
        $("#noNetworkDivParent").hide();
        $("#contentBg").css("opacity", "0");
        xml = docu;
        var chDoc = loadxml(xml);
        var lessCt = $(chDoc).find("playlist").length;
        playmenu = new Array();
        for (var i = 0; i < lessCt; i++) {
            var id = $(chDoc).find("playlist:eq(" + i + ")").attr("id");
            var title = $(chDoc).find("playlist:eq(" + i + ")").attr("label");
            var bgImage = $(chDoc).find("playlist:eq(" + i + ")").attr("imagname");
            var item = { ID: id, Title: title, BGImage: bgImage };
            playmenu.push(item);
        }
        var objmrow = document.getElementById("mrow");
        var tempTd1 = document.createElement("td");
        objmrow.innerHTML = "";
        objmrow.appendChild(tempTd1);

        tempTd1.className = "scrolltd";

        var ttable = document.createElement("table");
        tempTd1.appendChild(ttable);

        var ttr = document.createElement("tr");
        ttable.appendChild(ttr);

        var ttd = document.createElement("td");
        ttr.appendChild(ttd);

        var innerTable = document.createElement("table");
        ttd.appendChild(innerTable);

        innerTable.border = 0;
        innerTable.borderColor = "red";
        innerTable.cellSpacing = 10;
        innerTable.id = "videoTable";

        FillMobileExercisesPortrait();
        
        setTimeout(function () {
            $("#contentBg").css("opacity", "1");
            myScroll = new iScroll('contentBg', {hScroll:false});
        }, 500);


        if (viewport.width <= 360) {
            $(".mobileThemeNameClsPlayer").css("font-size", "4vw");
            $(".mobileThemeNameClsPlayerPlyayer").css("font-size", "4vw");
            $("#contentBg").width(viewport.width - 5);
            //$(".mobile-blankCell").css("min-width", 160);
        }
        else {
            $(".mobileThemeNameClsPlayer").css("font-size", "17px");
            $(".mobileThemeNameClsPlayerPlyayer").css("font-size", "17px");
            $("#contentBg").width("auto");
            $(".mobile-blankCell").css("min-width", "auto");
        }

    }
    else {
        $("#contentBgMain").hide(); 
        $("#showCmdTd").hide();
        $("#noNetworkDivParent").show();
        $('#noNetworkDivParent').height(viewport.height - 118);
        $("#btnRetry").show();
        $("#btnRetry").bind("click", function () {
            $("#noNetworkDivParent").hide();
            $("#btnRetry").hide();
            $("#contentBgMain").show();
            $("#showCmdTd").show();
            setSizeIndex();
            $("#loadingTextParent").show();
            getXMLString();
        });
    }
}


//todo set Maximum allowed Image width,Minimum Allowed

var imgMaxWidth = 170;

function FillMobileExercisesPortrait() {
	//alert($("#themeName").width());
    // var imgH = 20;
    // For Trail & Error Purpose
    // Don't play with it without going through logic thoughrougly
    var c1 = 30;
    var c2 = 10;
    //The logical code
    var imgW = imgMaxWidth;
    var total = parseInt(playmenu.length);
    var n = ((viewport.width - c1) / (imgW + c2));
    n = parseInt(n) + ((parseInt(n) == n) ? 0 : 1);
    if (((viewport.width - c1) % (imgMaxWidth + c2)) != 0) {
        imgW = ((viewport.width - c1) / (n)) - c2;
    }
    var imgH = .5625 * imgW;
    var rowcount = Math.round(total / ((viewport.width - c1) / (imgW + c2)));
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

    var chTable = document.getElementById("videoTable");
    chTable.innerHTML = "";
    for (var c = 1; c <= rowcount; c++) {
        var chTable = document.getElementById("videoTable");
        var chRow = document.createElement("tr");
        chTable.appendChild(chRow);
        chRow.id = "row_" + c;
    }
    var tempChk = 0;
    tempChk = (viewport.width - 100) % 180;
    if (tempChk < 60) {
        var tcount = parseInt((viewport.width - 100) / 180);
        tcount += .5;
        // var imgW = (viewport.width - 100) / tcount;
    }
    var ctr = 0;
    for (var lct = 0; lct < cellcount; lct++) {
        for (var i = 1; i <= rowcount; i++) {
            ctr++;
            var rowTrObj = document.getElementById("row_" + i);
            var rowtdObj = document.createElement("td");
            rowTrObj.appendChild(rowtdObj);

            rowtdObj.id = playmenu[ctr - 1].ID;

            $(rowtdObj).css("width", imgW +"px");
            $(rowtdObj).css("height", imgH +"px");
            $(rowtdObj).css("background-size", imgW + "px "+ imgH +"px");
            //$(rowtdObj).css("background-size", "100% 100%");
            rowtdObj.style.backgroundImage = "url('" + playmenu[ctr - 1].BGImage + "')";
            rowtdObj.style.border = "2px solid green";
            $(rowtdObj).css("background-repeat", "no-repeat");
            rowtdObj.style.verticalAlign="bottom";
            rowtdObj.setAttribute("onclick", "redirect('" + playmenu[ctr - 1].ID + "')");

            var tta = document.createElement("table");
            rowtdObj.appendChild(tta);
            tta.cellPadding = 0;
            tta.cellSpacing = 0;
            tta.border = 0;
            tta.borderColor = "blue";
            tta.style.width = imgW + "px";
            tta.style.height = imgH + "px";

            var tableRowObj1 = document.createElement("tr");
            tta.appendChild(tableRowObj1);
            var tableCellObj1 = document.createElement("td");
            tableRowObj1.appendChild(tableCellObj1);
            tableCellObj1.className = "mobile-blankCell";
            tableCellObj1.id = playmenu[ctr - 1].ID;

            tableCellObj1.style.width = imgW + "px";
            tableCellObj1.style.height = "100%";
            var tableRowObj2 = document.createElement("tr");
            tta.appendChild(tableRowObj2);
            var tableCellObj2 = document.createElement("td");
            tableRowObj2.appendChild(tableCellObj2);
            tableCellObj2.className = "mobile-extitle";
            tableCellObj2.style.height = "22px";

            var div1 = document.createElement("div");
            
            //tableCellObj2.appendChild(div1);

            div1.className = "titlediv";
            div1.style.height="22px";
            var titleText=playmenu[ctr - 1].Title;
            
            var len = titleText.visualLength();
            
            
            var Marqu = document.createElement("marquee");
            Marqu.setAttribute("behavior","alternate");
            Marqu.setAttribute("direction","left");
            Marqu.setAttribute("scrolldelay","500");
            Marqu.setAttribute("height","22");
            
            
            if($(tableCellObj2).width() - 8<len)
            {
            	tableCellObj2.appendChild(div1);
            	div1.appendChild(Marqu);
            	$(Marqu).text(titleText); 
            }
            else
            {    
            	tableCellObj2.appendChild(div1);
            	$(div1).text(titleText); 
            }
            if (ctr >= total)
                return;
        }

    }
    return;
}

String.prototype.visualLength = function()
{
	var ruler = document.getElementById("ruler");
    ruler.innerHTML = this;
    return ruler.offsetWidth;
}

function FillExercisesPortrait() {
	var imgWO = 320;
    var imgHO = 180;    
    var tempChk = 0;
    var tempChk1 = 0;
    var avarea=$("#contentBg").width();
    
    tempChk1=(avarea) % imgWO; 
    if(tempChk1 == 0)
    {    	
    	var imgW = imgWO - 30;
    }
    else
    {
    	var half=imgWO/2;
	    
	    if (tempChk1 <= half) 
	    {
	    	var abt = parseInt((avarea) / imgWO) +1;
	    	var spa=30*(abt);
	    	var abc1=(tempChk1-spa)/abt;	    	
	        var imgW = imgWO - abc1;
	    }
	    else
	    {
	    	var abt = parseInt((avarea) / imgWO);
	    	var spa=30*(abt);
	    	var abc1=(tempChk1-spa)/abt;	    	
	        var imgW = imgWO + abc1;
	    }
    }
    var imgH = (imgHO/imgWO) * imgW;
    
    var collCount = parseInt(avarea / (imgW - 15));
    //alert(collCount);
    //alert((viewport.width) - 80);
    var total = parseInt(playmenu.length);
    if (total <= collCount)
        rcount = 1;
    else {
        rcount = total % collCount;
        if (rcount != 0) {
            rcount = parseInt(total / collCount);
            rcount++;
        }
        else
            rcount = total / collCount;
    }
    var chTable = document.getElementById("videoTable");
    chTable.innerHTML = "";
    for (var c = 1; c <= rcount; c++) {
        var chTable = document.getElementById("videoTable");
        var chRow = document.createElement("tr");
        chTable.appendChild(chRow);
        chRow.id = "row_" + c;
    }   
    
    var ctr = 0;
    for (var lct = 1; lct <= rcount; lct++) {
        for (var i = 1; i <= collCount; i++) {
            ctr++;
            var rowTrObj = document.getElementById("row_" + lct);
            var rowtdObj = document.createElement("td");
            rowTrObj.appendChild(rowtdObj);
            rowtdObj.id = playmenu[ctr - 1].ID;
            $(rowtdObj).css("width", imgW + "px");
            $(rowtdObj).css("height", imgH + "px");
            
            //$(rowtdObj).css("position", "absolute");
            
            $(rowtdObj).css("background-size", imgW + "px "+ imgH +"px");
            //$(rowtdObj).css("background-size", "100% 100%");
            rowtdObj.style.backgroundImage = "url('" + playmenu[ctr - 1].BGImage + "')";
            rowtdObj.style.border = "2px solid green";
            $(rowtdObj).css("background-repeat","no-repeat");
            rowtdObj.style.verticalAlign="bottom";
            rowtdObj.setAttribute("onclick", "redirect('" + playmenu[ctr - 1].ID + "')");
            var tta = document.createElement("table");
            rowtdObj.appendChild(tta);
            tta.cellPadding = 0;
            tta.cellSpacing = 0;
            tta.border = 0;
            tta.borderColor = "blue";
            tta.style.width = imgW + "px";
            tta.style.height = imgH + "px";
            
            var tableRowObj1 = document.createElement("tr");
            tta.appendChild(tableRowObj1);
            var tableCellObj1 = document.createElement("td");
            tableRowObj1.appendChild(tableCellObj1);
            tableCellObj1.className = "blankCell";
            tableCellObj1.id = playmenu[ctr - 1].ID;
            tableCellObj1.style.width = imgW + "px";
            tableCellObj1.style.height = "100%";
            var tableRowObj2 = document.createElement("tr");
            tta.appendChild(tableRowObj2);
            var tableCellObj2 = document.createElement("td");
            tableRowObj2.appendChild(tableCellObj2);
            tableCellObj2.className = "extitle";
            tableCellObj2.style.height = "22px";

            var div1 = document.createElement("div");
            
            //tableCellObj2.appendChild(div1);

            div1.className = "titlediv";
            div1.style.height="22px";
            var titleText=playmenu[ctr - 1].Title;
            
            var len = titleText.visualLength();
            
            
            var Marqu = document.createElement("marquee");
            Marqu.setAttribute("behavior","alternate");
            Marqu.setAttribute("direction","left");
            Marqu.setAttribute("scrolldelay","500");
            Marqu.setAttribute("height","22");
            
            
            if($(tableCellObj2).width() - 8<len)
            {
            	tableCellObj2.appendChild(div1);
            	div1.appendChild(Marqu);
            	$(Marqu).text(titleText); 
            }
            else
            {    
            	tableCellObj2.appendChild(div1);
            	$(div1).text(titleText); 
            }        
            		
            if (ctr == total)
                return;
        }
    }
    return;
}

function noNetworkPlayer() {	
    $("#contentBg").hide();
    $("#noNetworkDivParent").show();
    $('#noNetworkDivParent').height(viewport.height - 118);
    $("#btnRetry").show();
    $("#btnRetry").bind("click", function () {
        $("#btnRetry").hide();
        $("#contentBg").show();
        if (docMode == "") {
            if (viewport.width > viewport.height)
                docMode = "LandScape";
            else
                docMode = "Portrait";
        }
        //setSizePlayer();
        setMobileSizePlayer();
        $("#loadingTextParent").show();
        getXMLString();
        $("#bkbtn").click(function (e) {
            window.location = "index.html";
        });
    });
}

function showCommand()
{
	$(".commandTd").slideToggle(0,function(){
		if($(".commandTd").is(":visible"))
    	{			
			$("#showCmdDiv").css("background-image","url('./images/hidecmd.png')");
    	}
    	else
    	{   
    		//$('#contentBg').height($('#contentBg').height() - 35);		    
		    //$('#mainTbl').height($('#mainTbl').height() - 35);
    		$("#showCmdDiv").css("background-image","url('./images/showcmd.png')");
    	}
	});
}

function setTitle()
{
	if($("#themeName").width()<=160)
    {    	
    	var imgWO=160;
    	var imgHO=24;
    	var imgW=$("#themeName").width();
    	var imgH=(imgHO/imgWO)*imgW;
	    $("#themeName").css("background-size",imgW + "px " + imgH + "px");
	    $("#themeName").css("background-image","url('./images/160.png')");
    }
    else if($("#themeName").width()>160 && $("#themeName").width() <= 600)
    {
    	$("#themeName").css("background-image","url('./images/217.png')");
    	$("#themeName").css("background-size","217px 32px");
    }
    else if($("#themeName").width() > 600)
    {
    	$("#themeName").css("background-image","url('./images/330.png')");
    	$("#themeName").css("background-size","330px 60px");
    }
    else
    {
    	$("#themeName").css("background-image","");
    	$("#themeName").css("background-image","url('./images/160.png')");
    }
}

/*document.addEventListener("backbutton", function(e){
	alert("hi");
	alert($.mobile.activePage.attr('id'));
	if($.mobile.activePage.is('#homepage')){
        e.preventDefault();
        navigator.app.exitApp();
    }
    else {
        navigator.app.backHistory()
    }
}, false);*/