import React from 'react';
import cnames from 'classnames';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.close);
  }

  close = (e) => {
    if (this.modalDialogRef && !this.modalDialogRef.contains(e.target)) {
      this.props.close();
    }
  }

  render() {
    if (this.props.isOpen === false) return null;
    return (
      <div
        id={this.props.id}
        tabIndex="-1"
        className="modal fade show d-block"
      >
        <div
          className={cnames('modal-dialog', { 'modal-lg': this.props.size === 'lg' })}
          role="document"
          ref={ref => this.modalDialogRef = ref}
        >
          <div className="modal-content">
            <div className="modal-header">
              <div className="ml-auto mr-2 pointer">
                <i id="modalCloseButton" className="fa fa-times" onClick={this.props.close} />
              </div>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  close: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
