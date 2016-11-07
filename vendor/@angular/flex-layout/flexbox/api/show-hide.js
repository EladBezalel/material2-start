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
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { delay, isDefined } from '../../utils/global';
import { MediaQueryAdapter } from '../media-query/media-query-adapter';
import { BaseStyleDirective } from './abstract';
var FALSY = ['false', '0', false, 0];
/**
 * 'show' Layout API directive
 *
 */
export var ShowDirective = (function (_super) {
    __extends(ShowDirective, _super);
    /**
     *
     */
    function ShowDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.elRef = elRef;
        this.renderer = renderer;
        /**
         * Original dom Elements CSS display style
         */
        this._display = 'flex';
        /**
         * Default layout property with default visible === true
         */
        this.show = true;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-show')
     * Then conditionally override with the mq-activated Input's current value
     */
    ShowDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['show']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    ShowDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'show', 'true');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    ShowDirective.prototype.onMediaQueryChanges = function (changes) {
        var _this = this;
        delay(function () {
            _this._updateWithValue(changes.current.value);
        });
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the visibility value and then update the host's inline display style
     */
    ShowDirective.prototype._updateWithValue = function (value) {
        value = value || this.show || true;
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
        }
        value = this._validateValue(value);
        // Update styles and announce to subscribers the *new* direction
        this._updateStyle(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    ShowDirective.prototype._buildCSS = function (isFalsy) {
        return { 'display': !isFalsy ? this._display : 'none' };
    };
    /**
     * Validate the value to be not FALSY
     */
    ShowDirective.prototype._validateValue = function (value) {
        return isDefined(FALSY.find(function (x) { return x === value; }));
    };
    __decorate([
        Input('fx-show'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "show", void 0);
    __decorate([
        Input('fx-show.xs'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showXs", void 0);
    __decorate([
        Input('fx-show.gt-xs'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtXs", void 0);
    __decorate([
        Input('fx-show.sm'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showSm", void 0);
    __decorate([
        Input('fx-show.gt-sm'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtSm", void 0);
    __decorate([
        Input('fx-show.md'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showMd", void 0);
    __decorate([
        Input('fx-show.gt-md'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtMd", void 0);
    __decorate([
        Input('fx-show.lg'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showLg", void 0);
    __decorate([
        Input('fx-show.gt-lg'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showGtLg", void 0);
    __decorate([
        Input('fx-show.xl'), 
        __metadata('design:type', Object)
    ], ShowDirective.prototype, "showXl", void 0);
    ShowDirective = __decorate([
        Directive({ selector: '[fx-show]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], ShowDirective);
    return ShowDirective;
}(BaseStyleDirective));
/**
 * 'show' Layout API directive
 *
 */
export var HideDirective = (function (_super) {
    __extends(HideDirective, _super);
    /**
     *
     */
    function HideDirective(_mqa, elRef, renderer) {
        _super.call(this, elRef, renderer);
        this._mqa = _mqa;
        this.elRef = elRef;
        this.renderer = renderer;
        /**
         * Original dom Elements CSS display style
         */
        this._display = 'flex';
        /**
         * Default layout property with default visible === true
         */
        this.hide = true;
    }
    // *********************************************
    // Lifecycle Methods
    // *********************************************
    /**
     * On changes to any @Input properties...
     * Default to use the non-responsive Input value ('fx-hide')
     * Then conditionally override with the mq-activated Input's current value
     */
    HideDirective.prototype.ngOnChanges = function (changes) {
        var activated = this._mqActivation;
        var activationChange = activated && isDefined(changes[activated.activatedInputKey]);
        if (isDefined(changes['hide']) || activationChange) {
            this._updateWithValue();
        }
    };
    /**
     * After the initial onChanges, build an mqActivation object that bridges
     * mql change events to onMediaQueryChange handlers
     */
    HideDirective.prototype.ngOnInit = function () {
        this._mqActivation = this._mqa.attach(this, 'hide', 'true');
        this._updateWithValue();
    };
    /**
     *  Special mql callback used by MediaQueryActivation when a mql event occurs
     */
    HideDirective.prototype.onMediaQueryChanges = function (changes) {
        var _this = this;
        delay(function () {
            _this._updateWithValue(changes.current.value);
        });
    };
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Validate the visibility value and then update the host's inline display style
     */
    HideDirective.prototype._updateWithValue = function (value) {
        var key = '';
        value = value || this.hide || true;
        if (isDefined(this._mqActivation)) {
            value = this._mqActivation.activatedInput;
            key = this._mqActivation.activatedInputKey;
        }
        value = this._validateValue(value);
        // Update styles and announce to subscribers the *new* direction
        this._updateStyle(this._buildCSS(value));
    };
    /**
     * Build the CSS that should be assigned to the element instance
     */
    HideDirective.prototype._buildCSS = function (value) {
        return { 'display': value ? 'none' : this._display };
    };
    /**
     * Validate the value to be FALSY
     */
    HideDirective.prototype._validateValue = function (value) {
        // console.log(`HideDirective::_validateValue( ${value} )`);
        return !isDefined(FALSY.find(function (x) { return x === value; }));
    };
    __decorate([
        Input('fx-hide'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hide", void 0);
    __decorate([
        Input('fx-hide.xs'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideXs", void 0);
    __decorate([
        Input('fx-hide.gt-xs'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtXs", void 0);
    __decorate([
        Input('fx-hide.sm'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideSm", void 0);
    __decorate([
        Input('fx-hide.gt-sm'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtSm", void 0);
    __decorate([
        Input('fx-hide.md'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideMd", void 0);
    __decorate([
        Input('fx-hide.gt-md'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtMd", void 0);
    __decorate([
        Input('fx-hide.lg'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideLg", void 0);
    __decorate([
        Input('fx-hide.gt-lg'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideGtLg", void 0);
    __decorate([
        Input('fx-hide.xl'), 
        __metadata('design:type', Object)
    ], HideDirective.prototype, "hideXl", void 0);
    HideDirective = __decorate([
        Directive({ selector: '[fx-hide]' }), 
        __metadata('design:paramtypes', [MediaQueryAdapter, ElementRef, Renderer])
    ], HideDirective);
    return HideDirective;
}(BaseStyleDirective));

//# sourceMappingURL=show-hide.js.map
