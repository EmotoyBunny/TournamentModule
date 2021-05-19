export default function chooseGame(props) {
    switch(props) {
        case 'stop':
            return "Завершен";
        case 'start':
            return "Начат";
        case 'edit':
            return "Редактируется";
        default:
    }
}