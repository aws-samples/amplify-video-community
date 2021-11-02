export type NavbarTheme = {
    type: string
    main: string
    boxShadow: string
    contrastText: string
    amplifyLogo: string
    amplifyText: string
    textColor: string
    textHoverColor: string
    searchBgColor: string
    searchMainColor: string
    searchHoverMainColor: string
    searchHoverBgColor: string
}

export type Index = {
    palette: {
        primary: {
            main: string
            contrastText: string
            background: string
            ternary: string
            darkblue: string
        }
        navbar: NavbarTheme
        textMd: string
    }
}

export const defaultNavbar = {
    type: 'scroll',
    main: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    amplifyLogo: 'dark',
    amplifyText: '#000000',
    textColor: '#000000',
    textHoverColor: 'var(--amplify-primary-color)',
    searchBgColor: 'rgba(0, 0, 0, 0)',
    searchMainColor: '#000000',
    searchHoverMainColor: '#ffffff',
    searchHoverBgColor: 'var(--amplify-primary-color)',
    contrastText: 'var(--amplify-primary-contrast)',
}

const defaultTheme: Index = {
    palette: {
        primary: {
            main: 'var(--amplify-primary-color)',
            contrastText: 'var(--amplify-primary-contrast)',
            background: '#f2f3f3',
            ternary: '#dedede',
            darkblue: '#050029',
        },
        navbar: defaultNavbar,
        textMd: 'var(--amplify-text-md)',
    },
}

export default defaultTheme
