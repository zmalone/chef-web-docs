/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserProgressStampComponent } from './user-progress-stamp.component'

describe('UserProgressStampComponent', () => {
  let component: UserProgressStampComponent
  let fixture: ComponentFixture<UserProgressStampComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgressStampComponent ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressStampComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
