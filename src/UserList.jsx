import './App.css'
import React, {useState, useEffect} from 'react'
import UserService from './services/User'
import UserAdd from './UserAdd'
import UserEdit from './UserEdit'

const UserList = ({setMessage, setIsPositive, setShowMessage}) => {

// Komponentin tilojen ja sitä muuttavien set metodien määritys, sekä alustaminen.
const [users, setUsers] = useState([])
const [lisäystila, setLisäystila] = useState(false)
const [muokkaustila, setMuokkaustila] = useState(false)
const [reload, reloadNow] = useState(false)
const [muokattavaUser, setMuokattavaUser] = useState(false)
const [search, setSearch] = useState("")
const [accessLevel, setAccessLevel] = useState (null)

// UseEffect ajetaan aina alussa kerran
useEffect(() => {

  const token = localStorage.getItem('token')
  const storedAccessLevel = localStorage.getItem('accesslevelId');// Tallenna accessLevelID tokenin yhteydessä
   

  if (storedAccessLevel) {
    setAccessLevel(Number(storedAccessLevel));
  }

            UserService
            .setToken(token)

  UserService.getAll()
  .then(data => {
    setUsers(data)
        })
    },[lisäystila, reload, muokkaustila] // Nämä statet jos muuttuu niin useEffect() ajetaan uudestaan
  )

  //Hakukentän onChange tapahtumankäsittelijä
const handleSearchInputChange = (event) => {
    setSearch(event.target.value.toLowerCase())
}

const editUsers = (user) => {
  setMuokattavaUser(user)
  setMuokkaustila(true)
}

const deleteUser = (user) => {
    if (window.confirm('Haluatko varmasti poistaa käyttäjän?')) {
        UserService.remove(user.userId)
        .then(() => {
          setIsPositive(true);
          setMessage("Käyttäjä poistettu onnistuneesti");
          setShowMessage(true);
          reloadNow(!reload); // pakota uusi haku
        })
        .catch(error => {
          setIsPositive(false);
          setMessage("Poistossa tapahtui virhe");
          setShowMessage(true);
        });
    }
  };

if (accessLevel === null) {
    return <p>Ladataan käyttäjätietoja...</p>;
  }

if (accessLevel !== 2) {
    return <p>Sinulla ei ole oikeuksia nähdä käyttäjiä. Tarkasta Kirjautumistiedot!</p>;
  }

  return (
        <>
            <h1><nobr>Users</nobr>

            {lisäystila && <UserAdd setLisäystila={setLisäystila} 
            setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage} />}

            {!lisäystila && <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button>}</h1>

            {!lisäystila && !muokkaustila &&
            <input placeholder="Search by Last Name" value={search} onChange={handleSearchInputChange} />
            }

{muokkaustila && (
  <UserEdit
    user={muokattavaUser}
    setMuokkaustila={setMuokkaustila}
    setIsPositive={setIsPositive}
    setMessage={setMessage}
    setShowMessage={setShowMessage}
    reloadNow={reloadNow}
  />
)}


            
            {!lisäystila && !muokkaustila &&
            <table id="userTable">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Accesslevel</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>


                
                {users && users.map(u =>
                {
                    const lowerCaseName = u.lastName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return(
                            <tr key={u.userId}>
                                <td>{u.firstName}</td>
                                <td>{u.lastName}</td>
                                <td>{u.email}</td>
                                <td>{u.accesslevelId}</td>
                                <td>
                                <button onClick={() => editUsers(u)}>Edit</button>
                                <button onClick={() => deleteUser(u.userId)}>Delete</button>
                                </td>
                            </tr>
                            
                                )
                            }
                        }
                    )
                }

                </tbody>

            </table>
            }
         </>
        )
    }

export default UserList