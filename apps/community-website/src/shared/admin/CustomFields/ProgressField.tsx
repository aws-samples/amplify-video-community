import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { useInput } from 'react-admin'

const TagsInput = (props) => {
    const [progress, setProgress] = useState(0)

    const {
        input: { onChange },
    } = useInput(props)

    const uploadCallback = (uploadProgress) => {
        setProgress((uploadProgress.loaded * 100) / uploadProgress.total)
    }

    useEffect(() => {
        onChange(uploadCallback)
    }, [])

    return progress === 0 ? null : (
        <LinearProgress
            variant={progress === 100 ? undefined : 'determinate'}
            value={progress}
        />
    )
}

export default TagsInput
