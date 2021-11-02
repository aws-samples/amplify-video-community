import React from 'react'
import { Card, CardContent, CardHeader, Link } from '@material-ui/core'

const Home = () => (
    <Card>
        <CardHeader title="Welcome to the administration" />
        <CardContent>
            <img src="https://marmelab.com/react-admin/assets/logo_white.png" />
        </CardContent>
        <CardContent>
            This admin section has been done using the module react-admin, to
            learn more about it, you can follow the{' '}
            <Link href="https://marmelab.com/react-admin/Tutorial.html">
                tutorial
            </Link>{' '}
            on their website.{' '}
        </CardContent>
    </Card>
)

export default Home
