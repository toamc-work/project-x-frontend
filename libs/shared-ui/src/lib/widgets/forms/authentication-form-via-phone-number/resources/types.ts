import { RegionCode } from 'google-libphonenumber';

export interface IInitialValues {
  phone: string;
}

export interface Props {
  submit: (dto: IInitialValues) => Promise<void>;
  regionCode: RegionCode;
  error: boolean;
  message: string | undefined;
  defaultPhone?: string;
  btnTxt?: string;
}
