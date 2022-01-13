import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Contact } from '../models/contact.model';

export const contactsApi = createApi({
    // hooks for the reducer path
    reducerPath: "contactsApi",
    
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
    endpoints:(builder) => ({
        // Since we don't pass any parameter, we pass down 'void'
        contacts: builder.query<Contact[], void>({
            query: () => '/contacts'
        }),
        contact: builder.query<Contact, string>({
            query: (id) => `/contacts/${id}`
        }),
        addContact: builder.mutation<void, Contact>({ 
            query: contact => ({ 
                url: '/contacts',
                method: "POST",
                body: contact
            })
        }),
        updateContact: builder.mutation<void, Contact>({ 
            query: ({ id, ...rest }) => ({ 
                url: `/contacts/${id}`,
                method: "PUT",
                body: rest
            })
        }),
        // we just need ID to pass for deletion
        deleteContact: builder.mutation<void, string>({ 
            query: (id ) => ({ 
                url: `/contacts/${id}`,
                method: "DELETE",
            })
        }),
    })
})

export const { useContactsQuery, useContactQuery, useAddContactMutation, 
              useUpdateContactMutation, useDeleteContactMutation } = contactsApi;

//export const { use "Contacts" Query, useContactQuery } = contactsApi;
// Matches the name with endpoints
