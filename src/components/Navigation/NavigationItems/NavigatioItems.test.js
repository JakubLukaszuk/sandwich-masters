import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render three <NavigationItem /> elemtnts if not authenticated',
     () => {
         expect(wrapper.find(NavigationItem)).toHaveLength(3);
     });
     it('should render four <NavigationItem /> elemtnts if not authenticated',
     () => {
         wrapper.setProps({isAuthenticated: true});
         expect(wrapper.find(NavigationItem)).toHaveLength(4);
     });
});