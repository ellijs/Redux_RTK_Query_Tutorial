import React from 'react';
import './App.css';
import { useContactsQuery, 
        useContactQuery, 
        useAddContactMutation, 
        useUpdateContactMutation, 
        useDeleteContactMutation 
 } from './services/contactsApi';

function App() {
  const { data, error, isLoading, isFetching,isSuccess } = useContactsQuery();
  console.log(data);
  return (
    <div className="App">
      <h1>React Redux Toolkit RTK Query Tutorial</h1>
      {isLoading && <h2>...Loading</h2>}
      {isFetching && <h2>...isFetching</h2>}
      {error && <h2>Something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map(contact => {
            return <div className="data" key={contact.id}>
              <span>{contact.name}</span>
              <span><ContactDetail id={ contact.id} /></span>
            </div>
          })}
        </div>
      )}
      <AddContact />
    </div>
  );
}

export const ContactDetail = ({ id }:{id:string}) => {
  const { data } = useContactQuery(id);
  return (
    <pre>{ JSON.stringify(data, undefined, 2)}</pre>
  )
}

// 
export const AddContact = () => {
  
  const [ addContact ] = useAddContactMutation();
  const [ updateContact ] = useUpdateContactMutation();
  const [ deleteContact ] = useDeleteContactMutation();
  
  // Retreive newData from data without refreshing manually
  const { refetch } = useContactsQuery();
  
  const contact = { 
    "id": "3",
    "name" : "Jess",
    "email": "jess@gmail.com"
  }
   const contactUpdate = { 
    "id": "3",
    "name" : "Jess Updated",
    "email": "jess@gmail.com"
  }
   
  const addHandler = async() => {
    await addContact(contact)
    // automatically refetches
    refetch()
  }
    const updateHandler = async() => {
    await updateContact(contactUpdate)
    // automatically refetches
    refetch()
  }
      const deleteHandler = async() => {
    await deleteContact(contact.id). // we only need to pass ID
    // automatically refetches
    refetch()
  }
  return ( 
    <>
      <button onClick={addHandler}>Add Contact </button>
      <button onClick={updateHandler}>Add Contact </button>
      <button onClick={deleteHandler}>Add Contact </button>
    </>
  )
}

export default App;
