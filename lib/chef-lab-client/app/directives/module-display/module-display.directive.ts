import { Directive, ElementRef, OnInit, Input, Renderer } from '@angular/core'
import { ModuleFilterService } from '../../services/module-filter.service'
import { ProgressService } from '../../services/progress.service'

@Directive({
  selector: '.module-display',
})
export class ModuleDisplayDirective implements OnInit {
  @Input()
  module: string

  @Input()
  order: number

  @Input()
  moduleProgressStatus: boolean

  constructor(
    private el?: ElementRef,
    private moduleFilter?: ModuleFilterService,
    private progressService?: ProgressService,
    private renderer?: Renderer,
  ) {
  }

  ngOnInit() {
    if (this.moduleProgressStatus) {
      this.showUserModuleProgress()
    } else {
      this.filterModulesByTags()
      this.showDefaultModules()
    }
  }

  showUserModuleProgress() {
    this.progressService.activeUserProgress.subscribe((active) => {
      if (this.progressService.isStarted('modules', this.module)) {
        this.showModule()
      } else {
        this.hideModule()
      }
    })
  }

  filterModulesByTags() {
    this.moduleFilter.getTagInfo().subscribe((tags) => {
      if (tags.length > 0) {
        this.moduleFilter.setModuleBtnStatus(false)
        const moduleTags = this.el.nativeElement.attributes.class.nodeValue.split(' ')
        if (this.commonTags([tags, moduleTags]).length > 0) {
          this.showModule()
        } else {
          this.hideModule()
        }
      } else {
        this.moduleFilter.setModuleCounter(0)
        this.moduleFilter.setModuleDisplayCounter()
        this.showDefaultModules()
        this.moduleFilter.setModuleBtnStatus(true)
      }
    })
  }

  showDefaultModules() {
    this.moduleFilter.getModuleDisplayCounter().subscribe((moduleCounter) => {

      if (this.order < moduleCounter) {
        this.showModule()
      } else {
        this.hideModule()
      }
    })

  }

  hideModule() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', 'none')
  }

  showModule() {
    this.renderer.setElementStyle(this.el.nativeElement, 'display', '')
  }

  commonTags(arg = []) {
    return Array.from(arg).reduce((previous, current) => {
      return previous.filter(element => {
        return current.indexOf(element) > -1
      })
    })
  }

}
