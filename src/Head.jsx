import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import AppBar from '@material-ui/core/AppBar';
import Container from "@material-ui/core/Container";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ControlCameraOutlinedIcon from '@material-ui/icons/ControlCameraOutlined';
import WhatshotOutlinedIcon from '@material-ui/icons/WhatshotOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

// css table
import "./Head.css"

// components jsx
import MainPage from "./MainPage/PageCommadList";
import AddingCommand from "./MainPage/AddingCommand";
import AddingPlayer from "./MainPage/AddingPlayer";
import MainPagePlayers from "./MainPage/PagePlayersList";
import PassageLocal from "./MainPage/CreatingDataStorageForm/PassageLocal";
import ProfilesPlayer from "./MainPage/CreatingDataStorageForm/ProfilePlayer";
import Tourney from "./MainPage/Tourney";


class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setValue: "Главная",
            arrayCommand: [],
            arrayPlayer: [],
        };

    }


    pushObjectCommand = () => {
        this.setState({arrayCommand: PassageLocal("command")})
    }

    pushObjectPlayer = () => {
        this.setState({arrayPlayer: PassageLocal("player")})
    }


    componentDidMount() {
        this.pushObjectCommand();
        this.pushObjectPlayer();
    }


    profilesCommands = () => {
        return this.state.arrayCommand.map((item, index) => {
            return (<Route exact path={"/" + item.id} key={index}
                           render={(props) => <ProfilesPlayer {...props} id={item.id} name={item.name} game={item.game}
                                                              playerList={item.playerList}
                                                              link="/commandList" who="command"/>}/>)
        });
    }

    profilesPlayers = () => {
        return this.state.arrayPlayer.map((item, index) => {
            return (<Route exact path={"/" + item.id} key={index}
                           render={(props) => <ProfilesPlayer {...props} id={item.id} name={item.name} game={item.game}
                                                              team={item.team}
                                                              link="/playerList" fullName={item.fullName}
                                                              who="player"/>}/>)
        })
    }

    editProfileCommands = () => {
        return this.state.arrayCommand.map((item, index) => {
            return (<Route exact path={"/edit/" + item.id} key={index}
                           render={(props) => <AddingCommand {...props} id={item.id} name={item.name} game={item.game}
                                                             playerList={item.playerList}
                                                             getData={() => this.pushObjectCommand()}
                                                             array={this.state.array}
                                                             what="edit"/>}/>)
        })
    }

    editProfilePlayers = () => {
        return this.state.arrayPlayer.map((item, index) => {
            return (<Route exact path={"/edit/" + item.id} key={index}
                           render={(props) => <AddingPlayer {...props} id={item.id} name={item.name} game={item.game}
                                                            team={item.team}
                                                            fullName={item.fullName}
                                                            getData={() => this.pushObjectPlayer()}
                                                            what="edit"/>}/>)
        })
    }



    render() {

        const customHistory = createBrowserHistory();
        return (
            <Router history={customHistory}>
                <div className="container">
                    <Container maxWidth='md'>
                        <div className="container1">
                            <AppBar position="fixed">
                                <Tabs
                                    value={this.state.setValue}
                                    centered
                                    indicatorColor="primary"
                                    textColor="inherit"
                                >
                                    <Tab component={Link}  value="Главная" to="/" label="Главная" icon={<ControlCameraOutlinedIcon/>}/>
                                    <Tab component={Link} value="Главная" to="/commandList" label="Команды"
                                         icon={<PeopleAltOutlinedIcon/>}/>
                                    <Tab component={Link} value="Главная" to="/playerList" icon={<PersonOutlineOutlinedIcon/>}
                                         label="Игроки"/>
                                    <Tab component={Link} value="Главная" to="/tourney" icon={<WhatshotOutlinedIcon/>} label="Турниры"/>
                                </Tabs>
                            </AppBar>
                            <Switch>
                                {this.profilesPlayers()}
                                {this.profilesCommands()}
                                {this.editProfileCommands()}
                                {this.editProfilePlayers()}
                                <Route exact path="/" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/commandList" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/addingCommand"
                                       render={(props) => <AddingCommand {...props} what="create"  getData={() => this.pushObjectCommand()}/>}/>
                                <Route exact path="/addingPlayer"
                                       render={(props) => <AddingPlayer {...props} what="create" getData={() => this.pushObjectPlayer()}/>}/>
                                <Route exact path="/playerList" render={(props) => <MainPagePlayers {...props}/>}/>
                                <Route exact path="/tourney" component={Tourney}/>
                                <Route path="*" component={MainPage}/>
                            </Switch>
                        </div>
                    </Container>
                </div>
            </Router>

        );
    }
}

export default Head;