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
import { Directive, ElementRef, Input, Optional, Renderer, SkipSelf } from '@angular/core';
import { isDefined } from '../../utils/global';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseStyleDirective } from './abstract';
import { LayoutDirective, LayoutWrapDirective } from './layout';
/**
 * FlexBox styling directive for 'fx-flex'
 * Configures the width/height sizing of the element within a layout container
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 */
export var FlexDirective = (function (_super) {
    __extends(FlexDirective, _super);
    /**
     * Note: the optional `layout="column|row"` directive must be PARENT container.
     *
     * <div layout="row">
     *    <div flex="25%" layout="column">
     *      ...
     *    </div>
     * </div>
     */
    function FlexDirective(_mqa, _container, _wrap, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this._container = _container;
        this._wrap = _wrap;
        this._layout = 'row'; // default flex-direction
        this.flex = '';
        this.shrink = 1;
        this.grow = 1;
        if (_container) {
            this._layoutWatcher =
                _container
                    .onLayoutChange // Subscribe to layout immediate parent direction changes
                    .subscribe(this._onLayoutChange.bind(this));
        }
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
    FlexDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['flex']) || activationChange) {
            this._onLayoutChange(this._layout);
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'flex', '');
        this._onLayoutChange();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    FlexDirective.prototype.ngOnDestroy = function () {
        if (this._layoutWatcher) {
            this._layoutWatcher.unsubscribe();
        }
    };
    // *********************************************
    // Protected methods
    // ***************************************s******
    /**
     * Cache the parent container 'flex-direction' and update the 'fx-flex' styles
     */
    FlexDirective.prototype._onLayoutChange = function (direction) {
        this._layout = direction || this._layout;
        var value = this.flex || '';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._updateWithValue(value);
    };
    FlexDirective.prototype._updateWithValue = function (value) {
        this._updateStyle(this._validateValue(this.grow, this.shrink, value));
    };
    /**
     * Validate the value to be one of the acceptable value options
     * Use default fallback of "row"
     */
    FlexDirective.prototype._validateValue = function (grow, shrink, basis) {
        var css, direction = (this._layout === 'column') || (this._layout == 'column-reverse') ?
            'column' :
            'row';
        /*
         * flex-basis allows you to specify the initial/starting main-axis size of the element,
         * before anything else is computed. It can either be a percentage or an absolute value.
         * It is, however, not the breaking point for flex-grow/shrink properties
         *
         * flex-grow can be seen as this:
         *   0: Do not stretch. Either size to element's content width, or obey 'flex-basis'.
         *   1: (Default value). Stretch; will be the same size to all other flex items on
         *       the same row since they have a default value of 1.
         *   ≥2 (integer n): Stretch. Will be n times the size of other elements
         *      with 'flex-grow: 1' on the same row.
         *
         */
        var clearStyles = {
            'max-width': null,
            'max-height': null,
            'min-width': null,
            'min-height': null
        };
        switch (basis || '') {
            case '':
                css = Object.assign(clearStyles, { 'flex': '1' });
                break;
            case GROW:
                css = Object.assign(clearStyles, { 'flex': '1 1 100%' });
                break;
            case INITIAL:
                css = Object.assign(clearStyles, { 'flex': '0 1 auto' });
                break; // default
            case AUTO:
                css = Object.assign(clearStyles, { 'flex': '1 1 auto' });
                break;
            case NONE:
                css = Object.assign(clearStyles, { 'flex': '0 0 auto' });
                break;
            case NO_GROW:
                css = Object.assign(clearStyles, { 'flex': '0 1 auto' });
                break;
            case NO_SHRINK:
                css = Object.assign(clearStyles, { 'flex': '1 0 auto' });
                break;
            default:
                var isPercent = String(basis).indexOf('%') > -1;
                var isPx = String(basis).indexOf('px') > -1;
                // Defaults to percentage sizing unless `px` is explicitly set
                if (!isPx && !isPercent && !isNaN(basis))
                    basis = basis + '%';
                if (basis === '0px')
                    basis = '0%';
                // Set max-width = basis if using layout-wrap
                // @see https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrappifl-flex-items
                css = Object.assign(clearStyles, {
                    'flex': grow + " " + shrink + " " + ((isPx || this._wrap) ? basis : '100%'),
                });
                break;
        }
        var max = (direction === 'row') ? 'max-width' : 'max-height';
        var min = (direction === 'row') ? 'min-width' : 'min-height';
        css[min] = (basis == '0%') ? 0 : null;
        css[max] = (basis == '0%') ? 0 : basis;
        return Object.assign(css, { 'box-sizing': 'border-box' });
    };
    __decorate([
        Input('fx-flex'), 
        __metadata('design:type', String)
    ], FlexDirective.prototype, "flex", void 0);
    __decorate([
        Input('fx-shrink'), 
        __metadata('design:type', Number)
    ], FlexDirective.prototype, "shrink", void 0);
    __decorate([
        Input('fx-grow'), 
        __metadata('design:type', Number)
    ], FlexDirective.prototype, "grow", void 0);
    __decorate([
        Input('fx-flex.xs'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexXs", void 0);
    __decorate([
        Input('fx-flex.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtXs", void 0);
    __decorate([
        Input('fx-flex.sm'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexSm", void 0);
    __decorate([
        Input('fx-flex.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtSm", void 0);
    __decorate([
        Input('fx-flex.md'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexMd", void 0);
    __decorate([
        Input('fx-flex.gt-md'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtMd", void 0);
    __decorate([
        Input('fx-flex.lg'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexLg", void 0);
    __decorate([
        Input('fx-flex.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexGtLg", void 0);
    __decorate([
        Input('fx-flex.xl'), 
        __metadata('design:type', Object)
    ], FlexDirective.prototype, "flexXl", void 0);
    FlexDirective = __decorate([
        Directive({
            selector: '[fx-flex]',
        }),
        __param(1, Optional()),
        __param(1, SkipSelf()),
        __param(2, Optional()),
        __param(2, SkipSelf()), 
        __metadata('design:paramtypes', [MediaQueryAdapter, LayoutDirective, LayoutWrapDirective, ElementRef, Renderer])
    ], FlexDirective);
    return FlexDirective;
}(BaseStyleDirective));
/**
 * 'flex-order' flexbox styling directive
 * Configures the positional ordering of the element in a sorted layout container
 * @see https://css-tricks.com/almanac/properties/o/order/
 */
export var FlexOrderDirective = (function (_super) {
    __extends(FlexOrderDirective, _super);
    function FlexOrderDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
    FlexOrderDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['order']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOrderDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'order', '1');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexOrderDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOrderDirective.prototype._updateWithValue = function (value) {
        value = value || this.order || '1';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._updateStyle(this._buildCSS(value));
    };
    FlexOrderDirective.prototype._buildCSS = function (value) {
        value = parseInt(value, 10);
        return { order: isNaN(value) ? 0 : value };
    };
    __decorate([
        Input('fx-flex-order'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "order", void 0);
    __decorate([
        Input('fx-flex-order.xs'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderXs", void 0);
    __decorate([
        Input('fx-flex-order.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtXs", void 0);
    __decorate([
        Input('fx-flex-order.sm'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderSm", void 0);
    __decorate([
        Input('fx-flex-order.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtSm", void 0);
    __decorate([
        Input('fx-flex-order.md'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderMd", void 0);
    __decorate([
        Input('fx-flex-order.gt-md'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtMd", void 0);
    __decorate([
        Input('fx-flex-order.lg'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderLg", void 0);
    __decorate([
        Input('fx-flex-order.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderGtLg", void 0);
    __decorate([
        Input('fx-flex-order.xl'), 
        __metadata('design:type', Object)
    ], FlexOrderDirective.prototype, "orderXl", void 0);
    FlexOrderDirective = __decorate([
        Directive({ selector: '[fx-flex-order]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexOrderDirective);
    return FlexOrderDirective;
}(BaseStyleDirective));
/**
 * 'flex-offset' flexbox styling directive
 * Configures the 'margin-left' of the element in a layout container
 */
export var FlexOffsetDirective = (function (_super) {
    __extends(FlexOffsetDirective, _super);
    function FlexOffsetDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
    FlexOffsetDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['offset']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    FlexOffsetDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'offset', 0);
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexOffsetDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexOffsetDirective.prototype._updateWithValue = function (value) {
        value = value || this.offset || 0;
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._updateStyle(this._buildCSS(value));
    };
    FlexOffsetDirective.prototype._buildCSS = function (offset) {
        var isPercent = String(offset).indexOf('%') > -1;
        var isPx = String(offset).indexOf('px') > -1;
        if (!isPx && !isPercent && !isNaN(offset))
            offset = offset + '%';
        return { 'margin-left': "" + offset };
    };
    __decorate([
        Input('fx-flex-offset'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offset", void 0);
    __decorate([
        Input('fx-flex-offset.xs'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetXs", void 0);
    __decorate([
        Input('fx-flex-offset.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtXs", void 0);
    __decorate([
        Input('fx-flex-offset.sm'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetSm", void 0);
    __decorate([
        Input('fx-flex-offset.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtSm", void 0);
    __decorate([
        Input('fx-flex-offset.md'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetMd", void 0);
    __decorate([
        Input('fx-flex-offset.gt-md'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtMd", void 0);
    __decorate([
        Input('fx-flex-offset.lg'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetLg", void 0);
    __decorate([
        Input('fx-flex-offset.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetGtLg", void 0);
    __decorate([
        Input('fx-flex-offset.xl'), 
        __metadata('design:type', Object)
    ], FlexOffsetDirective.prototype, "offsetXl", void 0);
    FlexOffsetDirective = __decorate([
        Directive({ selector: '[fx-flex-offset]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexOffsetDirective);
    return FlexOffsetDirective;
}(BaseStyleDirective));
/**
 * 'flex-align' flexbox styling directive
 * Allows element-specific overrides for cross-axis alignments in a layout container
 * @see https://css-tricks.com/almanac/properties/a/align-self/
 */
export var FlexAlignDirective = (function (_super) {
    __extends(FlexAlignDirective, _super);
    function FlexAlignDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.align = 'stretch'; // default
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * For @Input changes on the current mq activation property, delegate to the onLayoutChange()
     */
    FlexAlignDirective.prototype.ngOnChanges = function (changes) {
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
    FlexAlignDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'align', 'stretch');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    FlexAlignDirective.prototype.onMediaQueryChanges = function (changes) {
        this._updateWithValue(changes.current.value);
    };
    // *********************************************
    // Protected methods
    // *********************************************
    FlexAlignDirective.prototype._updateWithValue = function (value) {
        value = value || this.align || 'stretch';
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        this._updateStyle(this._buildCSS(value));
    };
    FlexAlignDirective.prototype._buildCSS = function (align) {
        var css = {};
        // Cross-axis
        switch (align) {
            case 'start':
                css['align-self'] = 'flex-start';
                break;
            case 'baseline':
                css['align-self'] = 'baseline';
                break;
            case 'center':
                css['align-self'] = 'center';
                break;
            case 'end':
                css['align-self'] = 'flex-end';
                break;
            default:
                css['align-self'] = 'stretch';
                break; // default
        }
        return css;
    };
    __decorate([
        Input('fx-flex-align'), 
        __metadata('design:type', String)
    ], FlexAlignDirective.prototype, "align", void 0);
    __decorate([
        // default
        Input('fx-flex-align.xs'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignXs", void 0);
    __decorate([
        Input('fx-flex-align.gt-xs'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtXs", void 0);
    __decorate([
        Input('fx-flex-align.sm'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignSm", void 0);
    __decorate([
        Input('fx-flex-align.gt-sm'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtSm", void 0);
    __decorate([
        Input('fx-flex-align.md'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignMd", void 0);
    __decorate([
        Input('fx-flex-align.gt-md'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtMd", void 0);
    __decorate([
        Input('fx-flex-align.lg'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignLg", void 0);
    __decorate([
        Input('fx-flex-align.gt-lg'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignGtLg", void 0);
    __decorate([
        Input('fx-flex-align.xl'), 
        __metadata('design:type', Object)
    ], FlexAlignDirective.prototype, "alignXl", void 0);
    FlexAlignDirective = __decorate([
        Directive({ selector: '[fx-flex-align]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], FlexAlignDirective);
    return FlexAlignDirective;
}(BaseStyleDirective));
/**
 * 'fx-flex-fill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: [fx-flexFill] is NOT responsive fx-flex
 */
export var FlexFillDirective = (function (_super) {
    __extends(FlexFillDirective, _super);
    function FlexFillDirective(elRef, renderer) {
        _super.call(this, elRef, renderer);
        this.elRef = elRef;
        this.renderer = renderer;
        this._updateStyle(this._buildCSS());
    }
    FlexFillDirective.prototype._buildCSS = function () {
        return {
            'margin': 0,
            'width': '100%',
            'height': '100%',
            'min-width': '100%',
            'min-height': '100%'
        };
    };
    FlexFillDirective = __decorate([
        Directive({ selector: '[fx-flex-fill]' }), 
        __metadata('design:paramtypes', [ElementRef, Renderer])
    ], FlexFillDirective);
    return FlexFillDirective;
}(BaseStyleDirective));
// ************************************************************
// Private static variables
// ************************************************************
var GROW = 'grow';
var INITIAL = 'initial';
var AUTO = 'auto';
var NONE = 'none';
var NO_GROW = 'nogrow';
var NO_SHRINK = 'noshrink';

//# sourceMappingURL=flex.js.map
