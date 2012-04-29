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

	//var enabled = aphid.ios.enableRetinaDisplay(true);
	//console.log("retina enabled: " + enabled);

	demo.initialize();

	demo.allTests = [
		SpriteFrameTest,
		Sprite1,
		SpriteBatchNode1,
		SpriteColorOpacity,
		SpriteBatchNodeColorOpacity,
		SpriteZOrder,
		SpriteBatchNodeZOrder,
		SpriteBatchNodeReorder,
		SpriteBatchNodeReorderCCIssue744,
		SpriteBatchNodeReorderCCIssue766,
		SpriteAnchorPoint,
		SpriteBatchNodeAnchorPoint,
		SpriteBatchNodeTransform,
		SpriteFlip,
		SpriteBatchNodeFlip,
		SpriteAliased,
		SpriteBatchNodeAliased,
		SpriteNewTexture,
		SpriteBatchNodeNewTexture,
		SpriteFrameTest
	];

	demo.walkers = {}
	
	demo.walkers.spriteHoriCount = 9;
	demo.walkers.spriteVertiCount = 8;
	demo.walkers.texture = new Texture2D("walk-cycle.png");
	demo.walkers.spriteWidth = demo.walkers.texture.contentSize.width / demo.walkers.spriteHoriCount;
	demo.walkers.spriteHeight = demo.walkers.texture.contentSize.height / demo.walkers.spriteVertiCount;
	demo.walkers.spriteCount = demo.walkers.spriteHoriCount * demo.walkers.spriteVertiCount;
	

	demo.walkers.createWalker = function(idx) {
		idx = idx % demo.walkers.spriteCount;
		var x = (idx % demo.walkers.spriteHoriCount) * demo.walkers.spriteWidth;
		var y = Math.floor(idx / demo.walkers.spriteHoriCount) * demo.walkers.spriteHeight;
		return new Sprite(demo.walkers.texture, new Rect(x, y, demo.walkers.spriteWidth, demo.walkers.spriteHeight));
	}

	director.displayFPS = true;

	demo.reloadTest(demo.testIndex);
}

//----------------------------------------------------------------------------------------------------------------------
//class Sprite1
Sprite1 = function() {
	this.node_ = new Node();

	var winSize = aphid.g2d.director.winSize;

	this.node_.ontouchend = demo.bind(
		this, 
		function(e) {
			this.addWalker(this.node_.locationOfTouch(e.touches[0]));
		}
	);

	this.node_.touchEnabled = true;

	this.node_.contentSize = winSize;
}

Sprite1.title = "Sprite Walkers";
Sprite1.subtitle = "Tap screen to add a walker";
Sprite1.prototype.getNode = function() {return this.node_;};
Sprite1.prototype.addWalker = function(pos) {
	var idx = Math.floor(Math.random() * demo.walkers.spriteCount);
	var sp = demo.walkers.createWalker(idx);
	sp.position = pos;
	this.node_.addChild(sp);

	var rand = Math.random();
	var action;
	if (rand < 0.2) 
		action = actions.scaleBy(3, 2);
	else if (rand < 0.4)
		action = actions.rotateBy(3, 360);
	else if (rand < 0.8)
		action = actions.sequence(
			actions.tintTo(2, Math.floor(Math.random() * 0xffffff)),
			actions.tintTo(2, sp.color)
			);
	else
		action = actions.fadeOut(2);
	sp.runAction(
		actions.repeatForever(
			actions.sequence(
				action,
				action.reverse()
			)
		)
	);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNode1
SpriteBatchNode1 = function() {
	this.node_ = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);

	var winSize = aphid.g2d.director.winSize;

	this.node_.ontouchend = demo.bind(
		this, 
		function(e) {
			this.addWalker(this.node_.locationOfTouch(e.touches[0]));
		}
	);

	this.node_.touchEnabled = true;

	this.node_.contentSize = winSize;
}

