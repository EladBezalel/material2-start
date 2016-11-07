import { Directive, OnDestroy } from '@angular/core';
import { MediaQueries } from '../../media-query/media-queries';
import { MediaQueryChanges, OnMediaQueryChanges } from './media-query-changes';
/**
 *
 */
export declare class MediaQueryActivation implements OnMediaQueryChanges, OnDestroy {
    private _mq;
    private _directive;
    private _baseKey;
    private _defaultValue;
    private _onDestroy;
    private _onMediaQueryChanges;
    private _activatedInputKey;
    readonly activatedInputKey: string;
    /**
     * Get the currently activated @Input value or the fallback default @Input value
     */
    readonly activatedInput: any;
    /**
     *
     */
    constructor(_mq: MediaQueries, _directive: Directive, _baseKey: string, _defaultValue: string | number);
    /**
     * MediaQueryChanges interceptor that tracks the current mq-activated @Input and calculates the
     * mq-activated input value or the default value
     */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    /**
     * Remove interceptors, restore original functions, and forward the onDestroy() call
     */
    ngOnDestroy(): void;
    /**
     * Head-hook onDestroy and onMediaQueryChanges methods on the directive instance
     */
    private _interceptLifeCyclEvents();
    /**
     */
    private _logMediaQueryChanges(changes);
}
