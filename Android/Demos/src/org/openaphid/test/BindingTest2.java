package org.openaphid.test;

import java.util.List;
import java.util.Map;

import org.openaphid.bind.AphidJSFunction;

public class BindingTest2 {
	
	@AphidJSFunction
	public int testInt(int i) {
		return i;
	}
	
	@AphidJSFunction
	public float testFloat(float f) {
		return f;
	}
	
	@AphidJSFunction
	public double testDouble(double d) {
		return d;
	} 
	
	@AphidJSFunction
	public String testString(String s) {
		return s;
	}
	
	@AphidJSFunction
	public List testArray(List l) {
		return l;
	}
	
	@AphidJSFunction
	public Map testDictionary(Map m) {
		return m;
	}
}
