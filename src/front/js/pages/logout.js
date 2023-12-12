import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import "../../styles/navbar.css";
import { useTranslation } from 'react-i18next';


const Logout = () => {
    const { store, actions } = useContext(Context)
    const { t } = useTranslation();

    const randomPokemon = Math.floor(Math.random() * 1017) + 1;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`;


    return (
        <div>
            {store?.user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="username email-navbar" style={{ color: '#ccc', marginLeft: '5px' }}>{store.user.email}</span>
                    <Dropdown>
                        <Dropdown.Toggle className="dropdown-toggle" as="div" id="dropdown-basic" style={{ backgroundColor: 'transparent', borderColor: 'transparent' }}>
                            <div className="ms-2 avatar-circle" style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                                <img src={imageUrl} alt="Avatar" style={{ width: '100%', height: 'auto', backgroundColor: '#ba4ff8' }} />
                            </div>
                        </Dropdown.Toggle>

                        <Dropdown.Menu align='end' className="avatar-dropdown">
                            <Dropdown.Item>
                                <Link to="/">
                                    <Dropdown.Item as="div">
                                        <button onClick={actions.logout} className="btn logoutButton">
                                            <i className="fa-solid fa-arrow-right-from-bracket"></i> {t('Sign out')}
                                        </button>
                                    </Dropdown.Item>
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
