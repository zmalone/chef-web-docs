import {Directive, ElementRef, OnInit, Input, HostListener, Renderer} from '@angular/core'
import {ModuleFilterService} from '../../services/module-filter.service'

@Directive({
  selector: '.load-module-btn',

})
export class LoadModuleBtnDirective implements OnInit {
  @Input()
  total: number

  constructor(private el?: ElementRef,
              private moduleFilter?: ModuleFilterService,
              private renderer?: Renderer) {
  }

  ngOnInit() {
    this.moduleLoadMoreBtn()
    this.moduleFilter.setModuleDisplayCounter()
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault()
    this.moduleFilter.setModuleDisplayCounter()
    this.moduleFilter.getModuleDisplayCounter().subscribe((moduleCounter) => {
      if (moduleCounter >= this.total) {
        this.hideBtn()
      }
    })
  }

  moduleLoadMoreBtn() {
    const win = (window as any)
    if (win.currentPage.id === 'profile') {
      this.hideBtn()
    }
    this.moduleFilter.getModuleLoadMoreBtnStatus().subscribe((status) => {
      if (!status) {
        this.hideBtn()
      } else {
        this.showBtn()
      }
    })
  }

  hideBtn() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none')
  }

  showBtn() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', '')
  }
}
