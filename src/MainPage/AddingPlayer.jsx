import React, {Component} from "react";
import {Link} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// css table
import "./CssMainPage/AddingComponent.css"

// components jsx
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";

class AddingPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            team: "",
            correctName: "false",
            fullName: "",
            who: "player",
            arrayTeam: [],
            keyFoId: "",
            keyForTeam: "",
            correctButton: true,
            count: 0,
        };
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    addItem = (id) => {
        if (this.state.team !== "" && this.props.name === undefined) {
            for (let i = 0; i < this.state.arrayTeam.length; i++) {
                if (this.state.arrayTeam[i].name === this.state.team) {
                    this.state.arrayTeam[i].playerList.push(this.state.name);
                    const command = {
                        id: this.state.arrayTeam[i].id,
                        name: this.state.arrayTeam[i].name,
                        game: this.state.arrayTeam[i].game,
                        playerList: this.state.arrayTeam[i].playerList,
                        who: "command"
                    };
                    localStorage.setItem(command.id, JSON.stringify(command));
                }
            }
        }
        if (this.props.what === "edit") {
            if (this.state.team !== this.props.team) {
                for (let i = 0; i < this.state.arrayTeam.length; i++) {
                    if (this.state.arrayTeam[i].name === this.props.team) {
                        const command = {
                            id: this.state.arrayTeam[i].id,
                            name: this.state.arrayTeam[i].name,
                            game: this.state.arrayTeam[i].game,
                            playerList: this.state.arrayTeam[i].playerList.filter(item => item !== JSON.parse(localStorage.getItem(this.state.keyForId)).name),
                            who: "command"
                        };
                        localStorage.setItem(command.id, JSON.stringify(command));
                    }
                }
            }
            if (this.state.name !== this.props.name) {
                for (let i = 0; i < this.state.arrayTeam.length; i++) {
                    if (this.state.arrayTeam[i].name === this.props.team) {
                        let list = this.state.arrayTeam[i].playerList;
                        for (let j = 0; j < list.length; j++) {
                            if (list[j] === this.props.name) {
                                list[j] = this.state.name;
                                const command = {
                                    id: this.state.arrayTeam[i].id,
                                    name: this.state.arrayTeam[i].name,
                                    game: this.state.arrayTeam[i].game,
                                    playerList: list,
                                    who: "command"
                                };
                                localStorage.setItem(command.id, JSON.stringify(command));
                            }
                        }
                    }
                }
            }
        }
        const player = {
            id: id,
            name: this.state.name,
            fullName: this.state.fullName,
            game: this.state.game,
            team: this.state.team,
            who: this.state.who
        };
        localStorage.setItem(player.id, JSON.stringify(player));
        this.props.getDataPlayers();
        this.props.getDataCommand();
    };


    componentDidMount() {
        if (this.props.what === "edit") {
            this.setState({keyForId: this.props.id, keyForTeam: this.props.team}, () => {
                this.setState({
                    id: this.props.id,
                    name: this.props.name,
                    game: this.props.game,
                    team: this.props.team,
                    fullName: this.props.fullName,
                });
            });
        }
        this.setState({arrayTeam: PassageLocal("command"), count: Math.floor(Math.random() * Math.floor(1000))});
    }


    /**
     * Составление списка команд
     * @returns список команд
     */
    commandList = () => {
        return this.state.arrayTeam.map((item, index) => {
            if (this.state.arrayTeam[index].playerList.includes(this.state.name) === false)
                return (<option key={item.id} value={item.name}>{item.name}</option>);
            return null;
        });
    }


    /**
     * выбор кнопки для редактирования/добавления
     * @returns {JSX.Element}
     */
    chooseButton = () => {
        if (this.props.what === "create" && this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3) {
            return (
                <Link to="/playerList">
                    <Button variant="contained" color="primary" size="large"
                            onClick={() => this.addItem(this.state.count)}>
                        Добавить
                    </Button>
                </Link>
            )
        } else if (this.props.what === "edit" && this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3)
            return (
                <Link to="/playerList">
                    <Button variant="contained" ccolor="primary" size="large"
                            onClick={() => this.addItem(this.state.keyForId)}>
                        Изменить
                    </Button>
                </Link>
            )
        else
            return (<div>Заполните обязательные поля!</div>);
    }

    correctForm = () => {
        return (!(this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3));
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
                                    error={this.correctForm()}
                                    label="Ваш никнейм"
                                    variant="filled"
                                    name="name" value={this.state.name} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className="text"
                                    label="Ваше ФИО"
                                    variant="filled"
                                    name="fullName" value={this.state.fullName} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl variant="filled">
                        <InputLabel>Игра</InputLabel>
                        <Select
                            className="text"
                            native
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
                        <InputLabel>Команда</InputLabel>
                        <Select
                            className="text"
                            native
                            value={this.state.team}
                            onChange={this.handleChange}
                            label="Команда"
                            name='team'
                        >
                            <option aria-label="None" value=""/>
                            <option value={this.state.team}>{this.state.team}</option>
                            {this.commandList()}
                        </Select>
                    </FormControl>
                </div>
                <div className="blockButton1">
                    {this.chooseButton()}
                </div>
            </div>
        )
    }
}

export default AddingPlayer;