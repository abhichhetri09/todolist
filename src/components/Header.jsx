import AppBar from '@mui/material/AppBar';
import  Toolbar  from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

function Header(){
    return(
        <AppBar position='static'>
            <Toolbar width="100%">
                <Typography variant="h6">My Todos</Typography>

            </Toolbar>


        </AppBar>

    );

}
export default Header;