# KT Development Test

## Технологии

- HTML/CSS
- Flexbox/GRID
- SCSS
- JavaScript
- БЭМ
- отзывчивая, семантическая, кроссбраузерная верстка

Работа над проектом происходила в сборщике Gulp, который ускорял процесс верстки и позволял автоматически решать задачи
- вёрстка компонентами
- адаптивные шрифты, отступы (sass:math)
- mixin, переменные и тд
- конвертация шрифтов и изображений
- минификация файлов

## Используемые библиотеки
В проекте использовался Swiper.js для реализации слайдеров.
В функционал добавлено решение которое автоматически строит слайдер по техническому классу, что упрощает работу в случае когда на сайте присутствуют множество различных вариантов слайдера.
Проект не завершен, по той причине что были попытки добавить в слайдер возможность прекращать работу слайдера на определенных брейкпоинтах. Так, как есть слайдеры у которых разные условия отображения, необходимо реализовать возможность работать с разными брейкпоинтами, решение - еще в работе.

## Header/Footer Menu

- Навигация реализована Spollers. Данное решение позволяет настроить меню так, чтобы на устройствах с hover выпадающее меню отображалось при наведении основного пункта меню. А на устройствах с touch срабатывал спойлер, который позволяет открывать выпадающее меню при нажатии на объект. Родителю элементов списка присваивается дата атрибут со значением или без. Обычный спойлер с дата атрибутом без каких-либо значений работает на всех брейкпоинтах. Спойлер у которого дата атрибут со значением работает на определенных брейкпоинтах. В значении атрибута указывается медиа-запрос при котором спойлер становится активным. В свою очередь самому элементу при нажатии на который будет отображаться подменю присваивается также дата атрибут.
- При клике на иконку поиска выпадает поле для ввода поиска

## Header Scroll
При скролле страницы, а точнее при прокрутке на расстояние больше чем высота шапки, к header присваевается класс scroll. Это позволяет менять стили шапки во время скролла. 

## Прокрутка при клике
Ссылке присвается дата атрибут который позволяет плавно прокрутить страницу до нужного блока. Во время скролла учитывается высота шапки, что решает вопрос скрытия блока под шапкой. Пример - пункт меню Contact.

## Popup
В проекте для реализации модальных окон работает скрипт который позволяет отображать контент при нажатии на элемент с классом _popup-link. В href указан путь к попапу по классу элемента. Пример - header (login) и блок News & Insights (events) при нажатии на иконки play.

## Body Scroll
При клике на меню бургер и popup срабатывает скрипт который присваивает body класс lock который запрещает прокрутку страницы.

## Динамический адаптив
С помошью этого решение на определенном брейкпоинте объекты header (кнопка, выбор языков и login) переносятся в блок с меню. Элементам присвается дата атрибут со значением которое указывает на то на каком брейкпоинте это правило сработает, куда перенести этот элемент (указывается класс) и необязательным значением является каким по очереди будет этот элемент в новом блоке. 

