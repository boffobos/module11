// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeightFilter = document.querySelector('.minweight__input') //поле с минимальным весом
const maxWeightFilter = document.querySelector('.maxweight__input') //поле с максимальным весом


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

// convert string color to class and back
const colorToClass = {
  "красный": "fruit_red",
  "светло-коричневый": "fruit_lightbrown",
  "оранжевый": "fruit_orange",
  "желтый": "fruit_yellow",
  "салатовый": "fruit_lightgreen",
  "зеленый": "fruit_green",
  "голубой": "fruit_lightblue",
  "синий": "fruit_blue",
  "фиолетовый": "fruit_purple",
  "лиловый": "fruit_violet",
  "розово-красный": "fruit_carmazin",
  "fruit_red": "красный",
  "fruit_lightbrown": "светло-коричневый",
  "fruit_orange": "оранжевый",
  "fruit_yellow": "желтый",
  "fruit_lightgreen": "салатовый",
  "fruit_green": "зеленый",
  "fruit_lightblue": "голубой",
  "fruit_blue": "синий",
  "fruit_purple": "фиолетовый",
  "fruit_violet": "лиловый",
  "fruit_carmazin": "розово-красный",
}

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек - ready
const display = () => {
  fruitsList.innerHTML = "";

  for (let i = 0; i < fruits.length; i++) {
    //создаем <li> и назначаем ему классы
    const li = document.createElement("LI");
    const attLi = `fruit__item ${colorToClass[fruits[i].color]}`;
    li.setAttribute("class", attLi);
    // создаем <div class="fruit__info"></div>
    const fiDiv = document.createElement("DIV");
    const attDiv = "fruit__info";
    fiDiv.setAttribute("class", attDiv);
    //создаем <div></div> * 4
    const div1 = document.createElement("DIV");
    const div2 = document.createElement("DIV");
    const div3 = document.createElement("DIV");
    const div4 = document.createElement("DIV");
    //заполняем divs инфой
    div1.textContent = `index: ${i}`;
    div2.textContent = `kind: ${fruits[i].kind}`;
    div3.textContent = `color: ${fruits[i].color}`;
    div4.textContent = `weight: ${fruits[i].weight}`;
    //добавляем divs > DIV > LI > UL
    fiDiv.appendChild(div1);
    fiDiv.appendChild(div2);
    fiDiv.appendChild(div3);
    fiDiv.appendChild(div4);
    li.appendChild(fiDiv);
    fruitsList.appendChild(li);
    
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне - ready
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// перемешивание массива - ready
const shuffleFruits = () => {
  let result = [];
  
  while (fruits.length > 0) {
    let rand = getRandomInt(0, fruits.length);
    result = result.concat(fruits.splice(rand, 1));
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => { 
  return fruits.filter((item) => {
    let min = 0;
    let max = 100; 
    if (maxWeightFilter.value !== '') max = maxWeightFilter.value;
    if (minWeightFilter.value !== '') min = minWeightFilter.value;
    return (item.weight <= max && item.weight >= min);
    
  });
};

filterButton.addEventListener('click', () => {
  fruits = filterFruits();
  console.log(fruits);
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
  let colorArr = ['red', 'lightbrown', 'orange', 'yellow', '' ]
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки

  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', (event) => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if(kindInput.value !== '' && colorInput.value !=='' && weightInput.value !== '') {
    event.preventDefault();
  let newFriut = {'kind':`${kindInput.value}`, 'color': `${colorToClass[colorInput.value]}`, 'weight': Number(weightInput.value)};
  fruits.push(newFriut);
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
  }
  else {
    alert('Введите все поля')
  }
  display();
});

