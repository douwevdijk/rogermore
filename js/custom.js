slider_array = {};

setTimeout(function () { $('#teaser').addClass("animated fadeInRight"); $('#teaserres').addClass("animated fadeInRight");}, 250);

$(document).ready(function(){
    $('.bxslider').each(function(i){
      slider_array[i] = $(this).bxSlider({
        infiniteLoop: false,
        hideControlOnEnd: true,
        adaptiveHeight: true,
        onSliderLoad: function () { $('.vehicle-img, .status').fadeTo( "slow" , 1); }
      });
    });
});

// Vehicles Tabs / Slider
//-------------------------------------------------------------

$(".vehicle-data").hide();
var activeVehicleData = $(".vehicle-nav .active a").attr("href");
$(activeVehicleData).show();

$(".vehicle-nav li").on("click", function(){

  $('.vehicle-img, .status').velocity({ 
    properties: { opacity: 0 },
    options: { duration: 500 }
});

  ind = $(this).index();

  $(".vehicle-nav .active").removeClass("active");
  $(this).addClass('active');

  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-nav .active a").attr("href");
    $(activeVehicleData).show();
    slider_array[ind].reloadSlider({onSliderLoad: function () { $('.vehicle-img, .status').velocity( {properties: { opacity: 1 }, options: { duration: 500 } }); } } );

    return false;
   });

});


// Vehicles Responsive Nav
//-------------------------------------------------------------

$("<div />").appendTo("#vehicle-nav-container").addClass("styled-select-vehicle-data");
$("<select />").appendTo(".styled-select-vehicle-data").addClass("vehicle-data-select");
$("#vehicle-nav-container a").each(function() {
  var el = $(this);
  $("<option />", {
    "value"   : el.attr("href"),
    "text"    : el.text()
  }).appendTo("#vehicle-nav-container select");
});

$(".vehicle-data-select").change(function(){

  var ind = this.selectedIndex;

  $(activeVehicleData).fadeOut( "slow", function() {
    activeVehicleData = $(".vehicle-data-select").val();
    $(activeVehicleData).fadeIn();
    slider_array[ind].reloadSlider();
  });

  return false;
});

// Scroll to Top Button
//-------------------------------------------------------------------------------

$(window).scroll(function(){
  if ($(this).scrollTop() > 100) {
    $('.scrollup').removeClass("animated fadeOutRight");
    $('.scrollup').fadeIn().addClass("animated fadeInRight");
  } else {
    $('.scrollup').removeClass("animated fadeInRight");
    $('.scrollup').fadeOut().addClass("animated fadeOutRight");
  }
});

$('.scrollup, .navbar-brand').click(function(){
  $("html, body").animate({ scrollTop: 0 }, 'slow', function(){
    $("nav li a").removeClass('active');
  });
  return false;
});

// Scroll To Animation
//-------------------------------------------------------------------------------

var scrollT = $(".scroll-to");

scrollT.click( function(event) {

  event.preventDefault();

  var position = $(document).scrollTop();
  var scrollOffset = 114;

  if(position > 39)
  {
    scrollOffset = 114;
  }

  var marker = $(this).attr('href');
  offs = $(marker).offset().top - scrollOffset;
  
  if (marker === '#vehicles') { 
  
     $(activeVehicleData).hide();
	 $("html").velocity("scroll", { offset: offs, complete: function () { $(activeVehicleData).velocity("fadeIn", {duration: 500}); } });
	 return;
  
  } else { 
  
	if (marker === '#information') {
	
	$('.roger').hide();
	$("html").velocity("scroll", { offset: offs, complete: function () { $('.roger').velocity("fadeIn", {duration: 500}); } });	
	return;
	}
	
 }
  

  $("html").velocity("scroll", { offset: offs} );

  return false;
});

