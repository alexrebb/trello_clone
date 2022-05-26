import styled from 'styled-components/macro'
import { HiOutlinePencil } from 'react-icons/hi'

const StyledIcon = styled.span`
    color: rgba(128, 128, 128, 0.9);
    display: none;
    margin-right: 5px;
`
const StyledCard = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 10px;
    margin: 5px 0;
    cursor: pointer;
    word-break: break-all;
    z-index: 2;
    &:hover {
        background-color: rgb(235, 236, 240);
        ${StyledIcon} {
            display: flex;
        }
    }
`
const StyledIconsWrapper = styled.div`
    display: flex;
`
interface props {
    cardTitle: string
    onOpenModalCard: Function
}

const Card: React.FC<props> = ({ cardTitle, onOpenModalCard }) => {
    return (
        <StyledCard onClick={() => onOpenModalCard()}>
            <span>{cardTitle}</span>
            <StyledIconsWrapper>
                <StyledIcon>
                    <HiOutlinePencil />
                </StyledIcon>
            </StyledIconsWrapper>
        </StyledCard>
    )
}

export default Card
