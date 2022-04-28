import styled from 'styled-components'

const StyledDescription = styled.div`
    background-color: background-color: rgba(218, 220, 224, 0.7);
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
    padding: 15px;
    font-size: 12px;
    cursor: pointer;
    word-break: break-all;
    &:hover {
        background-color: rgb(235, 236, 240);
    }
`
const StyledActionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

interface props {
    action: string
    date: string
}

const CardAction: React.FC<props> = ({ action, date }) => {
    return (
        <StyledDescription>
            <StyledActionWrapper>
                <span>{action}</span>
                <span>{date}</span>
            </StyledActionWrapper>
        </StyledDescription>
    )
}

export default CardAction
