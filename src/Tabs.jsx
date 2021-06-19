import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from "react-router-dom";
import {Typography} from "@material-ui/core";

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
            <Tab component={Link} value="Главная" to="/" label={<Typography>Главная</Typography>}/>
            <Tab component={Link} value="Команды" to="/commandList" label={<Typography>Команды</Typography>}
            />
            <Tab component={Link} value="Игроки" to="/playerList"
                 label={<Typography>Игроки</Typography>}/>
            <Tab component={Link} value="Турниры" to="/tourney" label={<Typography>Турниры</Typography>}/>
        </Tabs>
    );
}