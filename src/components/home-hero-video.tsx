"use client";

import { useEffect, useRef, useState } from "react";

export const filmModalPlaybackEvent = "frey-m:film-modal-playback";

export function HomeHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setReady(true);
    }

    let inView = false;
    const syncPlayback = () => {
      if (inView && !document.hidden && !document.querySelector(".film-modal")) {
        if (video.paused) void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    document.addEventListener(filmModalPlaybackEvent, syncPlayback);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      document.removeEventListener(filmModalPlaybackEvent, syncPlayback);
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="home-hero-video"
      data-ready={ready}
      src="/videos/frey-m-hero.mp4"
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onLoadedData={() => setReady(true)}
      onPlaying={() => setReady(true)}
      onError={() => setReady(false)}
    />
  );
}
