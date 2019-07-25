import React from 'react';
import PropTypes from 'prop-types';
import { validateField } from '../utils';

class EditableTextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            inputValue: '',
            error: null,
            inputFocused: false
        };
    }

    onSubmit = () => {
        const { inputValue, error } = this.state;
        const { type, onSubmit, label, required } = this.props;

        // if state not controlled by parent
        if (!('editable' in this.props)) {

            // Pass in 'required' to check for empty field if required
            const hasError = validateField(type, inputValue, required, label.toLowerCase());

            if (hasError) {
                this.setState({ error: hasError });
            } else {
                this.setState({
                    isEditing: false,
                    error: null
                });
                onSubmit(inputValue);
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
        this.setState({
            isEditing: false,
            inputValue: '',
            error: null,
            inputFocused: false
        });

    }

    // Update edited local state
    onChange = (e) => {
        const newValue = e.target.value;
        const { onChange } = this.props;

        console.log('EditableTextField onChange', this.state.inputValue);
        this.setState({ inputValue: newValue });

        onChange && onChange(newValue);
    }

    onInputFocus = () => {
        this.setState({ inputFocused: true });
    }

    onInputBlur = () => {
        this.setState({ inputFocused: false });
    }

    onKeyPress = (ev) => {
        // console.log(`Pressed keyCode ${ev.key}`);
        const { onEnterPress } = this.props;

        // Track 'Enter' key press to submit.
        // Intuitively, a lot of people press 'Enter' to submit
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onSubmit();
            onEnterPress && onEnterPress();
        }
    }

    render() {
        const { className, value, placeholder, label, type, editable, hideActionButtons, autoFocus } = this.props;
        const { isEditing, error, inputValue, inputFocused } = this.state;

        const allowEdit = ('editable' in this.props) ? editable : isEditing;

        // Show text field when not in 'Edit' mode
        if (!allowEdit) {
            return (
                <div className={`${className}`}>
                    { label && <label for={label}>{label}</label> }
                    <div
                        className="editable-text-field hover-border"
                        onClick={this.allowEditable} >
                        <span className="text-display">{value}</span>

                        {/* Editable Icon */}
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${className}`}>
                { label && <label for={label}>{label}</label> }
                <div className="col-12 flex editable-text-field bordered" style={{ borderColor: inputFocused && '#15c7ba' }}>
                    <input
                        name={label}
                        type={type}
                        defaultValue={value}
                        onChange={this.onChange}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        onKeyPress={this.onKeyPress}
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
                                <i className="fas fa-check"></i>
                            </button>
                            <button className="cancel" onClick={this.cancelEditable}>
                                <i className="fas fa-times"></i>
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
    onSubmit: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    editable: PropTypes.bool,
    className: PropTypes.string,
    hideActionButtons: PropTypes.bool,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    onEnterPress: PropTypes.func
};

EditableTextField.defaultProps = {
    value: '',
    type: 'text',
    className: '',
    hideActionButtons: false,
    autoFocus: true,
    required: false,
};

export default EditableTextField;
