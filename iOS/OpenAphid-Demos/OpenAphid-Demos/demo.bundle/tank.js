bind = function (scope, fn) {
	return function () {
		return fn.apply(scope, arguments);
	};
}

var tank = {} //declare a namespace
tank.maxTankCount = 1000;

tank.Tank = function(texture) {
	//fields
	this.sprite_ = new aphid.g2d.Sprite(texture);
	//movement velocity and direction
	this.vx_ = Math.random() > 0.5 ? 0.1 : -0.1;
	this.vy_ = Math.random() > 0.5 ? 0.1 : -0.1;

	var winSize = aphid.g2d.director.winSize;
	//random initial position
	this.sprite_.position = new aphid.core.Point(Math.random() * winSize.width, Math.random() * winSize.height);
	//setup and register frame update listener
	this.sprite_.onframeupdate = bind(this, this.handleFrameUpdate);
	this.sprite_.scheduleUpdate();
};

tank.Tank.prototype.getSprite = function() {return this.sprite_;};

tank.Tank.prototype.handleFrameUpdate = function(target, interval) {
		var p = this.sprite_.position;
		p.x += interval * 1000 * this.vx_;
		p.y += interval * 1000 * this.vy_;
		var size = aphid.g2d.director.winSize;
		if (p.x < 0) {
			p.x = 0;
			this.vx_ = -this.vx_;
		} else if (p.x > size.width) {
			p.x = size.width;
			this.vx_ = -this.vx_;
		}
		
		if (p.y < 0) {
			p.y = 0;
			this.vy_ = -this.vy_;
		} else if (p.y > size.height) {
			p.y = size.height;
			this.vy_ = -this.vy_;
		}
		this.sprite_.position = p;
};

tank.FPS = function() {
	this.label_ = new aphid.g2d.LabelTTF("??.??");
	this.label_.position = new aphid.core.Point(100, 100);
	this.fpsCount_ = 0;
	this.lastTime_ = Date.now();

	this.label_.onframeupdate = bind(this, this.handleFrameUpdate);
	this.label_.scheduleUpdate();
};

tank.FPS.prototype.getLabel = function() {return this.label_;};

tank.FPS.prototype.handleFrameUpdate = function(target, frameInterval) {
		this.fpsCount_++;
		interval = Date.now() - this.lastTime_;
		if (interval >= 5000) {
			this.label_.text = "" + (this.fpsCount_ / interval * 1000).toFixed(2);
			this.fpsCount_ = 0;
			this.lastTime_ = Date.now();
		}
	};

tank.initialize = function() {
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

	for (var i = 0; i < tank.maxTankCount; i++) {
		var newTank = new tank.Tank(frames[0].texture);
		newTank.getSprite().runAction(action.copy());
		scene.addChild(newTank.getSprite());
	}

	var fps = new tank.FPS();
	scene.addChild(fps.getLabel());

	director.runScene(scene);
};

aphid.js.onload = tank.initialize;
