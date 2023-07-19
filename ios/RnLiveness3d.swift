import OILiveness3D
import OIComponents
import OICommons
import AVFoundation

@objc(RnLiveness3d)
class RnLiveness3d: NSObject, Liveness3DDelegate {
    
    var resolve:RCTPromiseResolveBlock!
    var reject:RCTPromiseRejectBlock!
    
    func handleLiveness3DValidation(validateModel: Liveness3DSuccess) {
        resolve("RESULT_OK")
    }
    
    func handleLiveness3DError(error: Liveness3DError) {
        resolve(error.message)
    }
    
    @objc(logevent:withResolver:withRejecter:)
    func logevent(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        let event = args?["event"] as? String ?? ""
        print(event)
    }
    
    @objc(checkiospermission:withResolver:withRejecter:)
    func checkiospermission(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { response in
            if response {
                resolve("true")
                
            } else {
                resolve("false")
            }
        }
    }
    
    @objc(checkpermissiongranted:withResolver:withRejecter:)
    func checkpermissiongranted(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        if AVCaptureDevice.authorizationStatus(for: AVMediaType.video) ==  AVAuthorizationStatus.authorized {
            resolve("true")
        } else {
            resolve("false")
        }
    }
    
    @objc(startliveness3d:withResolver:withRejecter:)
    func startliveness3D(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        
        let appKey = args?["appkey"] as? String ?? ""
        let env = args?["environment"] as? String ?? "HML"
        let apparence = args?["apparence"] as? Dictionary<String,Any> ?? nil
        
        let loading = args?["loading"] as? Dictionary<String,Any> ?? nil
        
        let typeLoading = loading?["type"] as? String ?? "default"
        let sizeLoading = loading?["size"] as? Int ?? 180
        let backgroundColor = loading?["backgroundColor"] as? String ?? "#FFFFFF"
        let loadingColor = loading?["loadingColor"] as? String ?? "#000000"
        
        //Map Texts
        let liveness3Dtext = args?["liveness3Dtext"] as? Dictionary<String,Any> ?? nil
        
        // Ready Screen
        let READY_HEADER_1 = liveness3Dtext?["READY_HEADER_1"] as? String ?? ""
        let READY_HEADER_2 = liveness3Dtext?["READY_HEADER_2"] as? String ?? ""
        let READY_MESSAGE_1 = liveness3Dtext?["READY_MESSAGE_1"] as? String ?? ""
        let READY_MESSAGE_2 = liveness3Dtext?["READY_MESSAGE_2"] as? String ?? ""
        let READY_BUTTON = liveness3Dtext?["READY_BUTTON"] as? String ?? ""
        
        // Feedback Screen
        let FEEDBACK_CENTER_FACE = liveness3Dtext?["FEEDBACK_CENTER_FACE"] as? String ?? ""
        let FEEDBACK_FACE_NOT_FOUND = liveness3Dtext?["FEEDBACK_FACE_NOT_FOUND"] as? String ?? ""
        let FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD = liveness3Dtext?["FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD"] as? String ?? ""
        let FEEDBACK_FACE_NOT_UPRIGHT = liveness3Dtext?["FEEDBACK_FACE_NOT_UPRIGHT"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY = liveness3Dtext?["FEEDBACK_HOLD_STEADY"] as? String ?? ""
        let FEEDBACK_MOVE_PHONE_AWAY = liveness3Dtext?["FEEDBACK_MOVE_PHONE_AWAY"] as? String ?? ""
        let FEEDBACK_MOVE_PHONE_CLOSER = liveness3Dtext?["FEEDBACK_MOVE_PHONE_CLOSER"] as? String ?? ""
        let FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL = liveness3Dtext?["FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL"] as? String ?? ""
        let FEEDBACK_USE_EVEN_LIGHTING = liveness3Dtext?["FEEDBACK_USE_EVEN_LIGHTING"] as? String ?? ""
        let FEEDBACK_FRAME_YOUR_FACE = liveness3Dtext?["FEEDBACK_FRAME_YOUR_FACE"] as? String ?? ""
        let FEEDBACK_POSITION_FACE_STRAIGHT_IN_OVAL = liveness3Dtext?["FEEDBACK_POSITION_FACE_STRAIGHT_IN_OVAL"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_1 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_1"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_2 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_2"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_3 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_3"] as? String ?? ""
        let FEEDBACK_REMOVE_DARK_GLASSES = liveness3Dtext?["FEEDBACK_REMOVE_DARK_GLASSES"] as? String ?? ""
        let FEEDBACK_NEUTRAL_EXPRESSION = liveness3Dtext?["FEEDBACK_NEUTRAL_EXPRESSION"] as? String ?? ""
        let FEEDBACK_CONDITIONS_TOO_BRIGHT = liveness3Dtext?["FEEDBACK_CONDITIONS_TOO_BRIGHT"] as? String ?? ""
        let FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT = liveness3Dtext?["FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT"] as? String ?? ""
        
        // Result Screen
        let RESULT_UPLOAD_MESSAGE = liveness3Dtext?["RESULT_UPLOAD_MESSAGE"] as? String ?? ""
        let RESULT_SUCCESS_MESSAGE = liveness3Dtext?["RESULT_SUCCESS_MESSAGE"] as? String ?? ""
        
        // Retry Screen
        let RETRY_HEADER = liveness3Dtext?["RETRY_HEADER"] as? String ?? "Vamos tentar novamente?"
        let RETRY_SUBHEADER = liveness3Dtext?["RETRY_SUBHEADER"] as? String ?? "Siga o exemplo de foto ideal abaixo:"
        let RETRY_YOUR_PICTURE = liveness3Dtext?["RETRY_YOUR_PICTURE"] as? String ?? "Sua foto"
        let RETRY_IDEAL_PICTURE = liveness3Dtext?["RETRY_IDEAL_PICTURE"] as? String ?? "Não sorria"
        let RETRY_MESSAGE_SMILE = liveness3Dtext?["RETRY_MESSAGE_SMILE"] as? String ?? "Expressão Neutra, Sem Sorrir"
        let RETRY_MESSAGE_LIGHTING = liveness3Dtext?["RETRY_MESSAGE_LIGHTING"] as? String ?? "Evite reflexos e iluminação extrema."
        let RETRY_MESSAGE_CONTRAST = liveness3Dtext?["RETRY_MESSAGE_CONTRAST"] as? String ?? "Limpe Sua Câmera"
        let RETRY_BUTTON = liveness3Dtext?["READY_BUTTON"] as? String ?? "Tentar novamente"
        
        //Liveness3D Texts
        let liveness3DTexts: [Liveness3DTextKey: String] = [
            // Ready Screen
            .readyHeader1: READY_HEADER_1,
            .readyHeader2: READY_HEADER_2,
            .readyMessage1: READY_MESSAGE_1,
            .readyMessage2: READY_MESSAGE_2,
            .readyButton: READY_BUTTON,
            
            // Feedback Screen
            .feedbackCenterFace: FEEDBACK_CENTER_FACE,
            .feedbackFaceNotFound: FEEDBACK_FACE_NOT_FOUND,
            .feedbackFaceNotLookingStraightAhead: FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD,
            .feedbackFaceNotUpright: FEEDBACK_FACE_NOT_UPRIGHT,
            .feedbackHoldSteady: FEEDBACK_HOLD_STEADY,
            .feedbackMovePhoneAway: FEEDBACK_MOVE_PHONE_AWAY,
            .feedbackMovePhoneCloser: FEEDBACK_MOVE_PHONE_CLOSER,
            .feedbackMovePhoneToEyeLevel: FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL,
            .feedbackUseEvenLighting: FEEDBACK_USE_EVEN_LIGHTING,
            .feedbackFrameYourFace: FEEDBACK_FRAME_YOUR_FACE,
            .feedbackPositionFaceStraightInOval: FEEDBACK_POSITION_FACE_STRAIGHT_IN_OVAL,
            .feedbackHoldSteady1: FEEDBACK_HOLD_STEADY_1,
            .feedbackHoldSteady2: FEEDBACK_HOLD_STEADY_2,
            .feedbackHoldSteady3: FEEDBACK_HOLD_STEADY_3,
            .feedbackRemoveDarkGlasses: FEEDBACK_REMOVE_DARK_GLASSES,
            .feedbackNeutralExpression: FEEDBACK_NEUTRAL_EXPRESSION,
            .feedbackConditionsTooBright: FEEDBACK_CONDITIONS_TOO_BRIGHT,
            .feedbackBrightenYourEnvironment: FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT,
            
            // Result Screen
            .resultUploadMessage: RESULT_UPLOAD_MESSAGE,
            .resultSuccessMessage: RESULT_SUCCESS_MESSAGE,
            
            // Retry Screen
            .retryHeader: RETRY_HEADER,
            .retrySubheader: RETRY_SUBHEADER,
            .retryYourPicture: RETRY_YOUR_PICTURE,
            .retryIdealPicture: RETRY_IDEAL_PICTURE,
            .retryMessageSmile: RETRY_MESSAGE_SMILE,
            .retryMessageLightning: RETRY_MESSAGE_LIGHTING,
            .retryMessageContrast: RETRY_MESSAGE_CONTRAST,
            .retryButton: RETRY_BUTTON
        ]
        
        let liveness3DUser = Liveness3DUser(
            appKey: appKey,
            environment: env == "PRD" ? Environment.PRD : Environment.HML,
            texts: liveness3DTexts
        )
        
        
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { response in
            if response {
                
                let spinnerLoading = SpinnerConfiguration(
                    backgroundColor: .init(hex: backgroundColor),
                    loadingColor: .init(hex: loadingColor),
                    strokeWidth: 10,
                    scaleFactor: sizeLoading
                )
                
                let defaultLoading = ActivityIndicatorConfiguration(
                    loadingColor: .init(hex: loadingColor),
                    backgroundColor: .init(hex: backgroundColor),
                    scaleFactor: sizeLoading
                )
                
                DispatchQueue.main.async {
                    
                    let liveness3DViewController = HybridLiveness3DViewController(
                        liveness3DUser: liveness3DUser,
                        delegate: self,
                        customAppearance:  typeLoading == "spinner" ? .init(configuration: spinnerLoading) : .init(configuration: defaultLoading)
                    )
                    
                    liveness3DViewController.modalPresentationStyle = .fullScreen
                    RCTPresentedViewController()?.present(liveness3DViewController, animated: true)
                }
                
                
            } else {
                resolve("RESULT_CANCELED")
            }
        }
        
        
    }
}

public extension UIColor {
    
    convenience init(hex: String) {
        var cString: String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()
        
        if cString.hasPrefix("#") {
            cString.remove(at: cString.startIndex)
        }
        
        if cString.count != 6 {
            self.init(red: 0.0, green: 0.0, blue: 0.0, alpha: 1.0)
        }
        
        var rgbValue: UInt64 = 0
        Scanner(string: cString).scanHexInt64(&rgbValue)
        
        self.init(
            red: CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0,
            green: CGFloat((rgbValue & 0x00FF00) >> 8) / 255.0,
            blue: CGFloat(rgbValue & 0x0000FF) / 255.0,
            alpha: 1.0
        )
    }
}
