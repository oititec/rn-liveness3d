#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RnLiveness3d, NSObject)

RCT_EXTERN_METHOD(startliveness3d:(NSDictionary)args
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(logevent:(NSDictionary)args
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


RCT_EXTERN_METHOD(checkiospermission:(NSDictionary)args
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


RCT_EXTERN_METHOD(checkpermissiongranted:(NSDictionary)args
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)


+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
