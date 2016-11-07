var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Directive, ElementRef, Input, Optional, Renderer } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isDefined } from '../../utils/global';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseStyleDirective } from './abstract';
/**
 * 'layout' flexbox styling directive
 * Defines the positioning flow direction for the child elements: row or column
 * Optional values: column or row (default)
 * @see https://css-tricks.com/almanac/properties/f/flex-direction/
 *
 */
export var LayoutDirective = (function (_super) {
    __extends(LayoutDirective, _super);
    /**
     *
     */
    function LayoutDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        /**
         * Create Observable for nested/child 'flex' directives. This allows
         * child flex directives to subscribe/listen for flexbox direction changes.
         */
        this._layout = new BehaviorSubject(this.layout);
        /**
         * Publish observer to enabled nested, dependent directives to listen
         * to parent "layout" direction changes
         */
        this.onLayoutChange = this._layout.asObservable();
        /**
         * Default layout property with default direction value
         */
        this.layout = 'row';
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-layout')
     * Then conditionally override with the mq-activated Input's current value
     */
    LayoutDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['layout']) || activationChange) {
            this._updateWithDirection();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'layout', 'row');
        this._updateWithDirection();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithDirection(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the direction value and then update the host's inline flexbox styles
     *
     * @todo - update all child containers to have "box-sizing: border-box"
     *         This way any padding or border specified on the child elements are
     *         laid out and drawn inside that element's specified width and height.
     *
     */
    LayoutDirective.prototype._updateWithDirection = function (direction) {
        direction = direction || this.layout || 'row';
        if (isDefined(this._mqActivation)) {
            direction = this._mqActivation.activatedInput;
        }
        direction = this._validateValue(direction);
        // Update styles and announce to subscribers the *new* direction
        this._updateStyle(this._buildCSS(direction));
        this._layout.next(direction);
    };
    /**
     * Build the CSS that should be assigned to the element instance
     * BUG:
     *
     *   1) min-height on a column flex container won’t apply to its flex item children in IE 10-11.
     *      Use height instead if possible; height : <xxx>vh;
     */
    LayoutDirective.prototype._buildCSS = function (value) {
        return { 'display': 'flex', 'box-sizing': 'border-box', 'flex-direction': value };
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    LayoutDirective.prototype._validateValue = function (value) {
        value = value ? value.toLowerCase() : '';
        return LAYOUT_VALUES.find(function (x) { return x === value; }) ? value : LAYOUT_VALUES[0]; // "row"
    };
    __decorate([
        Input('fx-layout'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layout", void 0);
    __decorate([
        Input('fx-layout.xs'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutXs", void 0);
    __decorate([
        Input('fx-layout.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtXs", void 0);
    __decorate([
        Input('fx-layout.sm'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutSm", void 0);
    __decorate([
        Input('fx-layout.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtSm", void 0);
    __decorate([
        Input('fx-layout.md'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutMd", void 0);
    __decorate([
        Input('fx-layout.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtMd", void 0);
    __decorate([
        Input('fx-layout.lg'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutLg", void 0);
    __decorate([
        Input('fx-layout.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutGtLg", void 0);
    __decorate([
        Input('fx-layout.xl'), 
        __metadata('design:type', Object)
    ], LayoutDirective.prototype, "layoutXl", void 0);
    LayoutDirective = __decorate([
        Directive({ selector: '[fx-layout], [fx-layout.md]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutDirective);
    return LayoutDirective;
}(BaseStyleDirective));
/**
 * 'layout-wrap' flexbox styling directive
 * Defines wrapping of child elements in layout container
 * Optional values: reverse, wrap-reverse, none, nowrap, wrap (default)]
 * @see https://css-tricks.com/almanac/properties/f/flex-wrap/
 */
export var LayoutWrapDirective = (function (_super) {
    __extends(LayoutWrapDirective, _super);
    function LayoutWrapDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.wrap = 'wrap';
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutWrapDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['wrap']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutWrapDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'wrap', 'wrap');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutWrapDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    LayoutWrapDirective.prototype.ngOnDestroy = function () { };
    // *********************************************
    // Protected methods
    // *********************************************
    LayoutWrapDirective.prototype._updateWithValue = function (value) {
        value = value || this.wrap || 'wrap';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        value = this._validateValue(value);
        this._updateStyle(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    LayoutWrapDirective.prototype._buildCSS = function (value) {
        return { 'flex-wrap': value, '-webkit-flex-wrap': value };
    };
    /**
     * Convert layout-wrap="<value>" to expected flex-wrap style
     */
    LayoutWrapDirective.prototype._validateValue = function (value) {
        switch (value.toLowerCase()) {
            case 'reverse':
            case 'wrap-reverse':
                value = 'wrap-reverse';
                break;
            case 'no':
            case 'none':
            case 'nowrap':
                value = 'nowrap';
                break;
            // All other values fallback to "wrap"
            default:
                value = 'wrap';
                break;
        }
        return value;
    };
    __decorate([
        Input('fx-layout-wrap'), 
        __metadata('design:type', String)
    ], LayoutWrapDirective.prototype, "wrap", void 0);
    __decorate([
        Input('fx-layout-wrap.xs'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapXs", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtXs", void 0);
    __decorate([
        Input('fx-layout-wrap.sm'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapSm", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtSm", void 0);
    __decorate([
        Input('fx-layout-wrap.md'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapMd", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtMd", void 0);
    __decorate([
        Input('fx-layout-wrap.lg'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapLg", void 0);
    __decorate([
        Input('fx-layout-wrap.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapGtLg", void 0);
    __decorate([
        Input('fx-layout-wrap.xl'), 
        __metadata('design:type', Object)
    ], LayoutWrapDirective.prototype, "wrapXl", void 0);
    LayoutWrapDirective = __decorate([
        Directive({ selector: '[fx-layout-wrap]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutWrapDirective);
    return LayoutWrapDirective;
}(BaseStyleDirective));
/**
 * 'layout-align' flexbox styling directive
 *  Defines positioning of child elements along main and cross axis in a layout container
 *  Optional values: {main-axis} values or {main-axis cross-axis} value pairs
 *
 *  @see https://css-tricks.com/almanac/properties/j/justify-content/
 *  @see https://css-tricks.com/almanac/properties/a/align-items/
 *  @see https://css-tricks.com/almanac/properties/a/align-content/
 */
export var LayoutAlignDirective = (function (_super) {
    __extends(LayoutAlignDirective, _super);
    function LayoutAlignDirective(container, _mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this.container = container;
        this._mqa = _mqa;
        this._layout = 'row'; // default flex-direction
        this.align = 'start stretch';
        if (container) {
            this._layoutWatcher = container.onLayoutChange.subscribe(this._onLayoutChange.bind(this));
        }
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    LayoutAlignDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['align']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    LayoutAlignDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'align', 'start stretch');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    LayoutAlignDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    LayoutAlignDirective.prototype.ngOnDestroy = function () {
        this._layoutWatcher.unsubscribe();
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     *
     */
    LayoutAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this.align || 'start stretch';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._updateStyle(this._buildCSS(value));
    };
    /**
     * Cache the parent container 'flex-direction' and update the 'flex' styles
     */
    LayoutAlignDirective.prototype._onLayoutChange = function (direction) {
        var _this = this;
        this._layout = (direction || '').toLowerCase().replace('-reverse', '');
        if (!LAYOUT_VALUES.find(function (x) { return x === _this._layout; }))
            this._layout = 'row';
        var value = this.align || 'start stretch';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._allowStretching(value, this._layout);
    };
    LayoutAlignDirective.prototype._buildCSS = function (align) {
        var css = {}, _a = align.split(' '), main_axis = _a[0], cross_axis = _a[1];
        css['justify-content'] = 'flex-start'; // default
        css['align-items'] = 'stretch'; // default
        css['align-content'] = 'stretch'; // default
        // Main axis
        switch (main_axis) {
            case 'center':
                css['justify-content'] = 'center';
                break;
            case 'space-around':
                css['justify-content'] = 'space-around';
                break;
            case 'space-between':
                css['justify-content'] = 'space-between';
                break;
            case 'end':
                css['justify-content'] = 'flex-end';
                break;
        }
        // Cross-axis
        switch (cross_axis) {
            case 'start':
                css['align-items'] = css['align-content'] = 'flex-start';
                break;
            case 'baseline':
                css['align-items'] = 'baseline';
                break;
            case 'center':
                css['align-items'] = css['align-content'] = 'center';
                break;
            case 'end':
                css['align-items'] = css['align-content'] = 'flex-end';
                break;
        }
        return css;
    };
    /**
     * Update container element to 'stretch' as needed...
     */
    LayoutAlignDirective.prototype._allowStretching = function (align, layout) {
        var _a = align.split(' '), cross_axis = _a[1];
        if (cross_axis == 'stretch') {
            // Use `null` values to remove style
            this._updateStyle({
                'box-sizing': 'border-box',
                'max-width': (layout === 'column') ? '100%' : null,
                'max-height': (layout === 'row') ? '100%' : null
            });
        }
    };
    __decorate([
        Input('fx-layout-align'), 
        __metadata('design:type', String)
    ], LayoutAlignDirective.prototype, "align", void 0);
    __decorate([
        Input('fx-layout-align.xs'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignXs", void 0);
    __decorate([
        Input('fx-layout-align.gt-xs'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtXs", void 0);
    __decorate([
        Input('fx-layout-align.sm'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignSm", void 0);
    __decorate([
        Input('fx-layout-align.gt-sm'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtSm", void 0);
    __decorate([
        Input('fx-layout-align.md'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignMd", void 0);
    __decorate([
        Input('fx-layout-align.gt-md'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtMd", void 0);
    __decorate([
        Input('fx-layout-align.lg'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignLg", void 0);
    __decorate([
        Input('fx-layout-align.gt-lg'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignGtLg", void 0);
    __decorate([
        Input('fx-layout-align.xl'), 
        __metadata('design:type', Object)
    ], LayoutAlignDirective.prototype, "alignXl", void 0);
    LayoutAlignDirective = __decorate([
        Directive({ selector: '[fx-layout-align]' }),
        __param(0, Optional()), 
        __metadata('design:paramtypes', [LayoutDirective, MediaQueryAdapter, ElementRef, Renderer])
    ], LayoutAlignDirective);
    return LayoutAlignDirective;
}(BaseStyleDirective));
// ************************************************************
// Private static variables
// ************************************************************
var LAYOUT_VALUES = ['row', 'column', 'row-reverse', 'column-reverse'];
var ROW = LAYOUT_VALUES[0], COLUMN = LAYOUT_VALUES[1], ROW_REVERSE = LAYOUT_VALUES[2], COLUMN_REVERSE = LAYOUT_VALUES[3];

//# sourceMappingURL=layout.js.map
