//если 'true', то можно начинать игру
let start = false;
//массивы с номерами местоположения кораблей
let location_computer_navy = [];
let location_player_navy = [];
// массив с клетками, по которым компьютер еще не производил выстрелов
let blank_cells = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
  65,
  66,
  67,
  68,
  69,
  70,
  71,
  72,
  73,
  74,
  75,
  76,
  77,
  78,
  79,
  80,
  81,
  82,
  83,
  84,
  85,
  86,
  87,
  88,
  89,
  90,
  91,
  92,
  93,
  94,
  95,
  96,
  97,
  98,
  99,
];
// массив с подбитыми палубами коробля
let crashed_ships = [];
// массив с клетками, по которым стрелял компьютер
let computer_shoots = [];
// ориентация кораблей при ручной расстановке(по горизонтали, если true, иначе по вертикали)
let horizontal = false;
// информация о флоте на карте
let computer_navy = {
  onedeck_ship_1: { count: 1, decks: [] },
  onedeck_ship_2: { count: 1, decks: [] },
  onedeck_ship_3: { count: 1, decks: [] },
  onedeck_ship_4: { count: 1, decks: [] },
  twodeck_ship_1: { count: 2, decks: [] },
  twodeck_ship_2: { count: 2, decks: [] },
  twodeck_ship_3: { count: 2, decks: [] },
  threedeck_ship_1: { count: 3, decks: [] },
  threedeck_ship_2: { count: 3, decks: [] },
  fourdeck_ship_1: { count: 4, decks: [] },
};
let player_navy = {
  onedeck_ship_1: { count: 1, decks: [] },
  onedeck_ship_2: { count: 1, decks: [] },
  onedeck_ship_3: { count: 1, decks: [] },
  onedeck_ship_4: { count: 1, decks: [] },
  twodeck_ship_1: { count: 2, decks: [] },
  twodeck_ship_2: { count: 2, decks: [] },
  twodeck_ship_3: { count: 2, decks: [] },
  threedeck_ship_1: { count: 3, decks: [] },
  threedeck_ship_2: { count: 3, decks: [] },
  fourdeck_ship_1: { count: 4, decks: [] },
};
//число кораблей для расстановки в ручную
let onedeck_radio = 4;
let twodeck_radio = 3;
let threedeck_radio = 2;
let fourdeck_radio = 1;

const computer_field = document.querySelector(".computer");
const player_field = document.querySelector(".player");
const random_button = document.querySelector(".random");
const handle_button = document.querySelector(".handle");
const start_button = document.querySelector(".start");
const choose_ships = document.querySelector(".ships");

const onedeckcount = document.querySelector(".onedeck_count");
const twodeckcount = document.querySelector(".twodeck_count");
const threedeckcount = document.querySelector(".threedeck_count");
const fourdeckcount = document.querySelector(".fourdeck_count");

onedeckcount.innerHTML = onedeck_radio;
twodeckcount.innerHTML = twodeck_radio;
threedeckcount.innerHTML = threedeck_radio;
fourdeckcount.innerHTML = fourdeck_radio;

for (let i = 0; i < 100; i++) {
  const a = document.createElement("div");
  const b = document.createElement("div");
  player_field.appendChild(a);
  computer_field.appendChild(b);
}

for (let i = 0; i < 100; i++) {
  computer_field.children[i].className = "computer_" + i;
  player_field.children[i].className = "player_" + i;
}

const checkOnedeck = (arr, ship) => {
  return (
    arr.includes(ship) ||
    arr.includes(ship - 1) ||
    arr.includes(ship + 1) ||
    arr.includes(ship + 9) ||
    arr.includes(ship - 9) ||
    arr.includes(ship + 10) ||
    arr.includes(ship - 10) ||
    arr.includes(ship + 11) ||
    arr.includes(ship - 11)
  );
};

const checkTwodeck = (arr, ship, bool) => {
  if (bool) {
    return (
      checkOnedeck(arr, ship) ||
      arr.includes(ship + 19) ||
      arr.includes(ship + 20) ||
      arr.includes(ship + 21)
    );
  } else {
    return (
      checkOnedeck(arr, ship) ||
      arr.includes(ship - 8) ||
      arr.includes(ship + 2) ||
      arr.includes(ship + 12) ||
      ship == 9 ||
      String(ship).indexOf("9", 1) != -1
    );
  }
};

