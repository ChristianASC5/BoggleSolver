/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function(grid, dictionary) {
    let solutions = [];

    if(grid == null || dictionary == null)
       return solutions;
  
     let N = grid.length;
     for(let i = 0; i < N; i++) {
        if(grid[i].length != N ){
  
            return solutions;
        }
     }
  
    LowerCase(grid, dictionary);
  
  
     if(!GridValidator(grid)){
        return solutions;
     }
  
    let solutionSet = new Set();
  
    let hash = createHashMap(dictionary);
  
    for(let y = 0; y < N; y++){
  
        for(let x = 0; x < N; x++){
             let word = "";
  
             let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
  
             PrintAllWords(word, y, x, grid, visited, hash, solutionSet);
        }
  
    }
  
    solutions = Array.from(solutionSet);
  
    return solutions;
  }
  
  function PrintAllWords(word, y, x, grid, visited, hash, solutionSet){
  
      let adjMatrix = [[-1, -1],
                     [-1, 0],
                     [-1, 1],
                     [0, 1],
                     [1, 1],
                     [1, 0],
                     [1,-1],
                     [0, -1]];
  
    if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true)
           return;
  
    word += grid[y][x];
  
    if(WordChecker(word, hash)) {
           visited[y][x] = true;
  
           if(isWord(word, hash)) {
               if(word.length >= 3)
                    solutionSet.add(word);
           }
  
           for(let i = 0; i < 8; i++){
            PrintAllWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet);
            }
  
    }
  
    visited[y][x] = false;
  }
  
  function WordChecker(word, hash){
     return hash[word] != undefined;
  }
  
  
  function isWord(word, hash){
    return hash[word] == 1;
  }
  
  function createHashMap(dictionary){
    var dict = {};
    for(let i = 0; i < dictionary.length ; i++){
      dict[dictionary[i]]= 1;
      let wordlength = dictionary[i].length;
      var str = dictionary[i];
      for(let j = wordlength; wordlength > 1; wordlength--){
        str = str.substr(0,wordlength-1);
        if(str in dict){
          if(str == 1 ){
            dict[str]= 1;
          }
        }
        else{
          dict[str]= 0;
        }
      }
    }
    return dict;
  }
  
  function LowerCase(grid, dict){
  
      for(let i = 0; i < grid.length; i++) {
        for( let j = 0; j < grid[i].length; j++) {
             grid[i][j] = grid[i][j].toLowerCase();
        }
      }
  
      for(let i = 0; i < dict.length; i++) {
        dict[i] = dict[i].toLowerCase();
      }
  }
  
  function GridValidator(grid){
    raexp = /(st|qu)|[a-prt-z]/;
    for(let i = 0; i < grid.length; i++) {
      for( let j = 0; j < grid[i].length; j++) {
          if(!grid[i][j].match(raexp)){
                return false;
          }
      }

    }

    return true;
  }

let dictionary = ["ART", "EGO", "GENT", "GET", "NET", "NEW", "NEWT", "PRAT",
"PRY", "QUA", "QUART", "QUARTZ", "RAT", "TAR", "TARP",
"TEN", "WENT", "WET", "ARTY", "EGG", "NOT", "QUAR"];

let grid = [['T', 'W', 'Y', 'R'],
['E', 'N', 'P', 'H'],
['G', 'Z', 'QU', 'R'],
['St', 'N', 'T', 'A']];

let testSolver = exports.findAllSolutions(grid, dictionary);
console.log(testSolver);

// Credit to GeeksForGeeks for inspiration for this implementation