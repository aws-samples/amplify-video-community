import React, { useState, useEffect } from 'react'
import { useRecordContext, useInput } from 'react-admin'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import InputLabel from '@mui/material/InputLabel'

const StyledChip = styled(Chip)`
    ${(props) =>
        props.selected
            ? 'border: 1px solid #bdbdbd !important;'
            : 'background-color: rgba(0, 0, 0, 0.08) !important;'}
    border-radius: 16px !important;
    margin-bottom: 15px !important;
    margin-top: 5px !important;
`

const TagsInput = (props) => {
    const { source, choices } = props
    const {
        input: { onChange },
    } = useInput(props)
    const [selected, setSelected] = useState([])
    const record = useRecordContext()

    const manageClick = (isSelected, id) => {
        if (isSelected) {
            selected.splice(selected.indexOf(id), 1)
            setSelected([...selected])
        } else {
            selected.push(id)
            setSelected([...selected])
        }
        onChange([...selected])
    }

    useEffect(() => {
        if (record && record[source] && record[source].map)
            setSelected(record[source].map((item) => item.id))
    }, [record, record[source], typeof record[source]])

    return (
        <div>
            <InputLabel>
                {source && source.charAt(0).toUpperCase() + source.slice(1)}
            </InputLabel>
            <Stack direction="row" spacing={1}>
                {choices &&
                    choices.map &&
                    choices.map(({ name, id }, index) => {
                        const isSelected = selected.indexOf
                            ? selected.indexOf(id) >= 0
                            : false
                        return (
                            <StyledChip
                                key={id}
                                variant={isSelected ? 'outlined' : 'filled'}
                                label={name}
                                selected={isSelected}
                                onDelete={
                                    isSelected
                                        ? () => {
                                              return
                                          }
                                        : undefined
                                }
                                onClick={() =>
                                    manageClick(isSelected, id, name, index)
                                }
                            />
                        )
                    })}
            </Stack>
        </div>
    )
}

export default TagsInput
