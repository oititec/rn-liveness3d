package br.com.oiti.rnliveness3d.theme

import br.com.oiti.liveness3d.theme.Liveness3DTheme

class Liveness3DTheme(
  private var themeBuilder: Map<String, String?>?,
) {
  private fun parseIntThemeValue(key: String): Int? {
    val raw = themeBuilder?.get(key)?.trim()?.takeIf { it.isNotEmpty() } ?: return null
    return raw.toIntOrNull() ?: raw.toDoubleOrNull()?.toInt()
  }

  private val guidanceCustomizationBackgroundColors: String? =
    themeBuilder?.get("guidanceCustomizationBackgroundColors")
  private val guidanceCustomizationForegroundColor: String? =
    themeBuilder?.get("guidanceCustomizationForegroundColor")

  private val guidanceCustomizationButtonTextNormalColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonTextNormalColor")
  private val guidanceCustomizationButtonBackgroundNormalColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonBackgroundNormalColor")
  private val guidanceCustomizationButtonTextHighlightColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonTextHighlightColor")
  private val guidanceCustomizationButtonBackgroundHighlightColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonBackgroundHighlightColor")
  private val guidanceCustomizationButtonTextDisabledColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonTextDisabledColor")
  private val guidanceCustomizationButtonBackgroundDisabledColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonBackgroundDisabledColor")
  private val guidanceCustomizationButtonBorderColor: String? =
    themeBuilder?.get("guidanceCustomizationButtonBorderColor")
  private val guidanceCustomizationButtonBorderWidth: Int? =
    parseIntThemeValue("guidanceCustomizationButtonBorderWidth")
  private val guidanceCustomizationButtonCornerRadius: Int? =
    parseIntThemeValue("guidanceCustomizationButtonCornerRadius")

  private val guidanceCustomizationReadyScreenHeaderTextColor: String? =
    themeBuilder?.get("guidanceCustomizationReadyScreenHeaderTextColor")
  private val guidanceCustomizationReadyScreenSubtextTextColor: String? =
    themeBuilder?.get("guidanceCustomizationReadyScreenSubtextTextColor")

  private val guidanceCustomizationRetryScreenHeaderTextColor: String? =
    themeBuilder?.get("guidanceCustomizationRetryScreenHeaderTextColor")
  private val guidanceCustomizationRetryScreenSubtextTextColor: String? =
    themeBuilder?.get("guidanceCustomizationRetryScreenSubtextTextColor")
  private val guidanceCustomizationReadyScreenOvalFillColor: String? =
    themeBuilder?.get("guidanceCustomizationReadyScreenOvalFillColor")
  private val guidanceCustomizationReadyScreenTextBackgroundColor: String? =
    themeBuilder?.get("guidanceCustomizationReadyScreenTextBackgroundColor")
  private val guidanceCustomizationReadyScreenTextBackgroundCornerRadius: Int? =
    parseIntThemeValue("guidanceCustomizationReadyScreenTextBackgroundCornerRadius")
  private val guidanceCustomizationRetryScreenImageBorderColor: String? =
    themeBuilder?.get("guidanceCustomizationRetryScreenImageBorderColor")
  private val guidanceCustomizationRetryScreenImageBorderWidth: Int? =
    parseIntThemeValue("guidanceCustomizationRetryScreenImageBorderWidth")
  private val guidanceCustomizationRetryScreenImageCornerRadius: Int? =
    parseIntThemeValue("guidanceCustomizationRetryScreenImageCornerRadius")
  private val guidanceCustomizationRetryScreenOvalStrokeColor: String? =
    themeBuilder?.get("guidanceCustomizationRetryScreenOvalStrokeColor")

  private val resultScreenCustomizationForegroundColor: String? =
    themeBuilder?.get("resultScreenCustomizationForegroundColor")
  private val resultScreenCustomizationBackgroundColors: String? =
    themeBuilder?.get("resultScreenCustomizationBackgroundColors")
  private val resultScreenCustomizationActivityIndicatorColor: String? =
    themeBuilder?.get("resultScreenCustomizationActivityIndicatorColor")
  private val resultScreenCustomizationUploadProgressFillColor: String? =
    themeBuilder?.get("resultScreenCustomizationUploadProgressFillColor")
  private val resultScreenCustomizationUploadProgressTrackColor: String? =
    themeBuilder?.get("resultScreenCustomizationUploadProgressTrackColor")
  private val resultScreenCustomizationResultAnimationBackgroundColor: String? =
    themeBuilder?.get("resultScreenCustomizationResultAnimationBackgroundColor")
  private val resultScreenCustomizationResultAnimationForegroundColor: String? =
    themeBuilder?.get("resultScreenCustomizationResultAnimationForegroundColor")

  private val ovalCustomizationStrokeWidth: Int? =
    parseIntThemeValue("ovalCustomizationStrokeWidth")
  private val ovalCustomizationStrokeColor: String? =
    themeBuilder?.get("ovalCustomizationStrokeColor")
  private val ovalCustomizationProgressStrokeWidth: Int? =
    parseIntThemeValue("ovalCustomizationProgressStrokeWidth")
  private val ovalCustomizationProgressColor1: String? =
    themeBuilder?.get("ovalCustomizationProgressColor1")
  private val ovalCustomizationProgressColor2: String? =
    themeBuilder?.get("ovalCustomizationProgressColor2")
  private val ovalCustomizationProgressRadialOffset: Int? =
    parseIntThemeValue("ovalCustomizationProgressRadialOffset")

  private val frameCustomizationBorderWidth: Int? =
    parseIntThemeValue("frameCustomizationBorderWidth")
  private val frameCustomizationCornerRadius: Int? =
    parseIntThemeValue("frameCustomizationCornerRadius")
  private val frameCustomizationBorderColor: String? =
    themeBuilder?.get("frameCustomizationBorderColor")
  private val frameCustomizationBackgroundColor: String? =
    themeBuilder?.get("frameCustomizationBackgroundColor")
  private val frameCustomizationElevation: Int? =
    parseIntThemeValue("frameCustomizationElevation")

  private val overlayCustomizationBackgroundColor: String? =
    themeBuilder?.get("overlayCustomizationBackgroundColor")

  private val feedbackCustomizationCornerRadius: Int? =
    parseIntThemeValue("feedbackCustomizationCornerRadius")
  private val feedbackCustomizationBackgroundColors: String? =
    themeBuilder?.get("feedbackCustomizationBackgroundColors")
  private val feedbackCustomizationTextColor: String? =
    themeBuilder?.get("feedbackCustomizationTextColor")


  fun apply(): Liveness3DTheme {
    val builder = Liveness3DTheme.Builder()

    guidanceCustomizationBackgroundColors?.let { builder.guidanceCustomizationBackgroundColors(it) }
    guidanceCustomizationForegroundColor?.let { builder.guidanceCustomizationForegroundColor(it) }
    guidanceCustomizationButtonTextNormalColor?.let { builder.guidanceCustomizationButtonTextNormalColor(it) }
    guidanceCustomizationButtonBackgroundNormalColor?.let { builder.guidanceCustomizationButtonBackgroundNormalColor(it) }
    guidanceCustomizationButtonTextHighlightColor?.let { builder.guidanceCustomizationButtonTextHighlightColor(it) }
    guidanceCustomizationButtonBackgroundHighlightColor?.let { builder.guidanceCustomizationButtonBackgroundHighlightColor(it) }
    guidanceCustomizationButtonTextDisabledColor?.let { builder.guidanceCustomizationButtonTextDisabledColor(it) }
    guidanceCustomizationButtonBackgroundDisabledColor?.let { builder.guidanceCustomizationButtonBackgroundDisabledColor(it) }
    guidanceCustomizationButtonBorderColor?.let { builder.guidanceCustomizationButtonBorderColor(it) }
    guidanceCustomizationButtonBorderWidth?.let { builder.guidanceCustomizationButtonBorderWidth(it) }
    guidanceCustomizationButtonCornerRadius?.let { builder.guidanceCustomizationButtonCornerRadius(it) }

    guidanceCustomizationReadyScreenHeaderTextColor?.let { builder.guidanceCustomizationReadyScreenHeaderTextColor(it) }
    guidanceCustomizationReadyScreenSubtextTextColor?.let { builder.guidanceCustomizationReadyScreenSubtextTextColor(it) }

    guidanceCustomizationRetryScreenHeaderTextColor?.let { builder.guidanceCustomizationRetryScreenHeaderTextColor(it) }
    guidanceCustomizationRetryScreenSubtextTextColor?.let { builder.guidanceCustomizationRetryScreenSubtextTextColor(it) }
    guidanceCustomizationRetryScreenImageBorderColor?.let { builder.guidanceCustomizationRetryScreenImageBorderColor(it) }
    guidanceCustomizationRetryScreenImageBorderWidth?.let { builder.guidanceCustomizationRetryScreenImageBorderWidth(it) }
    guidanceCustomizationRetryScreenImageCornerRadius?.let { builder.guidanceCustomizationRetryScreenImageCornerRadius(it) }
    guidanceCustomizationRetryScreenOvalStrokeColor?.let { builder.guidanceCustomizationRetryScreenOvalStrokeColor(it) }
    guidanceCustomizationReadyScreenOvalFillColor?.let { builder.guidanceCustomizationReadyScreenOvalFillColor(it) }
    guidanceCustomizationReadyScreenTextBackgroundColor?.let { builder.guidanceCustomizationReadyScreenTextBackgroundColor(it) }
    guidanceCustomizationReadyScreenTextBackgroundCornerRadius?.let { builder.guidanceCustomizationReadyScreenTextBackgroundCornerRadius(it) }

    resultScreenCustomizationForegroundColor?.let { builder.resultScreenCustomizationForegroundColor(it) }
    resultScreenCustomizationBackgroundColors?.let { builder.resultScreenCustomizationBackgroundColors(it) }
    resultScreenCustomizationActivityIndicatorColor?.let { builder.resultScreenCustomizationActivityIndicatorColor(it) }
    resultScreenCustomizationUploadProgressFillColor?.let { builder.resultScreenCustomizationUploadProgressFillColor(it) }
    resultScreenCustomizationUploadProgressTrackColor?.let { builder.resultScreenCustomizationUploadProgressTrackColor(it) }
    resultScreenCustomizationResultAnimationBackgroundColor?.let { builder.resultScreenCustomizationResultAnimationBackgroundColor(it) }
    resultScreenCustomizationResultAnimationForegroundColor?.let { builder.resultScreenCustomizationResultAnimationForegroundColor(it) }

    ovalCustomizationStrokeWidth?.let { builder.ovalCustomizationStrokeWidth(it) }
    ovalCustomizationStrokeColor?.let { builder.ovalCustomizationStrokeColor(it) }
    ovalCustomizationProgressStrokeWidth?.let { builder.ovalCustomizationProgressStrokeWidth(it) }
    ovalCustomizationProgressColor1?.let { builder.ovalCustomizationProgressColor1(it) }
    ovalCustomizationProgressColor2?.let { builder.ovalCustomizationProgressColor2(it) }
    ovalCustomizationProgressRadialOffset?.let { builder.ovalCustomizationProgressRadialOffset(it) }

    frameCustomizationBorderWidth?.let { builder.frameCustomizationBorderWidth(it) }
    frameCustomizationCornerRadius?.let { builder.frameCustomizationCornerRadius(it) }
    frameCustomizationBorderColor?.let { builder.frameCustomizationBorderColor(it) }
    frameCustomizationBackgroundColor?.let { builder.frameCustomizationBackgroundColor(it) }
    frameCustomizationElevation?.let { builder.frameCustomizationElevation(it) }

    overlayCustomizationBackgroundColor?.let { builder.overlayCustomizationBackgroundColor(it) }

    feedbackCustomizationCornerRadius?.let { builder.feedbackCustomizationCornerRadius(it) }
    feedbackCustomizationBackgroundColors?.let { builder.feedbackCustomizationBackgroundColors(it) }
    feedbackCustomizationTextColor?.let { builder.feedbackCustomizationTextColor(it) }

    return builder.build()
  }
}
