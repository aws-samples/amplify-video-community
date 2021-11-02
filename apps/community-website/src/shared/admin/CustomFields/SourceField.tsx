import React from 'react'
import { useRecordContext } from 'react-admin'
import AmplifyLogo from '../../../assets/logo/logo-dark.svg'
import YoutubeLogo from '../../../assets/logo/youtube.svg'

const SourceField = ({ source }) => {
    const record = useRecordContext()

    if (record && record[source] && record[source].toLowerCase() === 'youtube')
        return <YoutubeLogo height={30} width={30} />
    else return <AmplifyLogo height={30} width={30} />
}

export default SourceField
