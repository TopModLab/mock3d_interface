var image1, image2, image3, image4, image5, image6;


// init vars
var $container1 = $('#container1'),
	$container2 = $('#container2'),
	$container3 = $('#container3'),
	$container4 = $('#container4'),
	$container5 = $('#container5'),
	$container6 = $('#container6');

UPLOADinit = function()
{
	/******************* Initial Maps *********************/	

	image1 = new Image();
	image2 = new Image();
	image3 = new Image();
	image4 = new Image();
	image5 = new Image();	
	image6 = new Image();	
	
	
	//image1.src = "images/Eye/eye_dark.png"; //dark
	//image2.src = "images/Eye/eye_bright.png"; //bright
	//image3.src = "images/Eye/eye_shape_smooth.png"; //shape map
	//image4.src = "images/Eye/eye_foreground.png";  //reflection
	
	//image1.src = "images/dark.png"; //dark
	//image2.src = "images/white.png"; //bright
	//image2.src = "images/light.png"; //bright
	
	//image1.src = "images/dark_(alpha50).png"; //dark
	//image2.src = "images/light_(alpha50).png"; //bright
	//image3.src = "images/normal.png"; //shape map
	image3.src = "images/Holmer/Holmer_shape_clean.png"; //shape map
	
	//image1.src ="images/white.png";
	//image2.src ="images/white.png";
	
	image1.src = "images/Holmer/Holmer_dark.png"; //dark
	image2.src = "images/Holmer/Holmer_bright.png"; //bright
	//image3.src = "images/Holmer/Holmer_shape.png"; //shape map
	

	//image4.src = "images/reflect_red.png";//reflection
	//image4.src = "images/reflect_window.png";//reflection
	image4.src = "images/dark.png";

	//image5.src = "images/checker.jpg";  //refraction
	image5.src = "images/dark.png";  //refraction
	//image5.src = "images/white.png";

	
	

	//image1.src = "images/bottle/dark.png"//dark
	//image2.src = "images/bottle/bright.png"//bright
	//image3.src = "images/bottle/shape.png"
	//image5.src = "images/bottle/bg.png"
	image6.src = "images/eye/eye_alpha.jpg";



		
	//image6.src = "images/Holmer/Holmer_alphaControl.jpg";  //refraction
		

	//load default images in thumb
	
	initDefaultThumbImgSize(image1);
	initDefaultThumbImgSize(image2);
	initDefaultThumbImgSize(image3);
	initDefaultThumbImgSize(image4);
	initDefaultThumbImgSize(image5);
	initDefaultThumbImgSize(image6);

	initDefaultCanvasSize(image3);//canvas size based on Normal map
	
	$("#container1image").append(image1);
	$("#container2image").append(image2);
	$("#container3image").append(image3);
	$("#container4image").append(image4);
	$("#container5image").append(image5);
	$("#container6image").append(image6);
		

	//key function
	addEventListeners();
}

function initDefaultThumbImgSize(_image){
	_image.addEventListener('load', function() {
		//set thumb image size
		setThumbImgSize(_image);
	});
	
}

function initDefaultCanvasSize(_image){
	_image.addEventListener('load', function() {
		//update gl-canvas width and height
		updateCanvasSizeandStyle(_image);
	});
	
}

function addEventListeners()
{
	// container1 DnD event
	var container1 = $container1[0];
	container1.addEventListener('dragover', cancel, false);
	container1.addEventListener('dragenter', cancel, false);
	container1.addEventListener('dragexit', cancel, false);
	container1.addEventListener('drop', dropFile, false);

	var container2 = $container2[0];
	container2.addEventListener('dragover', cancel, false);
	container2.addEventListener('dragenter', cancel, false);
	container2.addEventListener('dragexit', cancel, false);
	container2.addEventListener('drop', dropFile, false);
	
	var container3 = $container3[0];
	container3.addEventListener('dragover', cancel, false);
	container3.addEventListener('dragenter', cancel, false);
	container3.addEventListener('dragexit', cancel, false);
	container3.addEventListener('drop', dropFile, false);

	var container4 = $container4[0];
	container4.addEventListener('dragover', cancel, false);
	container4.addEventListener('dragenter', cancel, false);
	container4.addEventListener('dragexit', cancel, false);
	container4.addEventListener('drop', dropFile, false);

	var container5 = $container5[0];
	container5.addEventListener('dragover', cancel, false);
	container5.addEventListener('dragenter', cancel, false);
	container5.addEventListener('dragexit', cancel, false);
	container5.addEventListener('drop', dropFile, false);

	var container6 = $container6[0];
	container6.addEventListener('dragover', cancel, false);
	container6.addEventListener('dragenter', cancel, false);
	container6.addEventListener('dragexit', cancel, false);
	container6.addEventListener('drop', dropFile, false);
}


/*
 * Handles when a file is dropped by
 * the user onto the container1
 */
