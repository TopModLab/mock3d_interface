var image1, image2, image3, image4, image5;

var UPLOAD = UPLOAD || {};

UPLOAD.main = new function()
{
	// init vars
	var $container1 = $('#container1'),
		$container2 = $('#container2'),
		$container3 = $('#container3'),
		$container4 = $('#container4'),
		$container5 = $('#container5');

	this.init = function()
	{
		/******************* Initial Maps *********************/	

		image1 = new Image();
		image2 = new Image();
		image3 = new Image();
		image4 = new Image();
		image5 = new Image();	
		
		image1.src = "images/Eye/eye_dark.jpg"; //dark
		image2.src = "images/Eye/eye_bright.jpg"; //bright
		image3.src = "images/Eye/eye_shape.jpg"; //shape map
		
		/*
		image1.src = "images/dark.png"; //dark
		image2.src = "images/light.png"; //bright
		image3.src = "images/normal.png"; //shape map
		*/
		
		/*
		image1.src = "images/Holmer/Holmer_dark.png"; //dark
		image2.src = "images/Holmer/Holmer_bright.png"; //bright
		image3.src = "images/Holmer/Holmer_shape.png"; //shape map
		*/
		
		//image4.src = "image/";
		//image5.src = "image/";


		//load default images in thumb
		
		initDefaultThumbImgSize(image1);
		initDefaultThumbImgSize(image2);
		initDefaultThumbImgSize(image3);
		initDefaultThumbImgSize(image4);
		initDefaultThumbImgSize(image5);

		initDefaultCanvasSize(image3);
		
		$("#container1image").append(image1);
		$("#container2image").append(image2);
		$("#container3image").append(image3);
		$("#container4image").append(image4);
		$("#container5image").append(image5);
		

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
		container2.addEventListener('load', dropFile, false);

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
	}


/**
	 * Handles when a file is dropped by
	 * the user onto the container1
	 */
	function dropFile(event)
	{
		var eventCaller = event.target.id;
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
			handleFile(files[0], eventCaller);
		}
		
		return false;
	}
	
	/**
	 * Handles the uploaded file
	 */
	function handleFile(file, eventCaller)
	{
		var fileReader 			= new FileReader();
		//fileReader.onloadend	= fileUploaded;
		fileReader.onloadend = function(event) {
			return fileUploaded.call(this, event, eventCaller);
		}
		fileReader.readAsDataURL(file);
	}
	
	/**
	 * File upload handled
	 */
	function fileUploaded(event, elemName)
	{
		var image;
		var $container = $('#' + elemName);
		
		// check it's an image
		if(event.target.result.match(/^data:image/))
		{
		    $container.addClass('live');
		    
			// create a new image
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
			
			
			// give the browser chance to
			// create the image object
			setTimeout(function(){
				
				// split the image
				imageManip(elemName, image);
				
			}, 100);
		}
		else
		{
			// time to whinge
			alert("Umm, images only? ... Yeah");
		}
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
}



$(document).ready(function(){
	
	//if(Modernizr.webgl) {
		// Go!
		UPLOAD.main.init();

	//}
});