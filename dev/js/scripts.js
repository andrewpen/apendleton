$(window).scroll(function() {
	$("#splash div").css({
	'opacity' : 1-(($(this).scrollTop())/250)
	});
});