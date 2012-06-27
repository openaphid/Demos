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
	//the movement velocity and direction
	this.vx_ = Math.random() > 0.5 ? 0.1 : -0.1;
	this.vy_ = Math.random() > 0.5 ? 0.1 : -0.1;

	var winSize = aphid.g2d.director.winSize;
	//a random initial position
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
		}
		
		if (p.x > size.width) {
			p.x = size.width;
			this.vx_ = -this.vx_;
		}
		
		if (p.y < 0) {
			p.y = 0;
			this.vy_ = -this.vy_;
		}
		
		if (p.y > size.height) {
			p.y = size.height;
			this.vy_ = -this.vy_;
		}
		this.sprite_.position = p;
};

tank.FPS = function() {
	this.label_ = new aphid.g2d.LabelTTF("??.??");
	this.label_.position = new aphid.core.Point(100, 100);
	this.fpsCount_ = 0;
	this.deltaTime_ = 0;

	this.label_.onframeupdate = bind(this, this.handleFrameUpdate);
	this.label_.scheduleUpdate();
};

tank.FPS.prototype.getLabel = function() {return this.label_;};

tank.FPS.prototype.handleFrameUpdate = function(target, interval) {
		this.fpsCount_++;
		this.deltaTime_ += interval;
		if (this.deltaTime_ >= 5) {
			this.label_.text = "" + (this.fpsCount_ / this.deltaTime_).toFixed(2);
			this.fpsCount_ = 0;
			this.deltaTime_ = 0;
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
