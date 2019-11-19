import React from 'react';

class Body extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {

        return (
            <div>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active">Home</li>
                </ol>
    
                <div className="container">
                    <h1>This is my body.</h1>
                </div>
            </div>
        )

    }

}

export default Body;