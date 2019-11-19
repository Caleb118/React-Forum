import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import NewPost from './newpost';
import CurrentPost from './currentpost';
import Body from './body';


class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (

            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="/"><img src="user.png" height="40px" /> myFORUM</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/newpost" className="nav-link">New Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/currentpost" className="nav-link">Current Posts</Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/newpost" component={NewPost} />
                    <Route path="/currentpost" component={CurrentPost} />
                    <Route path="/" component={Body} />
                </Switch>
            </Router>


        )
    }

}
export default Navbar