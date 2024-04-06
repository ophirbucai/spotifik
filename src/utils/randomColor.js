export const randomColor = {
  hex: () => Math.floor(Math.random() * 16777215).toString(16),
  rgb: () => {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return [r, g, b];
  }
};

export const generateRandomColors = (quantity = 80, forceGenerate = false) => {
  let colors = JSON.parse(localStorage.getItem("colors"));
  if (!colors || forceGenerate) {
    colors = Array(quantity).fill(null).map(randomColor.rgb);
    localStorage.setItem("colors", JSON.stringify(colors));
  }
  return colors;
};