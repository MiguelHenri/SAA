import {Stack, Text} from '@mantine/core'
import MenuButton from "../../components/customInputs/MenuButton.jsx";
import { useAuth } from '../../providers/AuthProvider.jsx';

/**
 * This is a admin menu page, with navigation to administrative sections.
 * 
 * @returns {JSX.Element} The AdmMenu page.
 */
function AdmMenu() {
    const {userName, clearAuth} = useAuth();

    const logOut = () => {
        clearAuth();
    } 

    return(
        <>
        <Text ta='center' fz='18px'>
            Olá, {userName}!
        </Text>
        <Stack align='center' justify='center' p='20px'>
            <MenuButton
                link='/blog'
                text='Gerenciar Postagens'
            />
            <MenuButton
                link='/bazar'
                text='Gerenciar Bazar'
            />
            <MenuButton
                link='/admin/editarcontato'
                text='Editar Informações de Contato'
            />
            <MenuButton
                link='/admin/registrardoacoes'
                text='Gerenciar Doações'
            />
            <MenuButton
                link='/login'
                text='Sair'
                bg='red'
                onClick={logOut}
            />
        </Stack>
        </>
    );
}

export default AdmMenu;