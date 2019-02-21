

import React from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import './app.css';
import PostList from './postsList';

class App extends React.Component { 
    state = {
        img: "",
        postText:"",
        isPost:false,
        posts:[],
        successMsg:"",
        currentPage:1
    }
    componentDidMount() {
        this.fetchPosts(this.state.currentPage)
        window.addEventListener('scroll', this.handleScroll)
    }
    handleScroll = o =>{
        let {currentPage } = this.state
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop
        const height =  document.documentElement.scrollHeight -   document.documentElement.clientHeight
        let scrolled = winScroll / height
        scrolled = scrolled * 100
        scrolled = Math.floor(scrolled)
        if(scrolled === 100 ){
            if(currentPage > 0){
                this.fetchPosts(currentPage + 1)
            }
        }
    }
    fetchPosts = page =>{
        axios.get('/posts/find/' + page + "/5")
        .then(res=>{
            console.log(res)
            if(res.data[0]){ 
                this.setState(state=>{
                    let { posts } = state
                    posts = posts.concat(res.data)
                    return {...state,posts,currentPage:page}
                })
            }else{
                this.setState({currentPage:0})
            }
        })
    }
    guidGenerator = () => {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+""+S4()+""+S4()+""+S4());
    }
    handleClick = e =>{
        this.refs.file.click() 
    }
    upload = e => {
        let width = 500,height;
        const fileName = e.target.files[e.target.files.length -1].name;
        console.log(e.target.files)
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[e.target.files.length -1]);
        reader.onload = event => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                let ratio = img.width / img.height
                height = width /ratio
                const elem = document.createElement('canvas');
                elem.width = width;
                elem.height = height;
                const ctx = elem.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                    const file = new File([blob], fileName, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    const data = new FormData();
                    let createdAs = this.guidGenerator();
                    data.append('image', file, createdAs + ".jpg")
                    axios.post('/posts/upload', data)
                        .then(response => {
                            console.log(response)
                            this.setState({
                                img: response.data.imageUrl,
                                isPost:true
                            });
                        })
                }, 'image/jpeg', 1);
            },
                reader.onerror = error => console.log(error);
        };
        e.target.value = ''
    }
    cancelImage = e =>{
        axios.post('/posts/remove',{img:this.state.img})
        .then(res=>{
            if(res.data.deleted){
                this.setState({img:""})
            }
        })
    }
    handleSubmit = e =>{
        let { img,postText } = this.state
        let { userId } = this.props.user
        axios.post('/posts/add',{userId,img,postText})
        .then(res=>{
            console.log(res.data)
            this.setState(state=>{
                let { posts,img,postText,successMsg } = state
                posts.splice(0,0,res.data)
                img = "",
                postText = "",
                successMsg = "you are posted successfully"
                return { ...state,img,postText,successMsg,posts }
            })
        })
    }
    handleText = e =>{
        this.setState({postText:e.target.value})
    }
    sendLike = (_id,index) => {
        axios.post("/posts/sendLike",{_id})
        .then(res => {
            if(res.status === 200){
                this.setState(state=>{
                    let { posts } = state
                    posts[index].liked = true
                    posts[index].likes = posts[index].likes +1
                    return {...state,posts}
                })
            }
        } )
    }
    render() {
        let { img,postText,posts,successMsg } = this.state
        return (
            <div className="page-container" >
                {/* <input type="file" onChange={this.upload} /> */}
                <div className="add-post-box" >
                    <div className="post-box-header" >
                        <div style={{ float: "left" }} >Create Post</div>
                        <div style={{ float: "right" }} >
                            <button disabled={(!img && !postText)} onClick={this.handleSubmit} > Post</button>
                        </div>
                        <div style={{ float: "right" }} >
                            <div>
                                <button onClick={this.handleClick}  > Select Image </button>
                                <input 
                                    style={{display:"none" }} 
                                    ref="file" type="file" 
                                    onChange={this.upload} 
                                    accept="image/*"
                                    type="file" />
                            </div>
                        </div>
                    </div>
                    <div>
                        {img && <div className="preview-img" >
                            <img src={img} alt="uuu" /> 
                            <span onClick={this.cancelImage} >
                                <i className="fa fa-window-close" aria-hidden="true"></i>
                            </span>
                        </div>}
                        <div>
                            <textarea 
                                className="post-text" 
                                onChange={this.handleText}
                                value={postText}
                                placeholder="what's on your mind" 
                                type="text" />
                        </div>
                        <div>
                            { postText.length }
                        </div>
                    </div>
                </div>
                { successMsg && <div> {successMsg}  </div>}
                <div className="timeline-container" >
                    {!posts[0] && <div >no posts </div> }
                    {posts[0] && <PostList posts={posts} sendLike={this.sendLike} /> }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(App)