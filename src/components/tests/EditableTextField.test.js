import React from 'react';
import { shallow, mount } from 'enzyme';
import EditableTextField from '../EditableTextField';

describe('EditableTextField', () => {
    const onChangeMock = jest.fn();
    const onSearchMock = jest.fn();
    const changeValueEvent = {
        preventDefault() {},
        target: { value: 'newValue' }
    };


    // simulate click on div to show input, change input, then submit
    it('click div, change input value, submit value', () => {
        const component = mount(
            <EditableTextField 
                label="test"
                onSubmit={onSearchMock}
                />
        );
        component.find('div.editable-text-field').simulate('click');
        component.find('input').simulate('change', changeValueEvent);
        component.find('button.success').simulate('click');

        expect(onSearchMock).toBeCalledWith('newValue');
    });


    // If editable props is passed in, component should show input 
    it('Editable props passed in, should show input', () => {
        const component = mount( <EditableTextField label="test" editable />);
        expect(component.find('input').exists()).toBeTruthy();
    });
});

