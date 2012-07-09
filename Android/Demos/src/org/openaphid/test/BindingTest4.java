package org.openaphid.test;

import org.openaphid.bind.AphidJSFunction;
import org.openaphid.internal.utils.UI;

public class BindingTest4 {	
	@AphidJSFunction(isInUIThread=true)
	public int addInMainThread(int i1, int i2) {
		UI.assertInMainThread();
		return i1 + i2;
	}
}
