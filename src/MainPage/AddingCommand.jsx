import React, {Component} from "react";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LoupeIcon from '@material-ui/icons/Loupe';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import IconButton from "@material-ui/core/IconButton";

// css table
import "./CssMainPage/AddingComponent.css"

// jsx components
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import Tooltip from "@material-ui/core/Tooltip";

class AddingCommand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            playerList: [],
            correctName: false,
            correctGame: false,
            who: "command",
            key: "",
            array: [],
            arrayTeam: [],
            players: "",
            count: 0,
        };
    }


    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    /**
     * Метод добавления введеных данных команды в localStorage с последующей проверкой
     * на присутствии игрока из полученных данных и уже существующего в localeStorage.
     * Если совпадение найдено, обновляет данные команды этого игрока.
     */
    addItem = (id) => {
        let i = 0;
        while (i < this.state.playerList.length) {
            for (let j = 0; j < this.state.arrayTeam.length; j++) {
                if (this.state.arrayTeam[j].name === this.state.playerList[i]) {
                    let object = {
                        id: this.state.arrayTeam[j].id,
                        name: this.state.arrayTeam[j].name,
                        fullName: this.state.arrayTeam[j].fullName,
                        game: this.state.arrayTeam[j].game,
                        team: this.state.name,
                        who: "player",
                    }
                    localStorage.setItem(object.id, JSON.stringify(object))
                }
            }
            i++;
        }
        const command = {
            id: id,
            name: this.state.name,
            game: this.state.game,
            playerList: this.state.playerList,
            who: this.state.who
        };
        localStorage.setItem(command.id, JSON.stringify(command));
        this.props.getDataPlayers();
        this.props.getDataCommand();
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            this.setState({key: this.props.id}, () => {
                this.setState({
                    id: this.props.id,
                    name: this.props.name,
                    game: this.props.game,
                    playerList: this.props.playerList,
                });
            });
        }
        this.setState({arrayTeam: PassageLocal("player"), count: Math.floor(Math.random() * Math.floor(1000))});
    }


    playerList = () => {
        return this.state.arrayTeam.map((item, index) => {
            if (this.state.playerList.includes(item.name) === false && this.state.arrayTeam[index].team === "")
                return (<option key={item.id} value={item.name}>{item.name}</option>);
            return null;
        });
    }

    /**
     * выбор кнопки для редактирования/добавления
     * @returns {JSX.Element}
     */
    chooseButton = () => {
        if (this.props.what === "create" && this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3 && this.state.game !== "")
            return (
                <Link to="/commandList">
                    <Button variant="contained" color="primary" size="large"
                            onClick={() => this.addItem(this.state.count)}>
                        Добавить
                    </Button>
                </Link>
            );
        else if (this.props.what === "edit" && this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3 && this.state.game !== "")
            return (
                <Link to="/commandList">
                        <Button variant="contained" color="primary" size="large"
                                onClick={() => this.addItem(this.state.key)}>
                            Изменить
                        </Button>
                </Link>
            );
        else
            return (<div>Заполните обязательные поля!</div>);
    }

    addingPlayer = () => {
        if (this.state.players !== "") {
            const array = this.state.playerList;
            array.push(this.state.players)
            this.setState({playerList: array, players: ""});
        }
    }

    handleDelete = (del) => {
        const array = this.state.playerList.filter(item => item !== del)
        this.setState({playerList: array});
        let object = PassageLocal("player");
        for (let j = 0; j < object.length; j++) {
            if (object[j].team === this.state.name) {
                let object1 = {
                    id: object[j].id,
                    name: object[j].name,
                    fullName: object[j].fullName,
                    game: object[j].game,
                    team: "",
                    who: "player",
                }
                localStorage.setItem(object1.id, JSON.stringify(object1))
            }
        }
    }


    outPutPlayer = () => {
        const array = this.state.playerList;
        const listItems = array.map((items, index) =>
            <div key={index} className="blockPlayers">
                <Chip
                    icon={<FaceIcon/>}
                    label={items}
                    onDelete={() => this.handleDelete(items)}
                    color="primary"
                    variant="outlined"
                />
            </div>
        );
        return (<div className="blockName">{listItems}</div>);
    };

    correctForm = (form) => {
        if (form === "name" && this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3) {
            return false;
        } else if (this.state.game !== "" && form === "game") {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className="blockAll">
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className="text"
                                    required
                                    error={this.correctForm("name")}
                                    id="outlined-required"
                                    label="Название Команды"
                                    variant="filled"
                                    color="primary"
                                    name="name" value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl required variant="filled">
                        <InputLabel>Игра</InputLabel>
                        <Select
                            className="text"
                            native
                            error={this.correctForm("game")}
                            value={this.state.game}
                            onChange={this.handleChange}
                            label="Игра"
                            name='game'
                        >
                            <option aria-label="None" value=""/>
                            <option value={"cs_go"}>Counter-Strike: Global Offensive</option>
                            <option value={"call_of_duty"}>Call of Duty: Warzone</option>
                            <option value={"clash_royal"}>Clash Royale</option>
                            <option value={"dead_by_daylight"}>Dead by Daylight</option>
                            <option value={"dota_2"}>Dota 2</option>
                            <option value={"hearthstone"}>Hearthstone</option>
                            <option value={"heroes_of_the_storm"}>Heroes of the Storm</option>
                            <option value={"league_of_legends"}>League of Legends</option>
                            <option value={"mortaL_combat"}>Mortal Kombat X</option>
                            <option value={"overwatch"}>Overwatch</option>
                            <option value={"quake"}>Quake Champions</option>
                            <option value={"rainbow_six_siege"}>Tom Clancy's Rainbow Six Siege</option>
                            <option value={"rocket_league"}>Rocket League</option>
                            <option value={"smite"}>SMITE</option>
                            <option value={"starcraft"}>StarCraft II</option>
                            <option value={"valorant"}>VALORANT</option>
                            <option value={"team_fortress"}>Team Fortress 2</option>
                            <option value={"tekken7"}>TEKKEN 7</option>
                            <option value={"warface"}>Warface</option>
                            <option value={"world_of_tanks"}>World of Tanks</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="blockCommand">
                    <FormControl variant="filled">
                        <InputLabel>Игроки</InputLabel>
                        <Select
                            native
                            className="select"
                            value={this.state.players}
                            onChange={this.handleChange}
                            label="Игроки"
                            name='players'
                        >
                            <option value={this.state.players}>{this.state.players}</option>
                            {this.playerList()}
                        </Select>
                    </FormControl>
                    <Tooltip color="primary" title="Добавить игрока">
                        <IconButton onClick={() => this.addingPlayer()} aria-label="Добавить">
                            <LoupeIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="blockCommand">
                    {this.outPutPlayer()}
                </div>
                <div className="blockButton1">
                    {this.chooseButton()}
                </div>
            </div>
        )
    }
}

export default AddingCommand;