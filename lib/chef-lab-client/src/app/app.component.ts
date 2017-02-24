import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './services/user-profile.service';

@Component({
  selector: 'app-root',
  template: (window as any).mainTemplate || '<div>No template found for app-root!</div>'
})
export class AppComponent implements OnInit {
  constructor(private userProfileService:UserProfileService) {}

  ngOnInit() {
    this.userProfileService.load(1)
  }
}
