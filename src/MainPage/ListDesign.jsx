import React, {Component} from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PersonIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CloseIcon from '@material-ui/icons/Close';
import Typography from "@material-ui/core/Typography";
import chooseStatus from "./CreatingDataStorageForm/chooseStatus";
import chooseFormatForList from "./CreatingDataStorageForm/chooseFormatForList";


class ListDesign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpened: false
        };
    }

    handleClickOpen = () => {
        this.setState({modalOpened: true});
    };

    handleClose = () => {
        this.setState({modalOpened: false});
    };

    info = (who) => {
        if (who === "player" && this.props.team !== "") {
            return (<ListItemText
                    primary={this.props.name}
                    secondary={
                        <Typography color="textSecondary" component={'span'}>
                            <div className="blockForList">
                                <React.Fragment>
                                    {this.props.game}
                                </React.Fragment>
                            </div>
                            <div className="blockForList">
                                <React.Fragment>
                                    Участник команды: {this.props.team}
                                </React.Fragment>
                            </div>
                        </Typography>
                    }
                />
            );
        } else if (who === "tourney") {
            return (<ListItemText
                    primary={this.props.name}
                    secondary={
                        <Typography color="textSecondary" component={'span'}>
                            <div className="blockForList">
                                <React.Fragment>
                                    {this.props.game}
                                </React.Fragment>
                            </div>
                            <div className="blockForList">
                                <React.Fragment>
                                    Статус: {chooseStatus(this.props.status)}
                                </React.Fragment>
                            </div>
                            <div className="blockForList">
                                <React.Fragment>
                                    Формат: {chooseFormatForList(this.props.format)}
                                </React.Fragment>
                            </div>
                        </Typography>
                    }
                />
            )
        } else {
            return (
                <ListItemText
                    primary={this.props.name}
                    secondary={
                        <React.Fragment>
                            {this.props.game}
                        </React.Fragment>
                    }
                />
            );
        }

    }


    render() {
        return (
            <div>
                <Divider variant="inset"/>
                <div>
                    <ListItem alignItems="flex-start">
                        <Divider variant="inset"/>
                        <ListItemAvatar className="avatarAndButton">
                            <Avatar variant='rounded' src={this.props.img}/>
                        </ListItemAvatar>
                        {this.info(this.props.who)}
                        <Link to={"/" + this.props.id}>
                            <Tooltip color="primary" title="Узнать больше">
                                <IconButton aria-label="to learn more">
                                    <PersonIcon/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Tooltip color="primary" title="Удалить">
                            <IconButton onClick={this.handleClickOpen} aria-label="delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                </div>
                <Divider variant="inset"/>
                <Dialog
                    open={this.state.modalOpened}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Вы уверены в этом?"}</DialogTitle>
                    <DialogActions>
                        <Tooltip color="primary" title="Удалить">
                            <IconButton onClick={this.handleClose} aria-label="delete">
                                <CloseIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip color="primary" title="Удалить">
                            <IconButton onClick={() => this.props.getData()} aria-label="delete">
                                <DoneAllIcon/>
                            </IconButton>
                        </Tooltip>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}


export default ListDesign;