SpriteBatchNode1.title = "SpriteBatchNode Walkers";
SpriteBatchNode1.subtitle = "Tap screen to add a walker";
SpriteBatchNode1.prototype.getNode = function() {return this.node_;};
SpriteBatchNode1.prototype.addWalker = function(pos) {
	var idx = Math.floor(Math.random() * demo.walkers.spriteCount);
	var sp = demo.walkers.createWalker(idx);
	sp.position = pos;
	this.node_.addChild(sp);

	var rand = Math.random();
	var action;
	if (rand < 0.2) 
		action = actions.scaleBy(3, 2);
	else if (rand < 0.4)
		action = actions.rotateBy(3, 360);
	else if (rand < 0.6)
		action = actions.blink(1, 3);
	else if (rand < 0.8)
		action = actions.sequence(
			actions.tintTo(2, Math.floor(Math.random() * 0xffffff)),
			actions.tintTo(2, sp.color)
			);
	else
		action = actions.fadeOut(2);
	sp.runAction(
		actions.repeatForever(
			actions.sequence(
				action,
				action.reverse()
			)
		)
	);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteColorOpacity
SpriteColorOpacity = function() {
	this.node_ = new Node();

	var winSize = aphid.g2d.director.winSize;

	var sp1 = demo.walkers.createWalker(1);
	var sp2 = demo.walkers.createWalker(2);
	var sp3 = demo.walkers.createWalker(3);
	var sp4 = demo.walkers.createWalker(4);
	var sp5 = demo.walkers.createWalker(5);
	var sp6 = demo.walkers.createWalker(6);
	var sp7 = demo.walkers.createWalker(7);
	var sp8 = demo.walkers.createWalker(8);

	sp1.position = new Point(winSize.width / 5 * 1, winSize.height / 3 * 1);
	sp2.position = new Point(winSize.width / 5 * 2, winSize.height / 3 * 1);
	sp3.position = new Point(winSize.width / 5 * 3, winSize.height / 3 * 1);
	sp4.position = new Point(winSize.width / 5 * 4, winSize.height / 3 * 1);
	sp5.position = new Point(winSize.width / 5 * 1, winSize.height / 3 * 2);
	sp6.position = new Point(winSize.width / 5 * 2, winSize.height / 3 * 2);
	sp7.position = new Point(winSize.width / 5 * 3, winSize.height / 3 * 2);
	sp8.position = new Point(winSize.width / 5 * 4, winSize.height / 3 * 2);

	var action = actions.fadeIn(2);
	var fade = actions.repeatForever(
		actions.sequence(
			action,
			action.reverse()
			)
		);

	var tint = actions.tintBy(2, 0, -255, -255);
	var red = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	tint = actions.tintBy(2, -255, 0, -255);
	var green = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	tint = actions.tintBy(2, -255, -255, 0);
	var blue = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	sp5.runAction(red);
	sp6.runAction(green);
	sp7.runAction(blue);
	sp8.runAction(fade);

	this.node_.addChild(sp1, 0, 1).addChild(sp2, 0, 2).addChild(sp3, 0, 3).addChild(sp4, 0, 4).addChild(sp5, 0, 5).addChild(sp6, 0, 6).addChild(sp7, 0, 7).addChild(sp8, 0, 8);

	this.node_.scheduleTimer(demo.bind(this, this.removeAndAdd), 2);
}

SpriteColorOpacity.title = "Sprite Color & Opacity";
SpriteColorOpacity.subtitle = "";
SpriteColorOpacity.prototype.getNode = function() {return this.node_;};
SpriteColorOpacity.prototype.removeAndAdd = function() {
	var sp = this.node_.getChildByTag(5);
	this.node_.removeChild(sp, false);
	this.node_.addChild(sp, 0, 5);
}

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeColorOpacity
SpriteBatchNodeColorOpacity = function() {
	this.node_ = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);

	var winSize = aphid.g2d.director.winSize;

	var sp1 = demo.walkers.createWalker(1);
	var sp2 = demo.walkers.createWalker(2);
	var sp3 = demo.walkers.createWalker(3);
	var sp4 = demo.walkers.createWalker(4);
	var sp5 = demo.walkers.createWalker(5);
	var sp6 = demo.walkers.createWalker(6);
	var sp7 = demo.walkers.createWalker(7);
	var sp8 = demo.walkers.createWalker(8);

	sp1.position = new Point(winSize.width / 5 * 1, winSize.height / 3 * 1);
	sp2.position = new Point(winSize.width / 5 * 2, winSize.height / 3 * 1);
	sp3.position = new Point(winSize.width / 5 * 3, winSize.height / 3 * 1);
	sp4.position = new Point(winSize.width / 5 * 4, winSize.height / 3 * 1);
	sp5.position = new Point(winSize.width / 5 * 1, winSize.height / 3 * 2);
	sp6.position = new Point(winSize.width / 5 * 2, winSize.height / 3 * 2);
	sp7.position = new Point(winSize.width / 5 * 3, winSize.height / 3 * 2);
	sp8.position = new Point(winSize.width / 5 * 4, winSize.height / 3 * 2);

	var action = actions.fadeIn(2);
	var fade = actions.repeatForever(
		actions.sequence(
			action,
			action.reverse()
			)
		);

	var tint = actions.tintBy(2, 0, -255, -255);
	var red = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	tint = actions.tintBy(2, -255, 0, -255);
	var green = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	tint = actions.tintBy(2, -255, -255, 0);
	var blue = actions.repeatForever(
		actions.sequence(
			tint,
			tint.reverse()
			)
		);

	sp5.runAction(red);
	sp6.runAction(green);
	sp7.runAction(blue);
	sp8.runAction(fade);

	this.node_.addChild(sp1, 0, 1).addChild(sp2, 0, 2).addChild(sp3, 0, 3).addChild(sp4, 0, 4).addChild(sp5, 0, 5).addChild(sp6, 0, 6).addChild(sp7, 0, 7).addChild(sp8, 0, 8);

	this.node_.scheduleTimer(demo.bind(this, this.removeAndAdd), 2);
}

