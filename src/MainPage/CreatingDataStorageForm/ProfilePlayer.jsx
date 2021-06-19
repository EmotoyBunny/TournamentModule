import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import chooseGameName from "./ChooseGameName";
import Avatar from "@material-ui/core/Avatar";
import {Link} from 'react-router-dom';
import chooseGame from "./ChooseGameImg";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PassageLocal from "./PassageLocal";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import List from "@material-ui/core/List";
import ChooseGameImg from "./ChooseGameImg";
import ForTourneyList from "./ForTourneyList";


import TourneyGrid from "../TourneyGrid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        paddingTop: 30,
    },
    section1: {
        width: '100%',
        height: 150,
    },
    section2: {
        margin: 20,
    },
    section4: {
        display: "inline-block",
        verticalAlign: "middle",
    },
    section6: {
        display: "inline-block",
        marginLeft: 30,
        verticalAlign: "middle",
    },
    section8: {
        display: "inline-block",
        marginLeft: 30,
        verticalAlign: "middle",
        textAlign: "right"
    },
    section5: {
        marginLeft: 50,
        textAlign: "left",
    },
    section7: {
        paddingTop: 10,
        marginLeft: 60,
        textAlign: "left",
    },
    section3: {
        paddingBottom: 15,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    root1: {
        width: '90%',
    }
}));

