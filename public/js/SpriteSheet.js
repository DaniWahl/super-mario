/**
 * Class representing a spriteSheet
 * 
 */
export default class SpriteSheet {

    /**
     * Create a spriteSheet
     * @param {HTMLImageElement} image - loaded image containing tiles 
     * @param {number} width - tile width in pixels 
     * @param {number} height - tile height in pixels   
     */
    constructor(image, width, height) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); // define empty tiles Map
    }

    /**
     * define a new sprite from coordinates on the image
     * @param {string} name - sprite name
     * @param {number} x - x position of tile 
     * @param {number} y - y position of file
     */
    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width=this.width;
        buffer.height = this.height;
        buffer
            .getContext('2d')
            .drawImage(
                this.image,
                x * this.width,
                y * this.height,
                this.width,
                this.height,
                0,
                0,
                this.width,
                this.height
            );
        this.tiles.set(name, buffer);
    }

    /**
     * draw a named sprite on the supplied canvas context
     * @param {string} name - name of type
     * @param {CanvasRenderingContext2D} context - context to draw to
     * @param {number} x - x position in pixels
     * @param {number} y - y position in pixels
     */
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    /**
     * convenience draw function accepting x, y in tile coordinates
     * @param {string} name - name of type
     * @param {CanvasRenderingContext2D} context - context to draw to
     * @param {number} x - x position 
     * @param {number} y - y position 
     */
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}