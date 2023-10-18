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
import br.com.oiti.liveness3d.data.model.*
import br.com.oiti.security.observability.firebase.FirebaseEvents
import com.facebook.react.bridge.*
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.lang.ref.WeakReference

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
  fun startliveness3d(
    appKey: String,
    environment: String?,
    loadingAppearance: Map<String, String?>?,
    themeBuilder: Map<String, String?>?,
    textsBuilder: Map<String, String?>?,
    promise: Promise
    ) {

    val currentActivity = currentActivity
    val texts = getTexts(textsBuilder)

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
      return;
    }

    val loadingColor = (loadingAppearance?.get("foreground") ?: "#05D758") as String
    val loadingBackgroundColor = (loadingAppearance?.get("background") ?: "#FFFFFF") as String
    val loadingSize = (loadingAppearance?.get("size") ?: 1) as Int
    val loadingType = getLoadingType((loadingAppearance?.get("type") ?: "") as String)

    mLiveness3dPromisse = promise

      try {
        val liveness3DUser = Liveness3DUser(appKey = appKey, ENVIRONMENT3D.HML, null)
        val intent = Intent(getCurrentActivity(), HybridLiveness3DActivity::class.java).apply {
          putExtra(HybridLiveness3DActivity.PARAM_LIVENESS3D_USER, liveness3DUser)
          putExtra(HybridLiveness3DActivity.PARAM_TEXTS, texts)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_BACKGROUND, loadingBackgroundColor)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SPINNER_COLOR, loadingColor)
          putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SIZE, loadingSize)
          if(loadingType == "default"){
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

  private fun getFontKey(identifier: String): Liveness3DFontsKey? {
    return when(identifier) {
      /* Guidance */
      "guidanceCustomizationHeaderFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_HEADER_FONT
      "guidanceCustomizationSubtextFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_SUBTEXT_FONT
      /* Button */
      "guidanceCustomizationButtonFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_BUTTON_FONT

      /* Ready Screen */
      "readyScreenCustomizationHeaderFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_READY_SCREEN_HEADER_FONT
      "readyScreenCustomizationSubtextFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_READY_SCREEN_SUBTEXT_FONT
      /* Retry Screen */
      "retryScreenCustomizationHeaderFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_RETRY_SCREEN_HEADER_FONT
      "retryScreenCustomizationSubtextFont" -> Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_RETRY_SCREEN_SUBTEXT_FONT
      /* Result Screen */
      "resultScreenCustomizationMessageFont" -> Liveness3DFontsKey.RESULT_SCREEN_CUSTOMIZATION_MESSAGE_FONT
      /* Feedback */
      "feedbackCustomizationTextFont" -> Liveness3DFontsKey.FEEDBACK_CUSTOMIZATION_TEXT_FONT
      else -> null
    }
  }

  private fun getFonts(fontsBuilder: Map<String, String?>?): HashMap<Liveness3DFontsKey?, String?> {
    val hashMap = HashMap<Liveness3DFontsKey?, String?>()
    if (fontsBuilder != null) {
      val fontsMap = fontsBuilder
        .mapNotNull {
          val key = getFontKey(it.key)
          val value = it.value
          if (value?.isEmpty() == true) {
            null
          } else { Pair(key, "fonts/$value.ttf".lowercase()) }
        }
        .toMap()
      hashMap.putAll(fontsMap)
      Log.d("HASH AQUII", hashMap.toString())
    }
    return hashMap
  }

  private fun getTextKey(identifier: String): Liveness3DTextKey? {
    return when(identifier) {
      /* Ready */
      "READY_HEADER_1" -> Liveness3DTextKey.READY_HEADER_1
      "READY_HEADER_2" -> Liveness3DTextKey.READY_HEADER_2
      "READY_MESSAGE_1" -> Liveness3DTextKey.READY_MESSAGE_1
      "READY_MESSAGE_2" -> Liveness3DTextKey.READY_MESSAGE_2
      "READY_BUTTON" -> Liveness3DTextKey.READY_BUTTON

      /* Retry */
      "RETRY_HEADER" -> Liveness3DTextKey.RETRY_HEADER
      "RETRY_SUBHEADER" -> Liveness3DTextKey.RETRY_SUBHEADER
      "RETRY_MESSAGE_SMILE" -> Liveness3DTextKey.RETRY_MESSAGE_SMILE
      "RETRY_MESSAGE_LIGHTING" -> Liveness3DTextKey.RETRY_MESSAGE_LIGHTING
      "RETRY_MESSAGE_CONTRAST" -> Liveness3DTextKey.RETRY_MESSAGE_CONTRAST
      "RETRY_YOUR_PICTURE" -> Liveness3DTextKey.RETRY_YOUR_PICTURE
      "RETRY_IDEAL_PICTURE" -> Liveness3DTextKey.RETRY_IDEAL_PICTURE
      "RETRY_BUTTON" -> Liveness3DTextKey.RETRY_BUTTON

      /* Result */
      "RESULT_UPLOAD_MESSAGE" -> Liveness3DTextKey.RESULT_UPLOAD_MESSAGE
      "RESULT_SUCCESS_MESSAGE" -> Liveness3DTextKey.RESULT_SUCCESS_MESSAGE

      /* Feedback */
      "FEEDBACK_POSITION_FACE_STRAIGHT_IN_OVAL" -> Liveness3DTextKey.FEEDBACK_LOOK_STRAIGHT_IN_OVAL
      "FEEDBACK_CENTER_FACE" -> Liveness3DTextKey.FEEDBACK_CENTER_FACE
      "FEEDBACK_FACE_NOT_FOUND" -> Liveness3DTextKey.FEEDBACK_FACE_NOT_FOUND
      "FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD" -> Liveness3DTextKey.FEEDBACK_FACE_NOT_LOOKING_STRAIGHT_AHEAD
      "FEEDBACK_FACE_NOT_UPRIGHT" -> Liveness3DTextKey.FEEDBACK_FACE_NOT_UPRIGHT
      "FEEDBACK_MOVE_PHONE_AWAY" -> Liveness3DTextKey.FEEDBACK_MOVE_PHONE_AWAY
      "FEEDBACK_MOVE_PHONE_CLOSER" -> Liveness3DTextKey.FEEDBACK_MOVE_PHONE_CLOSER
      "FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL" -> Liveness3DTextKey.FEEDBACK_MOVE_PHONE_TO_EYE_LEVEL
      "FEEDBACK_USE_EVEN_LIGHTING" -> Liveness3DTextKey.FEEDBACK_USE_EVEN_LIGHTING
      "FEEDBACK_FRAME_YOUR_FACE" -> Liveness3DTextKey.FEEDBACK_FRAME_YOUR_FACE
      "FEEDBACK_HOLD_STEADY" -> Liveness3DTextKey.FEEDBACK_HOLD_STEADY
      "FEEDBACK_HOLD_STEADY_1" -> Liveness3DTextKey.FEEDBACK_HOLD_STEADY_1
      "FEEDBACK_HOLD_STEADY_2" -> Liveness3DTextKey.FEEDBACK_HOLD_STEADY_2
      "FEEDBACK_HOLD_STEADY_3" -> Liveness3DTextKey.FEEDBACK_HOLD_STEADY_3
      "FEEDBACK_REMOVE_DARK_GLASSES" -> Liveness3DTextKey.FEEDBACK_REMOVE_DARK_GLASSES
      "FEEDBACK_NEUTRAL_EXPRESSION" -> Liveness3DTextKey.FEEDBACK_NEUTRAL_EXPRESSION
      "FEEDBACK_CONDITIONS_TOO_BRIGHT" -> Liveness3DTextKey.FEEDBACK_CONDITIONS_TOO_BRIGHT
      "FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT" -> Liveness3DTextKey.FEEDBACK_BRIGHTEN_YOUR_ENVIRONMENT
      else -> null
    }
  }
  private fun getTexts(textsBuilder: Map<String, String?>?): HashMap<Liveness3DTextKey, String> {
    val hashMap = HashMap<Liveness3DTextKey, String>()
    if (textsBuilder != null) {
      val textsMap = textsBuilder
        .mapNotNull {
          val key = getTextKey(it.key)
          val value = it.value
          if (key != null && value != null) {
            Pair(key, value)
          } else { null }
        }
        .toMap()
      hashMap.putAll(textsMap)
    }
    return hashMap
  }
  private fun getLoadingType(typeString: String): LoadingType3D {
    return when(typeString) {
      "spinner" -> LoadingType3D.SPINNER
      "activity" -> LoadingType3D.ACTIVITY_INDICATOR
      else -> LoadingType3D.ACTIVITY_INDICATOR
    }
  }
  companion object {
    const val NAME = "RnLiveness3d"
  }
}
