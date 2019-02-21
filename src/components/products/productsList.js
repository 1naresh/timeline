
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Table } from 'reactstrap';
import { Modal,Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';

import { editProduct } from '../../actions/actions';

class ProductsList extends Component {
  state = {
    apiList: [],
    showModal: false,
    _id:"",
  }
  async componentDidMount() {
    try {
      const response = await axios.get('/products/find/all')
      const apiList = await response.data;
      this.setState({ apiList })
    } catch (error) {
      console.log(error);
    }
  }
  deleteItem = _id => {
    this.setState({showModal:true,deletingId:_id})
  }
  handleConfirm = () =>{ 
    axios.post('/products/delete', { _id:this.state.deletingId })
      .then(res => {
        this.setState(state => {
          let apiList = state.apiList.filter(item => item._id !== res.data._id)
          return { ...state, apiList,showModal:false,deletingId:"" }
        })
      })
  }
  editItem = _id =>{
    this.props.editProduct(_id)
  }

  render() {
    const { stylesTab2 } = this.props
    const { apiList } = this.state
    return (
      <div>
        <h3>Products List no</h3>
        <Table responsive striped bordered hover size="sm">
          <thead style={stylesTab2}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Id</th>
              <th>Price</th>
              <th>Image</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              apiList.map((x, index) =>
                <tr key={x._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{x.name}</td>
                  <td>{x._id}</td>
                  <td>{x.offerPrice}$</td>
                  <td>{x.img}</td>
                  <td>{x.description2.substring(0, 30) + '... '}</td>
                  <td><i onClick={() => this.editItem(x._id)} className="fa fa-fw fa-edit"></i></td>
                  <td  > <i onClick={() => this.deleteItem(x._id)} className="fas fa-trash-alt"></i> </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <Modal show={this.state.showModal} onHide={()=>this.setState({showModal:false})}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body> Are you sure want to delete this item </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={()=>this.setState({showModal:false})}>
              No
            </Button>
            <Button variant="primary" onClick={this.handleConfirm}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
};
const mapStateToProps = state =>{
  return { main:state.main }
}
const matchDispatchToProps = dispatch =>{
  return bindActionCreators({ editProduct },dispatch)
}
export default connect(mapStateToProps,matchDispatchToProps)(ProductsList);