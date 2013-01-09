/*
 Copyright 2012 Aphid Mobile

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

aphid.js.includeFile("demo_common.js");

aphid.js.onload = setupTests;

//----------------------------------------------------------------------------------------------------------------------
// Global functions
function setupTests() {
	var director = aphid.g2d.director;
	
	//var enabled = aphid.ios.enableRetinaDisplay(true);
	//console.log("retina enabled: " + enabled + ", winSize=" + winSize);
	
	var winSize = director.winSize;

	demo.initialize();

	demo.allTests = [
		Test2,
		Test4,
		Test5,
		Test6,
		StressTest1,
		StressTest2,
		NodeToWorld,
		CameraOrbitTest,
		CameraZoomTest,
		CameraCenterTest,
		ConvertToNode
	];

	director.displayFPS = true;

	demo.reloadTest(demo.testIndex);
}

//----------------------------------------------------------------------------------------------------------------------
//class Test2
Test2 = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	var sp2 = new Sprite(demo.textureCache["aphid-2"]);
	var sp3 = new Sprite(demo.textureCache["aphid-1"]);
	var sp4 = new Sprite(demo.textureCache["aphid-2"]);
	sp1.position = new Point(100, winSize.height/2);
	sp2.position = new Point(300, winSize.height/2);
	this.node_.addChild(sp1).addChild(sp2);

	sp3.scale = new aphid.core.Vector2(0.25, 0.25);
	sp4.scale = new aphid.core.Vector2(0.25, 0.25);
	sp1.addChild(sp3);
	sp2.addChild(sp4);

	var a1 = actions.rotateBy(2, 360);
	var a2 = actions.scaleBy(2, 2);
	var action1 = actions.repeatForever(
			actions.sequence(
				a1, a2, a2.reverse()
				)
		);
	var action2 = actions.repeatForever(
			actions.sequence(a1.copy(), a2.copy(), a2.reverse())
		);

	sp2.anchor = Point.zero;
	sp1.runAction(action1);
	sp2.runAction(action2);
};

Test2.prototype.getNode = function() {return this.node_;};
Test2.title = "anchorPoint and children";
Test2.subtitle = "";

//----------------------------------------------------------------------------------------------------------------------
//class Test4
Test4 = function() {
	this.node_ = new Node();

	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	var sp2 = new Sprite(demo.textureCache["aphid-2"]);

	sp1.position = new Point(100, 160);
	sp2.position = new Point(380, 160);

	this.node_.addChild(sp1, 0, 2).addChild(sp2, 0, 3);

	this.node_.scheduleTimer(this.delay2, 2);
	this.node_.scheduleTimer(this.delay4, 4);
};

Test4.prototype.getNode = function() {return this.node_;};

Test4.prototype.delay2 = function(target, callbackThis, dt) {
	var node = target.getChildByTag(2);
	var action1 = actions.rotateBy(1, 360);
	node.runAction(action1);
};

Test4.prototype.delay4 = function(target, callbackThis, dt) {
	target.unscheduleTimer(callbackThis);
	target.removeChildByTag(3);
};

Test4.title = "un/scheduleTimer & tags";
Test4.subtitle = "";

//----------------------------------------------------------------------------------------------------------------------
//class Test5
Test5 = function() {
	this.node_ = new Node();
	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	var sp2 = new Sprite(demo.textureCache["aphid-2"]);

	sp1.position = new Point(100, 160);
	sp2.position = new Point(380, 160);

	var rot = actions.rotateBy(2, 360);
	var rotBack = rot.reverse();
	var forever = actions.repeatForever(
		actions.sequence(rot, rotBack)
		);
	var forever2 = forever.copy();

	this.node_.addChild(sp1, 0, 1).addChild(sp2, 0, 2);

	sp1.runAction(forever);
	sp2.runAction(forever2);

	this.node_.scheduleTimer(this.addAndRemove, 2);
};

Test5.title = "remove & cleanup";
Test5.subtitle = "";

Test5.prototype.getNode = function() {return this.node_;};
Test5.prototype.addAndRemove = function(target, originalCallback, dt) {
	var sp1 = target.getChildByTag(1);
	var sp2 = target.getChildByTag(2);
	target.removeChild(sp1, false);
	target.removeChild(sp2, true);
	target.addChild(sp1, 0, 1);
	target.addChild(sp2, 0, 2);
};

//----------------------------------------------------------------------------------------------------------------------
//class Test6
Test6 = function() {
	this.node_ = new Node();
	
	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	var sp11 = new Sprite(demo.textureCache["aphid-1"]);
	var sp2 = new Sprite(demo.textureCache["aphid-2"]);
	var sp21 = new Sprite(demo.textureCache["aphid-2"]);

	sp1.position = new Point(100, 160);
	sp2.position = new Point(380, 160);

	var rot = actions.rotateBy(2, 360);
	var rotBack = rot.reverse();
	var forever1 = actions.repeatForever(
		actions.sequence(rot, rotBack)
		);
	var forever11 = forever1.copy();
	var forever2 = forever1.copy();
	var forever21 = forever1.copy();

	this.node_.addChild(sp1, 0, 1).addChild(sp2, 0, 2);
	sp1.addChild(sp11);
	sp2.addChild(sp21);

	sp1.runAction(forever1);
	sp11.runAction(forever11);
	sp2.runAction(forever2);
	sp21.runAction(forever21);

	this.node_.scheduleTimer(this.addAndRemove, 2);
};

Test6.title = "remove/cleanup with children";
Test6.subtitle = "";
Test6.prototype.getNode = function() {return this.node_;};
Test6.prototype.addAndRemove = function(target, originalCallback, dt) {
	var sp1 = target.getChildByTag(1);
	var sp2 = target.getChildByTag(2);
	target.removeChild(sp1, false);
	target.removeChild(sp2, true);
	target.addChild(sp1, 0, 1).addChild(sp2, 0, 2);
};

//----------------------------------------------------------------------------------------------------------------------
ParticleSun = function() {
	var winSize = aphid.g2d.director.winSize;
	this.particle_ = new aphid.g2d.ParticleSystem(
			{
				"maxParticles" : 350,
				"emitterType" : 0,
				"gravityx" : 0,
				"gravityy" : 0,
				"radialAcceleration" : 0,
				"radialAccelVariance" : 0,
				"speed" : 20,
				"speedVariance" : 5,
				"angle" : 90,
				"angleVariance" : 360,
				"sourcePositionx" : winSize.width / 2,
				"sourcePositiony" : winSize.height / 2,
				"particleLifeSpan" : 1,
				"particleLifespanVariance" : 0.5,
				"startParticleSize" : 30,
				"startParticleSizeVariance" : 10,
				"finishParticleSize" : -1,
				"startColorRed" : 0.76,
				"startColorGreen" : 0.25,
				"startColorBlue" : 0.12,
				"finishColorAlpha" : 1
			}
		);

	this.particle_.blendAdditive = true;
	this.particle_.texture = demo.textureCache["fire"];
}

ParticleSun.prototype.getNode = function() {return this.particle_;}

//----------------------------------------------------------------------------------------------------------------------
//class StressTest1
StressTest1 = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;
	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	sp1.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(sp1, 0, 1);
	this.node_.scheduleTimer(demo.bind(this, this.shouldNotCrash), 1);
};

StressTest1.title = "StressTest1, no crash";
StressTest1.subtitle = "";
StressTest1.prototype.getNode = function() {return this.node_;};
StressTest1.prototype.shouldNotCrash = function(target, originalCallback, dt) {
	aphid.g2d.director.runningScene.runAction(
		actions.sequence(
			actions.rotateBy(2, 360),
			actions.callFunction(demo.bind(this, this.removeMe))
			)
		);
	var explosion = new ParticleSun();
	this.node_.addChild(explosion.getNode());
	return false;
};
StressTest1.prototype.removeMe = function(target, action) {
	this.node_.removeFromParent();
};

//----------------------------------------------------------------------------------------------------------------------
//class StressTest2
StressTest2 = function() {
	this.node_ = new Node();

	var subnode = new Node();
	
	var winSize = aphid.g2d.director.winSize;
	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	sp1.position = new Point(80, winSize.height / 2);
	
	var move = actions.moveBy(3, new Point(350, 0));
	var moveEaseInOut3 = actions.easeInOut(
			move.copy(),
			2
		);
	var moveEaseInOutBack3 = moveEaseInOut3.reverse();
	var seq3 = actions.sequence(moveEaseInOut3, moveEaseInOutBack3);

	sp1.runAction(actions.repeatForever(seq3));

	subnode.addChild(sp1, 1);

	var particle = new ParticleSun().getNode();
	particle.position = new Point(80, winSize.height/2 - 50);
	particle.runAction(actions.repeatForever(seq3.copy()));
	subnode.addChild(particle, 2);

	this.node_.addChild(subnode, 0, 1);

	this.node_.scheduleTimer(demo.bind(this, this.shouldNotLeak), 6);
};

StressTest2.title = "StressTest2, no leaks";
StressTest2.subtitle = "";
StressTest2.prototype.getNode = function() {return this.node_;};
StressTest2.prototype.shouldNotLeak = function(target, originalCallback, dt) {
	var subnode = this.node_.getChildByTag(1);
	subnode.removeAllChildren();
	return false;
};

//----------------------------------------------------------------------------------------------------------------------
//class NodeToWorld
NodeToWorld = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;
	var background = new Sprite(demo.textureCache["background"]);
	background.anchor = Point.zero;
	this.node_.addChild(background, -10);

	var backSize = background.contentSize;
	var button = new aphid.g2d.ColorNode("lightgreen", new Size(120, 30));
	button.position = new Point(backSize.width / 2, backSize.height / 2);
	button.anchor = new Point(0.5, 0.5);
	button.ontouchstart = function(e) {
		e.target.color = "red";
	};
	button.ontouchend = function(e) {
		e.target.color = "lightgreen";
	};
	button.touchEnabled = true;
	background.addChild(button);

	button.runAction(
		actions.repeatForever(
			actions.rotateBy(5, 360)
		)
	);

	var move = actions.moveBy(3, new Point(200, 0));
	background.runAction(
		actions.repeatForever(
			actions.sequence(
				move, move.reverse()
			)
		)
	);
};

NodeToWorld.title = "NodeToWorld, touch test";
NodeToWorld.subtitle = "";
NodeToWorld.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class CameraOrbitTest
CameraOrbitTest = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	var background = new Sprite(demo.textureCache["background"]);
	background.position  = new Point(winSize.width / 2, winSize.height / 2);
	background.opacity = 128;
	this.node_.addChild(background, 0);

	var s = background.contentSize;

	var sprite;
	//left
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.scale = 0.5;
	sprite.position = new Point(s.width / 4 * 1, s.height / 2);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(2, 1, 0, 0, 360, 0, 0)
		)
	);
	background.addChild(sprite);

	//center
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.scale = 1;
	sprite.position = new Point(s.width / 4 * 2, s.height / 2);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(2, 1, 0, 0, 360, 45, 0)
		)
	);
	background.addChild(sprite);

	//right
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.scale = 2;
	sprite.position = new Point(s.width / 4 * 3, s.height / 2);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(2, 1, 0, 0, 360, 90, 0)
		)
	);
	background.addChild(sprite);

	background.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 90)
		)
	);
};

CameraOrbitTest.title = "Camera Orbit Test";
CameraOrbitTest.subtitle = "";
CameraOrbitTest.prototype.getNode = function() {return this.node_;}

//----------------------------------------------------------------------------------------------------------------------
//class CameraZoomTest
CameraZoomTest = function() {
	this.node_ = new Node();
	this.z_ = 0;

	var s = aphid.g2d.director.winSize;

	var sprite;
	//left
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.position = new Point(s.width / 4 * 1, s.height / 2);
	var camera = sprite.camera;
	camera.eye = new aphid.core.Vector3(0, 0, 415);
	this.node_.addChild(sprite, 0, 0);

	//center
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.position = new Point(s.width / 4 * 2, s.height / 2);
	this.node_.addChild(sprite, 0, 40);

	//right
	sprite = new Sprite(demo.textureCache["aphid-1"]);
	sprite.position = new Point(s.width / 4 * 3, s.height / 2);
	this.node_.addChild(sprite, 0, 20);

	this.node_.onframeupdate = demo.bind(this, this.handleUpdate);
	this.node_.scheduleUpdate();
};

CameraZoomTest.title = "Camera Zoom Test";
CameraZoomTest.subtitle = "";
CameraZoomTest.prototype.getNode = function() {return this.node_;};
CameraZoomTest.prototype.handleUpdate = function(target, dt) {
	this.z_ += dt * 100;
	var camera = this.node_.getChildByTag(20).camera;
	camera.eye = new aphid.core.Vector3(0, 0, this.z_);

	camera = this.node_.getChildByTag(40).camera;
	camera.eye = new aphid.core.Vector3(0, 0, this.z_ / 2);
};

//----------------------------------------------------------------------------------------------------------------------
//class CameraCenterTest
CameraCenterTest = function() {
	this.node_ = new Node();
	this.z_ = 0;

	var s = aphid.g2d.director.winSize;

	var sprite;
	//left-bottom
	sprite = new Sprite(null);
	sprite.position = new Point(s.width / 5 * 1, s.height / 5 * 1);
	sprite.color = "red";
	sprite.textureRect = new Rect(0, 0, 120, 50);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 0)
		)
	);
	this.node_.addChild(sprite);

	//left-top
	sprite = new Sprite(null);
	sprite.position = new Point(s.width / 5 * 1, s.height / 5 * 4);
	sprite.color = "blue";
	sprite.textureRect = new Rect(0, 0, 120, 50);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 0)
		)
	);
	this.node_.addChild(sprite);

	//center
	sprite = new Sprite(null);
	sprite.position = new Point(s.width / 2, s.height / 2);
	sprite.color = "white";
	sprite.textureRect = new Rect(0, 0, 120, 50);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 0)
		)
	);
	this.node_.addChild(sprite);

	//right-top
	sprite = new Sprite(null);
	sprite.position = new Point(s.width / 5 * 4, s.height / 5 * 4);
	sprite.color = "green";
	sprite.textureRect = new Rect(0, 0, 120, 50);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 0)
		)
	);
	this.node_.addChild(sprite);

	//right-bottom
	sprite = new Sprite(null);
	sprite.position = new Point(s.width / 5 * 4, s.height / 5 * 1);
	sprite.color = "yellow";
	sprite.textureRect = new Rect(0, 0, 120, 50);
	sprite.runAction(
		actions.repeatForever(
			actions.orbitCamera(10, 1, 0, 0, 360, 0, 0)
		)
	);
	this.node_.addChild(sprite);
};

CameraCenterTest.title = "Camera Center Test";
CameraCenterTest.subtitle = "";
CameraCenterTest.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class ConvertToNode
ConvertToNode = function() {
	this.node_ = new Node();

	var s = aphid.g2d.director.winSize;

	var action = actions.repeatForever(
		actions.rotateBy(10, 360)
	);

	for (var i = 0; i < 3; i++) {
		var sprite = new Sprite(demo.textureCache["aphid-1"]);
		sprite.position = new Point(s.width / 4 * (i + 1), s.height / 2);

		var point = new Sprite(null);
		point.color = "green";
		point.textureRect = new Rect(0, 0, 8, 8);
		point.position = sprite.position;

		switch(i) {
			case 0:
				sprite.anchor = Point.zero;
				break;
			case 1:
				sprite.anchor = new Point(0.5, 0.5);
				break;
			case 2:
				sprite.anchor = new Point(1, 1);
				break;
		}

		point.position = sprite.position;
		sprite.runAction(action.copy());
		this.node_.addChild(point, 10, 100 + i).addChild(sprite, i, i + 1000);
	}

	this.node_.touchEnabled = true;
	this.node_.contentSize = s;
	this.node_.ontouchend = function(e) {
		var touch = e.changedTouches[0];
		console.log("touch: " + [touch.clientX, touch.clientY].join(", "));
		console.log("in node: " + e.target.locationOfTouch(touch));
		for (var i = 0; i < 3; i++) {
			console.log("in sub node " + i + ", " + e.target.getChildByTag(i + 1000).locationOfTouch(touch));
			console.log("in sub node " + i + ", " + e.target.getChildByTag(i + 1000).locationAROfTouch(touch));
		}
	}
};

ConvertToNode.title = "Convert To Node Space";
ConvertToNode.subtitle = "";
ConvertToNode.prototype.getNode = function() {return this.node_;};

