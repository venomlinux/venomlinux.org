// In this file we will have the svelte store for loading the text of the page
import { writable } from 'svelte/store';
// We define the TextStore class
export default class TextStore {
    text: string;
    constructor() {
        this.text = "";
    }
}

// We create a writable store for the text to be loaded reactively
export const text = writable(new TextStore());
