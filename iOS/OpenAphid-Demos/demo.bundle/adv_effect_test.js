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
	var winSize = director.winSize;

	demo.initialize();

	demo.allTests = [
		Effect1,
		Effect2,
		Effect3,
		Effect5
	];

	director.displayFPS = true;

	demo.reloadTest(demo.testIndex);
}

//----------------------------------------------------------------------------------------------------------------------
//class ActionDemo
ActionDemo = function() {
	this.node_ = new Node();

	var winSize = aphid.g2d.director.winSize;
	
	var background = new Sprite(demo.textureCache["background"]);
	background.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(background);
	this.background_ = background;

	var sp1 = new Sprite(demo.textureCache["aphid-1"]);
	sp1.position = new Point(winSize.width / 4, winSize.height / 2);
	sp1.scale = 0.5;
	var scale = actions.scaleBy(2, 3);
	sp1.runAction(
		actions.repeatForever(
			actions.sequence(
				scale.copy(),
				scale.reverse()
			)
		)
	);
	background.addChild(sp1, 1);
	this.sp1_ = sp1;

	var sp2 = new Sprite(demo.textureCache["aphid-2"]);
	sp2.position = new Point(winSize.width * 2 / 3, winSize.height / 2);
	sp2.scale = 0.5;
	sp2.runAction(
		actions.repeatForever(
			actions.sequence(
				scale.copy(),
				scale.reverse()
			)
		)
	);
	background.addChild(sp2, 1);
	this.sp2_ = sp2;

	this.applyEffect();
};

ActionDemo.prototype.getNode = function() {return this.node_;}
ActionDemo.prototype.applyEffect = function(target) {}

//----------------------------------------------------------------------------------------------------------------------
//class Effect1
Effect1 = function() {
	ActionDemo.call(this);
}

demo.inherits(Effect1, ActionDemo);

Effect1.title = "Lens + Waves3d & OrbitCamera";
Effect1.subtitle = "";
Effect1.prototype.applyEffect = function() {
	var winSize = aphid.g2d.director.winSize;
	var gridSize = new Size(15, 10);
	var lens = actions.lens3D(new Point(winSize.width/2, winSize.height/2), 240, gridSize, 0);
	var waves = actions.waves3D(18, 15, gridSize, 10);
	var reuse = actions.reuseGrid(1);
	var delay = actions.delay(8);
	var orbit = actions.orbitCamera(5, 1, 2, 0, 180, 0, -90);
	var orbitBack = orbit.reverse();

	this.background_.runAction(
		actions.repeatForever(
			actions.sequence(
				orbit,
				orbitBack
			)
		)
	);

	this.background_.runAction(
		actions.sequence(
			lens, delay, reuse, waves
		)
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class Effect2
Effect2 = function() {
	ActionDemo.call(this);
}

demo.inherits(Effect2, ActionDemo);

Effect2.title = "ShakyTiles + ShuffleTiles + TurnOffTiles";
Effect2.subtitle = "";
Effect2.prototype.applyEffect = function() {
	var winSize = aphid.g2d.director.winSize;
	var gridSize = new Size(15, 10);

	var shaky = actions.shakyTiles3D(4, false, gridSize, 5);
	var shuffle = actions.shuffleTiles(0, gridSize, 3);
	var turnoff = actions.turnOffTiles(0, gridSize, 3)
	var turnon = turnoff.reverse();

	var reuse = actions.reuseGrid(2);
	var delay = actions.delay(1);

	this.background_.runAction(
		actions.sequence(
			shaky, delay, reuse, shuffle, delay.copy(), turnoff, turnon
		)
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class Effect3
Effect3 = function() {
	ActionDemo.call(this);
}

demo.inherits(Effect3, ActionDemo);

Effect3.title = "Effects on multiple nodes";
Effect3.subtitle = "";
Effect3.prototype.applyEffect = function() {
	var winSize = aphid.g2d.director.winSize;
	var gridSize = new Size(15, 10);

	var waves = actions.waves(5, 20, true, false, gridSize, 5);
	var shaky = actions.shaky3D(4, false, gridSize, 5);

	this.sp1_.runAction(
		actions.repeatForever(waves)
	);

	this.sp2_.runAction(
		actions.repeatForever(shaky)
	);

	var move = actions.moveBy(3, new Point(200, 0));
	this.background_.runAction(
		actions.repeatForever(
			actions.sequence(
				move,
				move.reverse()
			)
		)
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class Effect5
Effect5 = function() {
	ActionDemo.call(this);
}

demo.inherits(Effect5, ActionDemo);

Effect5.title = "Stop Copy Restart";
Effect5.subtitle = "";
Effect5.prototype.applyEffect = function() {
	var effect = actions.liquid(1, 20, new Size(32, 24), 2)
	this.background_.runAction(
		actions.sequence(
			effect,
			actions.delay(2),
			actions.stopGrid(),
			actions.delay(2),
			effect.copy()
		)
	);
}