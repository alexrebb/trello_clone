import styled from 'styled-components/macro'

const StyledRemoveList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border: none;
    font-size: 15px;
    animation: list 800ms cubic-bezier(0.25, 0.1, 0.25, 1);
    @keyframes list {
        from {
            opacity: 0;
            transform: translateY(-1rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
const StyledSpan = styled.span`
    text-transform: uppercase;
`
const StyledBtn = styled.button`
    padding: 2px;
    margin-right: 7px;
    text-transform: uppercase;
    border-radius: 3px;
    border: none;
    cursor: pointer;
`

interface props {
    setIsOpenRemoveList: Function
    onRemoveBoardHandler: Function
}

const BoardSettingsRemoveBoard: React.FC<props> = ({
    setIsOpenRemoveList,
    onRemoveBoardHandler,
}) => {
    return (
        <StyledRemoveList>
            <StyledSpan>Remove Board?</StyledSpan>
            <div>
                <StyledBtn onClick={() => onRemoveBoardHandler()}>
                    Yes
                </StyledBtn>
                <StyledBtn onClick={() => setIsOpenRemoveList(false)}>
                    No
                </StyledBtn>
            </div>
        </StyledRemoveList>
    )
}

export default BoardSettingsRemoveBoard
