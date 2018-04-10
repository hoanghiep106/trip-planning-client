import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';

class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    axios.get('http://812cd200.ngrok.io/places').then((res) => {
      this.setState({ places: res.data.places });
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <SearchBar />
            </div>
            {this.state.places.map(place => (
              <div key={place.id}>
                <h4>{place.name}</h4>
                <div className="thumbnail">
                  <img src={place.image_url} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Recommendation;
