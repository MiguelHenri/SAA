import { TextInput, PasswordInput } from '@mantine/core';

/**
 * A Colored Input Bar component, for text or password input.
 * 
 * @param {string} placeholder The input placeholder.
 * @param {string} type The input type. Use: 'text' or 'password'.
 * @returns {JSX.Element} The ColoredInputBars component.
 */
function ColoredInputBars({placeholder, type="text", ...others}){

    const props = {
        classNames: { input: 'custom-input', innerInput: 'custom-input' },
        placeholder: placeholder,
        size: 'lg',
        w: '250px',
        variant: "filled",
        radius: "xl",
        styles: {
            input: { 
                backgroundColor: '#A9ABC9',
            },
        },
        ...others
    }

    if (type === 'password') {
        return (<PasswordInput {...props}/>)
    }
    return (<TextInput {...props}/>)
}

export default ColoredInputBars;