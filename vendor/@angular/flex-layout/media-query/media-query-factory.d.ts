/**
 * EventHandler callback with the mediaQuery [range] activates or deactivates
 */
export interface MediaQueryListListener {
    (mql: MediaQueryList): void;
}
/**
 * EventDispatcher for a specific mediaQuery [range]
 */
export interface MediaQueryList {
    readonly matches: boolean;
    readonly media: string;
    addListener(listener: MediaQueryListListener): void;
    removeListener(listener: MediaQueryListListener): void;
}
/**
 * Factory class used to quickly create a mq listener for a specified mediaQuery range
 * No need to implement polyfill
 */
export declare class MediaQueryListFactory {
    /**
     * Return a MediaQueryList for the specified media query
     * Publish a mockMQL if needed
     */
    static instanceOf(query: string): MediaQueryList;
}
