import OILiveness3D
import OIComponents
import AVFoundation



@objc(RnLiveness3d)
class RnLiveness3d: NSObject, Liveness3DDelegate {
    
    var resolve:RCTPromiseResolveBlock!
    var reject:RCTPromiseRejectBlock!
    
    private let certifaceURL = "https://comercial.certiface.com.br:8443/"
    
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
        let baseURL = args?["baseUrl"] as? String ?? certifaceURL
        let environment = args?["environment"] as? String ?? "HML"
        let apparence = args?["apparence"] as? Dictionary<String,Any> ?? nil
        let liveness3Dtext = args?["liveness3Dtext"] as? Dictionary<String,Any> ?? nil
        
        
        let loading = args?["loading"] as? Dictionary<String,Any> ?? nil
        
        let typeLoading = loading?["type"] as? String ?? "default"
        let sizeLoading = loading?["size"] as? Int ?? 180
        let backgroundColor = loading?["backgroundColor"] as? String ?? "#FFFFFF"
        let loadingColor = loading?["loadingColor"] as? String ?? "#000000"
        
        let READY_HEADER_1 = liveness3Dtext?["READY_HEADER_1"] as? String ?? ""
        let READY_HEADER_2 = liveness3Dtext?["READY_HEADER_2"] as? String ?? ""
        let READY_MESSAGE_1 = liveness3Dtext?["READY_MESSAGE_1"] as? String ?? ""
        let READY_MESSAGE_2 = liveness3Dtext?["READY_MESSAGE_2"] as? String ?? ""
        let RETRY_HEADER = liveness3Dtext?["RETRY_HEADER"] as? String ?? "Vamos tentar novamente?"
        let READY_BUTTON = liveness3Dtext?["READY_BUTTON"] as? String ?? ""
        let RETRY_BUTTON = liveness3Dtext?["READY_BUTTON"] as? String ?? "Tentar novamente"
        let RETRY_YOUR_PICTURE = liveness3Dtext?["RETRY_YOUR_PICTURE"] as? String ?? "Sua foto"
        
        let RETRY_MESSAGE_SMILE = liveness3Dtext?["RETRY_MESSAGE_SMILE"] as? String ?? "Expressão Neutra, Sem Sorrir"
        let RETRY_MESSAGE_LIGHTING = liveness3Dtext?["RETRY_MESSAGE_LIGHTING"] as? String ?? "Evite reflexos e iluminação extrema."
        let RETRY_MESSAGE_CONTRAST = liveness3Dtext?["RETRY_MESSAGE_CONTRAST"] as? String ?? "Limpe Sua Câmera"
        let RETRY_IDEAL_PICTURE = liveness3Dtext?["RETRY_IDEAL_PICTURE"] as? String ?? ""
        let RETRY_SUBHEADER = liveness3Dtext?["RETRY_SUBHEADER"] as? String ?? "Siga o exemplo de foto ideal abaixo:"
        
        let FEEDBACK_FRAME_YOUR_FACE = liveness3Dtext?["FEEDBACK_FRAME_YOUR_FACE"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_1 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_1"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_2 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_2"] as? String ?? ""
        let FEEDBACK_HOLD_STEADY_3 = liveness3Dtext?["FEEDBACK_HOLD_STEADY_3"] as? String ?? ""
        
        let FEEDBACK_CENTER_FACE = liveness3Dtext?["FEEDBACK_CENTER_FACE"] as? String ?? ""
        
        //FaceTec Texts
        let liveness3DTexts: [Liveness3DTextKey: String] = [
            .feedbackCenterFace: FEEDBACK_CENTER_FACE,
            .feedbackFaceNotFound: "Enquadre o Seu Rosto",
            .feedbackFaceNotLookingStraightAhead: "Olhe Para Frente",
            .feedbackFaceNotUpright: "Mantenha a Cabeça Reta",
            .feedbackHoldSteady: "Segure Firme",
            .feedbackMovePhoneAway: "Afaste-se",
            .feedbackMovePhoneCloser:"Aproxime-se",
            .feedbackMovePhoneToEyeLevel:"Mantenha o telefone ao nível dos olhos",
            .feedbackUseEvenLighting:"Ilumine Seu Rosto Uniformemente",
            .readyHeader1: READY_HEADER_1,
            .readyHeader2: READY_HEADER_2,
            .readyMessage1: READY_MESSAGE_1,
            .readyMessage2: READY_MESSAGE_2,
            .readyButton: "Começar",
            .feedbackPositionFaceStraightInOval:"Olhe Para Frente",
            .feedbackHoldSteady3: FEEDBACK_HOLD_STEADY_3,
            .feedbackHoldSteady2: FEEDBACK_HOLD_STEADY_2,
            .feedbackHoldSteady1: FEEDBACK_HOLD_STEADY_1,
            .feedbackRemoveDarkGlasses:"Tire Seus Óculos de Sol",
            .feedbackNeutralExpression:"Fique Neutro, Não Sorria",
            .feedbackConditionsTooBright:"Ambiente Muito Iluminado",
            .feedbackBrightenYourEnvironment:"Ambiente Muito Escuro",
            .resultUploadMessage:"Enviando",
            .resultSuccessMessage:"Tudo certo!",
            .retryHeader: RETRY_HEADER,
            .retrySubheader: RETRY_SUBHEADER,
            .retryMessageSmile: RETRY_MESSAGE_SMILE,
            .retryMessageLightning: RETRY_MESSAGE_LIGHTING,
            .retryMessageContrast: RETRY_MESSAGE_CONTRAST,
            .retryYourPicture: RETRY_YOUR_PICTURE,
            .retryIdealPicture: RETRY_IDEAL_PICTURE
        ]
        
        
        var liveness3DUser = Liveness3DUser(
            appKey: appKey,
            environment: .HML,
            texts: liveness3DTexts
        )
        
        if(environment == "PRD"){
            liveness3DUser = Liveness3DUser(
                appKey: appKey,
                environment: .PRD,
                texts: liveness3DTexts
            )
            
        }
        
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { response in
            if response {
                //access granted
                DispatchQueue.main.async {
                    
                    if(typeLoading == "spinner"){
                        
                        let LoadingConfig = SpinnerConfiguration(
                            backgroundColor: .init(hex: backgroundColor),
                            loadingColor: .init(hex: loadingColor),
                            strokeWidth: 10,
                            scaleFactor: sizeLoading
                        )
                        let liveness3DViewController = HybridLiveness3DViewController(
                            liveness3DUser: liveness3DUser,
                            delegate: self,
                            customAppearance: .init(configuration: LoadingConfig)
                        )
                        
                        liveness3DViewController.modalPresentationStyle = .fullScreen
                        RCTPresentedViewController()?.present(liveness3DViewController, animated: true)
                    }else {
                        let LoadingConfig = ActivityIndicatorConfiguration(
                                loadingColor: .init(hex: loadingColor),
                                backgroundColor: .init(hex: backgroundColor),
                                scaleFactor: sizeLoading
                        )
                        
                        let liveness3DViewController = HybridLiveness3DViewController(
                            liveness3DUser: liveness3DUser,
                            delegate: self,
                            customAppearance: .init(configuration: LoadingConfig)
                        )
                        
                        liveness3DViewController.modalPresentationStyle = .fullScreen
                        RCTPresentedViewController()?.present(liveness3DViewController, animated: true)
                    }
                    
                    
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
