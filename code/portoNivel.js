"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var spArray;
	
	canvas.addEventListener("initend", initEndHandler);
	init(ctx);

	function initEndHandler(ev)
	{
		ctx.canvas.addEventListener("click", cch);
		spArray = ev.spArray;
		//iniciar a animação
		startAnim(ctx, spArray);
	}

	var cch = function(ev)
	{
		canvasClickHandler(ev, ctx, spArray);	
	}
}

function init(ctx){
	var nLoad = 0;
	var totLoad = 2;
	var spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="porto";
	img.src = "../PhotoshopResources/portoNivel.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroVermelho";
	img.src = "../PhotoshopResources/carroVermelho.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAzul";
	img.src = "../PhotoshopResources/carroAzul.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAmarelo";
	img.src = "../PhotoshopResources/carroAmarelo.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="boneco";
	img.src = "../PhotoshopResources/boneco.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoAzul";
	img.src = "../PhotoshopResources/barcoAzul.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoCastanho";	
	img.src = "../PhotoshopResources/barcoCastanho.png";  //dá ordem de carregamento da imagem

	// falta acabar o que esta dentro da funcao
	function imgLoadedHandler(ev) {
		if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, false, img);
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(520, 330, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'carroAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(136, 395, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'carroAmarelo') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(152, 215, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'boneco') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(364, 444, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'barcoAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(100, 65, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'barcoCastanho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(560, 110, nw, nh, 1, true, img);
		}
		
		spArray[nLoad] = sp;
		nLoad++;

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}	
}

function startAnim(ctx, spArray)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray);
}

//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;
	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
	}
}

//apagar sprites
function clear(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}
}

//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
function animLoop(ctx, spArray)
{
	var al = function(time)
	{
		animLoop(ctx, spArray);
	}
	var reqID = window.requestAnimationFrame(al);


	render(ctx, spArray, reqID);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	//animar sprites
	var arrayDireita = new Array();
	var arrayEsquerda = new Array();

	arrayDireita.push(spArray[2]);
	arrayDireita.push(spArray[3]);
	arrayDireita.push(spArray[5]);

	arrayEsquerda.push(spArray[1]);
	arrayEsquerda.push(spArray[6]);
	/*if(spArray[0].checkCollision(spArray[1])){
 		spArray[0].speed *= 1.5;
 		var audio = new Audio("resources/turbo.mp3");
		audio.play();
	}*/

	for (var i=0; i < arrayDireita.length; i++){
		if (arrayDireita[i].x + arrayDireita[i].width < cw)
		{
			if (arrayDireita[i].x + arrayDireita[i].width + arrayDireita[i].speed > cw)
				arrayDireita[i].x = cw - arrayDireita[i].width;
			else
				arrayDireita[i].x = arrayDireita[i].x + arrayDireita[i].speed;
		}
	}

	for (var i=0; i < arrayEsquerda.length; i++){
		if (arrayEsquerda[i].x + arrayEsquerda[i].width < cw)
		{
			if (arrayEsquerda[i].x + arrayEsquerda[i].width + arrayEsquerda[i].speed > cw)
				arrayEsquerda[i].x = cw + arrayEsquerda[i].width;
			else
				arrayEsquerda[i].x = arrayEsquerda[i].x - arrayEsquerda[i].speed;
		}
	}
	draw(ctx, spArray);
}

function canvasClickHandler(ev, ctx, spArray)
{
	//console.log("Clicking...");
	/*if (spArray[1].clickedBoundingBox(ev,ctx)) {
		console.log("Sair");	
		window.open("../html/menu.html", "_self");
	}*/
}