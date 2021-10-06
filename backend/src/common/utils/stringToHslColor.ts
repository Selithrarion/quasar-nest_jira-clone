export default function stringToHslColor(string: string, saturation = 50, lightness = 80): string {
  let hash = 0;
  const shortString = string.slice(0, 100);

  for (let i = 0; i < shortString.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
}
