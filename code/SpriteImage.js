"use strict";

class SpriteImage
{

	constructor(x, y, w, h, speed, clickable, img)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = speed;

		//imagem
		this.img = img;

		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;
	}


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.clickable = this.clickableIni;
	}
	/*
	mouseOverBoundingBox(ev, ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;
		var imgData = ctx.getImageData(mx,my,1,1);

		console.log(imgData.data[0]+" "+imgData.data[1]+" "+imgData.data[2]+" "+imgData.data[3]);

		if ((imgData.data[0] != 255)&&(imgData.data[1] != 255)&&(imgData.data[2] != 255)&&(imgData.data[3] != 255)) {
			return false;
		}
		return true;
	}*/

	checkCollision(ev){
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
            return true;
		}
        else
            return false;
	}


	clickedBoundingBox(ev, ctx) //ev.target é a canvas
	{
		if (!this.clickable)
			return false;
		else
			return this.checkCollision(ev);
	}
}