import { defaultTheme } from 'react-admin'
import { createTheme } from '@material-ui/core/styles'
import merge from 'lodash/merge'

export const theme = createTheme(
    merge({}, defaultTheme, {
        palette: {
            // Your theme goes here
            // Write the following code to have an orange app bar. We'll explain it later in this article.
            secondary: {
                main: '#ff9900', // Not far from orange
            },
        },
    })
)
