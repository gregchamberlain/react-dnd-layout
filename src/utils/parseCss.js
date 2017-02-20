export function cssToJS(str) {
  const lines = str.split(';').filter(line => line.trim());
  const result = {};
  lines.forEach(line => {
    const pair = line.split(':');
    const key = dashToCamel(pair[0].trim());
    result[key] = pair[1].trim();
  });
  return result;
}

export function jsToCss(json) {
  let result = '';
  Object.keys(json).forEach(key => {
    result += `${camelToDash(key)}: `;
    result += `${json[key]};\n`;
  });
  return result;
}

function dashToCamel(str) {
  return str.split('-').map((word, idx) => {
    if (idx === 0) return word;
    return word[0].toUpperCase() + word.slice(1);
  }).join('');
}

function camelToDash(str) {
  let result = '';
  for (let i=0; i<str.length; i++) {
    const letter = str[i];
    if (letter.toUpperCase() === letter) {
      result += `-${letter.toLowerCase()}`;
    } else {
      result += letter;
    }
  }
  return result;
}

let css = `
color: red;
background: green;
box-shadow: 0 0 10px black;
-webkit-transition: height 2s;
`;

let json = {
  backgroundColor: 'red',
  boxShadow: '0 0 10px black',
  color: 'green'
};


console.log(cssToJS(css));