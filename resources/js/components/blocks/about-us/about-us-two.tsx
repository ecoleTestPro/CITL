function AboutUsTwo() {
    return (
        <section className="relative mr-0 py-24 lg:mr-5 xl:mr-0">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
                <div className="grid w-full grid-cols-1 items-center justify-start gap-10 lg:grid-cols-2 xl:gap-12">
                    <div className="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
                        <div className="flex w-full flex-col items-start justify-center gap-8">
                            <div className="flex flex-col items-center justify-start gap-4 lg:items-start">
                                <h6 className="text-base leading-relaxed font-normal text-muted-foreground">
                                    À propos
                                </h6>
                                <div className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
                                    <h2 className="font-manrope text-center text-4xl leading-normal font-bold text-primary lg:text-start">
                                        Notre Histoire de Réussite
                                    </h2>
                                    <p className="text-center text-base leading-relaxed font-normal text-muted-foreground lg:text-start">
                                        Notre histoire de réussite témoigne du
                                        travail d'équipe et de la persévérance.
                                        Ensemble, nous avons surmonté les défis,
                                        célébré les victoires et créé un récit de
                                        progrès et de succès.
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-start justify-center gap-6">
                                <div className="grid w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2">
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-border bg-card p-3.5 transition-all duration-700 ease-in-out hover:border-primary hover:shadow-md">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-foreground">
                                            33+ Années
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-muted-foreground">
                                            Influençant les Paysages Numériques
                                            Ensemble
                                        </p>
                                    </div>
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-border bg-card p-3.5 transition-all duration-700 ease-in-out hover:border-secondary hover:shadow-md">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-foreground">
                                            125+ Projets
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-muted-foreground">
                                            Excellence Atteinte Grâce au Succès
                                        </p>
                                    </div>
                                </div>
                                <div className="grid h-full w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2">
                                    <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-border bg-card p-3.5 transition-all duration-700 ease-in-out hover:border-primary hover:shadow-md">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-foreground">
                                            26+ Récompenses
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-muted-foreground">
                                            Notre Dévouement à l'Innovation
                                            Reconnu
                                        </p>
                                    </div>
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-border bg-card p-3.5 transition-all duration-700 ease-in-out hover:border-secondary hover:shadow-md">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-foreground">
                                            99% Clients Satisfaits
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-muted-foreground">
                                            Reflète notre Focus sur la
                                            Satisfaction Client
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="group flex w-full items-center justify-center rounded-lg bg-primary/10 px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-all duration-700 ease-in-out hover:bg-primary/20 sm:w-fit">
                            <span className="px-1.5 text-sm leading-6 font-medium text-primary transition-all duration-700 ease-in-out group-hover:-translate-x-0.5">
                                En savoir plus
                            </span>
                            <svg
                                className="transition-all duration-700 ease-in-out group-hover:translate-x-0.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                            >
                                <path
                                    d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex w-full items-start justify-center lg:justify-start">
                        <div className="relative h-full w-full rounded-3xl border-border sm:h-[646px] sm:w-[564px] sm:border sm:bg-muted/30">
                            <img
                                className="h-full w-full rounded-3xl object-cover sm:mt-5 sm:ml-5"
                                src="https://pagedone.io/asset/uploads/1717742431.png"
                                alt="about Us image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutUsTwo;
