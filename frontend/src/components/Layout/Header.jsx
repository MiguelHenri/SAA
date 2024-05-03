import {useDisclosure} from "@mantine/hooks";
import {Anchor, Center, Group, Stack} from "@mantine/core";
import {Link} from "react-router-dom";
import {IconChevronDown, IconChevronUp} from "@tabler/icons-react";


function Header(){
    const [opened, {toggle}] = useDisclosure();

    const links = [
        {label: "Quem Somos", link: "/#quemSomos"},
        {label: "Contato", link: "/#contato"},
        {label: "Bazar", link: ""},
        {label: "Blog", link: "/blog"},
        {label: "Administracao", link: "/admin"}
    ];

    const linkButtons =
        links.map((l, index) =>
            <Anchor key={index}
                    c={'white'} ff={'Karla'}
                    fz={'1.2em'} mx={'60px'}
                    component={Link} to={l.link}
            >
                {l.label}
            </Anchor>
        );

    return (
        <Center mih={'5em'} bg={'aprai-purple.9'} px="md">
            <Stack hiddenFrom="sm" pos="relative">
                {opened ?
                    <Stack justify="center" align="center" p="lg">
                        {linkButtons}
                        <IconChevronUp color="white" onClick={toggle}/>
                    </Stack>
                    :
                    <IconChevronDown color="white" onClick={toggle}/>}
            </Stack>
            <Group ml="xl" visibleFrom="sm">
                {linkButtons}
            </Group>
        </Center>
    )
}

export default Header;