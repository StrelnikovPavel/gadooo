
//</IBG>========================================================================================================
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
//</IBG>========================================================================================================
let iconMenu = document.querySelector('.icon-menu');
if (iconMenu != null) {
	let body = document.querySelector('body');
	let menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener('click', (e) => {
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active');
		if (iconMenu.classList.contains('_active')) {
			body.classList.add('_hide');
		} else {
			body.classList.remove('_hide');
		}
	});
};
//===============================================================================================================
document.querySelectorAll('.tabs-popular').forEach((item) =>
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('#', '');

		document.querySelectorAll('.tabs-popular').forEach(
			(child) => child.classList.remove('_active')
		);
		document.querySelectorAll('.tabs-block-popular').forEach(
			(child) => child.classList.remove('_active')
		);
		item.classList.add('_active');
		document.getElementById(id).classList.add('_active');
	})
);
document.querySelectorAll('.tabs-product').forEach((item) =>
	item.addEventListener('click', function (e) {
		e.preventDefault();
		const id = e.target.getAttribute('href').replace('#', '');

		document.querySelectorAll('.tabs-product').forEach(
			(child) => child.classList.remove('_active')
		);
		document.querySelectorAll('.tabs-block-product').forEach(
			(child) => child.classList.remove('_active')
		);
		item.classList.add('_active');
		document.getElementById(id).classList.add('_active');
	})
);

//=====================================================================================================
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// ???????????? ????????????????
	this.??bjects = [];
	this.daClassname = "_dynamic_adapt_";
	// ???????????? DOM-??????????????????
	this.nodes = document.querySelectorAll("[data-da]");

	// ???????????????????? ??bjects ????????????????
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const ??bject = {};
		??bject.element = node;
		??bject.parent = node.parentNode;
		??bject.destination = document.querySelector(dataArray[0].trim());
		??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		??bject.place = dataArray[2] ? dataArray[2].trim() : "last";
		??bject.index = this.indexInParent(??bject.parent, ??bject.element);
		this.??bjects.push(??bject);
	}

	this.arraySort(this.??bjects);

	// ???????????? ???????????????????? ??????????-????????????????
	this.mediaQueries = Array.prototype.map.call(this.??bjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// ?????????????????????? ?????????????????? ???? ??????????-????????????
	// ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// ???????????? ???????????????? ?? ???????????????????? ????????????????????????
		const ??bjectsFilter = Array.prototype.filter.call(this.??bjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, ??bjectsFilter);
		});
		this.mediaHandler(matchMedia, ??bjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			??bject.index = this.indexInParent(??bject.parent, ??bject.element);
			this.moveTo(??bject.place, ??bject.element, ??bject.destination);
		}
	} else {
		for (let i = 0; i < ??bjects.length; i++) {
			const ??bject = ??bjects[i];
			if (??bject.element.classList.contains(this.daClassname)) {
				this.moveBack(??bject.parent, ??bject.element, ??bject.index);
			}
		}
	}
};

// ?????????????? ??????????????????????
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

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place 
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
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
//=================================================================================
const defaultSelect = () => {
	const element = document.querySelectorAll('.meta__section');
	element.forEach(el => {
		const choices = new Choices(el, {
			searchEnabled: false,
		});
	});
}
defaultSelect();



//============================================================================================
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
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destray(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

//=========================
var slider = new Swiper('.cart__subslider', {
	spaceBetween: 20,
	slidesPerView: 4,
	speed: 1000,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	//centeredSlides: true,
	slidesPerGroup: 1,

	navigation: {
		nextEl: '.shope-box__pagination-r',
		prevEl: '.shope-box__pagination-l',
	},
	thumbs: {
		swiper: subslider
	},
	breakpoints: {
		320: {
			slidesPerView: 3,
		},
		450: {
			slidesPerView: 4,
		},
		768: {
			slidesPerView: 3,
		},
	},
});
var subslider = new Swiper('.cart__slider', {
	spaceBetween: 30,
	speed: 1000,
	slidesPerView: 2,
	watchSlidesVisibility: true,
	watchSlidesProgress: true,
	//centeredSlides: true,
	slidesPerGroup: 1,

	thumbs: {
		swiper: slider
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		450: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 1,
		},
	},
});

//==========================================================
const accordion = document.querySelectorAll('.accardeon-cart__block');

function accardions() {
	for (item of accordion) {
		item.addEventListener('click', function () {
			if (this.classList.contains('_active')) {
				this.classList.remove('_active');
			} else {
				for (el of accordion) {
					el.classList.remove('_active');
				}
				this.classList.add('_active')
			}
		})
	}
}
setTimeout(() => {
	accardions()
}, 100);