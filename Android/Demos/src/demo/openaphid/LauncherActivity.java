package demo.openaphid;

import android.app.AlertDialog;
import android.app.ExpandableListActivity;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.ExpandableListView;
import android.widget.TextView;
import demo.openaphid.list.*;
import org.openaphid.gl.AphidActivity;

import java.util.ArrayList;
import java.util.List;

public class LauncherActivity extends ExpandableListActivity {
	private List<Section> sections = new ArrayList<Section>();
	private Row selectedRow;

	/**
	 * Called when the activity is first created.
	 */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setupData();
		MyBaseExpandableListAdapter adapter = new MyBaseExpandableListAdapter();
		setListAdapter(adapter);
		getExpandableListView().setGroupIndicator(null);
		for (int i = 0; i < adapter.getGroupCount(); i++)
			getExpandableListView().expandGroup(i);
		getExpandableListView().setOnGroupClickListener(new ExpandableListView.OnGroupClickListener() {
			@Override
			public boolean onGroupClick(ExpandableListView parent, View v, int groupPosition, long id) {
				return true;
			}
		});
	}

	private void setupData() {
		{
			Section section = new Section("About OpenAphid-Engine");
			sections.add(section);

			section.getRows().add(new URLRow("Github", "Github repositories", "https://github.com/openaphid"));
			section.getRows().add(new URLRow("Blog", "Posts about OpenAphid-Engine", "http://openaphid.github.com/blog/categories/openaphid-engine/"));
			section.getRows().add(new URLRow("API Docs", "JavaScript API References", "http://openaphid.github.com/api-doc/latest/index.html"));
		}

		{
			Section section = new Section("Benchmarks");
			sections.add(section);

			section.getRows().add(new JSRow("tank.js", "1000 animated tanks(in normal sprites) move randomly", "tank.js"));
			section.getRows().add(new JSRow("batch_tank.js", "1000 animated tanks(with SpriteBatchNode) move randomly", "batch_tank.js"));
			section.getRows().add(new AltScriptRow("coffee_tank.coffee", "tank.js written in CoffeeScript", "coffee_tank.js", "coffee_tank.coffee"));
			section.getRows().add(new AltScriptRow("type_tank.ts", "tank.js written in TypeScript", "type_tank.js", "type_tank.ts"));
		}

		{
			Section section = new Section("Examples");
			sections.add(section);

			section.getRows().add(new JSRow("node_test.js", "Node APIs", "node_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
			section.getRows().add(new JSRow("sprite_test.js", "Sprite APIs", "sprite_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
			section.getRows().add(new JSRow("effect_test.js", "Effects", "effect_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
			section.getRows().add(new JSRow("adv_effect_test.js", "Advanced effects", "adv_effect_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
			section.getRows().add(new JSRow("touch_test.js", "W3C compatible Touch & Multi-touch APIs", "touch_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
			section.getRows().add(new JSRow("binding_test.js", "Dynamically bind Java classes", "binding_test.js", ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE));
		}
	}

	@Override
	public boolean onChildClick(ExpandableListView parent, View v, int groupPosition, int childPosition, long id) {
		selectedRow = sections.get(groupPosition).getRows().get(childPosition);
		if (selectedRow instanceof JSRow) {
			new AlertDialog.Builder(this)
				.setItems(new CharSequence[]{"Launch Demo", "View Source"}, new DialogInterface.OnClickListener() {
					@Override
					public void onClick(DialogInterface dialog, int which) {
						JSRow jsRow = (JSRow) selectedRow;
						if (which == 0) {
							Intent intent = new Intent(LauncherActivity.this, AphidActivity.class);
							intent.putExtra("script", jsRow.getJsFilename());
							intent.putExtra("orientation", jsRow.getSupportedOrientation());
							startActivity(intent);
						} else if (which == 1) {
							final String baseUrlString = "https://github.com/openaphid/Demos/blob/master/iOS/OpenAphid-Demos/demo.bundle/";
							String uri;
							if (jsRow instanceof AltScriptRow)
								uri = baseUrlString + ((AltScriptRow) jsRow).getOriginalScriptFilename();
							else
								uri = baseUrlString + jsRow.getJsFilename();
							Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(uri));
							startActivity(intent);
						}
					}
				})
				.setTitle(selectedRow.getTitle())
				.create()
				.show();
		} else if (selectedRow instanceof URLRow) {
			Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(((URLRow) selectedRow).getUrlString()));
			startActivity(intent);
		}
		return true;
	}

	private class MyBaseExpandableListAdapter extends BaseExpandableListAdapter {

		private MyBaseExpandableListAdapter() {
		}

		@Override
		public int getGroupCount() {
			return sections.size();
		}

		@Override
		public int getChildrenCount(int groupPosition) {
			return sections.get(groupPosition).getRows().size();
		}

		@Override
		public Object getGroup(int groupPosition) {
			return sections.get(groupPosition);
		}

		@Override
		public Object getChild(int groupPosition, int childPosition) {
			return sections.get(groupPosition).getRows().get(childPosition);
		}

		@Override
		public long getGroupId(int groupPosition) {
			return groupPosition;
		}

		@Override
		public long getChildId(int groupPosition, int childPosition) {
			return childPosition;
		}

		@Override
		public boolean hasStableIds() {
			return true;
		}

		@Override
		public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
			TextView view = (TextView) convertView;
			if (convertView == null)
				view = (TextView) getLayoutInflater().inflate(R.layout.list_section_header, null);
			Section section = sections.get(groupPosition);
			view.setText(section.getTitle());
			return view;
		}

		@Override
		public View getChildView(int groupPosition, int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
			if (convertView == null)
				convertView = getLayoutInflater().inflate(R.layout.list_section_content, null);
			Row row = sections.get(groupPosition).getRows().get(childPosition);
			TextView titleView = (TextView) convertView.findViewById(R.id.title);
			titleView.setText(row.getTitle());
			TextView subtitleView = (TextView) convertView.findViewById(R.id.subtitle);
			subtitleView.setText(row.getSubtitle());
			return convertView;
		}

		@Override
		public boolean isChildSelectable(int groupPosition, int childPosition) {
			return true;
		}
	}
}