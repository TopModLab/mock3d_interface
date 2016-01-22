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
		addEventListeners();
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
				image1 		= document.createElement('img');
				image1.src 	= event.target.result;
				image1.style.width = "100px";
				image = image1;

				// Update WebGL texture.
				darkImage.src = image1.src;
			}
			else if(elemName === "container2")
			{
				image2 		= document.createElement('img');
				image2.src 	= event.target.result;
				image2.style.width = "100px";
				image = image2;

				// Update WebGL texture.
				lightImage.src = image2.src;
			}
			else if(elemName === "container3")
			{
				image3 		= document.createElement('img');
				image3.src 	= event.target.result;
				image3.style.width = "100px";
				image = image3;

				// Update WebGL texture.
				normalImage.src = image3.src;
			}
			else if(elemName === "container4")
			{
				image4 		= document.createElement('img');
				image4.src 	= event.target.result;
				image4.style.width = "100px";
				image = image4;

				// Update WebGL texture.
				reflectImage.src = image4.src;
			}
			else if(elemName === "container5")
			{
				image5 		= document.createElement('img');
				image5.src 	= event.target.result;
				image5.style.width = "100px";
				image = image5;

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
}

$(document).ready(function(){
	
	//if(Modernizr.webgl) {
		// Go!
		UPLOAD.main.init();
	//}
});