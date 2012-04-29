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
		Shaky3DDemo, 
		Waves3DDemo, 
		FlipX3DDemo, 
		FlipY3DDemo, 
		Lens3DDemo, 
		Ripple3DDemo, 
		LiquidDemo, 
		WavesDemo, 
		TwirlDemo, 
		PageTurn3DDemo,
		ShakyTiles3DDemo, 
		ShatteredTiles3DDemo,
		ShuffleTilesDemo,
		FadeOutTRTilesDemo,
		FadeOutBLTilesDemo,
		FadeOutUpTilesDemo,
		FadeOutDownTilesDemo,
		TurnOffTilesDemo,
		WavesTiles3DDemo,
		JumpTiles3DDemo,
		SplitRowsDemo,
		SplitColumnsDemo		
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
	this.node_.addChild(sp1);

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
	this.node_.addChild(sp2);

	var effect = this.getEffectAction(2);
	if (effect) {
		this.node_.runAction(
			actions.sequence(
				effect,
				actions.stopGrid()
			)
		);
	}
	else
		console.log("effect is null");
};

ActionDemo.prototype.getNode = function() {return this.node_;}
ActionDemo.prototype.getEffectAction = function(duration) {return null;}

//----------------------------------------------------------------------------------------------------------------------
//class Shaky3DDemo
Shaky3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(Shaky3DDemo, ActionDemo);

