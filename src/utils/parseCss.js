function cssToJS(str) {
  const lines = str.split(';').filter(line => line.trim());
  const result = {};
  lines.forEach(line => {
    const pair = line.split(':');
    const key = dashToCamel(pair[0].trim());
    result[key] = pair[1].trim();
  });
  return result;
}

function dashToCamel(str) {
  return str.split('-').map((word, idx) => {
    if (idx === 0) return word;
    return word[0].toUpperCase() + word.slice(1);
  }).join('');
}

let css = `
color: red;
background: green;
box-shadow: 0 0 10px black;
`;



console.log(cssToJS(css));