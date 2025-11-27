import React, { useEffect, useRef, useState } from 'react';

import { ArrowRight, Zap, TrendingUp, Sun, Layers, BarChart3, Globe, Search, ShieldCheck } from 'lucide-react';



interface LandingPageProps {

  onEnter: () => void;

}



interface Particle {

  x: number;

  y: number;

  baseX: number; // The target position (shape)

  baseY: number;

  originX: number; // The random scattered position

  originY: number;

  size: number;

  color: string;

  density: number;

  vx: number;

  vy: number;

}



// Composant d'icône animée : nuage aléatoire qui se magnétise en forme lorsqu'il est visible.

const ParticleIcon: React.FC<{ type: 'clock' | 'globe' | 'shield'; color: string }> = ({ type, color }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);

  const isActiveRef = useRef(false);

  const particlesRef = useRef<Particle[]>([]);

  const animationRef = useRef<number>(0);



  const getShapePoints = (shape: string): { x: number; y: number }[] => {

    const points: { x: number; y: number }[] = [];

    const cx = 0.5;

    const cy = 0.5;

    const add = (x: number, y: number) => points.push({ x, y });



    if (shape === 'clock') {

      for (let i = 0; i < Math.PI * 2; i += 0.1) add(cx + 0.35 * Math.cos(i), cy + 0.35 * Math.sin(i));

      for (let i = 0; i < 0.25; i += 0.02) add(cx, cy - i);

      for (let i = 0; i < 0.15; i += 0.02) add(cx + i, cy);

    } else if (shape === 'globe') {

      for (let i = 0; i < Math.PI * 2; i += 0.1) add(cx + 0.35 * Math.cos(i), cy + 0.35 * Math.sin(i));

      for (let i = 0.15; i < 0.85; i += 0.05) add(i, cy);

      for (let i = 0.15; i < 0.85; i += 0.05) add(cx, i);

      for (let i = 0; i < Math.PI * 2; i += 0.3) add(cx + 0.35 * Math.cos(i) * 0.5, cy + 0.35 * Math.sin(i));

    } else if (shape === 'shield') {

      for (let i = 0.25; i <= 0.75; i += 0.05) add(i, 0.25);

      for (let i = 0.25; i <= 0.55; i += 0.05) {

        add(0.25, i);

        add(0.75, i);

      }

      for (let i = 0; i <= 1; i += 0.05) {

        const t = i;

        const x = (1 - t) * (1 - t) * 0.25 + 2 * (1 - t) * t * 0.5 + t * t * 0.75;

        const y = (1 - t) * (1 - t) * 0.55 + 2 * (1 - t) * t * 0.9 + t * t * 0.55;

        add(x, y);

      }

      for (let i = 0; i < 0.1; i += 0.02) add(0.4 + i, 0.5 + i);

      for (let i = 0; i < 0.2; i += 0.02) add(0.5 + i, 0.6 - i);

    }

    return points;

  };



  const initParticles = (width: number, height: number) => {

    const points = getShapePoints(type);

    const particles: Particle[] = [];

    points.forEach((pt) => {

      const tx = pt.x * width;

      const ty = pt.y * height;

      const ox = Math.random() * width;

      const oy = Math.random() * height;

      particles.push({

        x: ox,

        y: oy,

        baseX: tx,

        baseY: ty,

        originX: ox,

        originY: oy,

        size: Math.random() * 2 + 1,

        color: color,

        density: Math.random() * 0.5 + 0.1,

        vx: (Math.random() - 0.5) * 1.5,

        vy: (Math.random() - 0.5) * 1.5,

      });

    });

    return particles;

  };



  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const width = 400;

    const height = 400;

    canvas.width = width;

    canvas.height = height;

    setIsActive(false);

    isActiveRef.current = false;

    particlesRef.current = initParticles(width, height);



    const animate = () => {

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {

        const clampVel = () => {

          const max = 1.5;

          p.vx = Math.max(-max, Math.min(max, p.vx));

          p.vy = Math.max(-max, Math.min(max, p.vy));

        };



        if (isActiveRef.current) {

          const dx = p.baseX - p.x;

          const dy = p.baseY - p.y;

          p.vx += dx * 0.05;

          p.vy += dy * 0.05;

          clampVel();

          p.vx *= 0.92;

          p.vy *= 0.92;

          p.x += p.vx;

          p.y += p.vy;

        } else {

          p.x += p.vx;

          p.y += p.vy;

          p.vx += (Math.random() - 0.5) * 0.02;

          p.vy += (Math.random() - 0.5) * 0.02;

          clampVel();

          if (p.x < 0) p.x = width;

          if (p.x > width) p.x = 0;

          if (p.y < 0) p.y = height;

          if (p.y > height) p.y = 0;

          p.x += (p.originX - p.x) * 0.002;

          p.y += (p.originY - p.y) * 0.002;

          p.vx *= 0.985;

          p.vy *= 0.985;

        }



        ctx.beginPath();

        ctx.fillStyle = p.color;

        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fill();

      });



      animationRef.current = requestAnimationFrame(animate);

    };



    animate();

    return () => cancelAnimationFrame(animationRef.current);

  }, [type, color]);



  useEffect(() => {

    const node = containerRef.current;

    if (!node) return;



    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          isActiveRef.current = entry.isIntersecting;

          setIsActive(entry.isIntersecting);

        });

      },

      { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }

    );

    observer.observe(node);



    const rect = node.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {

      isActiveRef.current = true;

      setIsActive(true);

    }



    return () => observer.disconnect();

  }, []);



  return (

    <div ref={containerRef} className="w-[400px] h-[400px] flex items-center justify-center -my-16">

      <canvas ref={canvasRef} className="w-[400px] h-[400px]" />

    </div>

  );

};



