function CertificationList() {
    return (
        <section className="py-14 md:py-16 lg:py-[88px] xl:py-[100px]">
            <div className="container mx-auto">
                <div className="space-y-10 md:space-y-[70px]">
                    <div data-ns-animate data-delay="0.1" className="mx-auto max-w-[602px] space-y-3 text-center">
                        <span className="badge badge-green mb-5">process</span>
                        <h2 data-ns-animate data-delay="0.2">
                            How it works
                        </h2>
                        <p data-ns-animate data-delay="0.3">
                            Becoming a NextSaaS affiliate and earning money is simple
                        </p>
                    </div>

                    <div className="grid grid-cols-12 gap-8">
                        <article
                            data-ns-animate
                            data-delay="0.4"
                            className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                        >
                            <div className="space-y-11">
                                <span className="text-tagline-2 inline-block dark:text-accent/60">Step 1</span>
                                <div>
                                    <span className="ns-shape-35 text-[52px] text-secondary dark:text-accent"></span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-heading-6 md:text-heading-5">Register as an affiliate</h3>
                                <p className="max-w-[345px]">
                                    Join our affiliate program and start earning today! As an affiliate, you'll have the opportunity to promote our products or
                                    services
                                </p>
                            </div>
                        </article>

                        <article
                            data-ns-animate
                            data-delay="0.5"
                            className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                        >
                            <div className="space-y-11">
                                <span className="text-tagline-2 inline-block dark:text-accent/60">Step 2</span>
                                <div>
                                    <span className="ns-shape-12 text-[52px] text-secondary dark:text-accent"></span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-heading-6 md:text-heading-5">Get to know our products</h3>
                                <p className="max-w-[345px]">
                                    Learn about our products and services to effectively promote them to your audience. We provide comprehensive resources and
                                    training materials.
                                </p>
                            </div>
                        </article>

                        <article
                            data-ns-animate
                            data-delay="0.6"
                            className="dark:bg-background-6 col-span-12 space-y-3.5 rounded-[20px] bg-white p-8 md:col-span-6 lg:col-span-4"
                        >
                            <div className="space-y-11">
                                <span className="text-tagline-2 inline-block dark:text-accent/60">Step 3</span>
                                <div>
                                    <span className="ns-shape-3 text-[52px] text-secondary dark:text-accent"></span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-heading-6 md:text-heading-5">Earn commissions on every sale</h3>
                                <p className="max-w-[345px]">
                                    Start earning generous commissions for every successful referral. Track your performance and earnings through our affiliate
                                    dashboard.
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CertificationList;
