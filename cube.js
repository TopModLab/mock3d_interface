/****************** For SliderBar Parameter ******************/
var mouseFlag = 0;
var currentLight = 0;
var lightNum = 1;

var mouseXY = [];
mouseXY[0] = [0.3, -0.3];     //default light
  

var lightsOnly = 0;

var lightOn = [];
lightOn[0] = 1;


var lightColor = [];
lightColor[0] =[1.0, 1.0 ,1.0];


var lightIntensity = [];
lightIntensity[0] = 1.0;

var pointLightDis = [];
pointLightDis[0] = 0.5;

var showDiffuse = [];
showDiffuse[0] = 1;

var showSpec = [];   
showSpec[0] = 1;




var styleBright = 0,
    styleDark = 1;

var alphaR = 1,
    alphaG = 1,
    alphaB = 1;

var logIOR = 0.1;
var BGdis = 0.5;

var mirror = 0;
var reflectIntensity = 0.5;
var FGdis = 0.5;
var FGshiftLR = 0;




var currentLightLoc;
var lightNumLoc;
var mouseLoc;;//, mouse1Loc, mouse2Loc;

var lightsOnlyLoc;
var lightOn;
var lightColorLoc;
var lightIntensityLoc;
var pointLightDisLoc;

var showDiffuseLoc;
var showSpecLoc;

var styleBrightLoc, styleDarkLoc;
var alphaRLoc, alphaGLoc, alphaBLoc;
var logIORLoc, BGdisLoc;
var mirrorLoc, FGdisLoc, FGshiftLRLoc;
var reflectIntensityLoc;
    


/****************** For Basic shader ******************/

var gl;
var points = [];
var colors = [];
var normals = [];
var texCoords = [];

var numVertices = 36;

var color0Loc;
var color1Loc;

var darkTexture, darkImage;
var lightTexture, lightImage;
var normalTexture, normalImage;
var reflectTexture, reflectImage;
var refractTexture, refractImage;
var alphaTexture, alphaImage;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    /* MOUSE STUFF */

    var context = canvas.getContext('2d');
    
    canvas.addEventListener("mousedown", function(evt){
    
    }, false);
    canvas.addEventListener("mousemove", function(evt){
        if(mouseFlag === 0){
            setMousePos(canvas, evt, 0);//add default light event;
        }

    }, false);
    canvas.addEventListener("mouseup", function(){
        mouseFlag = (mouseFlag ==0)?1:0;
    }, false);
    
    /***************/


    colorCube();

    /////////////////  Configure WebGL  ////////////////////////

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.05, 0.05, 0.05, 1.0 );

    gl.enable( gl.DEPTH_TEST );
    
    //////////////////  Load shaders and initialize attribute buffers  /////////////////
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    /* Vertex colors
    // Load the data into the GPU   
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    */


    // Vertex positions
    // Load the data into the GPU
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW )

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 ); 
    gl.enableVertexAttribArray( vPosition );


    // Vertex normals
    // Load the data into the GPU
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );


    // Vertex texture coordinates
    // Load the data into the GPU
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vTex = gl.getAttribLocation( program, "texcoord");
    gl.vertexAttribPointer( vTex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vTex );


    initTextures();


    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, normalTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerNormal"), 0);

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, lightTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerColor1"), 1);

    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, darkTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerColor0"), 2);

    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, refractTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerBackground"), 3);

    gl.activeTexture(gl.TEXTURE4); 
    gl.bindTexture(gl.TEXTURE_2D, reflectTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerForeground"), 4);

    gl.activeTexture(gl.TEXTURE5); 
    gl.bindTexture(gl.TEXTURE_2D, alphaTexture);
    gl.uniform1i(gl.getUniformLocation(program, "uSamplerAlpha"), 5);



    currentLightLoc = gl.getUniformLocation (program, "currentLight");
    lightNumLoc = gl.getUniformLocation (program, "lightNum");
    mouseLoc = gl.getUniformLocation( program, "mouseXY");
    
    lightsOnlyLoc = gl.getUniformLocation (program, "lightsOnly");

    
    lightOnLoc = gl.getUniformLocation(program, "lightOn");
    lightColorLoc = gl.getUniformLocation (program, "lightColor");
    lightIntensityLoc = gl.getUniformLocation (program, "lightIntensity");
    showDiffuseLoc = gl.getUniformLocation( program, "showDiffuse");
    showSpecLoc = gl.getUniformLocation( program, "showSpec");
    pointLightDisLoc = gl.getUniformLocation( program, "pointLightDis");
    

    styleBrightLoc = gl.getUniformLocation( program, "styleBright");
    styleDarkLoc = gl.getUniformLocation( program, "styleDark");
    alphaRLoc = gl.getUniformLocation( program, "alphaR");
    alphaGLoc = gl.getUniformLocation( program, "alphaG");
    alphaBLoc = gl.getUniformLocation( program, "alphaB");
    logIORLoc = gl.getUniformLocation( program, "logIOR");
    BGdisLoc = gl.getUniformLocation( program, "BGdis");
    FGdisLoc = gl.getUniformLocation( program, "FGdis");
    mirrorLoc = gl.getUniformLocation( program, "mirror");
    reflectIntensityLoc = gl.getUniformLocation (program, "reflectIntensity");
    FGshiftLRLoc = gl.getUniformLocation( program, "FGshiftLR");


    render();
};

