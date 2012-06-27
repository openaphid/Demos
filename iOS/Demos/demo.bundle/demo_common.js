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

//Notes: The codes below make aliases in global scope. It's for demostration only, which doesn't mean it's a good practice pattern.
var Size = aphid.core.Size;
var Point = aphid.core.Point;
var Rect = aphid.core.Rect;

var Scene = aphid.g2d.Scene;
var Node = aphid.g2d.Node;
var Sprite = aphid.g2d.Sprite;
var LabelTTF = aphid.g2d.LabelTTF;
var Font = aphid.g2d.Font;
var Texture2D = aphid.g2d.Texture2D;
var actions = aphid.g2d.actions;


var demo = {};

demo.textureCache = {};
demo.allTests = [];
demo.testIndex = 0

//----------------------------------------------------------------------------------------------------------------------
demo.inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};

demo.bind = function (scope, fn) {
	return function () {
		return fn.apply(scope, arguments);
	};
}

//----------------------------------------------------------------------------------------------------------------------
// functions
demo.initialize = function() {
	demo.textureCache["arrow-left"] = new Texture2D("arrow-left.png");
	demo.textureCache["arrow-right"] = new Texture2D("arrow-right.png");
	demo.textureCache["reset"] = new Texture2D("reset.png");
	demo.textureCache["aphid-1"] = new Texture2D("aphid-1.png");
	demo.textureCache["aphid-2"] = new Texture2D("aphid-2.png");
	demo.textureCache["fire"] = new Texture2D("fire.png");
	demo.textureCache["background"] = new Texture2D("background-480.png");
}

demo.reloadTest = function(testIndex) {
	var TestClass = demo.allTests[testIndex];
	var director = aphid.g2d.director;

	var scene = new Scene();
	scene.addChild(new TestClass().getNode());

	scene.addChild(new demo.Menu().getNode());
	var titles = new demo.Title();
	scene.addChild(titles.getNode());
	titles.getTitleLabel().text = TestClass.title;
	titles.getSubtitleLabel().text = TestClass.subtitle;

	director.runScene(scene);
}

//----------------------------------------------------------------------------------------------------------------------
//class Menu
demo.Menu = function() {
	this.node_ = new Node();
	this.leftButton_ = new Sprite(demo.textureCache["arrow-left"]);
	this.resetButton_ = new Sprite(demo.textureCache["reset"]);
	this.rightButton_ = new Sprite(demo.textureCache["arrow-right"]);
	this.node_.
		addChild(this.leftButton_).
		addChild(this.resetButton_).
		addChild(this.rightButton_);

	var winSize = aphid.g2d.director.winSize;
	this.leftButton_.position = new Point(winSize.width / 2 - 100, 40);
	this.resetButton_.position = new Point(winSize.width / 2, 40);
	this.rightButton_.position = new Point(winSize.width / 2 + 100, 40);
	this.leftButton_.ontouchstart = function(e) {
		e.target.scale = new aphid.core.Vector2(0.9, 0.9);
	};
	this.leftButton_.ontouchend = function(e) {
		demo.testIndex -= 1;
		if (demo.testIndex < 0) demo.testIndex = 0;
		demo.reloadTest(demo.testIndex);
		e.target.scale = new aphid.core.Vector2(1, 1);
	};

	this.resetButton_.ontouchstart = function(e) {
		e.target.scale = new aphid.core.Vector2(0.9, 0.9);
	};
	this.resetButton_.ontouchend = function(e) {
		demo.reloadTest(demo.testIndex);
		e.target.scale = new aphid.core.Vector2(1, 1);
	};

	this.rightButton_.ontouchstart = function(e) {
		e.target.scale = new aphid.core.Vector2(0.9, 0.9);
	};
	this.rightButton_.ontouchend = function(e) {
		demo.testIndex = (demo.testIndex + 1) % demo.allTests.length;
		demo.reloadTest(demo.testIndex);
		e.target.scale = new aphid.core.Vector2(1, 1);
	};

	this.leftButton_.touchEnabled = true;
	this.resetButton_.touchEnabled = true;
	this.rightButton_.touchEnabled = true;

	this.leftButton_.visible = demo.testIndex > 0;
	this.rightButton_.visible = demo.testIndex < demo.allTests.length - 1;
};

demo.Menu.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class Title
demo.Title = function() {
	this.node_ = new Node();
	this.titleLabel_ = new LabelTTF("", Size.zero, new Font("Arial", 24), "center");
	this.subtitleLabel_ = new LabelTTF("", Size.zero, new Font("Thonburi", 16), "center");
	this.node_.addChild(this.titleLabel_).addChild(this.subtitleLabel_);

	var winSize = aphid.g2d.director.winSize;
	this.titleLabel_.position = new Point(winSize.width/2, winSize.height - 50);
	this.subtitleLabel_.position = new Point(winSize.width/2, winSize.height - 80);
};

demo.Title.prototype.getNode = function() {return this.node_;};
demo.Title.prototype.getTitleLabel = function() {return this.titleLabel_;};
demo.Title.prototype.getSubtitleLabel = function() {return this.subtitleLabel_;};
