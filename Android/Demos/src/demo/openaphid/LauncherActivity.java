package demo.openaphid;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openaphid.gl.AphidActivity;

import android.app.ListActivity;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.ListView;
import android.widget.SimpleAdapter;

public class LauncherActivity extends ListActivity {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setListAdapter(new SimpleAdapter(this, getData(),
				android.R.layout.simple_list_item_1, new String[] { "title" },
				new int[] { android.R.id.text1 }));
	}

	@Override
	protected void onListItemClick(ListView l, View v, int position, long id) {
		Map<String, Object> map = (Map<String, Object>) l
				.getItemAtPosition(position);
		Intent intent = new Intent(this, AphidActivity.class);
		intent.putExtra("script", (String) map.get("script"));
		intent.putExtra("orientation", (Integer) map.get("orientation"));
		startActivity(intent);
	}

	private List getData() {
		List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();

		addItem(data, "Node Test", "node_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		addItem(data, "Sprite Test", "sprite_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		addItem(data, "Effect Test", "effect_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		addItem(data, "Advanced Effect Test", "adv_effect_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		addItem(data, "Touch Test", "touch_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
		addItem(data, "Java to JavaScript Binding Test", "binding_test.js",
				ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);

		return data;
	}

	private void addItem(List<Map<String, Object>> data, String title,
			String scriptFilename, int orientation) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("title", title);
		map.put("script", scriptFilename);
		map.put("orientation", orientation);
		data.add(map);
	}
}