function initTextures() {
    

    normalTexture = gl.createTexture();
    normalImage = new Image();
    normalImage.onload = function() { handleTextureLoaded(normalImage, normalTexture); }
    
    lightTexture = gl.createTexture();
    lightImage = new Image();
    lightImage.onload = function() { handleTextureLoaded(lightImage, lightTexture); }
    
    darkTexture = gl.createTexture();
    darkImage = new Image();
    darkImage.onload = function() { handleTextureLoaded(darkImage, darkTexture); }
    
    refractTexture = gl.createTexture();
    refractImage = new Image();
    refractImage.onload = function() { handleTextureLoaded(refractImage, refractTexture); }
    
    reflectTexture = gl.createTexture();
    reflectImage = new Image();
    reflectImage.onload = function() { handleTextureLoaded(reflectImage, reflectTexture); }
    
    alphaTexture = gl.createTexture();
    alphaImage = new Image();
    alphaImage.onload = function() { handleTextureLoaded(alphaImage, alphaTexture); }
    
    normalImage.src = image3.src;
    lightImage.src = image2.src;
    darkImage.src = image1.src;
    refractImage.src = image5.src;
    reflectImage.src = image4.src;
    alphaImage.src = image6.src;

}

function handleTextureLoaded(image, texture) {
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.generateMipmap(gl.TEXTURE_2D);
    
}


