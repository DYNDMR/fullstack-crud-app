import api from '../../services/api';
import { useEffect, useState, useRef } from 'react';

import './style.css'
import { FaTrashAlt } from "react-icons/fa";



function Home() {

  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()

  const [users, setUsers] = useState([])

  async function getUsers() {
    const usersFromApi = await api.get('/users')

    setUsers(usersFromApi.data)
  }

  async function createUsers() {
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }

  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers()
  }


  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>user register</h1>
        <input type="text" name='name' placeholder='name' ref={inputName} />
        <input type="number" name='age' placeholder='age' ref={inputAge} />
        <input type="email" name='email' placeholder='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>register</button>
      </form>

      {
        users.map(user => (
          <div key={user.id} className="card">
            <div className="user-info">
              <p><span>name:</span> {user.name}</p>
              <p><span>age:</span> {user.age}</p>
              <p><span>email:</span> {user.email}</p>
            </div>
            <button className="trash-button" type='button' onClick={() => deleteUsers(user.id)}>
              <FaTrashAlt className="trash-icon" />
            </button>
          </div>

        ))
      }

    </div>
  )
}
export default Home
