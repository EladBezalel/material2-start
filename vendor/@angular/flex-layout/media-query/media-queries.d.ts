import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BreakPoint, BreakPoints } from './break-points';
/**
 * Class instances emitted [to observers] for each mql notification
 */
export declare class MediaQueryChange {
    matches: boolean;
    mqAlias: string;
    suffix: string;
    value: string;
    constructor(matches: boolean, mqAlias: string, suffix?: string, value?: string);
}
export declare class MediaQueries {
    private _zone;
    private _mqls;
    private _breakpoints;
    private _source;
    private _announcer;
    /**
     * Constructor
     */
    constructor(breakpoints: BreakPoints, _zone: NgZone);
    /**
     * Read-only accessor to the list of breakpoints configured in the BreakPoints provider
     */
    readonly breakpoints: Array<BreakPoint>;
    readonly activeOverlaps: Array<BreakPoint>;
    readonly active: BreakPoint;
    /**
     * For the specified mediaQuery alias, is the mediaQuery range active?
     */
    isActive(alias: string): boolean;
    /**
     * External observers can watch for all (or a specific) mql changes.
     * Typically used by the MediaQueryAdaptor; optionally available to components
     * use the MediaQueries as $mdMedia service
     */
    observe(alias?: string): Observable<MediaQueryChange>;
    /**
     * Based on the BreakPoints provider, register internal listeners for the specified ranges
     */
    private prepareWatchers(ranges);
    /**
     * On each mlq event, emit a special MediaQueryChange to all subscribers
     */
    private onMQLEvent(breakpoint, mql);
}
