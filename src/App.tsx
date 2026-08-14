import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Heart, Stars, BookHeart, PartyPopper, Camera, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Premium White & Silver Wedding Invitation Theme
 * Names: Heshan & Kaush
 * Background: White
 * Accents: Silver
 */

const backgroundMusic = "/Jim Brickman - The Gift ft. Collin Raye, Susan Ashton (Lyrics) [Vgt-WiimkYI] (1).mp3";

const flowerImage = "/silver_orchid.png";
const flowerCornerImage = "/silver_orchid_corner.png";
const flowerArchImage = "/silver_orchid_arch.png";
const brideGroomImage = "/i/WhatsApp Image 2026-06-01 at 22.21.15.jpeg";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="mandala-frame pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="mandala-corner mandala-corner-tr">
        <InviteImage src={flowerImage} alt="" className="mandala-art" eager />
      </div>
      {!minimal && (
        <>
          <div className="mandala-corner mandala-corner-bl mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-tl is-soft mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
          <div className="mandala-corner mandala-corner-br is-soft mandala-mobile-hidden">
            <InviteImage src={flowerImage} alt="" className="mandala-art" />
          </div>
        </>
      )}
    </div>
  );
}

function FloatingPetals({ disabled = false, vibrant = false }: { disabled?: boolean; vibrant?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const beigeColors = ["#FCFBF7", "#F7F5EE", "#ECE8DA", "#DFD9C4", "#CBBF9F", "#B7A880"];
    const vibrantColors = ["#FFD700", "#FFC0CB", "#B0E0E6", "#D8BFD8", "#F0E68C", "#E6E6FA"];
    const colors = vibrant ? vibrantColors : beigeColors;

    const petalCount = isMobile ? (vibrant ? 15 : 10) : (vibrant ? 25 : 18);
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 7 + 7,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled, vibrant]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(192,192,192,0.5)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.9, 0.8, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function CountdownSection() {
  const targetDate = React.useMemo(() => new Date('2026-09-25T18:00:00').getTime(), []);

  const getTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const countdownItems = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  const floatingHearts = React.useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 8,
    })),
    []
  );

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF7] via-[#F7F5EE] to-[#ECE8DA] px-4 py-24 sm:px-6 lg:px-8 md:py-32"
    >
      {/* Premium Atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-[12%] top-[-8%] h-[50vw] w-[50vw] rounded-full bg-gradient-to-br from-theme-100 to-theme-200 opacity-70 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, -45, 0], scale: [1, 1.18, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
          className="absolute -right-[10%] top-[32%] h-[42vw] w-[42vw] rounded-full bg-gradient-to-tl from-theme-200 to-theme-50 opacity-60 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -35, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute bottom-[-20%] left-[18%] h-[44vw] w-[44vw] rounded-full bg-theme-100 opacity-45 blur-[110px]"
        />

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12px 12px, rgba(210,180,185,0.2) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      {/* Floating Ornaments */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-theme-400/30"
            style={{ left: heart.left, top: heart.top }}
            animate={{
              y: [0, -90, 0],
              x: [0, Math.random() * 30 - 15, 0],
              rotate: [0, Math.random() * 360, 0],
              opacity: [0, 0.45, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <Heart size={heart.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 100 }}
          className="mx-auto mb-16 max-w-4xl text-center md:mb-20 flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-theme-300 bg-white/70 px-5 py-2.5 shadow-[0_10px_30px_rgba(210,180,185,0.1)] backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-theme-600" />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-theme-600 sm:text-sm">
              The Big Day Approaches
            </span>
            <Sparkles className="h-4 w-4 text-theme-600" />
          </motion.div>

          <h2 className="font-serif text-4xl font-medium tracking-tight text-theme-900 sm:text-5xl md:text-7xl">
            Counting Down to <span className="relative inline-block text-theme-500 font-playball italic lowercase tracking-normal">
              Forever
              <motion.svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                viewBox="0 0 100 20" preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              >
                <motion.path
                  d="M0 10 Q 25 20, 50 10 T 100 10"
                  fill="none"
                  stroke="#D2B4B9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-theme-700 sm:text-lg">
            Every second brings us closer to our blessed wedding day. We cannot wait to celebrate this grace-filled moment with you.
          </p>
        </motion.div>

        <div className="rounded-[2rem] border border-theme-200/45 bg-white/55 p-4 shadow-[0_20px_70px_rgba(210,180,185,0.12)] backdrop-blur-xl sm:p-6 md:p-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {countdownItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.1,
                  type: "spring",
                  bounce: 0.35
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[1.8rem] border border-theme-100 bg-gradient-to-br from-white/95 to-theme-50/90 shadow-[0_12px_30px_rgba(210,180,185,0.08)] transition-all duration-300 group-hover:shadow-[0_20px_45px_rgba(210,180,185,0.15)] p-5 md:p-7">
                  <div className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(210,180,185,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(210,180,185,0.2) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-theme-300/40" />
                  <div className="absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-theme-300/25" />

                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="relative flex h-[64px] w-full items-center justify-center overflow-hidden sm:h-[78px] md:h-[96px]">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: 40, opacity: 0, scale: 0.65 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          exit={{ y: -40, opacity: 0, scale: 0.65 }}
                          transition={{
                            type: "spring",
                            stiffness: 370,
                            damping: 24,
                            mass: 1
                          }}
                          className="absolute font-serif text-5xl font-semibold text-theme-900 drop-shadow-[0_2px_8px_rgba(210,180,185,0.15)] sm:text-6xl md:text-7xl"
                        >
                          {String(item.value).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    <div className="mt-3 rounded-full border border-theme-200 bg-white/75 px-3 py-1.5 shadow-sm md:mt-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-theme-600 md:text-xs">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-14 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex items-center gap-3 text-theme-400">
            <Stars size={14} className="animate-pulse" />
            <Heart size={15} className="animate-bounce" fill="currentColor" />
            <span className="font-serif italic text-lg text-theme-700 sm:text-xl">
              Can't wait to see you there!
            </span>
            <Heart size={15} className="animate-bounce" fill="currentColor" style={{ animationDelay: '200ms' }} />
            <Stars size={14} className="animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const storyItems = [
  {
    id: 0,
    chapter: "Chapter I",
    title: "How We Met",
    subtitle: "Co-workers",
    content: "Our story began as co workers. What started in the workplace grew through a deep and wonderful friendship.",
    icon: Stars,
    color: "#B7A880",
    gradient: "from-[#B7A880]/15 to-[#DFD9C4]/20",
    accentBg: "bg-[#B7A880]",
    tag: "Co-workers",
  },
  {
    id: 1,
    chapter: "Chapter II",
    title: "Years Together",
    subtitle: "Friendship to Love",
    content: "Over the years, that friendship blossomed into love, and now leads us to forever as husband & wife.",
    icon: BookHeart,
    color: "#9A8A60",
    gradient: "from-[#9A8A60]/15 to-[#ECE8DA]/25",
    accentBg: "bg-[#9A8A60]",
    tag: "Journey",
  },
  {
    id: 2,
    chapter: "Chapter III",
    title: "The Promise",
    subtitle: "A Sacred Yes",
    content: "With prayer and joy, we said yes to this new chapter. Your love and blessings make this day even more meaningful.",
    icon: Camera,
    color: "#7A6C48",
    gradient: "from-[#7A6C48]/15 to-[#F7F5EE]/30",
    accentBg: "bg-[#7A6C48]",
    tag: "Promise",
  },
  {
    id: 3,
    chapter: "Chapter IV",
    title: "Forever Begins",
    subtitle: "Our Wedding Day",
    content: "Now we celebrate our wedding day with the people we love. Thank you for being part of our story.",
    icon: PartyPopper,
    color: "#CBBF9F",
    gradient: "from-[#CBBF9F]/15 to-[#FCFBF7]/20",
    accentBg: "bg-[#CBBF9F]",
    tag: "Forever",
  },
];

const galleryItems = [
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.15.jpeg', width: 'w-[190px] sm:w-[260px] md:w-[380px]', height: 'h-[350px] md:h-[520px]', yOffset: 'translate-y-0' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.15 (1).jpeg', width: 'w-[160px] sm:w-[220px] md:w-[300px]', height: 'h-[300px] md:h-[420px]', yOffset: 'translate-y-12' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.16.jpeg', width: 'w-[200px] sm:w-[280px] md:w-[420px]', height: 'h-[380px] md:h-[550px]', yOffset: '-translate-y-8' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.16 (1).jpeg', width: 'w-[170px] sm:w-[240px] md:w-[340px]', height: 'h-[320px] md:h-[480px]', yOffset: 'translate-y-6' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.16 (2).jpeg', width: 'w-[210px] sm:w-[300px] md:w-[440px]', height: 'h-[400px] md:h-[580px]', yOffset: '-translate-y-12' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.17.jpeg', width: 'w-[180px] sm:w-[250px] md:w-[380px]', height: 'h-[360px] md:h-[500px]', yOffset: 'translate-y-4' },
  { src: '/i/WhatsApp Image 2026-06-01 at 22.21.17 (1).jpeg', width: 'w-[195px] sm:w-[270px] md:w-[360px]', height: 'h-[340px] md:h-[510px]', yOffset: '-translate-y-4' },
];

function StorySection() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const prev = () => go(active === 0 ? storyItems.length - 1 : active - 1);
  const next = () => go(active === storyItems.length - 1 ? 0 : active + 1);

  const item = storyItems[active];
  const Icon = item.icon;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0, scale: 0.95 }),
  };

  return (
    <section
      className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden bg-[#FCFBF7]"
      style={{ minHeight: 'auto' }}
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #DFD9C4 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCFBF7] via-transparent to-[#FCFBF7] pointer-events-none" />

      {/* Decorative watermark shape */}
      <div className="absolute bottom-0 right-0 h-48 w-48 select-none rounded-full bg-[radial-gradient(circle,rgba(183,168,128,0.15),transparent_72%)] opacity-40 blur-sm md:h-72 md:w-72 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border-2 border-white shadow-md rounded-full px-5 py-2 mb-5">
            <Heart className="w-4 h-4 text-theme-400 fill-theme-400" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-theme-400">Our Love Story</span>
            <Heart className="w-4 h-4 text-theme-400 fill-theme-400" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-theme-900 leading-tight">
            Written in the{' '}
            <span className="italic text-theme-600 relative inline-block font-playball">
              Stars
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 6 Q25 2 50 6 Q75 10 100 6" stroke="#D2B4B9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </motion.div>

        {/* Main Card + Side Panels Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch"
        >

          {/* Left: Chapter Navigator (vertical pill list) */}
          <div className="hidden md:flex flex-col justify-center gap-3 w-36 shrink-0">
            {storyItems.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                className={`group relative flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition-all duration-300 border-2 ${active === i
                  ? 'bg-white shadow-lg border-white scale-105'
                  : 'bg-white/50 border-transparent hover:bg-white/70'
                  }`}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0 transition-all"
                  style={{ backgroundColor: active === i ? s.color : '#D2B4B9' }}
                />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-theme-400">{s.chapter}</p>
                  <p className={`text-[11px] font-semibold leading-tight transition-colors ${active === i ? 'text-theme-900' : 'text-theme-600'}`}>
                    {s.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Center: Main Story Card */}
          <div className="relative flex-1 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(210,180,185,0.12)] border-2 border-white min-h-[340px] md:min-h-[380px]">

            {/* Gradient layer behind content */}
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={`bg-${active}`}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} pointer-events-none`}
              />
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full px-10 py-7 md:p-10">
              <AnimatePresence custom={dir} mode="wait">
                <motion.div
                  key={`content-${active}`}
                  custom={dir}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col gap-5 h-full justify-between"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-theme-400">{item.chapter}</span>
                      <h3 className="font-cinzel text-2xl md:text-3xl text-theme-900 mt-1 leading-tight">{item.title}</h3>
                      <p className="text-sm font-semibold text-theme-600 mt-1">{item.subtitle}</p>
                    </div>
                    {/* Icon bubble */}
                    <div
                      className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${item.color}18`, border: `2px solid ${item.color}30` }}
                    >
                      <Icon className="w-7 h-7 md:w-8 md:h-8" style={{ color: item.color }} />
                    </div>
                  </div>

                  {/* Story text */}
                  <p className="text-theme-700 text-base md:text-lg leading-relaxed font-medium flex-1 flex items-center">
                    {item.content}
                  </p>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="hidden md:flex items-center gap-1.5">
                      {storyItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => go(i)}
                          className="transition-all duration-300"
                        >
                          <div
                            className="rounded-full transition-all duration-300"
                            style={{
                              width: active === i ? 24 : 8,
                              height: 8,
                              backgroundColor: active === i ? item.color : '#eee0e3',
                            }}
                          />
                        </button>
                      ))}
                    </div>

                    {/* Tag pill */}
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full text-white shadow-sm font-semibold"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Arrow nav buttons — only inside card on md+ */}
            <button
              onClick={prev}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full items-center justify-center shadow-md border border-white/80 transition-all hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-theme-900" />
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full items-center justify-center shadow-md border border-white/80 transition-all hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-theme-900" />
            </button>
          </div>

          {/* Right: Mini accent column */}
          <div className="hidden md:flex flex-col gap-4 w-28 shrink-0 justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`accent-${active}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                {/* Big icon */}
                <div
                  className="w-20 h-20 rounded-[1.5rem] flex items-center justify-center shadow-xl"
                  style={{ backgroundColor: `${item.color}15`, border: `3px solid ${item.color}30` }}
                >
                  <Icon className="w-10 h-10" style={{ color: item.color }} />
                </div>

                {/* Progress fraction */}
                <div className="text-center">
                  <p className="text-3xl font-serif font-bold animate-pulse" style={{ color: item.color }}>
                    {String(active + 1).padStart(2, '0')}
                  </p>
                  <p className="text-xs text-theme-400 font-semibold">
                    /{String(storyItems.length).padStart(2, '0')}
                  </p>
                </div>

                {/* Vertical line */}
                <div className="flex flex-col items-center gap-1">
                  {storyItems.map((_, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full transition-all duration-500"
                      style={{
                        height: active === i ? 28 : 8,
                        backgroundColor: active === i ? item.color : '#eee0e3',
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>

        {/* Mobile: arrow buttons row + chapter bar */}
        <div className="flex md:hidden flex-col items-center gap-4 mt-5">
          {/* Arrow row */}
          <div className="flex items-center gap-6">
            <button
              onClick={prev}
              className="w-11 h-11 bg-white hover:bg-white/90 rounded-full flex items-center justify-center shadow-md border border-white/80 transition-all active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 text-theme-900" />
            </button>
            {/* Dot indicators */}
            <div className="flex items-center gap-1.5">
              {storyItems.map((_, i) => (
                <button key={i} onClick={() => go(i)}>
                  <div
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: active === i ? 20 : 7,
                      height: 7,
                      backgroundColor: active === i ? item.color : '#eee0e3',
                    }}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 bg-white hover:bg-white/90 rounded-full flex items-center justify-center shadow-md border border-white/80 transition-all active:scale-95"
            >
              <ChevronRight className="w-5 h-5 text-theme-900" />
            </button>
          </div>

          {/* Chapter pills */}
          <div className="flex justify-center gap-2 flex-wrap">
            {storyItems.map((s, i) => (
              <button
                key={s.id}
                onClick={() => go(i)}
                className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-300 border-2 ${active === i
                  ? 'bg-white border-white shadow-md text-theme-900 scale-105'
                  : 'bg-white/50 border-transparent text-[#7A6C48]'
                  }`}
              >
                {s.chapter}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function GallerySection() {
  const duplicatedItems = [
    ...galleryItems,
    ...galleryItems,
    ...galleryItems,
    ...galleryItems
  ];

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FFFFFF_0%,#FDFBF7_50%,#FDFAF5_100%)] py-24 md:py-32">
      {/* Background Ornaments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[#B7A880]/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[600px] w-[600px] rounded-full bg-[#CBBF9F]/10 blur-[100px]" />

        {/* Subtle grid pattern for premium modern feel */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(rgba(183,168,128,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(183,168,128,0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-theme-300/30 bg-theme-50/50 px-5 py-2 shadow-sm backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-theme-500" />
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-theme-800">
              Without Words
            </span>
          </div>

          <h2 className="font-playball text-5xl text-theme-900 md:text-7xl">
            Our <span className="italic text-theme-600 font-serif font-light">Gallery</span>
          </h2>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-theme-400/60" />
            <Heart size={14} className="text-theme-500 fill-theme-100/50 animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-theme-400/60" />
          </div>
        </motion.div>
      </div>

      {/* Infinite Scrolling Gallery */}
      <div className="relative mt-20 flex w-full overflow-hidden py-10">

        {/* Left and Right Fade Overlays matching the light background */}
        <div className="absolute left-0 top-0 z-20 h-full w-[15%] bg-gradient-to-r from-[#FFFFFF] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-[15%] bg-gradient-to-l from-[#FDFAF5] to-transparent pointer-events-none" />

        <motion.div
          className="flex w-max items-center gap-4 sm:gap-6 md:gap-12 px-2 sm:px-4 md:px-6"
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 55, // Continuous linear scroll speed
            repeat: Infinity,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <motion.div
              key={index}
              className={`group relative shrink-0 overflow-hidden rounded-[2.5rem] border border-theme-200/50 bg-white shadow-[0_20px_50px_rgba(203,191,159,0.15)] ${item.width} ${item.height} ${item.yOffset}`}
              whileHover={{ scale: 1.05, y: -10, zIndex: 50 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              {/* Premium Golden/Beige Inner Frame */}
              <div className="absolute inset-4 z-20 rounded-[1.8rem] border border-theme-300/30 transition-all duration-500 group-hover:border-theme-500/80 group-hover:scale-[0.98]" />

              {/* Image Element */}
              <img
                src={item.src}
                alt="Gallery Moment"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-y-0 left-[-50%] z-20 w-[50%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                animate={{ left: ['-50%', '150%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: Math.random() * 2 + 1, ease: 'easeInOut' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-24 max-w-3xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-serif text-xl italic text-stone-500/80 md:text-2xl"
        >
          Some moments are too beautiful for words.
        </motion.p>
      </div>
    </section>
  );
}

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyvlsuJlJRDCWlOq6MDTaR5L86hzjbDI2NAWuUixPRGxh1v-NYC0pY05ygJhKOP7KlnZw/exec";

export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // Personalized Guest Link
  const urlParams = new URLSearchParams(window.location.search);
  const guestPrefix = urlParams.get('p');
  const guestName = urlParams.get('n');

  // Form State
  const [rsvpData, setRsvpData] = useState({ name: "", guests: "1" });
  const [wishData, setWishData] = useState({ name: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "rsvp_success" | "wish_success" | "error">(null);

  const handleSubmit = async (formName: "rsvp" | "wish", data: any) => {
    if (!SCRIPT_URL) {
      alert("Please configure the SCRIPT_URL in App.tsx to enable form submissions.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const params = new URLSearchParams();
      params.append("formName", formName);

      // Explicit mapping of keys to Sheet Headers
      const fieldMapping: Record<string, string> = {
        name: "Name",
        guests: "Guests",
        message: "Message"
      };

      Object.keys(data).forEach(key => {
        const headerName = fieldMapping[key] || key;
        params.append(headerName, data[key]);
      });

      // Using GET with no-cors is the most reliable way to trigger Google Apps Script
      // even if the browser blocks the JSON response due to CORS redirects.
      await fetch(`${SCRIPT_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
        cache: 'no-cache'
      });

      // Since we use no-cors, we can't read the response, so we assume success if no exception
      setSubmitStatus(`${formName}_success` as any);

      // Reset forms
      if (formName === "rsvp") setRsvpData({ name: "", guests: "1" });
      else setWishData({ name: "", message: "" });

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const openInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full bg-[#FFFFFF] transition-all duration-1000 ${isOpened ? "overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "overflow-hidden flex items-center justify-center"
        } relative font-montserrat scroll-smooth`}
    >
      <audio ref={audioRef} src={backgroundMusic} loop />
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="video-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white overflow-hidden"
          >
            {/* Warm Animated Background Flares */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-50 via-white to-theme-100" />

            {/* Background Image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/ChatGPT Image Jun 1, 2026, 10_13_41 PM.png"
                alt="Background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/40" />
            </div>

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.12, 0.22, 0.12],
                x: [-15, 15, -15],
                y: [-15, 15, -15]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[60%] aspect-square bg-gradient-to-br from-theme-200/20 to-theme-300/30 blur-[120px] rounded-full"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.08, 0.18, 0.08],
                x: [15, -15, 15],
                y: [15, -15, 15]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-[15%] -right-[15%] w-[70%] aspect-square bg-gradient-to-tl from-theme-100/30 to-white/40 blur-[140px] rounded-full"
            />

            <FloatingPetals disabled={isLowPerformanceMode} vibrant={true} />

            <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />

            {/* Centered Interaction Button with warm glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative z-[101]"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-theme-100 via-theme-300 to-theme-400 blur-2xl opacity-40 animate-pulse" />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={openInvitation}
                className="group relative flex flex-col items-center gap-4 bg-white/95 backdrop-blur-md border border-white/60 px-14 py-6 rounded-full text-theme-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-theme-200/30"
              >
                <span className="font-cinzel text-sm tracking-[0.6em] uppercase font-bold bg-gradient-to-r from-theme-700 to-theme-900 bg-clip-text text-transparent">
                  Open Invitation
                </span>
                <div className="w-10 h-[1.5px] bg-gradient-to-r from-theme-300 via-theme-400 to-theme-500 group-hover:w-20 transition-all duration-500" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-theme-600 animate-pulse">
                  Tap to Reveal
                </span>
              </motion.button>
            </motion.div>

            {/* Monogram with color accent */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
              <p className="font-cinzel text-[11px] tracking-[0.8em] font-bold uppercase flex flex-col items-center gap-3">
                <span className="bg-gradient-to-r from-theme-900 via-theme-600 to-theme-900 bg-clip-text text-transparent opacity-80">T & I</span>
                <span className="h-px w-8 bg-gradient-to-r from-transparent via-theme-300 to-transparent" />
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border-2 border-theme-400/40 text-theme-900 hover:bg-theme-50 transition-all hover:scale-110"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-white">

              {/* Background Image */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img
                  src="/ChatGPT Image Aug 14, 2026, 05_54_59 PM.png"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Background texture (optional, keeping for subtle effect over image) */}
              <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none z-0" />

              {/* Gold Border Frame */}
              <div className="absolute inset-4 sm:inset-6 md:inset-8 border-[1.5px] border-[#CBBF9F] rounded-t-[4rem] pointer-events-none z-10 opacity-80" />

              {/* Main Content */}
              <div className="relative z-20 flex flex-col items-center text-center px-6 w-full max-w-[400px]">

                {/* Names */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="font-playball text-[4.5rem] sm:text-[5.5rem] text-theme-900 leading-none mb-3 drop-shadow-sm"
                >
                  Thilan
                </motion.h1>

                {/* Center Divider with & */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="flex items-center justify-center gap-4 my-2 w-full"
                >
                  <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-theme-400" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-400" />
                  <span className="font-playball text-4xl text-theme-400">&</span>
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-400" />
                  <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-theme-400" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 1 }}
                  className="font-playball text-[4.5rem] sm:text-[5.5rem] text-theme-900 leading-none mt-3 mb-12 drop-shadow-sm"
                >
                  Irish
                </motion.h1>

                {/* Small divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 1 }}
                  className="flex items-center gap-3 mb-8 opacity-70"
                >
                  <div className="w-10 h-[1px] bg-theme-400" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-400" />
                  <div className="w-10 h-[1px] bg-theme-400" />
                </motion.div>

                {/* Please Join Us */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9, duration: 1 }}
                  className="mb-10 px-8 py-3 rounded-full border-[1.5px] border-theme-400/60 bg-white/40 backdrop-blur-sm"
                >
                  <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-theme-900 font-bold">
                    Please Join Us
                  </span>
                </motion.div>

                {/* Small divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.1, duration: 1 }}
                  className="flex items-center gap-3 mb-10 opacity-70"
                >
                  <div className="w-16 h-[1px] bg-theme-400" />
                  <div className="w-2 h-2 rotate-45 bg-theme-400" />
                  <div className="w-16 h-[1px] bg-theme-400" />
                </motion.div>

                {/* Date and Location */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3, duration: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <p className="font-cinzel text-xl md:text-2xl text-theme-900 tracking-[0.3em] font-bold">2026.09.25</p>
                </motion.div>

                {/* Bottom divider */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="flex items-center gap-3 mt-6 opacity-70"
                >
                  <div className="w-10 h-[1px] bg-theme-400" />
                  <div className="w-1 h-1 rotate-45 bg-theme-400" />
                  <div className="w-10 h-[1px] bg-theme-400" />
                </motion.div>
              </div>
            </section>

            {/* Wedding Details Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                {/* Gold/Beige Orchids in Corners */}
                <InviteImage src={flowerImage} style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute -left-12 -top-12 w-[220px] md:w-[380px] h-auto opacity-70 object-contain -rotate-[105deg]" alt="" />
                <InviteImage src={flowerImage} style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute -right-12 -top-12 w-[220px] md:w-[380px] h-auto opacity-70 object-contain -rotate-[15deg]" alt="" />
                <InviteImage src={flowerImage} style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute -left-12 -bottom-12 w-[220px] md:w-[380px] h-auto opacity-70 object-contain rotate-[165deg]" alt="" />
                <InviteImage src={flowerImage} style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute -right-12 -bottom-12 w-[220px] md:w-[380px] h-auto opacity-70 object-contain rotate-[75deg]" alt="" />
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-theme-400 to-transparent mb-6 md:mb-10 shadow-[0_0_10px_rgba(210,180,185,0.3)]" />
                  
                  <div className="flex flex-col items-center text-center max-w-2xl px-4">
                    <span className="text-theme-400 text-[9px] md:text-[11px] mb-4 md:mb-6 tracking-[0.8em] uppercase font-bold">
                      Wedding Celebration
                    </span>
                    
                    {guestName && (
                      <h3 className="font-playball text-theme-900 text-3xl md:text-4xl mb-4 tracking-normal capitalize">
                        Dear {guestPrefix} {guestName},
                      </h3>
                    )}
                    
                    <h3 className="font-cinzel text-theme-900 text-[11px] md:text-sm leading-loose tracking-[0.4em] uppercase font-light">
                      You are cordially invited to
                    </h3>
                    <p className="font-playball text-theme-600 text-3xl md:text-5xl mt-3 md:mt-5 capitalize tracking-wide drop-shadow-sm">
                      Celebrate the Union of
                    </p>
                  </div>

                  <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-theme-400 to-transparent mt-8 md:mt-12 shadow-[0_0_10px_rgba(210,180,185,0.3)]" />
                </motion.div>



                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Groom's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(203,191,159,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-theme-600">Beloved son of</p>
                        <p className="text-xs md:text-sm font-cinzel text-theme-700 tracking-wide leading-relaxed">W.K.W Gamini<br />& K.Srima Mallika</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-900 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Thilan</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-theme-400 to-theme-500 rounded-full flex items-center justify-center shadow-xl shadow-theme-900/10 border-4 border-[#fdfaf5]"
                    >
                      <span className="text-3xl md:text-5xl font-playball text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Bride's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border-[1.5px] border-theme-300/70 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none shadow-[inset_0_0_15px_rgba(203,191,159,0.1)]" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[7px] md:text-[8px] uppercase tracking-[0.4em] font-bold text-theme-600">Beloved daughter of</p>
                        <p className="text-xs md:text-sm font-cinzel text-theme-700 tracking-wide leading-relaxed">Beinvenido Vallena<br />& Arlene Vallena</p>
                      </div>
                      <h3 className="text-5xl md:text-7xl font-playball text-theme-900 group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">Irish</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 text-center w-full max-w-5xl px-4">
                    {/* Column 1: Date */}
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-theme-600 font-bold mb-3">The Date</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">2026.09.25</p>
                      <p className="font-cinzel text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">FRIDAY</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="lg:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    {/* Column 2: Ceremony */}
                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-theme-600 font-bold mb-3">Starts</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">06:00 PM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">Paradise Inn Bolgoda</p>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="lg:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    {/* Column 3: Reception */}
                    <div className="flex flex-col items-center flex-1">
                      <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-theme-600 font-bold mb-3">Ends</p>
                      <p className="font-cinzel text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">11:30 PM</p>
                      <p className="font-cinzel text-xs md:text-sm text-theme-600 tracking-[0.2em] mt-3 uppercase">Paradise Inn Bolgoda</p>
                    </div>
                  </div>

                </motion.div>
              </div>
            </section>

            <CountdownSection />

            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#FFFFFF] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-[2px] bg-theme-400 shadow-[0_0_8px_rgba(203,191,159,0.3)]" />
                    <span className="text-theme-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                    <div className="w-10 h-[2px] bg-theme-400 shadow-[0_0_8px_rgba(203,191,159,0.3)]" />
                  </div>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-900 leading-[1] drop-shadow-sm mt-4">
                    Where & When
                  </h2>
                </div>

                <div className="max-w-2xl mx-auto">
                  {/* Unified Resort Venue Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col space-y-8 text-center items-center"
                  >
                    <div className="space-y-6">
                      <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold text-theme-500 bg-theme-100/50 px-4 py-1.5 rounded-full inline-block">
                        Garden Wedding & Celebration
                      </span>
                      <h3 className="font-cinzel text-2xl md:text-3xl text-theme-900 font-bold tracking-wider">
                        Paradise Inn Bolgoda
                      </h3>

                      <div className="space-y-4 relative pt-2 flex flex-col items-center">
                        <div className="pl-6 space-y-2">
                          <p className="text-theme-900 text-sm md:text-lg tracking-wide font-medium">
                            Garden Area
                          </p>
                          <p className="text-theme-600 text-xs md:text-sm font-light max-w-md mx-auto">
                            The ceremony will start promptly at 06:00 PM, followed immediately by dinner reception.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex justify-center">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/81v2bSrFmWT6DHj2A?g_st=ic', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-theme-900 text-white px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[9px] md:text-xs hover:bg-theme-800 hover:shadow-xl hover:shadow-theme-900/20 transition-all duration-300 group cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Directions to Resort
                      </button>
                    </div>

                    {/* Arched Map Container */}
                    <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-t-[100px] rounded-b-[2rem] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.08)] border-[8px] border-white bg-theme-100 overflow-hidden group">
                      <div className="absolute inset-0 border border-theme-200 rounded-t-[92px] rounded-b-[1.5rem] pointer-events-none z-10" />
                      <div className="absolute inset-0 w-full h-full scale-[1.1] group-hover:scale-[1.05] transition-transform duration-[2s]">
                        <iframe
                          src="https://maps.google.com/maps?q=Paradise+Inn+Bolgoda&t=&z=14&ie=UTF8&iwloc=&output=embed"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                        />
                      </div>
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-20 pointer-events-none z-10 flex items-end justify-center pb-4">
                        <p className="text-[7px] uppercase tracking-widest text-theme-600 font-bold bg-white/95 px-4 py-1.5 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-theme-400 animate-pulse" />
                          View on Map
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>



            <StorySection />

            {/* RSVP Section */}
            <section className="cv-auto py-24 md:py-36 bg-theme-900 text-white relative overflow-hidden flex flex-col items-center">
              {/* Opulent dark background */}
              <div className="absolute inset-0 opacity-10 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-700 blur-[150px] rounded-full opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] max-w-[800px] bg-theme-800 blur-[150px] rounded-full opacity-40 pointer-events-none" />

              <div className="container mx-auto px-4 max-w-2xl text-center relative z-10 w-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-theme-400 font-bold mb-6">Will You Join Us?</p>
                  <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-white mb-6 drop-shadow-md">RSVP</h2>
                  <div className="flex items-center gap-4 justify-center w-full mb-8 opacity-60">
                    <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-white" />
                    <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>
                  <p className="text-stone-300 text-sm md:text-base max-w-md mx-auto leading-relaxed mb-16 tracking-wide font-light">
                    We would be absolutely thrilled to celebrate with you. Kindly respond by the 1st of September.
                  </p>

                  {/* Premium RSVP Form */}
                  <div className="w-full bg-white/5 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <form className="space-y-8 text-left" onSubmit={(e) => { e.preventDefault(); handleSubmit("rsvp", rsvpData); }}>
                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Full Name</label>
                        <input
                          type="text"
                          required
                          value={rsvpData.name}
                          onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide"
                        />
                      </div>

                      <div className="space-y-3">
                        <label className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-theme-200 ml-2">Guests</label>
                        <div className="relative">
                          <select
                            value={rsvpData.guests}
                            onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                            className="w-full bg-transparent border-b border-white/20 px-2 py-3 text-white focus:outline-none focus:border-theme-300 transition-colors font-cinzel text-lg md:text-xl tracking-wide appearance-none cursor-pointer"
                          >
                            <option value="1" className="bg-theme-900 text-white">1 Guest (Just Me)</option>
                            <option value="2" className="bg-theme-900 text-white">2 Guests</option>
                            <option value="3" className="bg-theme-900 text-white">3 Guests</option>
                            <option value="4" className="bg-theme-900 text-white">4 Guests</option>
                            <option value="0" className="bg-theme-900 text-theme-300">Regretfully Decline</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <div className="w-2 h-2 border-r border-b border-theme-300 rotate-45 transform -translate-y-[25%]" />
                          </div>
                        </div>
                      </div>


                      <div className="pt-10">
                        <button
                          disabled={isSubmitting}
                          className="w-full bg-white text-theme-900 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-theme-50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group inline-flex justify-center items-center gap-4"
                        >
                          {isSubmitting ? "Sending..." : (submitStatus === "rsvp_success" ? "Thank You!" : "Send RSVP")}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#FFFFFF]">
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <InviteImage src={flowerImage} alt="" style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute top-0 right-0 w-[40vw] max-w-[500px] opacity-[0.2] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <InviteImage src={flowerImage} alt="" style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }} className="absolute bottom-16 left-1/2 w-[38vw] max-w-[360px] opacity-[0.3] -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-theme-100/50 mb-8 mt-4 shadow-sm border border-theme-200/50">
                      <Sparkles className="w-8 h-8 text-theme-400" />
                    </div>

                    <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[5.5rem] text-theme-800 mb-6 drop-shadow-sm leading-none">Best Wishes</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-theme-400 to-transparent mb-8" />

                    <p className="text-theme-600 text-sm md:text-lg leading-relaxed max-w-xl mx-auto mb-16 font-light tracking-wide px-4">
                      Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a message, we would be delighted to read it!
                    </p>

                    {/* Premium Wishing Form */}
                    <div className="w-full max-w-2xl mx-auto bg-white p-6 sm:p-8 md:p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-100/50 rounded-tr-[4rem] rounded-bl-[4rem] relative group">
                      {/* Decorative internal lines */}
                      <div className="absolute inset-2 md:inset-4 border-[0.5px] border-theme-200/50 rounded-tr-[3.5rem] rounded-bl-[3.5rem] pointer-events-none transition-colors duration-700 group-hover:border-theme-300/80" />

                      <form className="space-y-8 text-left relative z-10" onSubmit={(e) => { e.preventDefault(); handleSubmit("wish", wishData); }}>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-theme-600 ml-2">Your Name</label>
                          <input
                            type="text"
                            required
                            value={wishData.name}
                            onChange={(e) => setWishData({ ...wishData, name: e.target.value })}
                            placeholder="John Doe"
                            className="w-full bg-[#FCFBF7] border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-theme-400 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide rounded-t-lg"
                          />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[7px] md:text-[9px] uppercase tracking-[0.4em] font-bold text-theme-600 ml-2">Your Message</label>
                          <textarea
                            rows={4}
                            required
                            value={wishData.message}
                            onChange={(e) => setWishData({ ...wishData, message: e.target.value })}
                            placeholder="Wishing you a lifetime of happiness..."
                            className="w-full bg-[#FCFBF7] border-b border-theme-200 px-4 py-4 text-theme-900 placeholder:text-theme-400 focus:outline-none focus:border-theme-400 focus:bg-white transition-all font-cinzel text-lg tracking-wide resize-none rounded-t-lg"
                          />
                        </div>
                        <div className="pt-6 flex justify-center">
                          <button
                            disabled={isSubmitting}
                            className="bg-theme-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-theme-800 hover:shadow-xl hover:shadow-theme-900/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group/btn inline-flex items-center gap-4"
                          >
                            {isSubmitting ? "Sending..." : (submitStatus === "wish_success" ? "Wishes Sent!" : "Send Wishes")}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="mt-32 md:mt-48 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[22vw] md:text-[220px] text-theme-300/30 whitespace-nowrap pointer-events-none z-0 select-none">
                        Thank You
                      </div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-[0.8em] text-theme-600 font-bold relative z-10 bg-[#FFFFFF] px-6 py-2 rounded-full border border-theme-100/50 shadow-sm">With Love</p>
                      <h3 className="font-playball text-[3.2rem] sm:text-6xl md:text-8xl text-theme-900 relative z-10 drop-shadow-sm px-4 pt-4 leading-none">Thilan & Irish</h3>

                      <motion.img
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        whileInView={{ opacity: 0.9, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        src={flowerImage}
                        alt=""
                        style={{ filter: "sepia(0.3) saturate(1.2) hue-rotate(320deg) contrast(0.95)" }}
                        className="relative z-10 mt-8 w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-[0_12px_24px_rgba(75,85,99,0.2)]"
                      />
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer className="py-20 border-t border-theme-200/30 text-center relative z-10 space-y-6">
                <p className="text-[9px] md:text-[11px] uppercase tracking-[0.5em] text-theme-600 font-bold">
                  © 2026 Thilan & Irish. All rights reserved.
                </p>


              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-very {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        .animate-spin-slow-very {
          animation: spin-slow-very linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFFFF;
        }
        ::-webkit-scrollbar-thumb {
          background: #D2B4B9;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}
