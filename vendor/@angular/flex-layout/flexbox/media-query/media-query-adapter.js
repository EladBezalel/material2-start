var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NgZone } from '@angular/core';
import { BreakPoints } from '../../media-query/break-points';
import { MediaQueries } from '../../media-query/media-queries';
import { isDefined } from '../../utils/global';
import { MediaQueryActivation } from './media-query-activation';
import { MediaQueryChanges } from './media-query-changes';
var ON_DESTROY = 'ngOnDestroy';
var ON_MEDIA_CHANGES = 'onMediaQueryChanges';
/**
 *  Adapter between Layout API directives and the MediaQueries mdl service
 *
 *  Using this adapter encapsulates most of the complexity of mql subscriptions
 *  and insures lean integration-code in the Layout directives
 *
 */
export var MediaQueryAdapter = (function () {
    /**
     *
     */
    function MediaQueryAdapter(_breakpoints, zone) {
        this._breakpoints = _breakpoints;
        this._mq = new MediaQueries(_breakpoints, zone);
    }
    /**
     * Create a custom MQ Activation instance for each directive instance; the activation object
     * tracks the current mq-activated input and manages the calls to the directive's
     * `onMediaQueryChanges( )`
     */
    MediaQueryAdapter.prototype.attach = function (directive, property, defaultVal) {
        var activation = new MediaQueryActivation(this._mq, directive, property, defaultVal);
        var list = this._linkOnMediaChanges(directive, property);
        this._listenOnDestroy(directive, list);
        return activation;
    };
    /**
     *
     */
    MediaQueryAdapter.prototype._linkOnMediaChanges = function (directive, property) {
        var list = [], handler = directive[ON_MEDIA_CHANGES];
        if (handler) {
            var keys = this._buildRegistryMap(directive, property);
            list = this._configureChangeObservers(directive, keys, handler);
        }
        return list;
    };
    /**
     *
     */
    MediaQueryAdapter.prototype._listenOnDestroy = function (directive, subscribers) {
        var onDestroyFn = directive[ON_DESTROY];
        if (onDestroyFn) {
            directive[ON_DESTROY] = function () {
                // Unsubscribe all for this directive
                subscribers.forEach(function (s) {
                    s.unsubscribe();
                });
                onDestroyFn();
                // release array and restore original fn
                subscribers.length = 0;
                directive[ON_DESTROY] = onDestroyFn;
            };
        }
    };
    /**
     * Build mediaQuery key-hashmap; only for the directive properties that are actually defined
     */
    MediaQueryAdapter.prototype._buildRegistryMap = function (directive, key) {
        return this._breakpoints.registry
            .map(function (it) {
            return {
                alias: it.alias,
                key: key + it.suffix // e.g.  layoutGtSm, layoutMd, layoutGtLg
            };
        })
            .filter(function (it) { return isDefined(directive[it.key]); });
    };
    /**
     * For each API property, register a callback to `onMediaQueryChanges( )`(e:MediaQueryEvent)
     * Cache 1..n subscriptions for internal auto-unsubscribes during the directive ngOnDestory()
     * notification
     */
    MediaQueryAdapter.prototype._configureChangeObservers = function (directive, keys, subscriber) {
        var _this = this;
        var subscriptions = [];
        keys.forEach(function (it) {
            // Only subscribe if the directive API is defined (in use)
            if (isDefined(directive[it.key])) {
                var lastEvent_1, mergeWithLastEvent = function (current) {
                    var previous = lastEvent_1;
                    if (_this._isDifferentChange(previous, current))
                        lastEvent_1 = current;
                    return new MediaQueryChanges(previous, current);
                }, 
                // Create subscription for mq changes for each alias (e.g. gt-sm, md, etc)
                subscription = _this._mq.observe(it.alias).map(mergeWithLastEvent).subscribe(subscriber);
                subscriptions.push(subscription);
            }
        });
        return subscriptions;
    };
    /**
     * Is the current activation event different from the last activation event ?
     *
     * !! change events may arrive out-of-order (activate before deactivate)
     *    so make sure the deactivate is used ONLY when the keys match
     *    (since a different activate may be in use)
     *
     */
    MediaQueryAdapter.prototype._isDifferentChange = function (previous, current) {
        var prevAlias = (previous ? previous.mqAlias : '');
        return current.matches || (!current.matches && current.mqAlias !== prevAlias);
    };
    MediaQueryAdapter = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [BreakPoints, NgZone])
    ], MediaQueryAdapter);
    return MediaQueryAdapter;
}());

//# sourceMappingURL=media-query-adapter.js.map