Shaky3DDemo.title = "Shaky3D";
Shaky3DDemo.subtitle = "";
Shaky3DDemo.prototype.getEffectAction = function(duration) {
	return actions.shaky3D(5, true, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class Waves3DDemo
Waves3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(Waves3DDemo, ActionDemo);

Waves3DDemo.title = "Waves3D";
Waves3DDemo.subtitle = "";
Waves3DDemo.prototype.getEffectAction = function(duration) {
	return actions.waves3D(5, 40, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class FlipX3DDemo
FlipX3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FlipX3DDemo, ActionDemo);

FlipX3DDemo.title = "FlipX3D";
FlipX3DDemo.subtitle = "";
FlipX3DDemo.prototype.getEffectAction = function(duration) {
	var flipx = actions.flipX3D(duration);

	return actions.sequence(
		flipx,
		actions.delay(1),
		flipx.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class FlipY3DDemo
FlipY3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FlipY3DDemo, ActionDemo);

FlipY3DDemo.title = "FlipY3D";
FlipY3DDemo.subtitle = "";
FlipY3DDemo.prototype.getEffectAction = function(duration) {
	var flipy = actions.flipY3D(duration);

	return actions.sequence(
		flipy,
		actions.delay(1),
		flipy.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class Lens3DDemo
Lens3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(Lens3DDemo, ActionDemo);

Lens3DDemo.title = "Lens3DDemo";
Lens3DDemo.subtitle = "";
Lens3DDemo.prototype.getEffectAction = function(duration) {
	var winSize = aphid.g2d.director.winSize;

	return actions.lens3D(new Point(winSize.width / 2, winSize.height / 2), 240, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class Ripple3DDemo
Ripple3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(Ripple3DDemo, ActionDemo);

Ripple3DDemo.title = "Ripple3DDemo";
Ripple3DDemo.subtitle = "";
Ripple3DDemo.prototype.getEffectAction = function(duration) {
	var winSize = aphid.g2d.director.winSize;

	return actions.ripple3D(new Point(winSize.width / 2, winSize.height / 2), 240, 4, 160, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class LiquidDemo
LiquidDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(LiquidDemo, ActionDemo);

LiquidDemo.title = "LiquidDemo";
LiquidDemo.subtitle = "";
LiquidDemo.prototype.getEffectAction = function(duration) {
	return actions.liquid(4, 20, new Size(16, 12), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class WavesDemo
WavesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(WavesDemo, ActionDemo);

WavesDemo.title = "WavesDemo";
WavesDemo.subtitle = "";
WavesDemo.prototype.getEffectAction = function(duration) {
	return actions.waves(4, 20, true, true, new Size(16, 12), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class TwirlDemo
TwirlDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(TwirlDemo, ActionDemo);

TwirlDemo.title = "TwirlDemo";
TwirlDemo.subtitle = "";
TwirlDemo.prototype.getEffectAction = function(duration) {
	var winSize = aphid.g2d.director.winSize;
	return actions.twirl(new Point(winSize.width / 2, winSize.height / 2), 1, 2.5, new Size(12, 8), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class PageTurn3DDemo
PageTurn3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(PageTurn3DDemo, ActionDemo);

PageTurn3DDemo.title = "PageTurn3DDemo";
PageTurn3DDemo.subtitle = "";
PageTurn3DDemo.prototype.getEffectAction = function(duration) {
	return actions.pageTurn3D(new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class ShakyTiles3DDemo
ShakyTiles3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(ShakyTiles3DDemo, ActionDemo);

ShakyTiles3DDemo.title = "ShakyTiles3DDemo";
ShakyTiles3DDemo.subtitle = "";
ShakyTiles3DDemo.prototype.getEffectAction = function(duration) {
	return actions.shakyTiles3D(5, true, new Size(16, 12), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class ShatteredTiles3DDemo
ShatteredTiles3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(ShatteredTiles3DDemo, ActionDemo);

ShatteredTiles3DDemo.title = "ShatteredTiles3DDemo";
ShatteredTiles3DDemo.subtitle = "";
ShatteredTiles3DDemo.prototype.getEffectAction = function(duration) {
	return actions.shatteredTiles3D(5, true, new Size(16, 12), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class WavesTiles3DDemo
WavesTiles3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(WavesTiles3DDemo, ActionDemo);

WavesTiles3DDemo.title = "WavesTiles3DDemo";
WavesTiles3DDemo.subtitle = "";
WavesTiles3DDemo.prototype.getEffectAction = function(duration) {
	return actions.wavesTiles3D(4, 120, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class JumpTiles3DDemo
JumpTiles3DDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(JumpTiles3DDemo, ActionDemo);

JumpTiles3DDemo.title = "JumpTiles3DDemo";
JumpTiles3DDemo.subtitle = "";
JumpTiles3DDemo.prototype.getEffectAction = function(duration) {
	return actions.jumpTiles3D(2, 30, new Size(15, 10), duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class SplitRowsDemo
SplitRowsDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(SplitRowsDemo, ActionDemo);

SplitRowsDemo.title = "SplitRowsDemo";
SplitRowsDemo.subtitle = "";
SplitRowsDemo.prototype.getEffectAction = function(duration) {
	return actions.splitRows(9, duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class SplitColumnsDemo
SplitColumnsDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(SplitColumnsDemo, ActionDemo);

SplitColumnsDemo.title = "SplitColumnsDemo";
SplitColumnsDemo.subtitle = "";
SplitColumnsDemo.prototype.getEffectAction = function(duration) {
	return actions.splitColumns(9, duration);
}

//----------------------------------------------------------------------------------------------------------------------
//class ShuffleTilesDemo
ShuffleTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(ShuffleTilesDemo, ActionDemo);

ShuffleTilesDemo.title = "ShuffleTilesDemo";
ShuffleTilesDemo.subtitle = "";
ShuffleTilesDemo.prototype.getEffectAction = function(duration) {
	var shuffle = actions.shuffleTiles(25, new Size(16, 12), duration);
	return actions.sequence(
		shuffle,
		actions.delay(1),
		shuffle.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class FadeOutTRTilesDemo
FadeOutTRTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FadeOutTRTilesDemo, ActionDemo);

FadeOutTRTilesDemo.title = "FadeOutTRTilesDemo";
FadeOutTRTilesDemo.subtitle = "";
FadeOutTRTilesDemo.prototype.getEffectAction = function(duration) {
	var fade = actions.fadeOutTRTiles(new Size(16, 12), duration);
	return actions.sequence(
		fade,
		actions.delay(1),
		fade.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class FadeOutBLTilesDemo
FadeOutBLTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FadeOutBLTilesDemo, ActionDemo);

FadeOutBLTilesDemo.title = "FadeOutBLTilesDemo";
FadeOutBLTilesDemo.subtitle = "";
FadeOutBLTilesDemo.prototype.getEffectAction = function(duration) {
	var fade = actions.fadeOutBLTiles(new Size(16, 12), duration);
	return actions.sequence(
		fade,
		actions.delay(1),
		fade.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class FadeOutUpTilesDemo
FadeOutUpTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FadeOutUpTilesDemo, ActionDemo);

FadeOutUpTilesDemo.title = "FadeOutUpTilesDemo";
FadeOutUpTilesDemo.subtitle = "";
FadeOutUpTilesDemo.prototype.getEffectAction = function(duration) {
	var fade = actions.fadeOutUpTiles(new Size(16, 12), duration);
	return actions.sequence(
		fade,
		actions.delay(1),
		fade.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class FadeOutDownTilesDemo
FadeOutDownTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(FadeOutDownTilesDemo, ActionDemo);

FadeOutDownTilesDemo.title = "FadeOutDownTilesDemo";
FadeOutDownTilesDemo.subtitle = "";
FadeOutDownTilesDemo.prototype.getEffectAction = function(duration) {
	var fade = actions.fadeOutDownTiles(new Size(16, 12), duration);
	return actions.sequence(
		fade,
		actions.delay(1),
		fade.reverse()
	);
}

//----------------------------------------------------------------------------------------------------------------------
//class TurnOffTilesDemo
TurnOffTilesDemo = function() {
	ActionDemo.call(this);
}

demo.inherits(TurnOffTilesDemo, ActionDemo);

TurnOffTilesDemo.title = "TurnOffTilesDemo";
TurnOffTilesDemo.subtitle = "";
TurnOffTilesDemo.prototype.getEffectAction = function(duration) {
	var fade = actions.turnOffTiles(25, new Size(48, 32), duration);
	return actions.sequence(
		fade,
		actions.delay(1),
		fade.reverse()
	);
}