import React from 'react';
import LeftNavBar from './LeftNavBar';
import {userList} from '../utils/userData';

class Notification extends React.Component{
    render(){
        return(
            <div className="w-full max-w-6xl flex justify-center mx-auto">
                <LeftNavBar pageName="notification" />
                <div className="h-screen w-10/12 bg-gray-100 p-4">
                    <div className="w-full h-full flex justify-around">
                        <div className="content bg-white w-7/12 p-10">
                            
                            <div className="px-4 my-6">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-2xl">Notifications</h1>
                                </div>
                                <div>
                                    <div className="flex align-middle my-4 leading-relaxed">
                                        <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p className="h-8 leading-loose text-sm font-bold text-gray-800">
                                            Chinanza Akachi
                                            <span className="pl-10 text-gray-500 text-xs">1hr</span>
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                            Nombeko Mamballa sent you a connection request
                                    </p>
                                    <div className="w-full border-gray-300 border-b-2 py-2 text-sm">
                                        <a href="#" className="text-purple-800 font-semibold pr-8 hover:underline">Delete</a>
                                        <a href="#" className="text-purple-800 font-semibold pr-8 hover:underline">View profile</a>
                                        <a href="#" className="text-purple-800 font-semibold pr-8 hover:underline">Accept</a>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex align-middle my-4 leading-relaxed">
                                        <img src="https://randomuser.me/api/portraits/women/31.jpg" alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                        <p className="h-8 leading-loose text-sm font-bold text-gray-800">
                                            Darika Samak
                                            <span className="pl-10 text-gray-500 text-xs">1hr</span>
                                        </p>
                                    </div>
                                    <p className="text-sm">
                                            Dobroslawa has accepted your connection request
                                    </p>
                                    <div className="w-full border-gray-300 border-b-2 py-2 text-sm">
                                        <a href="#" className="text-purple-800 font-semibold pr-8 hover:underline">View profile</a>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="right-sidebar bg-white w-4/12 p-6 pt-12">
                            <div className="search my-2">
                                <input 
                                    className="w-full border-gray-300 border-b-2 px-2"
                                    type="text" name="" id="" 
                                    placeholder="Search people"
                                />
                            </div>
                            <div className="my-6">
                                <h2 className="font-semibold">Active Connections</h2>
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

export default Notification;