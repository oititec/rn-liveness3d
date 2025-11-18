package br.com.oiti.rnliveness3d

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import android.util.Log
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import br.com.oiti.liveness3d.app.ui.HybridLiveness3DActivity
import br.com.oiti.liveness3d.data.model.ENVIRONMENT3D
import br.com.oiti.liveness3d.data.model.Liveness3DFontsKey
import br.com.oiti.liveness3d.data.model.Liveness3DUser
import br.com.oiti.liveness3d.data.model.LoadingType3D
import br.com.oiti.rnliveness3d.theme.Liveness3DText
import br.com.oiti.rnliveness3d.theme.Liveness3DTheme
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import org.json.JSONObject

@ReactModule(name = RnLiveness3dModule.NAME)
class RnLiveness3dModule(reactContext: ReactApplicationContext) :
  NativeRnLiveness3dSpec(reactContext) {
  private var liveness3dPromise: Promise? = null
  private var cameraPermissionCallback: Callback? = null

  init {
    reactContext.addActivityEventListener(object : BaseActivityEventListener() {
      override fun onActivityResult(
        activity: Activity,
        requestCode: Int,
        resultCode: Int,
        data: Intent?
      ) {
        handleActivityResult(requestCode = requestCode, resultCode = resultCode, data = data)
      }
    })
  }

  /**
   * Spec methods
   */

  override fun getName(): String {
    return NAME
  }

  override fun checkCameraPermissionGranted(): Boolean {
    val permission =
      ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.CAMERA)
    return permission == PackageManager.PERMISSION_GRANTED
  }

  override fun requestCameraPermission(resolve: Callback?) {
    val activity = reactApplicationContext.currentActivity ?: run {
      resolve?.invoke(false)
      return
    }

    val permissionGranted = checkCameraPermissionGranted()
    if (permissionGranted) {
      resolve?.invoke(true)
      return
    }

    ActivityCompat.requestPermissions(
      activity,
      arrayOf(Manifest.permission.CAMERA),
      CAMERA_PERMISSION_REQUEST_CODE
    )
    resolve?.invoke(false)
  }

  override fun startLiveness3d(args: ReadableMap?, promise: Promise?) {
    liveness3dPromise = promise

    val currentActivity = reactApplicationContext.currentActivity ?: run {
      promise?.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
      return
    }

    val appKey = args?.getString(name = "appkey") ?: ""
    val environmentString = args?.getString(name = "environment") ?: "HML"
    val themeMap = args?.getMap(name = "theme")
    val fontsMap = args?.getMap(name = "fonts")
    val textsMap = args?.getMap(name = "liveness3Dtext")
    val loadingMap = args?.getMap(name = "loading")

    val themeBuilder = themeMap?.let { Liveness3DTheme(readableMapToMap(it)).apply() }
    val fonts = fontsMap?.let { getFonts(readableMapToMap(it)) }
    val texts = textsMap?.let { Liveness3DText().getTexts(readableMapToMap(it)) }

    val loadingTypeString = loadingMap?.getString(name = "type") ?: "default"
    val loadingType =
      if (loadingTypeString == "default") LoadingType3D.ACTIVITY_INDICATOR else LoadingType3D.SPINNER
    val loadingColor = loadingMap?.getString(name = "loadingColor") ?: "#000000"
    val loadingBackground = loadingMap?.getString(name = "backgroundColor") ?: "#FFFFFF"
    val loadingSize = when(loadingMap?.hasKey(name = "size")) {
      true -> loadingMap.getInt(name = "size")
      else -> 10
    }

    Log.d("ENV", environmentString)
    Log.d("ENV", appKey)

    try {
      val environment = if (environmentString == "PRD") ENVIRONMENT3D.PRD else ENVIRONMENT3D.HML
      val liveness3DUser = Liveness3DUser(
        appKey = appKey,
        environment = environment,
        liveness3DTheme = themeBuilder
      )

      val intent = Intent(currentActivity, HybridLiveness3DActivity::class.java).apply {
        putExtra(HybridLiveness3DActivity.PARAM_LIVENESS3D_USER, liveness3DUser)
        putExtra(HybridLiveness3DActivity.PARAM_TEXTS, texts)
        putExtra(HybridLiveness3DActivity.PARAM_FONTS, fonts)

        putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_TYPE, loadingType)
        putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SPINNER_COLOR, loadingColor)
        putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_BACKGROUND, loadingBackground)
        putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SIZE, loadingSize)
      }

      currentActivity.startActivityForResult(intent, LIVENESS3D_REQUEST)
    } catch (e: Exception) {
      Log.d("APPKEY_FAILED", appKey)
      liveness3dPromise?.reject(E_FAILED_TO_SHOW_PICKER, e)
      liveness3dPromise = null
    }
  }

  /**
   * Private methods
   */

  private fun handleActivityResult(
    requestCode: Int,
    resultCode: Int,
    data: Intent?
  ) {
    when (requestCode) {
      LIVENESS3D_REQUEST -> {
        liveness3dPromise?.let {
          when (resultCode) {
            Activity.RESULT_OK -> it.resolve(onLivenessSuccess(data))
            Activity.RESULT_CANCELED -> it.reject(RESULT_CANCELED, onLivenessCancelled(data))
          }
          liveness3dPromise = null
        }
      }

      CAMERA_PERMISSION_REQUEST_CODE -> {
        cameraPermissionCallback?.let {
          when (resultCode) {
            Activity.RESULT_OK -> it.invoke(checkCameraPermissionGranted())
            Activity.RESULT_CANCELED -> it.invoke(false)
          }
          cameraPermissionCallback = null
        }
      }
    }
  }

  private fun onLivenessSuccess(data: Intent?): String {
    val resultMap = mutableMapOf<String, Any?>()

    resultMap["valid"] = data?.getBooleanExtra(HybridLiveness3DActivity.PARAM_RESULT_VALID, false)
    resultMap["cause"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_CAUSE)
    resultMap["codId"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_COD_ID)
    resultMap["protocol"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_PROTOCOL)
    resultMap["blob"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_SCAN)

    return JSONObject(resultMap).toString()
  }

  private fun onLivenessCancelled(data: Intent?): String {
    return data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_ERROR) ?: ""
  }

  private fun readableMapToMap(readableMap: ReadableMap?): Map<String, String?> {
    val map = mutableMapOf<String, String?>()
    readableMap?.let {
      val iterator = it.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        val value = it.getString(key)
        map[key] = value
      }
    }
    return map
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
          } else {
            Pair(key, "fonts/$value.ttf".lowercase())
          }
        }
        .toMap()
      hashMap.putAll(fontsMap)
    }
    return hashMap
  }

  private fun getFontKey(identifier: String): Liveness3DFontsKey? {
    return when (identifier) {
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

  companion object {
    const val NAME = "RnLiveness3d"
    private const val CAMERA_PERMISSION_REQUEST_CODE = 100
    private const val LIVENESS3D_REQUEST = 1
    private const val RESULT_CANCELED = "RESULT_CANCELED"
    private const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
    private const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
  }
}
