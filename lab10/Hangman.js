const words = [
  { word: "СагсанБөмбөг", meaning: "Багууд бөмбөгийг цагариг руу шидэж оноо авдаг спорт." },
  { word: "ХөлБөмбөг", meaning: "Дэлхийд хамгийн өргөн хүрээтэй, хөлөөр бөмбөг тоглодог спорт." },
  { word: "Бөх", meaning: "Монгол үндэсний уламжлалт хүчний спорт." },
  { word: "Талбай", meaning: "Спортын тэмцээн уралдаан явагддаг хязгаарлагдсан орон зай." },
  { word: "Теннис", meaning: "Ракет ашиглан тоглодог спорт." },
  { word: "Шидэлт", meaning: "Сагсан бөмбөгийн үед оноо авах зорилгоор бөмбөгийг цагираг руу чиглүүлэн шидэх үйлдэл." },
  { word: "Спорт", meaning: "Биеийн хүч, ур чадварыг шалгадаг уралдаан, тоглоомын нийт нэршил." },
  { word: "Дасгалжуулагч", meaning: "Тамирчдыг бэлтгэж, удирддаг хүн." },
  { word: "Олимп", meaning: "Дэлхийн хамгийн том олон улсын спортын наадам." },
  { word: "Гүйлт", meaning: "Хурд шалгах зорилго бүхий хөдөлгөөнтэй спорт." },
  { word: "Сэлэлт", meaning: "Усанд биеэрээ хөвөн, хөдөлж уралддаг спорт." },
  { word: "Тамирчин", meaning: "Спортоор хичээллэдэг, тэмцээнд оролцдог хүн." },
  { word: "Чадвар", meaning: "Тамирчны бие бялдрын болон техникийн түвшин." },
  { word: "Тулааны спорт", meaning: "UFC, бокс зэрэг тулаант спортын ерөнхий нэршил." },
  { word: "Шагнал", meaning: "Амжилт гаргасан тамирчинд олгодог урамшуулал." },
  { word: "Гарбөмбөг", meaning: "Хангал, Батсуурь"}
];


let current = words[Math.floor(Math.random() * words.length)];
let word = current.word.toUpperCase();

let score = parseInt(localStorage.getItem("score")) || 0;
let correctLetters = [];
let wrongLetters = [];
let usedWords = [];
let step = 0;

const meaningDiv = document.getElementById('meaning');
meaningDiv.textContent = `${current.meaning}`;
const wordDiv = document.getElementById('word');
const wrongDiv = document.getElementById('wrong');
const messageDiv = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const statsDiv = document.getElementById('stats');
const timerDiv = document.getElementById('timer');

let nickname = localStorage.getItem("nickname") || prompt("Тоглогчийн нэр оруулна уу:");
localStorage.setItem("nickname", nickname);

const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
let player = leaderboard.find(entry => entry.name === nickname);
let wins = 0;
let losses = 0;

if (!player) {
  losses = 0;
  score = 0;
  leaderboard.push({ name: nickname, losses: 0, score: 0 });
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
} else {
  wins = player.wins;
  losses = player.losses;
  score = player.score || 0;
}

updateStats();
updateWordDisplay();
updateWrongDisplay();
startTimer();
document.addEventListener("keydown", handleKey);
restartBtn.addEventListener("click", () => location.reload());

function handleKey(e) {
  messageDiv.textContent = "";
  const letter = e.key.toUpperCase();
  if (!letter.match(/^[А-ЯЁӨҮ]{1}$/i)) {
    messageDiv.textContent = "Зөвхөн нэг үсэг оруулна уу!";
    return;
  }
  if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
    messageDiv.textContent = "Энэ үсгийг аль хэдийн оруулсан байна!";
    return;
  }
  if (word.includes(letter)) {
    correctLetters.push(letter);
    correctSound.play();
    updateWordDisplay();
  } else {
    wrongLetters.push(letter);
    step++;
    drawNext();
    wrongSound.play();
    updateWrongDisplay();
  }
  checkGameEnd();
}

