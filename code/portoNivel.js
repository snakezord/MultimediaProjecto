"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray;
function main() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
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
	var totLoad = 7;
	var spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="porto";
	img.src = "../PhotoshopResources/portoNivel.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroVermelho";
	img.src = "../PhotoshopResources/carroVermelhoLeft.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAzul";
	img.src = "../PhotoshopResources/carroAzulRight.png";  //dá ordem de carregamento da imagem	

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAmarelo";
	img.src = "../PhotoshopResources/carroAmareloRight.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoAzul";
	img.src = "../PhotoshopResources/barcoAzulRight.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoCastanho";	
	img.src = "../PhotoshopResources/barcoCastanhoLeft.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="boneco";
	img.src = "../PhotoshopResources/boneco.png";  //dá ordem de carregamento da imagem	

	// falta acabar o que esta dentro da funcao
	function imgLoadedHandler(ev) {
		if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, false, img);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(520, 335, nw, nh, 1, "left", false, img);
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(136, 400, nw, nh, 1, "right", false, img);
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAmarelo') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(152, 230, nw, nh, 1, "right", false, img);
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(100, 65, nw, nh, 1, "right", false, img);
			spArray[4] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoCastanho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(560, 115, nw, nh, 1, "left", false, img);
			spArray[5] = sp;
			nLoad++;
		}
		
		else if (ev.target.id == 'boneco') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(364, 445, nw, nh, 5, false, img);
			spArray[6] = sp;
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

function keydownHandler(ev) {
	var cw = canvas.width;
	var ch = canvas.height;
	var sp = spArray[6];
	if(ev.keyCode == 37){
		console.log(sp.x);
		console.log(ev.keyCode);
 		if (sp.x > 0){
			if (sp.x - sp.speed < 0)
				sp.x = 0;
			else
				sp.x = sp.x - sp.speed;
		}	
	}

	if(ev.keyCode == 38){
		console.log(sp.y);
		console.log(ev.keyCode);
 		if (sp.y > 0){
			if (sp.y - sp.speed < 0)
				sp.y = 0 + sp.width;
			else
				sp.y = sp.y - sp.speed;
		}	
	}

	if(ev.keyCode == 39){
		console.log(sp.x);
		console.log(ev.keyCode);
 		if (sp.x + sp.width < cw){
			if (sp.x + sp.width + sp.speed > cw)
				sp.x = cw - sp.width;
			else
				sp.x = sp.x + sp.speed;
		}	
	}

	if(ev.keyCode == 40){
		console.log(sp.y);
		console.log(ev.keyCode);
 		if (sp.y + sp.height < ch){
			if (sp.y + sp.speed > ch)
				sp.y = ch;
			else
				sp.y = sp.y + sp.speed;
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
		window.addEventListener("keydown", keydownHandler);
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

	/*
	//arrayEsquerda.push(spArray[6]);
	if(spArray[0].checkCollision(spArray[1])){
 		spArray[0].speed *= 1.5;
 		var audio = new Audio("resources/turbo.mp3");
		audio.play();
	}*/

	verificaColisoesLaterais(spArray,ctx);
	draw(ctx, spArray);
}

function verificaColisoesLaterais(spArray,ctx){

	var cw = ctx.canvas.width;

	//Verifica Colisão à esquerda
	for(let i = 1;i <= 5; i++){
		if(spArray[i].direcao == 'left'){
			if (spArray[i].x >= 0){
				if (spArray[i].x - spArray[i].speed < 0){
					spArray[i].direcao = "right";
				}
				else
					spArray[i].x = spArray[i].x - spArray[i].speed;
			}
		}
		else{
			if (spArray[i].x + spArray[i].width <= cw){
				if (spArray[i].x + spArray[i].width + spArray[i].speed > cw)
					spArray[i].direcao = "left";
				else
					spArray[i].x = spArray[i].x + spArray[i].speed;
			}
		}
	}
}
function canvasClickHandler(ev, ctx, spArray)
{
	//console.log("Clicking...");
	/*if (spArray[1].clickedBoundingBox(ev,ctx)) {
		console.log("Sair");	
		window.open("../html/menu.html", "_self");
	}*/
}