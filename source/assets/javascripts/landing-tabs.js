var rhelList = ["learn-the-basics", "manage", "tdi"];
var windowsList = ["learn-the-basics", "manage"];
var ubuntuList = ["learn-the-basics", "manage"];

$("#topics .topic").on("click", function() {
	// Show and hide respective landing tabs
	$(".landing-content#topics").hide();
	$(".landing-content#platforms").show();
	$("#topics-tab").removeClass("landing-tab-active");
	$("#platforms-tab").addClass("landing-tab-active");

	// Get selected topic
	var topic = this.id;
	var info = "#" + topic;

	// Setup handler for when #1 tab title is clicked
	$("#topics-tab").on("click", function() {
		// Switch respective tabs
		$(".landing-content#topics").show();
		$(".landing-content#platforms").hide();
		$("#topics-tab").addClass("landing-tab-active");
		$("#platforms-tab").removeClass("landing-tab-active");
		
		// Clear data and elements
		$(".landing-content#platforms " + info).hide();
		$("ul#platform-tabs > li#rhel").hide();
		$("ul#platform-tabs > li#windows").hide();
		$("ul#platform-tabs > li#ubuntu").hide();
		topic = "";
		info = "";
	});

	// Show respective header and description
	$(".landing-content#platforms " + info).show();

	// Show respective OSs
	if($.inArray(topic, rhelList) > -1) {
		var rhel = $("ul#platform-tabs > li#rhel");
		rhel.show().css("display", "inline-block");
		rhel.children().first().attr("href", "/" + topic + "/rhel/");
	}
	if($.inArray(topic, windowsList) > -1) {
		var windows = $("ul#platform-tabs > li#windows");
		windows.show().css("display", "inline-block");
		windows.children().first().attr("href", "/" + topic + "/windows/");
	}
	if($.inArray(topic, ubuntuList) > -1) {
		var ubuntu = $("ul#platform-tabs > li#ubuntu");
		ubuntu.show().css("display", "inline-block");
		ubuntu.children().first().attr("href", "/" + topic + "/ubuntu/");
	}
});