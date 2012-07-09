aphid.js.includeFile("demo_common.js");

/*
 Original Author: http://www.svendtofte.com/code/usefull_prototypes/
 */

Array.prototype.compareArrays = function(arr) {
	if (this.length != arr.length) return false;
	for (var i = 0; i < arr.length; i++) {
		if (this[i] && this[i].compareArrays) { //likely nested array
			if (!this[i].compareArrays(arr[i])) return false;
			else continue;
		}
		if (this[i] != arr[i]) return false;
	}
	return true;
}

aphid.js.onload = setupTests;

//----------------------------------------------------------------------------------------------------------------------
// Global functions
function setupTests() {
	var director = aphid.g2d.director;
	var winSize = director.winSize;

	demo.initialize();

	demo.allTests = [
		BindingTest1,
		BindingTest2,
		BindingTest3,
		BindingTest4
	];

	director.displayFPS = true;

	demo.reloadTest(demo.testIndex);
}

//----------------------------------------------------------------------------------------------------------------------
//class BindingTest1
BindingTest1 = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	
	var text = "Binding object:" + aphid.ext.test1 + "\n";
	var label = new aphid.g2d.LabelTTF(text);
	label.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(label);

	console.assert(aphid.ext.test1.test() == undefined, "test() should return undefined");
	console.assert(aphid.ext.test1.testInt(1) == undefined, "testInt(1) should return undefined");
	console.assert(aphid.ext.test1.testString("aaa") == undefined, 'testString("aaa") should return undefined');
	console.assert(aphid.ext.test1.testArray([undefined, null, 1, 0.5, "abc", [1, 2, 3], {"key" : 1}]) == undefined, "testArray should return undefined");
	console.assert(aphid.ext.test1.testDictionary({"int":1, "float" : 0.5, "string" : "abc", "array" : [1, 2, 3], "dict" : {"first" : 1}}) == undefined, "testDictionary should return undefined");
};

BindingTest1.prototype.getNode = function() {return this.node_;};
BindingTest1.title = "Binding Test 1";
BindingTest1.subtitle = "";

//----------------------------------------------------------------------------------------------------------------------
//class BindingTest2
BindingTest2 = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	
	var text = "Binding object:" + aphid.ext.test2 + "\n";
	var label = new aphid.g2d.LabelTTF(text);
	label.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(label);

	console.assert(aphid.ext.test2.testInt(1) == 1, "testInt(1) should return 1");
	console.assert(aphid.ext.test2.testString("aaa") == "aaa", 'testString("aaa") should return "aaa"');
	var arr = [null, 1, 0.5, "abc", [1, 2, 3]];
	console.log("testArray returns: " + typeof(aphid.ext.test2.testArray(arr)));
	console.assert(aphid.ext.test2.testArray(arr).compareArrays(arr), "testArray should return an equal array");
	console.assert(aphid.ext.test2.testDictionary({"int":1, "float" : 0.5, "string" : "abc", "array" : [1, 2, 3], "dict" : {"first" : 1}})["dict"]["first"] == 1, 'testDictionary(..)["dict"]["first"] should return 1');
};

BindingTest2.prototype.getNode = function() {return this.node_;};
BindingTest2.title = "Binding Test 2";
BindingTest2.subtitle = "Test return values";

//----------------------------------------------------------------------------------------------------------------------
//class BindingTest3
BindingTest3 = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	
	var test3 = aphid.extandroid.test3;
	
	var text = "Binding object:" + test3 + "\n";
	var label = new aphid.g2d.LabelTTF(text);
	label.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(label);

	console.assert(test3.add(1, 2) == 3, 'add(1, 2) should be 3');
	try {
		test3.add(1);
		console.error("Should not reach here");
	} catch(err) {
		console.log("Exception for test3.add(): " + err);
	}
};

BindingTest3.prototype.getNode = function() {return this.node_;};
BindingTest3.title = "Binding Test 3";
BindingTest3.subtitle = "Test multiple arguments";
//----------------------------------------------------------------------------------------------------------------------
//class BindingTest4
BindingTest4 = function() {
	this.node_ = new Node();
	var winSize = aphid.g2d.director.winSize;
	
	var test4 = aphid.ext.test4;
	
	var text = "Binding object:" + test4 + "\n";
	var label = new aphid.g2d.LabelTTF(text);
	label.position = new Point(winSize.width / 2, winSize.height / 2);
	this.node_.addChild(label);
	
	console.assert(test4.addInMainThread(1, 2) == 3, 'add(1, 2) should be 3, got ' + test4.addInMainThread(1, 2));
	try {
		test4.addInMainThread(1);
		console.error("Should not reach here");
	} catch(err) {
		console.log("Exception for test4.add(): " + err);
	}
};

BindingTest4.prototype.getNode = function() {return this.node_;};
BindingTest4.title = "Binding Test 4";
BindingTest4.subtitle = "Test Invocation in UI Thread";