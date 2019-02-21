import React, { Component } from 'react';
import { Button, Input, Form, FormGroup, Label, Container } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeBreadcrumb } from '../../actions/actions'

class AdminFormAddItem extends Component {
  state = {
    _id:"",
    modalEdit: false,
    name: 'saree1',
    offerPrice: 10,
    originalPrice: 20,
    description1: 'd1',
    description2: "d2",
    gender: "Female",
    available: true ,
    img: '',
    color: "red",
    Type: "ty", 
    category: "sarees",
    images: [],
    message: '',
    isUploading:false
  };
  componentDidMount(){
    if(this.props.main.product_id){
      axios.get("/products/findOne/"+ this.props.main.product_id)
      .then(res=>{
        let { _id,name, offerPrice, originalPrice, description1, description2, gender, available,img, color, Type, category } = res.data
        this.setState({ _id,name, offerPrice, originalPrice, description1, description2, gender, available,img, color, Type, category})
      })
    }
  }
  toggle = () => {
    this.setState({
      modalEdit: !this.state.modalEdit
    });
  }
  selectImages = (event) => {
    this.setState({isUploading:true})
    let images = [],name;
    let { product_id } = this.props.main
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`
    const uploaders = images.map(image => {
      const data = new FormData();
      if(product_id){
        name = this.state.img.split("/")
        name = name[name.length - 1]
      }else name = image.name 
      data.append("image", image, name);

      // Make an AJAX upload request using Axios
      return axios.post('/products/upload', data)
        .then(response => {
          console.log(response)
          this.setState({
            img: response.data.imageUrl,
            images,message,
            isUploading:false
          });
        })
    });

    axios.all(uploaders).then(() => {
      console.log('done');
    }).catch(err => alert(err.message));
  }
  onSubmit = () => {
    let {_id,name,offerPrice,originalPrice,description1,description2,gender,available,img,color,Type,category } = this.state
    axios.post('/products/add',{ _id,name,offerPrice,originalPrice,description1,description2,gender,available,img,color,Type,category }  )
    .then(res => {
      this.props.changeBreadcrumb("Products")
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleGender = e =>{
    this.setState({gender:e.target.name})
  }
  handleAvailability = e =>{
    this.setState({available:Boolean(parseInt(e.target.name,10))})
  }
  render() {
    let { product_id } = this.props.main
    const { name, offerPrice, originalPrice, description1,img, description2, gender, available, color, Type, category } = this.state
    return (
      <Container style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        { !product_id && <h2>Add new item</h2>}
        { product_id && <h2>UpdateItem</h2>}
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Item's name</Label>
            <Input name="name" value={name} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Original Price</Label>
            <Input name="originalPrice" value={originalPrice} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Offer Price</Label>
            <Input name="offerPrice" value={offerPrice} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description1</Label>
            <Input name="description1" value={description1} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Description1</Label>
            <Input name="description2" value={description2} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Gender</Label>
            <div> <Input type="radio" checked={gender === "Female"} name="Female" onChange={this.handleGender} />Female</div> 
            <div> <Input type="radio" checked={gender === "Male"} name="Male" onChange={this.handleGender} />Male</div> 
          </FormGroup>
          <FormGroup>
            <Label for="Available">Available</Label>
            <div><Input type="radio" checked={available === true} name="1"  onChange={this.handleAvailability} />Yes</div>
            <div><Input type="radio" checked={available === false} name="0" onChange={this.handleAvailability} />No</div>
          </FormGroup>
          <FormGroup>
            <Label for="Available">Image</Label>
            <Input name="img" type="file" onChange={this.selectImages} />
          </FormGroup>
          <FormGroup>
            <Label for="Available">Color</Label>
            <Input name="color" value={color} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="Type">Type</Label>
            <Input name="Type" value={Type} onChange={this.handleChange} />
          </FormGroup>
          {/* <FormGroup>
            <Label for="Available">Category</Label>
            <Input name="category" value={category} onChange={this.handleChange} />
          </FormGroup> */}
          <FormGroup>
          <Label for="exampleSelect">Category</Label>
          <Input type="select" name="category" value={category} onChange={this.handleChange} >
            <option> blouse </option>
            <option> kurtas </option>
            <option> sarees </option>
          </Input>
        </FormGroup>
        </Form>
        <Button disabled={this.state.isUploading} onClick={() => this.onSubmit()}>Submit</Button>
      </Container>
    );
  }
}
const mapStateToProps = state => {
    return { main: state.main }
}
const matchDispatchToProps = dispatch => {
    return bindActionCreators({ changeBreadcrumb }, dispatch)
};
export default connect(mapStateToProps,matchDispatchToProps)(AdminFormAddItem)   