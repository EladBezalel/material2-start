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
import { NgModule } from '@angular/core';
import { MediaQueriesModule } from '../media-query/media-query-module';
import { FlexAlignDirective, FlexDirective, FlexFillDirective, FlexOffsetDirective, FlexOrderDirective } from './api/flex';
import { LayoutAlignDirective, LayoutDirective, LayoutWrapDirective } from './api/layout';
import { HideDirective, ShowDirective } from './api/show-hide';
import { MediaQueryAdapter } from './media-query/media-query-adapter';
var ALL_DIRECTIVES = [
    LayoutDirective, LayoutWrapDirective, LayoutAlignDirective, FlexDirective, FlexOrderDirective,
    FlexOffsetDirective, FlexFillDirective, FlexAlignDirective, ShowDirective, HideDirective
];
/**
 *
 */
export var FlexLayoutModule = (function () {
    function FlexLayoutModule() {
    }
    FlexLayoutModule.forRoot = function () {
        return { ngModule: FlexLayoutModule, providers: [MediaQueryAdapter] };
    };
    FlexLayoutModule = __decorate([
        NgModule({
            declarations: ALL_DIRECTIVES,
            imports: [MediaQueriesModule],
            exports: [MediaQueriesModule].concat(ALL_DIRECTIVES),
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], FlexLayoutModule);
    return FlexLayoutModule;
}());

//# sourceMappingURL=flexbox-module.js.map
