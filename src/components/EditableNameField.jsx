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
            editable: false,
            firstName: props.firstName || '',
            lastName: props.lastName || '',
            error: null
        };
    }

    setEditable = () => {
        if (!this.state.editable)
            this.setState({ editable: true });
    }

    cancelEditable = () => {
        console.log('set editable to false');
        this.setState({ editable: false });
    }

    onChange = field => value => {
        console.log('on change -- field', field, value);
        this.setState({ [field]: value });
    }

    onSubmit = () => {
        const { firstName, lastName } = this.state;
        const { onChange } = this.props;

        console.log('onSubmit -- firstName', firstName);

        // we are not using EditableTextField 'required' props, since we are recomposing a hybrid text field
        // validate - check and make sure at least first name is filled
        if (firstName.length == 0) {
            this.setState({ error: 'First name cannot be empty' });
        } else {
            this.setState({ editable: false, error: null });
            onChange({ firstName, lastName });
        }
    }

    render() {
        const { firstName, lastName, onChange, editable, error } = this.state;

        return (
            <div className="row justify-content-end" onClick={this.setEditable}>
                <div className="col-12 col-sm-6">
                    <EditableTextField
                        label="FIRST NAME"
                        value={firstName}
                        onChange={this.onChange('firstName')}
                        editable={editable}
                        hideActionButtons />
                </div>
                <div className="col-12 col-sm-6">
                    <EditableTextField
                        label="LAST NAME"
                        value={lastName}
                        onChange={this.onChange('lastName')}
                        editable={editable}
                        autoFocus={false}
                        hideActionButtons />
                </div>

                {
                    error &&
                    <div className="col-8">
                        <p className="error-msg">{error}</p>
                    </div>
                }

                {
                    editable &&
                    <div className="col-4">
                        <div className="editable-text-field-actions flex-row justify-content-end">
                            <button className="success" onClick={this.onSubmit}>
                                <i class="fas fa-check"></i>
                            </button>
                            <button className="cancel" onClick={this.cancelEditable}>
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
    onChange: PropTypes.func.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
};
EditableNameField.defaultProps = {
    firstName: '',
    lastName: '',
};

export default EditableNameField;
