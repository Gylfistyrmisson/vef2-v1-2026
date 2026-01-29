export function parseQuestions() {
  return 'test';
}

export function parseLine(line) {
  
  /* Fylki til að flokka categories, difficulty og quality*/
  const catName = [
    'Almenn kunnátta', 
    'Náttúra og vísindi',
    'Bókmenntir og listir', 
    'Saga', 
    'Landafræði', 
    'Skemmtun og afþreying', 
    'Íþróttir og tómstundir'
  ];

  const difficultyCategory = [
    'Létt',
    'Meðal',
    'Erfið'
  ];

  const qualityCategory = [
    'Slöpp',
    'Góð',
    'Ágæt'
  ];

  /* Býr til object */
  const split = line.split(",");
    
    const categoryNumber = catName[parseInt(split[0])-1];
    const subCategory = split[1];
    const difficulty = difficultyCategory[parseInt(split[2])-1];
    const quality = qualityCategory[parseInt(split[3])-1];
    const question = split[4];
    const answer = split[5];

    const q = {
      categoryNumber,
      subCategory,
      difficulty,
      quality,
      question,
      answer
    };

    if (
      Object.keys(split).length === 6 
      && typeof q.question === "string"
      && typeof q.answer === "string"
    ) {return q} else {
      return null
    };

}

