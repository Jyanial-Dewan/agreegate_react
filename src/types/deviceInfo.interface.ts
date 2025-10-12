export interface IClientInfo {
  device_id?: number;
  browser_name?: string;
  browser_version?: string;
  browser_type?: string;
  cpu_architecture?: string;
  device_type?: string;
  device_model?: string;
  device_vendor?: string;
  engine_name?: string;
  engine_version?: string;
  os_name?: string;
  os_version?: string;
  user_agent?: string;
  ip_address?: string;
  zip?: string;
  timezone?: string;
  region_name?: string;
  region?: string;
  ip_org?: string;
  country_code?: string;
  country?: string;
  city?: string;
  autonomus_system?: string;
  is_active: boolean;
}

export interface IClientLocationInfo {
  connection_id?: string;
  latitude: number;
  longitude: number;
  connection_time?: Date;
  disconnection_time?: Date;
}
