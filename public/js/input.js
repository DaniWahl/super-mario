import Keyboard from './KeyboardState.js';

export function setupKeyboard(entity) {
    const input = new Keyboard();

    input.addMapping('ArrowRight', keyState => {
        entity.go.dir = keyState;
    });

    input.addMapping('ArrowLeft', keyState => {
        entity.go.dir = -keyState;
    });

    input.addMapping('Space', keyState => {
        if(keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    return input;
}
