import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "onlineShops",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://d5fc2d0ab1b44ccb.mokky.dev/",
  }),
  endpoints: (builder) => ({
    getOnlineShops: builder.query({
      query: () => "carts",
    }),
    addOnlineShop: builder.mutation({
      query: (newProduct) => ({
        url: "carts",
        method: "POST",
        body: newProduct,
      }),
    }),

    deleteOnlineShop: builder.mutation({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
    }),
    // ! patch
    editOnlineShop: builder.mutation({
      query: ({ editOnlineShop, saveIdElement }) => ({
        url: `carts/${saveIdElement}`,
        method: "PATCH",
        body: editOnlineShop,
      }),
    }),
  }),
});
export const {
  useGetOnlineShopsQuery,
  useAddOnlineShopMutation,
  useDeleteOnlineShopMutation,
  useEditOnlineShopMutation,
} = api;
