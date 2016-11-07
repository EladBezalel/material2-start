import { Directive, NgZone } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BreakPoints } from '../../media-query/break-points';
import { MediaQueryActivation } from './media-query-activation';
export declare type SubscriptionList = Array<Subscription>;
/**
 *  Adapter between Layout API directives and the MediaQueries mdl service
 *
 *  Using this adapter encapsulates most of the complexity of mql subscriptions
 *  and insures lean integration-code in the Layout directives
 *
 */
export declare class MediaQueryAdapter {
    private _breakpoints;
    private _mq;
    /**
     *
     */
    constructor(_breakpoints: BreakPoints, zone: NgZone);
    /**
     * Create a custom MQ Activation instance for each directive instance; the activation object
     * tracks the current mq-activated input and manages the calls to the directive's
     * `onMediaQueryChanges( )`
     */
    attach(directive: Directive, property: string, defaultVal: string | number): MediaQueryActivation;
    /**
     *
     */
    private _linkOnMediaChanges(directive, property);
    /**
     *
     */
    private _listenOnDestroy(directive, subscribers);
    /**
     * Build mediaQuery key-hashmap; only for the directive properties that are actually defined
     */
    private _buildRegistryMap(directive, key);
    /**
     * For each API property, register a callback to `onMediaQueryChanges( )`(e:MediaQueryEvent)
     * Cache 1..n subscriptions for internal auto-unsubscribes during the directive ngOnDestory()
     * notification
     */
    private _configureChangeObservers(directive, keys, subscriber);
    /**
     * Is the current activation event different from the last activation event ?
     *
     * !! change events may arrive out-of-order (activate before deactivate)
     *    so make sure the deactivate is used ONLY when the keys match
     *    (since a different activate may be in use)
     *
     */
    private _isDifferentChange(previous, current);
}
