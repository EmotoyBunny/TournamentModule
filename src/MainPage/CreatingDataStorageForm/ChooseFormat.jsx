export default function chooseFormat(props) {
    switch (props) {
        case "":
            return ""
        case 'command2':
            return 2;
        case 'command3':
            return 3;
        case 'command4':
            return 4;
        case 'command5':
            return 5;
        case 'player':
            return 'player';
        default:
    }
}