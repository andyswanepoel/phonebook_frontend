import React from 'react';

const PersonForm = (props) => {
  const {handleAddPerson, handleNewName, newName, handleNewNumber, newNumber} = props;
	return (
		<form onSubmit={handleAddPerson}>
        <div>
          name: 
            <input required
              type="text"
              value={newName}
              onChange={handleNewName}/>
        </div>
        <div>
          number: 
            <input required
              type="text"
              value={newNumber}
              onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
	);
}
 
export default PersonForm;