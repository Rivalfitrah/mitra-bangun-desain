// lib/getPosts2.js
import Parser from "rss-parser";

export async function getPosts2() {
  const parser = new Parser({
    customFields: {
      item: ["content:encoded", "category"],
    },
  });

  const feed = await parser.parseURL(
    "https://mitrabangundesain.wordpress.com/feed/"
  );

  return feed.items.map((item) => {
    const imgMatch = item["content:encoded"]?.match(/<img.*?src="(.*?)"/);
    const image = imgMatch ? imgMatch[1] : null;

    const category =
      Array.isArray(item.categories) && item.categories.length > 0
        ? item.categories[0]
        : "Uncategorized";

    return {
      id: item.guid,
      link: item.link,
      title: item.title,
      excerpt: item.contentSnippet,
      image,
      category,
    };
  });
}
