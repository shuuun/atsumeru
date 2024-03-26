import { addHours, format } from 'date-fns';
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
  thumbnail: string;
  pubDate: string;
};
export type rssFeeds = Feed[];
export async function fetchRss(): Promise<rssFeeds> {
  const feed = await rssParser.parseURL('https://zenn.dev/topics/react/feed');
  var feeds: rssFeeds = [];

  feed.items.forEach((item) => {
    feeds.push({
      title: item.title ?? '',
      link: item.link ?? '',
      description: item.description.slice(0, 50) + '...',
      thumbnail: item.enclosure?.url ?? '',
      pubDate: convertGMTToJST(item.pubDate ?? ''),
    });
  });
  return feeds;
}

function convertGMTToJST(gmtDateString: string): string {
  // Dateオブジェクトに変換
  const date = new Date(gmtDateString);

  // JSTはUTCよりも9時間進んでいるので、9時間加算
  const dateInJST = addHours(date, 9);

  // yyyy/MM/dd形式に変換
  return format(dateInJST, 'yyyy/MM/dd HH:mm');
}
