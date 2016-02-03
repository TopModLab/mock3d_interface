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
refr_slider.attr("data-slider-min",-1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", logIOR).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refr_slider, refr_val, "logIOR");

var refr_BGdis_slider = $("#refr_BGdis_slider");
var refr_BGdis_val = $("#refr_BGdis_val");
refr_BGdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", BGdis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refr_BGdis_slider, refr_BGdis_val, "BGdis");






$("#translucency_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});

/**Reflection**/
var refr_FGdis_slider = $("#refr_FGdis_slider");
var refr_FGdis_val = $("#refr_FGdis_val");
refr_FGdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGdis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refr_FGdis_slider, refr_FGdis_val, "FGdis");


var refr_FGshiftLR_slider = $("#refr_FGshiftLR_slider");
var refr_FGshiftLR_val = $("#refr_FGshiftLR_val");
refr_FGshiftLR_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGshiftLR).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refr_FGshiftLR_slider, refr_FGshiftLR_val, "FGshiftLR");


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



function bindSliderValParam(slider, val, param){
	//init textarea
	val.val(window[param]);

	//update textarea when in slide
	slider.on("slide", function(slideEvt) {
		window[param] = slideEvt.value;	
		val.val(window[param]);
	});
	
	//update slider when textarea change
	val.on("change", function(){
		window[param] = Number($(this).val());
		slider.slider("destroy").attr("data-slider-value", window[param]).attr("data-value", window[param]).attr("value", window[param]);
		slider.slider({});
		slider.on("slide", function(slideEvt) {
			window[param] = slideEvt.value;	
			val.val(window[param]);
		});
	});

	//textarea allSelected when on focus;
	val.focus(function() {
    	var $this = $(this);
    	$this.select();

    	// Work around Chrome's little problem
    	$this.mouseup(function() {
        // Prevent further mouseup intervention
        	$this.unbind("mouseup");
        	return false;
    	});
	});

	//textarea restrict only input number
	val.keydown(function(e){onlyNumber(e)});
}

function onlyNumber(e)
{
		var ctrlDown = e.ctrlKey||e.metaKey; // Mac support
		var code = e.keyCode || e.which;
        // Allow: delete, backspace, enter, leftarrow, rightarrow, "." and "-"s
        if ( ($.inArray(code, [46, 8, 13, 37, 39, 190, 173, 189]) !== -1) ||
             // Allow: Ctrl+A
            (code == 65 && ctrlDown === true) ||
             // Allow: Ctrl+C
            (code == 67 && ctrlDown === true) ||
             // Allow: Ctrl+V
            (code == 86 && ctrlDown === true) ||
             // Allow: Ctrl+X
            (code == 88 && ctrlDown === true) ||
             // Allow: home, end, left, right
            (code >= 35 && code <= 39)) {
                 // let it happen, don't do anything
                 return;
        };

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    }
