import { Subject, Observable } from 'rxjs'
import {Config} from '../config/config'

export class ModuleFilterService {

  private tagInfo
  private filterTag = new Subject<number[]>()
  private moduleCnt: number
  private moduleCounter = new Subject<number>()
  private showModuleBtn: boolean
  private loadMoreBtnStatus = new Subject<boolean>()

  constructor() {
    this.moduleCnt = 0
    this.showModuleBtn = true
  }
  getTagInfo(): Observable<number[]> {
    return this.filterTag.asObservable()
  }

  setTagInfo(tagInfo: number[]) {
    this.tagInfo = tagInfo
    this.filterTag.next(this.tagInfo)
  }

  setModuleDisplayCounter() {
    this.moduleCnt = this.moduleCnt + Config.SHOW_MODULES
    this.moduleCounter.next(this.moduleCnt)
  }

  setModuleCounter(counter) {
    this.moduleCnt = counter
  }

  getModuleDisplayCounter(): Observable<number> {
    return this.moduleCounter.asObservable()
  }

  setModuleBtnStatus(status) {
    this.showModuleBtn = status
    this.loadMoreBtnStatus.next(this.showModuleBtn)
  }

  getModuleLoadMoreBtnStatus(): Observable<boolean> {
    return this.loadMoreBtnStatus.asObservable()
  }
}
