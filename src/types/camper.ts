export type VehicleForm = 'alcove' | 'panel_van' | 'integrated' | 'semi_integrated';
export type TransmissionType = 'automatic' | 'manual';
export type EngineType = 'diesel' | 'petrol' | 'hybrid' | 'electric';

export type Amenity =
  | 'ac'
  | 'bathroom'
  | 'kitchen'
  | 'tv'
  | 'radio'
  | 'refrigerator'
  | 'microwave'
  | 'gas'
  | 'water';

export type GalleryItem = {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
};

export interface Review {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export type CamperListItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description?: string;
  form: VehicleForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: TransmissionType;
  engine: EngineType;
  amenities: Amenity[];
  coverImage: string;
  totalReviews: number;
};

export type CamperDetail = CamperListItem & {
  description: string;
  gallery: GalleryItem[];
  createdAt: string;
  updatedAt: string;
  reviews?: Review[];
};