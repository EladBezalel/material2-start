import { ElementRef, Renderer } from '@angular/core';
/**
 * Abstract base class for the Layout API styling directives
 */
export declare abstract class BaseStyleDirective {
    private _elRef;
    private _renderer;
    constructor(_elRef: ElementRef, _renderer: Renderer);
    /**
     * Inject inline the flexbox styles specific to this renderer/domEl pair
     */
    protected _updateStyle(source: string | Object, value?: any): void;
}
