import React, {Component} from 'react';
import {Link} from "react-router-dom";
import List from "@material-ui/core/List";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// css table
import "./CreatingDataStorageForm/CssTable/PlayerList.css"
import "./CreatingDataStorageForm/CssTable/PageCommandList.css"

// components jsx
import PlayerList from "./CreatingDataStorageForm/PlayerList";
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import ChooseGameName from "./CreatingDataStorageForm/ChooseGameName";
import ChooseGameImg from "./CreatingDataStorageForm/ChooseGameImg";

class MainPagePlayers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sortPlayer: "name",
            array: [],
        };
    }

    componentDidMount() {
        this.pushObjectPlayer();
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    pushObjectPlayer = () => {
        let list = PassageLocal("player");
        const listItem = [];
        let i = 0;
        while (i < list.length) {
            const object = {
                id: list[i].id,
                name: list[i].name,
                game: ChooseGameName(list[i].game),
                img: ChooseGameImg(list[i].game),
                fullName: list[i].fullName,
                team: list[i].team,
                who: list[i].who,
            };
            listItem.push(object);
            i++;
        }
        this.setState({array: listItem});
    }

    render() {
        let listArray = [];
        if (this.state.sortPlayer === "name") {
            listArray = this.state.array.sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                    <PlayerList getData={this.pushObjectPlayer} item={item}/>
                            </List>
                        </div>);
                }
            )
        } else if (this.state.sortPlayer === "game")
            listArray = this.state.array.sort((a, b) => a.game.localeCompare(b.game)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                    <PlayerList getData={this.pushObjectPlayer} item={item}/>
                            </List>
                        </div>);
                }
            )
        return (
            <div className="block1">
                <div className="blockButton">
                    <Link to="/addingPlayer">
                        <Tooltip title="????????????????">
                            <IconButton color="primary" aria-label="????????????????">
                                <AddBoxIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                <div className="sort3">
                    <div className="sort1">
                    <FormControl size="small" variant="outlined">
                        <InputLabel>????????????????????</InputLabel>
                        <Select
                            native
                            value={this.state.sortPlayer}
                            onChange={this.handleChange}
                            label="????????????????????"
                            name='sortPlayer'
                        >
                            <option value={"name"}>???? ????????????????</option>
                            <option value={"game"}>???? ????????</option>
                        </Select>
                    </FormControl>
                    </div>
                </div>
                <div className="list">
                    {listArray}
                </div>
            </div>
        );
    }
}

export default MainPagePlayers;
