/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { UserTrackProgressComponent } from './user-track-progress.component'

describe('UserTrackProgressComponent', () => {
  let component: UserTrackProgressComponent
  let fixture: ComponentFixture<UserTrackProgressComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrackProgressComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrackProgressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
