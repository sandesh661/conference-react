import React from 'react';
import LeftNavBar from './LeftNavBar';
import { loadScript } from '../utils/google-map';
import {baseUrl} from '../utils/userData';

class Discover extends React.Component {

    componentDidMount(){
        /*this.loadProfilesInRange()
        this.loadUserProfile()
        this.getLocation()
        this.getRecommendations();

        //from google.mp.js
        loadScript();
        this.rangeSelector();*/
    }

    onTabbuttonClick(event, className){
        /*if (className === 'nearest') {
            console.log('show nearest')
            this.listProfiles(window.nearestProfiles)
        } else {
            console.log('show recommended')
            this.listProfiles(window.recommendedProfiles)
        }
        document.querySelector(".tab-content.active").classList.remove("active");
        document.querySelector(".tab-content."+className).classList.add("active");

        document.querySelector(".custom-tab-btn.active").classList.remove("active");
        event.classList.add("active");*/
    }
/*
    rangeSelector(){
        var slider = document.getElementById("myRange");
        var output = document.getElementById("radius");
        output.innerHTML = slider.value;

        slider.onchange = function() {
            output.innerHTML = this.value;
            this.loadProfilesInRange()
        }
    }

    loadProfilesInRange () {
        let range = document.getElementById("myRange").value;
        fetch(baseUrl + 'v1/profile/nearby/?limit=20', {
            method: 'POST',
            body: JSON.stringify({
                distance: range
            }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            }
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            console.log(resp)
            window.nearestProfiles = resp.results
            this.listProfiles(resp.results)

        }).catch(console.error)
    }

    loadUserProfile () {
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
            window.user = resp
            document.querySelector('#profile-fname').innerHTML = resp.first_name
            localStorage.setItem('profile', JSON.stringify(resp))
        }).catch(console.error)
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(position) {
                sendLocation(position.coords.latitude, position.coords.longitude)
            }, function error(err) {
                console.log(err)
            });
        } else {
            alert('Geolocation not supported by this browser')
        }
    }

    sendLocation (latitude, longitude) {
        fetch(baseUrl + 'v1/profile/location/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            },
            body: JSON.stringify({
                latitude,
                longitude
            })
        })
    }

    getRecommendations () {
        let range = document.getElementById("myRange").value;
        fetch(baseUrl + 'v1/profile/recommendation/?limit=20', {
            method: 'POST',
            body: JSON.stringify({
                distance: range
            }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('key')}`
            }
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            window.recommendedProfiles = resp.results
        }).catch(console.error)
    }

    listProfiles (profiles) {
        let usersList = ''
        let locations = []

        profiles.forEach((user, index) => {
            usersList += '<div className="flex align-middle my-4 leading-relaxed">' + 
            '<img src="https://placeimg.com/50/50/people" alt="" className="w-8 h-8 bg-gray-700 rounded-full mr-4">' +
            '<p className="h-8 leading-loose"><a href="userprofile.html#'+user['user_id']+'">'+ user.first_name +' '+ user.last_name +'</a></p>' +
            '</div>';
            locations.push([
                `${user.first_name} ${user.last_name}`,
                user.latitude,
                user.longitude,
                index + 1,
                user.user_id
            ])
        })
        document.getElementById("userList").innerHTML = usersList;

        let marker
        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: "./img/marker-icon.png",
                //icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/library_maps.png",
                map: map
            });

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(`<a href="userprofile.html#${locations[i][4]}">${locations[i][0]}</a>`);
                    infowindow.open(map, marker);
                }
            })(marker, i));

            marker.setMap(window.map);
        }
        map.fitBounds(bounds);
    }*/
    render(){
        return(
            <div className="w-full max-w-6xl flex justify-center mx-auto">
                <LeftNavBar pageName = "discover" />
                <div className="h-screen w-10/12 bg-gray-100 p-4">
                    <div className="w-full h-full flex justify-around">

                            <div className="right-sidebar bg-white w-4/12 p-6 pt-12">
                                <div className="search my-4">
                                    <input 
                                        className="w-full border-gray-300 border-b-2 px-2"
                                        type="text" name="" id="" 
                                        placeholder="Search people"
                                    />
                                </div>

                                <div className="flex">
                                    <button onClick={this.onTabbuttonClick(this, 'nearest')} className="flex-1 custom-tab-btn active text-purple-800 text-xs hover:bg-purple-300 py-2 mr-2 rounded">
                                        Nearest
                                    </button>
                                    <button onClick={this.onTabbuttonClick(this, 'recommended')} className="flex-1 custom-tab-btn text-purple-800 text-xs hover:bg-purple-300 py-2 ml-2 rounded">
                                        Recommended
                                    </button>
                                </div>
                                <div className="tab-content nearest active">
                                    <div className="flex">
                                            <button className="flex-1 text-purple-800 font-semibold text-left text-xs pt-4 mr-2">
                                                Distance
                                            </button>
                                            <button className="flex-1 text-purple-800 font-semibold text-right text-xs pt-4 ml-2">
                                                <span id="radius">10</span> km radius
                                            </button>
                                        </div>
                                    <div>
                                        <input type="range" min="1" max="10000" value="50" className="slider" id="myRange" />
                                    </div>
                                </div>
                                <div className="tab-content recommended">
                                    <div className="font-semibold text-xs pt-4 pb-2">Recommended on the basic of interests</div>
                                    <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full"> Design </div>
                                    <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full"> Hacking </div>
                                    <div className="bg-purple-200 text-purple-800 text-xs w-auto inline-block px-2 py-px rounded-full"> Web technologies </div>
                                </div>

                                <div className="my-6">
                                    <div id="userList">
                                    </div>
                                </div>
                            </div>

                        <div className="bg-white w-7/12">
                            <div id="map" className="w-full h-full"></div>
                        </div>

                        
                    </div>
                </div>
            </div>

        )
    }
}

export default Discover;