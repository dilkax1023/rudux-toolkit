import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'c49955b6-ed55-4f78-afe3-97ef3a84ee4e';

interface Breed {
	id: string;
	name: string;
	image: {
		url: string;
	};
}

export const dogsApiSlice = createApi({
	reducerPath: 'dogsApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.thedogapi.com/v1/',
		prepareHeaders(headers) {
			headers.set('x-api-key', API_KEY);
			return headers;
		},
	}),
	endpoints: (builder) => {
		return {
			fetchBreeds: builder.query<Breed[], number | void>({
				query: (limit: number = 10) => {
					return `/breeds?limit=${limit}`;
				},
			}),
		};
	},
});

export const { useFetchBreedsQuery } = dogsApiSlice;
