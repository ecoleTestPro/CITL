import AboutUsOne from '@/components/blocks/about-us/about-us-one';
import CertificationWheel from '@/components/blocks/certifications/certification-wheel';
import CertificationWheelTwo from '@/components/blocks/certifications/certification-wheel-two';
import CtaSectionOne from '@/components/blocks/cta/cta-section-one';
import FeaturesCertifications from '@/components/blocks/features/features-certifications';
import FeaturesSection from '@/components/blocks/features/features-section';
import HeroHome from '@/layouts/public/component/hero/hero-home';
import PublicLayout from '@/layouts/public/public-layout';

function Home() {
    return (
        <PublicLayout>
            <section>
                <HeroHome />
            </section>
            <AboutUsOne />
            <FeaturesCertifications />
            <CertificationWheelTwo />
            {false && <CertificationWheel />}
            <FeaturesSection />
            <CtaSectionOne />
            {/* <AboutUsTwo /> */}
        </PublicLayout>
    );
}

export default Home;
