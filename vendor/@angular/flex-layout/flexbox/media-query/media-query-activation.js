import { isDefined } from '../../utils/global';
import { MediaQueryChanges } from './media-query-changes';
var ON_DESTROY = 'ngOnDestroy';
var ON_MEDIA_CHANGES = 'onMediaQueryChanges';
/**
 *
 */
export var MediaQueryActivation = (function () {
    /**
     *
     */
    function MediaQueryActivation(_mq, _directive, _baseKey, _defaultValue) {
        this._mq = _mq;
        this._directive = _directive;
        this._baseKey = _baseKey;
        this._defaultValue = _defaultValue;
        this._interceptLifeCyclEvents();
    }
    Object.defineProperty(MediaQueryActivation.prototype, "activatedInputKey", {
        get: function () {
            var _this = this;
            var items = this._mq.activeOverlaps;
            items.forEach(function (bp) {
                if (!isDefined(_this._activatedInputKey)) {
                    var key = _this._baseKey + bp.suffix;
                    if (isDefined(_this._directive[key])) {
                        _this._activatedInputKey = key;
                    }
                }
            });
            return this._activatedInputKey || this._baseKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MediaQueryActivation.prototype, "activatedInput", {
        /**
         * Get the currently activated @Input value or the fallback default @Input value
         */
        get: function () {
            return this._directive[this.activatedInputKey] || this._defaultValue;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * MediaQueryChanges interceptor that tracks the current mq-activated @Input and calculates the
     * mq-activated input value or the default value
     */
    MediaQueryActivation.prototype.onMediaQueryChanges = function (changes) {
        var currentKey = (this._baseKey + changes.current.suffix);
        // !! change events may arrive out-of-order (activate before deactivate)
        //    so make sure the deactivate is used ONLY when the keys match
        //    (since a different activate may be in use)
        this._activatedInputKey = changes.current.matches ?
            currentKey :
            (this._activatedInputKey !== currentKey) ? this._activatedInputKey : undefined;
        var current = changes.current;
        current.value = this.activatedInput; // calculated value
        changes = new MediaQueryChanges(changes.previous, current);
        this._logMediaQueryChanges(changes);
        this._onMediaQueryChanges(changes);
    };
    /**
     * Remove interceptors, restore original functions, and forward the onDestroy() call
     */
    MediaQueryActivation.prototype.ngOnDestroy = function () {
        this._directive[ON_DESTROY] = this._onDestroy || this._directive[ON_DESTROY];
        this._directive[ON_MEDIA_CHANGES] = this._onMediaQueryChanges;
        try {
            this._onDestroy();
        }
        finally {
            this._directive = undefined;
            this._onDestroy = undefined;
            this._onMediaQueryChanges = undefined;
        }
    };
    /**
     * Head-hook onDestroy and onMediaQueryChanges methods on the directive instance
     */
    MediaQueryActivation.prototype._interceptLifeCyclEvents = function () {
        if (this._directive[ON_DESTROY]) {
            this._onDestroy = this._directive[ON_DESTROY].bind(this._directive);
            this._directive[ON_DESTROY] = this.ngOnDestroy.bind(this);
        }
        this._onMediaQueryChanges = this._directive[ON_MEDIA_CHANGES].bind(this._directive);
        this._directive[ON_MEDIA_CHANGES] = this.onMediaQueryChanges.bind(this);
    };
    /**
     */
    MediaQueryActivation.prototype._logMediaQueryChanges = function (changes) {
        var current = changes.current, previous = changes.previous;
        if (current && current.mqAlias == '')
            current.mqAlias = 'all';
        if (previous && previous.mqAlias == '')
            previous.mqAlias = 'all';
        if (current.matches) {
            console.log("mqChange: " + this._baseKey + "." + current.mqAlias + " = " + changes.current.value + ";");
        }
    };
    return MediaQueryActivation;
}());

//# sourceMappingURL=media-query-activation.js.map
