import React from 'react'
import Cat from './Cat.js'

function Cats(props) {
  const { cats, handleDelete, handleUpdate,  } = props
    return (
      <div>
        {cats.map(cat => <Cat key={cat.id} cat={cat}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        />)}
      </div>
    )
}

export default Cats
