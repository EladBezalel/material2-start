import { MediaQueryChange } from '../../media-query/media-queries';
/**
 * MQ Notification data emitted to external observers
 *
 */
export declare class MediaQueryChanges {
    previous: MediaQueryChange;
    current: MediaQueryChange;
    constructor(previous: MediaQueryChange, current: MediaQueryChange);
}
/**
 * @whatItDoes Lifecycle hook that is called when any mediaQuery breakpoint changes.
 * @howToUse
 *
 * @description
 * ``onMediaQueryChanges( )`` is called right after the a MediaQueryChange has occurred.
 */
export declare abstract class OnMediaQueryChanges {
    abstract onMediaQueryChanges(changes: MediaQueryChanges): void;
}
export declare type MediaQuerySubscriber = (e: MediaQueryChanges) => {};
