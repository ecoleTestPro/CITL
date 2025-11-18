import AboutUsOne from '@/components/blocks/about-us/about-us-one';
import AboutUsTwo from '@/components/blocks/about-us/about-us-two';
import PublicLayout from '@/layouts/public/public-layout';

function Home() {
    return (
        <PublicLayout variant="home">
            <AboutUsOne />
            <AboutUsTwo />
        </PublicLayout>
    );
}

export default Home;
