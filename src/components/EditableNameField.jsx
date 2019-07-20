import React from 'react';
import PropTypes from 'prop-types';
import EditableTextField from './EditableTextField';

/* *
 * Use this intermediate component to control whether both
 * 'firstName' & 'lastName' fields are editable or not
 */
class EditableNameField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        };
    }

    setEditable = () => {
        if (!this.state.editable)
            this.setState({ editable: true });
    }

    cancelEditable = () => {
        this.setState({ editable: false });
    }

    render() {
        const { firstName, lastName, onChange } = this.props;
        const { editable } = this.state;

        return (
            <div className="row" onClick={this.setEditable}>
                <div className="col-12">
                    <label>FULL NAME</label>
                </div>
                <div className="col-12 col-sm-6">
                    <EditableTextField
                        value={firstName}
                        onChange={onChange('firstName')}
                        cancelEditable={this.cancelEditable}
                        editable={editable}
                        hideActionButtons />
                </div>
                <div className="col-12 col-sm-6">
                    <EditableTextField
                        value={lastName}
                        onChange={onChange('lastName')}
                        cancelEditable={this.cancelEditable}
                        editable={editable}
                        hideActionButtons />
                </div>
                {
                    editable &&
                    <div className="col-12">
                        <div className="editable-text-field-actions flex-row justify-content-end">
                            <button className="success">
                                <i class="fas fa-check"></i>
                            </button>
                            <button className="cancel" onClick={this.toggleEditing}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

EditableNameField.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
};
EditableNameField.propTypes = {
    firstName: '',
    lastName: '',
};

export default EditableNameField;
