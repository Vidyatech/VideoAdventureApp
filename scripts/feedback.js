var viewport={ width: $(window).width(), height: $(window).height() };
//var isFeedbackVisible = false;
function feedbackForm(e)
{
	ShowGrayScreen();
	var div=$("<div id='feedbackDiv' style='position: absolute; z-index: 214748364; border-radius: 12px 12px 12px 12px; background-color: white; background-position: center top'>");
	$(div).css("width","300px");
	$(div).css("height","200px");
	var lpos=viewport.width/2 - 150;
	var tpos=viewport.height/2 - 100;
	$(div).css("left",lpos +"px");
	$(div).css("top",tpos +"px");
	
	var fbTable='<table cellspacing="0" cellpadding="0" style="height: 100%; width: 100%;"><tr>';
	//first row
	fbTable +='<td style="height:40px"><table cellspacing="0" cellpadding="0" style="width: 100%; height: 100%; border-top-left-radius: 8px; border-top-right-radius: 8px; background-image: url(&quot;images/feedhead.png&quot;); background-repeat: repeat-x;"><tr>';
	fbTable +='<td style="width: 70px; height: 30px;"><div id="cancelFdb" style="margin: 5px; height: 25px; width: 70px;" class="fdbBtnCls">Cancel</div></td>';
	fbTable +='<td nowrap="nowrap" class="fdbHeadingText">Feedback</td>';
	fbTable +='<td id="sendFdbBtn" style="width: 70px;"><div class="fdbBtnCls" style="float: right; margin: 5px; height: 25px; width:70px;">Submit</div></td>';
	fbTable +='</tr></table></td></tr><tr>';
	//second row
	fbTable +='<td nowrap="nowrap" style="height:30px;padding-left: 5px; padding-top: 5px; padding-bottom: 5px; border-bottom: 1px solid rgb(228, 212, 184);">';
	fbTable +='<div class="fdbText" style="float: left; xwidth: 100px; padding-top: 5px;">Email Id(Optional):</div>';
	fbTable +='<input type="text" style="border: medium none; xfloat: right; xwidth: 450px; margin-right: 5px; margin-left: 5px;" class="fdbText" id="emailtext"></td></tr><tr>';
	//third row
	fbTable +='<td style="height:99%;width:99%"><textarea style="overflow-y: auto; margin: 5px 5px 5px 5px; height: 98%; min-width:96%; width: auto; border: medium none;" class="fdbText" id="feedbackDescription"></textarea></td></tr><tr>';
	//fourth row
	fbTable +='<td valign="top"><div align="center" id="errorMsg" style="display: block;" class="reporttextbold"></div></td></tr><tr>';
	//fifth row
	fbTable +='<td height="20px" style="padding-left: 5px; color: red;"><div id="feedbackErrorDiv" style="display: none; font-size: 12px;" class="errortext">Describe here and then click the Submit button.</div></td></tr></table>';
	
	$(div).append(fbTable);
	
	jQuery("body").find("div:eq(1)").append(div);
	//jQuery("#feedbackDescription").focus();
	
	$("#feedbackDescription").live("keydown",function(event){
		try {
            if (event.keyCode == 9)
                return false;
        }
        catch (err) {
            if (e.keyCode == 9)
                return false;
        }
	});
	
	/*$("#feedbackDescription").live("focusin",function(){
		isFeedbackVisible=false;
	});
	$("#emailtext").live("focusin",function(){
		isFeedbackVisible=false;
	});
	$("#feedbackDescription").live("focusout",function(){
		isFeedbackVisible=true;
	});
	$("#emailtext").live("focusout",function(){
		isFeedbackVisible=true;
	});*/
	
	$("#sendFdbBtn").live("click",function(){
		sendFeedback();
	});
	$("#cancelFdb").live("click",function(){
		cancelFeedback();
	});
}

function getheight() {
    var db = document.body;
    var dde = document.documentElement;
    var docHeight = Math.max(db.scrollHeight, dde.scrollHeight, db.offsetHeight, dde.offsetHeight, db.clientHeight, dde.clientHeight)
    docHeight = document.documentElement.offsetHeight;
    return docHeight;
}
function ShowGrayScreen() {
    var docheight;
        if (document.body.scrollHeight >= document.body.offsetHeight) {
            docheight = document.body.scrollHeight;
        }
        else {
            docheight = document.body.offsetHeight - 4;
        }
    $("#grayscreen_table").css("height", jQuery(window).height());
    $("#grayscreen_table").css("width", document.body.scrollWidth);
    jQuery("#grayscreen").show();
}
function HideGrayScreen() {
    jQuery('#grayscreen').hide();
}
function cancelFeedback() {
    jQuery("body").children().find("#feedbackDiv").remove();
    HideGrayScreen();
}
function sendFeedback(userid) {
    document.getElementById("feedbackDescription").value = document.getElementById("feedbackDescription").value.trim();
    if (document.getElementById("feedbackDescription").value == '') {
        var errorDiv = document.getElementById("feedbackErrorDiv");
        errorDiv.style.display = 'block';
        return false;
    }
    document.getElementById('errorMsg').innerHTML = '';
    var fdbContent = document.getElementById("feedbackDescription").value.trim();
    var userid = document.getElementById("emailtext").value.trim();
    videoAdventureFeedback(userid, fdbContent);
}
function videoAdventureFeedback(userid, fdbContent) {
    var webMethod = 'http://videoadventure.vidyatech.biz/Feedback/Feedback.asmx/insertFeedback';
    var parameters = "{'emailid':'" + userid + "','feedback':'" + fdbContent + "'}";
    $.ajax({
        type: "POST",
        url: webMethod,
        data: parameters,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
        },
        error: function (e) {
        }
    });
	jQuery("body").children().find("#feedbackDiv").remove();
    HideGrayScreen();
}
function fnRating() {
    // The URI to launch
    var uriToLaunch = "market://details?id=com.vidyatech.andmobile.videoadventure";
    //"ms-windows-store:REVIEW?PFN=VidyatechSolutionsPvt.Ltd.VideoAdventure_k9k5x47ye59kp";    
    window.open(uriToLaunch, '_blank')
}

function fnLike() {
    // The URI to launch
    var uriToLaunch = "http://videoadventure.vidyatech.biz/FBLike.html";
    // Create a Uri object from a URI string
    window.open(uriToLaunch, '_blank');
}
function feedbackClick(e) {
	//isFeedbackVisible=true;
    feedbackForm(e);
}