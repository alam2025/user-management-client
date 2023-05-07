import { useEffect, useState } from 'react'

import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data)
      })
  }, [])



  const handleForm = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;

    const user = { name, email }
    console.log(user);

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const newUsers = [...users, data];
        setUsers(newUsers)
        form.reset()
      })
  }
  return (
    <>

      <h1>User Management System</h1>


      <form onSubmit={handleForm}>
        <input type="text" name="name" id="" /><br />
        <input type="email" name="email" id="" /><br />
        <input type="submit" value="Submit" />
      </form>

      <div>
        {
          users.map(user => <p key={user.id}> {user.id} : {user.name}: {user.email} </p>)
        }
      </div>


    </>
  )
}

export default App
