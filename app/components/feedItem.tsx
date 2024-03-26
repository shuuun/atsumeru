import { Card, Heading, Image, Text } from '@chakra-ui/react';

interface FeedItemProps {
  title: string;
  link: string;
  description: string;
  thumbnail: string;
  pubDate: string;
}

const FeedItem = ({
  title,
  link,
  description,
  thumbnail,
  pubDate,
}: FeedItemProps) => {
  return (
    <Card p={2} maxW='sm' variant='outline' onClick={() => open(link)}>
      <Image
        src={thumbnail}
        borderRadius='lg'
        maxH='100%'
        maxW='100%'
        objectFit={'contain'}
      />
      <Heading as='h3' size='sm' mt={2}>
        {title}
      </Heading>
      <Text pt={2} lineHeight='shorter' fontSize='sm'>
        {description}
      </Text>
      <Text pt={2} fontSize='xs' lineHeight='shorter' align={'right'}>
        {pubDate}
      </Text>
    </Card>
  );
};
export default FeedItem;
