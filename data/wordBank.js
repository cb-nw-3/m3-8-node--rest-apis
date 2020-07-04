const words =
  "about act actually add after again against age ago air all also always am among an and animal another answer appear are area as ask at back ball base be beauty because become bed been before began begin behind best better better between big bird black blue boat body book both bottom box boy bring brought build built busy but by C call came can car care carefully carry centre certain change check child children city class clear close cold colour come common community complete contain could country course create cried cross cry cut D dark day decide decided deep develop did didn’t different do does dog don’t door down draw dream drive dry during E each early earth east easy eat effort enough every example experience explain eye F face fact FALSE family far farm fast father feel feet few field find fire first fish five fly follow food form found four friend from front full G game gave get girl give go gold good got government great green ground group grow guy H had half hand happen happened hard has have he hear heat heavy help her here high his hold home horse hot hour house hundred I idea if important in inch include into is island it just keep kind king knew know known L land language large last late later laugh lead learn leave left less less let letter life light like line list listen little live long look love low M machine made make man many map mark may mean measure men might mile million mind minute miss money month moon more more morning most mother mountain move much music must my N name nation near need never new next night no north note notice noun now number O object of off office often oh oil old on once one only open or order other our out over P page pair part pass passed people perhaps person picture place plan plane plant play point power probably problem product provide pull put question quick rain ran reach read ready real receive record red relationship remember right river road rock room round rule run S said same saw say school science sea season second see seem self sentence serve set several shape she ship short should show shown side simple since sing sit six size sleep S continued… slow small snow so some something song soon sound south space special spell spring stand star start stay step stood stop story street strong study such summer sun system T table take talk teach tell ten test than that the their them then there these they thing think this those though thought thousand three T continued… through time to together told too took top toward town travel tree try TRUE turn two V under understand until up upon us use usual very voice vowel W wait walk want war warm was watch water wave way we week weight were west what wheel where which W continued white who why will wind winter with without woman wonder wood word words work world would write wrong Y year yes you young";

const allWords = words.split(" ");

const wordArray = [];

allWords.forEach(function (word) {
  if (word.length > 4) {
    wordArray.push(word);
  }
});

let wordObjectsArray = [];

wordArray.forEach((item, index) => {
  wordObjectsArray.push({ word: item, id: index, letterCount: item.length });
});

module.exports = { wordObjectsArray };
