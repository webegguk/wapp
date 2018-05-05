import React, { Component } from 'react';
import styled from 'styled-components';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


const Div = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  height: 70vh;
`;

class MapComponent extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    markers: this.props.markers,
    _loaded: false,
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  findMarker = ({ address, ...props }) => {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK') {
          resolve({
            id: props.id,
            title: props.title,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          })
        } else {
          alert('Couldnt\'t find the location ' + address)
          reject()
        }
      })
    })
  }

  componentWillUnmount() {
    window.google.maps.event.clearListeners(this.listener1)
  }

  componentDidMount() {
    this.bounds = new window.google.maps.LatLngBounds()
    this.geocoder = new window.google.maps.Geocoder()
    this.foundMarkers = [];
    Promise
      .all(this.props.markers.map(this.findMarker))
      .then(results => {
        results
          .filter(Boolean)
          .forEach((result) => {
            this.bounds.extend(new window.google.maps.LatLng(result.lat, result.lng));
            this.foundMarkers.push(result);
          });
        this.setState({
          markers: this.foundMarkers,
          _loaded: true,
        })
        this.map = this.refs.mapComponent.map
        this.map.fitBounds(this.bounds)
        this.listener1 = window.google.maps.event.addDomListener(window, 'resize', () => {
          this.map.fitBounds(this.bounds)
        });
      })
  }

  render() {

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    //console.log(this.state.markers)
    return (
      <Div>
        <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          ref="mapComponent">
          {
            this.state.markers.map((marker) =>
              <Marker
                key={marker.id}
                onClick={this.onMarkerClick}
                title={marker.title}
                position={{ lat: marker.lat, lng: marker.lng }}
              />
            )
          }
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.title}</h1>
            </div>
          </InfoWindow>
        </Map>
      </Div>
    )

  }
}

export default GoogleApiWrapper(
  (props) => (
    ({apiKey}) => ({apiKey})
  )
)(MapComponent)