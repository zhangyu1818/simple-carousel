import Carousel from './index';

const list = ['https://placem.at/things?w=1200&h=500', 'https://placem.at/places?w=1200&h=500', 'https://placem.at/things?w=1200&random=some_seed&h=500'];

new Carousel(
    {
        element: '.carousel',
        duration: 0.5,
        width: 1200,
        height: 500,
    },
    list
);
