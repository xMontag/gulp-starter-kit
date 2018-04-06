const alphabet = "qwertyuiop[]asdfghjkl;'zxcvbnm,./";

let keyboard = [
  alphabet.slice(0,alphabet.indexOf("a")),
  alphabet.slice(alphabet.indexOf("a"),alphabet.indexOf("z")),
  alphabet.slice(alphabet.indexOf("z"))
];
//console.log(keyboard);

let indxStrArr = [[[1,5],[0,2],[1,8],[1,8],[0,8]],[[1,6],[1,0],[2,3],[1,0],[1,1],[2,2],[0,3],[0,7],[0,9],[0,4]],[[0,4],[0,3],[1,0],[0,7],[2,5],[0,2],[0,3]]];

let words = indxStrArr.map(function(item, i) {
  return item.map(function(item) {
    return keyboard[item[0]][item[1]];
  }).join(''); 
});
//console.log(words);

let [w1,w2,w3] = [...words];
console.log(w1,w2,w3);