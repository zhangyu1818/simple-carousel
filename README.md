# simple-carousel

a simple carousel,without jQuery

**Preview**

live [demo](http://zhangyu1818.com/simple-carousel)

# Installation

`npm install simple-carousel-js`

# Usage

```javascript
import Carousel from 'simple-carousel-js';

const img = ['./1.jpg', './2.jpg', './3.jpg'];

const carousel = new Carousel(img, {
    // default options
    width: '100vw', // px、rem ...
    height: '50vh',
    element: '.carousel', // use document.querySelector(selector)
    duration: 1, // animation duration
    tween: 'Quart.easeOut', 
    pagination: true, // show pagination
    arrowButton: true, // show prev and next button
    momentum: 1, // turn to next page in a smaller number
    autoplay: true,
    autoplayDelay: 5,
    preventDefault: false,
    scale: false, // it's occurs when dragging
    // custom class name，string or string array
    customStyles: {
        imgClass: '',
        paginationClass: '',
        dotClass: '',
        prevButtonClass: '',
        nextButtonClass: '',
    },
});

// destroy,remove carousel html and event
carousel.destroy()
```
See [tween](https://www.zhangxinxu.com/study/201612/how-to-use-tween-js.html)

Also,you can use `script` tag
