import CardAction from "./CardActions";
import {Cards} from '../../types/interfaces'

interface props {
    cardState: Cards
}
const CardActionList: React.FC<props> = ({cardState}) => {
    return (
        <>
        {cardState.cardData.map(data => (
            <CardAction key={data.cardDataId} action={data.action} date={data.date}/>
        ))}
        </>
    );
}

export default CardActionList;