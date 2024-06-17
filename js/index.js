$(function(){var o=$("#page-top");o.hide(),$(window).scroll(function(){$(this).scrollTop()>100?o.fadeIn():o.fadeOut()}),o.click(function(){return $("body, html").animate({scrollTop:0},500),!1})});
