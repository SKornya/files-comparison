

export const file1 = {
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false,
};

export const file2 = {
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io",
};

const files = [file1, file2];

const sortedKeys = files.map((file) => Object.keys(file).sort());

console.log(sortedKeys[0], sortedKeys[1]);

const [keys1, keys2] = sortedKeys;

const intersectKeys = _.intersection(keys1, keys2);
console.log(intersectKeys);

const unionKeys = _.union(keys1, keys2);
console.log(unionKeys);

console.log(JSON.stringify(file1));

let diff = '';

for (const key of unionKeys) {
  if (intersectKeys.includes(key)) {
    diff += file1[key] === file2[key] ? `     ${key}: ${file1[key]}\n` : `   - ${key}: ${file1[key]}\n   + ${key}: ${file2[key]}\n`;
  } else {
    diff += keys1.includes(key) ? `   - ${key}: ${file1[key]}\n` : `   + ${key}: ${file2[key]}\n`;
  }
}

diff = `{\n${diff}}`;

console.log(diff);