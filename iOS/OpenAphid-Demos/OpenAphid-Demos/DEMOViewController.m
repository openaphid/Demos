//
//  DEMOViewController.m
//  OpenAphid-Demos
//
//  Created by Mac OS on 1/9/13.
//  Copyright (c) 2013 AphidMobile. All rights reserved.
//

#import "DEMOViewController.h"
#import "OAGLViewController.h"
#import "DEMOObjCBindings.h"

#pragma mark class Section

@interface Section : NSObject
@property(nonatomic, strong) NSString* title;
@property(nonatomic, strong) NSMutableArray* rows;
-(id)initWithTitle:(NSString*)title;
@end

@implementation Section

@synthesize title = _title, rows = _rows;

-(id)initWithTitle:(NSString *)title
{
	self = [super init];
	if (self) {
		self.title = title;
		self.rows = [[NSMutableArray alloc] init];
	}
	return self;
}

@end

#pragma mark class Row
@interface Row : NSObject
@property(nonatomic, strong) NSString* title;
@property(nonatomic, strong) NSString* subtitle;
-(id) initWithTitle:(NSString*)title subtitle:(NSString*)subtitle;
@end

@implementation Row
@synthesize title = _title, subtitle = _subtitle;
-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle
{
	self = [super init];
	if (self) {
		self.title = title;
		self.subtitle = subtitle;
	}
	return self;
}
@end

@interface JSRow : Row
@property(nonatomic, strong) NSString* jsFilename;
@property int supportedOrientations;
@property OAGLViewPixelFormat glPixelFormat;
-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle jsFilename:(NSString*)jsFilename supportedOrientations:(int)supportedOrientations;
-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle jsFilename:(NSString*)jsFilename supportedOrientations:(int)supportedOrientations glPixelFormat:(OAGLViewPixelFormat)glPixelFormat;
@end

@implementation JSRow
@synthesize jsFilename = _jsFilename, supportedOrientations = _supportedOrientations;

-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle jsFilename:(NSString *)jsFilename supportedOrientations:(int)supportedOrientations{
	return [self initWithTitle:title subtitle:subtitle jsFilename:jsFilename supportedOrientations:supportedOrientations glPixelFormat:OAGLViewPixelFormatRGB565];
}

- (id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle jsFilename:(NSString *)jsFilename supportedOrientations:(int)supportedOrientations glPixelFormat:(OAGLViewPixelFormat)glPixelFormat
{
	self = [super initWithTitle:title subtitle:subtitle];
	if (self) {
		self.jsFilename = jsFilename;
		self.supportedOrientations = supportedOrientations;
		self.glPixelFormat = glPixelFormat;
	}
	
	return self;
}

@end

@interface URLRow : Row
@property(nonatomic, strong) NSString* urlString;
-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle urlString:(NSString*)urlString;
@end

@implementation URLRow

@synthesize urlString = _urlString;

-(id)initWithTitle:(NSString *)title subtitle:(NSString *)subtitle urlString:(NSString *)urlString
{
	self = [super initWithTitle:title subtitle:subtitle];
	if (self) {
		self.urlString = urlString;
	}
	
	return self;
}

@end

#pragma mark class DEMOViewController
@interface DEMOViewController () {
	NSMutableArray* _tableSections;
}
@property(nonatomic, strong) Row* selectedRow;
@end

@implementation DEMOViewController

@synthesize selectedRow = _selectedRow;

- (void)viewDidLoad
{
	[super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
	
	if (!_tableSections) {
		_tableSections = [[NSMutableArray alloc] init];
		
		
		{
			Section* section = [[Section alloc] initWithTitle:@"About OpenAphid Engine"];
			[_tableSections addObject:section];
			
			[section.rows addObject:[[URLRow alloc] initWithTitle:@"Github"
																									 subtitle:@"Github repositories"
																									urlString:@"http://github.com/openaphid"
															 ]];
			
			[section.rows addObject:[[URLRow alloc] initWithTitle:@"Blog"
																									 subtitle:@"Posts about OpenAphid Engine"
																									urlString:@"http://openaphid.github.com/blog/categories/openaphid-engine/"
															 ]];
			
			[section.rows addObject:[[URLRow alloc] initWithTitle:@"API Docs"
																									 subtitle:@"JavaScript API references"
																									urlString:@"http://openaphid.github.com/api-doc/latest/index.html"
															 ]];
		}
		
		{
			Section* section = [[Section alloc] initWithTitle:@"Benchmarks"];
			[_tableSections addObject:section];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"tank.js"
																									subtitle:@"1000 animated tanks(in normal sprites) move randomly"
																								jsFilename:@"tank.js"
																		 supportedOrientations:OAOrientationMaskPortrait
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"batch_tank.js"
																									subtitle:@"1000 animated tanks(with SpriteBatchNode) move randomly"
																								jsFilename:@"batch_tank.js"
																		 supportedOrientations:OAOrientationMaskPortrait
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"coffee_tank.js"
																									subtitle:@"Same app written in CoffeeScript"
																								jsFilename:@"coffee_tank.js"
																		 supportedOrientations:OAOrientationMaskPortrait
															 ]];
		}
		
		{
			Section* section = [[Section alloc] initWithTitle:@"Demos"];
			[_tableSections addObject:section];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"node_test.js"
																									subtitle:@"Node APIs"
																								jsFilename:@"node_test.js"
																		 supportedOrientations:OAOrientationLandscape
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"adv_effect_test.js"
																									subtitle:@"Advanced effects"
																								jsFilename:@"adv_effect_test.js"
																		 supportedOrientations:OAOrientationLandscape
																						 glPixelFormat:OAGLViewPixelFormatRGBA8
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"binding_test.js"
																									subtitle:@"Dynamically bind Objective-C classes"
																								jsFilename:@"binding_test.js"
																		 supportedOrientations:OAOrientationLandscape
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"effect_test.js"
																									subtitle:@"Effects"
																								jsFilename:@"effect_test.js"
																		 supportedOrientations:OAOrientationLandscape
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"sprite_test.js"
																									subtitle:@"Sprite APIs"
																								jsFilename:@"sprite_test.js"
																		 supportedOrientations:OAOrientationLandscape
															 ]];
			
			[section.rows addObject:[[JSRow alloc] initWithTitle:@"touch_test.js"
																									subtitle:@"W3C Touch & Multi-touch APIs"
																								jsFilename:@"touch_test.js"
																		 supportedOrientations:OAOrientationLandscape
															 ]];
		}
		
		[self.tableView reloadData];
	}
}