SpriteBatchNodeColorOpacity.title = "SpriteBatchNode Color & Opacity";
SpriteBatchNodeColorOpacity.subtitle = "";
SpriteBatchNodeColorOpacity.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeColorOpacity.prototype.removeAndAdd = function() {
	var sp = this.node_.getChildByTag(5);
	this.node_.removeChild(sp, false);
	this.node_.addChild(sp, 0, 5);
}

//----------------------------------------------------------------------------------------------------------------------
//class SpriteZOrder
SpriteZOrder = function() {
	this.node_ = new Node();
	this.dir_ = 1;

	var winSize = aphid.g2d.director.winSize;

	var step = winSize.width / 11;
	for (var i = 0; i < 5; i++) {
		var sp = new Sprite(demo.textureCache["aphid-1"]);
		sp.color = "blue";
		sp.position = new Point((i + 1) * step, winSize.height / 2);
		this.node_.addChild(sp, i);
	}

	for (var i = 5; i < 10; i++) {
		var sp = new Sprite(demo.textureCache["aphid-1"]);
		sp.color = "green";
		sp.position = new Point((i + 1) * step, winSize.height / 2);
		this.node_.addChild(sp, 14-i);
	}

	var sp = new Sprite(demo.textureCache["aphid-1"]);
	sp.position = new Point(winSize.width / 2, winSize.height / 2 - 20);
	sp.scale = 2;
	sp.color = "red";
	this.node_.addChild(sp, -1, 1);

	this.node_.scheduleTimer(demo.bind(this, this.reorderSprite), 1);
}

