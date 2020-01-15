import React from "react";
import LeftNavBar from "./LeftNavBar";
import { userList } from "../utils/userData";
import { baseUrl } from "../utils/userData";
class UserProfile extends React.Component {
  componentDidMount() {
    this.main();
  }

  loadUserProfile = () => {
    fetch(baseUrl + "v1/profile/data/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      }
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(resp => {
        window.user = resp;
        this.displayData(resp);
        localStorage.setItem("profile", JSON.stringify(resp));
      })
      .catch(console.error);
  };

  displayData = user => {
    document.querySelector("#profile-fname").innerHTML = user.first_name;
    this.displayUserData();
  };

  displayUserData = () => {
    fetch(baseUrl + "v1/profile/retrieve-profile/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      },
      body: JSON.stringify({
        user_id: window.location.hash.replace("#", "")
      })
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(user => {
        console.log(user);
        document.querySelector(
          "#profile-fullname"
        ).innerHTML = `${user.first_name} ${user.last_name}`;
        document.querySelector("#profile-about").innerHTML = user.about;
        if (user.is_connection_sent) document.querySelector("#connectbtn").innerHTML = "Requested";
      })
      .catch(console.error);
  };

  main = () => {
    window.user = localStorage.getItem("profile"); //localStorage.getItem('user')
    if (window.user) {
      window.user = JSON.parse(window.user);
      this.displayData(window.user);
    } else {
      this.loadUserProfile();
    }
  };

  editbio = () => {
    let user = window;
    document.querySelector(
      "#profile-about"
    ).innerHTML = `<input type="text" id="editedAbout" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="${window.user.about}">`;
    document.querySelector("#editbio").classList.add("hidden");
    document.querySelector("#savebio").classList.remove("hidden");
  };

  savebio = () => {
    const editedAbout = document.querySelector("#editedAbout").value;
    document.querySelector("#editbio").classList.remove("hidden");
    document.querySelector("#savebio").classList.add("hidden");
    document.querySelector("#profile-about").innerHTML = editedAbout;
    fetch(baseUrl + "v1/profile/data/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      },
      body: JSON.stringify({
        about: editedAbout
      })
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(resp => {
        this.displayData(resp);
        window.user = resp;
      })
      .catch(console.error);
  };

  sendConnect = () => {
    fetch(baseUrl + "v1/connections/send-request/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      },
      body: JSON.stringify({
        partner_id: window.location.hash.replace("#", "")
      })
    })
      .then(resp => {
        if (!resp.ok) throw resp;
        return resp.json();
      })
      .then(resp => {
        document.querySelector("#connectbtn").innerHTML = "Requested";
        document
          .querySelector("#connectbtn")
          .classList.add("cursor-not-allowed");
      })
      .catch(err => {
        document.querySelector("#connectbtn").innerHTML = "Requested";
        document
          .querySelector("#connectbtn")
          .classList.add("cursor-not-allowed");
      });
  };

  render() {
    return (
      <div className="w-full max-w-6xl flex justify-center mx-auto">
        <LeftNavBar pageName="userprofile" />
        <div className="h-screen w-10/12 bg-gray-100 p-4">
          <div className="w-full h-full flex justify-around">
            <div className="content bg-white w-7/12 p-10">
              <div className="w-full">
                <div className="w-full rounded-lg h-40 bg-gray-700">
                  <img src="" alt="" className="" />
                </div>
                <div className="-mt-16 mx-6 flex">
                  <img
                    src="https://randomuser.me/api/portraits/women/29.jpg"
                    alt=""
                    className="w-32 h-32 bg-gray-800 rounded-full"
                  />
                  <div className="self-end mb-0 mx-6 text-lg font-bold tracking-wide">
                    <h1 id="profile-fullname"></h1>
                    <p>
                      <button
                        onClick={() => this.sendConnect()}
                        id="connectbtn"
                        className="border border-purple-400 text-xs font-semibold text-white bg-purple-600 px-3 py-1 rounded"
                      >
                        Connect
                      </button>
                      <button className="border border-purple-400 text-xs font-semibold px-3 py-1 rounded">
                        Chat
                      </button>
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-4 my-6">
                <div className="flex justify-between">
                  <h1 className="font-bold text-xl">Bio</h1>
                  {/* <button onClick={() => this.editbio()} id="editbio" className="text-blue-400 hover:underline">Edit</button>
                                    <button onClick={() => this.savebio()} id="savebio" className="text-blue-400 hover:underline hidden">Save</button> */}
                </div>
                <p id="profile-about" className="text-sm"></p>
              </div>

              {/* <div className="px-4 my-6">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-xl">Interests</h1>
                                    <a href="#" className=" text-blue-400 hover:underline">Edit</a>
                                </div>
                                <div className="flex my-2">
                                    <div className=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Design</div>
                                    <div className=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Hacking</div>
                                    <div className=" bg-purple-200 px-4 rounded-lg mx-2 leading-relaxed">Web Technologies</div>
                                </div>
                            </div> */}

              {/* <div className="px-4 my-6">
                                <div className="flex justify-between">
                                    <h1 className="font-bold text-xl">Settings</h1>
                                </div>
                                <div className="my-2 w-8/12">
                                    <div className="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span className="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span className="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span className="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span className="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex justify-between my-2">
                                        <p>Don't show my location</p>
                                        <span className="border rounded-full border-grey flex items-center cursor-pointer w-8 bg-purple-400 justify-end">
                                            <span className="rounded-full border w-5 h-5 border-grey shadow-inner bg-white shadow">
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div> */}
            </div>

            <div className="right-sidebar bg-white w-4/12 p-6 pt-12">
              <div className="search my-2">
                <input
                  className="w-full border-gray-300 border-b-2 px-2"
                  type="text"
                  name=""
                  id=""
                  placeholder="Search people"
                />
              </div>
              <div className="my-6">
                <h2 className="font-semibold">Active Connections</h2>
                <div id="userList">
                  {userList.map((ele, i) => {
                    return (
                      <div
                        key={i}
                        className="flex align-middle my-4 leading-relaxed"
                      >
                        <img
                          src={ele.image}
                          alt=""
                          className="w-8 h-8 bg-gray-700 rounded-full mr-4"
                        />
                        <p className="h-8 leading-loose">{ele.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
