import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";


class ForTourneyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }


    // открытие и закрытие доп. информации
    handleExpandClick = () => {
        let i = !this.state.expanded;
        this.setState({expanded: i});
    };

    render() {
        return (
            <Card className="root">
                <CardActions>
                    <Typography component={'span'} variant="body1">
                        Участники турнира:
                    </Typography>
                <IconButton
                    onClick={this.handleExpandClick}
                >
                    <ExpandMoreIcon color="primary"/>
                </IconButton>
            </CardActions>
                <Collapse in={this.state.expanded} timeout="auto">
                    <CardContent>
                        {this.props.array}
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

export default ForTourneyList;