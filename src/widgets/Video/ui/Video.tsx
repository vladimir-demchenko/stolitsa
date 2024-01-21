import { classNames } from 'shared/lib/classNames';
import Placeholder from 'shared/assets/img/placeholder.png';
import { Videojs } from 'shared/ui/Videojs';
// import SourceVideo from 'shared/assets/video/STOлица.Лето_промо.mp4';
import 'video.js/dist/video-js.css';

import cls from './Video.module.scss';
import { useEffect, useRef } from 'react';
import { Bg } from 'shared/ui/Bg/Bg';

export const Video = () => {
  const playerRef = useRef(null);

  const videojsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: '',
      type: 'video/mp4'
    }]
  }

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;

    player.on('waiting', () => console.log('waiting...'));
    player.on('dispose', () => console.log('dispose'));
  }

  return (
    <div className={classNames('container', {}, [])}>
      <Bg />
      <div className={classNames('content', {}, [cls.video])}>
        <h2 className={cls.title}>как это было в <span className={cls.highlighted}>2023</span> году?</h2>
        <div className={cls.videoWrapper}>
          <Videojs options={videojsOptions} onReady={handlePlayerReady} />
        </div>
      </div>
      <svg className={classNames('curves', {}, [cls.purpleCurve])} xmlns="http://www.w3.org/2000/svg" width="338" height="956" viewBox="0 0 338 956" fill="none">
        <path d="M394.842 859.587C281.386 759.858 293.623 982.986 197.55 940.27C112.041 902.251 264.537 838.044 131.455 704.4C61.017 633.665 -43.7703 534.398 42.8094 497.16C129.389 459.922 263.488 416.146 155.342 307.103C47.1964 198.06 40.6632 -4.45329 181.269 11.1864C321.874 26.8261 390.668 169.333 449.292 137.315" stroke="#701487" stroke-width="20" stroke-linecap="round" />
      </svg>
      <svg className={classNames('curves', {}, [cls.orangeCurve])} xmlns="http://www.w3.org/2000/svg" width="492" height="656" viewBox="0 0 492 656" fill="none">
        <path d="M-40.5004 62.9998C435.5 -164.5 307.759 417.979 409.562 402.838C511.366 387.698 502.295 274.861 396.572 318.141C290.849 361.42 84.4489 399.904 133.002 562.556C171.875 692.78 396.555 594.332 216.266 490.099C35.9765 385.866 -42.9238 459.948 -42.935 645.825" stroke="#FD7D32" stroke-width="20" stroke-linecap="round" />
      </svg>
    </div>
  )
}