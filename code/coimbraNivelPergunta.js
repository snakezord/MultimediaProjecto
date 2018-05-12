"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var answered = false;
var i = 0;

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
	var totLoad = 5;
	var spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraPergunta";
	img.src = "../PhotoshopResources/perguntaCoimbra.png";  	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraPerguntaA";
	img.src = "../PhotoshopResources/perguntaCoimbraA.png";  

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraPerguntaB";
	img.src = "../PhotoshopResources/perguntaCoimbraB.png";  

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraPerguntaC";
	img.src = "../PhotoshopResources/perguntaCoimbraC.png";  

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraPerguntaD";
	img.src = "../PhotoshopResources/perguntaCoimbraD.png";  			


	// falta acabar o que esta dentro da funcao
	function imgLoadedHandler(ev) {
		if (ev.target.id == 'coimbraPergunta') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraPerguntaA') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(30, 228, nw, nh, 25, img, true);
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraPerguntaB') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(367, 228, nw, nh, 25, img, true);
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraPerguntaC') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(30, 332, nw, nh, 25, img, true);
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraPerguntaD') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(367, 332, nw, nh, 25, img, true);
			spArray[4] = sp;
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
function render(ctx, spArray, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	if(answered)
		i++;

	if(i==150)
		window.open("../html/escolhaNivel.html", "_self");

	draw(ctx, spArray);
}

function canvasClickHandler(ev, ctx, spArray){

	if (spArray[1].clickedBoundingBox(ev,ctx)) {
		var img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coimbraPerguntaACerto";
		img.src = "../PhotoshopResources/perguntaCoimbraACerto.png";  //dá ordem de carregamento da imagem		
	}

	else if (spArray[2].clickedBoundingBox(ev,ctx)){
		var img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coimbraPerguntaBErrado";
		img.src = "../PhotoshopResources/perguntaCoimbraBErrado.png";  //dá ordem de carregamento da imagem	
	}

	else if (spArray[3].clickedBoundingBox(ev,ctx)){
		var img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coimbraPerguntaCErrado";
		img.src = "../PhotoshopResources/perguntaCoimbraCErrado.png";  //dá ordem de carregamento da imagem	
	}

	else if (spArray[4].clickedBoundingBox(ev,ctx)){
		var img = new Image();
		img.addEventListener("load", imgLoadedHandler);
		img.id="coimbraPerguntaDErrado";
		img.src = "../PhotoshopResources/perguntaCoimbraDErrado.png";  //dá ordem de carregamento da imagem	
	}

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'coimbraPerguntaACerto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(30, 228, nw, nh, 25, img, false);
			spArray[1] = sp;
			answered = true;
		}

		else if(ev.target.id == 'coimbraPerguntaBErrado'){
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(367, 228, nw, nh, 25, img, false);
			spArray[2] = sp;
			answered = true;
		}

		else if(ev.target.id == 'coimbraPerguntaCErrado'){
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(30, 332, nw, nh, 25, img, false);
			spArray[3] = sp;
			answered = true;
		}

		else if(ev.target.id == 'coimbraPerguntaDErrado'){
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(367, 332, nw, nh, 25, img, false);
			spArray[4] = sp;
			answered = true;
		}

	}
}