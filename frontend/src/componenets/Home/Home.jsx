import { NavLink, useNavigate } from 'react-router-dom';
import { FaAirbnb, FaUserCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useEffect, useRef, useState } from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from "../../store/session.js";
import { RiMenuFill } from "react-icons/ri";
import ModalMenu from './ModalMenu.jsx';
import Signup from '../SignUp/Signup.jsx';
import Login from '../Login/Login.jsx';

const Home = ({ isUserRestored }) => {
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const ulRef = useRef();
  
  const changeMenuBar = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  }
  
  const handleNewSpot = () => {
    navigate('/spots/new');
  }
  
  useEffect(() => {
    if (!showDropdown) return;

    const closeDropdown = () => {
      if (!ulRef.current.contains(event.target)) setShowDropdown(false);
    };

    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [showDropdown]);

  const closeDropdown = () => setShowDropdown(false);

  const signout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeDropdown();
    navigate('/');
  }

  const ulStyle = "profile-dropdown" + (showDropdown ? "" : " hidden");
  return (
    <IconContext.Provider value={{ className: 'react-wave-icon' }}>
      <div className='navigation-div'>
        <ul className='navigation-ul'>
          {/* Left side: Logo */}
          <li className='nav-logo'>
            <NavLink to='/' className='navigation-logo' style={{ color: '#ef4000' }}>
              <FaAirbnb size='1.5em' />airbnb
            </NavLink>
          </li>

          {/* Right side: Dropdown */}
          <div>
          {sessionUser ? (
              <button 
                onClick={handleNewSpot}
                className='create-spot-button'
              >
                Create a New Spot
              </button>
            ) : (
              ''
            )}
            {isUserRestored && (
              <li>
                {/* <ProfileButton user={sessionUser} /> */}
                <button className="profile-button" onClick={changeMenuBar}>
                    <RiMenuFill size={22} />
                    <FaUserCircle size={22} />
                </button>
                <ul className={ulStyle} ref={ulRef}>
                    {sessionUser ? (
                    <>
                        <li className="dropdown-text">Hello, {sessionUser.firstName}</li>
                        <li className="dropdown-text">{sessionUser.email}</li>
                        <li className="manage-spot-button" onClick={() => navigate(`/spots/current`)}>
                            Manage Spots
                        </li>
                        <li>
                        <button className="logout-button" onClick={signout}>
                            Log Out
                        </button>
                        </li>
                    </>
                    ) : (
                    <>
                        <ModalMenu
                        itemText="Log In"
                        onItemClick={closeDropdown}
                        modalComponent={<Login />}
                        />
                        <ModalMenu
                        itemText="Sign Up"
                        onItemClick={closeDropdown}
                        modalComponent={<Signup />}
                        />
                    </>
                    )}
                </ul>
              </li>
            )}
          </div>
        </ul>
      </div>
    </IconContext.Provider>
  );
};

export default Home;