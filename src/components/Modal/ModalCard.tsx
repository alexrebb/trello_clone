import Modal from './Modal'
import { memo, useState } from 'react'
import styled from 'styled-components'
import { useRecoilState, useRecoilValue } from 'recoil'
import { BoardListState } from '../../store/atoms'
import { filteredCardState } from '../../store/selectors'
import { BsCardChecklist } from 'react-icons/bs'
import { MdOutlineDescription } from 'react-icons/md'
import CardDescription from '../Cards/CardDescription'

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
`

interface props {
    onCloseModal: Function
}

const ModalCard: React.FC<props> = memo(({ onCloseModal }) => {
    const cardState = useRecoilValue(filteredCardState)

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
            </StyledModalContainer>
        </Modal>
    )
})

export default memo(ModalCard)