SpriteZOrder.title = "Sprite ZOrder";
SpriteZOrder.subtitle = "";
SpriteZOrder.prototype.getNode = function() {return this.node_;};
SpriteZOrder.prototype.reorderSprite = function() {
	var sp = this.node_.getChildByTag(1);
	var z = sp.zOrder;
	if (z < -1)
		this.dir_ = 1;
	if (z > 10)
		this.dir_ = -1;
	z += this.dir_ * 3;

	this.node_.reorderChild(sp, z);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeZOrder
SpriteBatchNodeZOrder = function() {
	this.node_ = new aphid.g2d.SpriteBatchNode(demo.textureCache["aphid-1"]);
	this.dir_ = 1;

	var winSize = aphid.g2d.director.winSize;

	var step = winSize.width / 11;
	for (var i = 0; i < 5; i++) {
		var sp = new Sprite(demo.textureCache["aphid-1"]);
		sp.color = "blue";
		sp.position = new Point((i + 1) * step, winSize.height / 2);
		this.node_.addChild(sp, i);
	}

	for (var i = 5; i < 10; i++) {
		var sp = new Sprite(demo.textureCache["aphid-1"]);
		sp.color = "green";
		sp.position = new Point((i + 1) * step, winSize.height / 2);
		this.node_.addChild(sp, 14-i);
	}

	var sp = new Sprite(demo.textureCache["aphid-1"]);
	sp.position = new Point(winSize.width / 2, winSize.height / 2 - 20);
	sp.scale = 2;
	sp.color = "red";
	this.node_.addChild(sp, -1, 1);

	this.node_.scheduleTimer(demo.bind(this, this.reorderSprite), 1);
}

SpriteBatchNodeZOrder.title = "SpriteBatchNode ZOrder";
SpriteBatchNodeZOrder.subtitle = "";
SpriteBatchNodeZOrder.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeZOrder.prototype.reorderSprite = function() {
	var sp = this.node_.getChildByTag(1);
	var z = sp.zOrder;
	if (z < -1)
		this.dir_ = 1;
	if (z > 10)
		this.dir_ = -1;
	z += this.dir_ * 3;

	this.node_.reorderChild(sp, z);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeReorder
SpriteBatchNodeReorder = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	var a = [];
	var asmtest = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);
	asmtest.position = new Point(winSize.width / 2, winSize.height / 2);
	for (var i = 0; i < 10; i++) {
		var sp = demo.walkers.createWalker(i);
		a.push(sp);
		asmtest.addChild(sp, 10);
	}

	for (var i = 0; i < 10; i++) {
		if (i != 5)
			asmtest.reorderChild(a[i], 9);
	}

	this.node_.addChild(asmtest);
}

SpriteBatchNodeReorder.title = "SpriteBatchNode Reorder";
SpriteBatchNodeReorder.subtitle = "should not crash";
SpriteBatchNodeReorder.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeReorderCCIssue744
SpriteBatchNodeReorderCCIssue744 = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	var batch = new aphid.g2d.SpriteBatchNode(demo.walkers.texture, 15);
	this.node_.addChild(batch);

	var sp = demo.walkers.createWalker(0);
	sp.position = new Point(winSize.width / 2, winSize.height / 2);
	batch.addChild(sp, 3);
	batch.reorderChild(sp, 1);
}

SpriteBatchNodeReorderCCIssue744.title = "SpriteBatchNode Reorder CC Issue 744";
SpriteBatchNodeReorderCCIssue744.subtitle = "should not crash";
SpriteBatchNodeReorderCCIssue744.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeReorderCCIssue766
SpriteBatchNodeReorderCCIssue766 = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	this.batch_ = new aphid.g2d.SpriteBatchNode(demo.textureCache["aphid-1"], 15);
	this.node_.addChild(this.batch_);

	var sp1 = this.makeSpriteZ(2);
	sp1.position = new Point(200, 180);
	this.sp1_ = sp1;

	var sp2 = this.makeSpriteZ(3);
	sp2.position = new Point(300, 180);

	var sp3 = this.makeSpriteZ(4);
	sp3.position = new Point(400, 180);

	this.node_.scheduleTimer(demo.bind(this, this.reorderSprite), 2);
};

SpriteBatchNodeReorderCCIssue766.title = "SpriteBatchNode Reorder CC Issue 766";
SpriteBatchNodeReorderCCIssue766.subtitle = "In 2 seconds 1 sprite will be reordered";
SpriteBatchNodeReorderCCIssue766.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeReorderCCIssue766.prototype.makeSpriteZ = function(z) {
	var sp = new Sprite(demo.textureCache["aphid-1"]);
	this.batch_.addChild(sp, z + 1, 0);
	var sp2 = new Sprite(demo.textureCache["aphid-1"]);
	sp2.opacity = 128;
	sp2.color = "gray";
	sp.addChild(sp2, z, 3);
	var sp3 = new Sprite(demo.textureCache["aphid-1"]);
	sp3.color = "cyan";
	sp.addChild(sp3, z + 2, 3);

	return sp;
};
SpriteBatchNodeReorderCCIssue766.prototype.reorderSprite = function() {
	this.batch_.reorderChild(this.sp1_, 4);
	console.log("reordered");
	return false;
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeReorderCCIssue767
SpriteBatchNodeReorderCCIssue767 = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	
};

