import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import {Typography} from "@material-ui/core";


class AddingTourney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            game: "",
            format: "",
            prizeFund: "",
            status: "edit",
            who: "tourney",
            key: "",
            array: [],
            arrayTourney: [],
            players: "",
            count: 0,
            listFormat: [],
            gridTourney: [],
        };
    }

    addItem = (id) => {
        let listFormat;
        if (this.props.what === "edit" && this.props.format !== this.state.format) {
            listFormat = [];
        } else
            listFormat = this.state.listFormat;
        const tourney = {
            id: id,
            name: this.state.name,
            game: this.state.game,
            format: this.state.format,
            prizeFund: this.state.prizeFund,
            status: this.state.status,
            who: this.state.who,
            listFormat: listFormat,
            gridTourney: this.state.gridTourney,
        };
        localStorage.setItem(tourney.id, JSON.stringify(tourney));
        this.props.getDataTourney();
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
                    format: this.props.format,
                    prizeFund: this.props.prizeFund,
                    status: this.props.status,
                    listFormat: this.props.listFormat,
                    gridTourney: this.props.gridTourney,
                });
            });
        }
        this.setState({arrayTeam: PassageLocal("tourney"), count: Math.floor(Math.random() * Math.floor(1000))});
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };


    chooseButton = () => {
        if (this.props.what === "create")
            return (
                <Link to={"/addingFormatTourney/" + this.state.count}>
                    <Button variant="contained" disabled={this.correctForm()} color="primary" size="large"
                            onClick={() => this.addItem(this.state.count)}>
                        ????????????????????
                    </Button>
                </Link>
            );
        else if (this.props.what === "edit")
            return (<div className="blockButton5">
                    <div className="blockButton6">
                        <Link to={"/" + this.state.key}>
                            <Button variant="contained" disabled={this.correctForm()} color="primary" size="large"
                                    onClick={() => this.addItem(this.state.key)}>
                                ??????????????????
                            </Button>
                        </Link>
                    </div>
                    <div className="blockButton6">
                        <Link to={"/editFormatTourney/" + this.state.key}>
                            <Button variant="contained" disabled={this.correctForm()} color="primary" size="large"
                                    onClick={() => this.addItem(this.state.key)}>
                                ????????????????????
                            </Button>
                        </Link>
                    </div>
                </div>
            );
    }

    correctForm = () => {
        return !(this.state.name !== "" && this.state.name.length < 15 && this.state.name.length >= 3 && this.state.game !== "" && this.state.format !== "")
    }


    topInscription=(what)=>{
        if(what === "edit")
            return (<Typography color="primary" variant="h6" paragraph={true} className="blockName">???????????????????????????? ??????????????</Typography>);
    }

    render() {
        return (
            <div className="blockAll">
                {this.topInscription(this.props.what)}
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className="text"
                                    required
                                    id="outlined-required"
                                    label="???????????????? ??????????????"
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
                        <InputLabel>????????</InputLabel>
                        <Select
                            className="text"
                            native
                            value={this.state.game}
                            onChange={this.handleChange}
                            label="????????"
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
                <div className="blockGame">
                    <FormControl required variant="filled">
                        <InputLabel>????????????</InputLabel>
                        <Select
                            className="text"
                            native
                            value={this.state.format}
                            onChange={this.handleChange}
                            label="????????????"
                            name='format'
                        >
                            <option aria-label="None" value=""/>
                            <option value={"command2"}>?????????????????? 2x2</option>
                            <option value={"command3"}>?????????????????? 3x3</option>
                            <option value={"command4"}>?????????????????? 4x4</option>
                            <option value={"command5"}>?????????????????? 5x5</option>
                            <option value={"player"}>??????????????????</option>
                        </Select>
                    </FormControl>
                </div>
                <div className="blockName">
                    <div>
                        <form noValidate autoComplete="off">
                            <div>
                                <TextField
                                    className="text"
                                    label="???????????????? ????????"
                                    variant="filled"
                                    color="primary"
                                    name="prizeFund" value={this.state.prizeFund} onChange={this.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="blockGame">
                    <FormControl variant="filled">
                        <InputLabel>????????????</InputLabel>
                        <Select
                            className="text"
                            native
                            value={this.state.status}
                            onChange={this.handleChange}
                            label="????????????"
                            name='status'
                            disabled
                        >
                            <option value={"edit"}>??????????????????????????</option>
                            <option value={"start"}>??????????</option>
                            <option value={"stop"}>????????????????</option>
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

export default AddingTourney;