import React from 'react';
import { gapi } from 'gapi-script';
import {baseUrl} from '../utils/userData';

class LoginPage extends React.Component{

     login = () => {
        let email = document.querySelector('#email').value
        let password = document.querySelector('#password').value
        console.log('e', email, password)
        fetch(baseUrl + 'rest-auth/login/', {
            method: 'POST',
            body: JSON.stringify({
                username: email,
                password
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(resp => {
            if (!resp.ok) throw resp
            return resp.json()
        }).then(resp => {
            localStorage.setItem('key', resp.key)
            window.location.href = 'discover'
        }).catch(() => {
            window.alert('Invalid credentials')
        })
    }

    onSuccess = (googleUser) => {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        var profile = googleUser.getBasicProfile();
          console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
          console.log('Name: ' + profile.getName());
          console.log('Image URL: ' + profile.getImageUrl());
          console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
          fetch(baseUrl + 'rest-auth/registration/', {
              method: 'POST',
              body: JSON.stringify({
                  username: profile.getEmail(),
                  password1: 'default',
                  password2: 'default'
              }),
              headers: {
                  'content-type': 'application/json'
              }
          }).then(resp => {
              if (!resp.ok) throw resp
              return resp.json()
          }).then(resp => {
              localStorage.setItem('key', resp.key)
              window.location.href = 'discover'
          }).catch(() => {
              window.alert('An error occurred.')
          })
      }
      onFailure = (error) => {
        console.log(error);
      }
      renderButton = () => {
        gapi.signin2.render('my-signin2', {
          'scope': 'profile email',
          'width': 240,
          'height': 50,
          'longtitle': true,
          'theme': 'light',
          'onsuccess': this.onSuccess(),
          'onfailure': this.onFailure()
        });
      }

    render(){
        return(
        <div className="flex h-full w-full">
            <div className="h-screen w-7/12 bg-btn-green p-16">
                <h1 className="text-2xl font-extrabold">LOGO</h1>
                <div className="text-4xl font-extrabold max-w-sm mt-32">
                    Lorem lipsum donor and whaterver goes here
                </div>
            </div>
            <div className="flex flex-col justify-center h-screen w-5/12 bg-purple-500 p-16 text-white">
                <div><h1 className="text-2xl font-extrabold text-white my-8">Signup</h1></div>
                <div>
                    <div id="my-signin2"></div>
                </div>
                <div className="max-w-xs text-center my-2">
                    <span className="block my-2">Already Have account?</span>
                    <input className="w-full bg-transparent border-b px-3 my-2" type="text" name="" id="email" placeholder="Email" />
                    <input className="w-full bg-transparent border-b px-3 my-2" type="password" name="" id="password" placeholder="Password" />

                    <button className="block w-full bg-white text-purple-500 my-4 px-12 py-2 rounded" onClick={() => this.login()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
        )
    }
}

export default LoginPage;