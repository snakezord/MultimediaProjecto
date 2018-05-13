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
	var totLoad = 11;
	spArray = new Array(totLoad);

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="faro";
	img.src = "../PhotoshopResources/faroNivel.png";  

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="agua1";
	img.src = "../PhotoshopResources/agua_pequena.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="agua2";
	img.src = "../PhotoshopResources/agua_pequena.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoAzul";
	img.src = "../PhotoshopResources/barcoAzulLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="barcoCastanho";
	img.src = "../PhotoshopResources/barcoCastanhoRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="viper";
	img.src = "../PhotoshopResources/viperLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="policia";
	img.src = "../PhotoshopResources/policiaRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroVermelho";
	img.src = "../PhotoshopResources/carroVermelhoLeft.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="carroAzul";
	img.src = "../PhotoshopResources/carroAzulRight.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="meta";
	img.src = "../PhotoshopResources/fim.png";

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="boneco";
	img.src = "../PhotoshopResources/boneco.png";

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'faro') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'agua1') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 57, nw, nh, 25, img, false);
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'agua2') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 278, nw, nh, 25, img, false);
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(70, 59, nw, nh, 6, "left", img, "../PhotoshopResources/barcoAzulLeft.png", "../PhotoshopResources/barcoAzulRight.png");
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoCastanho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(122, 283, nw, nh, 4, "right", img, "../PhotoshopResources/barcoCastanhoLeft.png", "../PhotoshopResources/barcoCastanhoRight.png");
			spArray[4] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'viper') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(533, 113, nw, nh, 5, "left", img, "../PhotoshopResources/viperLeft.png", "../PhotoshopResources/viperRight.png");
			spArray[5] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'policia') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(209, 177, nw, nh, 6, "right", img, "../PhotoshopResources/policiaLeft.png", "../PhotoshopResources/policiaRight.png");
			spArray[6] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(329, 335, nw, nh, 6, "left", img, "../PhotoshopResources/carroVermelhoLeft.png", "../PhotoshopResources/carroVermelhoRight.png");
			spArray[7] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(185, 398, nw, nh, 4, "right", img, "../PhotoshopResources/carroAzulLeft.png", "../PhotoshopResources/carroAzulRight.png");
			spArray[8] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'meta') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(745, 2, nw, nh, 25, img, false);
			spArray[9] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'boneco') {
			var img = ev.target;
			var nw = 30;
			var nh = 30;
			var sp = new SpriteImage(364, 470, nw, nh, 25, img, false);
			spArray[10] = sp;
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
	var sp = spArray[10];

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
	for(let i = 3; i <= 8; i++){
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
	for(let i=5;i<=8;i++){
		if(spArray[10].verificaColisao(spArray[i])){
			spArray[10].reset(ctx);
		}
	}

	for(let i=3;i<=4;i++){
		if(spArray[10].verificaColisao(spArray[i])){
			spArray[10].x = spArray[i].x + (spArray[i].width/2);
		}	
	}
}

function verificaColisaoAgua(spArray,ctx){
	if ((spArray[10].verificaColisao(spArray[1]) && !spArray[10].verificaColisao(spArray[3])) || (spArray[10].verificaColisao(spArray[2]) && !spArray[10].verificaColisao(spArray[4]))) {
		spArray[10].reset(ctx);
	}	
}

function verificaFim(spArray, ctx) {
	if (spArray[10].contido(spArray[9])) {
		document.cookie = "complete";
		//window.open("coimbraNivelPergunta.html","_self");
		console.log("completo");
	}
}