var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/**
 * Registry of 1..n MediaQuery breakpoint ranges
 * This is published as a provider and may be overriden from custom, application-specific ranges
 *
 */
export var BreakPoints = (function () {
    /**
     *
     */
    function BreakPoints() {
        this.registry = [
            { alias: '', suffix: '', overlapping: true, mediaQuery: 'screen' },
            { alias: 'xs', suffix: 'Xs', overlapping: false, mediaQuery: 'screen and (max-width: 599px)' },
            {
                alias: 'gt-xs',
                suffix: 'GtXs',
                overlapping: true,
                mediaQuery: 'screen and (min-width: 600px)'
            },
            {
                alias: 'sm',
                suffix: 'Sm',
                overlapping: false,
                mediaQuery: 'screen and (min-width: 600px) and (max-width: 959px)'
            },
            {
                alias: 'gt-sm',
                suffix: 'GtSm',
                overlapping: true,
                mediaQuery: 'screen and (min-width: 960px)'
            },
            {
                alias: 'md',
                suffix: 'Md',
                overlapping: false,
                mediaQuery: 'screen and (min-width: 960px) and (max-width: 1279px)'
            },
            {
                alias: 'gt-md',
                suffix: 'GtMd',
                overlapping: true,
                mediaQuery: 'screen and (min-width: 1280px)'
            },
            {
                alias: 'lg',
                suffix: 'Lg',
                overlapping: false,
                mediaQuery: 'screen and (min-width: 1280px) and (max-width: 1919px)'
            },
            {
                alias: 'gt-lg',
                suffix: 'GtLg',
                overlapping: true,
                mediaQuery: 'screen and (min-width: 1920px)'
            },
            {
                alias: 'xl',
                suffix: 'Xl',
                overlapping: false,
                mediaQuery: 'screen and (min-width: 1920px)'
            }
        ];
    }
    /**
     *
     */
    BreakPoints.prototype.findBreakpointBy = function (alias) {
        for (var _i = 0, _a = this.registry; _i < _a.length; _i++) {
            var bp = _a[_i];
            if (bp.alias == alias) {
                return bp;
            }
        }
        return null;
    };
    Object.defineProperty(BreakPoints.prototype, "overlappings", {
        /**
         * Get all the breakpoints whose ranges could overlapping `normal` ranges;
         * e.g. gt-sm overlaps md, lg, and xl
         */
        get: function () {
            return this.registry.filter(function (it) { return it.overlapping == true; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPoints.prototype, "aliases", {
        /**
         * Get list of all registered (non-empty) breakpoint aliases
         */
        get: function () {
            return this.registry.map(function (it) { return it.alias; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BreakPoints.prototype, "suffixes", {
        /**
         *
         */
        get: function () {
            return this.registry.map(function (it) { return it.suffix; });
        },
        enumerable: true,
        configurable: true
    });
    BreakPoints = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [])
    ], BreakPoints);
    return BreakPoints;
}());

//# sourceMappingURL=break-points.js.map
