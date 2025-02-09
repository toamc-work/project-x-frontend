import { Logger } from '@factories';

const logger = new Logger('getGeoMetadata');

export interface IFetchGeoLocationResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

export const fetchGeoLocation =
  async (): Promise<IFetchGeoLocationResponse> => {
    try {
      const url = 'http://ip-api.com/json';
      const response = await fetch(url);
      const geoMetadata: IFetchGeoLocationResponse = await response.json();
      return geoMetadata;
    } catch (error) {
      logger.error((error as Error).message);
      return {
        status: 'success',
        country: 'Israel',
        countryCode: 'IL',
        region: 'TA',
        regionName: 'Tel Aviv',
        city: 'Tel Aviv',
        zip: '',
        lat: 32.0803,
        lon: 34.7805,
        timezone: 'Asia/Jerusalem',
        isp: 'BroadBand',
        org: '',
        as: 'AS12849 Hot-Net internet services Ltd.',
        query: '5.29.11.212',
      };
    }
  };