const checkThreedeck = (arr, ship, bool) => {
  if (bool) {
    return (
      checkTwodeck(arr, ship, bool) ||
      arr.includes(ship + 29) ||
      arr.includes(ship + 30) ||
      arr.includes(ship + 31)
    );
  } else {
    return (
      checkTwodeck(arr, ship, bool) ||
      arr.includes(ship - 7) ||
      arr.includes(ship + 3) ||
      arr.includes(ship + 13) ||
      ship == 8 ||
      String(ship).indexOf("8", 1) != -1
    );
  }
};

function addRandomShips(navy, location) {
  // добавляет корабли из массива location в объект со статусами короблей
  // при случайной расстановке
  navy["fourdeck_ship_1"]["decks"].push(location.slice(0, 4));
  navy["threedeck_ship_2"]["decks"].push(location.slice(4, 7));
  navy["threedeck_ship_1"]["decks"].push(location.slice(7, 10));
  navy["twodeck_ship_3"]["decks"].push(location.slice(10, 12));
  navy["twodeck_ship_2"]["decks"].push(location.slice(12, 14));
  navy["twodeck_ship_1"]["decks"].push(location.slice(14, 16));
  navy["onedeck_ship_4"]["decks"].push(location.slice(16, 17));
  navy["onedeck_ship_3"]["decks"].push(location.slice(17, 18));
  navy["onedeck_ship_2"]["decks"].push(location.slice(18, 19));
  navy["onedeck_ship_1"]["decks"].push(location.slice(19, 20));
}

function checkPlace(target, ship, decks) {
  // функция проверяет возможность расстановки коробля на поле.
  // если все условия соблюдены, то устанавливает коробль по заданным параметрам.
  // после чего отнимает единицу из соответствующей переменной
  // с кол-вом свободных для расстановки кораблей
  let num = +target.className.slice(7, 9);
  let checked_decks = 0;
  let cells = [];
  for (let i = 0; i < decks; i++) {
    if (
      !location_player_navy.includes(num) &&
      (!location_player_navy.includes(num - 1) || String(num).includes("0")) &&
      (!location_player_navy.includes(num + 1) ||
        String(num).slice(1) == "9" ||
        num == 9) &&
      (!location_player_navy.includes(num - 9) ||
        String(num).slice(1) == "9" ||
        num == 9) &&
      (!location_player_navy.includes(num + 9) || String(num).includes("0")) &&
      !location_player_navy.includes(num - 10) &&
      !location_player_navy.includes(num + 10) &&
      (!location_player_navy.includes(num - 11) || String(num).includes("0")) &&
      (!location_player_navy.includes(num + 11) ||
        String(num).slice(1) == "9" ||
        num == 9)
    ) {
      checked_decks++;
      cells.push(num);
    } else {
      break;
    }

    if (horizontal) {
      num = num + 1;
    } else {
      num = num + 10;
    }
  }

  if (checked_decks == decks) {
    ship["decks"].push(cells);
    for (let cell of cells) {
      document.querySelector(`.player_${cell}`).classList.add("player_navy");
      location_player_navy.push(cell);
    }

    switch (decks) {
      case 4:
        fourdeck_radio = fourdeck_radio - 1;
      case 3:
        threedeck_radio = threedeck_radio - 1;
      case 2:
        twodeck_radio = twodeck_radio - 1;
      case 1:
        onedeck_radio = onedeck_radio - 1; 
    }

  }
}

function addShip(target, name, num_radio, decks) {
  // добавляет корабль с помощью функции checkPlace, но перед этим
  // проверяет доступное колличество кораблей
  // также проверяет, если все коробли расставленны, то делает видимой
  // кнопку старт
  if (!num_radio) {
    document.querySelector(`.${name}`).checked = false;
    document.querySelector(`.${name}`).parentElement.hidden = true;
  }

  if (document.querySelector(`.${name}`).checked) {
    checkPlace(target, player_navy[`${name}_ship_${num_radio}`], decks);
  }

  if (location_player_navy.length == 20) {
    document.querySelector(".start").hidden = false;
  }
}