SpriteBatchNodeReorderCCIssue767.title = "SpriteBatchNode Reorder CC Issue 767";
SpriteBatchNodeReorderCCIssue767.subtitle = "XXX";
SpriteBatchNodeReorderCCIssue767.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteAnchorPoint
SpriteAnchorPoint = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	var rotate = actions.rotateBy(10, 360);
	var action = actions.repeatForever(rotate);
	for (var i = 0; i < 3; i++) {
		var sp = demo.walkers.createWalker(1);
		sp.position = new Point(winSize.width / 4 * (i + 1), winSize.height / 2);

		var point = new Sprite();
		point.contentSize = new Size(10, 10);
		point.color = "white";

		if (i == 0)
			sp.anchor = Point.zero;
		else if (i == 1)
			sp.anchor = new Point(0.5, 0.5);
		else
			sp.anchor = new Point(1, 1);
		point.position = sp.position;
		sp.runAction(action.copy());
		this.node_.addChild(sp).addChild(point);
	}
};

SpriteAnchorPoint.title = "Sprite Anchor";
SpriteAnchorPoint.subtitle = "";
SpriteAnchorPoint.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeAnchorPoint
SpriteBatchNodeAnchorPoint = function() {
	this.node_ = new Node();
	this.batch_ = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);
	this.node_.addChild(this.batch_);
	
	var winSize = aphid.g2d.director.winSize;

	var rotate = actions.rotateBy(10, 360);
	var action = actions.repeatForever(rotate);
	for (var i = 0; i < 3; i++) {
		var sp = demo.walkers.createWalker(1);
		sp.position = new Point(winSize.width / 4 * (i + 1), winSize.height / 2);

		var point = new Sprite();
		point.contentSize = new Size(10, 10);
		point.color = "white";

		if (i == 0)
			sp.anchor = Point.zero;
		else if (i == 1)
			sp.anchor = new Point(0.5, 0.5);
		else
			sp.anchor = new Point(1, 1);
		point.position = sp.position;
		sp.runAction(action.copy());
		this.batch_.addChild(sp)
		this.node_.addChild(point);
	}
};

SpriteBatchNodeAnchorPoint.title = "SpriteBatchNode Anchor";
SpriteBatchNodeAnchorPoint.subtitle = "";
SpriteBatchNodeAnchorPoint.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeTransform
SpriteBatchNodeTransform = function() {
	this.node_ = new Node();
	this.batch_ = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);
	this.node_.addChild(this.batch_);
	
	var winSize = aphid.g2d.director.winSize;

	this.batch_.isRelativeAnchor = false;
	this.batch_.anchor = new Point(0.5, 0.5);
	this.batch_.contentSize = winSize;

	var rotate = actions.rotateBy(5, 360);
	var action = actions.repeatForever(rotate);
	
	var rotateForever = actions.repeatForever(
		actions.sequence(
			rotate.copy(),
			rotate.reverse()
			)
		);

	var scale = actions.scaleBy(5, 1.5);
	var scaleForever = actions.repeatForever(
		actions.sequence(
			scale.copy(),
			scale.reverse()
			)
		);

	var step  = winSize.width / 4;

	for (var i = 0; i < 3; i++) {
		var sp = demo.walkers.createWalker(i * 10);
		sp.position = new Point((i + 1) * step, winSize.height / 2);
		sp.runAction(action.copy());
		this.batch_.addChild(sp, i);
	}

	this.batch_.runAction(scaleForever.copy());
	this.batch_.runAction(rotateForever);
};

