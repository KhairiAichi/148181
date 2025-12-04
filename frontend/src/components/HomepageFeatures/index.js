import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: <Translate>Bienvenue sur le site Imbus Tunisia</Translate>,
    img: require('@site/static/img/download.jpeg').default,
    description: (
      <Translate>
        Accédez facilement à toutes les informations importantes pour les utilisateurs internes
      </Translate>
    ),
  },
  {
    title: <Translate>Facile à utiliser – Imbus Tunisia</Translate>,
    img: require('@site/static/img/download1.png').default,
    description: (
      <Translate>
        Naviguez rapidement et consultez les données essentielles sans difficulté
      </Translate>
    ),
  },
  {
    title: <Translate>Informations Claires – Imbus Tunisia</Translate>,
    img: require('@site/static/img/download.jpeg').default,
    description: (
      <Translate>
        Tous les utilisateurs peuvent consulter nos ressources et procédures importantes
      </Translate>
    ),
  },
];

function Feature({ img, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={img} alt={title} className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
