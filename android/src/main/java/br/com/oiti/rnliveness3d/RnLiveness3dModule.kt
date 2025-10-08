  package br.com.oiti.rnliveness3d

  import android.Manifest
  import android.app.Activity
  import android.content.Intent
  import android.content.pm.PackageManager
  import android.util.Log
  import androidx.annotation.NonNull
  import androidx.core.app.ActivityCompat
  import androidx.core.content.*

  import br.com.oiti.liveness3d.app.ui.HybridLiveness3DActivity
  import br.com.oiti.rnliveness3d.theme.Liveness3DTheme

  import br.com.oiti.liveness3d.data.model.*
  import br.com.oiti.rnliveness3d.theme.Liveness3DText

  import com.facebook.react.bridge.*
  import com.facebook.react.bridge.Promise
  import com.facebook.react.bridge.ReactApplicationContext
  import com.facebook.react.bridge.ReactContextBaseJavaModule
  import com.facebook.react.bridge.ReactMethod
  import com.facebook.react.modules.core.PermissionAwareActivity
  import org.json.JSONObject

  class RnLiveness3dModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var mLiveness3dPromisse: Promise? = null

    init {
      reactContext.addActivityEventListener(object : BaseActivityEventListener() {
        override fun onActivityResult(activity: Activity, requestCode: Int, resultCode: Int, data: Intent?) {
          if (requestCode == LIVENESS3D_REQUEST && mLiveness3dPromisse != null) {
            when (resultCode) {
              Activity.RESULT_CANCELED -> mLiveness3dPromisse!!.reject(RESULT_CANCELED,onLiveness3DResultCancelled(data))
              Activity.RESULT_OK -> mLiveness3dPromisse!!.resolve(onLiveness3DResultSuccess(data))
            }
            mLiveness3dPromisse = null
          }
        }
      })
    }

    fun onLiveness3DResultSuccess(data: Intent?): String {
      val resultMap = mutableMapOf<String, Any?>()

      resultMap["valid"] = data?.getBooleanExtra(HybridLiveness3DActivity.PARAM_RESULT_VALID, false)
      resultMap["cause"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_CAUSE)
      resultMap["codId"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_COD_ID)
      resultMap["protocol"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_PROTOCOL)
      resultMap["blob"] = data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_SCAN)

      return JSONObject(resultMap).toString()
    }

    fun onLiveness3DResultCancelled(data: Intent?): String {
      return data?.getStringExtra(HybridLiveness3DActivity.PARAM_RESULT_ERROR) ?: ""
    }
    override fun getName(): String {
      return NAME
    }
    @NonNull
    @ReactMethod
    fun startliveness3d(
      appKey: String,
      ticket: String,
      type: String,
      size: Int,
      backgroundColor: String,
      loadingColor: String,
      themeJson: ReadableMap?,
      fontsJson: ReadableMap?,
      textsJson: ReadableMap?,
      environment: String,
      promise: Promise,
    ) {
      mLiveness3dPromisse = promise
      val currentActivity = reactApplicationContext.currentActivity

      val themeBuilder = themeJson?.let { Liveness3DTheme(readableMapToMap(themeJson)).apply() }
      val fonts = fontsJson?.let { getFonts(readableMapToMap(fontsJson)) }
      val texts = textsJson?.let { Liveness3DText().getTexts(readableMapToMap(textsJson)) }

      Log.d("ENV", environment)

      if (currentActivity == null) {
        promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist")
        return;
      }
        try {
          val env: ENVIRONMENT3D = if (environment.equals("PRD")) ENVIRONMENT3D.PRD else ENVIRONMENT3D.HML
          val liveness3DUser = Liveness3DUser(appKey = appKey, env, themeBuilder)

          val intent = Intent(currentActivity, HybridLiveness3DActivity::class.java)
          intent.putExtra(HybridLiveness3DActivity.PARAM_LIVENESS3D_USER, liveness3DUser)
          if (ticket.isNotEmpty()) {
            intent.putExtra(HybridLiveness3DActivity.PARAM_TICKET, ticket)
          }
          intent.putExtra(HybridLiveness3DActivity.PARAM_TEXTS, texts)
          intent.putExtra(HybridLiveness3DActivity.PARAM_FONTS, fonts)
          intent.putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_BACKGROUND, backgroundColor)
          intent.putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SPINNER_COLOR, loadingColor)
          intent.putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_SIZE, size)
          if(type == "default"){
            intent.putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_TYPE, LoadingType3D.ACTIVITY_INDICATOR)
          }else{
            intent.putExtra(HybridLiveness3DActivity.PARAM_CUSTOM_LOADING_TYPE, LoadingType3D.SPINNER)
          }

          currentActivity.startActivityForResult(intent, LIVENESS3D_REQUEST)

        } catch (e: Exception) {
          Log.d("APPKEY_FAILED", appKey)
          mLiveness3dPromisse?.reject(E_FAILED_TO_SHOW_PICKER, e)
          mLiveness3dPromisse = null
        }
    }

    fun readableMapToMap(readableMap: ReadableMap?): Map<String, String?> {
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
            } else { Pair(key, "fonts/$value.ttf".lowercase()) }
          }
          .toMap()
        hashMap.putAll(fontsMap)
      }
      return hashMap
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

    @ReactMethod
    fun checkcamerapermission(promise: Promise) {
      val currentActivity = reactApplicationContext.currentActivity
      if (currentActivity != null) {
        if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
          promise.resolve(true)
        } else {
          promise.resolve(false)
        }
      } else {
        promise.reject("UNAVAILABLE", "Could not get current activity.")
      }
    }

    @ReactMethod
    fun askcamerapermission(promise: Promise) {
      val currentActivity = reactApplicationContext.currentActivity

      if (currentActivity != null) {
        if (ContextCompat.checkSelfPermission(currentActivity, Manifest.permission.CAMERA)
          == PackageManager.PERMISSION_GRANTED
        ) {
          promise.resolve(true)
        } else {
          if (currentActivity is PermissionAwareActivity) {
            ActivityCompat.requestPermissions(
              currentActivity,
              arrayOf(Manifest.permission.CAMERA),
              CAMERA_PERMISSION_REQUEST_CODE
            )
          } else {
            promise.resolve(false)
          }
          promise.resolve(false)
        }
      } else {
        promise.resolve(true)
      }
    }

    companion object {
      const val NAME = "RnLiveness3d"
        const val CAMERA_PERMISSION_REQUEST_CODE = 1111
        private const val LIVENESS3D_REQUEST = 1
        private const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        private const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        private val RESULT_CANCELED = "RESULT_CANCELED"
    }
  }
