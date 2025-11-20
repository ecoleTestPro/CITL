import AboutUsOne from '@/components/blocks/about-us/about-us-one';
import CertificationWheel from '@/components/blocks/certifications/certification-wheel';
import FeaturesCertifications from '@/components/blocks/features/features-certifications';
import PublicLayout from '@/layouts/public/public-layout';

function Home() {
    return (
        <PublicLayout variant="home">
            <AboutUsOne />
            <FeaturesCertifications />
            <CertificationWheel />
            {/* <AboutUsTwo /> */}
        </PublicLayout>
    );
}

export default Home;
