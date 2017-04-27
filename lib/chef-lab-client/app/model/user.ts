export class User {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public display_name: string,
    public email: string,
    public nickname: string,
    public role: string,
    public company: string,
    public created_at: string,
    public share_profile: boolean,
    public profile_image_url: string,
    public shared_profile_token: string,
    public bio: string,
  ) {
  }
}
