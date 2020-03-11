const container = document.querySelector('.hsl-data');
const lunchContainer = document.querySelector('.lunchContainer');
const bulletinContainer = document.querySelector('.bulletinContainer');

let x = 1;

const carousel = () => {
    if (x === 1) {
        console.log("Case 1");
        container.className =
        container.className.replace(/\bhsl-data\b/g, "hsl-data");
        lunchContainer.className =
        lunchContainer.className.replace(/\blunchContainer\b/g, "lunchContainer");
        bulletinContainer.className =
        bulletinContainer.className.replace(/\bbulletinContainer\b/g, "bulletinContainer");
        x += 1;
        console.log("value of x = ", x);
    } else if (x === 2) {
        console.log("Case 2");
        container.className =
        container.className.replace(/\bhsl-data\b/g, "bulletinContainer");
        lunchContainer.className =
        lunchContainer.className.replace(/\blunchContainer\b/g, "hsl-data");
        bulletinContainer.className =
        bulletinContainer.className.replace(/\bbulletinContainer\b/g, "lunchContainer");
        x += 1;
        console.log("value of x = ", x);
    } else if (x === 3) {
        console.log("Case 3");
        container.className =
        container.className.replace(/\bbulletinContainer\b/g, "lunchContainer");
        lunchContainer.className =
        lunchContainer.className.replace(/\bhsl-data\b/g, "bulletinContainer");
        bulletinContainer.className =
        bulletinContainer.className.replace(/\blunchContainer\b/g, "hsl-data");
        x += 1;
        console.log("value of x = ", x);
    } else if (x === 4) {
        console.log("Case 4");
        container.className =
        container.className.replace(/\blunchContainer\b/g, "hsl-data");
        lunchContainer.className =
        lunchContainer.className.replace(/\bbulletinContainer\b/g, "lunchContainer");
        bulletinContainer.className =
        bulletinContainer.className.replace(/\bhsl-data\b/g, "bulletinContainer");
        x -= 2;
        console.log("value of x = ", x);
    }
}

const carouselMagic = {
    carousel
};

export default carouselMagic;
