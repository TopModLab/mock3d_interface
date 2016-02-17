$(document).ready(function () {

/**************** init checkbox ******************/

var mirrorElem = $('#mirrorSelect');
initCheckbox(mirror, mirrorElem);


var light0onElem = $ ('#lightPanel0 #lightSelect');
initCheckbox(light0on, light0onElem);

var light1onElem = $ ('#lightPanel1 #lightSelect');
initCheckbox(light1on, light1onElem);

var light2onElem = $ ('#lightPanel2 #lightSelect');
initCheckbox(light2on, light2onElem);


var showSpec0Elem = $('#lightPanel0 #specSelect');
initCheckbox(showSpec0, showSpec0Elem);

var showSpec1Elem = $('#lightPanel1 #specSelect');
initCheckbox(showSpec1, showSpec1Elem);

var showSpec2Elem = $('#lightPanel2 #specSelect');
initCheckbox(showSpec2, showSpec2Elem);


var pointLight0Elem = $('#lightPanel0 #pointLightSelect');
initCheckbox(pointLight0, pointLight0Elem);

var pointLight1Elem = $('#lightPanel1 #pointLightSelect');
initCheckbox(pointLight1, pointLight1Elem);

var pointLight2Elem = $('#lightPanel2 #pointLightSelect');
initCheckbox(pointLight2, pointLight2Elem);

    
/*
if ($(this).is(':checked')) {
$(this).parent().fadeTo('slow', 0.5);
$(this).attr('checked'); //This line
}else{

$(this).parent().fadeTo('slow', 1);
$(this).removeAttr('checked');
}
	
*/
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
var alphaInRed_slider = $("#alphaInRed_slider");
var alphaInRed_val = $("#alphaInRed_val");
alphaInRed_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaR).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (alphaInRed_slider, alphaInRed_val, "alphaR");

var alphaInGreen_slider = $("#alphaInGreen_slider");
var alphaInGreen_val = $("#alphaInGreen_val");
alphaInGreen_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaG).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (alphaInGreen_slider, alphaInGreen_val, "alphaG");

var alphaInBlue_slider = $("#alphaInBlue_slider");
var alphaInBlue_val = $("#alphaInBlue_val");
alphaInBlue_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", alphaB).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (alphaInBlue_slider, alphaInBlue_val, "alphaB");


/**Lights**/

//handle multiple lights

$('#lightPanel0').on('shown.bs.collapse', function(){
    currentLight = 0;
    console.log("current: " + currentLight);
})

$('#lightPanel1').on('shown.bs.collapse', function(){
    currentLight = 1;
     console.log("current: " + currentLight);
})

$('#lightPanel2').on('shown.bs.collapse', function(){
    currentLight = 2;
     console.log("current: " + currentLight);
})


$("#lightPanel0 .colorPicker").attr("value", "#ff0000");
$("#lightPanel1 .colorPicker").attr("value", "#0000ff");
$("#lightPanel2 .colorPicker").attr("value", "#00ff00");


//light0
var lightIntensity0_slider = $("#lightPanel0 #intensity_slider");
var lightIntensity0_val = $("#lightPanel0 #intensity_val");
lightIntensity0_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", lightIntensity0).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (lightIntensity0_slider, lightIntensity0_val, "lightIntensity0");

var pointLGT0dis_slider = $("#lightPanel0 #pointLGTdis_slider");
var pointLGT0dis_val = $("#lightPanel0 #pointLGTdis_val");
pointLGT0dis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLight0dis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (pointLGT0dis_slider, pointLGT0dis_val, "pointLight0dis");

//light1
var lightIntensity1_slider = $("#lightPanel1 #intensity_slider");
var lightIntensity1_val = $("#lightPanel1 #intensity_val");
lightIntensity1_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", lightIntensity1).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (lightIntensity1_slider, lightIntensity1_val, "lightIntensity1");

var pointLGT1dis_slider = $("#lightPanel1 #pointLGTdis_slider");
var pointLGT1dis_val = $("#lightPanel1 #pointLGTdis_val");
pointLGT1dis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLight1dis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (pointLGT1dis_slider, pointLGT1dis_val, "pointLight1dis");

