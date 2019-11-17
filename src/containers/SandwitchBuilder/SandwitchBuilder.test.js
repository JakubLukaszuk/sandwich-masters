import {SandwitchBuilder} from './SandwitchBuilder';
import Sandwitch from '../../components/Sandwitch/Sandwitch';
import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({adapter: new Adapter()});

describe('<SandwitchBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<SandwitchBuilder onInitIngreadients = {() => {}} />);
    });
    it('should render <BuildControls /> when reciving ingredients', () =>{
        wrapper.setProps({ingredients: {salad: 0}, bread: {multigrain: false}});
        expect(wrapper.find(Sandwitch)).toHaveLength(1);
    });
});