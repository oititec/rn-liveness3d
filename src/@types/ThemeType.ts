export type ThemeType = {
  /* Guidance */
  guidanceCustomizationBackgroundColors?: string;
  guidanceCustomizationForegroundColor?: string;

  /* Button */
  guidanceCustomizationButtonTextNormalColor?: string;
  guidanceCustomizationButtonBackgroundNormalColor?: string;
  guidanceCustomizationButtonTextHighlightColor?: string;
  guidanceCustomizationButtonBackgroundHighlightColor?: string;
  guidanceCustomizationButtonTextDisabledColor?: string;
  guidanceCustomizationButtonBackgroundDisabledColor?: string;
  guidanceCustomizationButtonBorderColor?: string;
  guidanceCustomizationButtonBorderWidth?: number;
  guidanceCustomizationButtonCornerRadius?: number;

  /* Ready Screen */
  guidanceCustomizationReadyScreenHeaderTextColor?: string;
  guidanceCustomizationReadyScreenSubtextTextColor?: string;

  /* Retry Screen */
  guidanceCustomizationRetryScreenHeaderTextColor?: string;
  guidanceCustomizationRetryScreenSubtextTextColor?: string;
  guidanceCustomizationRetryScreenImageBorderColor?: string;
  guidanceCustomizationRetryScreenImageBorderWidth?: number;
  guidanceCustomizationRetryScreenImageCornerRadius?: number;
  guidanceCustomizationRetryScreenOvalStrokeColor?: string;
  guidanceCustomizationReadyScreenOvalFillColor?: string;
  guidanceCustomizationReadyScreenTextBackgroundColor?: string;
  guidanceCustomizationReadyScreenTextBackgroundCornerRadius?: string;

  /* Result Screen */
  resultScreenCustomizationForegroundColor?: string;
  resultScreenCustomizationBackgroundColors?: string;
  resultScreenCustomizationActivityIndicatorColor?: string;
  resultScreenCustomizationCustomActivityIndicatorRotationInterval?: string;
  resultScreenCustomizationUploadProgressFillColor?: string;
  resultScreenCustomizationUploadProgressTrackColor?: string;
  resultScreenCustomizationResultAnimationBackgroundColor?: string;
  resultScreenCustomizationResultAnimationForegroundColor?: string;

  /* Oval */
  ovalCustomizationStrokeWidth?: number;
  ovalCustomizationStrokeColor?: string;
  ovalCustomizationProgressStrokeWidth?: number;
  ovalCustomizationProgressColor1?: string;
  ovalCustomizationProgressColor2?: string;
  ovalCustomizationProgressRadialOffset?: string;

  /* Frame */
  frameCustomizationBorderWidth?: number;
  frameCustomizationCornerRadius?: number;
  frameCustomizationBorderColor?: string;
  frameCustomizationBackgroundColor?: string;
  frameCustomizationElevation?: string;

  /* Overlay */
  overlayCustomizationBackgroundColor?: string;

  /* Feedback */
  feedbackCustomizationCornerRadius?: number;
  feedbackCustomizationBackgroundColors?: string;
  feedbackCustomizationTextColor?: string;
};
