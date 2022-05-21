import React from 'react'
import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'

const StyledAddList = styled.div`
    cursor: pointer;
`
interface props {
    setIsOpenNewListInputForm: Function
}

const AddListBtn: React.FC<props> = ({ setIsOpenNewListInputForm }) => {
    return (
        <StyledAddList>
            <HiOutlinePlus />
            <span onClick={() => setIsOpenNewListInputForm(true)}>
                Add another list
            </span>
        </StyledAddList>
    )
}

export default AddListBtn
