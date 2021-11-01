import React, { useState, useEffect } from 'react'
import { useRecordContext } from 'react-admin'
import { fetchThumbnail } from '../../api'
import styled from 'styled-components'

const Image = styled.div`
    height: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    border-radius: 3px;
    background-image: url(${(props) => props.src});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

const ThumbnailField = ({ height = 50, width = 100 }) => {
    const [thumbnail, setThumbnail] = useState(undefined)
    const record = useRecordContext()

    useEffect(() => {
        if (!record) return

        if (record && record.thumbnail && record.thumbnail.src) {
            setThumbnail(record.thumbnail.src)
            return
        }

        const getThumbnail = async () =>
            setThumbnail(await fetchThumbnail(record))

        getThumbnail()
    }, [record])

    return record && thumbnail ? (
        <Image src={thumbnail} height={height} width={width} />
    ) : null
}

export default ThumbnailField
