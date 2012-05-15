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

#import "ObjCBindings.h"


@implementation BindingTest1

- (void)test
{
	NSLog(@"test");
}

- (void)testInt:(int)i
{
	NSLog(@"testInt: %d", i);
}

- (void)testString:(NSString *)str
{
	NSLog(@"testString: %@", str);
}

- (void)testArray:(NSArray*)arr
{
	assert(!arr || [arr isKindOfClass:[NSArray class]]);
	NSLog(@"testArray: %@", arr);
}

- (void)testDictionary:(NSDictionary*)dict
{
	assert(!dict || [dict isKindOfClass:[NSDictionary class]]);
	NSLog(@"testDictionary: %@", dict);
}

- (void)bindSelectors:(OABindingMap *)bindingMap
{
	[bindingMap bindSelector:@selector(test) forName:@"test"];
	[bindingMap bindSelector:@selector(testInt:) forName:@"testInt"];
	[bindingMap bindSelector:@selector(testString:) forName:@"testString"];
	[bindingMap bindSelector:@selector(testArray:) forName:@"testArray"];
	[bindingMap bindSelector:@selector(testDictionary:) forName:@"testDictionary"];
}

@end


@implementation BindingTest2

- (int)testInt:(int)i
{
	return i;
}

- (float)testFloat:(float)f
{
	return f;
}

- (double)testDouble:(double)d
{
	return d;
}

- (NSString*)testString:(NSString *)str
{
	return str;
}

- (NSArray*)testArray:(NSArray*)arr
{
	assert(!arr || [arr isKindOfClass:[NSArray class]]);
	return arr;
}

- (NSDictionary*)testDictionary:(NSDictionary*)dict
{
	assert(!dict || [dict isKindOfClass:[NSDictionary class]]);
	return dict;
}

- (void)bindSelectors:(OABindingMap *)bindingMap
{
	[bindingMap bindSelector:@selector(testInt:) forName:@"testInt"];
	[bindingMap bindSelector:@selector(testFloat:) forName:@"testFloat"];
	[bindingMap bindSelector:@selector(testDouble:) forName:@"testDouble"];
	[bindingMap bindSelector:@selector(testString:) forName:@"testString"];
	[bindingMap bindSelector:@selector(testArray:) forName:@"testArray"];
	[bindingMap bindSelector:@selector(testDictionary:) forName:@"testDictionary"];
}

@end


@implementation BindingTest3

- (int)add:(int)i1 other:(int)i2
{
	return i1 + i2;
}

- (void)bindSelectors:(OABindingMap *)bindingMap
{
	[bindingMap bindSelector:@selector(add:other:) forName:@"add"];
}

@end
