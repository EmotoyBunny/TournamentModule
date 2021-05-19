export default function chooseFormatForList(props) {
    switch (props) {
        case "":
            return ""
        case 'command2':
            return "Командный 2х2";
        case 'command3':
            return "Командный 3х3";
        case 'command4':
            return "Командный 4х4";
        case 'command5':
            return "Командный 5х5";
        case 'player':
            return "Одиночный";
        default:
    }
}