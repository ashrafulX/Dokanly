import React from 'react';

const Ondevelopment = () => {
    return (
        <main className="relative isolate min-h-screen overflow-hidden bg-[#fffdfb] px-4 py-8 text-slate-900 sm:px-8 sm:py-12">

            {/* ================= BACKGROUND ================= */}
            <div className="pointer-events-none absolute -left-32 top-24 -z-10 h-80 w-80 rounded-full bg-[#ffd9c9]/60 blur-[100px]" />
            <div className="pointer-events-none absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-[#f2d7ff]/70 blur-[110px]" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-72 w-72 rounded-full bg-[#d7e9ff]/60 blur-[100px]" />

            {/* ================= HEADER ================= */}
            <header className="mx-auto flex max-w-7xl items-center justify-between">
                <a href="/" className="group inline-flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7043] via-[#f43f83] to-[#7938f5] text-2xl font-black text-white shadow-lg shadow-pink-500/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
                        D
                    </span>

                    <span className="text-2xl font-black tracking-tight text-[#20203a]">
                        Dokanly<span className="text-[#f43f83]">.</span>
                    </span>
                </a>

                <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 shadow-sm sm:flex">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                        Building in progress
                    </span>
                </div>
            </header>

            {/* ================= HERO ================= */}
            <div className="mx-auto grid max-w-7xl items-center gap-12 pb-8 pt-16 md:pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-24">

                {/* LEFT CONTENT */}
                <section className="relative z-10 text-center lg:text-left">

                    <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#ffd6c7] bg-white px-4 py-2.5 shadow-[0_5px_20px_-10px_rgba(244,63,131,0.3)]">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#ff7043] to-[#f43f83] text-white">
                            <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                                <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round" />
                            </svg>
                        </span>

                        <span className="text-[11px] font-extrabold tracking-[0.16em] text-[#b54b52] sm:text-xs">
                            SOMETHING GOOD IS BREWING
                        </span>
                    </div>

                    <h1 className="text-4xl font-black leading-[1.12] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-7xl">
                        The next big thing
                        <br />
                        is{' '}
                        <span className="bg-gradient-to-r from-[#ff6538] via-[#f02f87] to-[#7738f5] bg-clip-text text-transparent">
                            taking shape.
                        </span>
                    </h1>

                    <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-slate-500 sm:text-lg lg:mx-0">
                        We’re building something special at Dokanly.
                        A fresh shopping experience, thoughtful design,
                        and smoother interactions are all coming together.
                    </p>

                    {/* PROGRESS CARD */}
                    <div className="mx-auto mt-9 max-w-lg rounded-3xl border border-[#f0e7e5] bg-white p-5 text-left shadow-[0_18px_60px_-35px_rgba(126,58,242,0.25)] sm:p-6 lg:mx-0">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#fff0e9] to-[#fce5ff] text-[#e83d86]">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                                        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
                                        <path d="M3 9h18M7 6.5h.01M10 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                        <path d="m9 13-2 2 2 2m6-4 2 2-2 2m-2-5-2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                <div>
                                    <h2 className="text-sm font-extrabold text-[#25243b]">
                                        Frontend development
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-400">
                                        The storefront is taking shape
                                    </p>
                                </div>
                            </div>

                            <span className="shrink-0 rounded-xl bg-[#fff0e7] px-3 py-1.5 text-xs font-bold text-[#d85a35]">
                                In progress
                            </span>
                        </div>

                        <div className="mt-6">
                            <div className="h-2.5 overflow-hidden rounded-full bg-[#f4eef1]">
                                <div className="h-full w-[65%] animate-[progressGlow_3s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-[#ff7043] via-[#f02f87] to-[#7738f5]" />
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-400">
                                <span>Designing. Building. Refining.</span>
                                <span className="font-semibold text-[#8a4af3]">Work in progress</span>
                            </div>
                        </div>
                    </div>

                    {/* FEATURE PILLS */}
                    <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-2 text-xs font-bold text-emerald-700">
                            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Backend deployed
                        </span>

                        <span className="inline-flex items-center gap-2 rounded-full border border-[#eadcff] bg-white px-3.5 py-2 text-xs font-bold text-[#8145d9]">
                            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                <path d="m10 2 2.4 5.1 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            </svg>
                            Frontend in progress
                        </span>
                    </div>
                </section>

                {/* ================= CREATIVE ILLUSTRATION ================= */}
                <section className="relative mx-auto w-full max-w-[540px]">

                    {/* Background rings */}
                    <div className="absolute inset-4 rotate-6 rounded-[3rem] border border-[#ffcdbb]/70" />
                    <div className="absolute inset-4 -rotate-6 rounded-[3rem] border border-[#e4ceff]/80" />

                    {/* Main illustration card */}
                    <div className="relative rounded-[2.5rem] border border-white/90 bg-white/85 p-5 shadow-[0_35px_100px_-40px_rgba(164,77,151,0.3)] backdrop-blur-xl sm:p-8">

                        {/* Browser bar */}
                        <div className="flex items-center justify-between border-b border-[#f4eeee] pb-4">
                            <div className="flex gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ff7b68]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#ffc45e]" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#6dce9c]" />
                            </div>

                            <div className="rounded-lg bg-[#faf6f7] px-5 py-1.5 text-[10px] font-semibold text-slate-400">
                                dokanly.com
                            </div>

                            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 text-slate-300">
                                <circle cx="4" cy="10" r="1" fill="currentColor" />
                                <circle cx="10" cy="10" r="1" fill="currentColor" />
                                <circle cx="16" cy="10" r="1" fill="currentColor" />
                            </svg>
                        </div>

                        {/* Illustration stage */}
                        <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden sm:min-h-[310px]">

                            {/* Colorful orb */}
                            <div className="absolute h-48 w-48 rounded-full bg-gradient-to-br from-[#ffd9c9] via-[#f7dafa] to-[#d9dcff] sm:h-60 sm:w-60" />

                            {/* Floating code icon */}
                            <div className="absolute left-0 top-10 flex h-14 w-14 -rotate-12 animate-[float_4s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-[#ffdfd2] bg-white text-[#f0644a] shadow-xl shadow-[#ffc8b6]/30 sm:left-3">
                                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                                    <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-12-2 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            {/* Floating gear */}
                            <div className="absolute right-0 top-12 flex h-12 w-12 rotate-12 animate-[float_5s_ease-in-out_infinite] items-center justify-center rounded-2xl border border-[#e9d8ff] bg-white text-[#8542dc] shadow-xl shadow-[#dfc5ff]/30 sm:right-3">
                                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                                    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.7" />
                                    <path d="M12 2.5v3m0 13v3m9-9h-3m-12 0H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1M7.7 7.7 5.6 5.6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                </svg>
                            </div>

                            {/* Browser mockup */}
                            <div className="relative z-10 w-[82%] rounded-2xl border border-white bg-white p-4 shadow-[0_25px_60px_-20px_rgba(83,52,117,0.3)] sm:w-[80%] sm:p-5">

                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff7043] to-[#e83e8c] text-sm font-black text-white">
                                            D
                                        </span>
                                        <div>
                                            <div className="h-2 w-16 rounded-full bg-[#e8e4ed]" />
                                            <div className="mt-1.5 h-1.5 w-10 rounded-full bg-[#f2eef6]" />
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-[#f3edff] px-3 py-2 text-[10px] font-bold text-[#8542dc]">
                                        Preview
                                    </div>
                                </div>

                                {/* Product cards */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="rounded-2xl bg-gradient-to-br from-[#fff1e8] to-[#ffe1dd] p-3">
                                        <div className="flex h-24 items-center justify-center rounded-xl bg-white/70">
                                            <svg viewBox="0 0 100 100" fill="none" className="h-20 w-20">
                                                <ellipse cx="50" cy="82" rx="27" ry="5" fill="#F3C8B8" />
                                                <path d="M28 41a22 22 0 0 1 44 0v8H28v-8Z" fill="#FF9C7D" />
                                                <path d="M24 46h52l-6 30H30l-6-30Z" fill="#F86F68" />
                                                <path d="M36 46v-5a14 14 0 0 1 28 0v5" stroke="#E65D55" strokeWidth="4" strokeLinecap="round" />
                                                <path d="M34 55h32" stroke="#FFB6A6" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 h-2 w-16 rounded-full bg-[#f5b5a5]" />
                                        <div className="mt-2 h-1.5 w-10 rounded-full bg-[#fbd1c7]" />
                                        <div className="mt-3 h-6 w-16 rounded-lg bg-[#ff8b70]" />
                                    </div>

                                    <div className="rounded-2xl bg-gradient-to-br from-[#eee7ff] to-[#e2e5ff] p-3">
                                        <div className="flex h-24 items-center justify-center rounded-xl bg-white/70">
                                            <svg viewBox="0 0 100 100" fill="none" className="h-20 w-20">
                                                <ellipse cx="50" cy="81" rx="25" ry="5" fill="#D1C3F4" />
                                                <path d="M27 36a23 23 0 0 1 46 0v5H27v-5Z" fill="#A38AF0" />
                                                <path d="M29 40h42v30H29z" rx="4" fill="#8265E9" />
                                                <path d="M24 44h52v7H24z" rx="3" fill="#B9A9FA" />
                                                <path d="M40 58h20" stroke="#DCD3FF" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-3 h-2 w-16 rounded-full bg-[#c1b1f7]" />
                                        <div className="mt-2 h-1.5 w-10 rounded-full bg-[#d7ccfb]" />
                                        <div className="mt-3 h-6 w-16 rounded-lg bg-[#9775f0]" />
                                    </div>
                                </div>

                                {/* Cart row */}
                                <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#f0eaf2] p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e2f7ec] text-[#279b68]">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                            <path d="M3 4h2l2.2 11h10.9L21 8H6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                                            <circle cx="9" cy="19" r="1.4" fill="currentColor" />
                                            <circle cx="17" cy="19" r="1.4" fill="currentColor" />
                                        </svg>
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-2 h-2 w-24 rounded-full bg-slate-200" />
                                        <div className="h-1.5 w-16 rounded-full bg-slate-100" />
                                    </div>

                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e2f7ec] text-[#279b68]">
                                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                                            <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative stars */}
                            <span className="absolute bottom-6 left-5 animate-pulse text-3xl text-[#ff9c40]">✦</span>
                            <span className="absolute bottom-10 right-5 animate-pulse text-2xl text-[#ae72ff]">✧</span>
                            <span className="absolute left-1/2 top-4 animate-pulse text-xl text-[#f56c9d]">✳</span>
                            <span className="absolute bottom-1/2 right-2 text-sm text-[#ff9c40]">✦</span>
                        </div>

                        {/* Caption */}
                        <div className="rounded-2xl border border-[#f4e8f0] bg-gradient-to-r from-[#fff7f1] via-[#fff6fb] to-[#f7f3ff] p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7043] to-[#e83e8c] text-white shadow-lg shadow-pink-500/20">
                                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                                        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" fill="currentColor" />
                                        <path d="m19 14 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" fill="currentColor" />
                                    </svg>
                                </div>

                                <div>
                                    <p className="text-sm font-extrabold text-[#29233c]">
                                        Good things take building.
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Thoughtful details. Better experiences.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating badges */}
                    <div className="absolute -left-2 top-[38%] z-20 hidden -translate-x-1 items-center gap-2.5 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-xl shadow-[#f5d9d8]/60 sm:flex">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e4f9ed] text-[#279b68]">
                            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
                                <path d="m4 10 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-xs font-extrabold text-slate-700">API deployed</span>
                    </div>

                    <div className="absolute -right-1 bottom-28 z-20 hidden translate-x-1 items-center gap-2.5 rounded-2xl border border-white bg-white px-3 py-2.5 shadow-xl shadow-[#e8d9ff]/70 sm:flex">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3e8ff] text-[#8542dc]">
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                                <path d="m12 3 2 5 5 1-4 4 1 5-4-2.5L8 18l1-5-4-4 5-1 2-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <span className="text-xs font-extrabold text-slate-700">Crafting UI</span>
                    </div>
                </section>
            </div>

            {/* ================= BACKEND API CARD ================= */}
            <section className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-[#f0e6e9] bg-white p-5 shadow-[0_20px_65px_-40px_rgba(105,63,130,0.25)] sm:mt-16 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e1f9ed] to-[#d8f4ff] text-[#17865a]">
                            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                                <rect x="3" y="3.5" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                <rect x="3" y="13.5" width="18" height="7" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M7 7h.01M7 17h.01M11 7h6m-6 10h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-base font-extrabold text-[#29233c] sm:text-lg">
                                Backend API Server
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Django <span className="px-1 text-[#f43f83]">·</span> REST API
                            </p>
                            <p className="mt-1 break-all text-xs text-slate-400">
                                dokanly-server.vercel.app/swagger
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://dokanly-server.vercel.app/swagger/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#ff7043] via-[#f43f83] to-[#8542dc] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/30 focus:outline-none focus:ring-4 focus:ring-pink-200"
                    >
                        Visit API Server
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                            <path d="M11 3h6v6m0-6-8 8M15 11v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-[#f3edf0] pt-5">
                    <span className="inline-flex items-center gap-2 rounded-xl bg-[#eafaf0] px-3.5 py-2.5 text-xs font-bold text-[#187b50]">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Backend deployed
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-xl bg-[#fff0e9] px-3.5 py-2.5 text-xs font-bold text-[#ce583a]">
                        <span className="h-2 w-2 rounded-full bg-[#ff7043]" />
                        Frontend under construction
                    </span>
                </div>
            </section>

            {/* ================= FOOTER ================= */}
            <footer className="mx-auto max-w-7xl pb-3 pt-10 text-center">
                <div className="mx-auto mb-4 h-px max-w-xs bg-gradient-to-r from-transparent via-[#e8d9e8] to-transparent" />

                <p className="text-sm text-slate-500">
                    Made with care by{' '}
                    <span className="bg-gradient-to-r from-[#ff6538] via-[#f02f87] to-[#7738f5] bg-clip-text font-extrabold text-transparent">
                        Dokanly
                    </span>
                </p>

                <p className="mt-2 text-xs text-slate-400">
                    A little patience. A lot of possibilities.
                </p>
            </footer>

            {/* Small custom animation */}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(-8deg); }
                    50% { transform: translateY(-10px) rotate(-3deg); }
                }

                @keyframes progressGlow {
                    0%, 100% { filter: saturate(1); }
                    50% { filter: saturate(1.5) brightness(1.05); }
                }

                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        scroll-behavior: auto !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </main>
    );
};

export default Ondevelopment;