import {Center, Group, Image, Box, useMantineTheme} from "@mantine/core";
import logo from "../../assets/logo.jpeg";
import {HashLink} from "react-router-hash-link";
import SocialMediaIcon from "./SocialMediaIcon.jsx";
import { useMediaQuery } from "@mantine/hooks";

/**
 * Banner component renders layout banner.
 * 
 * @returns {JSX.Element} The Banner component.
 */
function Banner(){
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    if (isMobile) return (
        <Group align="flex-end" justify="center">
            <SocialMediaIcon media={'instagram'} mb='3px'/>
            <HashLink to='/'>
            <Image w={{ base: "60vw", sm: "45vw", md: "30vw", lg: "25vw" }} h={"auto"} src={logo} />
            </HashLink>
            <SocialMediaIcon media={'facebook'} mb='3px'/>
        </Group>
    )

    return (
        <Box pos="relative">
            <Center pos="relative">
                <HashLink to='/'>
                <Image w={{ base: "60vw", sm: "45vw", md: "30vw", lg: "25vw" }} h={"auto"} src={logo} />
                </HashLink>
            </Center>
            <Group style={{ position: "absolute", right: 10, bottom: 5 }}>
                <SocialMediaIcon media={'instagram'} />
                <SocialMediaIcon media={'facebook'} />
            </Group>
        </Box>
    )
}

export default Banner;