package br.com.oiti.rnliveness3d

//import br.com.oiti.liveness3d.theme.Liveness3DTheme

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.util.Log
import androidx.annotation.NonNull
import androidx.core.app.ActivityCompat
import androidx.core.content.*

import br.com.oiti.liveness3d.app.ui.HybridLiveness3DActivity
import br.com.oiti.liveness3d.data.model.ENVIRONMENT3D
import br.com.oiti.liveness3d.data.model.Liveness3DTextKey
import br.com.oiti.liveness3d.data.model.Liveness3DUser
import br.com.oiti.liveness3d.data.model.LoadingType3D
import br.com.oiti.security.observability.firebase.FirebaseEvents
import com.facebook.react.bridge.*
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class RnLiveness3dModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {


  private val LIVENESS3D_REQUEST = 1
  private val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
  private val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
  private val PERMISSION_REQUEST_CODE = 200

  private var mLiveness3dPromisse: Promise? = null

  private val mActivityEventListener: ActivityEventListener =
    object : BaseActivityEventListener() {
      override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
      ) {
        if (requestCode == LIVENESS3D_REQUEST) {
          if (mLiveness3dPromisse != null) {
            if (resultCode == Activity.RESULT_CANCELED) {
              mLiveness3dPromisse!!.reject(E_FAILED_TO_SHOW_PICKER,"RESULT_CANCELED")
            } else if (resultCode == Activity.RESULT_OK) {
              mLiveness3dPromisse!!.resolve("RESULT_OK")
            }
            mLiveness3dPromisse = null
          }
        }
      }
    }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun logevent(name: String, appKey: String) {
    FirebaseEvents(name.toString(), appKey).apply()
  }



  @NonNull
  @ReactMethod
  fun startliveness3d(appKey: String, type: String, size: Int, backgroundColor: String, loadingColor: String, promise: Promise) {
    val currentActivity = currentActivity
    Log.d("LOADING RN TYPE", type)
    Log.d("LOADING RN SIZE", size.toString())
    Log.d("LOADING RN BG", backgroundColor)
    Log.d("LOADING RN LC", loadingColor)

    val texts = hashMapOf<Liveness3DTextKey, String>(
      Liveness3DTextKey.READY_HEADER_1 to "Prepare-se para seu",
      Liveness3DTextKey.READY_HEADER_2 to "reconhecimento facial.",
      Liveness3DTextKey.READY_MESSAGE_1 to "Posicione o seu rosto na moldura, aproxime-se",
      Liveness3DTextKey.READY_MESSAGE_2 to "e toque em começar.",
      Liveness3DTextKey.READY_BUTTON to "Começar",

      Liveness3DTextKey.RETRY_HEADER to "Vamos tentar novamente?",
      Liveness3DTextKey.RETRY_SUBHEADER to "Siga o exemplo de foto ideal abaixo:",
      Liveness3DTextKey.RETRY_MESSAGE_SMILE to "Expressão Neutra, Sem Sorrir",
      Liveness3DTextKey.RETRY_MESSAGE_LIGHTING to "Evite reflexos e iluminação extrema.",
      Liveness3DTextKey.RETRY_MESSAGE_CONTRAST to "Limpe Sua Câmera",
      Liveness3DTextKey.RETRY_YOUR_PICTURE to "Sua foto",
      Liveness3DTextKey.RETRY_IDEAL_PICTURE to "Foto ideal",
      Liveness3DTextKey.RETRY_BUTTON to "Tentar novamente",

      Liveness3DTextKey.RESULT_UPLOAD_MESSAGE to "Enviando...",
      Liveness3DTextKey.RESULT_SUCCESS_MESSAGE to "Sucesso",

      Liveness3DTextKey.FEEDBACK_CENTER_FACE to "Centralize Seu Rosto",
      Liveness3DTextKey.FEEDBACK_FACE_NOT_FOUND to "Enquadre o Seu Rosto",
      Liveness3DTextKey.FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD to "Olhe Para Frente",
      Liveness3DTextKey.FEEDBACK_FACE_NOT_UPRIGHT to "Mantenha a Cabeça Reta",
      Liveness3DTextKey.FEEDBACK_HOLD_STEADY to "Segure Firme",
      Liveness3DTextKey.FEEDBACK_MOVE_PHONE_AWAY to "Afaste-se",
      Liveness3DTextKey.FEEDBACK_MOVE_PHONE_CLOSER to "Aproxime-se",
      Liveness3DTextKey.FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL to "Telefone ao Nível dos Olhos",
      Liveness3DTextKey.FEEDBACK_USE_EVEN_LIGHTING to "Ilumine Seu Rosto Uniformemente",

      Liveness3DTextKey.FEEDBACK_FRAME_YOUR_FACE to "Encaixe Seu Rosto no Espaço Oval",
      Liveness3DTextKey.FEEDBACK_HOLD_STEADY_1 to "Aguente Firme: 1",
      Liveness3DTextKey.FEEDBACK_HOLD_STEADY_2 to "Aguente Firme: 2",
      Liveness3DTextKey.FEEDBACK_HOLD_STEADY_3 to "Aguente Firme: 3",
      Liveness3DTextKey.FEEDBACK_EYES_STRAIGHT_AHEAD to "Olhe Para Frente",
      Liveness3DTextKey.FEEDBACK_REMOVE_DARK_GLASSES to "Tire Seus Óculos de Sol",
      Liveness3DTextKey.FEEDBACK_NEUTRAL_EXPRESSION to "Fique Neutro, Não Sorria",
      Liveness3DTextKey.FEEDBACK_CONDITIONS_TOO_BRIGHT to "Ambiente Muito Iluminado",
      Liveness3DTextKey.FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT to "Ambiente Muito Escuro",
    )

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
      return;
    }

    mLiveness3dPromisse = promise

      try {
        val liveness3DUser = Liveness3DUser(appKey = appKey, ENVIRONMENT3D.HML, null)
        val intent = Intent(getCurrentActivity(), HybridLiveness3DActivity::class.java).apply {
          putExtra(HybridLiveness3DActivity.PARAM_LIVENESS3D_USER, liveness3DUser)
          putExtra(HybridLiveness3DActivity.PARAM_TEXTS, texts)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_BACKGROUND, backgroundColor)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SPINNER_COLOR, loadingColor)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SIZE, size)
          if(type == "default"){
            putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_TYPE, LoadingType3D.ACTIVITY_INDICATOR)
          }else{
            putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_TYPE, LoadingType3D.SPINNER)
          }
        }
        getCurrentActivity()?.startActivityForResult(intent, LIVENESS3D_REQUEST)
      } catch (e: Exception) {
        mLiveness3dPromisse?.reject(E_FAILED_TO_SHOW_PICKER, e)
        mLiveness3dPromisse = null
      }


  }



  companion object {
    const val NAME = "RnLiveness3d"
  }
}
