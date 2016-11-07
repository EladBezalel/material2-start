import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseStyleDirective } from './abstract';
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export declare class LayoutDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    /**
     * Create Observable for nested/child 'flex' directives. This allows
     * child flex directives to subscribe/listen for flexbox direction changes.
     */
    private _layout;
    /**
     * Publish observer to enabled nested, dependent directives to listen
     * to parent "layout" direction changes
     */
    onLayoutChange: Observable<string>;
    /**
     * Default layout property with default direction value
     */
    layout: string;
    layoutXs: any;
    layoutGtXs: any;
    layoutSm: any;
    layoutGtSm: any;
    layoutMd: any;
    layoutGtMd: any;
    layoutLg: any;
    layoutGtLg: any;
    layoutXl: any;
    /**
     *
     */
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-layout')
     * Then conditionally override with the mq-activated Input's current value
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ngOnInit(): void;
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     *
     * @todo - update all child containers to have "box-sizing: border-box"
     *         This way any padding or border specified on the child elements are
     *         laid out and drawn inside that element's specified width and height.
     *
     */
    _updateWithDirection(direction?: string): void;
    /**
     * Build the CSS that should be assigned to the element instance
     * BUG:
     *
     *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
     *      Use height instead if possible; height : <xxx>vh;
     */
    _buildCSS(value: any): {
        'display': string;
        'box-sizing': string;
        'flex-direction': any;
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    _validateValue(value: any): any;
}
/**
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
export declare class LayoutWrapDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    wrap: string;
    wrapXs: any;
    wrapGtXs: any;
    wrapSm: any;
    wrapGtSm: any;
    wrapMd: any;
    wrapGtMd: any;
    wrapLg: any;
    wrapGtLg: any;
    wrapXl: any;
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ngOnInit(): void;
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    ngOnDestroy(): void;
    _updateWithValue(value?: string): void;
    /**
     * Build the CSS that should be assigned to the element instance
     */
    _buildCSS(value: any): {
        'flex-wrap': any;
        '-webkit-flex-wrap': any;
    };
    /**
     * Convert layout-wrap="<value>" to expected flex-wrap style
     */
    _validateValue(value: any): any;
}
/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
export declare class LayoutAlignDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    container: LayoutDirective;
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    private _layout;
    private _layoutWatcher;
    align: string;
    alignXs: any;
    alignGtXs: any;
    alignSm: any;
    alignGtSm: any;
    alignMd: any;
    alignGtMd: any;
    alignLg: any;
    alignGtLg: any;
    alignXl: any;
    constructor(container: LayoutDirective, _mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes?: SimpleChanges): void;
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ngOnInit(): void;
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    onMediaQueryChanges(changes: MediaQueryChanges): void;
    ngOnDestroy(): void;
    /**
     *
     */
    _updateWithValue(value?: string): void;
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    _onLayoutChange(direction: any): void;
    _buildCSS(align: any): {};
    /**
     * Update container element to 'stretch' as needed...
     */
    _allowStretching(align: any, layout: any): void;
}
