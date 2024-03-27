import OILiveness3D
import OIComponents
import OICommons
import AVFoundation
import OISecurity
import UIKit

@objc(RnLiveness3d)
class RnLiveness3d: NSObject, Liveness3DDelegate {
    
    var securityManager: SecurityManager?
    var resolve:RCTPromiseResolveBlock!
    var reject:RCTPromiseRejectBlock!
    
    func handleLiveness3DValidation(validateModel: Liveness3DSuccess) {
        let response: Dictionary<String, Any> = [
            "cause": validateModel.cause ?? "",
            "codId": String(validateModel.codID ?? 0.0),
            "protocol": validateModel.protocolo ?? "",
            "blob": validateModel.scanResultBlob ?? "",
            "valid": validateModel.valid ?? false
        ]
        
        resolve(response)
    }
    
    func handleLiveness3DError(error: OILiveness3D.Liveness3DError) {
        reject("\(error.code)", "\(error.message)", error.type as Error)
    }
    
    @objc(checkiospermission:withResolver:withRejecter:)
    func checkiospermission(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        AVCaptureDevice.requestAccess(for: .video) { granted in
            DispatchQueue.main.async {
                if granted {
                    resolve(true)
                } else {
                    if let settingsURL = URL(string: UIApplication.openSettingsURLString) {
                        UIApplication.shared.open(settingsURL, options: [:]) { _ in }
                    }
                    resolve(false)
                }
            }
        }
    }
    
    @objc(checkpermissiongranted:withResolver:withRejecter:)
    func checkpermissiongranted(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        if AVCaptureDevice.authorizationStatus(for: AVMediaType.video) ==  AVAuthorizationStatus.authorized {
            resolve(true)
        } else {
            resolve(false)
        }
    }
    
