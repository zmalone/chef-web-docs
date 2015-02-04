var rhelList = ["getting-started", "manage", "tdi"];
var windowsList = ["getting-started", "manage"];
var ubuntuList = ["getting-started", "manage"];

$("#topics .topic").on("click", function() {
	// Show and hide respective landing tabs
	$(".landing-content#topics").hide();
	$(".landing-content#platforms").show();
	$("#topics-tab").removeClass("landing-tab-active");
	$("#platforms-tab").addClass("landing-tab-active");

	// Get selected topic
	var topic = this.id;

	// Setup handler for when #1 tab title is clicked
	$("#topics-tab").on("click", function() {
		// Switch respective tabs
		$(".landing-content#topics").show();
		$(".landing-content#platforms").hide();
		$("#topics-tab").addClass("landing-tab-active");
		$("#platforms-tab").removeClass("landing-tab-active");
		
		// Clear data and elements
		topic = "";
		$("ul#platform-tabs > li#rhel").hide();
		$("ul#platform-tabs > li#windows").hide();
		$("ul#platform-tabs > li#ubuntu").hide();
	});

	// Show respective OSs
	if($.inArray(topic, rhelList) > -1) {
		$("ul#platform-tabs > li#rhel").show().css("display", "inline-block");
	}
	if($.inArray(topic, windowsList) > -1) {
		$("ul#platform-tabs > li#windows").show().css("display", "inline-block");
	}
	if($.inArray(topic, ubuntuList) > -1) {
		$("ul#platform-tabs > li#ubuntu").show().css("display", "inline-block");
	}
});