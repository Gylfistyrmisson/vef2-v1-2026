import fs from 'node:fs/promises'
import { parseLine } from './lib/parse.js'

function createHTMLflokkur(name,questions) {
  const MAX_QUESTION = 100;
  const path =  `./dist/${name}.html`;
  let mid_html = `
  
  `;

  let cnt = 0;
  for (const question of questions) {
    if (cnt >= MAX_QUESTION) {
      break;
    } 
    const q_html = `
      <div class="quiz-question">
        <li>
          <p>
            <strong>${question.categoryNumber} (${question.difficulty}):</strong>
            ${question.question}
          </p>
          <input type="text" class="answer-input" placeholder="Svar" data-correct="${question.answer}">
          <button class="submit-answer">Senda</button>
          <span class="feedback"></span>
        <li>
      </div>
    `;
    mid_html += q_html;
    cnt += 1
  }

  const top_html = `
    <!DOCTYPE html>
    <html lang="is">
    <head>
      <meta charset="UTF-8">
      <title>Quiz Categories</title>
      <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
      <h1>Questions</h1>
      <ul>   
  `;

  const bot_html = `
      </ul>   
      <script src="scripts.js"></script>
    </body>
    </html>
  `;

  const html = top_html + mid_html + bot_html
  fs.writeFile(path,html,'utf-8');
}

function createHTMLindex(links) {
  const top_html = `
    <!DOCTYPE html>
    <html lang="is">
    <head>
      <meta charset="UTF-8">
      <title>Quiz Categories</title>
      <link rel="stylesheet" href="./styles.css">
    </head>
    <body>
      <h1>Quiz Categories</h1>
      <ul>   
  `;

  let mid_html = `
  `;

  let bot_html = `
      </ul>
    </body>
    </html>
  `;

  for (const link of links) {
    const link_html = `
        <li><a href="${link}.html">${link}</a></li>
    `;
    mid_html += link_html;
  }

  const html = top_html + mid_html + bot_html
  const path = './dist/index.html';

  fs.writeFile(path,html,'utf-8');
}

async function main() {
  const distPath = './dist';
  await fs.mkdir(distPath);

  const content = await fs.readFile('./questions.csv','utf-8');

  const lines = content.split("\n");

  const questions = lines.map(parseLine).filter(Boolean);

  /** Búa til html síður fyrir flokka */

  const highQualityHistory = questions.filter(q => q.categoryNumber === 'Saga' && q.quality === 'Ágæt');
  const goodQualityGeneral = questions.filter(q => q.categoryNumber === 'Almenn kunnátta' && q.quality === 'Góð');
  const poorQualityCulture = questions.filter(q => q.categoryNumber === 'Bókmenntir og listir' && q.quality === 'Slöpp');
  const hardGeography = questions.filter(q => q.categoryNumber === 'Landafræði' && q.difficulty === 'Erfið');
  const easyEntertainment = questions.filter(q => q.categoryNumber === 'Skemmtun og afþreying' && q.difficulty === 'Létt');
  const mediumSports = questions.filter(q => q.categoryNumber === 'Íþróttir og tómstundir' && q.difficulty === 'Meðal');

  createHTMLflokkur("highQualityHistory",highQualityHistory);
  createHTMLflokkur("goodQualityGeneral",goodQualityGeneral);
  createHTMLflokkur("poorQualityCulture",poorQualityCulture);
  createHTMLflokkur("hardGeography",hardGeography);
  createHTMLflokkur("easyEntertainment",easyEntertainment);
  createHTMLflokkur("mediumSports",mediumSports);

  /** Búa til index með linkum */

  createHTMLindex([
    'highQualityHistory',
    'goodQualityGeneral',
    'poorQualityCulture',
    'hardGeography',
    'easyEntertainment',
    'mediumSports'])
}

main().catch((error) => {
  console.error('error generating', error);
});