    @objc(startliveness3d:withResolver:withRejecter:)
    func startliveness3D(args: Dictionary<String,Any>?, resolve:@escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
        self.resolve = resolve
        self.reject = reject
        
        let appKey = args?["appkey"] as? String ?? ""
        let ticket = args?["ticket"] as? String ?? nil
        let env = args?["environment"] as? String ?? "HML"
        
        let loading = args?["loading"] as? Dictionary<String,Any> ?? nil
        
        let typeLoading = loading?["type"] as? String ?? "default"
        let sizeLoading = loading?["size"] as? Int ?? 180
        let backgroundColor = loading?["backgroundColor"] as? String ?? "#FFFFFF"
        let loadingColor = loading?["loadingColor"] as? String ?? "#000000"
        
        //Customization
        let texts = liveness3DTexts(from: args?["liveness3Dtext"])
        let theme = liveness3DTheme(theme: args?["theme"],fonts: args?["fonts"])
        
        let liveness3DUser = Liveness3DUser(
            appKey: appKey,
            ticket: ticket,
            environment: env == "PRD" ? Environment.PRD : Environment.HML,
            defaultTheme: theme,
            lowLightTheme: theme,
            texts: texts
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
                let error = NSError(domain: "br.com.oiti.rnliveness3d", code: -1, userInfo: [NSLocalizedDescriptionKey: "RESULT_CANCELED"])
                reject("RESULT_CANCELED", "RESULT_CANCELED", error)
            }
        }
        
    }
    
    func textKey(from identifier: String) -> Liveness3DTextKey? {
        switch identifier {
        case "READY_HEADER_1": return .readyHeader1
        case "READY_HEADER_2": return .readyHeader2
        case "READY_MESSAGE_1": return .readyMessage1
        case "READY_MESSAGE_2": return .readyMessage2
        case "READY_BUTTON": return .readyButton
        case "RETRY_HEADER": return .retryHeader
        case "RETRY_SUBHEADER": return .retrySubheader
        case "RETRY_YOUR_PICTURE": return .retryYourPicture
        case "RETRY_IDEAL_PICTURE": return .retryIdealPicture
        case "RETRY_MESSAGE_SMILE": return .retryMessageSmile
        case "RETRY_MESSAGE_LIGHTING": return .retryMessageLightning
        case "RETRY_MESSAGE_CONTRAST": return .retryMessageContrast
        case "RETRY_BUTTON": return .retryButton
        case "RESULT_UPLOAD_MESSAGE": return .resultUploadMessage
        case "RESULT_SUCCESS_MESSAGE": return .resultSuccessMessage
        case "FEEDBACK_CENTER_FACE": return .feedbackCenterFace
        case "FEEDBACK_FACE_NOT_FOUND": return .feedbackFaceNotFound
        case "FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD": return .feedbackFaceNotLookingStraightAhead
        case "FEEDBACK_FACE_NOT_UPRIGHT": return .feedbackFaceNotUpright
        case "FEEDBACK_HOLD_STEADY": return .feedbackHoldSteady
        case "FEEDBACK_HOLD_STEADY_1": return .feedbackHoldSteady1
        case "FEEDBACK_HOLD_STEADY_2": return .feedbackHoldSteady2
        case "FEEDBACK_HOLD_STEADY_3": return .feedbackHoldSteady3
        case "FEEDBACK_MOVE_PHONE_AWAY": return .feedbackMovePhoneAway
        case "FEEDBACK_MOVE_PHONE_CLOSER": return .feedbackMovePhoneCloser
        case "FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL": return .feedbackMovePhoneToEyeLevel
        case "FEEDBACK_USE_EVEN_LIGHTING": return .feedbackUseEvenLighting
        case "FEEDBACK_FRAME_YOUR_FACE": return .feedbackFrameYourFace
        case "FEEDBACK_POSITION_FACE_STRAIGHT_IN_OVAL": return .feedbackPositionFaceStraightInOval
        case "FEEDBACK_REMOVE_DARK_GLASSES": return .feedbackRemoveDarkGlasses
        case "FEEDBACK_NEUTRAL_EXPRESSION": return .feedbackNeutralExpression
        case "FEEDBACK_CONDITIONS_TOO_BRIGHT": return .feedbackConditionsTooBright
        case "FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT": return .feedbackBrightenYourEnvironment
        default: return nil
        }
    }
    
    func liveness3DTexts(from arguments: Any?) -> [Liveness3DTextKey : String] {
        guard let textsDictionary = arguments as? Dictionary<String, String> else {
            return [:]
        }
        
        let sequence: [(Liveness3DTextKey, String)] = textsDictionary
            .compactMap {
                guard let key = self.textKey(from: $0.key) else {
                    return nil
                }
                return (key, $0.value)
            }
            .filter { !$0.1.isEmpty }
        
        return Dictionary(uniqueKeysWithValues: sequence)
    }
    
    func liveness3DTheme(theme: Any?, fonts: Any?) -> Liveness3DTheme {
        let themeDictionary = theme as? Dictionary<String, Any>
        let fontsDictionary = fonts as? Dictionary<String, Any>
        print(fontsDictionary as Any)
        
        var theme = Liveness3DTheme(.light)
        
        let guidanceCustomizationHeaderFont = fontsDictionary?["guidanceCustomizationHeaderFont"] as? String ?? ""
        let guidanceCustomizationSubtextFont = fontsDictionary?["guidanceCustomizationSubtextFont"] as? String ?? ""
        let guidanceCustomizationButtonFont = fontsDictionary?["guidanceCustomizationButtonFont"] as? String ?? ""
        
        let readyScreenCustomizationSubtextFont = fontsDictionary?["readyScreenCustomizationSubtextFont"] as? String ?? ""
        let readyScreenCustomizationHeaderFont = fontsDictionary?["readyScreenCustomizationHeaderFont"] as? String ?? ""
        
        let retryScreenCustomizationHeaderFont = fontsDictionary?["retryScreenCustomizationHeaderFont"] as? String ?? ""
        let retryScreenCustomizationSubtextFont = fontsDictionary?["retryScreenCustomizationSubtextFont"] as? String ?? ""
        
        let resultScreenCustomizationMessageFont = fontsDictionary?["resultScreenCustomizationMessageFont"] as? String ?? ""
        
        let feedbackCustomizationTextFont = fontsDictionary?["feedbackCustomizationTextFont"] as? String ?? ""
                
        theme.readyScreenCustomizationHeaderFont = UIFont(name: readyScreenCustomizationSubtextFont, size: 14)
        theme.readyScreenCustomizationHeaderTextColor = .init(hex: themeDictionary?["guidanceCustomizationReadyScreenHeaderTextColor"] as? String ?? "#000000")
        theme.readyScreenCustomizationSubtextFont = UIFont(name: readyScreenCustomizationHeaderFont, size: 14)
        theme.readyScreenCustomizationSubtextTextColor = .init(hex: themeDictionary?["guidanceCustomizationReadyScreenSubtextTextColor"] as? String ?? "#333333")
        theme.readyScreenCustomizationTextBackgroundColor = .init(hex: themeDictionary?["guidanceCustomizationTextBackgroundColor"] as? String ?? "")
        theme.readyScreenCustomizationTextBackgroundCornerRadius = themeDictionary?["guidanceCustomizationTextBackgroundColorRadius"] as? Int32 ?? 0
        
        theme.retryScreenCustomizationHeaderFont = UIFont(name: retryScreenCustomizationHeaderFont, size: 14)
        theme.retryScreenCustomizationHeaderTextColor = .init(hex: themeDictionary?["guidanceCustomizationRetryScreenHeaderTextColor"] as? String ?? "#000000")
        theme.retryScreenCustomizationSubtextFont = UIFont(name: retryScreenCustomizationSubtextFont, size: 14)
        theme.retryScreenCustomizationSubtextTextColor = .init(hex: themeDictionary?["guidanceCustomizationRetryScreenSubtextTextColor"] as? String ?? "#333333")
        theme.retryScreenCustomizationImageBorderColor = .init(hex: themeDictionary?["guidanceCustomizationRetryScreenImageBorderColor"] as? String ?? "#4bb75f")
        theme.retryScreenCustomizationImageBorderWidth = themeDictionary?["guidanceCustomizationRetryScreenImageBorderWidth"] as? Int32 ?? 0
        theme.retryScreenCustomizationImageCornerRadius = themeDictionary?["guidanceCustomizationRetryScreenImageCornerRadius"] as? Int32 ?? 0
        
        theme.resultScreenCustomizationAnimationRelativeScale = 1.5
        theme.resultScreenCustomizationTextColor = .init(hex: themeDictionary?["resultScreenCustomizationTextColor"] as? String ?? "#000000")
        theme.resultScreenCustomizationShowUploadProgressBar = true
        theme.resultScreenCustomizationUploadProgressFillColor = .init(hex: themeDictionary?["resultScreenCustomizationUploadProgressFillColor"] as? String ?? "#4bb75f")
        theme.resultScreenCustomizationUploadProgressTrackColor = .init(hex: themeDictionary?["resultScreenCustomizationUploadProgressTrackColor"] as? String ?? "#333333")
        theme.resultScreenCustomizationMessageFont = UIFont(name: resultScreenCustomizationMessageFont, size: 15.0)
        theme.resultScreenCustomizationAnimationStyle = .blob(appearance: BlobAnimationAppearance(
            blobColor: .blue,
            checkmarkForegroundColor: .purple,
            checkmarkBackgroundColor: .yellow
        ))
        
        theme.guidanceCustomizationHeaderFont = UIFont(name: guidanceCustomizationHeaderFont, size: 14)
        theme.guidanceCustomizationSubtextFont = UIFont(name: guidanceCustomizationSubtextFont, size: 14)
        theme.guidanceCustomizationButtonFont = UIFont(name: guidanceCustomizationButtonFont, size: 14)
        
        theme.guidanceCustomizationButtonTextNormalColor = .init(hex: themeDictionary?["guidanceCustomizationButtonTextNormalColor"] as? String ?? "#000000")
        theme.guidanceCustomizationButtonBackgroundNormalColor = .init(hex: themeDictionary?["guidanceCustomizationButtonBackgroundNormalColor"] as? String ?? "#4bb75f")
        theme.guidanceCustomizationButtonTextHighlightColor = .init(hex: themeDictionary?["guidanceCustomizationButtonTextHighlightColor"] as? String ?? "#000000")
        theme.guidanceCustomizationButtonBackgroundHighlightColor = .init(hex: themeDictionary?["guidanceCustomizationButtonBackgroundHighlightColor"] as? String ?? "#000000")
        theme.guidanceCustomizationButtonTextDisabledColor = .init(hex: themeDictionary?["guidanceCustomizationButtonTextDisabledColor"] as? String ?? "#333333")
        theme.guidanceCustomizationButtonBackgroundDisabledColor = .init(hex: themeDictionary?["guidanceCustomizationButtonBackgroundDisabledColor"] as? String ?? "#333333")
        theme.guidanceCustomizationButtonBorderColor = .init(hex: themeDictionary?["guidanceCustomizationButtonBorderColor"] as? String ?? "#000000")
        theme.guidanceCustomizationButtonBorderWidth = themeDictionary?["guidanceCustomizationButtonBorderWidth"] as? Int32 ?? 0
        theme.guidanceCustomizationButtonCornerRadius = themeDictionary?["guidanceCustomizationButtonCornerRadius"] as? Int32 ?? 25
        
        theme.frameCustomizationBorderWidth = themeDictionary?["frameCustomizationBorderWidth"] as? Int32 ?? 0
        theme.frameCustomizationCornerRadius = themeDictionary?["frameCustomizationCornerRadius"] as? Int32 ?? 0
        theme.frameCustomizationBorderColor = .init(hex: themeDictionary?["frameCustomizationBorderColor"] as? String ?? "#4bb75f")
        theme.frameCustomizationBackgroundColor = .init(hex: themeDictionary?["frameCustomizationBackgroundColor"] as? String ?? "#FFFFFF")
        theme.frameCustomizationShadow = Liveness3DShadow(
            color: .red, opacity: 0.8,
            radius: 1.0, offset: .zero,
            insets: .init(top: 1.0, left: 0.5, bottom: 0.7, right: 0.5)
        )
        
        theme.ovalCustomizationStrokeWidth = themeDictionary?["ovalCustomizationStrokeWidth"] as? Int32 ?? 3
        theme.ovalCustomizationStrokeColor = .init(hex: themeDictionary?["ovalCustomizationStrokeColor"] as? String ?? "#4bb75f")
        theme.ovalCustomizationProgressStrokeWidth = themeDictionary?["ovalCustomizationProgressStrokeWidth"] as? Int32 ?? 2
        theme.ovalCustomizationProgressColor1 = .init(hex: themeDictionary?["ovalCustomizationProgressColor1"] as? String ?? "#4bb75f")
        theme.ovalCustomizationProgressColor2 = .init(hex: themeDictionary?["ovalCustomizationProgressColor2"] as? String ?? "#4bb75f")
        theme.ovalCustomizationProgressRadialOffset = themeDictionary?["ovalCustomizationProgressRadialOffset"] as? Int32 ?? 2
        
        theme.overlayCustomizationBackgroundColor = .init(hex: themeDictionary?["overlayCustomizationBackgroundColor"] as? String ?? "#FFFFFF")
        theme.overlayCustomizationBrandingImage = UIImage(named: "")
        theme.overlayCustomizationShowBrandingImage = false
        
        theme.feedbackCustomizationTextColor = .init(hex: themeDictionary?["feedbackCustomizationTextColor"] as? String ?? "#FFFFFF")
        theme.feedbackCustomizationTextFont = UIFont(name: "", size: 14)
        theme.feedbackCustomizationShadow = Liveness3DShadow(
            color: .purple, opacity: 0.5,
            radius: 3.0, offset: .init(width: 2.0, height: 5.0),
            insets: .init(top: 3.0, left: 1.5, bottom: 3.7, right: 7.5)
        )
        theme.feedbackCustomizationCornerRadius = themeDictionary?["feedbackCustomizationCornerRadius"] as? Int32 ?? 2
        theme.feedbackCustomizationBackgroundColor = .init(hex: themeDictionary?["feedbackCustomizationBackgroundColors"] as? String ?? "#666666")
        
        theme.cancelButtonCustomizationCustomImage = UIImage(named: "")
        theme.cancelButtonCustomizationLocation = .topLeft
        
        return theme
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