const CountUp: React.FC<{ target: number; duration?: number; prefix?: string; suffix?: string }> = ({

  target,

  duration = 1200,

  prefix = '',

  suffix = '',

}) => {

  const [value, setValue] = useState(0);

  const ref = useRef<HTMLSpanElement>(null);

  const startedRef = useRef(false);



  useEffect(() => {

    const node = ref.current;

    if (!node) return;



    const animate = () => {

      const start = performance.now();

      const step = (timestamp: number) => {

        const progress = Math.min((timestamp - start) / duration, 1);

        const nextValue = Math.floor(progress * target);

        setValue(nextValue);

        if (progress < 1) requestAnimationFrame(step);

        else setValue(target);

      };

      requestAnimationFrame(step);

    };



    const observer = new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting && !startedRef.current) {

          startedRef.current = true;

          animate();

        }

      });

    });



    observer.observe(node);

    return () => observer.disconnect();

  }, [duration, target]);



  return (

    <span ref={ref}>

      {prefix}

      {value}

      {suffix}

    </span>

  );

};



const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {

  // Page d'accueil immersive avec animations de particules et navigation vers l'outil.

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const impactCanvasRef = useRef<HTMLCanvasElement>(null);

  const heroRef = useRef<HTMLElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });

  const requestRef = useRef<number>(0);

  const impactRequestRef = useRef<number>(0);

  const particlesRef = useRef<Particle[]>([]);

  const impactParticlesRef = useRef<Particle[]>([]);

  const sponsorLogos = [

    { name: 'Région Normandie', url: 'https://www.normandie.fr/sites/default/files/2020-08/logo_r.normandie-paysage-cmjn_border.jpg' },

    { name: 'DataLab', url: 'https://datalab.datanormandie.fr/sites/default/files/inline-images/logo-datalab-removebg-preview.png' },

    { name: 'DataNormandie', url: 'https://datalab.datanormandie.fr/sites/default/files/2025-04/DataNormandie_RVB.png' },

    { name: 'France travail', url: 'https://cdn.prod.website-files.com/62fb8a0f36526c2ef796ac67/689c5f5694b80b98e3038504_logo-france-travail-removebg-preview.webp' },

    { name: 'Insee', url: 'https://www.insee.fr/static/img/logoInseeFr.svg' },

    { name: 'Ministère du travail', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNCD2kbQVXobhImQe5kDUs8WJz8ulim191Q&s' },

  ];

  const orbitSources = [

    { name: 'France Travail', url: sponsorLogos[3].url },

    { name: 'Insee', url: sponsorLogos[4].url },

    { name: 'DataNormandie', url: sponsorLogos[2].url },

    { name: 'Région Normandie', url: sponsorLogos[0].url },

    { name: 'DataLab', url: sponsorLogos[1].url },

  ];

  const orbitItems = [

    { ...orbitSources[0], radius: 110, animation: 'animate-[spin_32s_linear_infinite]', counterAnimation: 'animate-[spin_32s_linear_infinite_reverse]' },

    { ...orbitSources[1], radius: 150, animation: 'animate-[spin_38s_linear_infinite]', counterAnimation: 'animate-[spin_38s_linear_infinite_reverse]' },

    { ...orbitSources[2], radius: 190, animation: 'animate-[spin_44s_linear_infinite]', counterAnimation: 'animate-[spin_44s_linear_infinite_reverse]' },

    { ...orbitSources[3], radius: 230, animation: 'animate-[spin_50s_linear_infinite]', counterAnimation: 'animate-[spin_50s_linear_infinite_reverse]' },

    { ...orbitSources[4], radius: 270, animation: 'animate-[spin_58s_linear_infinite]', counterAnimation: 'animate-[spin_58s_linear_infinite_reverse]' },

  ];



  // Palette: Strong Orange (Laravel), Bright Orange, Rose, Violet, Blue

  const colors = ['#FF2D20', '#F97316', '#FB7185', '#C084FC', '#60A5FA'];



  const initParticles = (width: number, height: number, countModifier: number = 1, colorOverride?: string) => {

    // Initialise une grappe de particules avec dispersion et couleurs adaptées à la section.

    const particles: Particle[] = [];

    const particleCount = (width < 768 ? 60 : 150) * countModifier; 



    for (let i = 0; i < particleCount; i++) {

      const size = Math.random() * 2 + 1;

      const x = Math.random() * width;

      const y = Math.random() * height;

      

      particles.push({

        x,

        y,

        baseX: x,

        baseY: y,

        originX: x,

        originY: y,

        size,

        color: colorOverride || colors[Math.floor(Math.random() * colors.length)],

        density: (Math.random() * 30) + 1, 

        vx: (Math.random() - 0.5) * 0.5,

        vy: (Math.random() - 0.5) * 0.5

      });

    }

    return particles;

  };



  const updateParticles = (ctx: CanvasRenderingContext2D, particles: Particle[], width: number, height: number, mouseInteraction: boolean) => {

    // Met à jour la position des particules (flottement ou répulsion suivant la souris).

    ctx.clearRect(0, 0, width, height);



    particles.forEach((p) => {

      // Mouse Interaction

      if (mouseInteraction) {

          const dx = mouseRef.current.x - p.x;

          const dy = mouseRef.current.y - p.y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 300; 

          

          if (distance < maxDistance) {

            const forceDirectionX = dx / distance;

            const forceDirectionY = dy / distance;

            const force = (maxDistance - distance) / maxDistance;

            const repulsionX = forceDirectionX * force * p.density; 

            const repulsionY = forceDirectionY * force * p.density;

            p.x -= repulsionX;

            p.y -= repulsionY;

          }



          // Return to base

          if (p.x !== p.baseX) {

              const dxBase = p.x - p.baseX;

              p.x -= dxBase / 40; 

          }

          if (p.y !== p.baseY) {

              const dyBase = p.y - p.baseY;

              p.y -= dyBase / 40;

          }

      } else {

          // Ambient float for non-interactive sections

          p.x += p.vx;

          p.y += p.vy;



          if (p.x < 0) p.x = width;

          if (p.x > width) p.x = 0;

          if (p.y < 0) p.y = height;

          if (p.y > height) p.y = 0;

      }



      ctx.beginPath();

      if (Math.random() > 0.95) {

         ctx.fillStyle = p.color + '80'; 

      } else {

         ctx.fillStyle = p.color;

      }

      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); 

      ctx.fill();

    });

  };



  // Hero Particles

  useEffect(() => {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;



    const handleResize = () => {

      // Ajuste la taille du canvas aux dimensions de la section hero.

      if (heroRef.current) {

        canvas.width = heroRef.current.clientWidth;

        canvas.height = heroRef.current.clientHeight;

        particlesRef.current = initParticles(canvas.width, canvas.height);

      }

    };



    window.addEventListener('resize', handleResize);

    handleResize();



    const animate = () => {

      // Animation principale qui rafraîchit le champ de particules du hero.

      updateParticles(ctx, particlesRef.current, canvas.width, canvas.height, true);

      requestRef.current = requestAnimationFrame(animate);

    };

    animate();



    return () => {

      window.removeEventListener('resize', handleResize);

      cancelAnimationFrame(requestRef.current);

    };

  }, []);



  // Impact Section Particles

  useEffect(() => {

      const canvas = impactCanvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      if (!ctx) return;



      const setSize = () => {

          // Redimensionne le canvas d'impact en fonction de son conteneur.

          if (canvas.parentElement) {

            canvas.width = canvas.parentElement.clientWidth;

            canvas.height = canvas.parentElement.clientHeight;

            impactParticlesRef.current = initParticles(canvas.width, canvas.height, 0.5, '#FDBA74'); // Force Light Orange

          }

      };

      

      window.addEventListener('resize', setSize);

      setSize();



      const animateImpact = () => {

          // Boucle d'animation dédiée au fond particulaire de la section impact.

          updateParticles(ctx, impactParticlesRef.current, canvas.width, canvas.height, false);

          impactRequestRef.current = requestAnimationFrame(animateImpact);

      }

      animateImpact();



      return () => {

          window.removeEventListener('resize', setSize);

          cancelAnimationFrame(impactRequestRef.current);

      }

  }, []);



  const handleMouseMove = (e: React.MouseEvent) => {

    // Suit la position de la souris dans le hero pour animer la dispersion des particules.

    if (heroRef.current) {

        const rect = heroRef.current.getBoundingClientRect();

        mouseRef.current = { 

            x: e.clientX - rect.left, 

            y: e.clientY - rect.top 

        };

    }

  };



  const scrollToSection = (id: string) => {

    // Fait défiler en douceur jusqu'à la section demandée à partir du menu.

    const element = document.getElementById(id);

    if (!element) return;



    const targetPosition = element.getBoundingClientRect().top + window.scrollY - 100; 

    const startPosition = window.scrollY;

    const distance = targetPosition - startPosition;

    const duration = 1500; 

    let startTime: number | null = null;



    const easeInOutCubic = (t: number) => {

      // Courbe d'accélération/décélération pour lisser le scroll manuel.

      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    };



    const animation = (currentTime: number) => {

      // Boucle d'animation qui interpole la position de scroll à chaque frame.

      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;

      const progress = Math.min(timeElapsed / duration, 1);

      const ease = easeInOutCubic(progress);



      window.scrollTo(0, startPosition + distance * ease);



      if (timeElapsed < duration) {

        requestAnimationFrame(animation);

      }

    };



    requestAnimationFrame(animation);

  };



  return (

    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100 selection:text-orange-900 pt-24">

      

      <style>{`
        @keyframes orbital-pulse-ring {
          0% { transform: scale(1); opacity: 0.35; }
          70% { transform: scale(4.5); opacity: 0; }
          100% { transform: scale(5); opacity: 0; }
        }

        @keyframes orbital-pulse-core {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>

      {/* Header (Fixed) */}

      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-24 flex justify-between items-center backdrop-blur-md bg-gradient-to-b from-white via-white to-white/90 border-b border-white/50 transition-all duration-300">

          <div className="flex items-center space-x-8">

            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

                <div className="p-2 bg-gradient-to-tr from-[#FF2D20] to-[#F97316] rounded-lg shadow-lg shadow-orange-500/20">

                    <Sun size={20} className="text-white" />

                </div>

                <div className="flex flex-col leading-none">

                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">AUBE</span>

                </div>

            </div>

            

            <nav className="hidden lg:flex items-center space-x-8 pl-8">

                <button onClick={() => scrollToSection('connecte')} className="text-xs font-bold text-slate-500 hover:text-[#FF2D20] transition-colors uppercase tracking-widest">

                    Open Data

                </button>

                <button onClick={() => scrollToSection('urgence')} className="text-xs font-bold text-slate-500 hover:text-[#FF2D20] transition-colors uppercase tracking-widest">

                    L'Urgence

                </button>

                <button onClick={() => scrollToSection('solution')} className="text-xs font-bold text-slate-500 hover:text-[#FF2D20] transition-colors uppercase tracking-widest">

                    La Solution

                </button>

                <button onClick={() => scrollToSection('impact')} className="text-xs font-bold text-slate-500 hover:text-[#FF2D20] transition-colors uppercase tracking-widest">

                    L'Impact

                </button>

                <button onClick={() => scrollToSection('team')} className="text-xs font-bold text-slate-500 hover:text-[#FF2D20] transition-colors uppercase tracking-widest">

                    LÉquipe

                </button>

            </nav>

          </div>

          

          <button

            onClick={onEnter}

            className="group relative overflow-hidden bg-slate-900 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-orange-900/20 transition-all duration-300"

          >

            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#FF2D20] via-[#F97316] to-purple-500 translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></div>

            <span className="relative z-10 font-semibold text-sm tracking-wide flex items-center">

              Accéder à l'Outil <ArrowRight size={16} className="ml-2" />

            </span>

          </button>

      </header>



      {/* ------------------- SECTION 1: HERO ------------------- */}

      <section 

        ref={heroRef}

        className="relative min-h-[110vh] flex flex-col overflow-hidden bg-white -mt-24 pt-32 pb-28"

        onMouseMove={handleMouseMove}

      >

        <canvas 

            ref={canvasRef} 

            className="absolute inset-0 pointer-events-none z-0 opacity-60"

        />



        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-6 md:px-12 text-center pointer-events-none max-w-[90rem] mx-auto w-full">

           <div className="pointer-events-auto flex flex-col items-center">

               <h1 className="text-6xl md:text-8xl font-extrabold mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#5a78ff] via-[#c26bff] to-[#ff5a3c] pb-5 flex flex-col gap-2 leading-[1.05]">

                 <span>À l'aube des besoins.</span>

               </h1>

               

               <p className="text-xl md:text-3xl text-slate-600 max-w-3xl font-normal leading-snug mb-10">

                 Le potentiel de la Normandie, révélé par l'Open Data.



               </p>



               <div className="flex flex-col md:flex-row gap-4 justify-center">

                 <button onClick={onEnter} className="px-8 py-4 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/10 hover:shadow-orange-500/10">

                    Explorer les Prédictions

                 </button>

                 <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-semibold hover:bg-slate-50 transition-colors">

                    Lire le Manifeste ARQ

                 </button>

               </div>

           </div>

           

           <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 flex flex-col items-center animate-bounce opacity-50">

                <span className="text-[10px] font-semibold uppercase tracking-widest mb-2">Découvrir</span>

                <ArrowRight className="transform rotate-90" size={20} />

           </div>

        </div>

      </section>



      {/* ------------------- SECTION 2: VIDEO ------------------- */}

      <section className="py-24 bg-white w-full flex flex-col items-center">

            <div className="w-full max-w-7xl px-6 md:px-12">

                <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100 group">

                    <iframe 

                        className="absolute inset-0 w-full h-full object-cover"

                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?mute=1" 

                        title="Présentation du projet AUBE" 

                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 

                        allowFullScreen

                    ></iframe>

                </div>

            </div>

      </section>



      {/* ------------------- SECTION 2.5: ORBITAL OPEN DATA ------------------- */}

      <section id="connecte" className="px-6 md:px-12 py-32 bg-white w-full border-b border-slate-100 overflow-hidden relative">

        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 translate-x-1/4 pointer-events-none opacity-50"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">

           

           <div className="relative w-full lg:w-1/2 aspect-square max-w-[600px] flex items-center justify-center">

             

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

                {orbitItems.map((item, idx) => (

                  <div

                    key={`ring-${item.name}-${idx}`}

                    className="absolute rounded-full border border-slate-200/70"

                    style={{ width: `${item.radius * 2}px`, height: `${item.radius * 2}px` }}

                  ></div>

                ))}

              </div>

              

              <div className="relative z-20 w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2D20] to-[#F97316] opacity-25 blur-xl animate-[orbital-pulse-ring_4s_ease-out_infinite]"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2D20] to-[#F97316] opacity-15 blur-xl animate-[orbital-pulse-ring_4s_ease-out_infinite] [animation-delay:1.8s]"></div>
                  <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-900/5 ring-8 ring-slate-50">
                    <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-[#FF2D20] to-[#F97316] opacity-15 blur-lg animate-[orbital-pulse-core_2.8s_ease-in-out_infinite]"></div>
                    <div className="relative w-16 h-16 bg-gradient-to-tr from-[#FF2D20] to-[#F97316] rounded-full flex items-center justify-center animate-[orbital-pulse-core_2.8s_ease-in-out_infinite]">
                      <Sun size={32} className="text-white" />
                    </div>
                  </div>
              </div>



              {orbitItems.map((item, idx) => (

                <div

                  key={`orbit-${item.name}-${idx}`}

                  className={`absolute left-1/2 top-1/2 ${item.animation}`}

                style={{

                  width: `${item.radius * 2}px`,

                  height: `${item.radius * 2}px`,

                  marginLeft: `-${item.radius}px`,

                  marginTop: `-${item.radius}px`,

                }}

              >

                  <div className="absolute inset-0">

                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">

                      <div className={`flex items-center justify-center w-24 h-24 hover:scale-110 transition-transform duration-300 ${item.counterAnimation}`}>

                          <div className="w-14 h-14 flex items-center justify-center">

                            <img src={item.url} alt={item.name} className="h-12 w-12 object-contain drop-shadow-lg" />

                          </div>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>



           <div className="w-full lg:w-1/2 space-y-8">

              <div>

                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">

                      Connecté à tout<br/> l'écosystème public.

                  </h2>

                  <p className="text-lg text-slate-600 leading-relaxed font-normal">

                      Plus besoin de chercher l'information dispersée. AUBE agrège, normalise et croise en temps réel les flux de données hétérogènes pour construire une vision à 360° du marché du travail normand.

                  </p>

              </div>



              <div className="grid grid-cols-2 gap-y-10 gap-x-8 pt-8 border-t border-slate-100">

                  <div className="group">

                      <div className="flex items-center space-x-2 mb-2">

                         <Globe className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />

                         <h3 className="text-3xl font-extrabold text-slate-900">

                           <CountUp target={100} suffix="%" />

                         </h3>

                      </div>

                      <p className="text-sm text-slate-500 font-semibold pl-1">Open Data & Souverain</p>

                  </div>

                  <div className="group">

                      <div className="flex items-center space-x-2 mb-2">

                         <Layers className="text-slate-400 group-hover:text-purple-500 transition-colors" size={20} />

                         <h3 className="text-3xl font-extrabold text-slate-900">

                           <CountUp target={24} />

                         </h3>

                      </div>

                      <p className="text-sm text-slate-500 font-semibold pl-1">Zones d'Emploi Couvertes</p>

                  </div>

                  <div className="group">

                      <div className="flex items-center space-x-2 mb-2">

                         <Zap className="text-slate-400 group-hover:text-[#FF2D20] transition-colors" size={20} />

                         <h3 className="text-3xl font-extrabold text-slate-900">

                           <CountUp target={24} prefix="< " suffix="h" />

                         </h3>

                      </div>

                      <p className="text-sm text-slate-500 font-semibold pl-1">Latence d'Actualisation</p>

                  </div>

                   <div className="group">

                      <div className="flex items-center space-x-2 mb-2">

                         <BarChart3 className="text-slate-400 group-hover:text-indigo-500 transition-colors" size={20} />

                        <h3 className="text-3xl font-extrabold text-slate-900">

                          <CountUp target={1584} />

                        </h3>

                      </div>

                      <p className="text-sm text-slate-500 font-semibold pl-1">Fiches Métiers ROME</p>

                  </div>

              </div>

           </div>

        </div>

      </section>



      {/* ------------------- SECTION 3: L'URGENCE ------------------- */}

      <section id="urgence" className="px-6 md:px-12 py-32 bg-white w-full border-b border-slate-100">

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">

             <div className="w-full md:w-1/2 space-y-6">

                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">

                    L'Urgence : Cesser de piloter au rétroviseur.

                </h2>

                <p className="text-lg text-slate-600 leading-relaxed font-normal">

                    Les indicateurs actuels (chômage, offres) sont descriptifs et arrivent souvent trop tard. Les territoires et les OPCO subissent les crises de recrutement au lieu de les voir venir, entraînant des pénuries coûteuses pour l'économie locale.

                </p>

                <div className="pt-4">

                     <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">

                        <div className="h-2 w-2 rounded-full bg-red-500"></div>

                        <span>Délais d'action trop longs</span>

                        <div className="h-2 w-2 rounded-full bg-red-500"></div>

                        <span>Pénurie installée</span>

                     </div>

                </div>

             </div>

             

             <div className="w-full md:w-1/2 bg-slate-50 rounded-2xl p-8 border border-slate-100 relative overflow-hidden">

                 <div className="space-y-6 relative z-10">

                     <div>

                         <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">

                             <span>Approche Classique</span>

                             <span className="text-red-500">Réactif (+3 mois)</span>

                         </div>

                         <div className="h-4 bg-slate-200 rounded-full overflow-hidden">

                             <div className="h-full bg-slate-400 w-[80%] rounded-full opacity-50"></div>

                         </div>

                     </div>

                     <div>

                         <div className="flex justify-between text-xs font-bold text-slate-500 uppercase mb-2">

                             <span>Approche AUBE</span>

                             <span className="text-[#FF2D20]">Prédictif (-6 mois)</span>

                         </div>

                         <div className="h-4 bg-orange-100 rounded-full overflow-hidden relative">

                             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#FF2D20] to-[#F97316] w-[40%] rounded-full animate-pulse"></div>

                         </div>

                         <p className="text-xs text-orange-600 mt-2 font-semibold">âœ¨ Intervention possible avant la crise</p>

                     </div>

                 </div>

             </div>

          </div>

      </section>



      {/* ------------------- SECTION 4: LA SOLUTION ------------------- */}

      <section id="solution" className="px-6 md:px-12 py-32 bg-slate-50 w-full border-b border-slate-200">

           <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16">

             <div className="w-full md:w-1/2 space-y-6">

                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">

                    La Solution : Détecter les signaux faibles.

                </h2>

                <p className="text-lg text-slate-600 leading-relaxed font-normal">

                    AUBE ne se contente pas de compter les offres. Grâce au NLP (Traitement du Langage Naturel), nous analysons le contenu sémantique des offres pour détecter les micro-changements de compétences demandées, annonciateurs de grandes mutations sectorielles.

                </p>

                

                <ul className="space-y-4 pt-4">

                    <li className="flex items-start space-x-3">

                        <div className="mt-1 bg-purple-500 rounded-full p-1"><ShieldCheck size={12} className="text-white"/></div>

                        <span className="text-slate-700 font-medium">Analyse sémantique de millions d'offres (France Travail)</span>

                    </li>

                    <li className="flex items-start space-x-3">

                        <div className="mt-1 bg-purple-500 rounded-full p-1"><Search size={12} className="text-white"/></div>

                        <span className="text-slate-700 font-medium">Identification des compétences émergentes</span>

                    </li>

                    <li className="flex items-start space-x-3">

                        <div className="mt-1 bg-purple-500 rounded-full p-1"><TrendingUp size={12} className="text-white"/></div>

                        <span className="text-slate-700 font-medium">Modèles prédictifs hybrides (SARIMA + LSTM)</span>

                    </li>

                </ul>

             </div>



             <div className="w-full md:w-1/2 aspect-video bg-white rounded-2xl shadow-xl border border-slate-200 p-6 flex flex-col justify-center relative overflow-hidden">

                 <div className="absolute top-0 right-0 p-32 bg-purple-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>

                 

                 <div className="relative z-10 space-y-3 font-mono text-xs">

                     <div className="bg-slate-50 p-3 rounded border border-slate-100 text-slate-400">

                         &gt; Analysing raw data stream...

                     </div>

                     <div className="bg-purple-50 p-3 rounded border border-purple-100 text-purple-700 font-semibold">

                         &gt; Detecting weak signal: "Hydrogen Competencies"

                     </div>

                     <div className="bg-slate-50 p-3 rounded border border-slate-100 text-slate-500">

                         &gt; Correlation found with Zone: Le Havre

                     </div>

                     <div className="bg-green-50 p-3 rounded border border-green-100 text-green-700 font-extrabold">

                         &gt; ALERT: Critical Tension Predicted (T+6M)

                     </div>

                 </div>

             </div>

           </div>

      </section>



      {/* ------------------- SECTION 5: L'IMPACT (Updated with Particle Icons) ------------------- */}

      <section id="impact" className="relative px-6 md:px-12 py-32 bg-white w-full overflow-hidden">

          {/* Global Particle Background for Impact Section */}

          <canvas 

             ref={impactCanvasRef} 

             className="absolute inset-0 pointer-events-none opacity-30 z-0" 

          />

          

          <div className="relative z-10 max-w-7xl mx-auto text-center space-y-16">

             <div className="max-w-3xl mx-auto space-y-6">

                 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">

                     L'Impact : Gagner du temps, c'est sauver l'emploi.

                 </h2>

                 <p className="text-lg text-slate-600 font-normal">

                     En offrant 6 à 12 mois de visibilité supplémentaire, AUBE permet aux acteurs publics d'aligner l'offre de formation avant que la pénurie ne devienne critique.

                 </p>

             </div>



             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                 {/* Card 1: Clock (Red) */}

                 <div className="p-8 flex flex-col items-center">

                     <div className="mb-6 flex justify-center">

                         <ParticleIcon type="clock" color="#0077b6" />

                     </div>

                     <h3 className="text-4xl font-extrabold text-slate-900 mb-2">+6 Mois</h3>

                     <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">D'anticipation</p>

                 </div>

                 

                 {/* Card 2: Globe (Red) */}

                 <div className="p-8 flex flex-col items-center">

                     <div className="mb-6 flex justify-center">

                         <ParticleIcon type="globe" color="#FF9348" />

                     </div>

                     <h3 className="text-4xl font-extrabold text-slate-900 mb-2">Local</h3>

                     <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Maille Zone d'Emploi</p>

                 </div>

                 

                 {/* Card 3: Shield (Red) */}

                 <div className="p-8 flex flex-col items-center">

                     <div className="mb-6 flex justify-center">

                         <ParticleIcon type="shield" color="#FFD15C" />

                     </div>

                     <h3 className="text-4xl font-extrabold text-slate-900 mb-2">Stratégique</h3>

                     <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Soutien Filières Clés</p>

                 </div>

             </div>

          </div>

      </section>



      {/* ------------------- SECTION 6: SPONSORS ------------------- */}

      <section id="sponsors" className="px-6 md:px-12 py-16 bg-white w-full border-t border-slate-100">

        <style>{`

          @keyframes sponsor-marquee {

            0% { transform: translateX(0); }

            100% { transform: translateX(-50%); }

          }

        `}</style>

        <div className="max-w-7xl mx-auto space-y-6">

          <div className="relative overflow-hidden py-4">

            <div

              className="flex items-center gap-12 min-w-full"

              style={{ animation: 'sponsor-marquee 28s linear infinite' }}

            >

              {[...sponsorLogos, ...sponsorLogos].map((logo, idx) => (

                <div key={`${logo.name}-${idx}`} className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity">

                  <img src={logo.url} alt={logo.name} className="h-12 w-auto object-contain grayscale" />

                </div>

              ))}

            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white via-white/60 to-transparent"></div>

            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white via-white/60 to-transparent"></div>

          </div>

        </div>

      </section>



      {/* ------------------- SECTION 7: ÉQUIPE ARQ ------------------- */}

      <section id="team" className="px-6 md:px-12 py-32 bg-slate-50 w-full text-slate-900 border-t border-slate-200">

          <div className="max-w-7xl mx-auto">

              <div className="text-center mb-16">

                  <h2 className="text-4xl font-extrabold tracking-tight mb-4">L'Équipe ARQ</h2>

                  <p className="text-slate-400 max-w-2xl mx-auto font-normal">

                      Trois profils complémentaires unis par la volonté de transformer la donnée publique en intelligence territoriale.

                  </p>

              </div>



              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors group text-center shadow-sm">

                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-blue-500/20">

                          A

                      </div>

                      <h3 className="text-xl font-semibold mb-1">Arden</h3>

                      <p className="text-[#FF2D20] text-xs font-bold uppercase tracking-widest mb-4">Data Scientist</p>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">

                          Expert en modélisation prédictive et architecture de données. Il conçoit le cœur algorithmique d'AUBE.

                      </p>

                  </div>



                  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors group text-center shadow-sm">

                      <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-orange-500/20">

                          R

                      </div>

                      <h3 className="text-xl font-semibold mb-1">Romain</h3>

                      <p className="text-[#FF2D20] text-xs font-bold uppercase tracking-widest mb-4">Back-end Engineer</p>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">

                          Spécialiste des infrastructures robustes et des API. Il assure la fiabilité et la sécurité du pipeline de données.

                      </p>

                  </div>



                  <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-colors group text-center shadow-sm">

                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-lg shadow-emerald-500/20">

                          Q

                      </div>

                      <h3 className="text-xl font-semibold mb-1">Quentin</h3>

                      <p className="text-[#FF2D20] text-xs font-bold uppercase tracking-widest mb-4">Front-end Lead</p>

                      <p className="text-sm text-slate-600 leading-relaxed font-normal">

                          Designer d'interfaces intuitives. Il transforme la complexité des données en outils d'aide à la décision clairs.

                      </p>

                  </div>

              </div>

          </div>

      </section>



      {/* Footer */}

      <footer className="bg-white border-t border-slate-200 pt-12 overflow-hidden">

        <div className="max-w-[96rem] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start text-xs font-bold uppercase tracking-widest text-slate-400 z-10 relative mb-12">

            <div className="flex items-center space-x-2 mb-4 md:mb-0">

                <span className="text-slate-900">Projet AUBE</span>

                <span>•</span>

                <span>Propulsé par ARQ</span>

            </div>

            <div className="flex space-x-8">

                <a href="#" className="hover:text-orange-600 transition-colors">Documentation Technique</a>

                <a href="#" className="hover:text-orange-600 transition-colors">DataNormandie</a>

                <a href="#" className="hover:text-orange-600 transition-colors">Github</a>

            </div>

        </div>



        <div className="w-full flex justify-center pointer-events-none select-none">

             <span className="text-[22vw] leading-[0.75] font-extrabold tracking-tighter text-black transform translate-y-[10%]">

                Aube

             </span>

        </div>

      </footer>

    </div>

  );

};



export default LandingPage;