function removeClassesChoosenShips() {
  // функция для удаления класса player_choose-place у клеток
  let ships = document.querySelectorAll(".player_choose-place");
  ships.forEach((ship) => {
    ship.classList.remove("player_choose-place");
  });
}

function turn() {
  // функция для ориентации коробля по горизонтали или по вертикали
  // при случайной расстановке.
  // так же используется компьютером для определения следущего
  // выстрела при поподании по короблю игрока
  return Boolean(Math.round(Math.random()));
}

function randomCrashX(shoot, arr) {
  // определяет выстрел компьютера в соседнюю клетку
  // по горизонтали
  if (turn() && String(shoot).indexOf("9", 1) == -1 && shoot != 9) {
    return shoot + 1;
  } else if (shoot - 1 >= 0) {
    return shoot - 1;
  } else {
    return arr;
  }
}

function randomCrashY(shoot, arr) {
  // определяет выстрел компьютера в соседнюю клетку
  // по вертикали
  if (turn() && shoot + 10 < 100) {
    return shoot + 10;
  } else if (shoot - 10 >= 0) {
    return shoot - 10;
  } else {
    return arr;
  }
}

function randomLocations(arr) {
  // функция для случайного распределения короблей
  let battleship = Math.floor(Math.random() * 100);
  let battleship_2;
  let battleship_3;
  let battleship_4;

  if (turn()) {
    while (battleship + 30 > 99) battleship = Math.floor(Math.random() * 100);
    battleship_2 = battleship + 10;
    battleship_3 = battleship + 20;
    battleship_4 = battleship + 30;
  } else {
    while (
      battleship == 9 ||
      battleship == 8 ||
      battleship == 7 ||
      String(battleship).indexOf("9", 1) != -1 ||
      String(battleship).indexOf("8", 1) != -1 ||
      String(battleship).indexOf("7", 1) != -1
    )
      battleship = Math.floor(Math.random() * 100);
    battleship_2 = battleship + 1;
    battleship_3 = battleship + 2;
    battleship_4 = battleship + 3;
  }
  arr.push(battleship);
  arr.push(battleship_2);
  arr.push(battleship_3);
  arr.push(battleship_4);

  for (let i = 2; i > 0; i--) {
    let cruiser = Math.floor(Math.random() * 100);
    let cruiser_2;
    let cruiser_3;
    if (turn()) {
      while (checkThreedeck(arr, cruiser, true) || cruiser + 20 > 99)
        cruiser = Math.floor(Math.random() * 100);
      cruiser_2 = cruiser + 10;
      cruiser_3 = cruiser + 20;
    } else {
      while (checkThreedeck(arr, cruiser, false))
        cruiser = Math.floor(Math.random() * 100);
      cruiser_2 = cruiser + 1;
      cruiser_3 = cruiser + 2;
    }
    arr.push(cruiser);
    arr.push(cruiser_2);
    arr.push(cruiser_3);
  }

  for (let i = 3; i > 0; i--) {
    let destroyer = Math.floor(Math.random() * 100);
    let destroyer_2;
    if (turn()) {
      while (checkTwodeck(arr, destroyer, true) || destroyer + 10 > 99)
        destroyer = Math.floor(Math.random() * 100);
      destroyer_2 = destroyer + 10;
    } else {
      while (checkTwodeck(arr, destroyer, false))
        destroyer = Math.floor(Math.random() * 100);
      destroyer_2 = destroyer + 1;
    }
    arr.push(destroyer);
    arr.push(destroyer_2);
  }

  for (let i = 4; i > 0; i--) {
    let boat = Math.floor(Math.random() * 100);
    while (checkOnedeck(arr, boat)) {
      boat = Math.floor(Math.random() * 100);
    }
    arr.push(boat);
  }
}

document.addEventListener("keydown", (e) => {
  // меняет ориентацию при ручной расстановке кораблей
  removeClassesChoosenShips();
  if (e.which === 32) {
    if (horizontal) {
      horizontal = false;
    } else {
      horizontal = true;
    }
  }
});

