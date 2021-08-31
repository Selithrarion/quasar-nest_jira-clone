export default function stringToHslColor(string: string, saturation = 50, lightness = 80): string {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}
