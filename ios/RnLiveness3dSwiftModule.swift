import AVFoundation
import OILiveness3D
import OIComponents
import OICommons
import OISecurity
import UIKit

public typealias PromiseResolveBlock = (Any?) -> Void
public typealias PromiseRejectBlock = (_ code: String, _ message: String, _ error: Error?) -> Void
public typealias ResponseSenderBlock = ([Any]) -> Void
public typealias PresenterBlock = (_ viewController: UIViewController, _ animated: Bool) -> Void

@objcMembers
public class RnLiveness3dSwiftModule: NSObject {
    private var resolve: PromiseResolveBlock!
    private var reject: PromiseRejectBlock!

    public override init() {
        super.init()
    }

    public func checkCameraPermissionGranted() -> Bool {
        AVCaptureDevice.authorizationStatus(for: AVMediaType.video) ==  AVAuthorizationStatus.authorized
    }

    public func requestCameraPermission(_ resolve: @escaping ResponseSenderBlock) -> Void {
        AVCaptureDevice.requestAccess(for: .video) { granted in
            DispatchQueue.main.async {
                if !granted, let settingsURL = URL(string: UIApplication.openSettingsURLString) {
                    UIApplication.shared.open(settingsURL, options: [:]) { _ in }
                }
                resolve([granted])
            }
        }
    }

    public func startLiveness3d(
        _ args: NSDictionary,
        resolve: @escaping PromiseResolveBlock,
        reject: @escaping PromiseRejectBlock,
        presenter: @escaping PresenterBlock
    ) -> Void {
        guard checkCameraPermissionGranted() else {
            let error = NSError(
                domain: "br.com.oiti.rnliveness3d",
                code: -1,
                userInfo: [NSLocalizedDescriptionKey: "RESULT_CANCELED"]
            )
            reject("RESULT_CANCELED", "RESULT_CANCELED", error)
            return
        }

        self.resolve = resolve
        self.reject = reject

        let appKey = args["appkey"] as? String ?? ""
        let env = args["environment"] as? String ?? "HML"

        //Customization
        let theme = liveness3DTheme(theme: args["theme"], fonts: args["fonts"])
        let texts = liveness3DTexts(from: args["liveness3Dtext"])

        let liveness3DUser = Liveness3DUser(
            appKey: appKey,
            environment: env == "PRD" ? .PRD : .HML,
            defaultTheme: theme,
            lowLightTheme: theme,
            texts: texts
        )

        let customAppearance = getCustomAppearance(from: args)

        DispatchQueue.main.async {
            let controller = HybridLiveness3DViewController(
                liveness3DUser: liveness3DUser,
                delegate: self,
                customAppearance: customAppearance
            )
            controller.modalPresentationStyle = .fullScreen
            presenter(controller, true)
        }
    }

    // MARK: - Internal methods

    private func getCustomAppearance(from args: NSDictionary) -> HybridViewAppearance {
        let loading = args["loading"] as? NSDictionary
        let typeLoading = loading?["type"] as? String ?? "default"
        let sizeLoading = parseLoadingSize(loading?["size"]) ?? 10
        let backgroundColor = loading?["backgroundColor"] as? String ?? "#FFFFFF"
        let loadingColor = loading?["loadingColor"] as? String ?? "#000000"

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

        return typeLoading == "spinner" ? .init(configuration: spinnerLoading) : .init(configuration: defaultLoading)
    }

    private func parseLoadingSize(_ value: Any?) -> Int? {
        switch value {
        case let intValue as Int:
            return intValue
        case let doubleValue as Double:
            return Int(doubleValue)
        case let numberValue as NSNumber:
            return numberValue.intValue
        case let stringValue as String:
            return Int(stringValue)
        default:
            return nil
        }
    }

