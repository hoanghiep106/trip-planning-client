import React from 'react';

import StarRatingComponent from 'react-star-rating-component'; 
import Cover from './Cover';
import Heading from './Heading';
import Content from './Content';
import Map from '../../components/GoogleMaps';

import RecommendationService from '../../services/Recommendation';
import ExploreService from '../../services/Explore';
import { PlaceTypeInfo } from '../../constants/common';

import './index.css';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      place: null,
      isOnList: false,
    };
  }

  componentDidMount() {
    RecommendationService.getPlace(this.props.match.params.id).then((response) => {
      this.setState({ 
        place: response.data,
        isOnList: ExploreService.placeInList(response.data.id),
      });
    })

    ExploreService.addDailyListChangeListener(() => this.setState({ isOnList: ExploreService.placeInList(this.state.place.id)}));
  }

  render() {
    const { place, isOnList } = this.state;
    if (place === null) return null;
    return (
      <div>
        {/* <Cover imageUrl={place.image_url} /> */}
        <div className="detail-content">
          <Heading 
            name={place.name}
            placeType={PlaceTypeInfo[place.type_id]}
            rating={place.rating}
            onAddClick={() => ExploreService.saveToList(place)}
            onRemoveClick={() => ExploreService.removeFromList(place.id)}
            isOnList={isOnList}
          />
          <hr />
          <Content 
            paragraphs={place.long_description.split('|')}
          />
          <hr />
          <Map 
            containerElement={<div className="detail-map-container" />}
            mapElement={<div style={{ height: '100%' }} />}
            zoom={12}
            center={place.location}
            markers={[{ id: place.id, location: place.location }]}
          />
        </div>
      </div>
    );
  }
}

export default Detail;