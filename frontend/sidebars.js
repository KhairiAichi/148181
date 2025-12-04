const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Réglementations internes',
      items: [
        'Reglementations-internes/Introduction',

        {
          type: 'category',
          label: 'Mesures techniques et organisationnelles',
          items: [
            'Reglementations-internes/Mesures techniques et organisationnelles/Anonymisation',

            {
              type: 'category',
              label: 'Confidentialité',
              items: [
                'Reglementations-internes/Mesures techniques et organisationnelles/Confidentialite/Controle-bureaux',
                'Reglementations-internes/Mesures techniques et organisationnelles/Confidentialite/Controle-systeme',
                'Reglementations-internes/Mesures techniques et organisationnelles/Confidentialite/Controle-separation',
              ],
            },

            'Reglementations-internes/Mesures techniques et organisationnelles/Integrite-Controle',
            'Reglementations-internes/Mesures techniques et organisationnelles/Controle-Disponibiliter', // corrigé

            {
              type: 'category',
              label: 'Vérification, appréciation et évaluation',
              items: [
                'Reglementations-internes/Mesures techniques et organisationnelles/Verification/Gestion',
                'Reglementations-internes/Mesures techniques et organisationnelles/Verification/Detection',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
