import React, { useEffect, useRef, useState } from "react";
import formatDuration from "../utils/formatDuration";
import { formatTimeAgo } from "../utils/formatTimeAgo";

type videoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
  notation: "compact",
});

export default function VideoGridItem({
  id,
  title,
  channel,
  views,
  postedAt,
  duration,
  thumbnailUrl,
  videoUrl,
}: videoGridItemProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current == null) return;

    if (isVideoPlaying) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  return (
    <div
      className="flex flex-col gap-2"
      onMouseEnter={() => setIsVideoPlaying(true)}
      onMouseLeave={() => setIsVideoPlaying(false)}
    >
      <a href={`/watch?v=${id}`} className="relative aspect-video">
        <img
          src={thumbnailUrl}
          className={`block w-full h-full object-cover rounded-xl transition-[border-radius] duration-200 ${
            isVideoPlaying ? "rounded-none" : "rnded-xl"
          }`}
        />
        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-.5 rounded">
          {formatDuration(duration)}
        </div>
        <video
          ref={videoRef}
          muted
          playsInline
          src={videoUrl}
          className={`block h-full object-cover absolute inset-0 transition-opacity delay-200 duration-200 ${
            isVideoPlaying ? "opacity-100" : "opacity-0"
          }`}
        ></video>
      </a>
      <div className="flex gap-2">
        <a href={`/@${channel.id}`} className="flex-shrink-0">
          <img
            src={channel.profileUrl}
            alt="channel-image"
            className="w-12 h-12 rounded-full"
          />
        </a>
        <div>
          <a href={`/watch?v=${id}`} className="font-bold">
            {title}
          </a>
          <a href={`/@${channel.id}`} className="text-secondary-text text-sm">
            {channel.name}
          </a>
          <div className="text-secondary-text text-sm">
            {VIEW_FORMATTER.format(views)} Views . {formatTimeAgo(postedAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
