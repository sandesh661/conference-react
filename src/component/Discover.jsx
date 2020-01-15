import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { Link } from 'react-router-dom';

import LeftNavBar from "./LeftNavBar";
import { baseUrl } from "../utils/userData";

const Discover = props => {
  const [activeTab, setActiveTab] = useState("nearest");
  const [range, setRange] = useState("50");
  const [nearestProfiles, setNearestProfiles] = useState([]);
  const [recommendedProfiles, setRecommendedProfiles] = useState([]);
  const [activeMarker, setActiveMarker] = useState();
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [bounds, setBounds] = useState(new props.google.maps.LatLngBounds())
  const [mapCenter, setMapCenter] = useState()

  useEffect(() => {
    loadProfilesInRange()
    loadRecommendations()

    let navigator = window.navigator
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function success(position) {
          setMapCenter({ lat: Number(position.coords.latitude), lng: Number(position.coords.longitude) })
          sendLocation(position.coords.latitude, position.coords.longitude);
        },
        function error(err) {
          console.log(err);
        }
      );
    } else {
      console.log("Geolocation not supported by this browser");
    }
  }, [])

  const loadRecommendations = () => {
    fetch(baseUrl + "v1/profile/recommendation/?limit=20", {
      method: "POST",
      body: JSON.stringify({
        distance: range
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
        setRecommendedProfiles(resp.results)
      })
      .catch(console.error);
  }
  const loadProfilesInRange = () => {
    fetch(baseUrl + "v1/profile/nearby/?limit=20", {
      method: "POST",
      body: JSON.stringify({
        distance: range
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
        setNearestProfiles(resp.results);
      })
      .catch(console.error);
  };

  const sendLocation = (latitude, longitude) => {
    fetch(baseUrl + "v1/profile/location/", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Token ${localStorage.getItem("key")}`
      },
      body: JSON.stringify({
        latitude,
        longitude
      })
    });
  };

  const onMarkerClick = (props, marker, e) => {
    setActiveMarker(marker)
    setSelectedPlace(props)
    setShowInfoWindow(true)
  }

  const markers = () => {
    let activeProfiles = nearestProfiles;
    if (activeTab === "recommended") {
      activeProfiles = recommendedProfiles;
    }

    return activeProfiles.map(profile => {
      let point = {
        lat: Number(profile.latitude), 
        lng: Number(profile.longitude)
      }
      bounds.extend(point)
      return (
        <Marker 
          onClick={onMarkerClick} 
          name={`${profile.first_name} ${profile.last_name}`} 
          user_id={profile.user_id}
          position={point}
        />
      )
    });
  }

  const profiles = () => {
    let activeProfiles = nearestProfiles;
    if (activeTab === "recommended") {
      activeProfiles = recommendedProfiles;
    }

    return activeProfiles.map(profile => (
      <div
        className="flex align-middle my-4 leading-relaxed"
        key={profile.user_id}
      >
        <img
          src="https://placeimg.com/50/50/people"
          alt=""
          className="w-8 h-8 bg-gray-700 rounded-full mr-4"
        />
        <p className="h-8 leading-loose">
          <Link to={`/userprofile/#${profile.user_id}`}>
            {profile.first_name} {profile.last_name}
          </Link>
        </p>
      </div>
    ));
  };

  return (
    <div className="w-full max-w-6xl flex justify-center mx-auto">
      <LeftNavBar pageName="discover" />
      <div className="h-screen w-10/12 bg-gray-100 p-4">
        <div className="w-full h-full flex justify-around">
          <div className="right-sidebar bg-white w-4/12 p-6 pt-12">
            <div className="search my-4">
              <input
                className="w-full border-gray-300 border-b-2 px-2"
                type="text"
                name=""
                id=""
                placeholder="Search people"
              />
            </div>

            <div className="flex">
              <button
                onClick={() => {setActiveTab("nearest")}}
                className={`flex-1 custom-tab-btn text-purple-800 text-xs hover:bg-purple-300 py-2 mr-2 rounded ${
                  activeTab === "nearest" ? "active" : ""
                }`}
              >
                Nearest
              </button>
              <button
                onClick={() => {setActiveTab("recommended");}}
                className={`flex-1 custom-tab-btn text-purple-800 text-xs hover:bg-purple-300 py-2 mr-2 rounded ${
                  activeTab === "recommended" ? "active" : ""
                }`}
              >
                Recommended
              </button>
            </div>
            <div
              className={`tab-content nearest ${
                activeTab === "nearest" ? "active" : ""
              }`}
            >
              <div className="flex">
                <button className="flex-1 text-purple-800 font-semibold text-left text-xs pt-4 mr-2">
                  Distance
                </button>
                <button className="flex-1 text-purple-800 font-semibold text-right text-xs pt-4 ml-2">
                  <span id="radius">{range}</span> km radius
                </button>
              </div>
              <div>
                <input
                  type="range"
                  min="1"
                  max="10000"
                  value={range}
                  className="slider"
                  id="myRange"
                  onChange={e => {
                    setRange(e.target.value);
                  }}
                  onMouseUp={() => {
                    loadProfilesInRange();
                  }}
                />
              </div>
            </div>
            <div
              className={`tab-content recommended ${
                activeTab === "recommended" ? "active" : ""
              }`}
            >
              <div className="font-semibold text-xs pt-4 pb-2">
                Recommended on the basic of interests
              </div>
              <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full">
                {" "}
                Design{" "}
              </div>
              <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full">
                {" "}
                Hacking{" "}
              </div>
              <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full">
                {" "}
                Web technologies{" "}
              </div>
            </div>

            <div className="my-6">
              <div id="userList">{profiles()}</div>
            </div>
          </div>

          <div className="bg-white w-7/12">
            <div id="map" className="w-full h-full relative">
              <Map
                google={props.google}
                zoom={2}
                initialCenter={mapCenter}
                bounds={bounds}
              >
                {markers()}

                <InfoWindow
                  marker={activeMarker}
                  visible={showInfoWindow}>
                    <div>
                      <h1>
                      <a href={`/userprofile/#${selectedPlace.user_id}`}>
                        {selectedPlace.name}
                      </a>
                      </h1>
                    </div>
                </InfoWindow>
              </Map>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDj9Nxy8B-eVC0fYp5qMCdlA9Nsimqh0N0"
})(Discover);
// export default Discover;
