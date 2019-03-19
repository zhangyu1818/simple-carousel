// @ts-ignore
import styles from './index.scss';
import Tween from './tween';

enum directionType {
    left = 1,
    right = -1,
}

const clamp = (current: number, min: number, max: number) => Math.min(Math.max(min, current), max);

const jsToCss = (cssObject: any) => {
    if (!cssObject) return;
    let cssString = '';
    Object.keys(cssObject).forEach(key => {
        cssString += key.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) + ': ' + cssObject[key] + ';';
    });
    return cssString;
};
const direction = (offset: number) => (offset > 1 ? directionType.left : directionType.right);

const createPagination = (length: number, paginationStyle: any, dotStyle: any) => {
    let str = `<div class="${styles.pagination}" style="${jsToCss(paginationStyle)}">`;
    for (let i = 0; i < length; i++) {
        str += `<span style="${jsToCss(dotStyle)}" data-index="${i}" class="${styles.dot}${i === 0 ? ' ' + styles.current : ''}"></span>`;
    }
    str += '</div>';
    return str;
};

const createArrow = (prevButtonStyle: any, nextButtonStyle: any) =>
    `<span style="${jsToCss(prevButtonStyle)}" class="${styles.button} ${styles['prev-button']}"></span><span style="${jsToCss(nextButtonStyle)}" class="${
        styles.button
    } ${styles['next-button']}"></span>`;

const createScroll = (imgList: string[], width: string, height: string, pagination: boolean, button: boolean, customStyle: CarouselStyles) => {
    const { paginationStyle, dotStyle, prevButtonStyle, nextButtonStyle } = customStyle;
    const sliders = imgList.map(img => `<div class="${styles.slider}" style="background-image: url('${img}');width: ${width};height: ${height};"></div>`);
    return `<div class="${styles.carousel}" style="width: ${width};height: ${height};">
                <div class="${styles.scroll}">${sliders.join('')}</div>
                ${pagination ? createPagination(imgList.length - 2, paginationStyle, dotStyle) : ''}
                ${button ? createArrow(prevButtonStyle, nextButtonStyle) : ''}
            </div>`;
};

type TweenFunc =
    | 'Linear'
    | 'Quad.easeIn'
    | 'Quad.easeOut'
    | 'Quad.easeInOut'
    | 'Cubic.easeIn'
    | 'Cubic.easeOut'
    | 'Cubic.easeInOut'
    | 'Quart.easeIn'
    | 'Quart.easeOut'
    | 'Quart.easeInOut'
    | 'Quint.easeIn'
    | 'Quint.easeOut'
    | 'Quint.easeInOut'
    | 'Sine.easeIn'
    | 'Sine.easeOut'
    | 'Sine.easeInOut'
    | 'Expo.easeIn'
    | 'Expo.easeOut'
    | 'Expo.easeInOut'
    | 'Circ.easeIn'
    | 'Circ.easeOut'
    | 'Circ.easeInOut'
    | 'Elastic.easeIn'
    | 'Elastic.easeOut'
    | 'Elastic.easeInOut'
    | 'Back.easeIn'
    | 'Back.easeOut'
    | 'Back.easeInOut'
    | 'Bounce.easeIn'
    | 'Bounce.easeOut'
    | 'Bounce.easeInOut';

interface CarouselOption {
    width?: string;
    height?: string;
    element: string;
    duration?: number;
    tween?: TweenFunc;
    pagination?: boolean;
    arrowButton?: boolean;
    momentum?: number;
    autoplay?: boolean;
    autoplayDelay?: number;
    scale?: boolean;
}

