import React, { useState, useEffect, useCallback } from 'react';

import { getNews } from 'api';

import { StyledContainer } from 'components/StyledContainer';

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    const news = await getNews();
    setNews(news);
    setLoading(false);
  }, [setNews, setLoading]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading)
    return (
      <img className="loader" alt="loader" src={require('assets/loader.gif')} />
    );

  console.log(news);
  return (
    <StyledContainer>
      {news.length ? (
        <>
          <h1>Job Related News</h1>
          <p className="mx-4 font-bold text-gray-800 text-sm">
            Total Results: {news.length}
          </p>
          {news
            .slice()
            .reverse()
            .map((n) => (
              <a
                href={n.url}
                target="_blank"
                rel="noopener noreferrer"
                key={n.publishedAt}
                className="news-item">
                <p className="news-title">{n.title}</p>
                <p className="news-description">{n.description}</p>
                <div className="publishedAt">
                  <p className="text-sm text-blue-500 hover:underline">
                    Read more...
                  </p>
                  <p>Published at: {n.publishedAt.substring(0, 10)}</p>
                </div>
              </a>
            ))}
        </>
      ) : (
        <h1>No recent news found!</h1>
      )}
    </StyledContainer>
  );
}

export default News;
