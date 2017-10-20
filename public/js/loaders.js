import Level from './Level.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {loadBackgroundSprites} from './sprites.js';


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
    return Promise.all([
        fetch(`/levels/${name}.json`)
        .then(r => r.json()),

        loadBackgroundSprites(),
    ])
    

    .then(([levelSpec, backgroundSprites ]) => {
        const level = new Level();

        const backgroundLayer = createBackgroundLayer(levelSpec.backgrounds, backgroundSprites);
        level.comp.layers.push(backgroundLayer);
    
        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    })
}