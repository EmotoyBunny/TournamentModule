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
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        textAlign: "center",
        paddingTop: 70,
    },
    section1: {
        width: '100%',
        height: 170,
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
    section5: {
        marginLeft: 50,
        textAlign: "left",
    },
    section7: {
        marginLeft: 60,
        textAlign: "left",
    },
    section3: {
        paddingTop: 20,
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
    } else {
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
                    <Link to={props.link}>
                        <Tooltip title="Вернуться назад">
                            <IconButton color="primary" aria-label="back">
                                <ExitToAppIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Link>
                </div>
                <div className={classes.section7}>
                    <div className={classes.section4}>
                        <Avatar variant='rounded' className={classes.large} src={chooseGame(props.game)}/>
                    </div>
                    <div className={classes.section6}>
                        <Typography variant="h4">
                            {props.name}
                        </Typography>
                        {fullName}
                        <Typography color="textSecondary" variant="body2">
                            {chooseGameName(props.game)}
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider variant="middle"/>
            {nameTeam}
        </div>
    );
}