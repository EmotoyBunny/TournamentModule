import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import AppBar from '@material-ui/core/AppBar';
import Container from "@material-ui/core/Container";


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
import TabsAppBar from "./Tabs";
import AddingTourney from "./MainPage/AddingTourney";
import AddingFormatTourney from "./MainPage/AddingFormatTourney";
import TourneyGrid from "./MainPage/TourneyGrid";

import logo2 from "./logo2.png"


class Head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayCommand: [],
            arrayPlayer: [],
            arrayTourney: [],
            listFormat: ["player1", "player2", "player3", "player4", "player5", "player6", "player7", "player8"]
        };

    }


    pushObjectTourney = () => {
        this.setState({arrayTourney: PassageLocal("tourney")});
    }

    pushObjectCommand = () => {
        this.setState({arrayCommand: PassageLocal("command")});
    }

    pushObjectPlayer = () => {
        this.setState({arrayPlayer: PassageLocal("player")});
    }


    componentDidMount() {
        this.pushObjectCommand();
        this.pushObjectPlayer();
        this.pushObjectTourney();
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

    profilesTourney = () => {
        return this.state.arrayTourney.map((item, index) => {
            return (<Route exact path={"/" + item.id} key={index}
                           render={(props) => <ProfilesPlayer {...props} id={item.id} name={item.name} game={item.game}
                                                              link="/tourneyList" prizeFund={item.prizeFund}
                                                              gridTourney={item.gridTourney}
                                                              status={item.status} format={item.format}
                                                              listFormat={item.listFormat}
                                                              who="tourney"
                                                              getDataTourney={() => this.pushObjectTourney()}/>}/>)
        })
    }

    editProfileCommands = () => {
        return this.state.arrayCommand.map((item, index) => {
            return (<Route exact path={"/edit/" + item.id} key={index}
                           render={(props) => <AddingCommand {...props} id={item.id} name={item.name} game={item.game}
                                                             playerList={item.playerList}
                                                             getDataTourney={() => this.pushObjectTourney()}
                                                             getDataCommand={() => this.pushObjectCommand()}
                                                             getDataPlayers={() => this.pushObjectPlayer()}
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
                                                            getDataTourney={() => this.pushObjectTourney()}
                                                            getDataCommand={() => this.pushObjectCommand()}
                                                            getDataPlayers={() => this.pushObjectPlayer()}
                                                            what="edit"/>}/>)
        })
    }

    editProfileTourney = () => {
        return this.state.arrayTourney.map((item, index) => {
            return (<Route exact path={"/edit/" + item.id} key={index}
                           render={(props) => <AddingTourney {...props} id={item.id} name={item.name} game={item.game}
                                                             link="/tourneyList" prizeFund={item.prizeFund}
                                                             status={item.status}
                                                             format={item.format}
                                                             listFormat={item.listFormat}
                                                             getDataTourney={() => this.pushObjectTourney()}
                                                             getDataCommand={() => this.pushObjectCommand()}
                                                             getDataPlayers={() => this.pushObjectPlayer()}
                                                             gridTourney={item.gridTourney}
                                                             what="edit"/>}/>)
        })
    }

    addingTourneyFormat = () => {
        return this.state.arrayTourney.map((item, index) => {
            return (<Route exact path={"/addingFormatTourney/" + item.id} key={index}
                           render={(props) => <AddingFormatTourney {...props} id={item.id} what="create"
                                                                   format={item.format}
                                                                   gridTourney={item.gridTourney}
                                                                   getDataTourney={() => this.pushObjectTourney()}
                                                                   getDataCommand={() => this.pushObjectCommand()}
                                                                   getDataPlayers={() => this.pushObjectPlayer()}/>}/>)
        });
    }

    editTourneyFormat = () => {
        return this.state.arrayTourney.map((item, index) => {
            return (<Route exact path={"/editFormatTourney/" + item.id} key={index}
                           render={(props) => <AddingFormatTourney {...props} id={item.id} what="edit"
                                                                   format={item.format}
                                                                   listFormat={item.listFormat}
                                                                   gridTourney={item.gridTourney}
                                                                   getDataTourney={() => this.pushObjectTourney()}
                                                                   getDataCommand={() => this.pushObjectCommand()}
                                                                   getDataPlayers={() => this.pushObjectPlayer()}/>}/>)
        });
    }


    render() {
        const customHistory = createBrowserHistory();
        return (
            <Router history={customHistory}>
                <div className="container">
                    <Container maxWidth='md'>
                        <div className="container1">
                            <AppBar position="fixed">
                                <img alt="" src={logo2} className="logo"/>
                                <TabsAppBar/>
                            </AppBar>
                            <Switch>
                                {this.profilesPlayers()}
                                {this.profilesCommands()}
                                {this.profilesTourney()}
                                {this.editProfileCommands()}
                                {this.editProfilePlayers()}
                                {this.editProfileTourney()}
                                {this.editTourneyFormat()}
                                {this.addingTourneyFormat()}
                                <Route exact path="/" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/commandList" render={(props) => <MainPage {...props} />}/>
                                <Route exact path="/tourneyGrid" render={(props) => <TourneyGrid {...props}
                                                                                                 listFormat={this.state.listFormat}/>}/>
                                <Route exact path="/addingTourney"
                                       render={(props) => <AddingTourney {...props} what="create"
                                                                         getDataTourney={() => this.pushObjectTourney()}
                                                                         getDataCommand={() => this.pushObjectCommand()}
                                                                         getDataPlayers={() => this.pushObjectPlayer()}/>}/>
                                <Route exact path="/addingFormatTourney"
                                       render={(props) => <AddingFormatTourney {...props} what="create"
                                                                               getDataTourney={() => this.pushObjectTourney()}
                                                                               getDataCommand={() => this.pushObjectCommand()}
                                                                               getDataPlayers={() => this.pushObjectPlayer()}/>}/>
                                <Route exact path="/addingCommand"
                                       render={(props) => <AddingCommand {...props} what="create"
                                                                         getDataTourney={() => this.pushObjectTourney()}
                                                                         getDataCommand={() => this.pushObjectCommand()}
                                                                         getDataPlayers={() => this.pushObjectPlayer()}/>}/>
                                <Route exact path="/addingPlayer"
                                       render={(props) => <AddingPlayer {...props} what="create"
                                                                        getDataTourney={() => this.pushObjectTourney()}
                                                                        getDataCommand={() => this.pushObjectCommand()}
                                                                        getDataPlayers={() => this.pushObjectPlayer()}/>}/>
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