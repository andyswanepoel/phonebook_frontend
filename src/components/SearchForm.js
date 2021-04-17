import React from 'react';

const SearchForm = (props) => {
	const {searchValue, handleSearchValue} = props;
	return (
		<div>filter shown with: 
        <input 
          type="text" 
          value={searchValue}
          onChange={handleSearchValue}
          />
	</div>
	);
}
 
export default SearchForm;