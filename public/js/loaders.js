/**
 * load an image file and return as HTML Element
 * @param {string} url - image url 
 */
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

/**
 * returns a JS object loaded from the named level json file
 * @param {string} name - level name
 */
export function loadLevel(name) {
    // load the file and decode from json
    return fetch(`/levels/${name}.json`)
    .then(r => r.json());
}