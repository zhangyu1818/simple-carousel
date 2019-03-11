// @ts-ignore
import styles from './index.scss';
import Tween from './tween';

const list = ['https://placem.at/things?w=1200&h=500', 'https://placem.at/places?w=1200&h=500', 'https://placem.at/things?w=1200&random=some_seed&h=500'];

const clamp = (current: number, min: number, max: number) => Math.min(Math.max(min, current), max);

interface CarouselOption {
    width?: number;
    height?: number;
    element: string;
    duration?: number;
    tween?: string;
}
const createPagination = (length: number) => {
    let str = `<div class="${styles.pagination}">`;
    for (let i = 0; i < length; i++) {
        str += `<span data-index="${i}" class="${styles.dot}${i === 0 ? ' ' + styles.current : ''}"></span>`;
    }
    str += '</div>';
    return str;
};
const createArrow = () => `<span class="${styles.button} ${styles['prev-button']}"></span><span class="${styles.button} ${styles['next-button']}"></span>`;
const createScroll = (imgList: string[], width: number, height: number) => {
    const sliders = imgList.map(
        (img, index) =>
            `<div class="${styles.slider}" style="background-image: url('${img}');width: ${width}px;height: ${height}px;left: ${(index - 1) * width}px;"></div>`
    );
    return `<div class="${styles.carousel}" style="width: ${width}px;height: ${height}px;">
                <div class="${styles.scroll}">${sliders.join('')}</div>
                ${createPagination(imgList.length - 2)}
                ${createArrow()}
            </div>`;
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
    currentIndex = 0;
    maxOffset = 0;
    minOffset = 0;
    sliders: Array<HTMLElement>;
    dots: Array<HTMLElement>;
    imgLength = 0;
    animateTimer = 0;
    autoplayTimer = 0;
    prevButton: HTMLElement | null;
    nextButton: HTMLElement | null;
    constructor(options: CarouselOption, imgList: string[]) {
        const { width = 1200, height = 500, element, duration = 1 } = options;
        this.carouselWrapper = document.querySelector(element);
        if (!this.carouselWrapper) throw new Error("can't find element");
        const list = [imgList[imgList.length - 1], ...imgList, imgList[0]];
        this.carouselWrapper.style.width = width + 'px';
        this.carouselWidth = width;
        this.minOffset = -imgList.length * width;
        this.maxOffset = width;
        this.imgLength = imgList.length;
        this.duration = duration;
        this.carouselWrapper.innerHTML = createScroll(list, width, height);
        this.scrollEle = document.querySelector(`.${styles.scroll}`);
        this.sliders = Array.from(document.querySelectorAll(`.${styles.slider}`));
        this.dots = Array.from(document.querySelectorAll(`.${styles.dot}`));
        this.prevButton = document.querySelector(`.${styles['prev-button']}`);
        this.nextButton = document.querySelector(`.${styles['next-button']}`);
        this.carouselWrapper.addEventListener('mousedown', this.onDragStart);
        this.carouselWrapper.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);

        this.carouselWrapper.addEventListener('click', this.onClickButton);
        this.autoplay();
    }
    onClickButton = (event: MouseEvent) => {
        event.stopPropagation();
        if ((event.target as HTMLElement).classList.contains(styles['next-button'])) {
            this.animate(this.currentIndex - 1);
        } else if ((event.target as HTMLElement).classList.contains(styles['prev-button'])) {
            this.animate(this.currentIndex + 1);
        } else if ((event.target as HTMLElement).classList.contains(styles.dot)) {
            const { index = 0 } = (event.target as HTMLElement).dataset;
            this.animate(-index);
        }
    };
    onDragStart = (event: MouseEvent) => {
        event.stopPropagation();
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        if (this.autoplayTimer) clearTimeout(this.autoplayTimer);
        const { pageX, timeStamp } = event;
        this.startInfo.pos = pageX;
        this.startInfo.timeStamp = timeStamp;
        this.startInfo.isDrag = true;
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
        this.boundary();
    };
    onDragMove = (event: MouseEvent) => {
        if (!this.startInfo.isDrag) return;
        event.stopPropagation();
        const { pageX, timeStamp } = event;
        this.moveInfo.pos = pageX;
        this.moveInfo.timeStamp = timeStamp;
        this.currentOffset = clamp(this.moveInfo.pos - this.startInfo.pos + this.prevOffset, this.minOffset, this.maxOffset);
        this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        this.setCurrentDot();
    };
    onDragEnd = (event: MouseEvent) => {
        this.startInfo.isDrag = false;
        event.stopPropagation();
        if (!(event.target as HTMLElement).classList.contains(styles.carousel) || !this.moveInfo.pos) return;
        const distance = this.moveInfo.pos - this.startInfo.pos;
        const timeStamp = this.moveInfo.timeStamp - this.startInfo.timeStamp;
        const speed = distance / timeStamp;
        if (Math.abs(distance) > this.carouselWidth / 2 || Math.abs(speed) > 1.5) {
            this.currentIndex += speed < 0 ? -1 : 1;
        }
        this.boundary();
        this.animate();
    };
    boundary = () => {
        if (this.currentOffset > this.maxOffset / 2) {
            this.currentIndex = 1 - this.imgLength;
            this.currentOffset = this.minOffset + this.currentOffset;
            this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        } else if (this.currentOffset < this.minOffset + this.carouselWidth / 2) {
            this.currentIndex = -0;
            this.currentOffset = this.currentOffset - this.minOffset;
            this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        }
        this.prevOffset = this.currentOffset;
    };
    animate = (index = this.currentIndex) => {
        const startTime = Date.now();
        const startPos = this.prevOffset;
        const endPos = index * this.carouselWidth - this.prevOffset;
        const callback = () => {
            const currentTime = Date.now();
            const delta = (currentTime - startTime) / 1000;
            const offset = Tween.Quad.easeOut(delta, startPos, endPos, this.duration);
            this.scrollEle!.style.transform = `translate3d(${offset}px,0,0)`;
            this.prevOffset = offset;
            this.currentOffset = offset;
            this.setCurrentDot();
            if ((currentTime - startTime) / 1000 >= this.duration) {
                cancelAnimationFrame(this.animateTimer);
                this.currentOffset = (index % this.imgLength) * this.carouselWidth;
                this.prevOffset = this.currentOffset;
                this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
                this.autoplay();
                return;
            }
            this.animateTimer = requestAnimationFrame(callback);
        };
        callback();
    };
    setCurrentDot = () => {
        const index = Math.round(this.currentOffset / this.carouselWidth) % this.imgLength;
        const paginationIndex = index === 1 ? -(this.imgLength - 1) : index;
        this.dots.forEach((dot, index) => {
            if (paginationIndex === -index) dot.classList.add(styles.current);
            else dot.classList.remove(styles.current);
        });
    };
    autoplay = () => {
        const autoplayCallback = () => {
            this.currentIndex--;
            if (this.currentIndex === -this.imgLength - 1) {
                this.currentIndex = -1;
                this.prevOffset = 0;
                this.animate();
                return;
            }
            this.animate();
        };
        this.autoplayTimer = window.setTimeout(autoplayCallback, 5000);
    };
}

new Carousel(
    {
        element: '.carousel',
        duration: 0.7,
        width: 1200,
        height: 500,
    },
    list
);
