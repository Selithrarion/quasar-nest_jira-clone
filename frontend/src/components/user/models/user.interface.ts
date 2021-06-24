export interface UserInterface {
  readonly id: number;
  name: string;
  email: string;
  locale: string;
  isActive: boolean;
  avatarURLs: AvatarSizesInterface;
}

export interface AvatarSizesInterface {
  x16: string;
  x24: string;
  x32: string;
  x48: string;
}
