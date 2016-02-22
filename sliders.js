$(document).ready(function () {

/**************** init checkbox ******************/

var mirrorElem = $('#mirrorSelect');
initCheckbox(mirror, mirrorElem);


var lightsOnlyElem = $ ('#lightsOnlySelect');
initCheckbox(lightsOnly, lightsOnlyElem);







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

//switch multiple lights

$('#lightPanel0').on('shown.bs.collapse', function(){
    currentLight = 0;
    console.log("current: " + currentLight);
}).on('hidden.bs.collapse', function(){
    currentLight = null;
})

$('#lightPanel1').on('shown.bs.collapse', function(){
    currentLight = 1;
     console.log("current: " + currentLight);
}).on('hidden.bs.collapse', function(){
    currentLight = null;
})

$('#lightPanel2').on('shown.bs.collapse', function(){
    currentLight = 2;
     console.log("current: " + currentLight);
}).on('hidden.bs.collapse', function(){
    currentLight = null;
})


$("#lightPanel0 .colorPicker").attr("value", "#ffffff");
$("#lightPanel1 .colorPicker").attr("value", "#00ff00");
$("#lightPanel2 .colorPicker").attr("value", "#0000ff");

/**lightIntensity**/

for (var i = 0; i < lightNum; i++)
{
    /////init checkbox

    //lightOn
    var checkboxName_lightOn = '#lightPanel' + i + ' #lightSelect';
    var lightOnElem = $ (checkboxName_lightOn);
    initCheckbox(lightOn[i], lightOnElem);

    var checkboxName_showDiffuse = '#lightPanel' + i + ' #diffuseSelect';
    var showDiffuseElem = $(checkboxName_showDiffuse);
    initCheckbox(showDiffuse[i], showDiffuseElem);

    var checkboxName_showSpec = '#lightPanel' + i + ' #specSelect';
    var showSpecElem = $(checkboxName_showSpec);
    initCheckbox(showSpec[i], showSpecElem);




    //////slider events

    //lightIntensity
    var sliderName_intensity = "#lightPanel" + i + " #intensity_slider";
    var textareaName_intensity = "#lightPanel" + i + " #intensity_val";
    var lightIntensity_slider = $(sliderName_intensity);
    var lightIntensity_val = $(textareaName_intensity);
    lightIntensity_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", lightIntensity[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (lightIntensity_slider, lightIntensity_val, "lightIntensity", i);

    //pointLightDis
    var sliderName_pLightDis = "#lightPanel" + i + " #pointLGTdis_slider";
    var textarea_pLightDis = "#lightPanel" + i + " #pointLGTdis_val";
    var pointLGTdis_slider = $(sliderName_pLightDis);
    var pointLGTdis_val = $(textarea_pLightDis);
    pointLGTdis_slider.attr("data-slider-min", 0).attr("data-slider-max", 1).attr("data-slider-step", 0.01).attr("data-slider-value", pointLightDis[i]).attr("data-slider-tooltip","hide").slider({});
    bindSliderValParamIndex (pointLGTdis_slider, pointLGTdis_val, "pointLightDis", i);
}


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
                                lightColor[0][0] =rgbObject.r / 255;
                                lightColor[0][1] =rgbObject.g / 255;
                                lightColor[0][2] =rgbObject.b / 255;
                            }
                            else if (currentLight ==1)
                            {
                                lightColor[1][0] =rgbObject.r / 255;
                                lightColor[1][1] =rgbObject.g / 255;
                                lightColor[1][2] =rgbObject.b / 255;
                            }
                            else if (currentLight ==2)
                            {
                                lightColor[2][0] =rgbObject.r / 255;
                                lightColor[2][1] =rgbObject.g / 255;
                                lightColor[2][2] =rgbObject.b / 255;
                            }

                            //add border if it is white#ffffff;
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
    }else {
    elem.prop('checked', false);
    }
}


function bindSliderValParamIndex(slider, val, param, index){
	//init textarea
	val.val(window[param][index]);

	//update textarea when in slide
	slider.on("slide", function(slideEvt) {
		window[param][index] = slideEvt.value;	
		val.val(window[param][index]);
	});
	
	//update slider when textarea change
	val.on("change", function(){
		window[param][index] = Number($(this).val());
		slider.slider("destroy").attr("data-slider-value", window[param][index]).attr("data-value", window[param][index]).attr("value", window[param][index]);
		slider.slider({});
		slider.on("slide", function(slideEvt) {
			window[param][index] = slideEvt.value;	
			val.val(window[param][index]);
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
