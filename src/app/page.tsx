/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function VideoPlayer() {
  // ====== REQUISITO 1: ESTADOS PARA PLAY/PAUSE ======
  const [videos] = useState<Video[]>([
    {
      id: 1,
      title: "JVKE - Her (Piano Tutorial-Synthesia+Sheet Music)",
      description: "Musica POP",
      url: "/video.mp4",
      thumbnail: "/thumbnail1.png"
    },
    {
      id: 2,
      title: "Experience - Ludovico Einaudi - violin cover by Daniel Jang",
      description: "Musica Classica",
      url: "/video2.mp4",
      thumbnail: "/thumbnail2.jpg"
    },
    {
      id: 3,
      title: "Neto Carvalho l Além do rio azul l Cello cover (Julia vitória)",
      description: "Musica Gospel",
      url: "/video3.mp4",
      thumbnail: "/thumbnail3.jpg"
    }
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);                    // REQUISITO 2: Estado Volume
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentVideo = videos[currentVideoIndex];

  // ====== FUNÇÕES MEMORIZADAS (useCallback) ======

  // PRÓXIMO VÍDEO
  const handleNext = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setCurrentTime(0);
    if (isPlaying && videoRef.current) {
      setTimeout(() => videoRef.current?.play(), 100);
    }
  }, [videos.length, isPlaying]);

  // AUTO-HIDE CONTROLS
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [isPlaying]);

  // PLAY/PAUSE
  const togglePlayPause = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  // VÍDEO ANTERIOR
  const handlePrevious = useCallback(() => {
    if (currentTime > 3) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      setCurrentTime(0);
    } else {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
      setCurrentTime(0);
      if (isPlaying && videoRef.current) {
        setTimeout(() => videoRef.current?.play(), 100);
      }
    }
  }, [currentTime, videos.length, isPlaying]);

  // CONTROLE DE TEMPO
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  }, []);

  // MUTE/UNMUTE
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  // FULLSCREEN
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // FORMATAR TEMPO
  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // SELECIONAR VÍDEO
  const selectVideo = useCallback((index: number) => {
    setCurrentVideoIndex(index);
    setCurrentTime(0);
    if (isPlaying && videoRef.current) {
      setTimeout(() => videoRef.current?.play(), 100);
    }
  }, [isPlaying]);


  // ====== EFEITOS (useEffect) ======

  // REQUISITO 2: useEffect para VOLUME
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // useEffect para EVENTOS DO VÍDEO
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      if (currentVideoIndex < videos.length - 1) {
        handleNext();
      }
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
    };
  }, [currentVideoIndex, videos.length, handleNext]); // ADICIONADO handleNext

  // DETECTAR FULLSCREEN
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // AUTO-HIDE CONTROLS
  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, resetControlsTimeout]); // ADICIONADO resetControlsTimeout

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">

        {/* ====== CABEÇALHO ====== */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-t-2xl p-6 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Player de Vídeo</h1>
          <p className="text-red-100">Atividade 10 - Multimídia</p>
          <p className="text-red-200 text-sm mt-1">Desenvolvido por: Lucas Rodrigues</p>
        </div>

        <div className="bg-gray-900 rounded-b-2xl shadow-2xl overflow-hidden border-x-2 border-b-2 border-red-900">
          <div className="grid md:grid-cols-3 gap-6 p-6">

            {/* ====== PLAYER PRINCIPAL ====== */}
            <div className="md:col-span-2">
              <div
                ref={containerRef}
                className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
                onMouseMove={resetControlsTimeout}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* ====== REQUISITO 3: TAG VIDEO HTML5 ====== */}
                <video
                  ref={videoRef}
                  src={currentVideo.url}
                  className="w-full aspect-video object-contain"
                  onClick={togglePlayPause}
                  poster={currentVideo.thumbnail}
                />

                {/* ====== OVERLAY DE CONTROLES ====== */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {/* ====== TÍTULO DO VÍDEO ====== */}
                  <div className="absolute top-0 left-0 right-0 p-4">
                    <h2 className="text-white text-xl font-bold drop-shadow-lg">
                      {currentVideo.title}
                    </h2>
                    <p className="text-gray-300 text-sm">{currentVideo.description}</p>
                  </div>

                  {/* ====== BOTÃO PLAY CENTRAL ====== */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={togglePlayPause}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all"
                      >
                        <Play size={48} className="ml-2" />
                      </button>
                    </div>
                  )}

                  {/* ====== CONTROLES INFERIORES ====== */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* BARRA DE PROGRESSO */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 1}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
                      style={{
                        background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 100%)`
                      }}
                    />

                    <div className="flex items-center justify-between gap-4">
                      {/* CONTROLES ESQUERDA */}
                      <div className="flex items-center gap-3">
                        {/* REQUISITO 1: BOTÃO PLAY/PAUSE */}
                        <button
                          onClick={togglePlayPause}
                          className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2 transition-all"
                          title={isPlaying ? "Pausar" : "Reproduzir"}
                        >
                          {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                        </button>

                        {/* ANTERIOR */}
                        <button
                          onClick={handlePrevious}
                          className="text-white hover:text-red-400 transition-colors"
                          title="Vídeo Anterior"
                        >
                          <SkipBack size={24} />
                        </button>

                        {/* PRÓXIMO */}
                        <button
                          onClick={handleNext}
                          className="text-white hover:text-red-400 transition-colors"
                          title="Próximo Vídeo"
                        >
                          <SkipForward size={24} />
                        </button>

                        {/* TEMPO */}
                        <div className="text-white text-sm font-medium">
                          {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                      </div>

                      {/* CONTROLES DIREITA */}
                      <div className="flex items-center gap-3">
                        {/* REQUISITO 2: CONTROLE DE VOLUME */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={toggleMute}
                            className="text-white hover:text-red-400 transition-colors"
                            title={isMuted ? "Ativar Som" : "Silenciar"}
                          >
                            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                          </button>

                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={isMuted ? 0 : volume}
                            onChange={(e) => setVolume(parseInt(e.target.value))}
                            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%, #374151 100%)`
                            }}
                            title={`Volume: ${isMuted ? 0 : volume}%`}
                          />
                        </div>

                        {/* FULLSCREEN */}
                        <button
                          onClick={toggleFullscreen}
                          className="text-white hover:text-red-400 transition-colors"
                          title={isFullscreen ? "Sair Tela Cheia" : "Tela Cheia"}
                        >
                          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES DO VÍDEO */}
              <div className="mt-4 bg-gray-800 rounded-lg p-4">
                <h3 className="text-white text-lg font-bold mb-2">{currentVideo.title}</h3>
                <p className="text-gray-400 text-sm">{currentVideo.description}</p>
              </div>
            </div>

            {/* ====== PLAYLIST ====== */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-xl p-4">
                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <span>📺</span> Playlist ({videos.length} vídeos)
                </h3>

                <div className="space-y-3">
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => selectVideo(index)}
                      className={`w-full text-left rounded-lg overflow-hidden transition-all ${index === currentVideoIndex
                          ? 'bg-red-600 shadow-lg transform scale-105'
                          : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                    >
                      <div className="relative aspect-video bg-gray-900">
                        {/* THUMBNAIL DO VÍDEO */}
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback se imagem não carregar
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        {/* FALLBACK (ícone se não tiver imagem) */}
                        <div className="hidden absolute inset-0 flex items-center justify-center">
                          <div className={`text-4xl ${index === currentVideoIndex ? 'text-white' : 'text-gray-600'}`}>
                            🎬
                          </div>
                        </div>
                        {index === currentVideoIndex && isPlaying && (
                          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                            ▶ TOCANDO
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className={`font-semibold text-sm mb-1 ${index === currentVideoIndex ? 'text-white' : 'text-gray-200'
                          }`}>
                          {video.title}
                        </h4>
                        <p className={`text-xs ${index === currentVideoIndex ? 'text-red-100' : 'text-gray-400'
                          }`}>
                          {video.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* INSTRUÇÕES */}
              <div className="mt-4 bg-gray-800 rounded-xl p-4">
                <h3 className="text-white text-sm font-bold mb-2">💡 Instruções</h3>
                <ul className="text-gray-400 text-xs space-y-1">
                  <li>• Clique no vídeo para play/pause</li>
                  <li>• Arraste a barra para navegar</li>
                  <li>• Use os botões ⏮️ ⏭️ para trocar</li>
                  <li>• Ajuste o volume com o slider</li>
                  <li>• Pressione ⛶ para tela cheia</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ====== RODAPÉ ====== */}
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            ✅ REQUISITO 1: Play/Pause implementado |
            ✅ REQUISITO 2: Controle de volume funcional |
            ✅ REQUISITO 3: Tag &lt;video&gt; HTML5 |
            ✅ REQUISITO 4: Layout responsivo
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Desenvolvido com Next.js + React + TypeScript + Tailwind CSS
          </p>
        </div>

        {/* ====== ESTILOS CUSTOMIZADOS ====== */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: none;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
        `}</style>
      </div>
    </div>
  );
}