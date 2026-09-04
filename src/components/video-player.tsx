"use client";

import { useEffect, useRef, useState } from "react";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import { usePreferences } from "@/components/preferences";

const FALLBACK_DURATION = 10.005;

function formatTime(value: number) {
  if (!Number.isFinite(value)) return "0:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function VideoPlayer() {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastAudibleVolume = useRef(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FALLBACK_DURATION);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { language } = usePreferences();

  const labels =
    language === "ar"
      ? {
          play: "تشغيل الفيديو",
          pause: "إيقاف الفيديو مؤقتًا",
          mute: "كتم الصوت",
          unmute: "تشغيل الصوت",
          fullscreen: "ملء الشاشة",
          exitFullscreen: "تصغير الشاشة",
          volume: "مستوى الصوت",
          seek: "تقديم أو تأخير الفيديو",
        }
      : {
          play: "Play video",
          pause: "Pause video",
          mute: "Mute",
          unmute: "Unmute",
          fullscreen: "Enter fullscreen",
          exitFullscreen: "Exit fullscreen",
          volume: "Volume",
          seek: "Seek video",
        };

  useEffect(() => {
    function syncFullscreenState() {
      setIsFullscreen(document.fullscreenElement === playerRef.current);
    }

    document.addEventListener("fullscreenchange", syncFullscreenState);
    return () =>
      document.removeEventListener("fullscreenchange", syncFullscreenState);
  }, []);

  function syncDuration(video: HTMLVideoElement) {
    const nativeDuration = video.duration;
    if (Number.isFinite(nativeDuration) && nativeDuration > 0) {
      setDuration(nativeDuration);
      return;
    }

    if (video.seekable.length > 0) {
      const seekableDuration = video.seekable.end(video.seekable.length - 1);
      if (Number.isFinite(seekableDuration) && seekableDuration > 0) {
        setDuration(seekableDuration);
      }
    }
  }

  async function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      if (video.ended) video.currentTime = 0;
      await video.play();
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || video.volume === 0) {
      const restoredVolume = Math.max(lastAudibleVolume.current, 0.5);
      video.volume = restoredVolume;
      video.muted = false;
    } else {
      lastAudibleVolume.current = video.volume;
      video.muted = true;
    }
  }

  function seek(value: number) {
    const video = videoRef.current;
    if (!video) return;
    const nextTime = Math.min(Math.max(value, 0), duration);
    video.currentTime = nextTime;
    setCurrentTime(nextTime);
  }

  function changeVolume(value: number) {
    const video = videoRef.current;
    if (!video) return;

    const nextVolume = Math.min(Math.max(value, 0), 1);
    video.volume = nextVolume;
    video.muted = nextVolume === 0;
    if (nextVolume > 0) lastAudibleVolume.current = nextVolume;
  }

  async function toggleFullscreen() {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (playerRef.current?.requestFullscreen) {
      await playerRef.current.requestFullscreen();
    }
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="video-player" ref={playerRef}>
      <video
        ref={videoRef}
        className="video-player-media"
        playsInline
        preload="metadata"
        poster="/images/heroes/thumbnail.png"
        onClick={togglePlayback}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => syncDuration(event.currentTarget)}
        onDurationChange={(event) => syncDuration(event.currentTarget)}
        onCanPlay={(event) => syncDuration(event.currentTarget)}
        onProgress={(event) => syncDuration(event.currentTarget)}
        onTimeUpdate={(event) => {
          setCurrentTime(event.currentTarget.currentTime);
          syncDuration(event.currentTarget);
        }}
        onVolumeChange={(event) => {
          setVolume(event.currentTarget.volume);
          setIsMuted(
            event.currentTarget.muted || event.currentTarget.volume === 0,
          );
        }}
      >
        <source src="/videos/frey-m-company-film.mp4" type="video/mp4" />
      </video>

      {!isPlaying && (
        <button
          className="video-center-play"
          type="button"
          onClick={togglePlayback}
          aria-label={labels.play}
        >
          <Play size={31} fill="currentColor" aria-hidden="true" />
        </button>
      )}

      <div className="video-controls">
        <button
          className="video-control-button"
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? labels.pause : labels.play}
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </button>

        <span className="video-time" aria-hidden="true">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <input
          className="video-progress"
          type="range"
          min={0}
          max={duration || 0}
          step="0.05"
          value={Math.min(currentTime, duration || 0)}
          onInput={(event) => seek(Number(event.currentTarget.value))}
          aria-label={labels.seek}
          style={{ "--video-progress": `${progress}%` } as React.CSSProperties}
        />

        <div className="video-volume-control">
          <button
            className="video-control-button"
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? labels.unmute : labels.mute}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <input
            className="video-volume"
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={isMuted ? 0 : volume}
            onInput={(event) => changeVolume(Number(event.currentTarget.value))}
            aria-label={labels.volume}
            style={
              {
                "--video-volume": `${(isMuted ? 0 : volume) * 100}%`,
              } as React.CSSProperties
            }
          />
        </div>

        <button
          className="video-control-button"
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? labels.exitFullscreen : labels.fullscreen}
          aria-pressed={isFullscreen}
        >
          {isFullscreen ? <Minimize size={19} /> : <Maximize size={19} />}
        </button>
      </div>
    </div>
  );
}
