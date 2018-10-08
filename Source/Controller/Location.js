import { PermissionsAndroid, Geolocation, AsyncStorage } from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';


export default async function requestLocationPermission() {

  var granted;
  try {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'Time2Staff needs access to your Location ' +
          'for showing proper results'
      }
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

    } else {
      console.log("Access Not Granted")
    }
  } catch (err) {
    console.log(err)
  }

  return granted;
}


export async function getLocation(navigator) {
  var pos;
  //console.log(navigator.geolocation);
  var val = await navigator.geolocation.getCurrentPosition(
    async (position) => {
      console.log(position);
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: position.timestamp,
        errorcode: 0
      }
      console.log("Location details are:::")
      console.log(JSON.stringify(pos))
      await AsyncStorage.setItem('location', JSON.stringify(pos));
    },
    async (error) => {
      console.log(error);
      if (error.code == 1) {
        console.log(errorcode)
        var granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
            'title': 'Location Permission',
            'message': 'Time2Staff needs access to your Location ' + 'for showing proper results'
          }
        )
      } else if (error.code == 2) {
        console.log(error.code);
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 100000, fastInterval: 10000 })
          .then(async (data) => {
            console.log(data)
            navigator.geolocation.getCurrentPosition(async (position) => {
              console.log(position);
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
                timestamp: position.timestamp,
                errorcode: 0
              }
              await AsyncStorage.setItem('location', JSON.stringify(pos));
            }, async (error) => {
              console.log(error)
            }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 200 })
          }).catch(err => {
            console.log(err)
          });
      }
    },
    { enableHighAccuracy: true, timeout: 9000, maximumAge: 200 },
  ).then((pos) => {
    console.
      log('value ' + pos)
  })


  return pos
}