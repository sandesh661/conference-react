import React from 'react';
import LeftNavBar from './LeftNavBar';
import {userList} from '../utils/userData';

class UserProfile extends React.Component{

    componentDidMount(){
        this.main();
    }

    loadUserProfile = () => {
        fetch('http://35.178.90.181:8000/v1/profile/data/', {
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
            this.displayData(resp)
            localStorage.setItem('profile', JSON.stringify(resp))
        }).catch(console.error)
    }

    displayData = (user) => {
        document.querySelector('#profile-fname').innerHTML = user.first_name
        this.displayUserData()
    }

    displayUserData = () => {
        fetch('http://35.178.90.181:8000/v1/profile/retrieve-profile/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            },
            body: JSON.stringify({
                'user_id': window.location.hash.replace('#',''),
            })
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(user => {
            console.log(user)
            document.querySelector('#profile-fullname').innerHTML = `${user.first_name} ${user.last_name}`
            document.querySelector('#profile-about').innerHTML = user.about
        }).catch(console.error)

    }

    main = () => {
        window.user = localStorage.getItem('profile');      //localStorage.getItem('user')
        if (window.user) {
            window.user = JSON.parse(window.user)
            this.displayData(window.user)
        } else {
            this.loadUserProfile()
        }
    }

    editbio = () => {
        let user = window
        document.querySelector('#profile-about').innerHTML = `<input type="text" id="editedAbout" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="${window.user.about}">`
        document.querySelector('#editbio').classList.add('hidden')
        document.querySelector('#savebio').classList.remove('hidden')
    }

    savebio = () => {
        const editedAbout = document.querySelector('#editedAbout').value
        document.querySelector('#editbio').classList.remove('hidden')
        document.querySelector('#savebio').classList.add('hidden')
        document.querySelector('#profile-about').innerHTML = editedAbout
        fetch('http://35.178.90.181:8000/v1/profile/data/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            },
            body: JSON.stringify({
                about: editedAbout
            })
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            this.displayData(resp)
            window.user = resp
        }).catch(console.error)
    }

    sendConnect = () => {
        fetch('http://35.178.90.181:8000/v1/connections/send-request/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            },
            body: JSON.stringify({
                "partner_id": window.location.hash.replace('#','')
            })
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            document.querySelector('#connectbtn').innerHTML = 'Requested'
            document.querySelector('#connectbtn').classList.add('cursor-not-allowed')
        }).catch(err => {
            document.querySelector('#connectbtn').innerHTML = 'Requested'
            document.querySelector('#connectbtn').classList.add('cursor-not-allowed')
        })
    }

    render(){
        return(
            <div className="w-full max-w-6xl flex justify-center mx-auto">
                <LeftNavBar pageName="userprfile" />
                <div class="h-screen w-10/12 bg-gray-100 p-4">
                    <div class="w-full h-full flex justify-around">
                        <div class="content bg-white w-7/12 p-10">
                            <div class="w-full">
                                <div class="w-full rounded-lg h-40 bg-gray-700">
                                    <img src="" alt="" class="" />
                                </div>
                                <div class="-mt-16 mx-6 flex">
                                    <img src="https://randomuser.me/api/portraits/women/29.jpg" alt="" class="w-32 h-32 bg-gray-800 rounded-full" /> 
                                    <div class="self-end mb-0 mx-6 text-lg font-bold tracking-wide">
                                        <h1 id="profile-fullname"></h1>
                                        <p>
                                            <button onClick={() => this.sendConnect()} id="connectbtn" class="border border-purple-400 text-xs font-semibold text-white bg-purple-600 px-3 py-1 rounded">Connect</button>
                                            <button class="border border-purple-400 text-xs font-semibold px-3 py-1 rounded">Chat</button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4 my-6">
                                <div class="flex justify-between">
                                    <h1 class="font-bold text-xl">Bio</h1>
                                    {/* <button onClick={() => this.editbio()} id="editbio" class="text-blue-400 hover:underline">Edit</button>
                                    <button onClick={() => this.savebio()} id="savebio" class="text-blue-400 hover:underline hidden">Save</button> */}
                                </div>
                                <p id="profile-about" class="text-sm">
                                    
                                </p>
                            </div>

                            {/* <div class="px-4 my-6">
                                <div class="flex justify-between">
                                    <h1 class="font-bold text-xl">Interests</h1>
                                    <a href="#" class=" text-blue-400 hover:underline">Edit</a>
                                </div>
                                <div class="flex my-2">
                                    <div class=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Design</div>
                                    <div class=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Hacking</div>
                                    <div class=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Web Technologies</div>
                                </div>
                            </div> */}

                            {/* <div class="px-4 my-6">
                                <div class="flex justify-between">
                                    <h1 class="font-bold text-xl">Settings</h1>
                                </div>
                                <div class="my-2 w-8/12">
                                    <div class="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span class="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span class="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                    <div class="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span class="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span class="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                    <div class="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span class="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span class="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <div class="right-sidebar bg-white w-4/12 p-6 pt-12">
                            <div class="search my-2">
                                <input 
                                    class="w-full border-gray-300 border-b-2 px-2"
                                    type="text" name="" id="" 
                                    placeholder="Search people"
                                />
                            </div>
                            <div class="my-6">
                                <h2 class="font-semibold">Active Connections</h2>
                                <div id="userList">
                                {userList.map((ele, i) => {return(
                                    <div key={i} className="flex align-middle my-4 leading-relaxed">
                                        <img src={ele.image} alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p className="h-8 leading-loose">{ele.name}</p>
                                    </div>
                                )})}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;