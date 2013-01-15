package demo.openaphid.list;

import android.content.pm.ActivityInfo;

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
public class JSRow extends Row {
	private String jsFilename;
	private int supportedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;

	public JSRow(String title, String subtitle, String jsFilename) {
		super(title, subtitle);
		this.jsFilename = jsFilename;
	}

	public JSRow(String title, String subtitle, String jsFilename, int supportedOrientation) {
		super(title, subtitle);
		this.jsFilename = jsFilename;
		this.supportedOrientation = supportedOrientation;
	}

	public String getJsFilename() {
		return jsFilename;
	}

	public int getSupportedOrientation() {
		return supportedOrientation;
	}
}
