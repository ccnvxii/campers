import type { VehicleForm, TransmissionType, EngineType, CamperListItem } from './camper';

export type CamperQueryParams = {
  page?: number;
  perPage?: number;
  location?: string;
  form?: VehicleForm;
  transmission?: TransmissionType;
  engine?: EngineType;
};

export type CampersResponse = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
};

export type AvailableFiltersResponse = {
  forms: VehicleForm[];
  transmissions: TransmissionType[];
  engines: EngineType[];
};