import {Card, Image, Text, Title} from "@mantine/core";
import {HashLink} from "react-router-hash-link";

/**
 * A Post Card component that renders a card representing a post with optional image and date.
 * 
 * @param {object} post - The post data to be displayed in the card.
 * @param {number} h - The height of the card.
 * @param {number} w - The width of the card.
 * @param {boolean} light - A flag to apply a light theme to the card. Default: false.
 * @param {boolean} showDate - A flag to show or hide the post date. Default: true.
 * @param {number} imgHPct - The height percentage of the image relative to the card height. Default: 0.6.
 * @returns {JSX.Element} The PostCard component.
 */
export function PostCard({post, h, w, showDate=true, imgHPct=0.6, ...others}) {
    const {isBlog, title, content, imageUrl} = post;
    
    const route = isBlog ? 'blog' : 'bazar';

    const bgColor = "aprai-purple.1";
    const textColor = "aprai-purple.9";
    return (
        <Card
            radius={0} shadow={"md"}
            h={h} w={w}
            bg={bgColor}
            {...others}
            component={HashLink} to={`/${route}/${post._id}`}
        >
            {imageUrl &&
                <Card.Section>
                    <Image src={imageUrl} alt={title} height={imgHPct * h}/>
                </Card.Section>
            }

            <Card.Section p='sm' pt={imageUrl ? 0 : 'sm'}>
                {showDate && post.date &&
                    <Text size='xs' ml='2px' c={textColor}>
                        {new Date(post.date).toLocaleDateString('pt-BR', 
                            { day: '2-digit', month: '2-digit', year: 'numeric' })}
                    </Text>
                }
                <Title order={4} lineClamp={1} c={textColor} mt='3px'>
                    {title}
                </Title>
                <Text 
                    c={textColor}
                    lineClamp={3}
                    dangerouslySetInnerHTML={{__html: content}}
                    mt='-10px'
                />
            </Card.Section>
        </Card>
    )
}