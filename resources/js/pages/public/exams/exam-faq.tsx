import { HeroCommon } from '@/components/blocks/about';
import FaqBlockOne from '@/components/blocks/faq/faq-block-one';
import PublicLayout from '@/layouts/public/public-layout';
import { useTranslation } from 'react-i18next';

function ExamFaq() {
    const { t } = useTranslation();

    const faqCategories = {
        id: 'pourquoi-certification',
        name: 'Pourquoi la certification ISTQB®',
        items: [
            {
                question: 'Quels sont les avantages des programmes de formation ISTQB® ?',
                answer: "Tous les syllabi (programmes) sont élaborés et révisés par des professionnels de test reconnus, issus aussi bien du monde académique que de l'industrie. Ils offrent une reconnaissance mondiale grâce à l'application cohérente des politiques et procédures de l'ISTQB®.",
            },
            {
                question: "Comment l'ISTQB® assure-t-il la qualité des certifications ?",
                answer: "L'ISTQB® fournit un langage commun avec son glossaire, assure l'accès public aux documents dans différentes langues, maintient une amélioration continue des syllabi, et offre une crédibilité professionnelle reconnue internationalement.",
            },
            {
                question: 'Quels bénéfices personnels apporte la certification ISTQB® ?',
                answer: "La certification offre une validation indépendante et reconnue internationalement de vos compétences, une preuve portable de vos capacités valable pour votre carrière actuelle et future, et un soutien à la progression professionnelle grâce à l'amélioration continue de vos compétences en testing.",
            },
            {
                question: 'Comment la certification ISTQB® bénéficie-t-elle aux entreprises ?',
                answer: "Elle offre un avantage concurrentiel en renforçant la confiance des clients, valorise les prestations grâce à des services de qualité supérieure, établit un langage commun dans l'organisation, et donne accès au Programme de Partenariat ISTQB® pour des opportunités supplémentaires.",
            },
            {
                question: 'Quels sont les niveaux de certification ISTQB® ?',
                answer: 'Le programme comprend plusieurs niveaux : Foundation (Fondamental), Advanced (Avancé), Expert, et des Modules spécialisés (Spécialiste). Chaque niveau correspond à des compétences spécifiques en testing logiciel.',
            },
            {
                question: 'Quel est le succès international de la certification ISTQB® ?',
                answer: "En avril 2025, plus d'un million de professionnels à travers le monde sont certifiés. Les certifiés proviennent de secteurs variés incluant l'informatique, la finance, l'assurance, la santé, les transports, l'industrie, l'énergie, l'administration publique, l'e-commerce, la logistique et l'éducation.",
            },
            {
                question: "Comment s'inscrire aux examens ISTQB® ?",
                answer: 'Les examens sont proposés par des organismes de formation mandatés par le CITL. Vous pouvez vous inscrire directement sur le site du CITL en tant que candidat libre ou suivre une formation organisée par un organisme agréé qui se charge de réserver votre examen.',
            },
            {
                question: 'Quelles sont les modalités de préparation aux examens ?',
                answer: 'Vous pouvez suivre une formation en centre agréé avec accompagnement professionnel, examens blancs et préparation ciblée, ou vous préparer en autonomie avec des ressources en ligne. Des examens blancs sont disponibles pour vous entraîner dans des conditions réelles.',
            },
            {
                question: 'Comment fonctionnent les examens ISTQB® ?',
                answer: 'Tous les examens peuvent être passés en ligne depuis votre domicile. Le format varie selon le niveau : nombre de questions (40-50), score de réussite (26-70%), durée (60-120 minutes avec prolongation possible pour les non-natifs), et points totaux variables.',
            },
            {
                question: 'Quels sont les centres de formation accrédités par le CITL ?',
                answer: 'Les centres actuellement accrédités incluent : Centre Formation Alpha (Foundation, Advanced, Expert), Centre Formation Beta (Foundation et TMMi), Centre Formation Gamma (Foundation, Agile Testing, et IREB®). La liste est régulièrement mise à jour.',
            },
            {
                question: 'Quels avantages offrent les organismes de formation accrédités ?',
                answer: "Ils assurent une formation de qualité supérieure avec des formateurs certifiés, une vérification de la qualité des contenus par un organe membre ISTQB®, une notification anticipée des changements, et l'utilisation autorisée des logos ISTQB®.",
            },
            {
                question: "Qu'est-ce que le Programme Partenaire du CITL ?",
                answer: "Il reconnaît les organisations engagées dans la certification en tests logiciels avec trois niveaux (Platine, Or, Argent) basés sur le nombre de certifications accumulées. Il offre des avantages comme l'utilisation du logo partenaire, la reconnaissance publique, et des privilèges lors d'événements.",
            },
        ],
    };

    return (
        <PublicLayout>
            <HeroCommon
                badge={"FAQ Examens"}
                title="Questions fréquentes sur les certifications ISTQB®"
                description=""
                backgroundImage="/assets/images/bg/sharp-2.png"
            />

            <FaqBlockOne
                badge=""
                title=""
                description=""
                categories={faqCategories}
                className="bg-white dark:bg-gray-900"
            />
        </PublicLayout>
    );
}

export default ExamFaq;
