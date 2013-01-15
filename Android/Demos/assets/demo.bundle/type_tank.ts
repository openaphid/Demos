/// <reference no-default-lib="true"/>

declare var aphid : any;

module moduletank { //declare a module
	var maxTankCount = 1000;

	class Tank {
		public sprite : any;
		vx : number;
		vy : number;

		constructor(texture : any) {
			this.sprite = new aphid.g2d.Sprite(texture);
			//movement velocity and direction
			this.vx = Math.random() > 0.5 ? 0.1 : -0.1;
			this.vy = Math.random() > 0.5 ? 0.1 : -0.1;

			var winSize = aphid.g2d.director.winSize;
			//random initial position
			this.sprite.position = new aphid.core.Point(Math.random() * winSize.width, Math.random() * winSize.height);
			//setup and register frame update listener
			this.sprite.scheduleUpdate();
			this.sprite.onframeupdate = (target, interval : number) => {
				var p = this.sprite.position;
				p.x += interval * 1000 * this.vx;
				p.y += interval * 1000 * this.vy;
				var size = aphid.g2d.director.winSize;
				if (p.x < 0) {
					p.x = 0;
					this.vx = -this.vx;
				} else if (p.x > size.width) {
					p.x = size.width;
					this.vx = -this.vx;
				}
				
				if (p.y < 0) {
					p.y = 0;
					this.vy = -this.vy;
				} else if (p.y > size.height) {
					p.y = size.height;
					this.vy = -this.vy;
				}
				this.sprite.position = p;
			}
		}
	} //end of class Tank

	class FPS {
		public label = new aphid.g2d.LabelTTF("??.??");
		fpsCount = 0;
		lastTime = Date.now();

		constructor() {
			this.label.position = new aphid.core.Point(100, 100);
			this.label.scheduleUpdate();
			this.label.onframeupdate = (target, frameInterval : number) => {
				this.fpsCount++;
				var interval = Date.now() - this.lastTime;
				if (interval >= 5000) {
					this.label.text = "" + (this.fpsCount / interval * 1000).toFixed(2);
					this.fpsCount = 0;
					this.lastTime = Date.now();
				}
			}
		}
	} //end of class FPS

	export function initialize() {
		var director = aphid.g2d.director;

		var scene = new aphid.g2d.Scene();

		var background = new aphid.g2d.Sprite(new aphid.g2d.Texture2D("background.png"));
		scene.addChild(background);

		var texture = new aphid.g2d.Texture2D("tank.png");

		var frames = [];
		var imgSize = texture.contentSize;
		for (var i = 0; i < 5; i++) {
			var frame = new aphid.g2d.SpriteFrame(texture, new aphid.core.Rect(imgSize.width * i / 5, 0, imgSize.width / 5, imgSize.height));
			frames.push(frame);
		}

		var animation = new aphid.g2d.Animation(frames, 0.05);
		var action = aphid.g2d.actions.repeatForever(
			aphid.g2d.actions.animate(animation, false)
			);

		for (var i = 0; i < maxTankCount; i++) {
			var tank = new Tank(frames[0].texture);
			tank.sprite.runAction(action.copy());
			scene.addChild(tank.sprite);
		}

		var fps = new FPS();
		scene.addChild(fps.label);

		director.runScene(scene);
	}
}

aphid.js.onload = moduletank.initialize;

