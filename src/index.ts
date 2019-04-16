// @ts-ignore
import styles from './index.scss';
import Tween  from './tween';

const clamp = (current: number, min: number, max: number) => Math.min(Math.max(min, current), max);

const createPagination = (length: number, paginationClass: string, dotClass: string) => {
    let str = `<div class="${ styles.pagination } ${ paginationClass }">`;
    for ( let i = 0; i < length; i++ ) {
        str += `<span data-index="${ i }" class="${ styles.dot }${ i === 0
                                                                   ? ' ' + styles.current
                                                                   : '' } ${ dotClass }"></span>`;
    }
    str += '</div>';
    return str;
};

const createArrow = (prevButtonClass: string, nextButtonClass: string) =>
    `<span class="${ styles.button } ${ styles['prev-button'] } ${ prevButtonClass }"></span><span class="${ styles.button } ${
        styles['next-button']
        } ${ nextButtonClass }"></span>`;

const createScroll = (imgList: string[], width: string, height: string, pagination: boolean, button: boolean, customClass: CarouselStyles) => {
    const customClassStr: { [key: string]: string } = {};
    Object.keys(customClass)
          .forEach(key => {
              customClassStr[key] = customClass[key] instanceof Array ? customClass[key].join(' ') : customClass[key];
          });
    const { imgClass = '', paginationClass = '', dotClass = '', prevButtonClass = '', nextButtonClass = '' } = customClassStr;
    const sliders = imgList.map(
        img => `<div class="${ styles.slider } ${ imgClass }" style="background-image: url('${ img }');width: ${ width };height: ${ height };"></div>`,
    );
    return `<div class="${ styles.carousel }" style="width: ${ width };height: ${ height };">
                <div class="${ styles.scroll }">${ sliders.join('') }</div>
                ${ pagination ? createPagination(imgList.length - 2, paginationClass, dotClass) : '' }
                ${ button ? createArrow(prevButtonClass, nextButtonClass) : '' }
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
    preventDefault?: boolean;
    customStyles?: CarouselStyles;
}

type CarouselStyles = {
    [index: string]: any;
    imgClass?: string | string[];
    paginationClass?: string | string[];
    dotClass?: string | string[];
    prevButtonClass?: string | string[];
    nextButtonClass?: string | string[];
};

class Carousel {
    private readonly carouselWrapper: HTMLElement | null;
    private readonly carouselWidth: number;
    private readonly duration: number;
    private readonly tween: string;
    private readonly minOffset: number;
    private readonly momentum: number;
    private readonly imgLength: number;
    private readonly autoplay: boolean;
    private readonly autoplayDelay: number;
    private readonly enableScale: boolean;
    private readonly preventDefault: boolean;

    private scrollEle: HTMLElement | null;
    private startInfo = {
        pos: 0,
        timeStamp: 0,
        isDrag: false,
    };
    private moveInfo = {
        pos: 0,
        timeStamp: 0,
        isMove: false,
    };
    private prevOffset = 0;
    private currentOffset = 0;
    private currentIndex = 0;
    private dotsIndex = 0;
    private dots: Array<HTMLElement>;
    private sliders: Array<HTMLElement>;
    private animateTimer = 0;
    private animateCompleted = true;
    private autoplayTimer = 0;
    private prevScale = 1;
    private scale = 1;

    constructor(imgList: string[], options: CarouselOption) {
        const {
                  width          = '100vw',
                  height         = '50vh',
                  element,
                  duration       = 1,
                  pagination     = true,
                  arrowButton    = true,
                  momentum       = 1,
                  tween          = 'Quart.easeOut',
                  autoplay       = true,
                  autoplayDelay  = 5,
                  scale          = false,
                  customStyles   = {},
                  preventDefault = false,
              } = options;
        this.carouselWrapper = document.querySelector(element);
        if ( !this.carouselWrapper ) throw new Error('can\'t find element');
        const list = [imgList[imgList.length - 1], ...imgList, imgList[0]];
        const carouselWrapperWidth = this.carouselWrapper.getBoundingClientRect().width + 'px';
        this.carouselWrapper.innerHTML = createScroll(
            list,
            width.indexOf('%') === -1 ? width : carouselWrapperWidth,
            height,
            pagination,
            arrowButton,
            customStyles,
        );
        const { width: carouselWidth } = this.carouselWrapper.querySelector(`.${ styles.carousel }`)!.getBoundingClientRect();
        this.carouselWidth = carouselWidth;
        this.minOffset = -imgList.length * carouselWidth;
        this.imgLength = imgList.length;
        this.duration = duration;
        this.momentum = momentum;
        this.tween = tween;
        this.autoplay = autoplay;
        this.autoplayDelay = autoplayDelay * 1000;
        this.enableScale = scale;
        this.preventDefault = preventDefault;
        this.scrollEle = document.querySelector(`${ element } .${ styles.scroll }`);
        this.scrollEle!.style.width = ( imgList.length + 2 ) * carouselWidth + 'px';
        this.dots = Array.prototype.slice.call(document.querySelectorAll(`${ element } .${ styles.dot }`));
        this.sliders = Array.prototype.slice.call(document.querySelectorAll(`${ element } .${ styles.slider }`));
        window.addEventListener('mousedown', this.onDragStart);
        window.addEventListener('mousemove', this.onDragMove);
        window.addEventListener('mouseup', this.onDragEnd);

        window.addEventListener('touchstart', this.onDragStart);
        window.addEventListener('touchmove', this.onDragMove);
        window.addEventListener('touchend', this.onDragEnd);

        this.carouselWrapper.addEventListener('click', this.onClickButton);

        if ( autoplay ) this.autoPlay();
    }

    public destroy = () => {
        window.removeEventListener('mousedown', this.onDragStart);
        window.removeEventListener('mousemove', this.onDragMove);
        window.removeEventListener('mouseup', this.onDragEnd);
        window.removeEventListener('touchstart', this.onDragStart);
        window.removeEventListener('touchmove', this.onDragMove);
        window.removeEventListener('touchend', this.onDragEnd);
        this.carouselWrapper!.removeEventListener('click', this.onClickButton);
        this.carouselWrapper!.innerHTML = '';
    };
    private onClickButton = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        const target = event.target as HTMLElement;
        if ( target.classList.contains(styles.button) && this.animateCompleted ) {
            target.classList.contains(styles['prev-button']) ? ++this.currentIndex : --this.currentIndex;
            this.animate();
        } else if ( target.classList.contains(styles.dot) ) {
            const { index = 0 } = target.dataset;
            this.animate(-index);
        }
    };

    private onDragStart = (event: MouseEvent | TouchEvent) => {
        event.stopPropagation();
        if ( this.preventDefault ) event.preventDefault();
        const target = event.target as HTMLElement;
        if ( !target.classList.contains(styles.carousel) || !this.carouselWrapper!.contains(target) ) return;
        if ( this.animateTimer ) cancelAnimationFrame(this.animateTimer);
        if ( this.autoplayTimer ) clearTimeout(this.autoplayTimer);
        const { timeStamp } = event;
        const { pageX } = event.type === 'mousedown' ? ( event as MouseEvent ) : ( event as TouchEvent ).touches[0];
        this.startInfo.pos = pageX;
        this.startInfo.timeStamp = timeStamp;
        this.startInfo.isDrag = true;
        this.moveInfo.isMove = false;
        if ( this.currentOffset < -( this.imgLength - 1 ) * this.carouselWidth - this.carouselWidth / 2 ) {
            this.currentOffset += -this.minOffset;
            this.prevOffset = this.currentOffset;
            this.scrollEle!.style.transform = `translate3d(${ this.currentOffset }px,0,0)`;
        } else if ( this.currentOffset > this.carouselWidth / 2 ) {
            this.currentOffset += this.minOffset;
            this.prevOffset = this.currentOffset;
            this.scrollEle!.style.transform = `translate3d(${ this.currentOffset }px,0,0)`;
        }
        this.currentIndex = Math.round(this.currentOffset / this.carouselWidth);
    };

    private onDragMove = (event: MouseEvent | TouchEvent) => {
        if ( !this.startInfo.isDrag ) return;
        this.moveInfo.isMove = true;
        event.stopPropagation();
        if ( this.preventDefault ) event.preventDefault();
        const { timeStamp } = event;
        const { pageX } = event.type === 'mousemove' ? ( event as MouseEvent ) : ( event as TouchEvent ).touches[0];
        this.moveInfo.pos = pageX;
        this.moveInfo.timeStamp = timeStamp;
        const distance = this.moveInfo.pos - this.startInfo.pos;
        this.currentOffset = distance + this.prevOffset;
        this.scrollEle!.style.transform = `translate3d(${ this.currentOffset }px,0,0)`;
        if ( this.enableScale ) {
            this.scale = this.prevScale - Math.abs(distance) / this.carouselWidth / 2;
            const shadow = 1 - this.scale;
            this.sliders.forEach(slider => {
                slider.style.transform = `scale(${ this.scale })`;
                slider.style.boxShadow = `0 ${ 52.5 * shadow }px ${ 115 * shadow }px ${ -15 * shadow }px rgba(50, 50, 73, 0.5), 0 ${ 27.5 * shadow }px ${ 65 *
                                                                                                                                                          shadow }px ${ -27.5 * shadow }px rgba(0, 0, 0, 0.6)`;
            });
        }
        const tempIndex = Math.round(this.currentOffset / this.carouselWidth) % this.imgLength;
        this.setDotsIndex(tempIndex === 1 ? 1 - this.imgLength : tempIndex);
    };

    private onDragEnd = (event: MouseEvent | TouchEvent) => {
        if ( !this.startInfo.isDrag ) return;
        event.stopPropagation();
        if ( this.preventDefault ) event.preventDefault();
        this.startInfo.isDrag = false;
        if ( !this.moveInfo.isMove ) this.moveInfo.pos = this.startInfo.pos;
        this.prevOffset = this.currentOffset;
        if ( this.enableScale ) this.prevScale = this.scale;
        const speed = ( this.moveInfo.pos - this.startInfo.pos ) / ( this.moveInfo.timeStamp - this.startInfo.timeStamp );
        const isNext =
                  Math.abs(speed) !== 0
                  ? speed < 0
                    ? Math.abs(this.currentOffset) % this.carouselWidth > this.carouselWidth / 2
                    : this.currentOffset < 0
                      ? this.carouselWidth - ( Math.abs(this.currentOffset) % this.carouselWidth ) > this.carouselWidth / 2
                      : this.currentOffset > this.carouselWidth / 2
                  : false;
        if ( isNext || Math.abs(speed) > this.momentum ) speed > 0 ? this.currentIndex++ : this.currentIndex--;
        this.animate();
    };

    private setDotsIndex = (currentIndex?: number) => {
        this.dotsIndex = Math.round(clamp(this.currentOffset, this.minOffset + this.carouselWidth, 0) / this.carouselWidth);
        this.dots.forEach((dot, index) =>
            index === Math.abs(currentIndex !== undefined ? currentIndex : this.dotsIndex)
            ? dot.classList.add(styles.current)
            : dot.classList.remove(styles.current)
        );
    };
    private autoPlay = () => {
        if ( this.autoplayTimer ) clearTimeout(this.autoplayTimer);
        this.autoplayTimer = window.setTimeout(() => {
            this.animate(--this.currentIndex);
        }, this.autoplayDelay);
    };
    private animate = (index = this.currentIndex) => {
        if ( this.animateTimer ) cancelAnimationFrame(this.animateTimer);
        const startTime = Date.now();
        const duration = this.duration;
        const startPos = this.currentOffset;
        const endPos = index * this.carouselWidth - this.prevOffset;
        const startScale = this.scale;
        const endScale = 1 - startScale;
        this.animateCompleted = false;
        const callback = () => {
            const currentTime = Date.now();
            const delta = ( currentTime - startTime ) / 1000;
            const offset = Tween(this.tween)(delta, startPos, endPos, duration);
            this.scrollEle!.style.transform = `translate3d(${ offset }px,0,0)`;
            this.currentOffset = offset;
            this.prevOffset = offset;
            if ( this.enableScale ) {
                const scale = Tween(this.tween)(delta, startScale, endScale, duration);
                this.sliders.forEach(slider => ( slider.style.transform = `scale(${ scale })` ));
                this.scale = scale;
                this.prevScale = scale;
            }
            const tempIndex = Math.round(offset / this.carouselWidth) % this.imgLength;
            this.setDotsIndex(tempIndex === 1 ? 1 - this.imgLength : tempIndex);
            if ( delta >= duration ) {
                cancelAnimationFrame(this.animateTimer);
                const completedOffset = ( index >= 1
                                          ? 1 - this.imgLength
                                          : index % this.imgLength ) * this.carouselWidth;
                this.animateCompleted = true;
                this.currentIndex = Math.round(completedOffset / this.carouselWidth);
                this.currentOffset = completedOffset;
                this.prevOffset = completedOffset;
                this.scrollEle!.style.transform = `translate3d(${ completedOffset }px,0,0)`;
                if ( this.autoplay ) this.autoPlay();
                return;
            }
            this.animateTimer = requestAnimationFrame(callback);
        };
        callback();
    };
}

export default Carousel;
