import { Directive, OnInit, ElementRef, HostListener, Host, Input } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Directive({
  selector: '.user-start-btn'
})
export class UserStartBtnDirective implements OnInit {
  @Input()
  href: string

  @Input()
  module: string

  constructor(private userProfileService?: UserProfileService, private el?: ElementRef) {
    this.el = el
  }

  ngOnInit() {
    this.userProfileService.activeUserProfile.subscribe((active) => {
      const progress: number = (active && active.modules[this.module]) ? active.modules[this.module].progress : 0
      if (progress === 100) {
        this.el.nativeElement.innerHTML = 'Revisit'
      } else if (progress > 0) {
        this.el.nativeElement.innerHTML = 'Continue'
      } else {
        this.el.nativeElement.innerHTML = 'Start'
      }
    })
  }

  @HostListener('click', ['$event'])
  clicked(e) {
    e.preventDefault();
    // TODO: Preventing the default and then going to the default makes no sense!
    // But here's how we can alter the destination if needed.
    window.location.href = this.href
  }
}
