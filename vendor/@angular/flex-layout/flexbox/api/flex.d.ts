import { ElementRef, OnChanges, OnDestroy, OnInit, Renderer, SimpleChanges } from '@angular/core';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { MediaQueryChanges, OnMediaQueryChanges } from '../media-query/media-query-changes';
import { BaseStyleDirective } from './abstract';
import { LayoutDirective, LayoutWrapDirective } from './layout';
/**
 * FlexBox styling directive for 'fx-flex'
 * Configures the width/height sizing of the element within a layout container
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export declare class FlexDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges, OnDestroy {
    private _mqa;
    private _container;
    private _wrap;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    private _layout;
    private _layoutWatcher;
    flex: string;
    shrink: number;
    grow: number;
    flexXs: any;
    flexGtXs: any;
    flexSm: any;
    flexGtSm: any;
    flexMd: any;
    flexGtMd: any;
    flexLg: any;
    flexGtLg: any;
    flexXl: any;
    /**
     * Note: the optional `layout="column|row"` directive must be PARENT container.
     *
     * <div layout="row">
     *    <div flex="25%" layout="column">
     *      ...
     *    </div>
     * </div>
     */
    constructor(_mqa: MediaQueryAdapter, _container: LayoutDirective, _wrap: LayoutWrapDirective, elRef: ElementRef, renderer: Renderer);
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
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
     * Cache the parent container 'flex-direction' and update the 'fx-flex' styles
     */
    _onLayoutChange(direction?: string): void;
    _updateWithValue(value: string): void;
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    _validateValue(grow: any, shrink: any, basis: any): any;
}
/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
export declare class FlexOrderDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    order: any;
    orderXs: any;
    orderGtXs: any;
    orderSm: any;
    orderGtSm: any;
    orderMd: any;
    orderGtMd: any;
    orderLg: any;
    orderGtLg: any;
    orderXl: any;
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
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
    _updateWithValue(value?: string): void;
    _buildCSS(value: any): {
        order: any;
    };
}
/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export declare class FlexOffsetDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
    offset: string | number;
    offsetXs: string | number;
    offsetGtXs: string | number;
    offsetSm: string | number;
    offsetGtSm: string | number;
    offsetMd: string | number;
    offsetGtMd: string | number;
    offsetLg: string | number;
    offsetGtLg: string | number;
    offsetXl: string | number;
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
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
    _updateWithValue(value?: string | number): void;
    _buildCSS(offset: any): {
        'margin-left': string;
    };
}
/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
export declare class FlexAlignDirective extends BaseStyleDirective implements OnInit, OnChanges, OnMediaQueryChanges {
    private _mqa;
    /**
     * MediaQuery Activation Tracker
     */
    private _mqActivation;
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
    constructor(_mqa: MediaQueryAdapter, elRef: ElementRef, renderer: Renderer);
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
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
    _updateWithValue(value?: string | number): void;
    _buildCSS(align: any): {};
}
/**
 * 'fx-flex-fill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: [fx-flexFill] is NOT responsive fx-flex
 */
export declare class FlexFillDirective extends BaseStyleDirective {
    elRef: ElementRef;
    renderer: Renderer;
    constructor(elRef: ElementRef, renderer: Renderer);
    _buildCSS(): {
        'margin': number;
        'width': string;
        'height': string;
        'min-width': string;
        'min-height': string;
    };
}
