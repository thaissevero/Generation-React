import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { TabContext, TabPanel } from '@material-ui/lab';
import { Instagram } from '@mui/icons-material';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import './TabPostagem.css';


function TabPostagem() {
    const [value, setValue] = useState('1')
    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
    }
    return (
        <>
            <TabContext value={value}>
                <AppBar position="static">
                    <Tabs centered indicatorColor="secondary" onChange={handleChange} className="sobremim">
                        <Tab label="About me" value="1" />
                    </Tabs>
                </AppBar>
                <TabPanel value="1" className="fundotab">
                    <div className='itenstab'>
                        <div className='sobremimtab'>
                            <p> My name is Thais and I live in Brazil!  </p>
                            <p> I'm a Java Web Developer. I love technology, animes, mangas and games. </p>
                        </div>
                        <div>
                            <Box mx={3}>
                                <a href="https://github.com/thaissevero" target="_blank">
                                    <GitHubIcon className='redes' /></a>

                                <a href="https://www.linkedin.com/in/thais-severo/" target="_blank">
                                    <LinkedInIcon className='redes' /></a>

                                <a href="https://www.instagram.com/devilsuoh/" target="_blank">
                                    <Instagram className="redes" /></a>
                            </Box>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </>
    );
}
export default TabPostagem;

/**
TabContext = é tipo o container
Linha 19 - value="1"  = o 1 vai te direcionar para linha 23
handleChange =  manipular git
*/