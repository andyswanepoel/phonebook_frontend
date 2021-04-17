import React, { useState, useEffect } from 'react';
import Persons from './Persons';
import PersonForm from './PersonForm';
import SearchForm from './SearchForm';
import Notification from './Notification';
import phoneService from '../services/phonebook';
import '../style.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    phoneService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons);
      })
  }, [])

  const createMessage = (message, type) => {
    setNotification(message);
    setNotificationType(type);
    setTimeout(() => {
      setNotification(null);
      setNotificationType(null);
    }, 3500);
  }

  const handleNewName = function (e) {
    setNewName(e.target.value);
  }

  const handleNewNumber = function (e) {
    setNewNumber(e.target.value);
  }

  const handleAddPerson = function (e) {
    e.preventDefault();

    const name = newName.trim();
    const number = newNumber.trim();
    const newPerson = { name, number }

    // Check if person already exists
    if (persons.map(person => person.name).includes(name)) {
      if (window.confirm(`${name} is already added to the phonebook. Replace the existing number with a new one?`)) {
        const id = persons.filter(person => person.name === name)[0].id;
        phoneService
          .update(id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id != id ? person : returnedPerson));
            setNewName('');
            setNewNumber('');
            createMessage(`${name}'s phone number was updated!`, "success");
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== id));
            createMessage(`${name} was already deleted from the database.`, "error");
            setNewName('');
            setNewNumber('');
          })
      }
    } else {  
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          createMessage(`${name}'s phone number was added!`, "success");
        })
    }

  }

  const deletePerson = (id) => {
    const personName = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${personName}?`)) {
      phoneService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        createMessage(`${personName} was delete!`, "error");
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        createMessage(`${personName} was already deleted from the database.`, "error");
      })
    }
  }

  const handleSearchValue = function (e) {
    setSearchValue(e.target.value);
  }

  const filteredNames = persons.filter(person => {
    return person.name.toLowerCase().includes(searchValue.trim().toLowerCase());
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} type={notificationType}/>
      <h2>Search</h2>
      <SearchForm
        searchValue={searchValue}
        handleSearchValue={handleSearchValue}
      />
      <h2>Add a new number</h2>
      <PersonForm
        handleAddPerson={handleAddPerson}
        handleNewName={handleNewName}
        newName={newName}
        handleNewNumber={handleNewNumber}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredNames} deletePerson={deletePerson}/>
    </div>
  )
}

export default App