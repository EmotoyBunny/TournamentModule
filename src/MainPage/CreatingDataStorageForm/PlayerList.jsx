import React, {Component} from 'react';


// css table
import "./CssTable/PlayerList.css"
import PassageLocal from "./PassageLocal";
import ListDesign from "../ListDesign";


class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    /**
     * метод удаления данных
     * @param del - ключ удаляемого элемента
     */
    delete = (del) => {
        localStorage.removeItem(del);
        if (this.props.item.team !== "") {
            let object1 = PassageLocal("command");
            for (let i = 0; i < object1.length; i++) {
                if (object1[i].team === this.state.team) {
                    const command = {
                        id: object1[i].id,
                        name: object1[i].name,
                        game: object1[i].game,
                        playerList: object1[i].playerList.filter(item => item !== this.props.item.name),
                        who: "command"
                    };
                    localStorage.setItem(command.id, JSON.stringify(command));
                }
            }
        }
        this.props.getData();
    };


    render() {
        return (
            <ListDesign img={this.props.item.img} name={this.props.item.name} id={this.props.item.id} team={this.props.item.team}
                        game={this.props.item.game} getData={() => this.delete(this.props.item.id)} who={this.props.item.who}/>
        );
    }
}

export default PlayerList;