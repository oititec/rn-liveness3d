import FaceCaptcha

@objc(RnLiveness3d)
class RnLiveness3d: NSObject, Liveness3DDelegate {
    
    var resolve:RCTPromiseResolveBlock!
    var reject:RCTPromiseRejectBlock!
    
    func handleLiveness3DValidation(validateModel: Liveness3DSuccess) {
        resolve("RESULT_OK")
    }
    
    func handleLiveness3DError(error: Liveness3DError) {
        resolve(error.code)
    }
    
    @objc(startliveness3d:withResolver:withRejecter:)
    func startliveness3D(appKey: String, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        let APP_KEY = appKey
        
        let liveness3DUser = Liveness3DUser(
            appKey: APP_KEY,
            environment: .HML
        )
        
        DispatchQueue.main.async {
            let liveness3DViewController = HybridLiveness3DViewController(
                liveness3DUser: liveness3DUser,
                delegate: self
            )
            liveness3DViewController.modalPresentationStyle = .fullScreen
            RCTPresentedViewController()?.present(liveness3DViewController, animated: true)
        }
    }
}
