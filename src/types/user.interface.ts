type ProfilePicture = {
  original: string;
  thumbnail: string;
};

export interface IUser {
  user_id: number;
  user_name: string;
  user_type: string;
  email_addresses: string[];
  first_name: string;
  last_name: string;
  profile_picture: ProfilePicture;
}
