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

    // Set edtiable state to true & also set focus to respective field
    setEditable = fieldName => () => {
        if (!this.state.editable)
            this.setState({
                editable: true,
                whichAutoFocus: fieldName
            });
    }

    cancelEditable = () => {
        this.setState({
            editable: false,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            error: null
        });
    }

    onChange = field => value => {
        console.log('on change -- field', field, value);
        this.setState({ [field]: value });
    }

    setFocus = field => {
        console.log('setFocus', field);

        if (field === 'firstName' && this.firstName?.current)
            this.firstName?.current?.focus();
        else if (field === 'firstName' && this.firstName?.current)
            this.lastName?.current?.focus();
    }

    onSubmit = () => {
        const { firstName, lastName } = this.state;
        const { onChange } = this.props;

        console.log('onSubmit', firstName, lastName);


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
        const {
            firstName,
            lastName,
            onChange,
            editable,
            error,
            whichAutoFocus
        } = this.state;

        return (
            <div className="row justify-content-end">
                <div className="col-12 col-sm-6" onClick={this.setEditable('firstName')}>
                    <EditableTextField
                        label="FIRST NAME"
                        value={firstName}
                        onChange={this.onChange('firstName')}
                        editable={editable}
                        onFocus={this.setFocus('firstName')}
                        autoFocus={whichAutoFocus == 'firstName'}
                        onEnterPress={this.onSubmit}
                        hideActionButtons />
                </div>
                <div className="col-12 col-sm-6" onClick={this.setEditable('lastName')}>
                    <EditableTextField
                        label="LAST NAME"
                        value={lastName}
                        onChange={this.onChange('lastName')}
                        editable={editable}
                        autoFocus={whichAutoFocus == 'lastName'}
                        onEnterPress={this.onSubmit}
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
                                <i className="fas fa-check"></i>
                            </button>
                            <button className="cancel" onClick={this.cancelEditable}>
                                <i className="fas fa-times"></i>
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
