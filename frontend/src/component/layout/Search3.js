import React, { useState } from 'react'

const Search3 = ({history}) => {

    const [keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
            history.push(`/search3/${keyword}`)
        } else {
            history.push('/')
        }
    }


    return (
        <form onSubmit={searchHandler} className="search_Thiran">
            <div>
                <input
                    type="text"
                    id="inventory_search_field"
                    placeholder="Enter keyword..."
                    onChange={(e) => setKeyword(e.target.value)}
                    className="searchBox_Thiran"
                />
            </div>
            <div>
                <button id="search_button">
                    <i aria-hidden="true"> Search </i>
                </button>
            </div>
        </form>
    )
}

export default Search3;
