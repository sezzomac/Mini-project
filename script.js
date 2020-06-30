var canvas1 = document.getElementById("canvas");
var imageFile = document.getElementById("imageFile");
var upImage = null;
var newImage = null;
var borImage = null;
var canvasImage = null;

var ctx = canvas1.getContext("2d");
ctx.font = "13px Arial";
ctx.fillStyle = "#A7ADB2";
ctx.fillText("Image will be displayed here", 70, 60);

//Uploading, checking, reseting functions start--
function loadImage() {
	upImage = new SimpleImage(imageFile);
	upImage.drawTo(canvas1);
}
function alertNotLoaded(image) {
	if (image == null || !image.complete()) {
	alert("Image is not loaded!");
} else 
	return true;
}
function resetImage() {
	if (alertNotLoaded(upImage)) {
	upImage.drawTo(canvas1);
	}
} 
		//Uploading, checking, reseting functions finish--

//Grey functions start--
function makeGrey() {
		newImage = new SimpleImage(upImage);
	    for ( var pxl of newImage.values()) {
        var avg = (pxl.getRed()+pxl.getGreen()+pxl.getBlue())/3;
        pxl.setRed(avg);
        pxl.setGreen(avg);
        pxl.setBlue(avg);
    	}
    	return avg;
    	return newImage;
}
function greyScale() {
	if (alertNotLoaded(upImage)) {
		makeGrey();
		newImage.drawTo(canvas1);
	}
}
		//Grey functions finish--

//Sepia functions start--
function makeSepia() {
		newImage = new SimpleImage(upImage);
		for ( var pxl of newImage.values()) {
        var avg = (pxl.getRed()+pxl.getGreen()+pxl.getBlue())/3;
        pxl.setRed(avg + 60);
        pxl.setGreen(avg + 35);
        pxl.setBlue(avg);
    	}
    	return newImage;
}
function sepiaFilter() {
	if (alertNotLoaded(upImage)) {
		makeSepia();
  		newImage.drawTo(canvas1);
	}
}
		//Sepia functions finish--

//Rainbow functions start--
function makeRainbow() {
	newImage = new SimpleImage(upImage);
	for (var pxl of newImage.values()) {
	var avg = (pxl.getRed()+pxl.getGreen()+pxl.getBlue())/3;
	var h = pxl.getY();
	var gh = upImage.getHeight();
		if (h < gh/7) {
			if (avg < 128) {			//red
			pxl.setRed(avg*2)
			} if (avg >= 128) {
				pxl.setRed(255);
				pxl.setGreen(2*avg-255);
				pxl.setBlue(2*avg-255);
			}
		} if (h >= gh/7 && h < (gh/7)*2) {
			if (avg < 128) {			//orange
			pxl.setRed(avg*2);
			pxl.setGreen(0.8*avg);
			} if (avg >= 128) {
				pxl.setRed(255);
				pxl.setGreen(1.2*avg-51);
				pxl.setBlue(2*avg-255);
			}
		} if (h >= (gh/7)*2 && h < (gh/7)*3) {
			if (avg < 128){				//yellow
				pxl.setRed(avg*2);
				pxl.setGreen(avg*2);
			} if (avg >= 128) {
				pxl.setRed(255);
				pxl.setGreen(255);
				pxl.setBlue(2*avg-255);
			}
		} if (h >= (gh/7)*3 && h < (gh/7)*4) {
			if (avg < 128){				//green
				pxl.setGreen(avg*2);
			} if (avg >= 128) {
				pxl.setRed(2*avg-255);
				pxl.setGreen(255);
				pxl.setBlue(2*avg-255);
			}
		} if (h >= (gh/7)*4 && h < (gh/7)*5) {
			if (avg < 128){				//blue
				pxl.setBlue(avg*2);
			} if (avg >= 128) {
				pxl.setRed(2*avg-255);
				pxl.setGreen(2*avg-255);
				pxl.setBlue(255);
			}
		} if (h >= (gh/7)*5 && h < (gh/7)*6) {
			if (avg < 128){				//indigo
				pxl.setRed(0.8*avg);
				pxl.setBlue(avg*2);
			} if (avg >= 128) {
				pxl.setRed(1.2*avg-51);
				pxl.setGreen(2*avg-255);
				pxl.setBlue(255);
			}
		} if (h >= (gh/7)*6) {
			if (avg < 128){				//violet
				pxl.setRed(1.6*avg);
				pxl.setBlue(1.6*avg);
			} if (avg >= 128) {
				pxl.setRed(0.4*avg+153);
				pxl.setGreen(2*avg-255);
				pxl.setBlue(0.4*avg+153);
			}
		} 
	}
	return newImage;
}
function rainBow() {
	if (alertNotLoaded(upImage)) {
		makeRainbow();
		newImage.drawTo(canvas1);
		}
}
		//Rainbow functions finish--

//Red functions start--
function makeRed(){
	newImage = new SimpleImage(upImage);
	for ( var pxl of newImage.values()) {
		var avg = (pxl.getRed()+pxl.getGreen()+pxl.getBlue())/3;
        pxl.setRed(255);
        pxl.setGreen(avg);
        pxl.setBlue(avg);
        }
    	return newImage;
}
function red() {
	if (alertNotLoaded(upImage)) {
		makeRed();
		newImage.drawTo(canvas1);
		}
}
		//Red functions finish--

//Border functions start--
function setBlack(x) {
   x.setRed(0);
   x.setGreen(0);
   x.setBlue(0);
}
var bordersize = document.getElementById("borderInput");
bordersize.addEventListener("input", function () {
    if (this.validity.rangeUnderflow) {
        this.value = this.min;
    }
    else if (this.validity.rangeOverflow) {
        this.value = this.max;
    }
});
function borderSet() {
	var bordersize = document.getElementById("borderInput").value;
	if (bordersize == 0) {
		alert("Please choose border size!");
	} else
	return bordersize;
}
function makeBorder(image, borderSize) {
	canvasImage = new SimpleImage(canvas1);
	borImage = new SimpleImage(canvasImage);
	for (var pixel of borImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    var bS = borderSize;
    if (x < bS || x > borImage.getWidth() - bS || y < bS || y > borImage.getHeight() - bS){
        pixel = setBlack(pixel);
    } 
}
    return borImage;
}
function border() {
	if (alertNotLoaded(upImage)) {
	borderSet();
	var bordersize = document.getElementById("borderInput").value;
	makeBorder(upImage, bordersize);
	borImage.drawTo(canvas1);
	}
}
		//Border functions finish--