function isPalindrome(ner) {
    if (!ner || typeof ner !== "string") {
        alert("Нэр буруу байна");
        return false;
    }
    const cleaned = ner.toLowerCase().replace(/\s/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

let ner = prompt("Нэрээ оруулна уу:");
alert(isPalindrome(ner) ? "Палиндром нэр байна" : "Палиндром биш байна");

function sumOfDigits(too) {
    if (isNaN(too)) return "Буруу тоо байна!";
    return Math.abs(too).toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
}

let number = prompt("Тоо оруулна уу:");
alert("Цифрүүдийн нийлбэр: " + sumOfDigits(number));

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++)
        if (n % i === 0) return false;
    return true;
}

function primeSumDecomposition(n) {
    if (isNaN(n) || n < 2) return "2-оос их тоо оруулна уу.";

    const primes = [];
    function backtrack(target, start, path) {
        const sum = path.reduce((a, b) => a + b, 0);
        if (sum === target) {
            primes.push([...path]);
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
    return primes.length ? primes[0].join(" + ") : "Задалж болохгүй.";
}

let num = prompt("Тоо оруулна уу:");
alert(`Анхны тоонуудын нийлбэрт задлав: ${primeSumDecomposition(Number(num))}`);


function catchTime(distanceKm) {
    if (isNaN(distanceKm) || distanceKm <= 0) return "Зөв зай оруулна уу.";

    const speedWolf = 25 * 1000 / 3600; // м/с
    const speedRabbit = 18 * 1000 / 3600; // м/с
    const relativeSpeed = speedWolf - speedRabbit;

    const distanceMeters = distanceKm * 1000;
    const secondsTotal = distanceMeters / relativeSpeed;
    const minutes = Math.floor(secondsTotal / 60);
    const seconds = Math.round(secondsTotal % 60);

    return { minutes, seconds };
}

let distance = prompt("Зайг км-ээр оруулна уу:");
let time = catchTime(Number(distance));
alert(`Чоно ${time.minutes} минут ${time.seconds} секундэд гүйцнэ.`);

function evenOddSplit(arr) {
  if (!Array.isArray(arr)) return { even: [], odd: [] };

  const even = arr.filter(n => n % 2 === 0);
  const odd = arr.filter(n => n % 2 !== 0);
  return { even, odd };
}

let input = prompt("Тоонуудыг таслалаар тусгаарлан оруулна уу (ж: 1,2,3,4):");
let arr = input.split(',').map(n => parseInt(n.trim())).filter(n => !isNaN(n));

let result = evenOddSplit(arr);

alert("Тэгшүүд: " + result.even.join(", ") + "\nСондгойнууд: " + result.odd.join(", "));

function findApartment(num) {
    const apartmentsPerFloor = 4;
    const floorsPerEntrance = 9;
    const entrances = 3;
    const totalPerEntrance = floorsPerEntrance * apartmentsPerFloor;

    if (isNaN(num) || num <= 0) return "Зөв тоот оруулна уу.";

    const entrance = Math.ceil(num / totalPerEntrance);
    if (entrance > entrances) return "Ийм тоот байхгүй";

    const rest = num - (totalPerEntrance * (entrance - 1));
    const floor = Math.ceil(rest / apartmentsPerFloor);
    const door = ((rest - 1) % apartmentsPerFloor) + 1;

    return `${entrance}-р орц, ${floor}-р давхар, ${door}-р хаалга`;
}

let apt = prompt("Тоот оруулна уу:");
alert(findApartment(Number(apt)));

function winningMove(n, maxTake) {
    if (isNaN(n) || isNaN(maxTake) || n <= 0 || maxTake <= 0) return "Зөв утгууд оруулна уу.";
    for (let k = 1; k <= maxTake; k++) {
        let remaining = n - k;
        if (remaining % (k + 1) !== 0) return k;
    }
    return 0;
}

let n = prompt("Нийт зоосны тоо:");
let max = prompt("Найз нь хамгийн ихдээ хэдэн зоос авдаг вэ:");
alert("Петя эхлээд авах ёстой зоос: " + winningMove(Number(n), Number(max)));


