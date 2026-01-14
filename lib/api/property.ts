import { buildQuery } from "@/utils/buildQuery";
import client from "./axios";
import { Property } from "@/types";

export const propertyApi = {
  // create: (data: Partial<Property>) => client.post<{ message: string; property: Property }>('/property', data),
  create: (formData: FormData) =>
    client.post<{ message: string; property: Property }>(
      "/property",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    ),
  search: (params?: { type?: string; priceMin?: number; priceMax?: number }) =>
    client.get<{ properties: Property[] }>("/property", { params }),
  getById: (id: string) =>
    client.get<{ property: Property }>(`/property/${id}`),
  update: (id: string, data: Partial<Property>) =>
    client.patch(`/property/${id}`, data),
  delete: (id: string) => client.delete(`/property/${id}`),
  filter: (params: {
  city?: string;
  address?: string;
  propertyType?: string;
  bedrooms?: number;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
}) =>
  client.get<{ properties: Property[] }>(
    `/property/filter?${buildQuery(params)}`
  ),
  uploadImage: (id: string, formData: FormData) => {
    // const formData = new FormData();
    // formData.append('image', file);
    return client.post<{ image: string[] }>(
      `/property/upload-property-images/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
  uploadImages: (formData: FormData) => {
    return client.post<{ images: string[] }>("/upload-images", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  requestInquiry: (
    id: string,
    data: { name: string; email: string; message: string }
  ) => client.post(`/property/${id}/request`, data),
  dealRequest: (id: string, data: { commissionRate: number; terms: string }) =>
    client.post(`/property/${id}/deal-request`, data),
  acceptDeal: (id: string, data: { agentId: string }) =>
    client.post(`/property/${id}/accept-deal`, data),

  // 👇 Get monthly views
  monthlyViews: () =>
    client.get<{ views: any[] }>("/propertyviews/monthly-views"),

  // 👇 New view endpoint
  views: (data: {
    propertyId: string;
    userId: string;
    ipAddress?: string;
    userAgent?: string;
    viewedAt?: string;
  }) =>
    client.post<{ message: string; view: any }>(
      "/propertyviews/public-view",
      data
    ),

};
