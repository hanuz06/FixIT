// Imports
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

/* global google */

class PlacesAutoFill extends Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});

    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    this.props.onPlaceLoaded(place.formatted_address);   
  }

  render() {
    return (
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="autocomplete"
      label="Location"      
      name="userAddress"  
      inputRef={this.autocompleteInput} 
      type="text"
      inputProps={
        {
          autoComplete: "new-password",
          form: {
            autoComplete: "off",
          }
        } 
      }                      
    />   
    );  
  }
}

export default PlacesAutoFill