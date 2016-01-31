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
});


/**Alpha**/
$("#alphaInRed_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
$("#alphaInRed_slider").on('slide', function(slideEvt) {
				$("#alphaInRed_val").val(slideEvt.value);
});

$("#alphaInGreen_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
$("#alphaInBlue_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});


/**Shadow**/
$("#sha_sampleSize_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
$("#sha_numberOfSample_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});


/**Ambient**/
$("#amb_sampleSize_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});
$("#amb_numberOfSample_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});


/**Refraction**/
var refr_slider = $("#refraction_slider");
var refr_val = $("#refraction_val");

//init
refr_slider.attr("data-slider-min",-1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", logIOR).slider({});


bindSliderValParam (refr_slider,refr_val,"logIOR");

/*
refr_val.val(logIOR);

refr_slider.on("slide", function(slideEvt) {
	logIOR = slideEvt.value;	
	refr_val.val(logIOR);
});

refr_val.on("change", function(){
	logIOR = Number($(this).val());
	updateSlider(refr_slider, refr_val, logIOR);
	refr_slider.on("slide", function(slideEvt) {
		logIOR = slideEvt.value;	
		refr_val.val(logIOR);
	});
});
*/



$("#translucency_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});

/**Reflection**/
$("#bluriness_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});

/*Quality**/
$("#smQuality_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});


 

 //collapse list +/- toggle	
/*
 $(".myControlTitle collapsed").on("hide.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
  });
  $("#demo").on("show.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
*/	 
  
});//end of $(document).ready


function updateSlider(slider, val, param){
	slider.slider("destroy").attr("data-slider-value", param).attr("data-value", param).attr("value", param);
	slider.slider({});
}

function bindSliderValParam(slider, val, param){
	val.val(window[param]);

	slider.on("slide", function(slideEvt) {
		window[param] = slideEvt.value;	
		val.val(window[param]);
	});
	
	val.on("change", function(){
		window[param] = Number($(this).val());
		slider.slider("destroy").attr("data-slider-value", window[param]).attr("data-value", window[param]).attr("value", window[param]);
		slider.slider({});
		slider.on("slide", function(slideEvt) {
			window[param] = slideEvt.value;	
			val.val(window[param]);
		});
});
}

