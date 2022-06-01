import React from 'react'
import styled from 'styled-components/macro'
import { HiOutlinePlus } from 'react-icons/hi'

const StyledAddList = styled.div`
    cursor: pointer;
`
interface props {
    hadnleOpenInput: Function
}

const AddListBtn: React.FC<props> = ({ hadnleOpenInput }) => {
    return (
        <StyledAddList>
            <HiOutlinePlus />
            <span onClick={() => hadnleOpenInput()}>Add another list</span>
        </StyledAddList>
    )
}

export default AddListBtn
