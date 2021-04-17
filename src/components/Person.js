import React from 'react';

const Person = ({ person, id, deletePerson }) => {
	return (
		<p><strong>{person.name}:</strong> {person.number} &nbsp;&nbsp;
			<button onClick={() => deletePerson(id)}>Delete</button></p>
	);
}
 
export default Person;