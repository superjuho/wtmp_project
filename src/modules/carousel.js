const container = document.querySelector('.hsl-data');
const lunchContainer = document.querySelector('.lunchContainer');
const bulletinContainer = document.querySelector('.bulletinContainer');

let x = 1;

const carousel = () => {
    if (x === 1) {
        container.className.replace(`.hsl-data`);
        lunchContainer.className.replace(`.lunchContainer`);
        bulletinContainer.className.replace(`.bulletinContainer`);
        x += 1;
    } else if (x === 2) {
        container.className.replace(`.bulletinContainer`);
        lunchContainer.className.replace(`.hsl-data`);
        bulletinContainer.className.replace(`.lunchContainer`);
        x += 1;
    } else if (x === 3) {
        container.className.replace(`.lunchContainer`);
        lunchContainer.className.replace(`.bulletinContainer`);
        bulletinContainer.className.replace(`.hsl-data`);
        x -= 2;
    }
}

const carouselMagic = {
    carousel
};

export default carouselMagic;
