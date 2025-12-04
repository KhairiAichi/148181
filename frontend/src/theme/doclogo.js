import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

export default function DocLogo() {
  const logoRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (logoRef.current) {
      observer.observe(logoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={logoRef}
      className={`${styles.logoContainer} ${visible ? styles.visible : ''}`}
    >
      <img
        src="/img/download.jpeg"
        alt="Logo de l'entreprise"
        className={styles.logo}
      />
    </div>
  );
}

