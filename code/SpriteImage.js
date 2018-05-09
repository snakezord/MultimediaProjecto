"use strict";

class SpriteImage
{

	constructor(x, y, w, h, speed, img)
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

		this.imageData = this.getImageData(img);
	}

	getImageData(img){

        var canvasnova = document.createElement("canvas");
        canvasnova.width = this.width;
        canvasnova.height = this.height;

        var ctx = canvasnova.getContext("2d");
        ctx.drawImage(img, 0, 0, this.width, this.height);

        return ctx.getImageData(0, 0, this.width, this.height);
    }


	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}


	reset(ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
	}
}