
"use strict";


function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();
'use strict';

// Bild Slider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}
function sliders_bild_callback(params) { }
let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}
function sliders_bild_callback(params) { }




const mx2 = window.matchMedia( '(max-width:991.98px)');
const mn2 = window.matchMedia( '(min-width:991.98px)');

// Experience Slider
new Swiper('.slider-experience__body', {
    autoHeight: false,
    speed: 1000,
    parallax: true,
    loop: true,
    grabCursor: true,
    mousewheel: {
        releaseOnEdges: true,
        sensitivity: 3,
    },
    breakpoints: {
        320: {
            slidesPerView: 1.15,
            spaceBetween: 16,
        },
        768: {
            slidesPerView: 1.3,
            spaceBetween: 32,
        },
        992: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
    },
});

// Highlighted Slider
new Swiper('.slider-highlighted__body', {
	effect: 'coverflow',
	slidesPerView: 1,
	autoHeight: false,
	speed: 1000,
	loop: true,
    loopAdditionalSlides: 1,
    parallax: true,
    grabCursor: true,
	navigation: {
		nextEl: '.slider-highlighted .slider-arrow_next',
		prevEl: '.slider-highlighted .slider-arrow_prev',
	},
});

// Expertise Slider
let sliderExpertise;
const breakpointCheckermx2 = function() {
    if (mx2.matches === true) {
        if (sliderExpertise !== undefined) sliderExpertise.destroy(true, true);
        return;
    }
    else if (mx2.matches === false) {
        return enableSwipermx2();
    }
};
const enableSwipermx2 = function() {
    sliderExpertise = new Swiper ('.slider-expertise__body',{
        effect: 'coverflow',
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        speed: 1000,
        parallax: true,
        grabCursor: true,
        mousewheel: {
            releaseOnEdges: true,
            sensitivity: 3,
        },
    });
};
mx2.addListener(breakpointCheckermx2);
breakpointCheckermx2();

// Experts Slider
    new Swiper('.experts__items', {
        observer: true,
        observeParents: true,
        autoHeight: false,
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 30,
        parallax: true,
        grabCursor: true,
        mousewheel: {
            releaseOnEdges: true,
            sensitivity: 3,
        },
});

// Tools Slider
let sliderTools;
const breakpointCheckermn2 = function() {
    if (mn2.matches === true) {
        if (sliderTools !== undefined) sliderTools.destroy(true, true);
        return;
    }
    else if (mn2.matches === false) {
        return enableSwipermn2();
    }
};
const enableSwipermn2 = function() {
    sliderTools = new Swiper ('.slider-tools__body',{
        observer: true,
        observeParents: true,
        autoHeight: false,
        slidesPerView: 2.5,
        speed: 1000,
        spaceBetween: 20,
        parallax: true,
        navigation: {
            nextEl: '.slider-tools .slider-arrow_next',
            prevEl: '.slider-tools .slider-arrow_prev',
	    },
    breakpoints: {
		320: {
			slidesPerView: 1.5,
		},
		660: {
			slidesPerView: 2.5,
		},
	},
    });
};
mn2.addListener(breakpointCheckermn2);
breakpointCheckermn2();

// Stories Slider
new Swiper ('.slider-stories__body', {
    effect: 'coverflow',
	slidesPerView: 1,
	autoHeight: false,
	speed: 1000,
	loop: true,
    loopAdditionalSlides: 1,
    parallax: true,
    grabCursor: true,
    pagination: {
        el: '.controls-slider-stories__dotts',
        clickable: true,
    },
});

"use strict"

// ===================== Header =========================
// Прослушиваем событие click
document.addEventListener("click", documentActions);
function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains('menu__arrow')) {
        targetElement.closest('.menu__item').classList.toggle('_active');  
    }
    if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._active').length > 0) {
        document.querySelector('.menu__item._active').classList.remove('_active');
    }
    // =============== Search Form ================== 
    // При клике на объект с классом search-form__btn объекту search-form__item присваивается класс _active и он становится видимым
    if (targetElement.classList.contains('search-form__btn')) {
        document.querySelector('.search-form__item').classList.toggle('_active');
    }
    // При клике на пустое пространство (родитель нажатого объекта не должен содержать класс search-form и должен быть объект с классом .search-form__item._active) search-form__item исчезает
    else if (!targetElement.closest('.search-form') && document.querySelector('.search-form__item._active')) {
        document.querySelector('.search-form__item').classList.remove('_active');
    }
}


// ===================== Menu Burger ========================
// Обращаемся к объекту Menu Burger, проверяем есть ли такой объект на странице
const iconMenu = document.querySelector('.icon-menu');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    // При клике на icon-menu он будет активирован вместе с меню. Body присваиваем класс _lock чтобы запретить странице скролиться во время активного меню
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });
}


// =================== Прокрутка при клике ====================
// Поиск объектов с калассом menu__link только с атрибутом data-goto
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// Проверяем есть ли такие объекты
if (menuLinks.length > 0) {
    // Вешаем на них событие click при котором будет срабатывать функция onMenuLinkClick
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    function onMenuLinkClick(e) {
        // Получаем объект на который мы кликнули
        const menuLink = e.target;
        // Проверяем есть ли значение у data атрибута и существует ли объект на который ссылается данный атрибут
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            // Получаем это объект
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            // Высчитываем положение объекта с учетом высоты header
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header__body').offsetHeight;
            // Закрытие меню и снятие _lock у body при нажатии на ссылку с якорем
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }
            // Заставляем scroll прокрутиться к нужному месту
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            // Отключаем работу ссылки по умолчанию
            e.preventDefault();
        }
    }
}


// ========================= Header scroll ======================
// Обращаемся к элементу header
const headerElement = document.querySelector('.header');
// В момент когда header находится в видимой части экрана класс _scroll отбирается
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) {
        headerElement.classList.remove('_scroll');
    }
    // В момент прокрутки страницы на расстояние больше высоты header, header присвоется класс _scroll
    else {
         headerElement.classList.add('_scroll');
    }};
// Следим за header методом IntersectionObserver, на сколько пикселей страница прокрутилась вниз
const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);


// ============================ Spollers ==============================
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение слойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});

	// Инициализация слойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаем уникальные брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		// Работаем с каждым брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			// Объекты с нужными условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}


// ========================= Slide Toggle =======================
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}


// ========================= Popups ======================
let unlock = true;
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			let video = el.getAttribute('data-video');
			popup_open(item, video);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item, video = '') {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="' + video + '" encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			document.body.classList.toggle('_lock');
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			document.body.classList.toggle('_lock');
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});


// ====================== Filter =======================
function filter() {
    const buttons = document.querySelectorAll('.filter__item')
    const slides = document.querySelectorAll('.filter__block')
    function filter (category, items) {
        items.forEach((item) => {
            const isItemFilter = !item.classList.contains(category)
            const isShowAll = category.toLowerCase() === 'all'
            if (isItemFilter && !isShowAll) {
                item.classList.add('hide')
            }
            else {
                item.classList.remove('hide')
            }
        })
    }
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            buttons.forEach((button)=>{
            button.classList.remove("active");
        })
            button.classList.add("active");
            const currentCategory = button.dataset.filter
            filter(currentCategory, slides)
        })
    });
}
filter()


