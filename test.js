
'use strict'
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
cvs.width = window.innerWidth;
cvs.height = window.innerHeight;
var fonSpase = new Image();
var liner = new Image();
var zlo = new Image();
var laser = new Image();
laser.src ="laser4.png"
zlo.src = "zlo.png";
liner.src = "uss.png";
fonSpase.src = "fon.jpg";
var pozZloX = 0;//НАЧАЛЬНАЯ ПОЗИЦИЯ ВРАГА ПО Х
var pozZloY = 0;//НАЧАЛЬНАЯ ПОЗИЦИЯ ВРАГА ПО Х
var zloIterationX = 1;//ДВИЖЕНИЕ ВРАГА ПО Х
var zloIterationY = 1;//ДВИЖЕНИЕ ВРАА ПО У
var pozLinerX = cvs.width/2;//НАЧАЛЬНАЯ ПОЗИЦИЯ КОРАБЛЯ ПО Х
var pozLinerY = cvs.height/2;//НАЧАЛЬНАЯ ПОЗИЦИЯ КОРАБЛЯ ПО У
var x = cvs.width/2; //ЭМУЛЯЦИЯ НАЧАЛЬНОГО КЛИКА
var y = cvs.height/2;//ЭМУЛЯЦИЯ НАЧАЛЬНОГО КЛИКА
var pozitionX = 0;//НАЧАЛЬНАЯ ПОЗИЦИЯ КОРАБЛЯ ПО Х
var pozitionY = 0;//НАЧАЛЬНАЯ ПОЗИЦИЯ КОРАБЛЯ ПО Х
var iterationLaserX = 0;//ТРАЕКТОРИЯ ДВИЖЕНИЯ ЛАЗЕРА КОРАБЛЯ
var iterationLaserY = 0;//ТРАЕКТОРИЯ ДВИЖЕНИЯ ЛАЗЕРА КОРАБЛЯ
var pozLaserX = -50;//НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАЗЕРА КОРАБЛЯ ПО Х
var pozLaserY = -50;//НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАЗЕРА КОРАБЛЯ ПО Х
var iLaserZloX = 0;//ТРАЕКТОРИЯ ДВИЖЕНИЯ ЛАЗЕРА ВРГА
var iLaserZloY = 0;//ТРАЕКТОРИЯ ДВИЖЕНИЯ ЛАЗЕРА ВРАГА
var pLaserZloX = -50;//НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАЗЕРА КОРАБЛЯ ВРАГА
var pLaserZloY = -50;//НАЧАЛЬНАЯ ПОЗИЦИЯ ЛАЗЕРА КОРАБЛЯ ВРАГА
var war = false;//ПЕРЕКЛЮЧАЛЕЛЬ АТАКИ
var war1 = true;//ПЕРЕКЛЮЧАТЕЛЬ ПЕРВОГО ВЫСТРЕЛА
var timerId;//ТАЙМЕР ВЫСТРЕЛОВ

