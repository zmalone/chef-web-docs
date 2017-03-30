import {Component, OnInit} from '@angular/core'
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect'
import {ModuleFilterService} from '../../services/module-filter.service'
interface TagObject { id: string, name: string }

@Component({
  selector: 'module-filter',
  templateUrl: './module-filter.component.html',
})
export class ModuleFilterComponent implements OnInit {
  optionsModel: number[]
  myOptions: IMultiSelectOption[]
  mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: false,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-default',
    selectionLimit: 0,
    closeOnSelect: true,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
  }

  myTexts: IMultiSelectTexts = {
    checkAll: 'Check all',
    uncheckAll: 'Uncheck all',
    checked: 'checked',
    checkedPlural: 'checked',
    searchPlaceholder: 'Search...',
    defaultTitle: 'Filter By',
  }

  constructor(private ModuleFilter?: ModuleFilterService) {
  }

  ngOnInit() {
    this.myOptions = this.getTagList()
  }

  public selectFilter() {
    this.ModuleFilter.setTagInfo(this.optionsModel)
  }

  public getTagList(): Array<TagObject> {
    const nodes = document.querySelectorAll('div.module-tile') || []
    const nodeList = Array.prototype.slice.call(nodes, 0) || []
    return nodeList.map(node => {
      return JSON.parse(node.attributes.getNamedItem('data-tags').nodeValue.replace(/'/g, '"')) || []
    }).reduce((allTags, nodeTags) => {
      return allTags.concat(nodeTags)
    }).filter((tag, index, tags) => {
      return tags.indexOf(tag) === index
    }).sort().map(tag => {
      return { id: tag, name: tag }
    })
  }
}
