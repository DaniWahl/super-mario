export default class TileResolver {
    constructor(matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos){
        return Math.floor(pos/this.tileSize);
    }

    toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;

        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;

        } while (pos < pMax);
        return range;
    }

    getByIndex(ix, iy) {
        const tile = this.matrix.get(ix, iy);
        if(tile) {
            const y1 = iy * this.tileSize;
            const y2 = y1 + this.tileSize;
            const x1 = ix * this.tileSize;
            const x2 = x1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2,
            };
        }
    }

    searchByPosition(x, y) {
        return this.getByIndex(
            this.toIndex(x),
            this.toIndex(y)
        );
    }

    searchByRange(x1, x2, y1, y2) {
        const matches = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if(match) {
                    matches.push(match);
                }
            });
        });

        return matches;
    }
}