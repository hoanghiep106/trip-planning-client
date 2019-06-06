import React from 'react';
import Modal from './Modal';
import PlannerService from '../services/Planner';

class UpdateTripModal extends React.Component {
  state = {
    currentTrip: this.props.currentTrip,
  }

  handleChange = (e) => {
    const currentTrip = { ...this.state.currentTrip };
    currentTrip[e.target.name] = e.target.value;
    this.setState({ currentTrip });
  }

  save = (e) => {
    e.preventDefault();
    PlannerService.updateTrip(this.state.currentTrip.id, {
      name: this.state.currentTrip.name,
      description: this.state.currentTrip.description,
      cover_photo: this.state.currentTrip.cover_photo,
    }).then(() => this.props.onTripUpdated())
  }

  render() {
    const { currentTrip } = this.state;
    console.log(currentTrip)
    return (
      <Modal isOpen={this.props.isOpen} close={this.props.close}>
        <form onSubmit={this.save}>
          <div className="mb-3 text-left">
            <div className="text-left mb-4">
              <label className="font-weight-bold">Title</label>
              <input
                type="text"
                name="name"
                value={currentTrip.name}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="text-left mb-4">
              <label className="font-weight-bold">Description</label>
              <input
                type="text"
                name="description"
                value={currentTrip.description}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
            <div className="text-left mb-4">
              <label className="font-weight-bold">Cover photo url</label>
              <input
                type="text"
                name="cover_photo"
                value={currentTrip.cover_photo}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
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
              type="submit"
            >
              SAVE
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default UpdateTripModal;
