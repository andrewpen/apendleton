$(window).scroll(function() {
	$("#splash div").css({
	'opacity' : 1-(($(this).scrollTop())/250)
	});
});

$(document).ready(function() {
	$('a').smoothScroll({offset: -125, afterScroll: function() {
		alert('we made it!');
	}});
});
