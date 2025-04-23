function checkPalindrome() {
  const ner = document.getElementById("nameInput").value;
  if (!ner || typeof ner !== "string") {
    document.getElementById("palindromeResult").textContent = "Нэр буруу байна";
    return;
  }
  const cleaned = ner.toLowerCase().replace(/\s/g, '');
  const result = cleaned === cleaned.split('').reverse().join('');
  document.getElementById("palindromeResult").textContent = result ? "Палиндром нэр байна" : "Палиндром биш байна";
}

function sumDigits() {
  const input = document.getElementById("digitInput").value;
  if (isNaN(input)) {
    document.getElementById("digitResult").textContent = "Буруу тоо байна!";
    return;
  }
  const sum = Math.abs(input).toString().split('').reduce((a, b) => a + Number(b), 0);
  document.getElementById("digitResult").textContent = "Цифрүүдийн нийлбэр: " + sum;
}

function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++)
    if (n % i === 0) return false;
  return true;
}

function decomposePrime() {
  const n = Number(document.getElementById("primeInput").value);
  if (isNaN(n) || n < 2) {
    document.getElementById("primeResult").textContent = "2-оос их тоо оруулна уу.";
    return;
  }

  const results = [];
  function backtrack(target, start, path) {
    const sum = path.reduce((a, b) => a + b, 0);
    if (sum === target) {
      results.push([...path]);
      return;
    }
    if (sum > target) return;

    for (let i = start; i <= target; i++) {
      if (isPrime(i)) {
        path.push(i);
        backtrack(target, i, path);
        path.pop();
      }
    }
  }

  backtrack(n, 2, []);
  document.getElementById("primeResult").textContent = results.length ? results[0].join(" + ") : "Задалж болохгүй.";
}

function calculateCatchTime() {
  const d = Number(document.getElementById("distanceInput").value);
  if (isNaN(d) || d <= 0) {
    document.getElementById("catchResult").textContent = "Зөв зай оруулна уу.";
    return;
  }

  const speedWolf = 25 * 1000 / 3600;
  const speedRabbit = 18 * 1000 / 3600;
  const relativeSpeed = speedWolf - speedRabbit;

  const distanceMeters = d * 1000;
  const secondsTotal = distanceMeters / relativeSpeed;
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = Math.round(secondsTotal % 60);

  document.getElementById("catchResult").textContent = `Чоно ${minutes} минут ${seconds} секундэд гүйцнэ.`;
}

function splitEvenOdd() {
  const input = document.getElementById("evenOddInput").value;
  const arr = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

  const even = arr.filter(n => n % 2 === 0);
  const odd = arr.filter(n => n % 2 !== 0);

  document.getElementById("evenOddResult").textContent = `Тэгшүүд: ${even.join(', ')}\nСондгойнууд: ${odd.join(', ')}`;
}

function findApt() {
  const num = Number(document.getElementById("aptInput").value);
  const apartmentsPerFloor = 4;
  const floorsPerEntrance = 9;
  const entrances = 3;
  const totalPerEntrance = apartmentsPerFloor * floorsPerEntrance;

  if (isNaN(num) || num <= 0) {
    document.getElementById("aptResult").textContent = "Зөв тоот оруулна уу.";
    return;
  }

  const entrance = Math.ceil(num / totalPerEntrance);
  if (entrance > entrances) {
    document.getElementById("aptResult").textContent = "Ийм тоот байхгүй";
    return;
  }

  const rest = num - (totalPerEntrance * (entrance - 1));
  const floor = Math.ceil(rest / apartmentsPerFloor);
  const door = ((rest - 1) % apartmentsPerFloor) + 1;

  document.getElementById("aptResult").textContent = `${entrance}-р орц, ${floor}-р давхар, ${door}-р хаалга`;
}

function getWinningMove() {
  const n = Number(document.getElementById("coinsInput").value);
  const max = Number(document.getElementById("maxTakeInput").value);
  if (isNaN(n) || isNaN(max) || n <= 0 || max <= 0) {
    document.getElementById("winningMoveResult").textContent = "Зөв утгууд оруулна уу.";
    return;
  }

  for (let k = 1; k <= max; k++) {
    let remaining = n - k;
    if (remaining % (k + 1) !== 0) {
      document.getElementById("winningMoveResult").textContent = "Петя эхлээд авах ёстой зоос: " + k;
      return;
    }
  }

  document.getElementById("winningMoveResult").textContent = "Хожих боломжгүй.";
}

