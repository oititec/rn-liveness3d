#import "RnLiveness3d.h"
#import "oiti_rn_liveness3d-Swift.h"
#import <React/RCTUtils.h>

@implementation RnLiveness3d {
   RnLiveness3dSwiftModule *_module;
 }

+ (NSString *)moduleName
{
  return @"RnLiveness3d";
}

- (instancetype)init
{
  self = [super init];
  if (self) {
    _module = [RnLiveness3dSwiftModule new];
  }
  return self;
}

/**
 * TurboModules Bridge
 */

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
  (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeRnLiveness3dSpecJSI>(params);
}

/**
 * Codegen interface implementation
 */

- (void)startLiveness3d:(NSDictionary *)args
                resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject
{
  if (_module) {
    [_module startLiveness3d:args
                     resolve:resolve
                      reject:reject
                   presenter:^(UIViewController * _Nonnull viewController, BOOL animated) {
      UIViewController *presentedViewController = RCTPresentedViewController();
      [presentedViewController presentViewController:viewController animated:animated completion:nil];
    }];
  } else {
    reject(@"E_MODULE_NOT_INITIALIZED", @"RnLiveness3dModule not initialized", nil);
  }
}

- (NSNumber *)checkCameraPermissionGranted
{
  if (_module) {
    BOOL result = [_module checkCameraPermissionGranted];
    return result ? @YES : @NO;
  }
  return @NO;
}

- (void)requestCameraPermission:(RCTResponseSenderBlock)resolve
{
  if (_module) {
    [_module requestCameraPermission:resolve];
  } else {
    resolve(@[@NO]);
  }
}

@end
