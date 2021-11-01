import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import styled from 'styled-components'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Index from '../../components/Layout'

type AdminLayoutProps = {
    children: React.ReactNode
}

const TextContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [groups, setGroups] = useState([] as Array<string>)

    useEffect(() => {
        ;(async () => {
            const authData = await Auth.currentSession()
            const groupsData = authData.getIdToken().payload['cognito:groups']
            if (groupsData !== undefined) setGroups(groupsData)
        })()
    }, [])

    return (
        <>
            {groups.includes('Admin') ? (
                <Index>{children}</Index>
            ) : (
                <Index>
                    <TextContainer>
                        You don&apos;t have admin permissions
                    </TextContainer>
                </Index>
            )}
        </>
    )
}

export default withAuthenticator(AdminLayout)
