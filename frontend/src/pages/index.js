// src/pages/index.js
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        <img
          src="/img/download.jpeg"
          alt="Logo"
          style={{ width: '200px', marginBottom: '20px' }}
        />

        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">
          Bienvenue dans la documentation interne – ISO 27001
        </p>

        <div className={styles.alertBox}>
          ⚠️ Merci de respecter les règles de sécurité internes de l'entreprise.
        </div>

        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/regles-internes"
          >
            Voir les règles internes 📄
          </Link>
        </div>

      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout>
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
