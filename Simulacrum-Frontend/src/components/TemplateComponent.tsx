import { Box } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import react from 'react';
import { TemplateProp } from '../types/props/TemplateProp';

function TemplateComponent(props: TemplateProp) {
    return (
        <>
        <Box> 
            <Tabs>
                <TabList>
                    <Tab> {props.slot1} </Tab>
                    <Tab> {props.slot2} </Tab>
                    <Tab> {props.slot3} </Tab>
                    <Tab> {props.slot4} </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                    <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>three!</p>
                    </TabPanel>
                    <TabPanel>
                    <p>four!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>        
        </>
    )
}

export default TemplateComponent;