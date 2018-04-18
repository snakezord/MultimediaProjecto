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
	var totLoad = 9;
	var spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="escolha";
	img.src = "../PhotoshopResources/escolhaNivelBackground.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="voltar";
	img.src = "../PhotoshopResources/voltarBtn.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="porto";
	img.src = "../PhotoshopResources/circuloVermelho.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbra";
	img.src = "../PhotoshopResources/circuloTransparente.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="lisboa";
	img.src = "../PhotoshopResources/circuloTransparente.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="faro";
	img.src = "../PhotoshopResources/circuloTransparente.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="lockCoimbra";
	img.src = "../PhotoshopResources/lock.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="lockLisboa";
	img.src = "../PhotoshopResources/lock.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="lockFaro";
	img.src = "../PhotoshopResources/lock.png";  //dá ordem de carregamento da imagem


	function imgLoadedHandler(ev) {
		if (ev.target.id == 'escolha') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, false, img);
		}

		else if (ev.target.id == 'voltar') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(2, 7, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(618, 112, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'coimbra') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(634, 210, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'lisboa') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(546, 312, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'faro') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(650, 475, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'lockCoimbra') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(642, 207, nw, nh, 1, true, img);
		}

		else if (ev.target.id == 'lockLisboa') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(553, 312, nw, nh, 1, true, img);
		}
		
		else if (ev.target.id == 'lockFaro') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(658, 474, nw, nh, 1, true, img);
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
	//var sp = spArray[0];

	draw(ctx, spArray);
}

function canvasClickHandler(ev, ctx, spArray)
{
	//console.log("Clicking...");
	console.log(spArray[1]);
	if (spArray[1].clickedBoundingBox(ev,ctx)) {
		console.log("voltar");	
		window.open("../html/menu.html", "_self");
	}
}