import React from 'react';
import LeftNavBar from './LeftNavBar';
import {userList} from '../utils/userData';

class HomePage extends React.Component{
    render(){
        return(
            <>
            <div className="w-full max-w-6xl flex justify-center mx-auto">
                <LeftNavBar pageName="home" />
                
                <div className="h-screen w-10/12 bg-gray-100 p-4">
            <div className="w-full h-full flex justify-around">
                <div className="content bg-white w-7/12 p-10">
                    
                    <div className="px-4 my-6">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-2xl">Feed</h1>
                        </div>
                        <div>
                            <div className="flex align-middle my-4 leading-relaxed">
                                <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                <p className="h-8 leading-loose text-sm font-bold text-gray-800">
                                    Chinanza Akachi
                                    <span className="pl-10 text-gray-500 text-xs">1hr</span>
                                </p>
                            </div>
                            <p className="text-sm font-bold text-gray-800">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </p>
                            <p className="text-xs text-gray-600 font-semibold pt-2">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                            <div className="w-full border-gray-300 border-b-2 py-2 text-sm text-gray-500">
                                <i className="fa fa-heart-o" aria-hidden="true"> 2k</i>
                                <i className="fa fa-commenting-o pl-8" aria-hidden="true"> 120 </i>
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
                            <p className="text-sm font-bold text-gray-800">
                                    Lorem Ipsum is simply dummy text of the printing.
                            </p>
                            <p className="text-xs text-gray-600 font-semibold pt-2">
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown scrambled it to make a type specimen book.
                            </p>
                            <div className="w-full border-gray-300 border-b-2 py-2 text-sm text-gray-500">
                                <i className="fa fa-heart-o" aria-hidden="true"> 1k</i>
                                <i className="fa fa-commenting-o pl-8" aria-hidden="true"> 80 </i>
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
            </>
        )
    }
}

export default HomePage;