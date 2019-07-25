import React from 'react';
import { shallow, mount } from 'enzyme';
import ChangePasswordField from '../ChangePasswordField';

describe('ChangePasswordField', () => {
    const changePwdEvent = {
        preventDefault() {},
        target: { value: 'newPassword123!@here' }
    };
    
    // test if modal shows up if modal button pressed
    it('click button modal button should show', () => {
        const component = mount( <ChangePasswordField />);

        component.find('button#password-change-btn').simulate('click');
        expect(component.find('div.change-password-modal').exists()).toBeTruthy();
    });


    // If editable props is passed in, component should show input 
    it('Editable props passed in, should show input', () => {
        const component = mount( <ChangePasswordField />);

        // Show modal
        component.find('button#password-change-btn').simulate('click');
        // Set new password
        component.find('input').simulate('change', changePwdEvent);

        expect(component.find('div.progress-bar.bg-success').exists()).toBeTruthy();
    });

    // Check if show visibility works
    it('Toggle visibility to show password', () => {
        const component = mount( <ChangePasswordField />);

        // Show modal
        component.find('button#password-change-btn').simulate('click');
        // Set new password
        component.find('.password-visibility-btn').simulate('click');

        expect(component.find('input').prop('type')).toEqual('text');
    });
});