type CarouselStyles = {
    paginationStyle?: object;
    dotStyle?: object;
    prevButtonStyle?: object;
    nextButtonStyle?: Object;
};
class Carousel {
    carouselWrapper: HTMLElement | null;
    scrollEle: HTMLElement | null;
    startInfo = {
        pos: 0,
        timeStamp: 0,
        isDrag: false,
    };
    moveInfo = {
        pos: 0,
        timeStamp: 0,
    };
    carouselWidth = 0;
    duration = 0;
    prevOffset = 0;
    currentOffset = 0;
    lastIndex = 0;
    currentIndex = 0;
    tween: string;
    dotsIndex = 0;
    maxOffset = 0;
    minOffset = 0;
    momentum = 2;
    dots: Array<HTMLElement>;
    sliders: Array<HTMLElement>;
    imgLength = 0;
    prevButton: HTMLElement | null;
    nextButton: HTMLElement | null;
    animateTimer = 0;
    animateCompleted = true;
    autoplay: boolean;
    autoplayTimer = 0;
    autoplayDelay: number;
    enableScale: boolean;
    prevScale = 1;
    scale = 1;

    constructor(imgList: string[], options: CarouselOption, customStyles: CarouselStyles = {}) {
        const {
            width = '1200px',
            height = '500px',
            element,
            duration = 1,
            pagination = true,
            arrowButton = true,
            momentum = 2,
            tween = 'Quart.easeOut',
            autoplay = true,
            autoplayDelay = 5,
            scale = false,
        } = options;
        this.carouselWrapper = document.querySelector(element);
        if (!this.carouselWrapper) throw new Error("can't find element");
        const list = [imgList[imgList.length - 1], ...imgList, imgList[0]];
        this.carouselWrapper.innerHTML = createScroll(list, width, height, pagination, arrowButton, customStyles);
        const { width: carouselWidth } = this.carouselWrapper.querySelector(`.${styles.carousel}`)!.getBoundingClientRect();
        this.carouselWidth = carouselWidth;
        this.minOffset = -imgList.length * carouselWidth;
        this.maxOffset = carouselWidth;
        this.imgLength = imgList.length;
        this.duration = duration;
        this.momentum = momentum;
        this.tween = tween;
        this.autoplay = autoplay;
        this.autoplayDelay = autoplayDelay * 1000;
        this.enableScale = scale;
        this.scrollEle = document.querySelector(`.${styles.scroll}`);
        this.scrollEle!.style.width = (imgList.length + 2) * carouselWidth + 'px';
        this.dots = Array.prototype.slice.call(document.querySelectorAll(`.${styles.dot}`));
        if (this.enableScale) this.sliders = Array.prototype.slice.call(document.querySelectorAll(`.${styles.slider}`));
        this.prevButton = document.querySelector(`.${styles['prev-button']}`);
        this.nextButton = document.querySelector(`.${styles['next-button']}`);
        window.addEventListener('mousedown', this.onDragStart);
        window.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);

        window.addEventListener('touchstart', this.onDragStart);
        window.addEventListener('touchmove', this.onDragMove);
        window.addEventListener('touchend', this.onDragEnd);

        this.carouselWrapper.addEventListener('click', this.onClickButton);

