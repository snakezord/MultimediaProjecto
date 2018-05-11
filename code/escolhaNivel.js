"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray;
var ctx;
var decodedCookie;
function main() {
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	decodedCookie = decodeURIComponent(document.cookie);
	
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
			var sp = new SpriteImage(0, 0, nw, nh, 1, img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'voltar') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(2, 7, nw, nh, 1, img, true);
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(618, 112, nw, nh, 1, img, true);
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbra') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(634, 210, nw, nh, 1, img, true);
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'lisboa') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(546, 312, nw, nh, 1, img, true);
			spArray[4] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'faro') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(650, 475, nw, nh, 1, img, true);
			spArray[5] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'lockCoimbra') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(642, 207, nw, nh, 1, img, true);
			spArray[6] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'lockLisboa') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(553, 312, nw, nh, 1, img, true);
			spArray[7] = sp;
			nLoad++;
		}
		
		else if (ev.target.id == 'lockFaro') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(658, 474, nw, nh, 1, img, true);
			spArray[8] = sp;
			nLoad++;
		}

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}	
}

function overImgHandler(ev) {
	console.log("over");
	document.body.style.cursor = "http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur";
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
	leCookie();
	draw(ctx, spArray);
}

function canvasClickHandler(ev, ctx, spArray)
{
	//console.log("Clicking...");
	if (spArray[1].clickedBoundingBox(ev,ctx)) {
		console.log("voltar");	
		window.open("../html/menu.html", "_self");
	}
	else if (spArray[2].clickedBoundingBox(ev,ctx)) {
		window.open("../html/portoNivel.html", "_self");
	}
}

function leCookie() {
	console.log(spArray[6]);
	console.log(decodedCookie);
	if (decodedCookie === "complete"){
		ctx.beginPath();
		spArray[6].clear(ctx);
	}
}