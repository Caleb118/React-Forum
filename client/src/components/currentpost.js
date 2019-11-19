import React from 'react';
import axios from 'axios';

class CurrentPost extends React.Component {

    constructor(props) {
        super(props);

        this.editPost = React.createRef();
        this.editName = React.createRef();

        this.state = {
            newdata: [],
            random: null,
            loading: true,
        };
    }


    componentDidMount() {
        this.updateData();
        this.setState({ loading: false })
    }

    updateData() {

        axios.get('http://localhost:5000/getdata')
            .then((response) => {
                this.setState({ newdata: response.data })
            })
            .then((response) => {
                let x = 0;
                this.state.newdata.map((data) => {
                    data.id = x;
                    data.edit = false;
                    console.log(data.id)
                    x++;

                    this.forceUpdate();
                })
            })
            .then((response) => {
                this.forceUpdate();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    changeEdit(param) {
        this.state.newdata.map((data) => data.edit = false)
        this.state.newdata[param].edit = true;
        this.forceUpdate();
    }

    handleEdit(p1, p2, p3) {
        let editData = { id: p1, name: p2, post: p3 };

        console.log('doing edit')
        axios.post('http://localhost:5000/editdata', editData)
            .then(res => {
                console.log('testing')
                this.updateData();
            })
        this.state.newdata[p1].edit = false;

    }

    handleDelete(param) {
        console.log('You wanted to delete: ' + param);
        let deletePost = { id: param };
        axios.post('http://localhost:5000/deldata', deletePost)
            .then(res => {
                this.updateData();
            })
    }


    render() {


        const cards = this.state.newdata.map((val) => {
            if (val.edit === true) {
                return (
                    <div key={val.id} className="card bg-light mb-3 post-data" >
                        <div className="card-header">
                            <div className="row">
                                <div className="col-3 text-left">
                                    <input type="submit" className="btn btn-primary" value="Update" onClick={() => { this.handleEdit(val.id, this.editName.current.value, this.editPost.current.value) }} />
                                </div>
                                <div className="col-8 text-center my-auto">
                                    <input type="text" ref={this.editName} className="form-control" placeholder="Your name here" defaultValue={val.name} name="myname" />
                                </div>

                            </div>
                        </div>
                        <div className="card-body">
                            <input type="text" ref={this.editPost} className="form-control" placeholder="Your message here" defaultValue={val.post} name="mypost" />
                        </div>
                    </div>
                )
            } else {
                return (
                    <div key={val.id} className="card bg-light mb-3 post-data" >
                        <div className="card-header">
                            <div className="row">
                                <div className="col-3 text-left">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Action</a>
                                            <div className="dropdown-menu" x-placement="bottom-start">
                                                <a className="dropdown-item" onClick={() => { this.handleDelete(val.id) }}>Delete</a>
                                                <a className="dropdown-item" onClick={() => { this.changeEdit(val.id) }} >Edit</a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-6 text-center my-auto">
                                    <h5>{val.name}</h5>
                                </div>
                                <div className="col-3 text-right">

                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{val.post}</p>
                        </div>
                    </div>
                )
            }
        })


        if (this.state.loading === false) {
            return (
                <div>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active">Current Posts</li>
                    </ol>

                    <div className="col-sm text-center">
                        <div className="text-center">
                            {cards}
                        </div>
                    </div>

                </div>

            )
        } else {
            return (
                <p>Loading..</p>
            )
        }

    }

}

export default CurrentPost;