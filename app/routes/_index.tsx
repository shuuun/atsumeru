import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import '~/.server/rssFetcher';
import { fetchRss } from '~/.server/rssFetcher';

export const meta: MetaFunction = () => {
  return [
    { title: 'Atsumeru' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  return json(await fetchRss());
}

export default function Index() {
  const feeds = useLoaderData<typeof loader>();
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Box p={2} bg='teal.500'>
        <Flex>
          <Heading as='h2' color={'white'}>
            Feeder
          </Heading>
          <Spacer />
          <IconButton
            colorScheme='teal'
            aria-label='Add Feed URL.'
            icon={<AddIcon />}
          />
        </Flex>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4} p={2}>
        {feeds.map((feed) => (
          <FeedItem
            title={feed.title}
            link={feed.link}
            description={feed.description}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}

interface FeedItemProps {
  title: string;
  link: string;
  description: string;
}

const FeedItem = ({ title, link, description }: FeedItemProps) => {
  return (
    <Card p={2} maxW='sm' onClick={() => open(link)}>
      <Image
        src={'https://source.unsplash.com/random/800x600'}
        borderRadius='lg'
        height='160'
        width={'100%'}
      />
      <Heading as='h3' size='md' mt={2}>
        {title}
      </Heading>
      <VStack>
        <Text>{link}</Text>
        <Spacer />
        <Text>{description}</Text>
      </VStack>
    </Card>
  );
};