SpriteBatchNodeTransform.title = "SpriteBatchNode Transformation";
SpriteBatchNodeTransform.subtitle = "";
SpriteBatchNodeTransform.prototype.getNode = function() {return this.node_;};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteFlip
SpriteFlip = function() {
	this.node_ = new Node();
	
	var winSize = aphid.g2d.director.winSize;

	var sp1 = demo.walkers.createWalker(1);
	sp1.position = new Point(winSize.width / 2 - 100, winSize.height / 2);
	this.node_.addChild(sp1, 0, 1);

	var sp2 = demo.walkers.createWalker(2);
	sp2.position = new Point(winSize.width / 2 + 100, winSize.height / 2);
	this.node_.addChild(sp2, 0, 2);

	this.node_.scheduleTimer(demo.bind(this, this.flipSprites), 1);
};

SpriteFlip.title = "Sprite Flip";
SpriteFlip.subtitle = "";
SpriteFlip.prototype.getNode = function() {return this.node_;};
SpriteFlip.prototype.flipSprites = function() {
	var sp1 = this.node_.getChildByTag(1);
	var sp2 = this.node_.getChildByTag(2);
	console.log("pre: " + sp1.contentSize);
	sp1.flipX = !sp1.flipX;
	sp2.flipY = !sp2.flipY;
	console.log("after: " + sp1.contentSize);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeFlip
SpriteBatchNodeFlip = function() {
	this.node_ = new aphid.g2d.SpriteBatchNode(demo.walkers.texture);
	
	var winSize = aphid.g2d.director.winSize;

	var sp1 = demo.walkers.createWalker(1);
	sp1.position = new Point(winSize.width / 2 - 100, winSize.height / 2);
	this.node_.addChild(sp1, 0, 1);

	var sp2 = demo.walkers.createWalker(2);
	sp2.position = new Point(winSize.width / 2 + 100, winSize.height / 2);
	this.node_.addChild(sp2, 0, 2);

	this.node_.scheduleTimer(demo.bind(this, this.flipSprites), 1);
};

SpriteBatchNodeFlip.title = "SpriteBatchNode Flip";
SpriteBatchNodeFlip.subtitle = "";
SpriteBatchNodeFlip.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeFlip.prototype.flipSprites = function() {
	var sp1 = this.node_.getChildByTag(1);
	var sp2 = this.node_.getChildByTag(2);
	console.log("pre: " + sp1.contentSize);
	sp1.flipX = !sp1.flipX;
	sp2.flipY = !sp2.flipY;
	console.log("after: " + sp1.contentSize);
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteAliased
SpriteAliased = function() {
	this.node_ = new Node();
	this.texture_ = new Texture2D("aphid-1.png");
	this.antialias_ = true;
	var winSize = aphid.g2d.director.winSize;

	var sp1 = new Sprite(this.texture_);
	sp1.position = new Point(winSize.width / 2 - 100, winSize.height / 2);
	this.node_.addChild(sp1, 0, 1);

	var sp2 = new Sprite(this.texture_);
	sp2.position = new Point(winSize.width / 2 + 100, winSize.height / 2);
	this.node_.addChild(sp2, 0, 2);

	var scale = actions.scaleBy(2, 5);
	var action = actions.repeatForever(
		actions.sequence(
			scale,
			scale.reverse()
			)
	);

	sp1.runAction(action);
	sp2.runAction(action.copy());

	this.node_.scheduleTimer(demo.bind(this, this.updateAlias), 2);
};

SpriteAliased.title = "Sprite Aliased";
SpriteAliased.subtitle = "";
SpriteAliased.prototype.getNode = function() {return this.node_;};
SpriteAliased.prototype.updateAlias = function() {
	this.texture_.antialias=!this.antialias_;
	this.antialias_ = !this.antialias_;
}

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeAliased
SpriteBatchNodeAliased = function() {
	this.texture_ = new Texture2D("aphid-1.png");
	this.node_ = new aphid.g2d.SpriteBatchNode(this.texture_);
	this.antialias_ = true;
	var winSize = aphid.g2d.director.winSize;

	var sp1 = new Sprite(this.texture_);
	sp1.position = new Point(winSize.width / 2 - 100, winSize.height / 2);
	this.node_.addChild(sp1, 0, 1);

	var sp2 = new Sprite(this.texture_);
	sp2.position = new Point(winSize.width / 2 + 100, winSize.height / 2);
	this.node_.addChild(sp2, 0, 2);

	var scale = actions.scaleBy(2, 5);
	var action = actions.repeatForever(
		actions.sequence(
			scale,
			scale.reverse()
			)
	);

	sp1.runAction(action);
	sp2.runAction(action.copy());

	this.node_.scheduleTimer(demo.bind(this, this.updateAlias), 2);
};

SpriteBatchNodeAliased.title = "SpriteBatchNode Aliased";
SpriteBatchNodeAliased.subtitle = "";
SpriteBatchNodeAliased.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeAliased.prototype.updateAlias = function() {
	this.texture_.antialias=!this.antialias_;
	this.antialias_ = !this.antialias_;
}

//----------------------------------------------------------------------------------------------------------------------
//class SpriteNewTexture
SpriteNewTexture = function() {
	this.node_ = new Node();
	this.texture1_ = new Texture2D("walk-cycle.png");
	this.texture2_ = new Texture2D("walk-cycle-mono.png");
	this.useTexture1_ = true;
	var winSize = aphid.g2d.director.winSize;

	for (var i = 0; i < 30; i++)
		this.addNewSprite();

	this.node_.contentSize = winSize;
	this.node_.ontouchend = demo.bind(this, this.switchTexture);
	this.node_.touchEnabled = true;
};

SpriteNewTexture.title = "Sprite New Texture";
SpriteNewTexture.subtitle = "Tap to switch texture";
SpriteNewTexture.prototype.getNode = function() {return this.node_;};
SpriteNewTexture.prototype.addNewSprite = function() {
	var winSize = aphid.g2d.director.winSize;
	var texture = this.useTexture1_ ? this.texture1_ : this.texture2_;
	var idx = Math.floor(Math.random() * demo.walkers.spriteCount);
	var x = (idx % demo.walkers.spriteHoriCount) * demo.walkers.spriteWidth;
	var y = Math.floor(idx / demo.walkers.spriteHoriCount) * demo.walkers.spriteHeight;
	var sp = new Sprite(texture, new Rect(x, y, demo.walkers.spriteWidth, demo.walkers.spriteHeight));
	sp.position = new Point(Math.random() * winSize.width, Math.random() * winSize.height);
	var rand = Math.random();
	var action;
	if (rand < 0.2) 
		action = actions.scaleBy(3, 2);
	else if (rand < 0.4)
		action = actions.rotateBy(3, 360);
	else if (rand < 0.6)
		action = actions.blink(1, 3);
	else if (rand < 0.8)
		action = actions.sequence(
			actions.tintTo(2, Math.floor(Math.random() * 0xffffff)),
			actions.tintTo(2, sp.color)
			);
	else
		action = actions.fadeOut(2);
	sp.runAction(
		actions.repeatForever(
			actions.sequence(
				action,
				action.reverse()
			)
		)
	);
	this.node_.addChild(sp);
}
SpriteNewTexture.prototype.switchTexture = function() {
	var children = this.node_.children;
	this.useTexture1_ = !this.useTexture1_;
	var texture = this.useTexture1_ ? this.texture1_ : this.texture2_;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child instanceof Sprite)
			child.texture = texture;
	}
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteBatchNodeNewTexture
SpriteBatchNodeNewTexture = function() {
	
	this.texture1_ = new Texture2D("walk-cycle.png");
	this.texture2_ = new Texture2D("walk-cycle-mono.png");
	this.node_ = new aphid.g2d.SpriteBatchNode(this.texture1_);
	this.useTexture1_ = true;
	var winSize = aphid.g2d.director.winSize;

	for (var i = 0; i < 30; i++)
		this.addNewSprite();

	this.node_.contentSize = winSize;
	this.node_.ontouchend = demo.bind(this, this.switchTexture);
	this.node_.touchEnabled = true;
};

SpriteBatchNodeNewTexture.title = "SpriteBatchNode New Texture";
SpriteBatchNodeNewTexture.subtitle = "Tap to switch texture";
SpriteBatchNodeNewTexture.prototype.getNode = function() {return this.node_;};
SpriteBatchNodeNewTexture.prototype.addNewSprite = function() {
	var winSize = aphid.g2d.director.winSize;
	var texture = this.useTexture1_ ? this.texture1_ : this.texture2_;
	var idx = Math.floor(Math.random() * demo.walkers.spriteCount);
	var x = (idx % demo.walkers.spriteHoriCount) * demo.walkers.spriteWidth;
	var y = Math.floor(idx / demo.walkers.spriteHoriCount) * demo.walkers.spriteHeight;
	var sp = new Sprite(texture, new Rect(x, y, demo.walkers.spriteWidth, demo.walkers.spriteHeight));
	sp.position = new Point(Math.random() * winSize.width, Math.random() * winSize.height);
	var rand = Math.random();
	var action;
	if (rand < 0.2) 
		action = actions.scaleBy(3, 2);
	else if (rand < 0.4)
		action = actions.rotateBy(3, 360);
	else if (rand < 0.6)
		action = actions.blink(1, 3);
	else if (rand < 0.8)
		action = actions.sequence(
			actions.tintTo(2, Math.floor(Math.random() * 0xffffff)),
			actions.tintTo(2, sp.color)
			);
	else
		action = actions.fadeOut(2);
	sp.runAction(
		actions.repeatForever(
			actions.sequence(
				action,
				action.reverse()
			)
		)
	);
	this.node_.addChild(sp);
}
SpriteBatchNodeNewTexture.prototype.switchTexture = function() {
	this.useTexture1_ = !this.useTexture1_;
	this.node_.texture = this.useTexture1_ ? this.texture1_ : this.texture2_;
};

//----------------------------------------------------------------------------------------------------------------------
//class SpriteFrameTest
SpriteFrameTest = function() {
	this.node_ = new Node();
	this.texture1_ = new Texture2D("walk-cycle.png");
	this.texture2_ = new Texture2D("walk-cycle-mono.png");
	this.useTexture1_ = true;
	var winSize = aphid.g2d.director.winSize;

	var frames1 = [];
	var frames2 = [];
	for (var i = 0; i < demo.walkers.spriteCount; i++) {
		var x = (i % demo.walkers.spriteHoriCount) * demo.walkers.spriteWidth;
		var y = Math.floor(i / demo.walkers.spriteHoriCount) * demo.walkers.spriteHeight;
		frames1.push(new aphid.g2d.SpriteFrame(this.texture1_, new Rect(x, y, demo.walkers.spriteWidth, demo.walkers.spriteHeight)));
		frames2.push(new aphid.g2d.SpriteFrame(this.texture2_, new Rect(x, y, demo.walkers.spriteWidth, demo.walkers.spriteHeight)));
	}

	var animation1 = new aphid.g2d.Animation(frames1);
	animation1.delay = 1/60 * 3;

	var animation2 = new aphid.g2d.Animation(frames2);
	animation2.delay = 1/60 * 3;

	var sp1 = new Sprite(frames1[0].texture);
	sp1.runAction(
		actions.repeatForever(
			actions.animate(
				animation1,
				false
				)
			)
		);

	sp1.position = new Point(winSize.width / 2 - 100, winSize.height / 2);

	this.node_.addChild(sp1);

	var batch = new aphid.g2d.SpriteBatchNode(this.texture2_);
	this.node_.addChild(batch);

	var sp2 = new Sprite(frames2[0].texture);
	sp2.runAction(
		actions.repeatForever(
			actions.animate(
				animation2,
				false
				)
			)
		);

	sp2.position = new Point(winSize.width / 2 + 100, winSize.height / 2);

	batch.addChild(sp2);
};

SpriteFrameTest.title = "SpriteFrameTest";
SpriteFrameTest.subtitle = "Sprite: Left, SpriteBatchNode: Right";
SpriteFrameTest.prototype.getNode = function() {return this.node_;};
