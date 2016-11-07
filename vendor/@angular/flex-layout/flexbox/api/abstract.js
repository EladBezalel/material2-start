import { applyCssPrefixes } from '../../utils/auto-prefixer';
/**
 * Abstract base class for the Layout API styling directives
 */
export var BaseStyleDirective = (function () {
    function BaseStyleDirective(_elRef, _renderer) {
        this._elRef = _elRef;
        this._renderer = _renderer;
    }
    // *********************************************
    // Protected methods
    // *********************************************
    /**
     * Inject inline the flexbox styles specific to this renderer/domEl pair
     */
    BaseStyleDirective.prototype._updateStyle = function (source, value) {
        var styles = {}, domEl = this._elRef.nativeElement;
        if (typeof source === 'string') {
            styles[source] = value;
            source = styles;
        }
        styles = applyCssPrefixes(source);
        // Iterate all properties in hashMap and set styles
        for (var key in styles) {
            this._renderer.setElementStyle(domEl, key, styles[key]);
        }
    };
    return BaseStyleDirective;
}());

//# sourceMappingURL=abstract.js.map