function funcDraw(){//...............ФУНКЦИЯ ОТРИСОВКИ
  ctx.drawImage(fonSpase, 0, 0,cvs.width,cvs.height);//РИСУЕМ ФОН
  
  $('#canvas').click(function(e){//СЛУШАЕМ КЛИК И ЗАПИСЫВАЕМ КООРДИНАТЫ В Х И У
    x = e.pageX;
    y = e.pageY;
    gowey(x, y);
  });

  if(Math.abs(pozLinerX - pozZloX) < 200 && Math.abs(pozLinerY - pozZloY) < 200){ //ПЕРЕКЛЮЧАТЕЛЬ АТАКИ
    war = true; //...... РАЗРЕШИТЬ АТАКУ
    if(war1)laserCoor();// ВЫЗОВ ПЕРВОГО ВЫСТРЕЛА
    war1 = false;// ЗАПРЕТ ПОСТОЯННОГО ВЫЗОВА ФУНКЦИИ ПЕРВОГО ВЫСТРЕЛА
  }
  if(Math.abs(pozLinerX - pozZloX) > 200 || Math.abs(pozLinerY - pozZloY) > 200){ //ПЕРЕКЛЮЧАТЕЛЬ АТАКИ
    war = false; //.......ЗАПРЕТ АТАКИ
    war1 = true;// РАЗРЕШИТЬ ПЕРВЫЙ ВЫСТРЕЛ ПРИ ПРИБЛИЖЕНИИ
    clearTimeout(timerId);//......ОЧИСТИТЬ ТАЙМЕР ВЫСТРЕЛОВ
  }



  if(Math.abs((pozLaserX + 25) - (pozZloX + 35)) < 30 && Math.abs((pozLaserY + 25) - (pozZloY +25)) < 20)gameReload();

  if(Math.abs(pozLinerX-x)< 10)pozitionX = 0;//ЕСЛИ ДО КОНЕЧНОЙ ПОЗИЦИИ МЕНЬШЕ 10 ШАГОВ ТО СТОП
  if(Math.abs(pozLinerY-y)< 10)pozitionY = 0;//ЕСЛИ ДО КОНЕЧНОЙ ПОЗИЦИИ МЕНЬШЕ 10 ШАГОВ ТО СТОП
  ctx.drawImage(zlo, pozZloX += zloIterationX, pozZloY += zloIterationY, 70, 50);
  ctx.drawImage(liner, pozLinerX += pozitionX, pozLinerY += pozitionY, 70, 70); //ФУНКЦИЯ ОТРИСОВКИ КОРАБЛЯ
  ctx.drawImage(laser , pozLaserX += iterationLaserX, pozLaserY += iterationLaserY, 50, 50 );
  ctx.drawImage(laser , pozLinerX, pozLinerY, 20, 20 );
  setTimeout(funcDraw, 20); //ПЕРЕЗАПУСК ФУНКЦИИ ОТРИСОВКИ ВСЕГО ХОЛСТА
}

function laserCoor(){     // ФУНКЦИЯ АТАКИ
  pozLaserX=pozLinerX;//......ПОСТАВИТЬ СНАРАЯД НА ИСХОДНУЮ ПОЗИЦИЮ
  pozLaserY=pozLinerY;//...... ПОСТАВИТЬ СНАРЯД НА ИСХОДНУЮ ПОЗИЦИЮ
  if(war){//...... ЕСЛИ РАЗРЕШЕНА АТАКА
    goLaser();//...... РАСЧЕТ ВЫСТРЕЛА
    timerId = setTimeout(laserCoor, 5000);//......ЗАПУСТИТЬ ТАЙМЕР АТАКИ
  }
}

setInterval(goCoorZlo, 5000);//......ЗАПУСК ТАЙМЕРА ДВИЖЕНИЯ ПРОТИВНИКА
function goCoorZlo(){//......ФУНКЦИЯ ДВИЖЕНИЯ ПРОТИВНИКА
  var goX = Math.floor(Math.random()*(cvs.width));//ВЫБОР РАНДОМНОЙ КООРДИНАТЫ ДВИЖЕНИЯ
  var goY = Math.floor(Math.random()*(cvs.height));//......ВЫБОР РАНДОМНОЙ КООРДИНАТЫ ДВИЖЕНИЯ
  gozlo(goX, goY);//......РАСЧЕТ ТРАЕКТОРИИ ПРОТИВНИКА
}

