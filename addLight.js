$(function() {

    var data = {
        lastID: 0,
        lights: []
    };


    var octopus = {
        addLight: function() {
            var thisID = ++data.lastID;

            data.lights.push({
                id: thisID,
                Exist: true
            });
            
            lightNum++;
            addLightParameters(thisID);
            view.render();
            
        },

        removeLight: function(light) {
            var clickedLight = data.lights[ light.id - 1 ];
            clickedLight.Exist = false;
            //data.lights[ light.id - 1 ].Exist = false;
            view.render();
        },

        getExistLights: function() {
            var ExistLights = data.lights.filter(function(light) {
                return light.Exist;
            });
            return ExistLights;
        },
/*
        thisLightExist: function(light){
            if( data.lights[ light.id - 1 ].Exist == true)
            {
                return true;
            }else{
                return false;
            }
        },
*/
        init: function() {
            view.init();
        }
    };


    var view = {
        init: function() {
            var addLightBtn = $('#btn_addLight');
            addLightBtn.click(function() {
                octopus.addLight();
            });

            // grab elements and html for using in the render function
            this.$lightList = $('ul#accordion_Lights');
            this.defaultLightTemplate = $('script[data-template="defaultLight"]').html();
            this.lightTemplate = $('script[data-template="light"]').html();


            // Delegated event to listen for removal clicks
            this.$lightList.on('click', '.myLightsTitle .destroy', function(e) {
                var light = $(this).parents('.panel').data();
                octopus.removeLight(light);
                return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $lightList = this.$lightList,
                lightTemplate = this.lightTemplate;
                defaultLightTemplate = this.defaultLightTemplate;

            // Clear and render
            $lightList.html('');
            $lightList.append(defaultLightTemplate);
            setupLightFunctions(0);//for default light

            octopus.getExistLights().forEach(function(light) {

                // Replace template markers with data
                var thisTemplate = lightTemplate.replace(/{{id}}/g, light.id);
                $lightList.append(thisTemplate);
                setupLightFunctions(light.id);
            });

            if (currentLight != null)
            {
                var lightTitleName = '#lightPanel' + currentLight + ' .myLightsTitle';
                $(lightTitleName).removeClass('collapsed');
                var lightContentName = '#light' + currentLight;
                $(lightContentName).addClass('in');
            }
        }
    };

    octopus.init();
}());



function addLightParameters(index){
    //init parameter
    mouseXY[index] = [Math.random()-0.5, Math.random()-0.5];     
    lightOn[index] = 1;
    lightColor[index] =[1.0, 1.0 ,1.0];
    lightIntensity[index] = 1.0;
    pointLightDis[index] = 0.5;
    showDiffuse[index] = 0;
    showSpec[index] = 0;
    
    //mouse stuff
    var canvas = document.getElementById( "gl-canvas" );
    canvas.addEventListener("mousemove", function(evt){
        if(mouseFlag === 0){
            setMousePos(canvas, evt, index);//this function in "cube.js"
        }

    }, false);
    
}
