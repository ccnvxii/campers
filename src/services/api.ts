import axios from 'axios';
import type { CamperListItem, CamperDetail } from '@/types/camper';
import type { Review } from '@/types/review';
import type { CamperQueryParams, CampersResponse, AvailableFiltersResponse } from '@/types/filter';
import type { BookingRequest, BookingResponse } from '@/types/booking';

const api = axios.create({
  baseURL: 'https://campers-api.goit.study',
});

export const fetchCampers = async (params?: CamperQueryParams): Promise<CampersResponse> => {
  const { data } = await api.get<CampersResponse>('/campers', { params });
  return data;
};

export const fetchFilters = async (): Promise<AvailableFiltersResponse> => {
  const { data } = await api.get<AvailableFiltersResponse>('/campers/filters');
  return data;
};

export const fetchCamperById = async (camperId: string): Promise<CamperDetail> => {
  const { data } = await api.get<CamperDetail>(`/campers/${camperId}`);
  return data;
};
export const fetchCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

export const createBookingRequest = async (
  camperId: string,
  bookingData: BookingRequest
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    bookingData
  );
  return data;
};