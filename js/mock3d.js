$(document).ready(function () {
	

/**********************offcanvas.js********************/
$('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
});
  
  
/**********************SliderBar********************************/

/**Basic Image**/
$("#styleControl_slider").slider({ min: 0, max: 1, value: [styleBright, styleDark], step: 0.01, focus: true });

$("#styleControl_slider").on("slide", function(slideEvt) {
	styleBright = slideEvt.value[0];
	styleDark = slideEvt.value[1];
	console.log("styleBright: " + styleBright + "   styleDark: " + styleDark);
	
});


/**Alpha**/
$("#alphaInRed_slider").slider({});
$("#alphaInRed_slider").on('slide', function(slideEvt) {
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


 

 //collapse list +/- toggle	
/*
 $(".myControlTitle collapsed").on("hide.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
  });
  $("#demo").on("show.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
*/	 
  
});//end of $(document).ready

