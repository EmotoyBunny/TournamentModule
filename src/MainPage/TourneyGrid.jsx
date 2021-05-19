import React, {Component} from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";


import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Typography from "@material-ui/core/Typography";
import DoneAllIcon from '@material-ui/icons/DoneAll';


class TourneyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            countTable1: 4,
            array: [],
            countRound: 0,
            final: true,
            status: "start",
        };
    }

    componentDidMount() {
        this.updateList();
    }

    updateList = () => {
        let array = this.props.gridTourney;
        let id = 1;
        let count =0;
        let len=this.props.listFormat.length;
        for(let i = 0; i < len; i++){
            count++;
            len=len/2;
        }
        if (array.length === 0) {
                    for (let i = 0; i < this.props.listFormat.length; i = i + 2) {
                        array.push({
                            roundType: 1,
                            id: id,
                            player1: this.props.listFormat[i],
                            player2: this.props.listFormat[i + 1],
                            status: 3,
                        })
                        id++;
                    }
                    for (let g = 2; g < count; g++) {
                        let list = [];
                        for (let j = 0; j < array.length; j++) {
                            if (array[j].roundType === g - 1)
                                list.push(array[g])
                        }
                        for (let j = 0; j < list.length / 2; j++)
                            array.push({
                                roundType: g,
                                id: j + 1,
                                player1: "",
                                player2: "",
                                status: 3,
                            })
                    }
            array.push({
                roundType: "final",
                id: 1,
                player: "",
            })
            }

        this.setState({array: array});
    }


    handleClick = (round, player, index) => {
        let array = this.state.array;
        for (let i = 0; i < array.length; i++) {
            if (index / 2 === array[i].id && array[i].roundType === round + 1)
                array[i].player2 = player;
            else if ((index + 1) / 2 === array[i].id && array[i].roundType === round + 1)
                array[i].player1 = player;
            else if (array[array.length - 2].roundType === round)
                array[array.length - 1].player = player;
        }
        let status="start";
        if (array[array.length - 1].player !== "")
            status="stop"
        let object = JSON.parse(localStorage.getItem(this.props.id));
        let object1 = {
            id: object.id,
            name: object.name,
            game: object.game,
            format: object.format,
            prizeFund: object.prizeFund,
            status: status,
            who: object.who,
            listFormat: object.listFormat,
            gridTourney: array,
        };
        localStorage.setItem(object1.id, JSON.stringify(object1));
        this.setState({array: array});
        this.props.getDataTourney();
    }

    createGrid = () => {
        return this.state.array.map((item, index) => {
            let round;
            if (index === 0 || item.roundType !== this.state.array[index - 1].roundType)
                round = <Typography component={'span'} className="blockText" align="left" variant="body1">
                    {"Раунд " + item.roundType}
                </Typography>
            if (item.roundType === "final") {
                let final = true;
                if (item.player !== "")
                    final = false;
                return (
                    <div key={index} className="blockTableFinal">
                        <Typography component={'span'} className="blockText" align="left" variant="body1">
                            Финал
                        </Typography>
                        <TableContainer className="table" component={Paper}>
                            <Table className="table" size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">
                                            <div>
                                                {item.player}
                                                <Tooltip color="primary" title="Победитель">
                                                    <div>
                                                    <IconButton disabled={final}
                                                                aria-label="delete">
                                                        <DoneAllIcon fontSize="small"/>
                                                    </IconButton>
                                                    </div>
                                                </Tooltip>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </div>)
            } else {
                let button = true;
                if (item.player1 !== "" && item.player2 !== "" && this.state.array[this.state.array.length - 1].player === "")
                    button = false;

                return <div key={index} className="blockTable">
                    {round}
                    <TableContainer className="table" component={Paper}>
                        <Table className="table" size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">
                                        <div>
                                            {item.player1}
                                            <Tooltip color="primary" title="Выбрать">
                                                <div>
                                                <IconButton disabled={button}
                                                            onClick={() => this.handleClick(item.roundType, item.player1, item.id)}
                                                            aria-label="delete">
                                                    <KeyboardArrowRightIcon fontSize="small"/>
                                                </IconButton>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell align="left">
                                        <div>
                                            {item.player2}
                                            <Tooltip color="primary" title="Выбрать">
                                                <div>
                                                <IconButton disabled={button}
                                                            onClick={() => this.handleClick(item.roundType, item.player2, item.id)}
                                                            aria-label="delete">
                                                    <KeyboardArrowRightIcon fontSize="small"/>
                                                </IconButton>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        })

    }


    render() {
        return (
            <div className="blockTable">
                {this.createGrid()}
            </div>);
    }
}

export default TourneyGrid;