function updateWordDisplay() {
  wordDiv.textContent = word
    .split("")
    .map(l => (correctLetters.includes(l) ? l : "_"))
    .join(" ");
  meaningDiv.textContent = ` ${current.meaning}`;
}

function updateWrongDisplay() {
  wrongDiv.textContent = "Алдаатай үсгүүд: " + wrongLetters.join(", ");
}

function updateStats() {
  statsDiv.innerHTML = `Оноо: ${score} | Ялагдал: ${losses} | Тоглогч: ${nickname}`;
}


function checkGameEnd() {
  const won = word.split("").every(l => correctLetters.includes(l));
  const lost = step >= 4;

  if (won) {
  let wordScore = word.length;
  score += wordScore;
  localStorage.setItem("score", score);

  wins++;
  localStorage.setItem("wins", wins);
  updateStats();
  saveScore(nickname, "wins", wordScore);
  document.removeEventListener("keydown", handleKey);
  restartBtn.style.display = "inline-block";
  nextWord();
}


  if (lost) {
    losses++;
    localStorage.setItem("losses", losses);
    updateStats();
    saveScore(nickname, "losses");
    messageDiv.textContent = "Ялагдлаа! GG";
    alert("Ялагдлаа! GG Үг: " + word);
    document.removeEventListener("keydown", handleKey);
    restartBtn.style.display = "inline-block";
    clearInterval(timer);
  }
}


function drawNext() {
  const parts = ["head", "body", "leg-left", "leg-right"];
  if (step <= parts.length) {
    const partId = parts[step - 1];
    const partElement = document.getElementById(partId);
    if (partElement) {
      partElement.style.display = "block";
    }
  }
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  timerDiv.textContent = `Үлдсэн хугацаа: ${timeLeft} сек`;
  timer = setInterval(() => {
    timeLeft--;
    timerDiv.textContent = `Үлдсэн хугацаа: ${timeLeft} сек`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      messageDiv.textContent = "Хугацаа дууслаа!";
      losses++;
      localStorage.setItem("losses", losses);
      updateStats();
      saveScore(nickname, "losses");
      document.removeEventListener("keydown", handleKey);
      restartBtn.style.display = "inline-block";
      alert("Ялагдлаа! Үг: " + word);
    }
  }, 1000);
}

function nextWord() {
  if (usedWords.length === words.length) {
    alert("Bayr Hurgey. Ta ene ugiig taalaa. Daraagiin ug.");
    usedWords = [];
  }
  let newWordObj;
  do {
    newWordObj = words[Math.floor(Math.random() * words.length)];
  } while (usedWords.includes(newWordObj.word));

  usedWords.push(newWordObj.word);
  current = newWordObj;
  word = current.word.toUpperCase();
  correctLetters = [];
  wrongLetters = [];
  step = 0;

  document.querySelectorAll(".buttons button").forEach(btn => {
    btn.style.visibility = "visible";
  });
  
  document.querySelectorAll("#head, #body, #leg-left, #leg-right").forEach(el => el.style.display = "none");
  updateWordDisplay();
  updateWrongDisplay();
  messageDiv.textContent = "";
  restartBtn.style.display = "none";
  document.addEventListener("keydown", handleKey);
}

function saveScore(name, scoreType) {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

  const player = leaderboard.find(entry => entry.name === name);
  if (player) {
    player[scoreType]++;
  } else {
    const newPlayer = { name, wins: 0, losses: 0 };
    newPlayer[scoreType] = 1;
    leaderboard.push(newPlayer);
  }

  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}
function pressKey(letter){
  const buttons = document.querySelectorAll(".buttons button");
  buttons.forEach(btn => {
    if(btn.textContent === letter){
      btn.style.visibility = "hidden";
    }
  });
  handleKey({key: letter});
  ke
}
function saveScore(name, scoreType, addedScore = 0) {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

  let player = leaderboard.find(entry => entry.name === name);
  if (player) {
    player[scoreType]++;
    player.score = (player.score || 0) + addedScore;
  } else {
    const newPlayer = { name, wins: 0, losses: 0, score: 0 };
    newPlayer[scoreType] = 1;
    newPlayer.score = addedScore;
    leaderboard.push(newPlayer);
  }

  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}