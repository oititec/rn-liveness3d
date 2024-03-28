    package br.com.oiti.rnliveness3d.theme

    import android.content.Context
    import androidx.annotation.DrawableRes
    import br.com.oiti.liveness3d.theme.Liveness3DTheme

    class Liveness3DTheme(
        private var themeBuilder: Map<String, String?>?,
    ) {
        //Guidance customization
        private val guidanceCustomizationBackgroundColors: String? = themeBuilder?.get("guidanceCustomizationBackgroundColors") ?: "#FFFFFF"
        private val guidanceCustomizationForegroundColor: String? = themeBuilder?.get("guidanceCustomizationForegroundColor") ?: "#FFFFFF"

        //Buttons
        private val guidanceCustomizationButtonTextNormalColor: String? = themeBuilder?.get("guidanceCustomizationForegroundColor") ?: "#000000"
        private val guidanceCustomizationButtonBackgroundNormalColor: String? = themeBuilder?.get("guidanceCustomizationButtonBackgroundNormalColor") ?: "#4bb75f"

        private val guidanceCustomizationButtonTextHighlightColor: String? = themeBuilder?.get("guidanceCustomizationButtonTextHighlightColor") ?: "#000000"
        private val guidanceCustomizationButtonBackgroundHighlightColor: String? = themeBuilder?.get("guidanceCustomizationButtonBackgroundHighlightColor") ?: "#000000"
        private val guidanceCustomizationButtonTextDisabledColor: String? = themeBuilder?.get("guidanceCustomizationButtonTextDisabledColor") ?: "#333333"
        private val guidanceCustomizationButtonBackgroundDisabledColor: String? = themeBuilder?.get("guidanceCustomizationButtonBackgroundDisabledColor") ?: "#333333"
        private val guidanceCustomizationButtonBorderColor: String? = themeBuilder?.get("guidanceCustomizationButtonBorderColor") ?: "#000000"
        private val guidanceCustomizationButtonBorderWidth: Int? = themeBuilder?.get("guidanceCustomizationButtonBorderWidth")?.toInt() ?: 0
        private val guidanceCustomizationButtonCornerRadius: Int? = themeBuilder?.get("guidanceCustomizationButtonCornerRadius")?.toInt() ?: 25

        //Ready Screen
        private val guidanceCustomizationReadyScreenHeaderTextColor: String? = themeBuilder?.get("guidanceCustomizationReadyScreenHeaderTextColor") ?: "#000000"
        private val guidanceCustomizationReadyScreenSubtextTextColor: String? = themeBuilder?.get("guidanceCustomizationReadyScreenSubtextTextColor") ?: "#333333"

        //Retry Screen
        private val guidanceCustomizationRetryScreenHeaderTextColor: String? = themeBuilder?.get("guidanceCustomizationRetryScreenHeaderTextColor") ?: "#000000"
        private val guidanceCustomizationRetryScreenSubtextTextColor: String? = themeBuilder?.get("guidanceCustomizationRetryScreenSubtextTextColor") ?: "#333333"
        private val guidanceCustomizationReadyScreenOvalFillColor: String? = themeBuilder?.get("guidanceCustomizationReadyScreenOvalFillColor") ?: "#000000"
        private val guidanceCustomizationReadyScreenTextBackgroundColor: String? = themeBuilder?.get("guidanceCustomizationReadyScreenTextBackgroundColor") ?: "#4bb75f"
        private val guidanceCustomizationReadyScreenTextBackgroundCornerRadius: Int? = themeBuilder?.get("guidanceCustomizationReadyScreenTextBackgroundCornerRadius")?.toInt() ?: 0
        private val guidanceCustomizationRetryScreenImageBorderColor: String? = themeBuilder?.get("guidanceCustomizationRetryScreenImageBorderColor") ?: "#4bb75f"
        private val guidanceCustomizationRetryScreenImageBorderWidth: Int? = themeBuilder?.get("guidanceCustomizationRetryScreenImageBorderWidth")?.toInt() ?: 0
        private val guidanceCustomizationRetryScreenImageCornerRadius: Int? = themeBuilder?.get("guidanceCustomizationRetryScreenImageCornerRadius")?.toInt() ?: 3
        private val guidanceCustomizationRetryScreenOvalStrokeColor: String? = themeBuilder?.get("guidanceCustomizationRetryScreenOvalStrokeColor")  ?: "#4bb75f"

        //Result Screen Customization
        private val resultScreenCustomizationAnimationRelativeScale: Float = 1.0F
        private val resultScreenCustomizationForegroundColor: String? = themeBuilder?.get("resultScreenCustomizationForegroundColor") ?: "#FFFFFF"
        private val resultScreenCustomizationBackgroundColors: String? = themeBuilder?.get("resultScreenCustomizationBackgroundColors") ?: "#FFFFFF"
        private val resultScreenCustomizationActivityIndicatorColor: String? = themeBuilder?.get("resultScreenCustomizationActivityIndicatorColor") ?: "#FFFFFF"
        @DrawableRes
        private val resultScreenCustomizationCustomActivityIndicatorImage: Int? = null
        private val resultScreenCustomizationCustomActivityIndicatorRotationInterval: Int = 1000
        private val resultScreenCustomizationCustomActivityIndicatorAnimation: Int = 0
        private val resultScreenCustomizationShowUploadProgressBar: Boolean = true
        private val resultScreenCustomizationUploadProgressFillColor: String? = themeBuilder?.get("resultScreenCustomizationUploadProgressFillColor") ?: "#4bb75f"
        private val resultScreenCustomizationUploadProgressTrackColor: String? = themeBuilder?.get("resultScreenCustomizationUploadProgressTrackColor") ?: "#333333"
        private val resultScreenCustomizationResultAnimationBackgroundColor: String? = themeBuilder?.get("resultScreenCustomizationResultAnimationBackgroundColor") ?: "#05D758"
        private val resultScreenCustomizationResultAnimationForegroundColor: String? = themeBuilder?.get("resultScreenCustomizationResultAnimationForegroundColor") ?: "#FFFFFF"


          //Oval Customization
          private val ovalCustomizationStrokeWidth: Int? = themeBuilder?.get("ovalCustomizationStrokeWidth")?.toInt() ?: 3
          private val ovalCustomizationStrokeColor: String? = themeBuilder?.get("ovalCustomizationStrokeColor") ?: "#4bb75f"
          private val ovalCustomizationProgressStrokeWidth: Int? = themeBuilder?.get("ovalCustomizationProgressStrokeWidth")?.toInt() ?: 2
          private val ovalCustomizationProgressColor1: String? = themeBuilder?.get("ovalCustomizationProgressColor1") ?: "#4bb75f"
          private val ovalCustomizationProgressColor2: String? = themeBuilder?.get("ovalCustomizationProgressColor2") ?: "#4bb75f"
          private val ovalCustomizationProgressRadialOffset: Int? = themeBuilder?.get("ovalCustomizationProgressRadialOffset")?.toInt() ?: 2

          //Frame Customization
          private val frameCustomizationBorderWidth: Int? = themeBuilder?.get("frameCustomizationBorderWidth")?.toInt() ?: 0
          private val frameCustomizationCornerRadius: Int? = themeBuilder?.get("frameCustomizationCornerRadius")?.toInt() ?: 0
          private val frameCustomizationBorderColor: String? = themeBuilder?.get("frameCustomizationBorderColor") ?: "#4bb75f"
          private val frameCustomizationBackgroundColor: String? = themeBuilder?.get("frameCustomizationBackgroundColor") ?: "#FFFFFF"
          private val frameCustomizationElevation: Int? = themeBuilder?.get("frameCustomizationElevation")?.toInt() ?: 0

          //Overlay Customization
          private val overlayCustomizationBackgroundColor: String? = themeBuilder?.get("overlayCustomizationBackgroundColor") ?: "#FFFFFF"

          //Feedback Customization
          private val feedbackCustomizationCornerRadius: Int? = themeBuilder?.get("feedbackCustomizationCornerRadius")?.toInt() ?: 2
          private val feedbackCustomizationBackgroundColors: String? = themeBuilder?.get("overlayCustomizationBackgroundColor") ?: "#666666"
          private val feedbackCustomizationTextColor: String? = themeBuilder?.get("feedbackCustomizationTextColor") ?: "#FFFFFF"


         fun apply(): Liveness3DTheme {
            return Liveness3DTheme.Builder()
                .guidanceCustomizationBackgroundColors(guidanceCustomizationBackgroundColors)
                .guidanceCustomizationForegroundColor(guidanceCustomizationForegroundColor)
                //Botões
                .guidanceCustomizationButtonTextNormalColor(guidanceCustomizationButtonTextNormalColor)
                .guidanceCustomizationButtonBackgroundNormalColor(guidanceCustomizationButtonBackgroundNormalColor)
                .guidanceCustomizationButtonTextHighlightColor(guidanceCustomizationButtonTextHighlightColor)
                .guidanceCustomizationButtonBackgroundHighlightColor(guidanceCustomizationButtonBackgroundHighlightColor)
                .guidanceCustomizationButtonTextDisabledColor(guidanceCustomizationButtonTextDisabledColor)
                .guidanceCustomizationButtonBackgroundDisabledColor(guidanceCustomizationButtonBackgroundDisabledColor)
                .guidanceCustomizationButtonBorderColor(guidanceCustomizationButtonBorderColor)
                .guidanceCustomizationButtonBorderWidth(guidanceCustomizationButtonBorderWidth)
                .guidanceCustomizationButtonCornerRadius(guidanceCustomizationButtonCornerRadius)


                //Ready Screen
                .guidanceCustomizationReadyScreenHeaderTextColor(guidanceCustomizationReadyScreenHeaderTextColor)
                .guidanceCustomizationReadyScreenSubtextTextColor(guidanceCustomizationReadyScreenSubtextTextColor)

                //Retry Screen
                .guidanceCustomizationRetryScreenHeaderTextColor(guidanceCustomizationRetryScreenHeaderTextColor)
                .guidanceCustomizationRetryScreenSubtextTextColor(guidanceCustomizationRetryScreenSubtextTextColor)
                .guidanceCustomizationRetryScreenImageBorderColor(guidanceCustomizationRetryScreenImageBorderColor)
                .guidanceCustomizationRetryScreenImageBorderWidth(guidanceCustomizationRetryScreenImageBorderWidth)
                .guidanceCustomizationRetryScreenImageCornerRadius(guidanceCustomizationRetryScreenImageCornerRadius)
                .guidanceCustomizationRetryScreenOvalStrokeColor(guidanceCustomizationRetryScreenOvalStrokeColor)
                .guidanceCustomizationReadyScreenOvalFillColor(guidanceCustomizationReadyScreenOvalFillColor)
                .guidanceCustomizationReadyScreenTextBackgroundColor(guidanceCustomizationReadyScreenTextBackgroundColor)
                .guidanceCustomizationReadyScreenTextBackgroundCornerRadius(guidanceCustomizationReadyScreenTextBackgroundCornerRadius)

                //Result Screen
                .resultScreenCustomizationAnimationRelativeScale(resultScreenCustomizationAnimationRelativeScale)
                .resultScreenCustomizationForegroundColor(resultScreenCustomizationForegroundColor)
                .resultScreenCustomizationBackgroundColors(resultScreenCustomizationBackgroundColors)
                .resultScreenCustomizationActivityIndicatorColor(resultScreenCustomizationActivityIndicatorColor)
                .resultScreenCustomizationUploadProgressFillColor(resultScreenCustomizationUploadProgressFillColor)
                .resultScreenCustomizationUploadProgressTrackColor(resultScreenCustomizationUploadProgressTrackColor)
                .resultScreenCustomizationResultAnimationBackgroundColor(resultScreenCustomizationResultAnimationBackgroundColor)
                .resultScreenCustomizationResultAnimationForegroundColor(resultScreenCustomizationResultAnimationForegroundColor)

                //Oval
                .ovalCustomizationStrokeWidth(ovalCustomizationStrokeWidth)
                .ovalCustomizationStrokeColor(ovalCustomizationStrokeColor)
                .ovalCustomizationProgressStrokeWidth(ovalCustomizationProgressStrokeWidth)
                .ovalCustomizationProgressColor1(ovalCustomizationProgressColor1)
                .ovalCustomizationProgressColor2(ovalCustomizationProgressColor2)
                .ovalCustomizationProgressRadialOffset(ovalCustomizationProgressRadialOffset)

                //Frame
                .frameCustomizationBorderWidth(frameCustomizationBorderWidth)
                .frameCustomizationCornerRadius(frameCustomizationCornerRadius)
                .frameCustomizationBorderColor(frameCustomizationBorderColor)
                .frameCustomizationBackgroundColor(frameCustomizationBackgroundColor)
                .frameCustomizationElevation(frameCustomizationElevation)

                //Overlay
                .overlayCustomizationBackgroundColor(overlayCustomizationBackgroundColor)

                //Feedback Screen
                .feedbackCustomizationCornerRadius(feedbackCustomizationCornerRadius)
                .feedbackCustomizationBackgroundColors(feedbackCustomizationBackgroundColors)
                .feedbackCustomizationTextColor(feedbackCustomizationTextColor)

                .build()
        }
    }
