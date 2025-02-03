import { Logger } from "src/providers/utils/logger.util";
import { baseUrl } from "./definitions/constants";
import { IGeoMetadata } from "./definitions/types";

class GeoService {
  private readonly logger = new Logger(GeoService.name);
  async getGeoMetadata(): Promise<IGeoMetadata> {
    try {
      const url = `${baseUrl}` + "/json";
      const response = await fetch(url);
      const geoMetadata: IGeoMetadata = await response.json();
      return geoMetadata;
    } catch (error) {
      this.logger.error((error as Error).message);
      return {
        status: "success",
        country: "Israel",
        countryCode: "IL",
        region: "TA",
        regionName: "Tel Aviv",
        city: "Tel Aviv",
        zip: "",
        lat: 32.0803,
        lon: 34.7805,
        timezone: "Asia/Jerusalem",
        isp: "BroadBand",
        org: "",
        as: "AS12849 Hot-Net internet services Ltd.",
        query: "5.29.11.212",
      };
    }
  }
}

export default new GeoService();
