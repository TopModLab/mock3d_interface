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


            currentLight = thisID;

            
            var animation = 1;
            view.render(animation);
            //mouseFlag = 0;
            
        },

        removeLight: function(light) {
            var clickedLight = data.lights[ light.id - 1 ];
            clickedLight.Exist = false;
            
            //check exist max id, set to lastID
            if (light.id == data.lastID)
            {
                var currentID = data.lastID;
                for(var i = currentID; i > 0; i--)
                {
                    if(data.lights[i-1].Exist == false)
                    {
                        data.lights.pop();
                        --data.lastID;
                    }else{
                        break;
                    }
                }
            }
            

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
                
            var defaultLightTemplate = lightTemplate.replace(/{{id}}/g, 0).replace("LIGHT0","DEFAULT LIGHT");

            // Clear and render
            $lightList.html('');
            $lightList.append(defaultLightTemplate);

            $("#lightPanel0 .destroy").remove();

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
    lightColor[index] =[Math.random()/2+0.5, Math.random()/2+0.5, Math.random()/2+0.5];
    lightIntensity[index] = 0.5;
    pointLightDis[index] = 0.5;
    showDiffuse[index] = 1;
    showSpec[index] = 1;
    
    //mouse stuff
    var canvas = document.getElementById( "gl-canvas" );
    canvas.addEventListener("mousemove", function(evt){
        if(mouseFlag === 1){
            setMousePos(canvas, evt, index);//this function in "cube.js"
        }
    }, false);
    
}
