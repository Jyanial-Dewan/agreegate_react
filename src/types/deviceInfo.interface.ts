export interface IDevice {
  browserName?: string;
  browserVersion?: string;
  browserType?: string;
  cpuArchitecture?: string;
  deviceType?: string;
  deviceModel?: string;
  deviceVendor?: string;
  engineName?: string;
  engineVersion?: string;
  osName?: string;
  osVersion?: string;
  userAgent?: string;
  ipAddress?: string;
  zip?: string;
  timezone?: string;
  regionName?: string;
  region?: string;
  ipOrg?: string;
  countryCode?: string;
  country?: string;
  city?: string;
  autonomusSystem?: string;
}

export interface IDeviceLocation {
  latitude: number;
  longitude: number;
}
