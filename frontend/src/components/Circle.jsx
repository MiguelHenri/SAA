import { useMantineTheme, Text, Space } from '@mantine/core';
import {IconDog, IconDogBowl, IconAlertTriangle, IconStethoscope} from "@tabler/icons-react";
import EditableSectionText from "./EditableSectionText.jsx";
import classes from "./Circle.module.css"

// Exemplo:
//
//  <Circle
//      icon='dog' // use 'dog' 'food' 'alert' or 'vet'
//      number='+100'
//      description='Cachorros resgatados'
//      />
//

function getIcon(icon, props){
    switch (icon){
        case 'dog': return <IconDog {...props}/>;
        case 'alert': return <IconAlertTriangle {...props}/>;
        case 'food': return <IconDogBowl {...props}/>;
        case 'vet': return <IconStethoscope {...props}/>;
        default: return null;
    }
}

function Circle({number, numberSection, description, icon}) {
    const theme = useMantineTheme();

    const iconProps = {size:100, height:100, color:theme.colors['aprai-green'][3], stroke:1};
    const iconContent = getIcon(icon, iconProps);

    return (
    <div
        style={{
            width: '250px',
            height: '250px',
            backgroundColor: theme.colors['aprai-purple'][9],
            borderRadius: '50%',
            border: `5px solid ${theme.colors['aprai-green'][3]}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >

        {
            numberSection
                ? <EditableSectionText section={numberSection}
                                       textClassName={classes.numberText}
                                       containerStyle={{width: 140, height: 50}}
                                       inputStyle={{overflow: "hidden"}}
                                       maxLen={5}/>
                : <p className={classes.numberText}>{number}</p>
        }
        {/*<Text ta="center" size="40px" c="White"> {number} </Text>*/}
        {iconContent}
        <Text ta="center" size="25px" c="White">
            {description}
        </Text>
        <Space h="5px" />
    </div>
    );
}

export default Circle;