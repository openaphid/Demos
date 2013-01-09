//
//  DEMOViewController.h
//  OpenAphid-Demos
//
//  Created by Mac OS on 1/9/13.
//  Copyright (c) 2013 AphidMobile. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface DEMOViewController : UIViewController <UITableViewDataSource, UITableViewDelegate, UIActionSheetDelegate>

@property (weak, nonatomic) IBOutlet UITableView *tableView;
@end
