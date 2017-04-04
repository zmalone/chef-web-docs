import { User } from './user'
import { Progress } from './progress'

export class UserInfo {
  constructor(
      public profile: User,
      public progress: Progress,
  ) {
  }
}
