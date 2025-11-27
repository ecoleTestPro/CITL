import { useState } from 'react';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqCategory {
    id: string;
    name: string;
    items: FaqItem[];
}

interface FaqBlockOneProps {
    badge?: string;
    title?: string;
    description?: string;
    categories?: FaqCategory | FaqCategory[];
    className?: string;
}

function FaqBlockOne({
    badge = 'FAQ',
    title = 'Commonly asked questions',
    description = 'By offering concise and informative responses, this section helps users find solutions without the need to contact customer support, saving time',
    categories = {
        id: 'general',
        name: 'General',
        items: [
            {
                question: 'What is the primary role of a business agency?',
                answer: 'When collaborating with a business agency, you can generally expect an extensive array of services designed to not only support your current operations but also to foster growth and innovation within your business. These services often include strategic planning, marketing solutions, financial consulting, and operational improvements.',
            },
            {
                question: 'What kinds of services should I anticipate from a business agency?',
                answer: 'Business agencies typically offer a comprehensive suite of services tailored to meet diverse business needs. This includes market research and analysis, brand development and positioning, digital marketing strategies, content creation, social media management, SEO optimization, website design and development, public relations, event planning, and customer relationship management.',
            },
        ],
    },
    className = '',
}: FaqBlockOneProps) {
    const categoriesArray = Array.isArray(categories) ? categories : [categories];
    const [activeCategory, setActiveCategory] = useState<string>(categoriesArray[0]?.id || 'general');
    const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));

    const toggleAccordion = (index: number) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const handleCategoryChange = (categoryId: string) => {
        setActiveCategory(categoryId);
        setOpenItems(new Set([0])); // Open first item of new category
    };

    const activeItems = categoriesArray.find((cat) => cat.id === activeCategory)?.items || [];

    return (
        <main>
            <section className={`pt-12 pb-[100px] ${className}`}>
                <div className="main-container">
                    <div className="space-y-5 text-center">
                        {badge && (
                            <span data-ns-animate data-delay="0.2" className="badge badge-cyan">
                                {badge}
                            </span>
                        )}
                        {title && (
                            <div className="space-y-3 text-center">
                                <h2 data-ns-animate data-delay="0.3">
                                    {title}
                                </h2>
                                {description && (
                                    <p data-ns-animate data-delay="0.4" className="mx-auto max-w-[600px]">
                                        {description}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Tabs for categories if multiple */}
                    {categoriesArray.length > 1 && (
                        <div className="mt-10 flex flex-wrap justify-center gap-4" data-ns-animate data-delay="0.5">
                            {categoriesArray.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                                        activeCategory === category.id
                                            ? 'bg-citl-orange text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    )}

                    <div data-ns-animate data-delay="0.6" data-instant>
                        <div className="tab-content mx-auto mt-[70px] max-w-[850px] space-y-4">
                            {activeItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8 ${
                                        openItems.has(index) ? 'active-accordion' : ''
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="accordion-action flex w-full cursor-pointer items-center justify-between pt-8 pb-8"
                                    >
                                        <span className="flex-1 text-left text-lg font-semibold dark:text-accent">{item.question}</span>

                                        <span className="accordion-arrow ml-2.5 block sm:ml-auto">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                width="16"
                                                height="16"
                                                className={`transition-transform duration-200 ${openItems.has(index) ? 'rotate-180' : ''}`}
                                            >
                                                <path
                                                    strokeOpacity="0.8"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                                    className="stroke-secondary dark:stroke-accent"
                                                />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`accordion-content overflow-hidden transition-all duration-300 ${
                                            openItems.has(index) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <div className="border-t-stroke-2 dark:border-t-stroke-6 border-t pt-6 pb-8">
                                            <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: item.answer }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default FaqBlockOne;
