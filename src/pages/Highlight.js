import { useEffect, useState } from 'react';
import '../css/highlight/highlight.css'

const Highlight = () => {
  const [videos, setVideos] = useState([]);
  // const [focusedVideo,setFocusVideo] = useState(false);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_YOUTUBE_API;
    const CHANNEL_ID = 'UCoVz66yWHzVsXAFG8WhJK9g';

    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`
        );
        const data = await response?.json();
        console.log(data)

        const highlights = data?.items.filter(item =>
          item.snippet.title.includes('하이라이트')
        );

        setVideos(highlights);
      } catch (error) {
        console.error('영상 불러오기 오류:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='highlightWrap'>
      <h3>KBO 하이라이트 영상 🎥</h3>
      <div className="videoList">
        {videos.map(video => (
          <div key={video?.id?.videoId} className="videoBox">
            <iframe
              src={`https://www.youtube.com/embed/${video?.id?.videoId}`}
              title={video?.snippet?.title}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Highlight;
