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
	var totLoad = 10;
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
	img.src = "../PhotoshopResources/taxiRight.png";  //dá ordem de carregamento da imagem

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

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="agua";
	img.src = "../PhotoshopResources/agua.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="plataformaFinal";
	img.src = "../PhotoshopResources/plataformaFinal.png";  //dá ordem de carregamento da imagem

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="meta";
	img.src = "../PhotoshopResources/meta.png";  //dá ordem de carregamento da imagem				

	var img = new Image();
	img.addEventListener("load", imgLoadedHandler);
	img.id="fim";
	img.src = "../PhotoshopResources/fim.png";  //dá ordem de carregamento da imagem	

	function imgLoadedHandler(ev) {
		if (ev.target.id == 'porto') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 1, img, false);
			spArray[1] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroVermelho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(520, 335, nw, nh, 3, "left", img, "../PhotoshopResources/carroVermelhoLeft.png", "../PhotoshopResources/carroVermelhoRight.png");
			spArray[3] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(136, 400, nw, nh, 3, "right", img, "../PhotoshopResources/carroAzulLeft.png", "../PhotoshopResources/carroAzulRight.png");
			spArray[4] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'carroAmarelo') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(152, 230, nw, nh, 3, "right", img, "../PhotoshopResources/taxiLeft.png", "../PhotoshopResources/taxiRight.png");
			spArray[5] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoAzul') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(100, 53, nw, nh+6, 3, "right", img, "../PhotoshopResources/barcoAzulLeft.png", "../PhotoshopResources/barcoAzulRight.png");
			spArray[6] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'barcoCastanho') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new VeiculoNivel(560, 115, nw, nh+6, 3, "left", img, "../PhotoshopResources/barcoCastanhoLeft.png", "../PhotoshopResources/barcoCastanhoRight.png");
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

		else if (ev.target.id == 'agua') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 55, nw, nh, 25, img, false);
			spArray[2] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'plataformaFinal') {
			var img = ev.target;
			var nw = img.naturalWidth;
			var nh = img.naturalHeight;
			var sp = new SpriteImage(0, 0, nw, nh, 25, img, false);
			spArray[0] = sp;
			nLoad++;
		}

		else if (ev.target.id == 'meta') {
			var img = ev.target;
			var sp = new SpriteImage(745, 0, 55, 55, 25, img, false);
			spArray[9] = sp;
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

	if(ev.keyCode == 27 || ev.keyCode == 80){ //esquerda
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
				sp.y = 0 + sp.width;
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
	reqID = window.requestAnimationFrame(al);

	render(ctx, spArray, reqID);
}

//resedenho, actualizações, ...
function render(ctx, spArray, reqID)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	verificaColisoesLaterais(spArray,ctx);
	verificaColisoesCarros(spArray,ctx);
	verificaColisaoAgua(spArray,ctx);
	draw(ctx, spArray);
}

function verificaColisoesLaterais(spArray,ctx){

	var cw = ctx.canvas.width;

	//Verifica Colisão à esquerda
	for(let i = 3;i <= 7; i++){
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
	for(let i=3;i<=5;i++){
		if(spArray[8].verificaColisao(spArray[i])){
			spArray[8].reset(ctx);
		}
	}

	for(let i=6;i<=7;i++){
		if(spArray[8].verificaColisao(spArray[i])){
			spArray[8].x = spArray[i].x + (spArray[i].width/2);
		}	
	}
}

function verificaColisaoAgua(spArray,ctx){

	if(spArray[8].verificaColisao(spArray[2]) && !spArray[8].verificaColisao(spArray[7]) && !spArray[8].verificaColisao(spArray[6])){
		spArray[8].reset(ctx);
	}	
}