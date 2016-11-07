// RxJS Operators used by the classes...
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isDefined } from '../utils/global';
import { BreakPoints } from './break-points';
import { MediaQueryListFactory } from './media-query-factory';
// ****************************************************************
// Exported Types and Interfaces
// ****************************************************************
/**
 * Class instances emitted [to observers] for each mql notification
 */
export var MediaQueryChange = (function () {
    function MediaQueryChange(matches, // Is the mq currently activated
        mqAlias, // e.g.   gt-sm, md, gt-lg
        suffix, // e.g.   GtSM, Md, GtLg
        value // @Input value associated for the current mq
        ) {
        if (suffix === void 0) { suffix = ''; }
        if (value === void 0) { value = ''; }
        this.matches = matches;
        this.mqAlias = mqAlias;
        this.suffix = suffix;
        this.value = value;
    }
    return MediaQueryChange;
}());
// ****************************************************************
// ****************************************************************
export var MediaQueries = (function () {
    /**
     * Constructor
     */
    function MediaQueries(breakpoints, _zone) {
        this._zone = _zone;
        this._mqls = {};
        this._breakpoints = breakpoints;
        this._source = new BehaviorSubject(new MediaQueryChange(true, ''));
        this._announcer = this._source.asObservable();
        this.prepareWatchers(breakpoints.registry);
    }
    Object.defineProperty(MediaQueries.prototype, "breakpoints", {
        /**
         * Read-only accessor to the list of breakpoints configured in the BreakPoints provider
         */
        get: function () {
            return this._breakpoints.registry.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaQueries.prototype, "activeOverlaps", {
        get: function () {
            var _this = this;
            var items = this._breakpoints.overlappings.reverse();
            return items.filter(function (bp) {
                return _this._mqls[bp.mediaQuery].matches;
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaQueries.prototype, "active", {
        get: function () {
            var _this = this;
            var found = null, items = this.breakpoints.reverse();
            items.forEach(function (bp) {
                if (bp.alias !== '') {
                    var mql = _this._mqls[bp.mediaQuery];
                    if (mql.matches && !found)
                        found = bp;
                }
            });
            var first = this.breakpoints[0];
            return found || (this._mqls[first.mediaQuery].matches ? first : null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * For the specified mediaQuery alias, is the mediaQuery range active?
     */
    MediaQueries.prototype.isActive = function (alias) {
        var bp = this._breakpoints.findBreakpointBy(alias);
        if (bp) {
            var mql = this._mqls[bp.mediaQuery];
            if (mql.matches)
                return true;
        }
        return false;
    };
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * use the MediaQueries as $mdMedia service
     */
    MediaQueries.prototype.observe = function (alias) {
        return this._announcer.filter(function (e) {
            return !isDefined(alias) ? (e.matches === true) : (e.mqAlias === alias);
        });
    };
    /**
     * Based on the BreakPoints provider, register internal listeners for the specified ranges
     */
    MediaQueries.prototype.prepareWatchers = function (ranges) {
        var _this = this;
        ranges.forEach(function (it) {
            var mql = _this._mqls[it.mediaQuery];
            if (!mql) {
                mql = MediaQueryListFactory.instanceOf((it.mediaQuery));
                // Each listener uses a shared eventHandler: which emits specific data to observers
                // Cache this permanent listener
                mql.addListener(_this.onMQLEvent.bind(_this, it));
                _this._mqls[it.mediaQuery] = mql;
                if (mql.matches) {
                    // Announce activate range for initial subscribers
                    _this.onMQLEvent(it, mql);
                }
            }
        });
    };
    /**
     * On each mlq event, emit a special MediaQueryChange to all subscribers
     */
    MediaQueries.prototype.onMQLEvent = function (breakpoint, mql) {
        var _this = this;
        // Execute within ng2 zone from change detection, etc.
        this._zone.run(function () {
            console.log("mq[ " + breakpoint.alias + " ]: active = " + mql.matches + " ");
            _this._source.next(new MediaQueryChange(mql.matches, breakpoint.alias, breakpoint.suffix));
        });
    };
    MediaQueries = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [BreakPoints, NgZone])
    ], MediaQueries);
    return MediaQueries;
}());

//# sourceMappingURL=media-queries.js.map