function dropFile(event)
{
	var eventCaller = event.target.parentNode.parentNode.id;
		//from ".btn-file input" to ".btn-file" to "imgThumb_container", result is "#container1 2 3 4 5"
	//alert(event);

	// stop the browser doing
	// it's normal thing of going
	// to the item
	event.stopPropagation();
	event.preventDefault();
	
	// query what was dropped
	var files = event.dataTransfer.files;
	
	// if we have something
	if(files.length) {
		handleDropFile(files[0], eventCaller);
	}
	
	return false;
}

/**
 * Handles the uploaded file (drop file and selected file)
 */
function handleDropFile(file, eventCaller)
{
	var fileReader 			= new FileReader();
	//fileReader.onloadend	= fileUploaded;
	fileReader.onloadend = function(event) {
		if(event.target.result.match(/^data:image/))
		{
			return fileUploaded.call(this, event, eventCaller);
		}else{
			// time to whinge
			alert("Umm, images only? ... Yeah");
		}
	}
	fileReader.readAsDataURL(file);
}

/************* Selected file to upload (not drag and drop) -start**************/
//load selected file to container
function handleSelectedFile(fileSelected, container)
{
	var fileToLoad = fileSelected[0];
     if (fileToLoad.type.match("image.*"))
     {
         var fileReader = new FileReader();
         fileReader.onload = function(event) 
         {
             return fileUploaded.call(this, event, container);
         };
     }else{
		alert("Umm, images only? ... Yeah");
	}
	fileReader.readAsDataURL(fileToLoad);
}
/************* Selected file to upload (not drag and drop) - end **************/


/**
 * File upload handled
 */
function fileUploaded(event, elemName)
{
	var image;
	var $container = $('#' + elemName);
	
	// check it's an image
	
	$container.addClass('live');
	
	if(elemName === "container1")
	{
		image1 = new Image();
		image1.src 	= event.target.result;
		image = image1;

		//set thumb image size
		setThumbImgSize(image1);
		
		// Update WebGL texture.
		darkImage.src = image1.src;
	}
	else if(elemName === "container2")
	{
		image2 = new Image();
		image2.src 	= event.target.result;
		image = image2;
		
		//set thumb image size
		setThumbImgSize(image2);

		// Update WebGL texture.
		lightImage.src = image2.src;
	}
	else if(elemName === "container3")
	{
		image3 = new Image();
		image3.src 	= event.target.result;
		image = image3;

		//set thumb image size
		setThumbImgSize(image3);
		//update gl-canvas width and height
		updateCanvasSizeandStyle(image3);
		
		// Update WebGL texture.
		normalImage.src = image3.src;

	}
	else if(elemName === "container4")
	{
		image4 = new Image();
		image4.src 	= event.target.result;
		image = image4;

		//set thumb image size
		setThumbImgSize(image4);

		// Update WebGL texture.
		reflectImage.src = image4.src;
	}
	else if(elemName === "container5")
	{
		image5 = new Image();
		image5.src 	= event.target.result;
		image = image5;

		//set thumb image size
		setThumbImgSize(image5);

		// Update WebGL texture.
		refractImage.src = image5.src;
	}

	else if(elemName === "container6")
	{
		image6 = new Image();
		image6.src 	= event.target.result;
		image = image6;

		//set thumb image size
		setThumbImgSize(image6);

		// Update WebGL texture.
		alphaImage.src = image6.src;
	}
	
	// create the image object
	imageManip(elemName, image);
	
}


function cancel(event)
{
	if(event.preventDefault)
		event.preventDefault();
	
	return false;
}

function imageManip(elemName, image)
{
	$('#' + elemName + 'image').empty();
	$('#' + elemName + 'image').append(image);
}

function setThumbImgSize(_image)
{
	if(_image.width>=_image.height){
		_image.style.width = "100px";
	}else{
		_image.style.height = "100px";
	}
}

function updateCanvasSizeandStyle(_image)
{
	var canvas = document.getElementById("gl-canvas");
	var canvasContainer = $('.canvas_container');
	var ratioImage = _image.width / _image.height;
	var ratioContainer = canvasContainer.width() / canvasContainer.height();
			
	if(ratioImage>=ratioContainer){
		canvas.width = canvasContainer.width();
		canvas.height = canvas.width * _image.height / _image.width;
		canvas.style.width = "100%";
		canvas.style.height = "auto";
	}else{
		canvas.height = canvasContainer.height() ;
		canvas.width = canvas.height * _image.width / _image.height;
		canvas.style.height = "100%";
		canvas.style.width = "auto";
	}
	
	gl = WebGLUtils.setupWebGL( canvas );
 	gl.viewport( 0, 0, canvas.width, canvas.height );
 	gl.clearColor( 0.05, 0.05, 0.05, 1.0 );

}




/************* Selected file to upload (not drag and drop) set listener**************/
/************* and drag and drop UPLOADinit **************/


//hover image with image name label show up
$(document).on('change', '.btn-file :file', function() {
  	var input = $(this);
  	var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
 	input.trigger('fileselect', [label]);
});

$(document).ready( function() {

	UPLOADinit();

    $('.btn-file :file').on('fileselect', function(event) {
    	var elemName = event.target.id;
    	var containerName = event.target.parentNode.parentNode.id;
		var filesSelected = document.getElementById(elemName).files;
		handleSelectedFile(filesSelected, containerName);
    });
});