start_button.onclick = (event) => {
  start = true;
  document.querySelector(".setting").hidden = true;
};

random_button.onclick = (event) => {
  // при нажатии кнопки 'случайная' происходит случайная расстановка кораблей.
  // перед этим прячет форму выбора кораблей и удаляет информацию о их рассположении
  // и состоянии
  choose_ships.hidden = true;
  location_player_navy.splice(0);
  randomLocations(location_player_navy);

  for (let i = 0; i < 100; i++) {
    if (player_field.children[i].classList.contains("player_navy")) {
      player_field.children[i].classList.remove("player_navy");
    }
  }

  player_navy = {
    onedeck_ship_1: { count: 1, decks: [] },
    onedeck_ship_2: { count: 1, decks: [] },
    onedeck_ship_3: { count: 1, decks: [] },
    onedeck_ship_4: { count: 1, decks: [] },
    twodeck_ship_1: { count: 2, decks: [] },
    twodeck_ship_2: { count: 2, decks: [] },
    twodeck_ship_3: { count: 2, decks: [] },
    threedeck_ship_1: { count: 3, decks: [] },
    threedeck_ship_2: { count: 3, decks: [] },
    fourdeck_ship_1: { count: 4, decks: [] },
  };

  addRandomShips(player_navy, location_player_navy);

  for (let i = 0; i < 100; i++) {
    const number_cell = Number(player_field.children[i].className.slice(7));
    if (location_player_navy.includes(number_cell)) {
      player_field.children[i].classList.add("player_navy");
    }
  }

  if (location_player_navy.length == 20) {
    document.querySelector(".start").hidden = false;
  }
};

handle_button.onclick = (event) => {
  // при нажатии на кнопку 'ручная' показывает форму с выбором кораблей.
  // стирает информацию о текущем положении и состоянии кораблей.
  // обновляет колличество доступных кораблей
  // делает доступным добавление кораблей в ручную.
  if (start) return;
  choose_ships.hidden = false;
  location_player_navy.splice(0);

  onedeck_radio = 4;
  twodeck_radio = 3;
  threedeck_radio = 2;
  fourdeck_radio = 1;

  player_navy = {
    onedeck_ship_1: { count: 1, decks: [] },
    onedeck_ship_2: { count: 1, decks: [] },
    onedeck_ship_3: { count: 1, decks: [] },
    onedeck_ship_4: { count: 1, decks: [] },
    twodeck_ship_1: { count: 2, decks: [] },
    twodeck_ship_2: { count: 2, decks: [] },
    twodeck_ship_3: { count: 2, decks: [] },
    threedeck_ship_1: { count: 3, decks: [] },
    threedeck_ship_2: { count: 3, decks: [] },
    fourdeck_ship_1: { count: 4, decks: [] },
  };

  for (let i = 0; i < 100; i++) {
    if (player_field.children[i].classList.contains("player_navy")) {
      player_field.children[i].classList.remove("player_navy");
    }
  }
};

document.querySelector(".onedeck").onclick = (event) => {
  // при наведении мышки на поле игрока, подсвечивает область добавления однопалубного коробля
  // делает доступным добавление однопалубного корабля
  player_field.onmouseover = (event) => {
    let target = event.target;
    if (target.parentElement.className != "player") return;
    target.classList.add("player_choose-place");

    target.onclick = (event) => {
      addShip(target, "onedeck", onedeck_radio, 1);
      onedeckcount.innerHTML = onedeck_radio;
    };
  };

  player_field.onmouseout = (event) => {
    let target = event.target;
    if (target.parentElement.className != "player") return;
    target.classList.remove("player_choose-place");
  };
};

