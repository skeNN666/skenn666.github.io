function isPalindrome(ner) {
    const cleaned = ner.toLowerCase().replace(/\s/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}
// Жишээ:
let ner = prompt("Нэрээ оруулна уу:");
alert(isPalindrome(ner) ? "Палиндром нэр байна" : "Палиндром биш байна");
  
function sumOfDigits(too) {
    return too.toString().split('').reduce((sum, digit) => sum + Number(digit), 0);
}
// Жишээ:
let number = prompt("Тоо оруулна уу:");
 alert("Цифрүүдийн нийлбэр: " + sumOfDigits(number));

function primeFactors(n) {
  let i = 2;
  const factors = [];
  while (i <= n) {
    if (n % i === 0) {
      factors.push(i);
      n /= i;
    } else {
      i++;
    }
  }
  return factors;
}

// Жишээ:
let num = prompt("Тоо оруулна уу:");
alert("Анхны тооны үржвэрт задлав: " + primeFactors(Number(num)).join(" × "));

function catchTime(distance) {
  const speedWolf = 25; // км/ц
  const speedRabbit = 18;
  const relativeSpeed = speedWolf - speedRabbit;

  const timeHours = distance / relativeSpeed;
  const minutes = Math.floor(timeHours * 60);
  const seconds = Math.round((timeHours * 60 - minutes) * 60);

  return { minutes, seconds };
}

// Жишээ:
let distance = prompt("Зайг км-ээр оруулна уу:");
let time = catchTime(Number(distance));
alert(`Чоно ${time.minutes} минут ${time.seconds} секундэд гүйцнэ.`);

function evenOddSplit(arr) {
  const even = arr.filter(n => n % 2 === 0);
  const odd = arr.filter(n => n % 2 !== 0);
  return { even, odd };
}

// Жишээ:
let arr = [1, 2, 3, 4, 5, 6, 7];
let result = evenOddSplit(arr);
console.log("Тэгшүүд:", result.even);
console.log("Сондгойнууд:", result.odd);

function findApartment(num) {
  const apartmentsPerFloor = 4;
  const floorsPerEntrance = 9;
  const entrances = 3;
  const totalPerEntrance = floorsPerEntrance * apartmentsPerFloor;

  const entrance = Math.ceil(num / totalPerEntrance);
  if (entrance > entrances) return "Ийм тоот байхгүй";

  const rest = num - (totalPerEntrance * (entrance - 1));
  const floor = Math.ceil(rest / apartmentsPerFloor);
  const door = ((rest - 1) % apartmentsPerFloor) + 1;

  return `${entrance}-р орц, ${floor}-р давхар, ${door}-р хаалга`;
}

// Жишээ:
let apt = prompt("Тоот оруулна уу:");
alert(findApartment(Number(apt)));

function winningMove(n, maxTake) {
  for (let k = 1; k <= maxTake; k++) {
    let remaining = n - k;
    // Хоёрын ээлжийн үед Пеетя хожихын тулд нөхцөл:
    if (remaining % (k + 1) !== 0) return k;
  }
  return 0;
}

// Жишээ:
let n = prompt("Нийт зоосны тоо:");
let max = prompt("Найз нь хамгийн ихдээ хэдэн зоос авдаг вэ:");
alert("Петя эхлээд авах ёстой зоос: " + winningMove(Number(n), Number(max)));

