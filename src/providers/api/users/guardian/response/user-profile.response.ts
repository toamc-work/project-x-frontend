export interface IGuardianStudent {
  readonly uid: string;
  readonly name: string;
  readonly phone: string;
}

export interface IUserProfile {
  readonly uid: string;
  readonly email: string;
  readonly name: string;
  readonly phone: string;
  readonly students: IGuardianStudent[];
}
