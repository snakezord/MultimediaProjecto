"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var spArray;
	console.log('fodace isto caralho');
	for(let i = 0; i<10;i++){
		console.log(i);
	}
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
	img.id="ajuda";
	img.src = "../PhotoshopResources/ajudaBackground.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="voltar";
	img.src = "../PhotoshopResources/voltarBtn.png";  //dá ordem de carregamento da imagem

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'ajuda') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1,img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'voltar') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(2, 7, nw, nh, 1,img, true);
			spArray[1] = sp;
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
	if (spArray[1].clickedBoundingBox(ev,ctx)) {
		console.log("voltar");
		window.open("../html/menu.html", "_self");
	}
}
