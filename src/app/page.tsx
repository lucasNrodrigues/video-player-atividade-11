
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipForward, SkipBack, RotateCcw, RotateCw } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration?: number;
}

export default function VideoPlayer() {
  // ====== REQUISITO 1: ESTADOS PARA LISTAGEM ======
  const [videos, setVideos] = useState<Video[]>([
    {
      id: 1,
      title: "JVKE - Her (Piano Tutorial/Synthesia+Sheet Music)",
      description: "Musica pop",
      url: "/video.mp4",
      thumbnail: "/thumbnail1.jpg",
      duration: 0
    },
    {
      id: 2,
      title: "Experience - Ludovico Einaudi - violin cover by Daniel Jang",
      description: "musica Classica",
      url: "/video2.mp4",
      thumbnail: "/thumbnail2.jpg",
      duration: 0
    },
    {
      id: 3,
      title: "Neto Carvalho l Além do rio azul l Cello cover (Julia vitória)",
      description: "musica gospel",
      url: "/video3.mp4",
      thumbnail: "/thumbnail3.jpg",
      duration: 0
    }
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);           // REQUISITO 3: Tempo atual
  const [duration, setDuration] = useState<number>(0);                 // REQUISITO 3: Tempo total
  const [volume, setVolume] = useState<number>(70);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentVideo = videos[currentVideoIndex];

  // ====== useEffect para VOLUME ======
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // ====== REQUISITO 3: useEffect para ATUALIZAÇÃO DINÂMICA DO TEMPO ======
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Atualiza tempo atual dinamicamente
    const updateTime = () => setCurrentTime(video.currentTime);
    
    // Captura duração do vídeo e atualiza na lista
    const updateDuration = () => {
      setDuration(video.duration);
      const updatedVideos = [...videos];
      updatedVideos[currentVideoIndex].duration = video.duration;
      setVideos(updatedVideos);
    };
    
    // REQUISITO 5: Reprodução automática do próximo vídeo
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
  }, [currentVideoIndex, videos.length]);

  // ====== DETECTAR FULLSCREEN ======
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // ====== AUTO-HIDE CONTROLS ======
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);

  // ====== REQUISITO 2: PLAY/PAUSE (CONTROLES CUSTOMIZADOS) ======
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // ====== REQUISITO 5: PRÓXIMO VÍDEO ======
  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setCurrentTime(0);
    if (isPlaying && videoRef.current) {
      setTimeout(() => videoRef.current?.play(), 100);
    }
  };

  // ====== REQUISITO 5: VÍDEO ANTERIOR ======
  const handlePrevious = () => {
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
  };

  // ====== REQUISITO 4: CONTROLE DE TEMPO (Slider) ======
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  // ====== REQUISITO 4: AVANÇAR +10 SEGUNDOS ======
  const skipForward10 = () => {
    if (videoRef.current) {
      const newTime = Math.min(videoRef.current.currentTime + 10, duration);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // ====== REQUISITO 4: RETROCEDER -10 SEGUNDOS ======
  const skipBackward10 = () => {
    if (videoRef.current) {
      const newTime = Math.max(videoRef.current.currentTime - 10, 0);
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // ====== MUTE/UNMUTE ======
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // ====== FULLSCREEN ======
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // ====== REQUISITO 3: FORMATAR TEMPO (MM:SS) ======
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ====== REQUISITO 2: SELECIONAR VÍDEO DA LISTA ======
  const selectVideo = (index: number) => {
    setCurrentVideoIndex(index);
    setCurrentTime(0);
    if (isPlaying && videoRef.current) {
      setTimeout(() => videoRef.current?.play(), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        
        {/* ====== CABEÇALHO ====== */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl p-6 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-2">🎬 Player de Vídeo Avançado</h1>
          <p className="text-purple-100">Atividade 11 - Continuação com Controles Customizados</p>
          <p className="text-purple-200 text-sm mt-1">Desenvolvido por: Lucas do nascimento Rodrigues</p>
          <p className="text-purple-200 text-sm mt-1">Pela Disciplina de MUltimidia</p>
          <p className="text-purple-200 text-sm mt-1">Professor: REUDISMAM ROLIM DE SOUSA</p>
        </div>

        <div className="bg-gray-900 rounded-b-2xl shadow-2xl overflow-hidden border-x-2 border-b-2 border-purple-700">
          <div className="grid md:grid-cols-3 gap-6 p-6">
            
            {/* ====== PLAYER PRINCIPAL ====== */}
            <div className="md:col-span-2">
              <div 
                ref={containerRef}
                className="relative bg-black rounded-xl overflow-hidden shadow-2xl group"
                onMouseMove={resetControlsTimeout}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {/* ====== TAG VIDEO (SEM CONTROLES NATIVOS) ====== */}
                <video
                  ref={videoRef}
                  src={currentVideo.url}
                  className="w-full aspect-video object-contain"
                  onClick={togglePlayPause}
                  poster={currentVideo.thumbnail}
                  // IMPORTANTE: Sem controls nativos - todos customizados!
                  controls={false}
                />

                {/* ====== OVERLAY DE CONTROLES CUSTOMIZADOS ====== */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-300 ${
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
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
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-6 shadow-2xl transform hover:scale-110 transition-all"
                        title="Reproduzir"
                      >
                        <Play size={48} className="ml-2" />
                      </button>
                    </div>
                  )}

                  {/* ====== CONTROLES INFERIORES CUSTOMIZADOS ====== */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* REQUISITO 4: BARRA DE PROGRESSO (Slider customizado) */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 1}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mb-4"
                      style={{
                        background: `linear-gradient(to right, #9333ea 0%, #9333ea ${duration ? (currentTime / duration) * 100 : 0}%, #374151 ${duration ? (currentTime / duration) * 100 : 0}%, #374151 100%)`
                      }}
                      title="Arraste para navegar no vídeo"
                    />

                    {/* REQUISITO 3: EXIBIÇÃO DO TEMPO */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    {/* REQUISITO 4: BOTÕES -10s e +10s */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <button
                        onClick={skipBackward10}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-lg"
                        title="Retroceder 10 segundos"
                      >
                        <RotateCcw size={18} />
                        <span className="text-sm font-semibold">-10s</span>
                      </button>
                      <button
                        onClick={skipForward10}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-lg"
                        title="Avançar 10 segundos"
                      >
                        <span className="text-sm font-semibold">+10s</span>
                        <RotateCw size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      {/* CONTROLES ESQUERDA */}
                      <div className="flex items-center gap-3">
                        {/* REQUISITO 2: BOTÃO PLAY/PAUSE CUSTOMIZADO */}
                        <button
                          onClick={togglePlayPause}
                          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-3 transition-all shadow-lg"
                          title={isPlaying ? "Pausar" : "Reproduzir"}
                        >
                          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-0.5" />}
                        </button>

                        {/* REQUISITO 5: VÍDEO ANTERIOR */}
                        <button
                          onClick={handlePrevious}
                          className="text-white hover:text-purple-400 transition-colors p-2"
                          title="Vídeo Anterior"
                        >
                          <SkipBack size={28} />
                        </button>

                        {/* REQUISITO 5: PRÓXIMO VÍDEO */}
                        <button
                          onClick={handleNext}
                          className="text-white hover:text-purple-400 transition-colors p-2"
                          title="Próximo Vídeo"
                        >
                          <SkipForward size={28} />
                        </button>
                      </div>

                      {/* CONTROLES DIREITA */}
                      <div className="flex items-center gap-3">
                        {/* CONTROLE DE VOLUME CUSTOMIZADO */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={toggleMute}
                            className="text-white hover:text-purple-400 transition-colors"
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
                            className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            style={{
                              background: `linear-gradient(to right, #9333ea 0%, #9333ea ${isMuted ? 0 : volume}%, #374151 ${isMuted ? 0 : volume}%, #374151 100%)`
                            }}
                            title={`Volume: ${isMuted ? 0 : volume}%`}
                          />
                          <span className="text-white text-xs w-8">{isMuted ? 0 : volume}%</span>
                        </div>

                        {/* FULLSCREEN */}
                        <button
                          onClick={toggleFullscreen}
                          className="text-white hover:text-purple-400 transition-colors"
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
              <div className="mt-4 bg-gray-800 rounded-lg p-4 border border-purple-700">
                <h3 className="text-white text-lg font-bold mb-2">{currentVideo.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{currentVideo.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>🎬 Vídeo {currentVideoIndex + 1} de {videos.length}</span>
                  <span>⏱️ Duração: {formatTime(currentVideo.duration || 0)}</span>
                </div>
              </div>
            </div>

            {/* ====== REQUISITO 1: LISTAGEM DE VÍDEOS (PELO MENOS 3) ====== */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-xl p-4 border border-purple-700">
                <h3 className="text-white text-lg font-bold mb-4 flex items-center gap-2">
                  <span>📺</span> Playlist ({videos.length} vídeos)
                </h3>
                
                <div className="space-y-3">
                  {/* REQUISITO 2: USUÁRIO PODE SELECIONAR VÍDEO */}
                  {videos.map((video, index) => (
                    <button
                      key={video.id}
                      onClick={() => selectVideo(index)}
                      className={`w-full text-left rounded-lg overflow-hidden transition-all ${
                        index === currentVideoIndex
                          ? 'bg-purple-600 shadow-lg transform scale-105'
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
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        {/* FALLBACK */}
                        <div className="hidden absolute inset-0 items-center justify-center">
                          <div className={`text-4xl ${index === currentVideoIndex ? 'text-white' : 'text-gray-600'}`}>
                            🎬
                          </div>
                        </div>
                        
                        {/* INDICADOR DE TOCANDO */}
                        {index === currentVideoIndex && isPlaying && (
                          <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1 shadow-lg">
                            <span className="animate-pulse">⏵</span> TOCANDO
                          </div>
                        )}
                        
                        {/* OVERLAY DE PLAY */}
                        {index !== currentVideoIndex && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <div className="bg-purple-600/80 rounded-full p-3">
                              <Play size={24} className="text-white" />
                            </div>
                          </div>
                        )}

                        {/* DURAÇÃO DO VÍDEO */}
                        {video.duration && video.duration > 0 && (
                          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {formatTime(video.duration)}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className={`font-semibold text-sm mb-1 ${
                          index === currentVideoIndex ? 'text-white' : 'text-gray-200'
                        }`}>
                          {video.title}
                        </h4>
                        <p className={`text-xs ${
                          index === currentVideoIndex ? 'text-purple-100' : 'text-gray-400'
                        }`}>
                          {video.description}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* REQUISITOS IMPLEMENTADOS */}
              <div className="mt-4 bg-gray-800 rounded-xl p-4 border border-purple-700">
                <h3 className="text-white text-sm font-bold mb-3">✅ Requisitos Implementados</h3>
                <ul className="text-gray-300 text-xs space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>1.</strong> Lista com 3+ vídeos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>2.</strong> Seleção e reprodução</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>3.</strong> Tempo atual/total dinâmico</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>4.</strong> Slider + botões ±10s</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400">✓</span>
                    <span><strong>5.</strong> Navegação + auto-play</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400">★</span>
                    <span><strong>Controles 100% customizados</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ====== RODAPÉ ====== */}
        <div className="mt-4 text-center">
          <p className="text-purple-300 text-sm font-semibold">
            🎯 Atividade 11 - Todos os requisitos implementados com controles customizados
          </p>
          <p className="text-purple-400 text-xs mt-2">
            Next.js + React + TypeScript + Tailwind CSS | Controles desenvolvidos do zero
          </p>
        </div>

        {/* ====== ESTILOS CUSTOMIZADOS ====== */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
            border: 2px solid #9333ea;
          }
          
          input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: white;
            cursor: pointer;
            border: 2px solid #9333ea;
            box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          }
        `}</style>
      </div>
    </div>
  );
}
