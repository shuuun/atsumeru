import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import type { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import '~/.server/rssFetcher';
import { fetchRss } from '~/.server/rssFetcher';
import FeedItem from '~/components/feedItem';

export const meta: MetaFunction = () => {
  return [
    { title: 'atsumeru' },
    { name: 'description', content: '自分の好みの情報を集めましょう〜' },
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
            atsumeru
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
            thumbnail={feed.thumbnail}
            pubDate={feed.pubDate}
          />
        ))}
      </SimpleGrid>
    </div>
  );
}
