import React from 'react';
import Person from './Person';

const Persons = ({ persons, deletePerson }) => {
	return (
		persons.map(person => {
			return <Person key={person.name} person={person} id={person.id} deletePerson={deletePerson}/>
		  })
	);
}
 
export default Persons;