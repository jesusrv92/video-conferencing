import { createMuiTheme } from '@material-ui/core/styles';
 
const orange = "rgba(227, 111, 30, 1)";
const blue = "#337ab7";
 
export default createMuiTheme({
    palette: {
        common: {
            arcBlue: `${blue}`,
            orange: `${orange}`
        },
        primary:{
            main: `${blue}`
        }, secondary: {
            main: `${orange}`,
        }
    },
    typography: {
    }
});
