import React from 'react';
import axios from 'axios';
export const SearchInput = ({
    setResults
}) => {
    const[search, setSearch] = React.useState('')
    const[error, setError] = React.useState('')
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }
    
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