import FaceCaptcha
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
        
        
        
        let backgroundColor = apparence?["backgroundColor"] as? String ?? ""
        let loadingColor = apparence?["loadingColor"] as? String ?? ""
        
        
        //FaceTec Texts
        var textsFT = ["FaceTec_accessibility_cancel_button": "Cancelar",
                       "FaceTec_accessibility_torch_button": "Ligar flash",
                       "FaceTec_action_ok": "OK",
                       "FaceTec_action_im_ready": READY_BUTTON,
                       "FaceTec_action_try_again": RETRY_BUTTON,
                       "FaceTec_action_continue": "Continuar2",
                       "FaceTec_action_take_photo": "Tirar Foto",
                       "FaceTec_action_accept_photo": "Aceitar",
                       "FaceTec_action_confirm": "Confirmação das informações",
                       "FaceTec_camera_permission_header": "Habilite a Camera",
                       "FaceTec_feedback_center_face": FEEDBACK_CENTER_FACE,
                       "FaceTec_feedback_face_not_found": "Enquadre o Seu Rosto",
                       "FaceTec_feedback_face_not_looking_straight_ahead": "Olhe Para Frente",
                       "FaceTec_feedback_face_not_upright": "Mantenha a Cabeça Reta",
                       "FaceTec_feedback_hold_steady": "Segure Firme",
                       "FaceTec_feedback_move_phone_away": "2Afaste-se2",
                       "FaceTec_feedback_move_phone_closer":"2Aproxime-se2",
                       "FaceTec_feedback_move_phone_to_eye_level":"Telefone ao Nível dos Olhos",
                       "FaceTec_feedback_use_even_lighting":"Ilumine Seu Rosto Uniformemente",
                       "FaceTec_idscan_type_selection_header":"Prepare to Scan\nYour ID Document",
                       "FaceTec_instructions_header_ready_1": READY_HEADER_1,
                       "FaceTec_instructions_header_ready_2": READY_HEADER_2,
                       "FaceTec_instructions_message_ready_1": READY_MESSAGE_1,
                       "FaceTec_instructions_message_ready_2": READY_MESSAGE_2,
                       "FaceTec_presession_frame_your_face": FEEDBACK_FRAME_YOUR_FACE,
                       "FaceTec_presession_position_face_straight_in_oval":"Olhe Para Frente",
                       "FaceTec_presession_hold_steady_3": FEEDBACK_HOLD_STEADY_3,
                       "FaceTec_presession_hold_steady_2": FEEDBACK_HOLD_STEADY_2,
                       "FaceTec_presession_hold_steady_1": FEEDBACK_HOLD_STEADY_1,
                       "FaceTec_presession_eyes_straight_ahead":"Olhe Para Frente",
                       "FaceTec_presession_remove_dark_glasses":"Tire Seus Óculos de Sol",
                       "FaceTec_presession_neutral_expression":"Fique Neutro, Não Sorria",
                       "FaceTec_presession_conditions_too_bright":"Ambiente Muito Iluminado",
                       "FaceTec_presession_brighten_your_environment":"Ambiente Muito Escuro",
                       "FaceTec_result_facescan_upload_message":"",
                       "FaceTec_result_success_message":"Tudo certo!",
                       "FaceTec_result_idscan_unsuccess_message":"Não foi possível concluir sua verificação.",
                       "FaceTec_retry_header": RETRY_HEADER,
                       "FaceTec_retry_subheader_message": RETRY_SUBHEADER,
                       "FaceTec_retry_instruction_message_1": RETRY_MESSAGE_SMILE,
                       "FaceTec_retry_instruction_message_2": RETRY_MESSAGE_LIGHTING,
                       "FaceTec_retry_instruction_message_3": RETRY_MESSAGE_CONTRAST,
                       "FaceTec_retry_your_image_label": RETRY_YOUR_PICTURE,
                       "FaceTec_retry_ideal_image_label": RETRY_IDEAL_PICTURE];
        
        var theme = Liveness3DTheme(Liveness3DThemeType.light)
        theme.ovarCustomizationStrokeColor = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 1.0)
        theme.ovarCustomizationProgressColor1 = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 1.0)
        theme.ovarCustomizationProgressColor2 = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 1.0)
        theme.guidanceCustomizationButtonBackgroundNormalColor = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 1.0)
        theme.guidanceCustomizationButtonBackgroundHighlightColor = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 1.0)
        theme.guidanceCustomizationButtonBackgroundDisabledColor = UIColor(red: 0.9137, green: 0.3216, blue: 0.149, alpha: 0.5)
        
        let liveness3DUser = Liveness3DUser(
            appKey: appKey,
            environment: .HML
        )
        
      /*  if(environment == "PRD"){
            let liveness3DUser = Liveness3DUser(
                appKey: appKey,
                environment: .PRD,
                defaultTheme: theme,
                lowLightTheme: theme,
                texts: textsFT
            )

        }
        */
        AVCaptureDevice.requestAccess(for: AVMediaType.video) { response in
            if response {
                //access granted
                DispatchQueue.main.async {
                    let initTheme = HybridViewAppearance(
                        backgroundColor: .init(hex: backgroundColor),
                        loadingColor:.init(hex: loadingColor)
                    )
                    
                    let liveness3DViewController = HybridLiveness3DViewController(
                        liveness3DUser: liveness3DUser,
                        delegate: self,
                        customAppearance: initTheme
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
