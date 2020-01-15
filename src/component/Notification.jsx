import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import LeftNavBar from "./LeftNavBar";
import { userList } from "../utils/userData";
import { baseUrl } from "../utils/userData";

const Notification = ({ name, id, image, accepted }) => {
  const [accept, setAccept] = useState(accepted)

  const acceptRequest = () => {
    fetch(baseUrl + "v1/connections/accept-request/", {
      method: "POST",
      body: JSON.stringify({
        "partner_id": id
      }),
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
        console.log(resp)
        setAccept(true)
      })
      .catch(console.error);
  }
  const declineRequest = () => {
    fetch(baseUrl + "v1/connections/accept-request/", {
      method: "POST",
      body: JSON.stringify({
        "partner_id": id
      }),
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
        window.location.reload()
      })
      .catch(console.error);
  }

  return (
    <div>
      <div className="flex align-middle my-4 leading-relaxed">
        <img
          src={image}
          alt=""
          className="w-8 h-8 bg-gray-700 rounded-full mr-4"
        />
        <p className="h-8 leading-loose text-sm font-bold text-gray-800">
          {name}
          <span className="pl-10 text-gray-500 text-xs">1hr</span>
        </p>
      </div>
      <p className="text-sm">{name} {accepted ? 'accepted your' : 'sent you a'} connection request</p>
      <div className="w-full border-gray-300 border-b-2 py-2 text-sm">
        <button
          className={`text-purple-800 font-semibold pr-8 hover:underline ${accept===true ? 'hidden' : ''}`}
          onClick={declineRequest}
        >
          Delete
        </button>
        <Link
          to={`/userprofile#${id}`}
          className="text-purple-800 font-semibold pr-8 hover:underline"
        >
          View profile
        </Link>
        <button
          className={`text-purple-800 font-semibold pr-8 hover:underline ${accept===true ? 'hidden' : ''}`}
          onClick={acceptRequest}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    fetch(baseUrl + "v1/profile/retrieve-notification/", {
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
        setNotifications(resp)
      })
      .catch(console.error);
  }, [])
  
  return (
    <div className="w-full max-w-6xl flex justify-center mx-auto">
      <LeftNavBar pageName="notification" />
      <div className="h-screen w-10/12 bg-gray-100 p-4">
        <div className="w-full h-full flex justify-around">
          <div className="content bg-white w-7/12 p-10">
            <div className="px-4 my-6">
              <div className="flex justify-between">
                <h1 className="font-bold text-2xl">Notifications</h1>
              </div>

              {notifications.length <= 0 ? (
                <>
                <br/>
                <p>You're all caught up!</p>
                </>
              ) : ''}

              {notifications.map(notification => (
                <Notification name={`${notification.first_name} ${notification.last_name}`} id={notification.sender_id} image={notification.user} accepted={notification.connection_state === 'accepted'} />
              ))}

            </div>
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
};

export default Notifications;
