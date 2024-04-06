export const splitBySpaces = (string) => string.split("/").map((word, i, arr) => (
  <span key={i}>{`${word.trim()}${arr.length - i !== 1 ? "/" : ""}`}</span>
));