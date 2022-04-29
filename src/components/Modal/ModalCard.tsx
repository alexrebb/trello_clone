import Modal from './Modal'
import CardDescription from '../Cards/CardDescription'
import CardActionList from '../Cards/CardActionList'
import CardAddAction from '../Cards/CardAddAction'

import { memo } from 'react'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { filteredCardState } from '../../store/selectors'
import { BsCardChecklist } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'

const StyledModalContainer = styled.div`
    display: flex;
    flex-direction: column;
`
const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
`
const StyledTitle = styled.h3`
    margin-left: 10px;
`
const StyleDescr = styled.h4`
    margin-left: 10px;
    margin-right: 15px;
`

interface props {
    onCloseModal: Function
}

const ModalCard: React.FC<props> = memo(({ onCloseModal }) => {
    const cardState = useRecoilValue(filteredCardState)

    console.log(cardState)

    return (
        <Modal onCloseModal={onCloseModal}>
            <StyledModalContainer>
                <StyledWrapper>
                    <BsCardChecklist />
                    <StyledTitle>{cardState.cardTitle}</StyledTitle>
                </StyledWrapper>
                <StyledWrapper>
                    <MdOutlineDescription />
                    <StyleDescr>Description</StyleDescr>
                </StyledWrapper>
                <CardDescription cardDescription={cardState.cardDescription} />
                <CardAddAction />
                <CardActionList cardState={cardState} />
            </StyledModalContainer>
        </Modal>
    )
})

export default memo(ModalCard)
