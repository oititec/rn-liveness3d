package br.com.oiti.rnliveness3d.theme

import br.com.oiti.liveness3d.data.model.Liveness3DFontsKey

class Liveness3DFonts(private val fontsBuilder: Map<String, String?>?) {
  private val guidanceCustomizationHeaderFont: String =
    fontsBuilder?.get("guidanceCustomizationHeaderFont")?.lowercase() + ".ttf"
  private val guidanceCustomizationSubtextFont: String =
    ("fonts/" + fontsBuilder?.get("guidanceCustomizationSubtextFont")?.lowercase() + ".ttf")
  private val readyScreenCustomizationHeaderFont: String =
    ("fonts/" + fontsBuilder?.get("readyScreenCustomizationHeaderFont")?.lowercase() + ".ttf")
  private val readyScreenCustomizationSubtextFont: String =
    ("fonts/" + fontsBuilder?.get("readyScreenCustomizationSubtextFont")?.lowercase() + ".ttf")
  private val retryScreenCustomizationHeaderFont: String =
    ("fonts/" + fontsBuilder?.get("retryScreenCustomizationHeaderFont")?.lowercase() + ".ttf")
  private val retryScreenCustomizationSubtextFont: String =
    ("fonts/" + fontsBuilder?.get("retryScreenCustomizationSubtextFont")?.lowercase() + ".ttf")
  private val resultScreenCustomizationMessageFont: String =
    ("fonts/" + fontsBuilder?.get("resultScreenCustomizationMessageFont")?.lowercase() + ".ttf")
  private val guidanceCustomizationButtonFont: String =
    ("fonts/" + fontsBuilder?.get("guidanceCustomizationButtonFont")?.lowercase() + ".ttf")
  private val feedbackCustomizationTextFont: String =
    ("fonts/" + fontsBuilder?.get("feedbackCustomizationTextFont")?.lowercase() + ".ttf")

  fun apply(): HashMap<Liveness3DFontsKey, String> {
    return hashMapOf(
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_HEADER_FONT to guidanceCustomizationHeaderFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_SUBTEXT_FONT to guidanceCustomizationSubtextFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_READY_SCREEN_HEADER_FONT to readyScreenCustomizationHeaderFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_READY_SCREEN_SUBTEXT_FONT to readyScreenCustomizationSubtextFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_RETRY_SCREEN_HEADER_FONT to retryScreenCustomizationHeaderFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_RETRY_SCREEN_SUBTEXT_FONT to retryScreenCustomizationSubtextFont,
      Liveness3DFontsKey.RESULT_SCREEN_CUSTOMIZATION_MESSAGE_FONT to resultScreenCustomizationMessageFont,
      Liveness3DFontsKey.GUIDANCE_CUSTOMIZATION_BUTTON_FONT to guidanceCustomizationButtonFont,
      Liveness3DFontsKey.FEEDBACK_CUSTOMIZATION_TEXT_FONT to feedbackCustomizationTextFont,
    )
  }
}