document.querySelector(".twodeck").onclick = (event) => {
  // при наведении мышки на поле игрока, подсвечивает область добавления двухпалубного коробля
  // делает доступным добавление двухпалубного корабля
  player_field.onmouseover = (event) => {
    let target = event.target;
    if (horizontal) {
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let twodeck = player_field.children[num_twodeck];

      if (target.parentElement.className != "player") return;

      if (
        +target.className.slice(8, 9) != 9 &&
        +target.className.slice(7, 9) != 9
      ) {
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "twodeck", twodeck_radio, 2);
          twodeckcount.innerHTML = twodeck_radio;
        };
      }
    } else {
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let twodeck = player_field.children[num_twodeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 90) {
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "twodeck", twodeck_radio, 2);
          twodeckcount.innerHTML = twodeck_radio;
        };
      }
    }
  };

  player_field.onmouseout = (event) => {
    if (horizontal) {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let twodeck = player_field.children[num_twodeck];

      if (target.parentElement.className != "player") return;

      twodeck.classList.remove("player_choose-place");
      target.classList.remove("player_choose-place");
    } else {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let twodeck = player_field.children[num_twodeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 90) {
        twodeck.classList.remove("player_choose-place");
        target.classList.remove("player_choose-place");
      }
    }
  };
};

document.querySelector(".threedeck").onclick = (event) => {
  // при наведении мышки на поле игрока, подсвечивает область добавления трехпалубного коробля
  // делает доступным добавление трехпалубного корабля
  player_field.onmouseover = (event) => {
    let target = event.target;
    if (horizontal) {
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let num_threedeck = +target.className.slice(7, 9) + 2;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];

      if (target.parentElement.className != "player") return;

      if (
        +target.className.slice(8, 9) != 9 &&
        +target.className.slice(7, 9) != 9 &&
        +target.className.slice(8, 9) != 8 &&
        +target.className.slice(7, 9) != 8
      ) {
        threedeck.classList.add("player_choose-place");
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "threedeck", threedeck_radio, 3);
          threedeckcount.innerHTML = threedeck_radio;
        };
      }
    } else {
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let num_threedeck = +target.className.slice(7, 9) + 20;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 80) {
        threedeck.classList.add("player_choose-place");
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "threedeck", threedeck_radio, 3);
          threedeckcount.innerHTML = threedeck_radio;
        };
      }
    }
  };

  player_field.onmouseout = (event) => {
    if (horizontal) {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let num_threedeck = +target.className.slice(7, 9) + 2;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];

      if (target.parentElement.className != "player") return;

      threedeck.classList.remove("player_choose-place");
      twodeck.classList.remove("player_choose-place");
      target.classList.remove("player_choose-place");
    } else {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let num_threedeck = +target.className.slice(7, 9) + 20;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 80) {
        threedeck.classList.remove("player_choose-place");
        twodeck.classList.remove("player_choose-place");
        target.classList.remove("player_choose-place");
      }
    }
  };
};

document.querySelector(".fourdeck").onclick = (event) => {
  // при наведении мышки на поле игрока, подсвечивает область добавления четырехпалубного коробля
  // делает доступным добавление четырехпалубного корабля
  player_field.onmouseover = (event) => {
    let target = event.target;
    if (horizontal) {
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let num_threedeck = +target.className.slice(7, 9) + 2;
      let num_fourdeck = +target.className.slice(7, 9) + 3;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];
      let fourdeck = player_field.children[num_fourdeck];

      if (target.parentElement.className != "player") return;

      if (
        +target.className.slice(8, 9) != 9 &&
        +target.className.slice(7, 9) != 9 &&
        +target.className.slice(8, 9) != 8 &&
        +target.className.slice(7, 9) != 8 &&
        +target.className.slice(8, 9) != 7 &&
        +target.className.slice(7, 9) != 7
      ) {
        fourdeck.classList.add("player_choose-place");
        threedeck.classList.add("player_choose-place");
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "fourdeck", fourdeck_radio, 4);
          fourdeckcount.innerHTML = fourdeck_radio;
        };
      }
    } else {
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let num_threedeck = +target.className.slice(7, 9) + 20;
      let num_fourdeck = +target.className.slice(7, 9) + 30;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];
      let fourdeck = player_field.children[num_fourdeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 70) {
        fourdeck.classList.add("player_choose-place");
        threedeck.classList.add("player_choose-place");
        twodeck.classList.add("player_choose-place");
        target.classList.add("player_choose-place");

        target.onclick = (event) => {
          addShip(target, "fourdeck", fourdeck_radio, 4);
          fourdeckcount.innerHTML = fourdeck_radio;
        };
      }
    }
  };

  player_field.onmouseout = (event) => {
    if (horizontal) {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 1;
      let num_threedeck = +target.className.slice(7, 9) + 2;
      let num_fourdeck = +target.className.slice(7, 9) + 3;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];
      let fourdeck = player_field.children[num_fourdeck];

      if (target.parentElement.className != "player") return;

      fourdeck.classList.remove("player_choose-place");
      threedeck.classList.remove("player_choose-place");
      twodeck.classList.remove("player_choose-place");
      target.classList.remove("player_choose-place");
    } else {
      let target = event.target;
      let num_twodeck = +target.className.slice(7, 9) + 10;
      let num_threedeck = +target.className.slice(7, 9) + 20;
      let num_fourdeck = +target.className.slice(7, 9) + 30;
      let twodeck = player_field.children[num_twodeck];
      let threedeck = player_field.children[num_threedeck];
      let fourdeck = player_field.children[num_fourdeck];

      if (target.parentElement.className != "player") return;

      if (+target.className.slice(7, 9) < 70) {
        fourdeck.classList.remove("player_choose-place");
        threedeck.classList.remove("player_choose-place");
        twodeck.classList.remove("player_choose-place");
        target.classList.remove("player_choose-place");
      }
    }
  };
};

