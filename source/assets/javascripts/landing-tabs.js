$("#topics .topic").on("click", function() {
	$(".landing-content#topics").hide();
	$(".landing-content#platforms").show();
	$("#topics-tab").removeClass("landing-tab-active");
	$("#topics-tab").on("click", function() {
		$(".landing-content#topics").show();
		$(".landing-content#platforms").hide();
		$("#topics-tab").addClass("landing-tab-active");
		$("#platforms-tab").removeClass("landing-tab-active");
	});
	$("#platforms-tab").addClass("landing-tab-active");
});