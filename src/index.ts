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
        str += `<span class="${styles.dot}${i === 0 ? ' ' + styles.current : ''}"></span>`;
    }
    str += '</div>';
    return str;
};

const createScroll = (imgList: string[], width: number, height: number) => {
    const sliders = imgList.map(
        (img, index) =>
            `<div class="${styles.slider}" style="background-image: url('${img}');width: ${width}px;height: ${height}px;left: ${(index - 1) * width}px;"></div>`
    );
    return `<div class="${styles.carousel}" style="width: ${width}px;height: ${height}px;">
                <div class="${styles.scroll}">${sliders.join('')}</div>
                ${createPagination(imgList.length - 2)}
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
    prevOffset = 0;
    currentOffset = 0;
    currentIndex = 0;
    maxOffset = 0;
    minOffset = 0;
    sliders: Array<HTMLElement>;
    dots: Array<HTMLElement>;
    imgLength = 0;
    animateTimer = 0;
    autopleyTimer = 0;
    constructor(options: CarouselOption, imgList: string[]) {
        const { width = 1200, height = 500, element } = options;
        this.carouselWrapper = document.querySelector(element);
        if (!this.carouselWrapper) throw new Error("can't find element");
        const list = [imgList[imgList.length - 1], ...imgList, imgList[0]];
        this.carouselWrapper.style.width = width + 'px';
        this.carouselWidth = width;
        this.minOffset = -imgList.length * width;
        this.maxOffset = width;
        this.imgLength = imgList.length;
        this.carouselWrapper.innerHTML = createScroll(list, width, height);
        this.scrollEle = document.querySelector(`.${styles.scroll}`);
        this.sliders = Array.from(document.querySelectorAll(`.${styles.slider}`));
        this.dots = Array.from(document.querySelectorAll(`.${styles.dot}`));
        this.carouselWrapper.addEventListener('mousedown', this.onDragStart);
        this.carouselWrapper.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);
        this.autoplay();
    }
    onDragStart = (event: MouseEvent) => {
        event.stopPropagation();
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        const { pageX, timeStamp } = event;
        this.startInfo.pos = pageX;
        this.startInfo.timeStamp = timeStamp;
        this.startInfo.isDrag = true;
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
    };
    onDragMove = (event: MouseEvent) => {
        if (!this.startInfo.isDrag) return;
        event.stopPropagation();
        const { pageX, timeStamp } = event;
        this.moveInfo.pos = pageX;
        this.moveInfo.timeStamp = timeStamp;
        this.currentOffset = clamp(this.moveInfo.pos - this.startInfo.pos + this.prevOffset, this.minOffset, this.maxOffset);
        this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
    };
    onDragEnd = (event: MouseEvent) => {
        this.startInfo.isDrag = false;
        event.stopPropagation();
        if (!(event.target as HTMLElement).classList.contains(styles.slider)) return;
        const distance = this.moveInfo.pos - this.startInfo.pos;
        const timeStamp = this.moveInfo.timeStamp - this.startInfo.timeStamp;
        const speed = distance / timeStamp;
        if (Math.abs(distance) > this.carouselWidth / 2 || Math.abs(speed) > 2) {
            this.currentIndex += speed < 0 ? -1 : 1;
        }
        // 左右边界
        if (this.currentIndex === 1) {
            this.currentIndex = 1 - this.imgLength;
            this.currentOffset = this.minOffset + this.currentOffset;
            this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        } else if (this.currentIndex === -this.imgLength) {
            this.currentIndex = 0;
            this.currentOffset = this.currentOffset - this.minOffset;
            this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        }
        this.prevOffset = this.currentOffset;
        this.setCurrentDot();
        this.animate();
    };
    animate = (index = this.currentIndex) => {
        const startTime = Date.now();
        const startPos = this.prevOffset;
        const endPos = index * this.carouselWidth - this.prevOffset;
        const duration = 0.2;
        const callback = () => {
            const currentTime = Date.now();
            const delta = (currentTime - startTime) / 1000;
            const offset = Tween.Quad.easeOut(delta, startPos, endPos, duration);
            this.scrollEle!.style.transform = `translate3d(${offset}px,0,0)`;
            this.prevOffset = offset;
            this.currentOffset = offset;
            if ((currentTime - startTime) / 1000 >= duration) {
                cancelAnimationFrame(this.animateTimer);
                this.scrollEle!.style.transform = `translate3d(${index * this.carouselWidth}px,0,0)`;
                return;
            }
            this.animateTimer = requestAnimationFrame(callback);
        };
        callback();
    };
    setCurrentDot = () => {
        this.dots.forEach((dot, index) => {
            if (this.currentIndex === -index) dot.classList.add(styles.current);
            else dot.classList.remove(styles.current);
        });
    };
    autoplay = () => {
        this.autopleyTimer = window.setInterval(() => {
            this.currentIndex--;
            if (this.currentIndex === -this.imgLength - 1) {
                this.currentIndex = -1;
                this.prevOffset = 0;
                this.animate();
                return;
            }
            this.animate();
        }, 2000);
    };
}

new Carousel(
    {
        element: '.carousel',
    },
    list
);