//light2
var lightIntensity2_slider = $("#lightPanel2 #intensity_slider");
var lightIntensity2_val = $("#lightPanel2 #intensity_val");
lightIntensity2_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", lightIntensity2).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (lightIntensity2_slider, lightIntensity2_val, "lightIntensity2");

var pointLGT2dis_slider = $("#lightPanel2 #pointLGTdis_slider");
var pointLGT2dis_val = $("#lightPanel2 #pointLGTdis_val");
pointLGT2dis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLight2dis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (pointLGT2dis_slider, pointLGT2dis_val, "pointLight2dis");



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
var refl_intensity_slider = $("#refl_intensity_slider");
var refl_intensity_val = $("#refl_intensity_val");
refl_intensity_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", reflectIntensity).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refl_intensity_slider, refl_intensity_val, "reflectIntensity");


var refl_FGdis_slider = $("#refl_FGdis_slider");
var refl_FGdis_val = $("#refl_FGdis_val");
refl_FGdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGdis).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refl_FGdis_slider, refl_FGdis_val, "FGdis");


var refl_FGshiftLR_slider = $("#refl_FGshiftLR_slider");
var refl_FGshiftLR_val = $("#refl_FGshiftLR_val");
refl_FGshiftLR_slider.attr("data-slider-min", -1).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", FGshiftLR).attr("data-slider-tooltip","hide").slider({});
bindSliderValParam (refl_FGshiftLR_slider, refl_FGshiftLR_val, "FGshiftLR");


$("#bluriness_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});




/*Quality**/
$("#smQuality_slider").slider({min: 0, max: 1, value: 1, step: 0.01, focus: true});





//Light colorPicker


$('.colorPicker').each( function() {
                
                $(this).minicolors({
                    position: 'bottom right',
                    theme: 'bootstrap',
                    defaultValue: '#ffffff',
                    change: function(value) {
                        if( !value ) return;
                        if( typeof console === 'object' ) {
                            var rgbObject = $(this).minicolors('rgbObject');

                            //var aaa = $('#accordinLights')
                            if (currentLight ==0)
                            {
                                lightColor0[0] =rgbObject.r / 255;
                                lightColor0[1] =rgbObject.g / 255;
                                lightColor0[2] =rgbObject.b / 255;
                            }
                            else if (currentLight ==1)
                            {
                                lightColor1[0] =rgbObject.r / 255;
                                lightColor1[1] =rgbObject.g / 255;
                                lightColor1[2] =rgbObject.b / 255;
                            }
                            else if (currentLight ==2)
                            {
                                lightColor2[0] =rgbObject.r / 255;
                                lightColor2[1] =rgbObject.g / 255;
                                lightColor2[2] =rgbObject.b / 255;
                            }
                            var addBorderElem = $(this).parent().find(".minicolors-swatch-color");
                            if (value =="#ffffff")
                            {
                                addBorderElem.css("border","solid 1px #eee");
                            }else{
                                addBorderElem.css("border","none");
                            }
                            

                        }
                    },
                });

            });
/*
$('#colorPicker0').minicolors('change', function(value){
    if( !value ) return;
                        if( typeof console === 'object' ) {
                            var rgbObject = $(this).minicolors('rgbObject');
                            //lightColor[0] =rgbObject.r / 255;
                            //lightColor[1] =rgbObject.g / 255;
                            //lightColor[2] =rgbObject.b / 255;
                            console.log(value);
                            
                        }
})
*/

 //collapse list +/- toggle	
/*
 $(".myControlTitle collapsed").on("hide.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-down"></span> Open');
  });
  $("#demo").on("show.bs.collapse", function(){
    $(".btn").html('<span class="glyphicon glyphicon-collapse-up"></span> Close');
*/	 
  
});//end of $(document).ready


function initCheckbox(param, elem){
    if (param == 1) {
    elem.prop('checked', true);
    }else if (param ==0){
    elem.prop('checked', false);
    }
}


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
