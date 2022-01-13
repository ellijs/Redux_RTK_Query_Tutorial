import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
    // hooks for the reducer path
    reducerPath: "contactsApi",
    
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
    
    // auto-refetch based on tagtypes
    tagTypes: ['Contact'], // type can be string, obj or callback
    
    endpoints:(builder) => ({
        // Since we don't pass any parameter, we pass down 'void'
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts',
            provideTags: ['Contact'].  // we need to provide tags if we need to use query
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`,
            provideTags: ['Contact']
        }),
        addContact: builder.mutation<void, Contact>({ 
            query: contact => ({ 
                url: '/contacts',
                method: "POST",
                body: contact
            }),
            invalidatesTags: ['Contact']  // but for the mutation we need to give INVALID tags
        }),
        updateContact: builder.mutation<void, Contact>({ 
            query: ({ id, ...rest }) => ({ 
                url: `/contacts/${id}`,
                method: "PUT",
                body: rest
            }),
            invalidatesTags: ['Contact'] 
        }),
        // we just need ID to pass for deletion
        deleteContact: builder.mutation<void, string>({ 
            query: (id ) => ({ 
                url: `/contacts/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Contact'] 
        }),
    })
})

export const { useContactsQuery, useContactQuery, useAddContactMutation, 
              useUpdateContactMutation, useDeleteContactMutation } = contactsApi;

//export const { use "Contacts" Query, useContactQuery } = contactsApi;
// Matches the name with endpoints
