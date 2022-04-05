import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Paginacion(props:any){
    return(
        <Stack spacing={2}>
            <Pagination count={10} variant="outlined" color="primary" size="large" />
        </Stack>
    );
}

export default Paginacion;