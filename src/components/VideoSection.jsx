import React, { useRef, useEffect } from 'react';
import './styles/VideoSection.css';

const VideoSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      const rect = video.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate scroll percentage relative to video visibility
      const scrollPercent = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);

      if (video.readyState >= 3) {
        video.currentTime = video.duration * scrollPercent;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="video-container">
      <div className="company-heading">Confidential</div>
      <video id="scrollVideo" muted ref={videoRef} playsInline>
        <source src="/video/bagpack.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoSection;
