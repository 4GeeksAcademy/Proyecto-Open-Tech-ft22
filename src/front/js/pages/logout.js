import React, { useContext } from 'react'
import { Context } from "../store/appContext";
import { Link } from 'react-router-dom';


const Logout = () => {
    const { store, actions } = useContext(Context)

    const randomPokemon = Math.floor(Math.random() * 1017) + 1;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomPokemon}.png`;


    return (
        <div>
            {store?.user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/">
                        <button onClick={actions.logout} className="btn submitSalaryNav" style={{ backgroundColor: '#4f89ee', marginRight: '5px' }}>Logout</button>
                    </Link>
                    <span className="username" style={{ color: '#ccc', marginLeft: '5px' }}>{store.user.email}</span>
                    <div className="ms-2" style={{ borderRadius: '50%', overflow: 'hidden', width: '50px', height: '50px' }}>
                        <img src={imageUrl} alt="Avatar" style={{ width: '100%', height: 'auto', backgroundColor: '#ba4ff8' }} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
