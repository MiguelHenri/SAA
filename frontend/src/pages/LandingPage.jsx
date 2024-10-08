import {
    Paper, Title, Text, Space, Center, SimpleGrid, Anchor, Stack
} from "@mantine/core"
import FlipCard from "../components/landingPage/FlipCard.jsx";
import PostCarousel from "../components/posts/PostCarousel.jsx";
import Circle from "../components/landingPage/Circle.jsx";
import EditableSectionText from "../components/editables/EditableSectionText.jsx";
import classes from "./LandingPage.module.css"
import useFetch from "../hooks/useFetch.jsx";
import EditableSectionImage from "../components/editables/EditableSectionImage.jsx";

function formatTelephone(number){
    if (!number) return '';

    // número = +5599999999999
    const cleaned = number.replace(/\D/g, '');
    // número = 5599999999999
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{4}|\d{5})(\d{4})$/);
    // número = 55 99 99999 9999
    if (match)
        return ['(', match[2], ')', match[3], '-', match[4]].join('')
    // número = (99) 99999-9999
    return number;
}

/**
 * The LandingPage component represents the main page of the application.
 * It includes sections and components to provide an app overview.
 * 
 * @returns {JSX.Element} The Landing Page itself.
 */
function LandingPage() {
    const {result: contactInfo, error: contactInfoErr} = useFetch('api/contactInfos',  {
        defaultValue: {
            phone: '',
            address: '',
            instagram: '',
            facebook: ''
        }
    });
    if (contactInfoErr) console.error('Could not load contact info in landing page.', contactInfoErr);

    // TODO: improve responsive design
    return (
        <>
            <EditableSectionText
                section="topQuote"
                containerStyle={{width: "100%"}}
                inputContainerStyle={{height: "75px"}}
                textClassName={classes.topQuote} />

            <SimpleGrid w="100%" cols={{base: 1, sm: 2}} spacing={{base: 'xs', sm: 'lg'}} mt="md" mb="xl">
                <FlipCard
                    h={{lg: 350, md:300, sm: 250, base: 200}}
                    textFront="Ajude-nos a ajudar."
                    editableFrontTextSection="cardDoacaoFront"
                    textBack="Informações da Doação"
                    editableBackTextSection="cardDoacao"
                    buttonText="DOE AGORA"
                    editableImageSection="cardDoacao"/>

                <FlipCard
                    h={{lg: 350, md:300, sm: 250, base: 200}}
                    textFront="Presenciou situações de maus tratos? Não hesite:"
                    editableFrontTextSection="cardDenunciaFront"
                    editableBackTextSection="cardDenuncia"
                    buttonText="DENUNCIE."
                    editableImageSection="cardDenuncia"/>
            </SimpleGrid>
            

            <Title id='quemSomos' pt={"5rem"} pl={"1rem"} pr={"1rem"}>Quem Somos</Title>
            <SimpleGrid /*Seção Quem Somos */
                cols={{ base: 1, sm: 1, md: 2, lg: 2 }}
                pl={"1rem"}
                pr={"1rem"}
            >
                <EditableSectionText section="sobreNos" inputContainerStyle={{height: "380px", width: "100%"}} textClassName={classes.paragraphText}/>
                <EditableSectionImage section="sobreNos" radius="xl" h={400}/>
            </SimpleGrid>

            <Center maw="100%" /*Seção Plano Sócio */  >  
                <Stack align="center">
                    <Title id='descricaoPlano' pt={"5rem"} pl={"1rem"} pr={"1rem"}>Plano Sócio Colaborador APRAI 2024 </Title>         
                    <EditableSectionText section="planoSocio" inputContainerStyle={{height: "380px", width: "100%"}} textClassName={classes.paragraphText}/>
                </Stack>
            </Center>   


            <Paper h={{base: 400, sm: 500}} w="100%" bg="aprai-purple.3" my="xl" p={{base: "xs", sm: "md"}} radius="xl">
                <Title ta="center" mb={'md'}>Últimas Notícias</Title>
                <PostCarousel px={{base: "md", sm: "100"}} cardData={{h: 300, w: {base: 200, xs: 350}}}/>
            </Paper>

            <Center my="xl">
                <SimpleGrid /*Círculos informativos*/
                    cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                    spacing={{ base:'100px', sm: '100px', md: '100px', lg: '100px', xl: '100px'}}
                    verticalSpacing='xs'
                >
                    <Circle
                        icon="dog"
                        number="358"
                        numberSection="numAnimais"
                        description={(
                            <>
                                Animais<br />
                                doados
                            </>
                        )}
                    />
                    <Circle
                        icon="alert"
                        number="1006"
                        numberSection="numDenuncia"
                        description="Denúncias verificadas"
                    />
                    <Circle
                        icon="food"
                        number="4.2"
                        numberSection="numRacao"
                        description="Tons de ração doadas"
                    />
                    <Circle
                        icon="vet"
                        number="552"
                        numberSection="numConsulta"
                        description= {
                        <>
                            Consultas<br />
                            Realizadas
                        </>
                        }
                    />
                </SimpleGrid>
            </Center>

            {/*Seção Contato*/}
            <SimpleGrid
                my="xl"
                cols={{ base: 1, sm: 1, md: 2, lg: 2 }}
            >
                <Stack id="contato" gap="0">
                    <Title ta="center" mb={"md"}>Contato</Title>
                    <Text ta="center" size="xl" fw={500}>
                        Endereço
                    </Text>
                    <Text className={classes.contactValueText}>
                        {contactInfo.address}
                    </Text>
                    <Space h="xl" />
                    <Text ta="center" size="xl" fw={500}>
                        Telefone
                    </Text>
                    <Anchor ta="center" size="lg" fw={500} href={`tel:${contactInfo.phone}`}>
                        {formatTelephone(contactInfo.phone)}
                    </Anchor>
                    <Space h="xl" />
                    <Text ta="center" size="xl" fw={500}>
                        Redes Sociais
                    </Text>
                    <Anchor ta="center" size="lg" fw={500} href={contactInfo.facebook}>
                        Facebook: APRAI
                    </Anchor>
                    <Anchor ta="center" size="lg" fw={500} href={`https://www.instagram.com/${contactInfo.instagram}`}>
                        Instagram: {contactInfo.instagram}
                    </Anchor>
                </Stack>
                <div>
                    <EditableSectionImage section="contactInfo" radius="xl" h={370}/>
                </div>
            </SimpleGrid>
        </>
    );
}

export default LandingPage
