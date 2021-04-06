import React, {Component} from 'react';


// css table
import "./CssTable/CommmandList.css"
import PassageLocal from "./PassageLocal";
import ListDesign from "../ListDesign";



class CommandList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false
        };
    }

    delete = (del) => {
        localStorage.removeItem(del);
        let i = 0;
        while (i < this.props.item.playerList.length) {
            let object1 = PassageLocal("player");
            for (let j = 0; j < object1.length; j++) {
                if (object1[j].name === this.props.item.playerList[i]) {
                    let object = {
                        id: object1[j].id,
                        name: object1[j].name,
                        fullName: object1[j].fullName,
                        game: object1[j].game,
                        team: "",
                        who: "player",
                    }
                    localStorage.setItem(object.id, JSON.stringify(object))
                }
            }
            i++;
        }
        this.props.getData();
    };



    render() {
        return (
            <ListDesign img={this.props.item.img} name={this.props.item.name} id={this.props.item.id}
                        game={this.props.item.game} getData={() => this.delete(this.props.item.id)}/>

        );
    }
}

export default CommandList;