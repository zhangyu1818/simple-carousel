// @ts-ignore
import styles from './index.scss';
import Tween from './tween';
const list = [
    'https://placem.at/things?w=1200&h=500',
    'https://placem.at/places?w=1200&h=500',
    'https://placem.at/things?w=1200&random=some_seed&h=500',
];

const clamp = (current: number, min: number, max: number) => Math.min(Math.max(min, current), max);

interface CarouselOption {
    width?: number;
    height?: number;
    element: string;
    imgList: string[];
}

class Carousel {
    carouselWidth: number;
    carouselHeight: number;
    carouselEle: HTMLElement | null;
    scrollEle: HTMLElement | null;
    startInfo = {
        pos: 0,
        isDrag: false,
    };
    moveInfo = {
        pos: 0,
    };
    lastOffset = 0;
    currentOffset = 0;
    maxOffset = 0;
    currentIndex = 0;
    animateTimer = 0;
    constructor(option: CarouselOption) {
        const { width = 1200, height = 500, element, imgList } = option;
        this.carouselWidth = width;
        this.carouselHeight = height;
        this.carouselEle = document.querySelector(element);
        if (this.carouselEle) {
            this.carouselEle.style.width = width + 'px';
            this.carouselEle.innerHTML = `<div class="${styles.carousel}"><div class="${
                styles.scroll
            }">${imgList
                .map(
                    src =>
                        `<div class="${styles.slider}"><div class="${
                            styles['slider-inner']
                        }" style="background-image:url('${src}');width: ${width}px;padding-bottom: ${(height /
                            width) *
                            100}%"></div></div>`
                )
                .join('')}</div></div>`;
            this.maxOffset = (imgList.length - 1) * width;
            this.scrollEle = document.querySelector(`.${styles.scroll}`);
            this.carouselEle.addEventListener('mousedown', this.onDragStart);
            this.carouselEle.addEventListener('mousemove', this.onDragMove);
            window.addEventListener('mouseup', this.onDrop);
        }
    }
    onDragStart = (event: MouseEvent) => {
        event.stopPropagation();
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        const { pageX } = event;
        this.startInfo.pos = pageX;
        this.startInfo.isDrag = true;
    };
    onDragMove = (event: MouseEvent) => {
        if (!this.startInfo.isDrag) return;
        event.stopPropagation();
        const { pageX } = event;
        this.moveInfo.pos = pageX;
        const distance = this.moveInfo.pos - this.startInfo.pos;
        this.currentOffset = clamp(this.lastOffset + distance, -this.maxOffset, 0);
        this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
    };
    onDrop = () => {
        this.startInfo.isDrag = false;
        this.lastOffset = this.currentOffset;
        this.animate();
    };
    animate = (index: number = this.currentIndex) => {
        const animateTime = 1;
        const startPos = this.lastOffset;
        const startTime = Date.now();
        const distance = index * this.carouselWidth - startPos;
        const animateCallback = () => {
            const currentTime = Date.now();
            const delta = (currentTime - startTime) / 1000;
            const offset = Tween.Linear(delta, startPos, distance, animateTime);
            this.scrollEle!.style.transform = `translate3d(${offset}px,0,0)`;
            this.lastOffset = offset;
            if ((currentTime - startTime) / 1000 >= animateTime) {
                cancelAnimationFrame(this.animateTimer);
                this.scrollEle!.style.transform = `translate3d(${index *
                    this.carouselWidth}px,0,0)`;
                return;
            }
            this.animateTimer = requestAnimationFrame(animateCallback);
        };
        animateCallback();
    };
}

new Carousel({
    width: 1200,
    height: 500,
    element: '.carousel',
    imgList: list,
});
