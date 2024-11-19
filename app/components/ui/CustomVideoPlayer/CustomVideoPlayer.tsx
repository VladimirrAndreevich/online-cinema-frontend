import { FC, useEffect, useState } from "react";
import { IVideoPlayer } from "../VideoPlayer/video.types";
import ReactPlayer from "react-player";
import styles from "./CustomVideoPlayer.module.scss";
import MaterialIcon from "../MaterialIcon";
import useCustomVideoPlayer from "./useCustomVideoPlayer";
import cn from "classnames";
import { useAuth } from "@/hooks/useAuth";
import AuthPlaceholder from "../VideoPlayer/AuthPlaceholder/AuthPlaceholder";

const CustomVideoPlayer: FC<IVideoPlayer> = ({ videoSource, slug }) => {
	const { actions, playerRef, playerContainerRef, video } =
		useCustomVideoPlayer();
	const { user } = useAuth();

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	if (!user) {
		return (
			<div className={styles.wrapperAuth}>
				<AuthPlaceholder slug={slug} />;
			</div>
		);
	}

	return (
		<div
			className={cn(styles.wrapper, {
				[styles.hideCursor]: !video.isControlsVisible,
			})}
			ref={playerContainerRef}
		>
			<ReactPlayer
				ref={playerRef}
				url={`${videoSource}#t=8`}
				playing={video.isPlaying}
				width="100%"
				height="auto"
				onProgress={actions.handleProgress}
				onDuration={actions.handleDuration}
				controls={false}
				muted={video.isMuted}
				volume={video.isMuted ? 0 : video.volume}
				className={styles.player}
			/>

			<div
				className={cn(styles.progressBar, {
					[styles.hide]: !video.isControlsVisible,
				})}
				onClick={actions.handleSeekChange}
				onMouseMove={actions.handleMouseMove}
				onMouseLeave={actions.handleMouseLeave}
			>
				{/* Индикатор текущего прогресса */}
				<div
					style={{
						width: `${video.played * 100}%`,
						height: "100%",
						backgroundColor: "red",
					}}
				/>

				{/* Подсказка времени при наведении */}
				{video.hoverTime !== null && (
					<div
						className={styles.hoverTime}
						style={{
							left: `${(video.hoverTime / video.duration) * 100}%`,
						}}
					>
						{formatTime(video.hoverTime)}
					</div>
				)}
			</div>

			<button
				onClick={actions.handlePlayPause}
				className={cn(styles.bigPlayButton, {
					[styles.hideCursor]: !video.isControlsVisible,
				})}
			>
				{!video.isPlaying && <MaterialIcon name="MdOutlinePlayCircleOutline" />}
			</button>

			{/* Кастомные кнопки управления */}
			<div
				className={cn(styles.controls, {
					[styles.hide]: !video.isControlsVisible,
				})}
			>
				<button onClick={() => actions.handleSeek(-0.1)}>
					<MaterialIcon name="MdHistory" />
				</button>

				<button onClick={actions.handlePlayPause} className={styles.playButton}>
					{video.isPlaying ? (
						<MaterialIcon name="MdOutlinePause" />
					) : (
						<MaterialIcon name="MdPlayArrow" />
					)}
				</button>

				<button onClick={() => actions.handleSeek(0.1)}>
					<MaterialIcon name="MdUpdate" />
				</button>

				<button
					onClick={actions.handleMuteToggle}
					className={styles.muteButton}
				>
					{video.isMuted ? (
						<MaterialIcon name="MdVolumeOff" />
					) : (
						<MaterialIcon name="MdVolumeUp" />
					)}
				</button>

				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={video.volume}
					onChange={actions.handleVolumeChange}
					className={styles.volumeSlider}
				/>

				<div className={styles.time}>
					{formatTime(video.currentTime)} / {formatTime(video.duration)}
				</div>

				<button
					onClick={actions.handleFullScreen}
					className={styles.fullscreenButton}
				>
					<MaterialIcon name="MdFullscreen" />
				</button>
			</div>
		</div>
	);
};

export default CustomVideoPlayer;