function setMousePos(canvas, evt, i){
    
    if (currentLight == i)
    {
        mouseXY[i][0] = getMousePos(canvas, evt).x;
        mouseXY[i][1] = getMousePos(canvas, evt).y;
        console.log(i+": "+mouseXY[i][0]+" "+mouseXY[i][1]);
    }
    
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left)/(rect.right - rect.left) - 0.5,
        y: (evt.clientY - rect.top)/(rect.bottom - rect.top) - 0.5
    };
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    //console.log(lightOn[0]);
    var mirrorElem = $('#mirrorSelect:checked');
    mirror = (mirrorElem.val())?1:0;

    var lightsOnlyElem = $ ('#lightsOnlySelect:checked');
    lightsOnly = (lightsOnlyElem.val())?1:0;

    for (var i = 0; i < lightNum ; i++)
    {
        var checkboxName_lightOn = '#lightPanel' + i + ' #lightSelect:checked';
        var lightOnElem = $ (checkboxName_lightOn);
        lightOn[i] = (lightOnElem.val())?1:0;
        
        var checkboxName_showDiffuse = '#lightPanel' + i + ' #diffuseSelect:checked';
        var showDiffuseElem = $(checkboxName_showDiffuse);
        showDiffuse[i] = (showDiffuseElem.val())?1:0;
        
        var checkboxName_showSpec = '#lightPanel' + i + ' #specSelect:checked';
        var showSpecElem = $(checkboxName_showSpec);
        showSpec[i] = (showSpecElem.val())?1:0;
        
    }
    
    gl.uniform1i(currentLightLoc, currentLight);
    gl.uniform1f(lightNumLoc, lightNum);

    gl.uniform2fv(mouseLoc, flatten(mouseXY));//use flatten() to extract data from JS Array, send it to WebGL functions
    
    gl.uniform1i(lightsOnlyLoc, lightsOnly);
    gl.uniform1iv(lightOnLoc, lightOn);
    gl.uniform3fv(lightColorLoc, flatten(lightColor));
    gl.uniform1fv(lightIntensityLoc, lightIntensity);
    
    gl.uniform1iv(showDiffuseLoc, showDiffuse);
    gl.uniform1iv(showSpecLoc, showSpec);
    gl.uniform1fv(pointLightDisLoc, pointLightDis);
    
    gl.uniform1f(styleBrightLoc, styleBright);
    gl.uniform1f(styleDarkLoc, styleDark);
    gl.uniform1f(alphaRLoc, alphaR);
    gl.uniform1f(alphaGLoc, alphaG);
    gl.uniform1f(alphaBLoc, alphaB);
    
    gl.uniform1f(logIORLoc, logIOR);
    gl.uniform1f(BGdisLoc, BGdis);
    gl.uniform1f(FGdisLoc, FGdis);
    gl.uniform1i(mirrorLoc, mirror);
    gl.uniform1f(reflectIntensityLoc, reflectIntensity);
    gl.uniform1f(FGshiftLRLoc, FGshiftLR);

    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}



function quad(a, b, c, d) {

    var vertices = [
        vec4(-1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, 1.0, 1.0, 1.0),
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(1.0, -1.0, 1.0, 1.0),
        vec4(-1.0, -1.0, -1.0, 1.0),
        vec4(-1.0, 1.0, -1.0, 1.0),
        vec4(1.0, 1.0, -1.0, 1.0),
        vec4(1.0, -1.0, -1.0, 1.0)
        ];

    var vertexColors = [
        [0.0, 0.0, 0.0, 1.0],
        [1.0, 0.0, 0.0, 1.0],
        [1.0, 1.0, 0.0, 1.0],
        [0.0, 1.0, 0.0, 1.0],
        [0.5, 0.5, 1.0, 1.0],
        [1.0, 0.0, 1.0, 1.0],
        [0.0, 1.0, 1.0, 1.0],
        [1.0, 1.0, 1.0, 1.0]
        ];

    var faceNormal = cross(subtract(vertices[a],vertices[b]), subtract(vertices[c],vertices[b]));

    var vertexTexCoords = [
        vec2(0.0, 0.0),
        vec2(1.0, 0.0),
        vec2(1.0, 1.0),
        vec2(0.0, 1.0)
    ];

    texCoords.push(vertexTexCoords[0] );
    texCoords.push(vertexTexCoords[3] );
    texCoords.push(vertexTexCoords[2] );
    texCoords.push(vertexTexCoords[0] );
    texCoords.push(vertexTexCoords[2] );
    texCoords.push(vertexTexCoords[1] );

    var indices = [a, b, c, a, c, d];
    for(var i = 0; i < indices.length; ++i) {
        points.push(vertices[indices[i]] );

        // for vertex colors use
        //colors.push(vertexColors[indices[i]] );

        // for solid colored faces use
        colors.push(vertexColors[a] );

        normals.push(faceNormal);
    }
}

function colorCube() {
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}
