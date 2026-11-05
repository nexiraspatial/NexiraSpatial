import { useEffect, useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '../components/Shared.jsx';

const projects = [
    {
        name: 'Multi Hazard Dashboard',
        photo: '/case-hazard-dashboard.jpg',
        url: 'https://nexira-spatial-map-service.vercel.app/',
        meta: [['Type', 'Dashboard'], ['Domain', 'Hazard GIS'], ['Stack', 'Leaflet']],
        description: 'An interactive risk intelligence platform for spatial hazard assessment — visualising multi-layered threat data, risk zones and analytical outputs for informed decision-making.'
    },
    {
        name: 'GIS Interactive Webmap',
        photo: '/case-hazard-webmap.jpg',
        url: 'https://web-map-v2.vercel.app/',
        meta: [['Type', 'Web Map'], ['Domain', 'Hazard GIS'], ['Stack', 'Leaflet']],
        description: 'A live web mapping platform for real-time hazard visualisation — integrating spatial data layers, custom cartography and geospatial analysis accessible from any browser.'
    }
];

const pad = (n) => String(n).padStart(2, '0');
const hostOf = (url) => new URL(url).host;

export function ProjectsPage({ onBack }) {
    const [active, setActive] = useState(0);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true, force: true });
            const timer = setTimeout(() => {
                window.lenis.scrollTo(0, { immediate: true, force: true });
                window.lenis.resize();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, []);

    // Panels are sticky, so track progress by scroll distance rather than visibility
    useEffect(() => {
        const onScroll = () => {
            const i = Math.round(window.scrollY / window.innerHeight);
            setActive(Math.max(0, Math.min(projects.length - 1, i)));
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const goTo = (i) => {
        const y = i * window.innerHeight;
        if (window.lenis) window.lenis.scrollTo(y);
        else window.scrollTo({ top: y, behavior: 'smooth' });
    };

    return (
        <section className="alliances-page projects-page" id="products">
            {/* Atmosphere: glows and grid */}
            <div className="alliances-glow" aria-hidden="true" />
            <div className="alliances-grid" aria-hidden="true" />

            {/* Back Button - Fixed Top Left */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={onBack}
                className="alliances-back"
            >
                <span style={{ fontSize: '12px' }}>←</span> HOME
            </motion.button>

            {/* Progress rail */}
            <nav className="projects-rail" aria-label="Projects">
                {projects.map((project, i) => (
                    <button
                        key={project.name}
                        className={`projects-rail-dot${i === active ? ' is-active' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={project.name}
                        aria-current={i === active ? 'true' : undefined}
                    >
                        {pad(i + 1)}
                    </button>
                ))}
            </nav>

            {/* One full-screen panel per project; each sticks and the next slides over it */}
            <div className="projects-stack">
                {projects.map((project, i) => (
                    <div key={project.name} className={`project-panel${i === 0 ? ' has-head' : ''}`}>
                        <div className="wrap project-inner">
                            {/* Compact page header sits with the first project */}
                            {i === 0 && (
                                <motion.header
                                    className="projects-head"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Eyebrow style={{ justifyContent: 'center', fontSize: '12px' }}>Projects</Eyebrow>
                                    <h1 className="display projects-title">
                                        Our <span style={{ color: 'var(--accent)' }}>Work</span>
                                    </h1>
                                </motion.header>
                            )}

                            <motion.article
                                className="project-show"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                            >
                                {/* Phone-only heading, one per project screen */}
                                <div className="project-eyebrow-m">
                                    <Eyebrow style={{ justifyContent: 'center', letterSpacing: '0.4em' }}>Our Products</Eyebrow>
                                </div>

                                {/* Browser-framed screenshot, shown whole */}
                                <a className="project-frame" href={project.url} target="_blank" rel="noopener noreferrer">
                                    <div className="project-frame-bar">
                                        <span className="project-frame-dots" aria-hidden="true"><i /><i /><i /></span>
                                        <span className="project-frame-url">{hostOf(project.url)}</span>
                                        <span className="project-frame-live"><i aria-hidden="true" /> Live</span>
                                    </div>
                                    <div className="project-frame-shot">
                                        <img src={project.photo} alt={`${project.name} screenshot`} loading={i === 0 ? 'eager' : 'lazy'} />
                                        <span className="project-frame-cta">
                                            Open live platform
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                <path d="M6 14L14 6M7 6h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </div>
                                </a>

                                {/* Info bar */}
                                <div className="project-info-bar">
                                    <div className="project-id">
                                        <span className="project-num">{pad(i + 1)}<small>/{pad(projects.length)}</small></span>
                                        <h2 className="project-name">{project.name}</h2>
                                    </div>

                                    <p className="project-desc">{project.description}</p>

                                    <div className="project-side">
                                        <dl className="project-meta">
                                            {project.meta.map(([label, value]) => (
                                                <div key={label}>
                                                    <dt>{label}</dt>
                                                    <dd>{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                        <a className="project-launch" href={project.url} target="_blank" rel="noopener noreferrer">
                                            Launch Platform
                                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
