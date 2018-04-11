import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import RecommendationItem from './RecommendationItem';

const RecommendationList = (props) => {
  const recommendationList = props.places.map(place => (
    <RecommendationItem place={place} key={place.id} handleClickItem={props.onClickItem} />
  ));
  return (
    <div className="place-list">
      <h4>
        Search results
        <span className="pull-right"><i className="fa fa-times" onClick={props.close} /></span>
      </h4>
      <div className="place-list-height">
        <Scrollbars>
          {recommendationList}
        </Scrollbars>
      </div>
    </div>
  )
};

export default RecommendationList;
