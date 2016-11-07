import { isDefined } from '../utils/global';
// ****************************************************************
// ****************************************************************
/**
 * Private global registry for all dynamically-created, injected style tags
 * @see prepare(query)
 */
var ALL_STYLES = {};
/**
 * Factory class used to quickly create a mq listener for a specified mediaQuery range
 * No need to implement polyfill
 */
export var MediaQueryListFactory = (function () {
    function MediaQueryListFactory() {
    }
    /**
     * Return a MediaQueryList for the specified media query
     * Publish a mockMQL if needed
     */
    MediaQueryListFactory.instanceOf = function (query) {
        var canListen = isDefined(window.matchMedia('all').addListener);
        prepare(query);
        return canListen ? window.matchMedia(query) : {
            matches: query === 'all' || query === '',
            media: query,
            addListener: function () { },
            removeListener: function () { }
        };
    };
    return MediaQueryListFactory;
}());
/**
 * For Webkit engines that only trigger the MediaQueryListListener
 * when there is at least one CSS selector for the respective media query.
 *
 * @param query string The mediaQuery used to create a faux CSS selector
 *
 */
function prepare(query) {
    if (!ALL_STYLES[query]) {
        try {
            var style = document.createElement('style');
            style.setAttribute('type', 'text/css');
            if (!style['styleSheet']) {
                var cssText = "@media " + query + " {.ngl-query-test{ }}";
                style.appendChild(document.createTextNode(cssText));
            }
            document.getElementsByTagName('head')[0].appendChild(style);
            // Store in private global registry
            ALL_STYLES[query] = style;
        }
        catch (e) {
            console.error(e);
        }
    }
}

//# sourceMappingURL=media-query-factory.js.map
