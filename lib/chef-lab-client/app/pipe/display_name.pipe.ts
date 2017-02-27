import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'display_name'
})
export class DisplayNamePipe implements PipeTransform {
  transform(userInfo: any): string {
    let name:any
    if(userInfo) {
      if (userInfo.nickname) {
        name = userInfo.nickname
      } else if (userInfo.name) {
        name = userInfo.name
      } else if (userInfo.email) {
        name = userInfo.email.split('@')[0]
      }
      return name
    }
  }
}
