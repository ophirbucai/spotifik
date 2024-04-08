/**
 * For this function to work, the text element should be (display: flex) and (flex-wrap: wrap / flex-flow: row wrap);
 * @param string
 * @returns {*}
 */
export const splitBySpaces = (string) => string.split("/").map((word, i, arr) => (
  <span key={i}>{`${word.trim()}${arr.length - i !== 1 ? "/" : ""}`}</span>
));