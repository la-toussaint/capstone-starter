import React from 'react';
import axios from 'axios';

export const SearchInput = () => {
    const[search, setSearch] = React.useState('')
    const[results, setResults] = React.useState(null)
    console.log('results: ', results);
    
    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleClick = () =>  axios.get(`/api/search?q=${search}`).then(({ data }) => setResults(data)).catch(console.error)

    return <div>
        <input onChange={handleChange}/>
        <button onClick={handleClick}>Search</button>
         {Boolean(results) && JSON.stringify(results)}
    </div>
}