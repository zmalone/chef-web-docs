"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModuleDisplayDirective = (function () {
    function ModuleDisplayDirective(el, moduleFilter, progressService, renderer) {
        this.el = el;
        this.moduleFilter = moduleFilter;
        this.progressService = progressService;
        this.renderer = renderer;
    }
    ModuleDisplayDirective.prototype.ngOnInit = function () {
        var win = window;
        if (win.currentPage.id !== 'profile') {
            this.filterModulesByTags();
        }
        else {
            this.showUserModuleProgress();
        }
    };
    ModuleDisplayDirective.prototype.showUserModuleProgress = function () {
        var _this = this;
        this.progressService.activeUserProgress.subscribe(function (active) {
            var obj = _this.progressService.getLastStarted('modules', _this.module);
            if (obj.id) {
                _this.renderer.setElementStyle(_this.el.nativeElement, 'display', '');
            }
            else {
                _this.renderer.setElementStyle(_this.el.nativeElement, 'display', 'none');
            }
        });
    };
    ModuleDisplayDirective.prototype.filterModulesByTags = function () {
        var _this = this;
        this.moduleFilter.getTagInfo().subscribe(function (tags) {
            var found = _this.el.nativeElement.attributes.class.nodeValue.indexOf(tags.join(' '));
            if (found > -1) {
                _this.renderer.setElementStyle(_this.el.nativeElement, 'display', '');
            }
            else {
                _this.renderer.setElementStyle(_this.el.nativeElement, 'display', 'none');
            }
        });
    };
    __decorate([
        core_1.Input()
    ], ModuleDisplayDirective.prototype, "module", void 0);
    ModuleDisplayDirective = __decorate([
        core_1.Directive({
            selector: '.module-display',
        })
    ], ModuleDisplayDirective);
    return ModuleDisplayDirective;
}());
exports.ModuleDisplayDirective = ModuleDisplayDirective;
