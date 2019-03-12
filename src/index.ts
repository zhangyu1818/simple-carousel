// @ts-ignore
import styles from './index.scss';
import Tween from './tween';

const clamp = (current: number, min: number, max: number) => Math.min(Math.max(min, current), max);

enum directionType {
    left = 1,
    right = -1,
}

const direction = (offset: number) => (offset > 1 ? directionType.left : directionType.right);

interface CarouselOption {
    width?: number;
    height?: number;
    element: string;
    duration?: number;
    tween?: string;
    pagination?: boolean;
    arrowButton?: boolean;
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

const createScroll = (imgList: string[], width: number, height: number, pagination: boolean, button: boolean) => {
    const sliders = imgList.map(img => `<div class="${styles.slider}" style="background-image: url('${img}');width: ${width}px;height: ${height}px;"></div>`);
    return `<div class="${styles.carousel}" style="width: ${width}px;height: ${height}px;">
                <div class="${styles.scroll}">${sliders.join('')}</div>
                ${pagination ? createPagination(imgList.length - 2) : ''}
                ${button ? createArrow() : ''}
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
    dotsIndex = 0;
    maxOffset = 0;
    minOffset = 0;
    dots: Array<HTMLElement>;
    imgLength = 0;
    prevButton: HTMLElement | null;
    nextButton: HTMLElement | null;
    animateTimer = 0;
    animateCompleted = true;

    constructor(options: CarouselOption, imgList: string[]) {
        const { width = 1200, height = 500, element, duration = 1, pagination = true, arrowButton = true } = options;
        this.carouselWrapper = document.querySelector(element);
        if (!this.carouselWrapper) throw new Error("can't find element");
        const list = [imgList[imgList.length - 1], ...imgList, imgList[0]];
        this.carouselWrapper.style.width = width + 'px';
        this.carouselWidth = width;
        this.minOffset = -imgList.length * width;
        this.maxOffset = width;
        this.imgLength = imgList.length;
        this.duration = duration;
        this.carouselWrapper.innerHTML = createScroll(list, width, height, pagination, arrowButton);
        this.scrollEle = document.querySelector(`.${styles.scroll}`);
        this.dots = Array.from(document.querySelectorAll(`.${styles.dot}`));
        this.prevButton = document.querySelector(`.${styles['prev-button']}`);
        this.nextButton = document.querySelector(`.${styles['next-button']}`);
        window.addEventListener('mousedown', this.onDragStart);
        window.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);
        this.carouselWrapper.addEventListener('click', this.onClickButton);
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

    onDragStart = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.classList.contains(styles.carousel)) return;
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        const { pageX, timeStamp } = event;
        this.startInfo.pos = pageX;
        this.startInfo.timeStamp = timeStamp;
        this.startInfo.isDrag = true;
    };

    onDragMove = (event: MouseEvent) => {
        if (!this.startInfo.isDrag) return;
        const { pageX, timeStamp } = event;
        this.moveInfo.pos = pageX;
        this.moveInfo.timeStamp = timeStamp;
        this.currentOffset = this.moveInfo.pos - this.startInfo.pos + this.prevOffset;
        const offsetDirection = direction(this.moveInfo.pos - this.startInfo.pos);
        if (this.currentOffset > this.carouselWidth / 2 && offsetDirection === directionType.left) {
            this.currentOffset += this.minOffset;
        } else if (this.currentOffset < this.minOffset + this.carouselWidth / 2 && offsetDirection === directionType.right) {
            this.currentOffset += -this.minOffset;
        }
        this.scrollEle!.style.transform = `translate3d(${this.currentOffset}px,0,0)`;
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
        this.setDotsIndex();
    };

    onDragEnd = () => {
        if (!this.startInfo.isDrag) return;
        this.startInfo.isDrag = false;
        this.prevOffset = this.currentOffset;
        this.setDotsIndex();
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

    animate = (index = this.currentIndex) => {
        if (this.animateTimer) cancelAnimationFrame(this.animateTimer);
        const startTime = Date.now();
        const duration = this.duration;
        const startPos = this.currentOffset;
        const endPos = index * this.carouselWidth - this.prevOffset;
        this.animateCompleted = false;
        const callback = () => {
            const currentTime = Date.now();
            const delta = (currentTime - startTime) / 1000;
            const offset = Tween.Linear(delta, startPos, endPos, duration);
            this.scrollEle!.style.transform = `translate3d(${offset}px,0,0)`;
            this.currentOffset = offset;
            this.prevOffset = offset;
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
                return;
            }
            this.animateTimer = requestAnimationFrame(callback);
        };
        callback();
    };
}
export default Carousel;
