import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Modal from './Modal';
import PlannerService from '../services/Planner';

const SortableItem = SortableElement(({place}) => <div className="dnd-place-item">{place.name}</div>);

const SortableList = SortableContainer(({orderedList, places}) => {
  return (
    <div className="sortableHelper">
      {orderedList.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} place={places[value]} />
      ))}
    </div>
  );
});

class PlaceOrderModal extends React.Component {
  state = {
    orderedPlaces: this.props.currentItinerary.ordered_places,
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      orderedPlaces: arrayMove(this.state.orderedPlaces, oldIndex, newIndex),
    });
  };

  save = () => {
    PlannerService.updateDay(this.props.currentItinerary.id, { ordered_places: this.state.orderedPlaces }).then(() => {
      this.props.onPlaceOrderChanged();
    });
  }

  render() {
    const { currentItinerary } = this.props;
    const placeMap = {};
    currentItinerary.places.forEach(place => {
      placeMap[place.id] = place
    });
    return (
      <Modal isOpen={this.props.isOpen} close={this.props.close}>
        <div id="confirmDeleteModal">
          <div className="mb-3 text-left">
            <SortableList
              helperClass="sortableHelper"
              orderedList={currentItinerary.ordered_places}
              onSortEnd={this.onSortEnd}
              places={placeMap}
            />
          </div>
          <div className="text-right mt-3 mb-4">
            <button
              id="deleteModalcancelButton"
              className="btn btn-light mr-2"
              onClick={this.props.close}
              type="button"
            >
              CANCEL
            </button>
            <button
              id="deleteModalconfirmButton"
              className="btn btn-danger"
              type="button"
              onClick={this.save}
            >
              SAVE
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

export default PlaceOrderModal;
