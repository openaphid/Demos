package org.openaphid.test;

import org.openaphid.bind.AphidJSFunction;

public class BindingTest3 {
	@AphidJSFunction
	public int add(int i1, int i2) {
		return i1 + i2;
	}
}
