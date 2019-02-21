
// import React from 'react';
// import { Table } from 'react-bootstrap';
// import SideNav, { MenuIcon } from 'react-simple-sidenav';
// import { Button } from 'semantic-ui-react';

// import Fetch from '../../modules/fetch';

import Breadcrumbs from '@trendmicro/react-breadcrumbs';
import React from 'react';
import styled from 'styled-components';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminFormAddItem from './products/addProduct'
import ProductsTable from './products/productsList';
import UserList from './users/user_list'
import { changeBreadcrumb } from '../actions/actions'
import OrderList from './orders/orderList'; 

const Main = styled.main`
    position: relative; 
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;
class AdminMain extends React.Component {
    state = {
        expanded: false
    };
    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };
    renderBreadcrumbs() {
        let { breadcrumb } = this.props.main
        return (
            <Breadcrumbs>
                <Breadcrumbs.Item >
                    { breadcrumb === "Products" && <ProductsTable />}
                    { breadcrumb === "addProduct" && <AdminFormAddItem />}
                    { breadcrumb === "userList" && <UserList />}
                    { breadcrumb === "orders" && <OrderList />}
                </Breadcrumbs.Item>
            </Breadcrumbs>
        );
    }
    render() {
        const { expanded, selected } = this.state;
        return (
            <div>
                <SideNav onSelect={(b) => this.props.changeBreadcrumb(b)} onToggle={this.onToggle}>
                    <SideNav.Toggle />
                    <SideNav.Nav selected={selected}>
                        <NavItem eventKey="Products">
                            <NavIcon>
                                <i className="fa fa-fw fa-tshirt" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Products">
                            PRODUCTS
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="addProduct">
                            <NavIcon>
                                <i className="fa fa-fw fa-plus" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="Add Product">
                                Add Product
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="userList">
                            <NavIcon>
                                <i className="fa fa-fw fa-users" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="userList">
                                USERS
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="orders">
                            <NavIcon>
                                <i className="fa fa-fw fa-shopping-cart" style={{ fontSize: '1.5em', verticalAlign: 'middle' }} />
                            </NavIcon>
                            <NavText style={{ paddingRight: 32 }} title="orders">
                                Orders
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
                <Main expanded={expanded}>
                    {this.renderBreadcrumbs()}
                </Main>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { main: state.main }
}
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ changeBreadcrumb }, dispatch)
};
export default connect(mapStateToProps,matchDispatchToProps)(AdminMain)   