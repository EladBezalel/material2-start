import { BreakPoints } from './break-points';
import { MediaQueries } from './media-queries';
/**
 * *****************************************************************
 * Define module for the MediaQuery API
 * *****************************************************************
 */
export declare class MediaQueriesModule {
    static forRoot(): {
        ngModule: typeof MediaQueriesModule;
        providers: (typeof BreakPoints | typeof MediaQueries)[];
    };
}
