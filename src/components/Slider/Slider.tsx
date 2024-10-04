import { Slides } from "../../types/types.ts";
import s from './Slider.module.css';
import Button from "../../shared/ui/Button/Button.tsx";
import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { SLIDER_TIME } from "../../constants/constants.ts";

type Props = {
    slides: Slides[]
}

const Slider = ({ slides }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [intervalId, setIntervalId] = useState<number | null>(null);

    const [progress, setProgress] = useState(0);

    const slidesLength = slides.length;

    const onNextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesLength);
        setProgress(0);
    };

    const onPrevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slidesLength) % slidesLength);
        setProgress(0);
    };

    const onPlay = () => {
        if (!isPlaying) {
            setIsPlaying(true);
            const id = window.setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        onNextSlide();
                        return 0;
                    }
                    return prevProgress + 1;
                });
            }, SLIDER_TIME);
            setIntervalId(id);
        }
    };

    const onStop = () => {
        if (isPlaying) {
            setIsPlaying(false);
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [intervalId]);

    return (
        <div className={s.container}>
            <div className={s.slidesBlock}>
                <div>
                    <BsArrowLeftCircleFill onClick={onPrevSlide} className={s.arrow} />
                </div>

                <div className={s.slideContainer}>
                    <span className={s.progressBar} style={{ width: `${progress}%` }} />

                    {slides.map(({src, alt, id}, index) => (
                        index === currentIndex && (
                            <img src={src} alt={alt} key={id} className={s.slide} />
                        )
                    ))}
                </div>

                <div>
                    <BsArrowRightCircleFill onClick={onNextSlide} className={s.arrow} />
                </div>
            </div>

            <div className={s.dots}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${s.dot} ${currentIndex === index ? s.active : ''}`}
                    />
                ))}
            </div>

            <div className={s.btnsBlock}>
                <Button onClick={onPlay}>Play</Button>
                <Button onClick={onStop}>Stop</Button>
            </div>

        </div>
    )
};

export default Slider;