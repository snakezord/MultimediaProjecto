"use strict";

(function()
{
	window.addEventListener("load", main);
}());
var spArray = new Array(2);
function main() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	init(ctx);
}

function init(ctx){
	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="menu";
	img.src = "../PhotoshopResources/MenuInicial.png";  //dá ordem de carregamento da imagem

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'menu') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, 0, 0, 1, false, img);
		}
		spArray[0] = sp;
	}
	draw(ctx, spArray);
	
}

function draw(ctx, spArray)
{
	var dim = spArray.length;
	
	spArray[0].draw(ctx);
	
}



