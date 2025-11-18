function AboutUsTwo() {
    return (
        <section className="relative mr-0 py-24 lg:mr-5 xl:mr-0">
            <div className="mx-auto w-full max-w-7xl px-4 md:px-5 lg:px-5">
                <div className="grid w-full grid-cols-1 items-center justify-start gap-10 lg:grid-cols-2 xl:gap-12">
                    <div className="inline-flex w-full flex-col items-center justify-center gap-10 lg:items-start">
                        <div className="flex w-full flex-col items-start justify-center gap-8">
                            <div className="flex flex-col items-center justify-start gap-4 lg:items-start">
                                <h6 className="text-base leading-relaxed font-normal text-gray-400">
                                    About Us
                                </h6>
                                <div className="flex w-full flex-col items-center justify-start gap-3 lg:items-start">
                                    <h2 className="font-manrope text-center text-4xl leading-normal font-bold text-indigo-700 lg:text-start">
                                        The Tale of Our Achievement Story
                                    </h2>
                                    <p className="text-center text-base leading-relaxed font-normal text-gray-500 lg:text-start">
                                        Our achievement story is a testament to
                                        teamwork and perseverance. Together,
                                        we've overcome challenges, celebrated
                                        victories, and created a narrative of
                                        progress and success.
                                    </p>
                                </div>
                            </div>
                            <div className="flex w-full flex-col items-start justify-center gap-6">
                                <div className="grid w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2">
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
                                            33+ Years
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-gray-500">
                                            Influencing Digital Landscapes
                                            Together
                                        </p>
                                    </div>
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
                                            125+ Projects
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-gray-500">
                                            Excellence Achieved Through Success
                                        </p>
                                    </div>
                                </div>
                                <div className="grid h-full w-full grid-cols-1 items-center justify-start gap-8 md:grid-cols-2">
                                    <div className="inline-flex w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
                                            26+ Awards
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-gray-500">
                                            Our Dedication to Innovation Wins
                                            Understanding
                                        </p>
                                    </div>
                                    <div className="inline-flex h-full w-full flex-col items-start justify-start gap-2.5 rounded-xl border border-gray-200 p-3.5 transition-all duration-700 ease-in-out hover:border-gray-400">
                                        <h4 className="font-manrope text-2xl leading-9 font-bold text-gray-900">
                                            99% Happy Clients
                                        </h4>
                                        <p className="text-base leading-relaxed font-normal text-gray-500">
                                            Mirrors our Focus on Client
                                            Satisfaction.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="group flex w-full items-center justify-center rounded-lg bg-indigo-50 px-3.5 py-2 shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out hover:bg-indigo-100 sm:w-fit">
                            <span className="px-1.5 text-sm leading-6 font-medium text-indigo-600 transition-all duration-700 ease-in-out group-hover:-translate-x-0.5">
                                Read More
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
                                    stroke="#4F46E5"
                                    stroke-width="1.6"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex w-full items-start justify-center lg:justify-start">
                        <div className="relative h-full w-full rounded-3xl border-gray-200 sm:h-[646px] sm:w-[564px] sm:border sm:bg-gray-100">
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
