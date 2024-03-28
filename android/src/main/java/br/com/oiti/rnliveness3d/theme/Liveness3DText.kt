package br.com.oiti.rnliveness3d.theme

import android.util.Log
import br.com.oiti.liveness3d.data.model.Liveness3DTextKey

class Liveness3DText {
  fun getTextKey(identifier: String): Liveness3DTextKey? {
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
  fun getTexts(textsBuilder: Map<String, String?>?): HashMap<Liveness3DTextKey, String> {
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
}
