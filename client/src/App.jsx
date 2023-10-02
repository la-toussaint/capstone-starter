import Carousel from 'react-spring-3d-carousel';
import React from 'react';
import { SearchInput } from '../components/Search'
import './App.css'

function App() {
    const[results, setResults] = React.useState({})
    const products = results?.data 
      ? results.data.products.map((product, i) => {
        return {
          content: <img src={product.product_photo} alt={`${i+1}`} />,
          key: product.product_title
        }
    })
    : [];

  return (
    <div>
      <SearchInput setResults={setResults} />
        { 
          Boolean(products.length > 0) && 
          <div style={{ height: '400px'}}>
            <Carousel slides={products} showNavigation/>
          </div> 
        }
    </div>
  )
}

export default App
