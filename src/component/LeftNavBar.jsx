import React from 'react';
import { Link } from 'react-router-dom';

class LeftNavBar extends React.Component{
    constructor(props){
        super(props)
    }
    logout() {
        localStorage.clear();
    }
    render(){
        return(
            <div className="h-screen w-2/12 text-center pt-6">
                <div className="logo w-full text-center my-6">LOGO</div>
                <img src="https://randomuser.me/api/portraits/women/29.jpg" className="profile-pic bg-gray-700 w-24 h-24 rounded-full mx-auto" />
                <Link to="./profile" id="profile-fname" className="block leftNavBar name w-full text-purple-900 font-bold tracking-wide py-2 py-2"></Link>
                <div className="links w-full text-center text-center mt-6 border-t border-gray-100 text-gray-500">
                    <Link to="./discover" className={(this.props.pageName == "discover" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Discover</Link>
                    <Link to="./home" className={(this.props.pageName == "home" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Home</Link>
                    <Link to="./profile" className={(this.props.pageName == "profile" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Profile</Link>
                    <Link to="./messages" className={(this.props.pageName == "message" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Messages</Link>
                    <Link to="./notifications" className={(this.props.pageName == "notification" ? "  border-l-4 border-purple-800 bg-purple-200 text-purple-800 py-2 " : "link py-2 " ) + "block leftNavBar"}>Notifications</Link>
                    <Link to="./">
                        <button onClick={() => this.logout()} className="tex-center w-full block leftNavBar link my-2">Logout</button>
                    </Link>
                </div>
            </div>
        )
    }
}

export default LeftNavBar;