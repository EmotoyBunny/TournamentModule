import React, {Component} from "react";
import "./CssMainPage/AddingComponent.css"
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import ChooseGameName from "./CreatingDataStorageForm/ChooseGameName";
import ChooseGameImg from "./CreatingDataStorageForm/ChooseGameImg";
import List from "@material-ui/core/List";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TourneyList from "./CreatingDataStorageForm/TourneyList";


class Tourney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            sortPlayer: "game",
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    componentDidMount() {
        this.pushObjectTourney();
    }

    pushObjectTourney = () => {
        let list = PassageLocal("tourney");
        const listItem = [];
        let i = 0;
        while (i < list.length) {
            const object = {
                id: list[i].id,
                name: list[i].name,
                game: ChooseGameName(list[i].game),
                img: ChooseGameImg(list[i].game),
                format: list[i].format,
                prizeFund: list[i].prizeFund,
                status: list[i].status,
                who: list[i].who,
            };
            listItem.push(object);
            i++;
        }
        this.setState({array: listItem});
    }

    render() {
        let listArray = [];
        if (this.state.sortPlayer === "game") {
            listArray = this.state.array.sort((a, b) => a.game.localeCompare(b.game)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                <TourneyList getData={this.pushObjectTourney} item={item}/>
                            </List>
                        </div>);
                }
            )
        } else if (this.state.sortPlayer === "format")
            listArray = this.state.array.sort((a, b) => a.format.localeCompare(b.format)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                <TourneyList getData={this.pushObjectTourney} item={item}/>
                            </List>
                        </div>);
                }
            )
        else if (this.state.sortPlayer === "status")

            listArray = this.state.array.sort((a, b) => a.status.localeCompare(b.status)).map((item) => {
                    return (
                        <div key={item.id}>
                            <List className="root1">
                                <TourneyList getData={this.pushObjectTourney} item={item}/>
                            </List>
                        </div>);
                }
            )
        return (
            <div className="block1">
                <div className="blockButton">
                    <Link to="/addingTourney">
                        <Tooltip title="Добавить">
                            <IconButton color="primary" aria-label="Добавить">
                                <AddBoxIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                <div className="sort">
                    <FormControl size="small" variant="outlined">
                        <InputLabel>Сортировка</InputLabel>
                        <Select
                            native
                            value={this.state.sortPlayer}
                            onChange={this.handleChange}
                            label="Сортировка"
                            name='sortPlayer'
                        >
                            <option value={"game"}>По игре</option>
                            <option value={"format"}>По формату</option>
                            <option value={"status"}>По статусу</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="list">
                    {listArray}
                </div>
            </div>
        );
    }
}


export default Tourney;