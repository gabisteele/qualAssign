var speech = [];
hash = [];
sorted = [];
var x = [];
var y = [];
var value;
var index = 0;
var counter = 0;





function setup() {
  createCanvas(windowWidth, windowHeight);
  arr = loadStrings("speech.txt", processData);
  textAlign(CENTER, CENTER);


}


function processData() {
  fill(0, 0, 0, 180);
  // filtering out unimportant words:
  var noWordsLike = ["still","has","many","too","over","thats","that's","them","first","lets","past","not","one","how","out","like","when", "me", "use", "year", "want", "those", "we're", "make", "do", "it's", "ourselves", "why", "that's", "us", "every", "can", "now", "let's", "there", "your", "give", "years", "better", "done", "are", "some", "or", "be", "that's", "up", "at", "their", "where", "got", "get", "but", "because", "it's", "are", "more", "than", "you", "they", "what", "i've", "as", "all", "who", "with", "my", "were", "could", "same", "so", "i", "will", "from", "and", "the", "it", "in", "it's", "by", "we", "on", "that", "to", "of", "our", "a", "have", "is", "for", "this"];
  var badWord = false;
  
  // checking that the words are being processed
  console.log(noWordsLike[0]);

  // loop over the array
  for (var i in arr) {
    // first variable stands for string key
    // second one for the associated value
    text(arr[i], 100, 50 + i);
    // split each line
    var li = arr[i].split(" ");
    for (var k in li) {
      var clean = li[k].replace(/[.,-\/#!@#$\*|%^&*&:'(){}]/g, "");
      clean = clean.toLowerCase();
      for (var j = 0; j < noWordsLike.length; j++) {
        if (clean == noWordsLike[j]) {
          badWord = true;
          break;
        } else {
          badWord = false;
        }
      }
      if (!badWord) {
        if (hash[clean] >= 1)
          hash[clean]++; // increase the counter for every other occurance
        else
          hash[clean] = 1; // first occurance
      }
    }
  }
 
  // SORT HASH MAP
  // populate sorted array with all words from hash
  for (i in hash)
    sorted.push([i, hash[i]]);

  // now sort
  sorted.sort(function(a, b) {
    a = a[1];
    b = b[1];
    return a < b ? 1 : (a > b ? -1 : 0);
  });

  // forLoop #1: Randomize positions of words
  for (i = 0; i < sorted.length; i++) {
    x[i] = random(50, width-30);
    y[i] = random(50, height-30);
  }

}

function draw() {
  background("beige");

  //forLoop #2: draw all words randomly
  for (i = 0; i < sorted.length; i++) {
    var txtSize = sorted[i][1] * 2.5;
    textSize(txtSize);
    text(sorted[i][0], x[i], y[i]);
    textFont("courier new");

  }
}
function mouseDragged() {
  for (i = 0; i < sorted.length; i++) {
    if (dist(x[i], y[i], mouseX, mouseY) < 50) {

      x[i] += mouseX - pmouseX;
      y[i] += mouseY - pmouseY;
    }
  }
}