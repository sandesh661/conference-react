import React from 'react';
import LeftNavBar from './LeftNavBar';
import { userList } from '../utils/userData';

class Messages extends React.Component{
    render(){
        return(
            <>
            <div className="w-full max-w-6xl flex justify-center mx-auto">
            <LeftNavBar pageName="message" />
            <div className="h-screen w-10/12 bg-gray-100 p-4">
                <div className="w-full h-full flex justify-around">

                        <div className="right-sidebar bg-white w-4/12 p-6 pt-12">
                            <div className="search my-4">
                                <input className="w-full border-gray-300 border-b-2 px-2" type="text" name="" id="" placeholder="Search people" />
                            </div>
                            <div className="my-6">
                                <div id="userList">
                                    {userList.map((ele, i) => {
                                        return(
                                            <div key={i} className={(i == 0 ? "relative bg-purple-200 " : "")+  "flex align-middle my-4 leading-relaxed p-2"}>
                                                {i == 0 ?
                                                <div className="absolute w-1 inset-y-0 left-0 bg-purple-700"></div>
                                                : null }
                                                <img src={ele.image} alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                                    <p className="h-8 leading-loose">{ele.name}</p>
                                            </div>
                                    )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="relative content bg-white w-7/12 p-10">
                        <div className="flex align-middle my-4 leading-relaxed border-gray-300 border-b-2 h-10">
                            <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4" />
                            <p className="h-8 leading-loose font-semibold">Chinanza Akachi</p>
                        </div>

                        <div className="bg-purple-600 text-gray-300 px-6 py-2 mb-2 text-xs rounded-lg w-auto inline-block max-w-sm">
                            Hey..
                        </div><br></br>
                        <div className="bg-purple-600 text-gray-300 px-6 py-2 mb-2 text-xs rounded-lg w-auto inline-block max-w-sm">
                            Lorem lipsum donor and whaterver goes here lipsum donor and whaterver goes here lipsum donor and whaterver goes here donor and whaterver goes here lipsum donor and whaterver goes here.
                        </div>
                        <div className="text-purple-600 px-6 py-2 mb-2 text-xs rounded-lg border border-purple-600 w-auto inline-block  max-w-sm float-right">
                            Lorem lipsum donor and whaterver goes here lipsum donor and whaterver goes here lipsum donor and whaterver goes here donor and whaterver goes here lipsum donor and whaterver goes here.
                        </div>
    
                        <div className="absolute inset-x-0 bottom-0 mb-4 mx-4">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-username" type="text" placeholder="Type something.." />
                            <input type="button" className="absolute -ml-12 mt-2 bg-gray-200 text-purple-800 font-medium cursor-pointer" value="Send" />
                        </div>
                        
                    </div>

                    
                </div>
            </div>
        </div>
        </>
        );
    }
}

export default Messages;