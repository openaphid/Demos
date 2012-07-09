package org.openaphid.test;

import java.util.List;
import java.util.Map;

import org.openaphid.bind.AphidJSFunction;
import org.openaphid.internal.utils.AphidLog;

public class BindingTest1 {
	
	@AphidJSFunction
	public void test() {
		AphidLog.d("test");
	}
	
	@AphidJSFunction
	public void testInt(int i) {
		AphidLog.d("testInt: %d", i);
	}
	
	@AphidJSFunction
	public void testString(String str) {
		AphidLog.d("testString: %s", str);
	}
	
	@AphidJSFunction
	public void testArray(List list) {
		AphidLog.d("testArray: %s", list);
	}
	
	@AphidJSFunction
	public void testDictionary(Map map) {
		AphidLog.d("testDictionary: " + map);
	}
}
