import {Grid} from '@material-ui/core';
import React from 'react'

import ViewController from '../layouts/viewController';

export default function Layout(){
    return(
        <Grid container>
            <ViewController/>
        </Grid>
    )
}