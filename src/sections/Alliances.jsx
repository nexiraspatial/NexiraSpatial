import { useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from '../components/Shared.jsx';

const academicPartners = [
    {
        name: 'Universal Engineering College',
        location: 'Thrissur, Kerala',
        logo: '/alliances/universal-logo.png',
        photo: '/alliances/universal-mou.jpg',
        tag: 'Our First MoU',
        description: [
            'Nexira Spatial signed its first Memorandum of Understanding with Universal Engineering College, a step towards a closer partnership between industry and academia.',
            'Under this partnership, Nexira Spatial will share its expertise in GIS, Remote Sensing and Spatial Technology, and give students hands-on exposure to real-world geospatial applications.',
            'The signing ceremony was attended by the Principal and the Head of the Civil Engineering Department. Our team then held an interactive session with students on geospatial technology and career opportunities in the field.'
        ]
    },
    {
        name: 'Ilahia College of Engineering and Technology',
        location: 'Muvattupuzha, Kerala',
        logo: '/alliances/ilahia-logo.png',
        photo: '/alliances/ilahia-mou.jpg',
        tag: 'MoU Signed',
        description: [
            'Nexira Spatial has signed a Memorandum of Understanding with Ilahia College of Engineering and Technology, adding a second academic partner and widening our work with engineering institutions across Kerala.',
            'The partnership is designed to give students access to current tools and workflows in GIS, Remote Sensing and Spatial Technology through knowledge-sharing sessions, practical training and project-based learning.',
            'Together, we aim to prepare students for careers in the geospatial industry and to encourage research and innovation that address real-world challenges.'
        ]
    }
];

export function AlliancesPage({ onBack }) {
    const containerRef = useRef(null);

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

    return (
        <section ref={containerRef} className="alliances-page">
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

            <div className="wrap alliances-wrap">
                {/* Header */}
                <header className="alliances-head">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <Eyebrow style={{ justifyContent: 'center', fontSize: '13px' }}>Alliances</Eyebrow>
                    </motion.div>
                    <motion.h1
                        className="display h1"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Academic <span style={{ color: 'var(--accent)' }}>Partnerships</span>
                    </motion.h1>
                    <motion.p
                        className="alliances-lede"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Memorandums of Understanding signed with academic institutions to bring industry, technology and education together.
                    </motion.p>
                </header>

                {/* Partner cards */}
                <div className="alliances-list">
                    {academicPartners.map((partner, i) => (
                        <motion.article
                            key={partner.name}
                            className={`alliance-card${i % 2 ? ' is-flipped' : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="alliance-photo">
                                <img src={partner.photo} alt={`MoU signing with ${partner.name}`} loading="lazy" />
                                <span className="alliance-index">{String(i + 1).padStart(2, '0')}</span>
                            </div>

                            <div className="alliance-body">
                                <div className="alliance-top">
                                    <div className="alliance-logo">
                                        <img src={partner.logo} alt={partner.name} />
                                    </div>
                                    {partner.tag && <span className="alliance-tag">{partner.tag}</span>}
                                </div>

                                <h3 className="alliance-name">{partner.name}</h3>
                                <p className="alliance-location">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </svg>
                                    {partner.location}
                                </p>

                                <div className="alliance-desc">
                                    {partner.description.map((para, j) => (
                                        <p key={j}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
