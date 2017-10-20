const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {

    constructor() {
        // holds the state of a given state
        this.keyStates = new Map();

        // holds the collback functions for a key code
        this.keyMap = new Map();
    }

    addMapping(code, callback) {
        this.keyMap.set(code, callback);
    }

    handleEvent(event) {
        const {code} = event;  // get the key from the event

        // do we have the key mapped in the keyMap ?
        if(!this.keyMap.has(code)) {
            // no such key mapped
            return;
        }

        // stop the event bubbling to the browser
        event.preventDefault();

        // evaluate the event state from type to be 1 or 0
        const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

        // is the state the same as the last time?
        if(this.keyStates.get(code) === keyState ) {
            return;
        }

        // state is new - set it in the keyState map
        this.keyStates.set(code, keyState);

        this.keyMap.get(code)(keyState);
    }

    listenTo(window) {
        ['keyup', 'keydown'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        }) 
        
    }
}