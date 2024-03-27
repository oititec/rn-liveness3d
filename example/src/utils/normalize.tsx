import { Platform, PixelRatio } from 'react-native';

export function normalize(size: any, scale: any) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return size;
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 10;
  }
}
