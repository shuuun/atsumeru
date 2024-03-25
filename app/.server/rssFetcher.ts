import Parser from 'rss-parser';

const rssParser = new Parser({
  customFields: {
    item: ['description'],
  },
});

export type Feed = {
  title: string;
  link: string;
  description: string;
};
export type rssFeeds = Feed[];
export async function fetchRss(): Promise<rssFeeds> {
  const feed = await rssParser.parseURL('https://zenn.dev/topics/react/feed');
  var feeds: rssFeeds = [];
  feed.items.forEach((item) => {
    feeds.push({
      title: item.title ?? '',
      link: item.link ?? '',
      description: item.description,
    });
  });
  return feeds;
}
