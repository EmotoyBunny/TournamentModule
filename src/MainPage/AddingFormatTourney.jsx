import React, {Component} from "react";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import PassageLocal from "./CreatingDataStorageForm/PassageLocal";
import chooseFormat from "./CreatingDataStorageForm/ChooseFormat";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import LoupeIcon from "@material-ui/icons/Loupe";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

class AddingFormatTourney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            who: "tourney",
            key: "",
            array: [],
            arrayTourney: [],
            count: 0,
            playerOrCommand: "",
            list: [],
        };
    }

    componentDidMount() {
        if (this.props.what === "edit")
            this.setState({key: this.props.id, list: this.props.listFormat});

        if (this.props.format === "player")
            this.setState({array: PassageLocal("player")});
        else
            this.setState({array: PassageLocal("command")});
    }

    addListLocal = (id) => {
        let object = JSON.parse(localStorage.getItem(id));
        let status;
        if (this.props.what === "create" && (this.state.list.length === 2 || this.state.list.length % 4 === 0) && this.state.list.length !== 0)
            status = "start"
        else if (object.status === "stop")
            status = "stop"
        else
            status = "edit"
        let object1 = {
            id: object.id,
            name: object.name,
            game: object.game,
            format: object.format,
            prizeFund: object.prizeFund,
            status: status,
            who: object.who,
            listFormat: this.state.list,
            gridTourney: this.props.gridTourney,
        };
        localStorage.setItem(object1.id, JSON.stringify(object1));
        this.props.getDataTourney();
        this.props.getDataPlayers();
        this.props.getDataCommand();
    }

    chooseButton = () => {
        if ((this.state.list.length === 2 || this.state.list.length % 4 === 0) && this.state.list.length !== 0)
            if (this.props.what === "create")
                return (
                    <Link to={"/tourney"}>
                        <Button variant="contained" color="primary" size="large"
                                onClick={() => this.addListLocal(this.props.id)}>
                            Начать турнир
                        </Button>
                    </Link>
                );
            else
                return (
                    <Link to={"/" + this.props.id}>
                        <Button variant="contained" color="primary" size="large"
                                onClick={() => this.addListLocal(this.props.id)}>
                            Сохранить
                        </Button>
                    </Link>
                );
        if (this.props.format === "player")
            return (<div>
                <div className="blockButton5">
                    <div className="blockButton6">
                        Недостаточно игроков!
                    </div>
                    <div className="blockButton6">
                        <Link to={"/tourney"}>
                            <Button variant="contained" color="primary" size="large"
                                    onClick={() => this.addListLocal(this.props.id)}>
                                Сохранить и вернуться назад
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>);
        else
            return (
                <div>
                    <div className="blockButton5">
                        <div className="blockButton6">
                            Недостаточно команд!
                        </div>
                        <div className="blockButton6">
                            <Link to={"/tourney"}>
                                <Button variant="contained" color="primary" size="large"
                                        onClick={() => this.addListLocal(this.props.id)}>
                                    Сохранить и вернуться назад
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>);
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleDelete = (del) => {
        const array = this.state.list.filter(item => item !== del)
        this.setState({list: array});
    }

    list = () => {
        if (this.props.format === "player")
            return this.state.array.map((item) => {
                if (this.state.list.includes(item.name) === false)
                    return (<option key={item.id} value={item.name}>{item.name}</option>);
                return null;
            });
        else
            return this.state.array.map((item, index) => {
                if (this.state.array[index].playerList.length === chooseFormat(this.props.format) && this.state.list.includes(item.name) === false)
                    return (<option key={item.id} value={item.name}>{item.name}</option>);
                return null;
            });
    }

    addingList = () => {
        if (this.state.playerOrCommand !== "") {
            const array = this.state.list;
            array.push(this.state.playerOrCommand)
            this.setState({list: array, playerOrCommand: ""});
        }
    }

    outPutPlayer = () => {
        const array = this.state.list;
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


    inputLabel = () => {
        if (this.props.format === "command")
            return <InputLabel>Команды</InputLabel>;
        else
            return <InputLabel>Игроки</InputLabel>
    }

    render() {
        return (
            <div className="blockAll">
                <div className="blockCommand">
                    <FormControl variant="filled">
                        {this.inputLabel()}
                        <Select
                            native
                            className="select"
                            value={this.state.playerOrCommand}
                            onChange={this.handleChange}
                            label="Игроки"
                            name='playerOrCommand'
                        >
                            <option value={this.state.playerOrCommand}>{this.state.playerOrCommand}</option>
                            {this.list()}
                        </Select>
                    </FormControl>
                    <Tooltip color="primary" title="Добавить игрока">
                        <IconButton onClick={() => this.addingList()} aria-label="Добавить">
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

export default AddingFormatTourney;
