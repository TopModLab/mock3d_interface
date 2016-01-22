
$(document).ready(function () {
	
//collapse list +/- toggle	
/*
 $(".myControlTitle collapsed").on("hide.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
  });
  $("#demo").on("show.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
*/	
	
//offcanvas.js	
	
$('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
});
  
  
//sliderbar
/**Basic Image**/
$("#styleControl_slider").slider({});

/**Alpha**/
$("#alphaInRed_slider").slider({});
$("#alphaInRedSlider").on('slide', function(slideEvt) {
				$("#alphaInRed_val").val(slideEvt.value);
			});
$("#alphaInGreen_slider").slider({});
$("#alphaInBlue_slider").slider({});

/**Shadow**/
$("#sha_sampleSize_slider").slider({});
$("#sha_numberOfSample_slider").slider({});

/**Ambient**/
$("#amb_sampleSize_slider").slider({});
$("#amb_numberOfSample_slider").slider({});

/**Refraction**/
$("#refraction_slider").slider({});
$("#translucency_slider").slider({});

/**Reflection**/
$("#bluriness_slider").slider({});

/*Quality**/
$("#smQuality_slider").slider({});


  
  
});//end of $(document).ready

