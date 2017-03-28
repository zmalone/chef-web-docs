import {Component, OnInit} from '@angular/core'
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect'
import {ModuleFilterService} from '../../services/module-filter.service'

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
  };

  constructor(private ModuleFilter?: ModuleFilterService) {
  }

  ngOnInit() {
    this.myOptions = this.getTagList()
  }

  public selectFilter() {
    this.ModuleFilter.setTagInfo(this.optionsModel)
  }

  public getTagList() {
    const nodes = document.querySelectorAll('div.module-tile')
    let tagList = []
    let tagOption = []
    if (nodes != null) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].attributes.getNamedItem('data-tags').nodeValue != null) {
          let tags = eval(nodes[i].attributes.getNamedItem('data-tags').nodeValue)
          if (tags != null && tags.length > 0) {
            for (let j = 0; j < tags.length; j++) {
              if (tagList.indexOf(tags[j]) <= -1) {
                tagList.push(tags[j])
                tagOption.push({name: tags[j], id: tags[j]})
              }
            }
          }
        }
      }
    }
    return tagOption

  }


}
