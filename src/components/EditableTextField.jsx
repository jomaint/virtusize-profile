import React from 'react';
import PropTypes from 'prop-types';

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
        const { type, inputValue } = this.state;

        // if state not controlled by parent
        if (!('editable' in this.props)) {

            // dont allow empty text field (name)
            if (type == 'text' && inputValue.length == 0) {
                this.setState({ error: 'Field cannot be empty' });
            }

        }
    }

    allowEditable = () => {
        // if editable is not passed in from props, this component has control (default behaviour)
        // otherwise parent has editable control
        if (!('editable' in this.props)) {
            this.setState({ isEditing: true });
        }

    }

    cancelEditable = () => {
        const { cancelEditable } = this.props;
        // if editable state is being controlled by parents, call callback method of parent
        if (cancelEditable) {
            cancelEditable();

        // else, set local editable state to false
        } else {
            this.setState({ isEditing: false });
        }
    }

    // We store entire state of from in AccountUserInfo, so each onChange actually sets the state
    onChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }

    render() {
        const { className, value, placeholder, label, type, editable, hideActionButtons } = this.props;
        const { isEditing, error } = this.state;

        const allowEdit = ('editable' in this.props) ? editable : isEditing;

        if (!allowEdit) {
            return (
                <div className={`${className}`}>
                    { label && <label for={label}>{label}</label> }
                    <div
                        className="editable-text-field hover-border"
                        onClick={this.allowEditable} >
                        <span>{value}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={`${className}`}>
                { label && <label for={label}>{label}</label> }
                <div className="flex editable-text-field bordered">
                    <input
                        name={label}
                        type={type}
                        defaultValue={value}
                        onChange={this.onChange}
                        placeholder={placeholder}
                        autoFocus />

                    { error && <span className="error-msg">{error}</span> }
                </div>
                {
                    !hideActionButtons &&
                    <div className="editable-text-field-actions flex-row justify-content-end">
                        <button className="success" onClick={this.onSubmit}>
                            <i class="fas fa-check"></i>
                        </button>
                        <button className="cancel" onClick={this.cancelEditable}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                }
            </div>
        );
    }
}

EditableTextField.PropTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    editable: PropTypes.bool,
    className: PropTypes.string,
    hideActionButtons: PropTypes.bool,
};

EditableTextField.PropTypes = {
    value: '',
    type: 'text',
    className: '',
    hideActionButtons: false
};

export default EditableTextField;