- (void)didReceiveMemoryWarning
{
	[super didReceiveMemoryWarning];
	// Dispose of any resources that can be recreated.
}

- (UIInterfaceOrientation)preferredInterfaceOrientationForPresentation
{
	return UIInterfaceOrientationPortrait;
}

-(Row*) rowForIndexPath:(NSIndexPath *)indexPath
{
	return [[[_tableSections objectAtIndex:indexPath.section] rows] objectAtIndex:indexPath.row];
}

#pragma mark UITableViewDataSource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
	return [_tableSections count];
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
	return [[[_tableSections objectAtIndex:section] rows] count];
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
	return [[_tableSections objectAtIndex:section] title];
}

#define kCellTag @"default"
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
	UITableViewCell* cell = [tableView dequeueReusableCellWithIdentifier:kCellTag];
	if (!cell) {
		cell = [[UITableViewCell alloc] initWithStyle:UITableViewCellStyleSubtitle reuseIdentifier:kCellTag];
	}
	Row* row = [self rowForIndexPath:indexPath];
	cell.textLabel.text = row.title;
	cell.detailTextLabel.text = row.subtitle;
	return cell;
}

#pragma mark UITableViewDelegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
	[tableView deselectRowAtIndexPath:indexPath animated:YES];
	
	Row* row = [self rowForIndexPath:indexPath];
	self.selectedRow = row;
	if ([row isKindOfClass:[JSRow class]]) {
		UIActionSheet* actionSheet = [[UIActionSheet alloc] initWithTitle:row.title
																														 delegate:self
																										cancelButtonTitle:@"Cancel"
																							 destructiveButtonTitle:nil
																										otherButtonTitles:@"Start Demo", @"View Source", nil
																	];
		[actionSheet showInView:self.view];
	} else if ([row isKindOfClass:[URLRow class]]) {
		[[UIApplication sharedApplication] openURL:[NSURL URLWithString:((URLRow*)row).urlString]];
	}
}

#pragma mark UIActionSheetDelegate
-(void)actionSheet:(UIActionSheet *)actionSheet clickedButtonAtIndex:(NSInteger)buttonIndex
{
	JSRow* jsRow = (JSRow*)self.selectedRow;
	if (buttonIndex == 0) { //Start Demo
		OAGLViewController* controller = [[OAGLViewController alloc] init];
		[controller configBundleName:@"demo.bundle"
												 baseURL:[NSURL URLWithString:@"http://129.158.217.36:18080"]
										 developMode:YES
		 ];
		controller.supportedOrientations = jsRow.supportedOrientations;
		[controller configGLViewPixelFormat:jsRow.glPixelFormat];
		controller.modalTransitionStyle = UIModalTransitionStyleCrossDissolve;
		controller.wantsFullScreenLayout = YES;
		
		//for binding_test.js
		[controller setScriptBinding:[[BindingTest1 alloc] init] name:@"test1" iOSOnly:NO];
		[controller setScriptBinding:[[BindingTest2 alloc] init] name:@"test2" iOSOnly:NO];
		[controller setScriptBinding:[[BindingTest3 alloc] init] name:@"test3" iOSOnly:YES];
		
		[[UIApplication sharedApplication] setStatusBarHidden:YES]; //present in fullscreen
		[self presentViewController:controller
											 animated:YES
										 completion:^{
											 [controller evaluateScript:jsRow.jsFilename];
										 }];
	} else if (buttonIndex == 1) { //View Code
		NSString* urlString = [NSString stringWithFormat:@"https://github.com/openaphid/Demos/blob/master/iOS/OpenAphid-Demos/OpenAphid-Demos/demo.bundle/%@", jsRow.jsFilename];
		[[UIApplication sharedApplication] openURL:[NSURL URLWithString:urlString]];
	}
}

@end
