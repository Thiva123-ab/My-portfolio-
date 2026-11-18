import fs from 'fs';
const css = fs.readFileSync('src/index.css', 'utf8');
const idx = css.indexOf('/* Mobile Header (< 640px) */');
console.log('idx:', idx);
console.log('slice around end:\n', css.slice(idx + 1500, idx + 2600));
