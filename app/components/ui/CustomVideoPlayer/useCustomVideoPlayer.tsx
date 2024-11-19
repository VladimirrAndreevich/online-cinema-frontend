import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

const useCustomVideoPlayer = () => {
	const playerRef = useRef<ReactPlayer | null>(null);
	const playerContainerRef = useRef<HTMLDivElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [played, setPlayed] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [hoverTime, setHoverTime] = useState<number | null>(null);
	const [volume, setVolume] = useState(0.8);
	const [isControlsVisible, setIsControlsVisible] = useState(true);

	// Таймер для скрытия элементов управления
	useEffect(() => {
		let hideControlsTimer: NodeJS.Timeout;

		// Сбрасываем таймер на 3 секунды при каждом движении мыши
		const resetControlsTimer = () => {
			setIsControlsVisible(true);
			clearTimeout(hideControlsTimer);
			hideControlsTimer = setTimeout(() => setIsControlsVisible(false), 3000);
		};

		// Добавляем обработчики для движения мыши
		playerContainerRef.current?.addEventListener(
			"mousemove",
			resetControlsTimer,
		);

		// Очищаем таймер и обработчики при размонтировании
		return () => {
			clearTimeout(hideControlsTimer);
			playerContainerRef.current?.removeEventListener(
				"mousemove",
				resetControlsTimer,
			);
		};
	}, [playerContainerRef]);

	// Функция для включения и выключения звука
	const handleMuteToggle = () => {
		setIsMuted((prev) => !prev);
	};

	// Функция для изменения уровня громкости
	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVolume(parseFloat(e.target.value));
	};

	// Функция для управления воспроизведением
	const handlePlayPause = useCallback(() => {
		setIsPlaying((prev) => !prev);
	}, []);

	// Функция для обновления состояния при изменении прогресса
	const handleProgress = (progress: { played: number }) => {
		setPlayed(progress.played);
		if (playerRef.current) {
			setCurrentTime(playerRef.current.getCurrentTime());
		}
	};

	// Функция для установки общей продолжительности видео
	const handleDuration = (duration: number) => {
		setDuration(duration);
	};

	// Перемотка вперед
	const handleSeek = (amount: number) => {
		if (playerRef.current) {
			playerRef.current.seekTo(played + amount, "fraction");
		}
	};

	// Функция для перемотки видео
	const handleSeekChange = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
	) => {
		if (playerRef.current) {
			// Получаем ширину прогресс-бара
			const progressBar = e.currentTarget;
			const rect = progressBar.getBoundingClientRect();
			const clickPosition = e.clientX - rect.left; // Позиция клика по горизонтали
			const clickFraction = clickPosition / rect.width; // Вычисляем дробное значение

			// Обновляем состояние played для немедленного обновления полоски прогресса
			setPlayed(clickFraction);

			// Перематываем видео
			playerRef.current.seekTo(clickFraction, "fraction");
		}
	};

	// Функция для обработки наведения на прогресс-бар
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const progressBar = e.currentTarget;
		const rect = progressBar.getBoundingClientRect();
		const mousePosition = e.clientX - rect.left;
		const hoverFraction = mousePosition / rect.width;
		const time = hoverFraction * duration;

		setHoverTime(time);
	};

	// Функция для выхода с прогресс-бара (убираем отображение времени)
	const handleMouseLeave = () => {
		setHoverTime(null);
	};

	// Функция для переключения в полный экран
	const handleFullScreen = () => {
		if (playerContainerRef.current) {
			if (document.fullscreenElement) {
				document.exitFullscreen();
			} else {
				playerContainerRef.current.requestFullscreen();
			}
		}
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowRight": {
					handleSeek(0.1);
					break;
				}

				case "ArrowLeft": {
					handleSeek(-0.1);
					break;
				}

				case " ": {
					e.preventDefault();
					handlePlayPause();
					break;
				}

				case "f": {
					handleFullScreen();
					break;
				}

				case "m": {
					handleMuteToggle();
					break;
				}

				default: {
					return;
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	const value = useMemo(
		() => ({
			playerRef,
			playerContainerRef,
			actions: {
				handleMuteToggle,
				handleVolumeChange,
				handlePlayPause,
				handleProgress,
				handleDuration,
				handleSeek,
				handleSeekChange,
				handleMouseMove,
				handleMouseLeave,
				handleFullScreen,
			},
			video: {
				isPlaying,
				isMuted,
				hoverTime,
				currentTime,
				duration,
				volume,
				played,
				isControlsVisible,
			},
		}),
		[
			isPlaying,
			hoverTime,
			currentTime,
			duration,
			isMuted,
			volume,
			isControlsVisible,
		],
	);

	return value;
};

export default useCustomVideoPlayer;
