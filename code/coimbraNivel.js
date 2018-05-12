"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray;
var paused = false;
var reqID;
var ctx;

function main() {
	var canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	canvas.addEventListener("initend", initEndHandler);
	init(ctx);

	function initEndHandler(ev)
	{
		spArray = ev.spArray;
		//iniciar a animação
		startAnim(ctx, spArray);
	}
}

function init(ctx){
	var nLoad = 0;
	var totLoad = 15;
	spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbra";
	img.src = "../PhotoshopResources/coimbraNivel.png";  

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="camiao";
	img.src = "../PhotoshopResources/camiaoLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroVermelho";
	img.src = "../PhotoshopResources/carroVermelhoLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="policia";
	img.src = "../PhotoshopResources/policiaRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="taxi";
	img.src = "../PhotoshopResources/taxiRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="meta";
	img.src = "../PhotoshopResources/fim.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="agua";
	img.src = "../PhotoshopResources/agua_grande.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="ponte";
	img.src = "../PhotoshopResources/ponte.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="boneco";
	img.src = "../PhotoshopResources/boneco.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="portugalLeft";
	img.src = "../PhotoshopResources/flagPortugalLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="portugalRight";
	img.src = "../PhotoshopResources/flagPortugalRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="europaLeft";
	img.src = "../PhotoshopResources/flagEuropaLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="europaRight";
	img.src = "../PhotoshopResources/flagEuropaRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraLeft";
	img.src = "../PhotoshopResources/flagCoimbraLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="coimbraRight";
	img.src = "../PhotoshopResources/flagCoimbraRight.png";

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'coimbra') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'camiao') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(570, 56, nw, nh, 3, "left", img, "../PhotoshopResources/camiaoLeft.png", "../PhotoshopResources/camiaoRight.png");
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(211, 170, nw, nh, 7, "left", img, "../PhotoshopResources/carroVermelhoLeft.png", "../PhotoshopResources/carroVermelhoRight.png");
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'policia') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(401, 112, nw, nh, 6, "right", img, "../PhotoshopResources/policiaLeft.png", "../PhotoshopResources/policiaRight.png");
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'taxi') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(72, 230, nw, nh, 4, "right", img, "../PhotoshopResources/taxiLeft.png", "../PhotoshopResources/taxiRight.png");
			spArray[4] = sp;
			nLoad++;
		}
		else if (ev.target.id == 'meta') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(745, 0, nw, nh, 25, img, false);
			spArray[5] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'agua') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 277, nw, nh, 25, img, false);
			spArray[6] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'ponte') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(70, 277, nw, nh, 25, img, false);
			spArray[7] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'boneco') {
			var img = ev.target;
			var nw = 30;
			var nh = 30;
			var sp = new SpriteImage(364, 470, nw, nh, 25, img, false);
			spArray[8] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'portugalLeft') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(37, 413, nw, nh, 25, img, false);
			spArray[9] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'portugalRight') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(176, 413, nw, nh, 25, img, false);
			spArray[10] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'europaLeft') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(37, 291, nw, nh, 25, img, false);
			spArray[11] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'europaRight') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(176, 291, nw, nh, 25, img, false);
			spArray[12] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraLeft') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(37, 344, nw, nh, 25, img, false);
			spArray[13] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'coimbraRight') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(174, 344, nw, nh, 25, img, false);
			spArray[14] = sp;
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
	var sp = spArray[8];

	if(ev.keyCode == 27 || ev.keyCode == 80){ //pausa (ESC e P)
 		if(paused){
 			paused = false;
 			startAnim(ctx,spArray);
 		}
 		else{
 			paused = true;
 			window.cancelAnimationFrame(reqID);
 		}
 	}

	if(ev.keyCode == 37){ //esquerda
 		if (sp.x > 0){
			if (sp.x - sp.speed < 0)
				sp.x = 0;
			else
				sp.x = sp.x - sp.speed;
		}	
	}

	if(ev.keyCode == 38){ //cima
 		if (sp.y > 0){
			if (sp.y - sp.speed < 0)
				sp.y = 0;
			else
				sp.y = sp.y - sp.speed;
		}	
	}

	if(ev.keyCode == 39){ //direita
 		if (sp.x + sp.width < cw){
			if (sp.x + sp.width + sp.speed > cw)
				sp.x = cw - sp.width;
			else
				sp.x = sp.x + sp.speed;
		}	
	}

	if(ev.keyCode == 40){ //baixo
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

function animLoop(ctx, spArray)
{
	var al = function(time)
	{
		//console.log("Tempo: "+time);
		window.addEventListener("keydown", keydownHandler);
		animLoop(ctx, spArray);
	}
	reqID = window.requestAnimationFrame(al);

	render(ctx, spArray, reqID);
}

function render(ctx, spArray, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	verificaColisoesLaterais(spArray,ctx);
	verificaColisoesCarros(spArray,ctx);
	verificaColisaoAgua(spArray,ctx);
	verificaFim(spArray, ctx);
	draw(ctx, spArray);
}

function verificaColisoesLaterais(spArray,ctx){

	var cw = ctx.canvas.width;

	//Verifica Colisão à esquerda
	for(let i = 1;i <= 4; i++){
		if(spArray[i].direcao == 'left'){
			if (spArray[i].x >= 0){
				if (spArray[i].x - spArray[i].speed < 0){
					spArray[i].direcao = "right";
					spArray[i].createImgRight(); 
				}
				else
					spArray[i].x = spArray[i].x - spArray[i].speed;
			}
		}
		else{
			if (spArray[i].x + spArray[i].width <= cw){
				if (spArray[i].x + spArray[i].width + spArray[i].speed > cw){
					spArray[i].direcao = "left";
					spArray[i].createImgLeft();
				}
				else
					spArray[i].x = spArray[i].x + spArray[i].speed;
			}
		}
	}
}

function verificaColisoesCarros(spArray,ctx){
	for(let i=1;i<=4;i++){
		if(spArray[8].verificaColisao(spArray[i])){
			spArray[8].reset(ctx);
		}
	}
}

function verificaColisaoAgua(spArray,ctx){

	if(spArray[8].verificaColisao(spArray[6]) && !spArray[8].verificaColisao(spArray[7])) {
		spArray[8].reset(ctx);
	}	
}

function verificaFim(spArray, ctx) {
	if (spArray[8].contido(spArray[5])) {
		document.cookie = "complete";
		window.open("coimbraNivelPergunta.html","_self");
	}
}