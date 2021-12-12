
[![codecov](https://codecov.io/gh/lanasergeeva/job4j_cars/branch/master/graph/badge.svg?token=F75LP30E3Q)](https://codecov.io/gh/lanasergeeva/job4j_cars)

[![Build Status](https://app.travis-ci.com/lanasergeeva/job4j_cars.svg?branch=master)](https://app.travis-ci.com/lanasergeeva/job4j_cars)

# Площадка по продаже авто

+ [Описание](#Описание-проекта)
+ [Технологии](#Используемые-технологии)


## Описание проекта
Это  web-приложение, которое представляет из себя площадку по продаже автомобилей. 
Доступ к сайту имеют только зарегистрированные пользователи, которые прошли процесс авторизации.
У пользователя есть возможность добавить, удалить объявление, сменить его статус, сменить/удалить фото.
Реализован фильтр для поиска авто. Вся информация хранится в базе данных.


## Используемые технологии
+ **Maven**
+ **HTML**, **CSS**, **AJAX**, **Jquery**, **Javascript**
+ **Java 14**, **JDBC**, **Servlet**, **Hibernate**

## Общий вид приложения

## Старинцы с авторизацией и регистрацией

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/log.jpg)

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/reg.jpg)

## При авторизации и регистриции добавлена валдиация вводимых значений, все поля должны быть заполнены

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/log.jpg)

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/validlog.jpg)

## Email уникальный, поэтому при попытке создать пользователя с email, который уже есть в базе, мы увидим предупреждение

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/userexist.jpg)

## На стартовой странице мы увидим все объвления пользователей, а также разделы, куда мы можем перейти: Мои объявления, Добавить объявление и Выйти из аккаунта

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/start.jpg)


## Форма добавления нового объявления. Здесь добавленая возможность выбора фото, а также по ссылку можно вернуться в главное меню.

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/newadds.jpg)

## Для полей Пробег и Стоимость добавленая валидация

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/newaddvalid.jpg)

## Если в форме не были заполнены все данные, то страница перезагрузится и внизу появится извещение, что нужно заполнить все поля. Если фото не заполнено, то у объявления будет дефолтное изображение.

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/newaddnotall.jpg)

## Если добавление прошло успешно нас перенаправит в Мои объявления. Здесь мы можем поменять/удалить фото у нашего объявление, удалить само объявление или сменить статус на Продано.

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/setphotojpg.jpg)

## Если статус объявления - Продано. Тогда оно принимает такой вид

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/sold.jpg)

## Демонстрация смены статуса и удаление объявление

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/changedeleteowns.gif)

## Фильтры
![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/menufolters.gif)

## Демонстрация работы фильтров

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/filters.gif)

## Поиск по статусу
![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/status.gif)

## Поиск по годам

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/filteryear.gif)

## Работа меню

![alt text](https://github.com/lanasergeeva/job4j_cars/blob/master/src/main/webapp/image/workofnav.gif)