import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import "../../styles/navbar.css";


const Logout = () => {
    const { store, actions } = useContext(Context)

    const randomPokemon = Math.floor(Math.random() * 1017) + 1;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`;


    return (
        <div>
            {store?.user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="username" style={{ color: '#ccc', marginLeft: '5px' }}>{store.user.email}</span>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown-toggle" as="div" id="dropdown-basic" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                            <div className="ms-2 avatar-circle" style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                <img src={imageUrl} alt="Avatar" style={{ width: '100%', height: 'auto', backgroundColor: '#ba4ff8' }} />
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align='end' className="avatar-dropdown">
                            <Dropdown.Item>
                                <Link to="/">
                                    <button onClick={actions.logout} className="btn logoutButton">
                                        <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out
                                    </button>
                                </Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}
        </div>
    );
}

export default Logout;
