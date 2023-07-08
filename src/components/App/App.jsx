import React, { useEffect, useState } from 'react';
import shortid from 'shortid';
import { Phonebook, ContactsTitle } from './App.styled';

import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(
    () => localStorage.setItem('contacts', JSON.stringify(contacts)),
    [contacts]
  );

  const containsContact = findName => {
    return contacts.find(({ name }) => name === findName);
  };

  const addContact = (name, number) => {
    const existingContact = containsContact(name);
    const contact = { id: shortid.generate(), name, number };

    existingContact
      ? alert(`${name} is already in contacts`)
      : setContacts(prev => [...prev, contact]);
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Phonebook>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter
        onChangeFilter={event => setFilter(event.currentTarget.value)}
        value={filter}
      />
      <ContactList
        filtred={getVisibleContacts()}
        contacts={contacts}
        onDeleteContact={deleteContact}
      />
    </Phonebook>
  );
};