// производит случайную расстановку кораблей компьютера
randomLocations(location_computer_navy);
addRandomShips(computer_navy, location_computer_navy);

computer_field.onclick = (event) => {
  // при нажатии на поле компьютера происходит выстрел.
  // проверяет, если старт true, то делает проверку выстрела
  // при попадании по компьютеру выходит из функции.
  // при промахе, стреляет компьютер
  if (!start) return;
  let target = event.target;
  let chosen_cell = Math.floor(Math.random() * blank_cells.length);
  let shoot = blank_cells[chosen_cell];

  if (
    target.parentElement.className != "computer" ||
    target.classList.contains("destroyed") ||
    target.classList.contains("crashed_ship") ||
    target.classList.contains("miss")
  )
    return;

  if (location_computer_navy.includes(+target.classList[0].slice(9))) {
    // если игрок попал, то добавляем класс crashed_ship к данной клетке.
    target.classList.add("crashed_ship");
    for (let ship in computer_navy) {
      // проверяем статус кораблей компьютера, после чего отнимаем из соответствующего
      // поля count единицу
      if (
        computer_navy[ship]["decks"][0].includes(+target.classList[0].slice(9))
      ) {
        computer_navy[ship]["count"] = computer_navy[ship]["count"] - 1;
      }

      if (!computer_navy[ship]["count"]) {
        // если поле count у соответствующего коробля равно нулю,
        // то делает проверки на возможность добавления класса miss для соседних
        // с потопленным кораблем клеток.
        // удаляет у клеток потопленного корабля класс crashed_ships и добавляет класс destroyer
        // удаляет информацию о коробле из объекта свойств кораблей
        for (let deck of computer_navy[ship]["decks"][0]) {
          destroyed_deck = document.querySelector(`.computer_${deck}`);
          destroyed_deck.classList.add("destroyed");

          if (
            String(deck).indexOf("9", 1) == -1 &&
            deck != 9 &&
            !ship[1].includes(deck + 1)
          ) {
            document
              .querySelector(`.computer_${deck + 1}`)
              .classList.add("miss");
          }

          if (!String(deck).includes("0") && !ship[1].includes(deck - 1)) {
            document
              .querySelector(`.computer_${deck - 1}`)
              .classList.add("miss");
          }

          if (deck - 10 >= 0 && !ship[1].includes(deck - 10)) {
            document
              .querySelector(`.computer_${deck - 10}`)
              .classList.add("miss");
          }

          if (deck + 10 < 100 && !ship[1].includes(deck + 10)) {
            document
              .querySelector(`.computer_${deck + 10}`)
              .classList.add("miss");
          }

          if (String(deck - 9).indexOf("0", 1) == -1 && deck - 9 > 0) {
            document
              .querySelector(`.computer_${deck - 9}`)
              .classList.add("miss");
          }

          if (deck + 11 < 100 && String(deck + 11).indexOf("0", 1) == -1) {
            document
              .querySelector(`.computer_${deck + 11}`)
              .classList.add("miss");
          }

          if (deck - 11 >= 0 && String(deck - 11).indexOf("9", 1) == -1) {
            document
              .querySelector(`.computer_${deck - 11}`)
              .classList.add("miss");
          }

          if (
            deck + 9 < 99 &&
            deck + 9 != 9 &&
            String(deck + 9).indexOf("9", 1) == -1
          ) {
            document
              .querySelector(`.computer_${deck + 9}`)
              .classList.add("miss");
          }
        }
        delete computer_navy[ship];
      }
    }
    return;
  } else {
    target.classList.add("miss");
  }

  if (crashed_ships.length) {
    // перед выстрелом компьютер проверяет наличие раненных кораблей.
    // если такие имеются, то стреляет в соседнюю с ним клетку
    do {
      if (
        crashed_ships.length > 1 &&
        crashed_ships[0] + 1 == crashed_ships[1]
      ) {
        let rand = Math.floor(Math.random() * crashed_ships.length);
        shoot = randomCrashX(crashed_ships[rand], computer_shoots[0]);
        chosen_cell = blank_cells.indexOf(shoot);
      } else if (crashed_ships.length > 1) {
        let rand = Math.floor(Math.random() * crashed_ships.length);
        shoot = randomCrashY(crashed_ships[rand], computer_shoots[0]);
        chosen_cell = blank_cells.indexOf(shoot);
      } else if (crashed_ships) {
        if (turn()) {
          let rand = Math.floor(Math.random() * crashed_ships.length);
          shoot = randomCrashX(crashed_ships[rand], computer_shoots[0]);
          chosen_cell = blank_cells.indexOf(shoot);
        } else {
          let rand = Math.floor(Math.random() * crashed_ships.length);
          shoot = randomCrashY(crashed_ships[rand], computer_shoots[0]);
          chosen_cell = blank_cells.indexOf(shoot);
        }
      } else {
        shoot = blank_cells[chosen_cell];
      }
    } while (computer_shoots.includes(shoot));
  }

  while (computer_shoots.includes(shoot)) {
    // если выстрел компьютера совпадает с уже проведенными выстрелами,
    // то меняет номер выстрела
    blank_cells.splice(chosen_cell, 1);
    chosen_cell = Math.floor(Math.random() * blank_cells.length);
    shoot = blank_cells[chosen_cell];
  }

  while (player_field.children[shoot].classList.contains("player_navy")) {
    // если компьютер попал, то добавляем класс crashed_ship к данной клетке.
    player_field.children[shoot].classList.add("crashed_ship");
    crashed_ships.push(shoot);
    computer_shoots.push(shoot);

    for (let ship in player_navy) {
      if (player_navy[ship]["decks"][0].includes(shoot)) {
        player_navy[ship]["count"] = player_navy[ship]["count"] - 1;
      }

      if (!player_navy[ship]["count"]) {
        for (let deck of player_navy[ship]["decks"][0]) {
          destroyed_deck = document.querySelector(`.player_${deck}`);
          destroyed_deck.classList.remove("crashed_ship");
          destroyed_deck.classList.add("destroyed");
          crashed_ships.splice(0, crashed_ships.length);

          if (
            String(deck).indexOf("9", 1) == -1 &&
            deck != 9 &&
            !player_navy[ship]["decks"][0].includes(deck + 1)
          ) {
            document.querySelector(`.player_${deck + 1}`).classList.add("miss");
            if (!computer_shoots.includes(deck + 1)) {
              computer_shoots.push(deck + 1);
            }
          }

          if (
            !String(deck).includes("0") &&
            !player_navy[ship]["decks"][0].includes(deck - 1)
          ) {
            document.querySelector(`.player_${deck - 1}`).classList.add("miss");
            if (!computer_shoots.includes(deck - 1)) {
              computer_shoots.push(deck - 1);
            }
          }

          if (
            deck - 10 >= 0 &&
            !player_navy[ship]["decks"][0].includes(deck - 10)
          ) {
            document
              .querySelector(`.player_${deck - 10}`)
              .classList.add("miss");
            if (!computer_shoots.includes(deck + 1)) {
              computer_shoots.push(deck - 10);
            }
          }

          if (
            deck + 10 < 100 &&
            !player_navy[ship]["decks"][0].includes(deck + 10)
          ) {
            document
              .querySelector(`.player_${deck + 10}`)
              .classList.add("miss");
            if (!computer_shoots.includes(deck + 10)) {
              computer_shoots.push(deck + 10);
            }
          }

          if (String(deck - 9).indexOf("0", 1) == -1 && deck - 9 > 0) {
            document.querySelector(`.player_${deck - 9}`).classList.add("miss");
            if (!computer_shoots.includes(deck - 9)) {
              computer_shoots.push(deck - 9);
            }
          }

          if (deck + 11 < 100 && String(deck + 11).indexOf("0", 1) == -1) {
            document
              .querySelector(`.player_${deck + 11}`)
              .classList.add("miss");
            if (!computer_shoots.includes(deck + 11)) {
              computer_shoots.push(deck + 11);
            }
          }

          if (deck - 11 >= 0 && String(deck - 11).indexOf("9", 1) == -1) {
            document
              .querySelector(`.player_${deck - 11}`)
              .classList.add("miss");
            if (!computer_shoots.includes(deck - 11)) {
              computer_shoots.push(deck - 11);
            }
          }

          if (
            deck + 9 < 99 &&
            deck + 9 != 9 &&
            String(deck + 9).indexOf("9", 1) == -1
          ) {
            document.querySelector(`.player_${deck + 9}`).classList.add("miss");
            if (!computer_shoots.includes(deck + 9)) {
              computer_shoots.push(deck + 9);
            }
          }
        }
        delete player_navy[ship];
      }
    }

    crashed_ships.sort((a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      if (a < b) return -1;
    });
    blank_cells.splice(chosen_cell, 1);
    chosen_cell = Math.floor(Math.random() * blank_cells.length);

    do {
      if (
        crashed_ships.length > 1 &&
        crashed_ships[0] + 1 == crashed_ships[1]
      ) {
        let rand = Math.floor(Math.random() * crashed_ships.length);
        shoot = randomCrashX(crashed_ships[rand], computer_shoots[0]);
        chosen_cell = blank_cells.indexOf(shoot);
      } else if (crashed_ships.length > 1) {
        let rand = Math.floor(Math.random() * crashed_ships.length);
        shoot = randomCrashY(crashed_ships[rand], computer_shoots[0]);
        chosen_cell = blank_cells.indexOf(shoot);
      } else if (crashed_ships.length) {
        if (turn()) {
          let rand = Math.floor(Math.random() * crashed_ships.length);
          shoot = randomCrashX(crashed_ships[rand], computer_shoots[0]);
          chosen_cell = blank_cells.indexOf(shoot);
        } else {
          let rand = Math.floor(Math.random() * crashed_ships.length);
          shoot = randomCrashY(crashed_ships[rand], computer_shoots[0]);
          chosen_cell = blank_cells.indexOf(shoot);
        }
      } else {
        chosen_cell = Math.floor(Math.random() * blank_cells.length);
        shoot = blank_cells[chosen_cell];
      }
    } while (computer_shoots.includes(shoot));
  }

  if (!player_field.children[shoot].classList.contains("player_navy")) {
    player_field.children[shoot].classList.add("miss");
    computer_shoots.push(shoot);
    blank_cells.splice(chosen_cell, 1);
  }
};

computer_field.onmouseover = (event) => {
  if (player_field.querySelectorAll(".destroyed").length == 20) {
    alert("Компьютер победил!");
    location.reload();
  }

  if (computer_field.querySelectorAll(".destroyed").length == 20) {
    alert("Игрок победил!");
    location.reload();
  }
};
document.onload(alert("Добрый день, дорогой юзер! Что бы начать игру расставьте корабли на поле вручную (нажатие кнопки Space при ручной расстановке меняет положение корабля вертикально-горизонтально) или рандомно, затем нажмите кнопку старт. Победит тот, кто быстрее потопит все корабли противника."))

