import axios from 'axios';
import React, { useState } from 'react';

function SearchInput ({e, setResults}) {
    const[search, setSearch] = React.useState('')
    const[error, setError] = React.useState('')
    
    const handleChange = () => {
        e.preventDefault();
        setSearch(e.target.value)
    };
    
    const handleClick = () =>  
        axios.get(`/api/search?q=${search}`)
            .then(({data}) => {
                setResults(data)
            })
            .catch((error) => setError(error.message))

    return <div>
        <input onChange={handleChange} />
        <button onClick={handleClick}>Search</button>
        {Boolean(error) && <>{error}</>}
    </div>
}

export default SearchInput;