function gowey(clickX, clickY){//................................ФУНКЦИЯ ДВИЖЕНИЯ
  pozitionX = clickX - pozLinerX;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ Х
  pozitionY = clickY - pozLinerY;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ У

  if(Math.abs(pozitionX) > Math.abs(pozitionY) && pozitionX !=0){//ЕСЛИ СТОРОНА Х БОЛЬШЕ У РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    pozitionY = pozitionY /Math.abs(pozitionX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ У
    pozitionX = pozitionX /Math.abs(pozitionX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
  }
  if(Math.abs(pozitionX) < Math.abs(pozitionY) && pozitionY !=0){//ЕСЛИ СТОРОНА У БОЛЬШЕ Ч РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    pozitionX = pozitionX / Math.abs(pozitionY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
    pozitionY = pozitionY / Math.abs(pozitionY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ У
  }
  if(pozitionX == 0)pozitionY = pozitionY / Math.abs(pozitionY);//ЕСЛИ Х РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО У
  if(pozitionY == 0)pozitionX = pozitionX / Math.abs(pozitionX);//ЕСЛИ У РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО Х

  if(Math.abs(pozLinerX-clickX)< 10)x=pozLinerX;//..................ЕСЛИ ДО КОНЕЧНОЙ ПОЗИЦИИ МЕНЬШЕ 10 ШАГОВ ТО СТОП
  if(Math.abs(pozLinerY-clickY)< 10)y=pozLinerY;//..................ЕСЛИ ДО КОНЕЧНОЙ ПОЗИЦИИ МЕНЬШЕ 10 ШАГОВ ТО СТОП
  pozitionX *= 3;
  pozitionY *= 3;
}

function gozlo(clickX, clickY){//................................ФУНКЦИЯ ДВИЖЕНИЯ
  zloIterationX = clickX - pozZloX;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ Х
  zloIterationY = clickY - pozZloY;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ У

  if(Math.abs(zloIterationX) > Math.abs(zloIterationY) && zloIterationX !=0){//ЕСЛИ СТОРОНА Х БОЛЬШЕ У РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    zloIterationY = zloIterationY /Math.abs(zloIterationX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ У
    zloIterationX = zloIterationX /Math.abs(zloIterationX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
  }
  if(Math.abs(zloIterationX) < Math.abs(zloIterationY) && zloIterationY !=0){//ЕСЛИ СТОРОНА У БОЛЬШЕ Ч РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    zloIterationX = zloIterationX / Math.abs(zloIterationY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
    zloIterationY = zloIterationY / Math.abs(zloIterationY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ У
  }
  if(zloIterationX == 0)zloIterationY = zloIterationY / Math.abs(zloIterationY);//ЕСЛИ Х РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО У
  if(zloIterationY == 0)zloIterationX = zloIterationX / Math.abs(zloIterationX);//ЕСЛИ У РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО Х
 
}

function goLaser(){
  iterationLaserX = pozZloX - pozLinerX;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ Х
  iterationLaserY = pozZloY - pozLinerY;//..........................РАСЧИТЫВАЕМ РАССТОЯНИЕ ПО ОСИ У

  if(Math.abs(iterationLaserX) > Math.abs(iterationLaserY) && iterationLaserX !=0){//ЕСЛИ СТОРОНА Х БОЛЬШЕ У РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    iterationLaserY = iterationLaserY /Math.abs(iterationLaserX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ У
    iterationLaserX = iterationLaserX /Math.abs(iterationLaserX);//.................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
  }
  if(Math.abs(iterationLaserX) < Math.abs(iterationLaserY) && iterationLaserY !=0){//ЕСЛИ СТОРОНА У БОЛЬШЕ Ч РАССЧИТАЕМ ШАГ ДВИЖЕНИЯ
    iterationLaserX = iterationLaserX / Math.abs(iterationLaserY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ Х
    iterationLaserY = iterationLaserY / Math.abs(iterationLaserY);//................ШАГ ДВИЖЕНИЯ ПО ОСИ У
  }
  if(iterationLaserX == 0)iterationLaserY = iterationLaserY / Math.abs(iterationLaserY);//ЕСЛИ Х РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО У
  if(iterationLaserY == 0)iterationLaserX = iterationLaserX / Math.abs(iterationLaserX);//ЕСЛИ У РАВНА НУЛЮ ПРИСВОИМ ШАГ ДВИЖЕНИЯ ПО Х
  iterationLaserX *=2;//...... СКОРОСТЬ КОРАБЛЯ
  iterationLaserY *=2;//...... СКОРОСТЬ КОРАБЛЯ
  clearTimeout(timerId);
}

function gameReload(){//...... ФУНКЦИЯ ПЕРЕЗАПУСКА ИГРЫ ПРИ УНИЧТОЖЕНИИ ПРОТИВНИКА
  pozZloX = Math.floor(Math.random()*(cvs.width));//......РАНДОМНОЕ ПОЯВЛЕНИЕ ПРОТИВНИКА
  pozZloY = Math.floor(Math.random()*(cvs.height));//......РАНДОМНОЕ ПОЯВЛЕНИЕ ПРОТИВНИКА
  pozLaserX = -110;//......ПОСТАВИТЬ СНАРЯД ЗА ЭКРАН
  pozLaserY = -110;//......ПОСТАВИТЬ СНАРЯД ЗА ЭКРАН
  iterationLaserX = 0;//......ТРАЕКТОРИЯ ДВИЖЕНИЯ СНАРЯДА
  iterationLaserY = 0;//...... ТРАЕКТОРИЯ ДВИЖЕНИЯ СНАРЯДА
  clearTimeout(timerId);//...... ОЧИСТИТЬ ТАЙМЕР АТАКИ
}



window.onload = funcDraw;
