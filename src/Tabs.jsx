import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from "react-router-dom";
import ControlCameraOutlinedIcon from "@material-ui/icons/ControlCameraOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import WhatshotOutlinedIcon from "@material-ui/icons/WhatshotOutlined";

export default function TabsAppBar() {
    const [value, setValue] = React.useState("Главная");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Tabs
            value={value}
            centered
            onChange={handleChange}
            indicatorColor="primary"
            name="setValue"

        >
            <Tab component={Link} value="Главная" to="/" label="Главная" icon={<ControlCameraOutlinedIcon/>}/>
            <Tab component={Link} value="Команды" to="/commandList" label="Команды"
                 icon={<PeopleAltOutlinedIcon/>}/>
            <Tab component={Link} value="Игроки" to="/playerList" icon={<PersonOutlineOutlinedIcon/>}
                 label="Игроки"/>
            <Tab component={Link} value="Турниры" to="/tourney" icon={<WhatshotOutlinedIcon/>} label="Турниры"/>
        </Tabs>
    );
}