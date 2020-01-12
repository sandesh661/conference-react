import React from 'react';
import LeftNavBar from './LeftNavBar';
import {userList} from '../utils/userData';

class UserProfile extends React.Component{
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
                                            <button onclick="sendConnect()" id="connectbtn" class="border border-purple-400 text-xs font-semibold text-white bg-purple-600 px-3 py-1 rounded">Connect</button>
                                            <button class="border border-purple-400 text-xs font-semibold px-3 py-1 rounded">Chat</button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="px-4 my-6">
                                <div class="flex justify-between">
                                    <h1 class="font-bold text-xl">Bio</h1>
                                    {/* <button onclick="editbio()" id="editbio" class="text-blue-400 hover:underline">Edit</button>
                                    <button onclick="savebio()" id="savebio" class="text-blue-400 hover:underline hidden">Save</button> */}
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
                                    {/* <div class="flex align-middle my-4 leading-relaxed">
                                        <img src="" alt="" class="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p class="h-8 leading-loose">Nombeko Mamballa</p>
                                    </div>
                                    <div class="flex align-middle my-4 leading-relaxed">
                                        <img src="" alt="" class="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p class="h-8 leading-loose">Nombeko Mamballa</p>
                                    </div>
                                    <div class="flex align-middle my-4 leading-relaxed">
                                        <img src="" alt="" class="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p class="h-8 leading-loose">Nombeko Mamballa</p>
                                    </div>
                                    <div class="flex align-middle my-4 leading-relaxed">
                                        <img src="" alt="" class="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p class="h-8 leading-loose">Nombeko Mamballa</p>
                                    </div> */}
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