import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from "../utils/userData";

const LeftNavBar = (props) => {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [profileId, setProfileId] = useState('')

    useEffect(() => {
        loadUserProfile()
        let user = localStorage.getItem('profile')
        if (user) {
            user = JSON.parse(user)
            setFname(user.first_name)
            setLname(user.last_name)
            setProfileId(user.user_id)
        }
    }, [fname])

    const loadUserProfile = () => {
        fetch(baseUrl + 'v1/profile/data/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            }
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            window.user = resp;
            localStorage.setItem('profile', JSON.stringify(resp))
            setFname(resp.first_name)
        }).catch(console.error)
    }

    const logout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    return (
        <div className="h-screen w-2/12 text-center pt-6">
            <div className="logo w-full text-center my-6">LOGO</div>
            <img src="https://randomuser.me/api/portraits/women/29.jpg" className="profile-pic bg-gray-700 w-24 h-24 rounded-full mx-auto" />
            <Link to="/profile" id="profile-fname" className="block leftNavBar name w-full text-purple-900 font-bold tracking-wide py-2 py-2">{fname}</Link>
            <div className="links w-full text-center text-center mt-6 border-t border-gray-100 text-gray-500">
                <Link to="/discover" className={(props.pageName == "discover" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Discover</Link>
                <Link to="/home" className={(props.pageName == "home" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Home</Link>
                <Link to="/profile" className={(props.pageName == "profile" || props.pageName == "userprofile" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Profile</Link>
                <Link to="/messages" className={(props.pageName == "message" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Messages</Link>
                <Link to="/notifications" className={(props.pageName == "notification" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Notifications</Link>
                <button onClick={() => logout()} className="tex-center w-full block leftNavBar link my-2">Logout</button>
            </div>
        </div>
    )
}

export default LeftNavBar;