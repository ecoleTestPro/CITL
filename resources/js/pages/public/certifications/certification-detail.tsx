import PublicLayout from '@/layouts/public/public-layout';
import { Certification } from '@/types';
import { Head } from '@inertiajs/react';

interface Props {
    certification: Certification;
}

function CertificationDetail({ certification }: Props) {
    const breadcrumbs = [
        { label: 'Accueil', href: '/' },
        { label: 'Certifications', href: '/why-certification' },
        { label: certification.category.name, href: `/${certification.category.slug}` },
        { label: certification.title },
    ];

    return (
        <PublicLayout breadcrumbs={breadcrumbs}>
            <Head title={`${certification.title} - CITL`} />
            <section className="pt-32 pb-24 sm:pt-36 md:pt-42 md:pb-36 lg:pb-44 xl:pt-[180px] xl:pb-[200px]">
                <div className="container mx-auto">
                    <div className="flex items-start lg:gap-[72px]">
                        <div className="w-full max-w-full lg:max-w-[767px]">
                            <div className="services-details-content mb-[72px]">
                                <h2 data-ns-animate data-delay="0.3" id="track-conversions">
                                    Track conversions
                                </h2>
                                <p data-ns-animate data-delay="0.4">
                                    Lorem ipsum dolor sit amet consectetur. Nullam blandit dui gravida aliquam enim eu. Adipiscing viverra vulputate curabitur
                                    est.
                                </p>
                                <p data-ns-animate data-delay="0.5">
                                    Morbi lorem proin morbi tempor risus. Nisl lobortis diam id faucibus pretium vitae suspendisse sed accumsan. Sodales morbi
                                    tristique elit cursus gravida. Ullamcorper commodo eget pulvinar pretium. Condimentum rhoncus commodo amet nec auctor nibh
                                    vel mi blandit.
                                </p>
                                <p data-ns-animate data-delay="0.6">
                                    Neque ultrices nunc condimentum morbi risus tincidunt. Vel arcu lacus non ornare. Porttitor in rhoncus magna augue
                                    adipiscing.
                                </p>
                                <figure data-ns-animate data-delay="0.6" data-instant className="max-w-[767px] overflow-hidden rounded-xl">
                                    <img src="images/ns-img-397.png" alt="service-details" className="size-full object-cover" />
                                </figure>

                                <h2 data-ns-animate data-delay="0.1" id="sales-management">
                                    What’s included
                                </h2>
                                <p data-ns-animate data-delay="0.2">
                                    Morbi lorem proin morbi tempor risus. Nisl lobortis diam id faucibus pretium vitae suspendisse sed accumsan. Sodales morbi
                                    tristique elit cursus gravida. Ullamcorper commodo eget pulvinar pretium. Condimentum rhoncus commodo amet nec auctor nibh
                                    vel mi blandit.
                                </p>
                                <p data-ns-animate data-delay="0.3">
                                    Neque ultrices nunc condimentum morbi risus tincidunt. Vel arcu lacus non ornare. Porttitor in rhoncus magna augue
                                    adipiscing.
                                </p>

                                <ul className="space-y-4 pt-2">
                                    <li data-ns-animate data-delay="0.1" className="flex items-center gap-3">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="7"
                                                viewBox="0 0 10 7"
                                                fill="none"
                                                aria-hidden="true"
                                                className="fill-white dark:fill-secondary"
                                            >
                                                <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                            </svg>
                                        </span>
                                        <span className="text-tagline-1 font-normal text-secondary dark:text-accent">Drag-and-drop automation builder</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.2" className="flex items-center gap-3">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="7"
                                                viewBox="0 0 10 7"
                                                fill="none"
                                                aria-hidden="true"
                                                className="fill-white dark:fill-secondary"
                                            >
                                                <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                            </svg>
                                        </span>

                                        <span className="text-tagline-1 font-normal text-secondary dark:text-accent">Trigger-based Actions</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.3" className="flex items-center gap-3">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="7"
                                                viewBox="0 0 10 7"
                                                fill="none"
                                                aria-hidden="true"
                                                className="fill-white dark:fill-secondary"
                                            >
                                                <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                            </svg>
                                        </span>

                                        <span className="text-tagline-1 font-normal text-secondary dark:text-accent">Multi-step workflows</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.4" className="flex items-center gap-3">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="7"
                                                viewBox="0 0 10 7"
                                                fill="none"
                                                aria-hidden="true"
                                                className="fill-white dark:fill-secondary"
                                            >
                                                <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                            </svg>
                                        </span>

                                        <span className="text-tagline-1 font-normal text-secondary dark:text-accent">Pre-built templates</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.5" className="flex items-center gap-3">
                                        <span className="flex size-5 items-center justify-center rounded-full bg-secondary dark:bg-accent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="10"
                                                height="7"
                                                viewBox="0 0 10 7"
                                                fill="none"
                                                aria-hidden="true"
                                                className="fill-white dark:fill-secondary"
                                            >
                                                <path d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"></path>
                                            </svg>
                                        </span>

                                        <span className="text-tagline-1 font-normal text-secondary dark:text-accent">Real-time logs & error handling</span>
                                    </li>
                                </ul>

                                <figure data-ns-animate data-delay="0.3" className="max-w-[767px] overflow-hidden rounded-xl">
                                    <img src="images/ns-img-398.png" alt="service-details" className="size-full object-cover" />
                                </figure>

                                <h2 data-ns-animate data-delay="0.2" id="use-cases">
                                    Use cases
                                </h2>
                                <p data-ns-animate data-delay="0.3">
                                    Morbi lorem proin morbi tempor risus. Nisl lobortis diam id faucibus pretium vitae suspendisse sed accumsan. Sodales morbi
                                    tristique elit cursus gravida. Ullamcorper commodo eget pulvinar pretium. Condimentum rhoncus commodo amet nec auctor nibh
                                    vel mi blandit.
                                </p>
                                <p data-ns-animate data-delay="0.4">
                                    Neque ultrices nunc condimentum morbi risus tincidunt. Vel arcu lacus non ornare. Porttitor in rhoncus magna augue
                                    adipiscing.
                                </p>

                                <ul className="list-inside list-disc space-y-4 pt-2">
                                    <li data-ns-animate data-delay="0.5" className="text-tagline-1 font-normal text-secondary/60 dark:text-accent/60">
                                        Automatically send onboarding emails after a new user signs up
                                    </li>
                                    <li data-ns-animate data-delay="0.6" className="text-tagline-1 font-normal text-secondary/60 dark:text-accent/60">
                                        Trigger invoice generation when a deal closes in your CRM
                                    </li>
                                    <li data-ns-animate data-delay="0.8" className="text-tagline-1 font-normal text-secondary/60 dark:text-accent/60">
                                        Update dashboards when new data is uploaded
                                    </li>
                                    <li data-ns-animate data-delay="0.9" className="text-tagline-1 font-normal text-secondary/60 dark:text-accent/60">
                                        Assign tasks to the right team members based on project status
                                    </li>
                                </ul>

                                <figure data-ns-animate data-delay="0.4" className="max-w-[767px] overflow-hidden rounded-xl">
                                    <img src="images/ns-img-399.jpg" alt="service-details" className="block dark:hidden" />
                                    <img src="images/ns-img-dark-216.jpg" alt="service-details" className="hidden dark:block" />
                                </figure>

                                <h2 data-ns-animate data-delay="0.2" id="real-time-analytics">
                                    Built-in security & controls
                                </h2>
                                <p data-ns-animate data-delay="0.3">
                                    Morbi lorem proin morbi tempor risus. Nisl lobortis diam id faucibus pretium vitae suspendisse sed accumsan. Sodales morbi
                                    tristique elit cursus gravida. Ullamcorper commodo eget pulvinar pretium. Condimentum rhoncus commodo amet nec auctor nibh
                                    vel mi blandit.
                                </p>
                                <p data-ns-animate data-delay="0.4">
                                    Neque ultrices nunc condimentum morbi risus tincidunt. Vel arcu lacus non ornare. Porttitor in rhoncus magna augue
                                    adipiscing.
                                </p>

                                <ul className="space-y-4 pt-2">
                                    <li data-ns-animate data-delay="0.1" className="flex items-center gap-3">
                                        <div>
                                            <span className="ns-shape-7 text-[36px] text-secondary dark:text-accent"></span>
                                        </div>
                                        <span className="text-tagline-1 font-medium text-secondary dark:text-accent">Role-based permissions</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.2" className="flex items-center gap-3">
                                        <div>
                                            <span className="ns-shape-14 text-[36px] text-secondary dark:text-accent"></span>
                                        </div>
                                        <span className="text-tagline-1 font-medium text-secondary dark:text-accent">Encrypted data processing</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.3" className="flex items-center gap-3">
                                        <div>
                                            <span className="ns-shape-11 text-[36px] text-secondary dark:text-accent"></span>
                                        </div>
                                        <span className="text-tagline-1 font-medium text-secondary dark:text-accent">Full audit logs</span>
                                    </li>
                                    <li data-ns-animate data-delay="0.4" className="flex items-center gap-3">
                                        <div>
                                            <span className="ns-shape-32 text-[36px] text-secondary dark:text-accent"></span>
                                        </div>
                                        <span className="text-tagline-1 font-medium text-secondary dark:text-accent">GDPR & SOC 2 compliant</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-[70px] space-y-14" id="live-data-insights">
                                <div className="space-y-3">
                                    <h4 data-ns-animate data-delay="0.1" className="text-heading-2">
                                        What our users say
                                    </h4>
                                    <p data-ns-animate data-delay="0.2" className="text-tagline-1">
                                        “Nextsaas delivered our entire platform ahead of schedule—flawless execution and real partnership.”
                                    </p>
                                </div>
                                <div data-ns-animate data-delay="0.1" className="space-y-6 rounded-[20px] bg-secondary p-8">
                                    <figure className="size-16 overflow-hidden rounded-full bg-linear-[180deg,#ffffff_0%,#83e7ee_100%]">
                                        <img className="size-full object-cover" src="images/ns-avatar-1.png" alt="avatar" />
                                    </figure>
                                    <blockquote>
                                        <p data-ns-animate data-delay="0.3" className="text-white">
                                            “Workflow Automation helped us eliminate hours of manual work each week. Now, our ops team can focus on strategic
                                            initiatives instead of button-clicking.”
                                        </p>
                                    </blockquote>
                                    <div>
                                        <p data-ns-animate data-delay="0.4" className="text-lg font-medium text-white">
                                            John Smith
                                        </p>
                                        <p data-ns-animate data-delay="0.5" className="text-tagline-2 font-normal text-accent/60">
                                            Lorem ipsum
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="table-of-contents hidden w-full lg:sticky lg:top-20 lg:block lg:max-w-[449px]" data-ns-animate data-delay="0.3">
                            <div className="bg-background-1 dark:bg-background-6 w-full space-y-4 rounded-[20px] p-11">
                                <h3 className="text-heading-5">Categories</h3>
                                <ul className="table-of-list w-full">
                                    <li>
                                        <a
                                            href="#track-conversions"
                                            className="lenis-scroll-to border-b-stroke-4 dark:border-b-stroke-7 flex items-center justify-between border-b py-4"
                                        >
                                            <span className="text-lg leading-[27px] font-medium text-secondary dark:text-accent">Track conversions</span>

                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path
                                                        d="M10 8.5L14 12.5L10 16.5"
                                                        className="stroke-secondary dark:stroke-accent"
                                                        stroke-opacity="0.6"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#sales-management"
                                            className="lenis-scroll-to border-b-stroke-4 dark:border-b-stroke-7 flex items-center justify-between border-b py-4"
                                        >
                                            <span className="text-lg leading-[27px] font-normal text-secondary/60 dark:text-accent/60">Sales management</span>
                                            <span className="invisible">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path
                                                        d="M10 8.5L14 12.5L10 16.5"
                                                        className="stroke-secondary dark:stroke-accent"
                                                        stroke-opacity="0.6"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#use-cases"
                                            className="lenis-scroll-to border-b-stroke-4 dark:border-b-stroke-7 flex items-center justify-between border-b py-4"
                                        >
                                            <span className="text-lg leading-[27px] font-normal text-secondary/60 dark:text-accent/60">Use cases</span>
                                            <span className="invisible">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path
                                                        d="M10 8.5L14 12.5L10 16.5"
                                                        className="stroke-secondary dark:stroke-accent"
                                                        stroke-opacity="0.6"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#real-time-analytics"
                                            className="lenis-scroll-to border-b-stroke-4 dark:border-b-stroke-7 flex items-center justify-between border-b py-4"
                                        >
                                            <span className="text-lg leading-[27px] font-normal text-secondary/60 dark:text-accent/60">
                                                Real-time analytics
                                            </span>
                                            <span className="invisible">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path
                                                        d="M10 8.5L14 12.5L10 16.5"
                                                        className="stroke-secondary dark:stroke-accent"
                                                        stroke-opacity="0.6"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#live-data-insights" className="lenis-scroll-to flex items-center justify-between py-4">
                                            <span className="text-lg leading-[27px] font-normal text-secondary/60 dark:text-accent/60">Live data insights</span>
                                            <span className="invisible">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                    <path
                                                        d="M10 8.5L14 12.5L10 16.5"
                                                        className="stroke-secondary dark:stroke-accent"
                                                        stroke-opacity="0.6"
                                                        stroke-width="1.5"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

export default CertificationDetail;
