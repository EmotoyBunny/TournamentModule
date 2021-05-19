import React, {Component} from 'react';


// css table
import "./CssTable/CommmandList.css"
import ListDesign from "../ListDesign";


class TourneyList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    delete = (del) => {
        localStorage.removeItem(del);
        this.props.getData();
    };


    render() {
        return (
            <ListDesign img={this.props.item.img} name={this.props.item.name} id={this.props.item.id}  format={this.props.item.format}
                        game={this.props.item.game} getData={() => this.delete(this.props.item.id)}
                        who={this.props.item.who} status={this.props.item.status}/>
        );
    }
}

export default TourneyList;