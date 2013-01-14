aphid.js.includeFile("demo_common.js");

aphid.js.onload = setupTests;

//----------------------------------------------------------------------------------------------------------------------
// Global functions
function setupTests() {
	var director = aphid.g2d.director;
	var winSize = director.winSize;

	demo.initialize();

	demo.allTests = [
		SingleTouchTest,
		MultipleTouchTest,
		PinchTest
	];

	director.displayFPS = true;

	demo.reloadTest(demo.testIndex);
}

//----------------------------------------------------------------------------------------------------------------------
//class SingleTouchTest
SingleTouchTest = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	aphid.g2d.director.multipleTouchEnabled = false;

	var sp1 = this.createTouchSprite(new aphid.core.Color("red", 128));
	sp1.position = new Point(winSize.width/2 - 80, winSize.height / 2);

	var sp2 = this.createTouchSprite(new aphid.core.Color("green", 128));
	sp2.position = new Point(winSize.width/2, winSize.height / 2);

	var sp3 = this.createTouchSprite(new aphid.core.Color("blue", 128));
	sp3.position = new Point(winSize.width/2 + 80, winSize.height / 2);

	this.node_.addChild(sp1).addChild(sp2).addChild(sp3);
};

SingleTouchTest.prototype.getNode = function() {return this.node_;};
SingleTouchTest.prototype.createTouchSprite = function(color) {
	var sp = new Sprite();
	sp.contentSize = new Size(100, 100);
	sp.touchEnabled = true;
	sp.color = color;

	sp.ontouchstart = function(e) {
		var sprite = e.target;
		sprite.runAction(
			actions.scaleTo(0.2, 1.2, 1.2)
			);
	};

	sp.ontouchmove = function(e) {
		var touch = e.touches[0];
		var sprite = e.target;
		if (sprite.parent)
			sprite.position = sprite.parent.locationOfTouch(touch);
	};

	sp.ontouchend = sp.ontouchcancel = function(e) {
		var sprite = e.target;
		sprite.runAction(
			actions.scaleTo(0.2, 1, 1)
			);
	};

	return sp;
};
SingleTouchTest.title = "Single Touch";
SingleTouchTest.subtitle = "Drag a color block";

//----------------------------------------------------------------------------------------------------------------------
//class MultipleTouchTest
MultipleTouchTest = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	aphid.g2d.director.multipleTouchEnabled = true;

	var sp1 = this.createTouchSprite(new aphid.core.Color("red", 128));
	sp1.position = new Point(winSize.width/2 - 80, winSize.height / 2);

	var sp2 = this.createTouchSprite(new aphid.core.Color("green", 128));
	sp2.position = new Point(winSize.width/2, winSize.height / 2);

	var sp3 = this.createTouchSprite(new aphid.core.Color("blue", 128));
	sp3.position = new Point(winSize.width/2 + 80, winSize.height / 2);

	this.node_.addChild(sp1).addChild(sp2).addChild(sp3);
};

MultipleTouchTest.prototype.getNode = function() {return this.node_;};
MultipleTouchTest.prototype.createTouchSprite = function(color) {
	var sp = new Sprite();
	sp.contentSize = new Size(100, 100);
	sp.touchEnabled = true;
	sp.color = color;

	sp.ontouchstart = function(e) {
		var sprite = e.target;
		sprite.runAction(
			actions.scaleTo(0.2, 1.2, 1.2)
			);
	};

	sp.ontouchmove = function(e) {
		var touch = e.targetTouches[0];
		var sprite = e.target;
		if (sprite.parent)
			sprite.position = sprite.parent.locationOfTouch(touch);
	};

	sp.ontouchend = sp.ontouchcancel = function(e) {
		if (e.targetTouches.length == 0) { //all fingers lifted up
			var sprite = e.target;
				sprite.runAction(
					actions.scaleTo(0.2, 1, 1)
				);
		}
	};

	return sp;
};
MultipleTouchTest.title = "Multiple Touch";
MultipleTouchTest.subtitle = "Drag multiple color blocks";

//----------------------------------------------------------------------------------------------------------------------
//class PinchTest
PinchTest = function() {
	this.node_ = new Node();
	this.distance_ = 0;

	var winSize = aphid.g2d.director.winSize;
	aphid.g2d.director.multipleTouchEnabled = true;

	this.node_.contentSize = winSize;

	var sp = new Sprite();
	sp.contentSize = new Size(100, 100);
	sp.position = new Point(winSize.width / 2, winSize.height / 2);
	sp.color = "red";
	this.sprite_ = sp;

	this.node_.touchEnabled = true;
	this.node_.ontouchstart = demo.bind(this, this.handleTouchStart);
	this.node_.ontouchmove = demo.bind(this, this.handleTouchMove);

	this.node_.addChild(sp);
};

PinchTest.prototype.getNode = function() {return this.node_;};
PinchTest.prototype.handleTouchStart = function(e) {
	if (e.targetTouches.length == 2) {
		var p1 = e.target.locationOfTouch(e.targetTouches[0]);
		var p2 = e.target.locationOfTouch(e.targetTouches[1]);
		this.distance_ = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
		this.startScaleX_ = this.sprite_.scale.x;
	}
};

PinchTest.prototype.handleTouchMove = function(e) {
	if (e.targetTouches.length == 2) {
		var p1 = e.target.locationOfTouch(e.targetTouches[0]);
		var p2 = e.target.locationOfTouch(e.targetTouches[1]);
		var dis = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
		if (this.distance_ == 0)
			this.distance_ = dis;
		
		if (dis > 0)
			this.sprite_.scale = this.startScaleX_ * dis / this.distance_;
	}
};
PinchTest.title = "Pinch Touch";
PinchTest.subtitle = "";