        if (autoplay) this.autoPlay();
    }

    onClickButton = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLElement;
        if (target.classList.contains(styles.button) && this.animateCompleted) {
            target.classList.contains(styles['prev-button']) ? ++this.currentIndex : --this.currentIndex;
            this.animate();
        } else if (target.classList.contains(styles.dot)) {
            const { index = 0 } = target.dataset;
            this.animate(-index);
        }
    };

    onDragStart = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        if (!target.classList.contains(styles.carousel)) return;
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        if (this.autoplayTimer) clearTimeout(this.autoplayTimer);
        const { timeStamp } = event;
        const { pageX } = event.type === 'mousedown' ? (event as MouseEvent) : (event as TouchEvent).touches[0];
        this.startInfo.pos = pageX;
        this.startInfo.timeStamp = timeStamp;
        this.startInfo.isDrag = true;
        this.lastIndex = this.currentIndex;
    };

    onDragMove = (event: MouseEvent | TouchEvent) => {
        if (!this.startInfo.isDrag) return;
        event.stopPropagation();
        const { timeStamp } = event;
        const { pageX } = event.type === 'mousemove' ? (event as MouseEvent) : (event as TouchEvent).touches[0];
        this.moveInfo.pos = pageX;
        this.moveInfo.timeStamp = timeStamp;
        const distance = this.moveInfo.pos - this.startInfo.pos;
        this.currentOffset = distance + this.prevOffset;
        const offsetDirection = direction(this.moveInfo.pos - this.startInfo.pos);
        if (this.currentOffset > this.carouselWidth / 2 && offsetDirection === directionType.left) {
            this.currentOffset += this.minOffset;
        } else if (this.currentOffset < this.minOffset + this.carouselWidth / 2 && offsetDirection === directionType.right) {
            this.currentOffset += -this.minOffset;
        }
        this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        if (this.enableScale) {
            this.scale = this.prevScale - Math.abs(distance) / this.carouselWidth / 2;
            this.sliders.forEach(slider => {
                slider.style.transform = `scale(${this.scale})`;
            });
        }
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
        const tempIndex = this.currentIndex % this.imgLength;
        this.setDotsIndex(tempIndex === 1 ? 1 - this.imgLength : tempIndex);
    };

    onDragEnd = (event: MouseEvent | TouchEvent) => {
        if (!this.startInfo.isDrag) return;
        event.stopPropagation();
        event.preventDefault();
        this.startInfo.isDrag = false;
        this.prevOffset = this.currentOffset;
        if (this.enableScale) this.prevScale = this.scale;
        const speed = (this.moveInfo.pos - this.startInfo.pos) / (this.moveInfo.timeStamp - this.startInfo.timeStamp);
        if (this.lastIndex === this.currentIndex && Math.abs(speed) > this.momentum) speed > 0 ? this.currentIndex++ : this.currentIndex--;
        this.animate();
    };

    setDotsIndex = (currentIndex?: number) => {
        this.dotsIndex = Math.round(clamp(this.currentOffset, this.minOffset + this.carouselWidth, 0) / this.carouselWidth);
        this.dots.forEach((dot, index) =>
            index === Math.abs(currentIndex !== undefined ? currentIndex : this.dotsIndex)
                ? dot.classList.add(styles.current)
                : dot.classList.remove(styles.current)
        );
    };
    autoPlay = () => {
        if (this.autoplayTimer) clearTimeout(this.autoplayTimer);
        this.autoplayTimer = window.setTimeout(() => {
            this.animate(--this.currentIndex);
        }, this.autoplayDelay);
    };
    animate = (index = this.currentIndex) => {
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        const startTime = Date.now();
        const duration = this.duration;
        const startPos = this.currentOffset;
        const endPos = index * this.carouselWidth - this.prevOffset;
        const startScale = this.scale;
        const endScale = 1 - startScale;
        this.animateCompleted = false;
        const callback = () => {
            const currentTime = Date.now();
            const delta = (currentTime - startTime) / 1000;
            const offset = Tween(this.tween)(delta, startPos, endPos, duration);
            this.scrollEle!.style.transform = `translate3d(${offset}px,0,0)`;
            this.currentOffset = offset;
            this.prevOffset = offset;
            if (this.enableScale) {
                const scale = Tween(this.tween)(delta, startScale, endScale, duration);
                this.sliders.forEach(slider => (slider.style.transform = `scale(${scale})`));
                this.scale = scale;
                this.prevScale = scale;
            }
            const tempIndex = Math.round(offset / this.carouselWidth) % this.imgLength;
            this.setDotsIndex(tempIndex === 1 ? 1 - this.imgLength : tempIndex);
            if (delta >= duration) {
                cancelAnimationFrame(this.animateTimer);
                const completedOffset = (index >= 1 ? 1 - this.imgLength : index % this.imgLength) * this.carouselWidth;
                this.animateCompleted = true;
                this.currentIndex = Math.round(completedOffset / this.carouselWidth);
                this.currentOffset = completedOffset;
                this.prevOffset = completedOffset;
                this.scrollEle!.style.transform = `translate3d(${completedOffset}px,0,0)`;
                if (this.autoplay) this.autoPlay();
                return;
            }
            this.animateTimer = requestAnimationFrame(callback);
        };
        callback();
    };
}

export default Carousel;