    private func textKey(from identifier: String) -> Liveness3DTextKey? {
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

    private func liveness3DTexts(from arguments: Any?) -> [Liveness3DTextKey : String] {
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

    private func liveness3DTheme(theme: Any?, fonts: Any?) -> Liveness3DTheme {
        let themeDictionary = theme as? Dictionary<String, Any>
        let fontsDictionary = fonts as? Dictionary<String, Any>

        var livenessTheme = Liveness3DTheme(.light)
        let hasThemeCustomizations = !(themeDictionary?.isEmpty ?? true)
        let hasFontCustomizations = !(fontsDictionary?.isEmpty ?? true)
        if !hasThemeCustomizations && !hasFontCustomizations {
            return livenessTheme
        }

        func themeString(_ key: String, legacyKey: String? = nil) -> String? {
            let primary = (themeDictionary?[key] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
            if let primary, !primary.isEmpty { return primary }
            guard let legacyKey else { return nil }
            let legacy = (themeDictionary?[legacyKey] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
            if let legacy, !legacy.isEmpty { return legacy }
            return nil
        }

        func fontName(_ key: String) -> String? {
            let name = (fontsDictionary?[key] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
            guard let name, !name.isEmpty else { return nil }
            return name
        }

        func int32Value(_ key: String, legacyKey: String? = nil) -> Int32? {
            let value = themeDictionary?[key] ?? (legacyKey != nil ? themeDictionary?[legacyKey!] : nil)
            switch value {
            case let intValue as Int: return Int32(intValue)
            case let doubleValue as Double: return Int32(doubleValue)
            case let numberValue as NSNumber: return numberValue.int32Value
            case let stringValue as String: return Int32(stringValue)
            default: return nil
            }
        }

        if let name = fontName("readyScreenCustomizationHeaderFont") {
            livenessTheme.readyScreenCustomizationHeaderFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("readyScreenCustomizationSubtextFont") {
            livenessTheme.readyScreenCustomizationSubtextFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("retryScreenCustomizationHeaderFont") {
            livenessTheme.retryScreenCustomizationHeaderFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("retryScreenCustomizationSubtextFont") {
            livenessTheme.retryScreenCustomizationSubtextFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("resultScreenCustomizationMessageFont") {
            livenessTheme.resultScreenCustomizationMessageFont = UIFont(name: name, size: 15)
        }
        if let name = fontName("guidanceCustomizationHeaderFont") {
            livenessTheme.guidanceCustomizationHeaderFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("guidanceCustomizationSubtextFont") {
            livenessTheme.guidanceCustomizationSubtextFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("guidanceCustomizationButtonFont") {
            livenessTheme.guidanceCustomizationButtonFont = UIFont(name: name, size: 14)
        }
        if let name = fontName("feedbackCustomizationTextFont") {
            livenessTheme.feedbackCustomizationTextFont = UIFont(name: name, size: 14)
        }

        if let hex = themeString("guidanceCustomizationReadyScreenHeaderTextColor") { livenessTheme.readyScreenCustomizationHeaderTextColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationReadyScreenSubtextTextColor") { livenessTheme.readyScreenCustomizationSubtextTextColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationReadyScreenTextBackgroundColor", legacyKey: "guidanceCustomizationTextBackgroundColor") { livenessTheme.readyScreenCustomizationTextBackgroundColor = .init(hex: hex) }
        if let value = int32Value("guidanceCustomizationReadyScreenTextBackgroundCornerRadius", legacyKey: "guidanceCustomizationTextBackgroundColorRadius") { livenessTheme.readyScreenCustomizationTextBackgroundCornerRadius = value }

        if let hex = themeString("guidanceCustomizationRetryScreenHeaderTextColor") { livenessTheme.retryScreenCustomizationHeaderTextColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationRetryScreenSubtextTextColor") { livenessTheme.retryScreenCustomizationSubtextTextColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationRetryScreenImageBorderColor") { livenessTheme.retryScreenCustomizationImageBorderColor = .init(hex: hex) }
        if let value = int32Value("guidanceCustomizationRetryScreenImageBorderWidth") { livenessTheme.retryScreenCustomizationImageBorderWidth = value }
        if let value = int32Value("guidanceCustomizationRetryScreenImageCornerRadius") { livenessTheme.retryScreenCustomizationImageCornerRadius = value }

        if let hex = themeString("resultScreenCustomizationForegroundColor", legacyKey: "resultScreenCustomizationTextColor") { livenessTheme.resultScreenCustomizationTextColor = .init(hex: hex) }
        if let hex = themeString("resultScreenCustomizationUploadProgressFillColor") { livenessTheme.resultScreenCustomizationUploadProgressFillColor = .init(hex: hex) }
        if let hex = themeString("resultScreenCustomizationUploadProgressTrackColor") { livenessTheme.resultScreenCustomizationUploadProgressTrackColor = .init(hex: hex) }

        let blobColorHex = themeString("resultScreenCustomizationActivityIndicatorColor")
        let checkmarkFgHex = themeString("resultScreenCustomizationResultAnimationForegroundColor")
        let checkmarkBgHex = themeString("resultScreenCustomizationResultAnimationBackgroundColor")
        if let blobColorHex, let checkmarkFgHex, let checkmarkBgHex {
            livenessTheme.resultScreenCustomizationAnimationStyle = .blob(appearance: BlobAnimationAppearance(
                blobColor: .init(hex: blobColorHex),
                checkmarkForegroundColor: .init(hex: checkmarkFgHex),
                checkmarkBackgroundColor: .init(hex: checkmarkBgHex)
            ))
        }

        if let hex = themeString("guidanceCustomizationButtonTextNormalColor") { livenessTheme.guidanceCustomizationButtonTextNormalColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonBackgroundNormalColor") { livenessTheme.guidanceCustomizationButtonBackgroundNormalColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonTextHighlightColor") { livenessTheme.guidanceCustomizationButtonTextHighlightColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonBackgroundHighlightColor") { livenessTheme.guidanceCustomizationButtonBackgroundHighlightColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonTextDisabledColor") { livenessTheme.guidanceCustomizationButtonTextDisabledColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonBackgroundDisabledColor") { livenessTheme.guidanceCustomizationButtonBackgroundDisabledColor = .init(hex: hex) }
        if let hex = themeString("guidanceCustomizationButtonBorderColor") { livenessTheme.guidanceCustomizationButtonBorderColor = .init(hex: hex) }
        if let value = int32Value("guidanceCustomizationButtonBorderWidth") { livenessTheme.guidanceCustomizationButtonBorderWidth = value }
        if let value = int32Value("guidanceCustomizationButtonCornerRadius") { livenessTheme.guidanceCustomizationButtonCornerRadius = value }

        if let value = int32Value("frameCustomizationBorderWidth") { livenessTheme.frameCustomizationBorderWidth = value }
        if let value = int32Value("frameCustomizationCornerRadius") { livenessTheme.frameCustomizationCornerRadius = value }
        if let hex = themeString("frameCustomizationBorderColor") { livenessTheme.frameCustomizationBorderColor = .init(hex: hex) }
        if let hex = themeString("frameCustomizationBackgroundColor") { livenessTheme.frameCustomizationBackgroundColor = .init(hex: hex) }

        if let value = int32Value("ovalCustomizationStrokeWidth") { livenessTheme.ovalCustomizationStrokeWidth = value }
        if let hex = themeString("ovalCustomizationStrokeColor") { livenessTheme.ovalCustomizationStrokeColor = .init(hex: hex) }
        if let value = int32Value("ovalCustomizationProgressStrokeWidth") { livenessTheme.ovalCustomizationProgressStrokeWidth = value }
        if let hex = themeString("ovalCustomizationProgressColor1") { livenessTheme.ovalCustomizationProgressColor1 = .init(hex: hex) }
        if let hex = themeString("ovalCustomizationProgressColor2") { livenessTheme.ovalCustomizationProgressColor2 = .init(hex: hex) }
        if let value = int32Value("ovalCustomizationProgressRadialOffset") { livenessTheme.ovalCustomizationProgressRadialOffset = value }

        if let hex = themeString("overlayCustomizationBackgroundColor") { livenessTheme.overlayCustomizationBackgroundColor = .init(hex: hex) }
        if let hex = themeString("feedbackCustomizationTextColor") { livenessTheme.feedbackCustomizationTextColor = .init(hex: hex) }
        if let value = int32Value("feedbackCustomizationCornerRadius") { livenessTheme.feedbackCustomizationCornerRadius = value }
        if let hex = themeString("feedbackCustomizationBackgroundColors") { livenessTheme.feedbackCustomizationBackgroundColor = .init(hex: hex) }

        return livenessTheme
    }
}

extension RnLiveness3dSwiftModule: Liveness3DDelegate {
    @nonobjc public func handleLiveness3DValidation(validateModel: Liveness3DSuccess) {
        let response: Dictionary<String, Any> = [
            "cause": validateModel.cause ?? "",
            "codId": String(validateModel.codID ?? 0.0),
            "protocol": validateModel.protocolo ?? "",
            "blob": validateModel.scanResultBlob ?? "",
            "valid": validateModel.valid ?? false
        ]

        resolve(response)
    }

    @nonobjc public func handleLiveness3DError(error: OILiveness3D.Liveness3DError) {
        reject("\(error.code)", "\(error.message)", error.type as Error)
    }
}

extension UIColor {
    convenience init(hex: String) {
        var cString: String = hex.trimmingCharacters(in: .whitespacesAndNewlines).uppercased()

        if cString.hasPrefix("#") {
            cString.remove(at: cString.startIndex)
        }

        if cString.count != 6 {
            self.init(red: 0.0, green: 0.0, blue: 0.0, alpha: 1.0)
            return
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