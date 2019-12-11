/* eslint-disable no-console */

import { register } from 'register-service-worker'

// console.log(process)

// if (!process.env.NODE_ENV) {
  // process.env.NODE_ENV = JSON.parse(prod.env.NODE_ENV)
// }


if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
// if (process.env.NODE_ENV === 'production') {
    register('tabik-sw.js', {
    ready () {
      console.log(
        '[PROD/DEV] App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.')
      let confirmationResult = confirm("New content found! Do you want to reload the app?")
      if (confirmationResult) registration.waiting.postMessage({action: "skipWaiting"})
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })

  console.log('onIf');

  let refreshing
  navigator.serviceWorker.addEventListener("controllerchange", e=>{
    if (refreshing) return
    window.location.reload()
    refreshing = true
  })
}
// else{
  // register(`${process.env.BASE_URL}service-worker.js`, {
    // console.log(`${process.env.BASE_URL}`);
    // ready () {
      // console.log(
        // '[DEV] App is being served from cache by a service worker.\n' +
        // 'For more details, visit https://goo.gl/AFskqB'
      // )
    // },
    // registered () {
      // console.log('Service worker has been registered.')
    // },
    // cached () {
      // console.log('Content has been cached for offline use.')
    // },
    // updatefound () {
      // console.log('New content is downloading.')
    // },
    // updated (registration) {
      // console.log('New content is available; please refresh.')
      // let confirmationResult = confirm("New content found! Do you want to reload the app?")
      // if (confirmationResult) registration.waiting.postMessage({action: "skipWaiting"})
    // },
    // offline () {
      // console.log('No internet connection found. App is running in offline mode.')
    // },
    // error (error) {
      // console.error('Error during service worker registration:', error)
    // }
  // })
//
  // console.log('onElse');
//
  // let refreshing
  // navigator.serviceWorker.addEventListener("controllerchange", e=>{
    // if (refreshing) return
    // window.location.reload()
    // refreshing = true
  // })
// }
