import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
}

export interface DashboardMetrics {
  salesSummary: SalesSummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics"],
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query<DashboardMetrics, void>({
      query: () => `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/fatura/sales-summary`,  
      providesTags: ["DashboardMetrics"],
    }),
  }),
});


export const {
  useGetDashboardMetricsQuery,
} = api;