export default function ProfilesPlayer(props) {
    const classes = useStyles();
    let fullName = "";
    let arrayPlayers = [];
    let nameTeam;
    let gridTourney;
    let status;

    if (props.who === "player") {
        if (props.fullName !== "")
            fullName =
                <div>
                    <Typography component={'span'} color="textSecondary" variant="body2">
                        ФИО: {props.fullName}
                    </Typography>
                </div>
        if (props.team === "")
            nameTeam = <span className={classes.section2}>
                <Typography component={'span'} variant="body1">
                    Не состоит в команде
                </Typography>
            </span>
        else {
            let list = PassageLocal("command");
            for (let i = 0; i < list.length; i++) {
                if (list[i].name === props.team) {
                    arrayPlayers =
                        <div>
                            <List className={classes.root1}>
                                <Divider variant="inset"/>
                                <ListItem alignItems="flex-start">
                                    <Divider variant="inset"/>
                                    <ListItemAvatar>
                                        <Avatar variant='rounded' src={ChooseGameImg(list[i].game)}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={list[i].name}
                                        secondary={
                                            <React.Fragment>
                                                {list[i].game}
                                            </React.Fragment>
                                        }
                                    />
                                    <Link to={"/" + list[i].id}>
                                        <Tooltip title="Узнать больше">
                                            <IconButton color="primary" aria-label="to learn more">
                                                <PersonIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </ListItem>
                                <Divider variant="inset"/>
                            </List>
                        </div>
                }
            }
            nameTeam =
                <div>
                    <Typography component={'span'} className={classes.section3} variant="body1">
                        Участник команды: {arrayPlayers}
                    </Typography>
                </div>
        }
    } else if (props.who === "command") {
        if (props.playerList.length === 0) {
            nameTeam = <div className={classes.section2}>
                <Typography component={'span'} variant="body1">
                    Нет участников
                </Typography>
            </div>;
        } else {
            let list = PassageLocal("player");
            arrayPlayers = props.playerList.map((items, index) => {
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].name === items) {
                            return (
                                <div key={index} className={classes.div}>
                                    <List className={classes.root1}>
                                        <Divider variant="inset"/>
                                        <ListItem alignItems="flex-start">
                                            <Divider variant="inset"/>
                                            <ListItemAvatar>
                                                <Avatar variant='rounded' src={ChooseGameImg(list[i].game)}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={list[i].name}
                                                secondary={
                                                    <React.Fragment>
                                                        {list[i].game}
                                                    </React.Fragment>
                                                }
                                            />
                                            <Link to={"/" + list[i].id}>
                                                <Tooltip title="Узнать больше">
                                                    <IconButton color="primary" aria-label="to learn more">
                                                        <PersonIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Link>
                                        </ListItem>
                                    </List>
                                </div>
                            )
                        }
                    }
                    return null;
                }
            );
            nameTeam = <div className={classes.section3}>
                <Typography component={'span'} variant="body1">
                    Участники команды: {arrayPlayers}
                </Typography>
            </div>;
        }
    } else if (props.who === "tourney") {
        let listFormat = [];
        if (props.format === "player")
            listFormat = PassageLocal("player");
        else
            listFormat = PassageLocal("command");
        let team;

        arrayPlayers = props.listFormat.map((items, index) => {
            for (let i = 0; i < listFormat.length; i++) {
                if (listFormat[i].name === items) {
                    if (listFormat[i].team !== "")
                        team = <ListItemText
                            primary={listFormat[i].name}
                            secondary={
                                <Typography color="textSecondary" component={'span'}>
                                    <div className="blockForList">
                                        <React.Fragment>
                                            {listFormat[i].game}
                                        </React.Fragment>
                                    </div>
                                    <div className="blockForList">
                                        <React.Fragment>
                                            Участник команды: {listFormat[i].team}
                                        </React.Fragment>
                                    </div>
                                </Typography>
                            }
                        />
                    else
                        team = <ListItemText
                            primary={listFormat[i].name}
                            secondary={
                                <React.Fragment>
                                    {listFormat[i].game}
                                </React.Fragment>
                            }
                        />
                    return (
                        <div key={index} className={classes.div}>
                            <List className={classes.root1}>
                                <Divider variant="inset"/>
                                <ListItem alignItems="flex-start">
                                    <Divider variant="inset"/>
                                    <ListItemAvatar>
                                        <Avatar variant='rounded' src={ChooseGameImg(listFormat[i].game)}/>
                                    </ListItemAvatar>
                                    {team}
                                    <Link to={"/" + listFormat[i].id}>
                                        <Tooltip title="Узнать больше">
                                            <IconButton color="primary" aria-label="to learn more">
                                                <PersonIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </Link>
                                </ListItem>
                                <Divider variant="inset"/>
                            </List>
                        </div>
                    )
                }
            }
            return null;
        });

        if (props.listFormat.length !== 0) {
            nameTeam =
                <div className={classes.section3}>
                    <ForTourneyList array={arrayPlayers}/>
                </div>
        }
        if ((props.listFormat.length === 2 || props.listFormat.length % 4 === 0) && props.listFormat.length !== 0)
            gridTourney = <TourneyGrid listFormat={props.listFormat} id={props.id} gridTourney={props.gridTourney}
                                       getDataTourney={props.getDataTourney}/>
        if (props.status === "stop") {
            status = <div>
                <Typography component={'span'} color="primary" className={classes.section3} variant="body1">
                    Статус: Завершен
                </Typography>
            </div>
        } else if (props.status === "start") {
            status = <div>
                <Typography component={'span'} color="primary" className={classes.section3} variant="body1">
                    Статус: Начат
                </Typography>
            </div>
        } else if (props.status === "edit") {
            status = <div>
                <Typography component={'span'} color="primary" className={classes.section3} variant="body1">
                    Статус: Редактируется
                </Typography>
            </div>
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.section1}>
                <div className={classes.section5}>
                    <Link to={"/edit/" + props.id}>
                        <Tooltip title="Изменить">
                            <IconButton color="primary" aria-label="edit">
                                <CreateIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                <div className={classes.section7}>
                    <div className={classes.section4}>
                        <Avatar variant='rounded' className={classes.large} src={chooseGame(props.game)}/>
                    </div>
                    <div className={classes.section6}>
                        <Typography component={'span'} variant="h4">
                            {props.name}
                        </Typography>
                        {fullName}
                        <div className={classes.section6}>
                            <Typography component={'span'} color="textSecondary" variant="body2">
                                {chooseGameName(props.game)}
                            </Typography>
                        </div>
                    </div>
                    <div className={classes.section8}>
                        <Typography component={'span'} variant="h4">
                            {status}
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider variant="middle"/>
            {nameTeam}
            <Divider variant="middle"/>
            {gridTourney}
            <Divider variant="middle"/>
        </div>
    );
}