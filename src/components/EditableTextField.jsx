import React from 'react';
import PropTypes from 'prop-types';
import { validateField } from '../utils';

class EditableTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            inputValue: '',
            error: null
        };
    }

    onSubmit = () => {
        const { inputValue, error } = this.state;
        const { type, onChange, label, required } = this.props;

        // if state not controlled by parent
        if (!('editable' in this.props)) {

            // Pass in 'required' to check for empty field if required
            const hasError = validateField(type, inputValue, required, label.toLowerCase());
            console.log('hasError', hasError);

            if (hasError) {
                this.setState({ error: hasError });
            } else {
                this.setState({
                    isEditing: false,
                    error: null
                });
                onChange(inputValue);
            }
        }
    }

    // set editable state to 'true'
    allowEditable = () => {

        // if editable is not passed in from props, this component has control (default behaviour)
        // otherwise parent has editable control
        if (!('editable' in this.props)) {
            this.setState({ isEditing: true });
        }
    }

    // set editable state to 'false'
    cancelEditable = () => {
        this.setState({ isEditing: false });
    }

    // Update edited local state
    onChange = (e) => {
        const newValue = e.target.value;

        this.setState({ inputValue: newValue });

        // if being controlled by parent, update parent state
        if (this.props.onChange)
            this.props.onChange(newValue);
    }

    render() {
        const { className, value, placeholder, label, type, editable, hideActionButtons, autoFocus } = this.props;
        const { isEditing, error } = this.state;

        const allowEdit = ('editable' in this.props) ? editable : isEditing;

        // Show text field when not in 'Edit' mode
        if (!allowEdit) {
            return (
                <div className={`${className}`}>
                    { label && <label for={label}>{label}</label> }
                    <div
                        className="editable-text-field hover-border"
                        onClick={this.allowEditable} >
                        <span>{value}</span>

                        {/* Editable Icon */}
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${className}`}>
                { label && <label for={label}>{label}</label> }
                <div className="col-12 flex editable-text-field bordered">
                    <input
                        name={label}
                        type={type}
                        defaultValue={value}
                        onChange={this.onChange}
                        placeholder={placeholder}
                        autoFocus={autoFocus} />
                </div>

                <div className="row justify-content-end">
                    {
                        error &&
                        <div className="col-8">
                            <p className="error-msg">{error}</p>
                        </div>
                    }

                    {
                        !hideActionButtons &&
                        <div className="col-4 editable-text-field-actions flex-row justify-content-end">
                            <button className="success" onClick={this.onSubmit}>
                                <i class="fas fa-check"></i>
                            </button>
                            <button className="cancel" onClick={this.cancelEditable}>
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

EditableTextField.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    editable: PropTypes.bool,
    className: PropTypes.string,
    hideActionButtons: PropTypes.bool,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool
};

EditableTextField.defaultProps = {
    value: '',
    type: 'text',
    className: '',
    hideActionButtons: false,
    autoFocus: true,
    required: false
};

export default EditableTextField;
