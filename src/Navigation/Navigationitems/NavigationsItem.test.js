import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavItem from "./Navitem/Navitem";

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />);
	});
	it("Should render two <NavigationItems/> elements if not authenticated", () => {
		expect(wrapper.find(NavItem)).toHaveLength(2);
	});

	it("Should render three <NavigationItems/> elements if authenticated", () => {
		// wrapper = shallow(<NavigationItems isAuthenticated/>)
		wrapper.setProps({ isAuthenticated: true }); //helper from enzyme method
		expect(wrapper.find(NavItem)).toHaveLength(3);
	});

	it("Should an exact logout button", () => {
		// wrapper = shallow(<NavigationItems isAuthenticated/>)
		wrapper.setProps({ isAuthenticated: true }); //helper from enzyme method
		expect(
			wrapper.contains(
				<NavigationItems link="/logout">Logout</NavigationItems>
			)
		);
	});
});