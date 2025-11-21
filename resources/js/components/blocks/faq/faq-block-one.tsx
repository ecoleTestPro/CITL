import React from 'react'

function FaqBlockOne() {
  return (
     <main>
  
<section className="pb-[100px] xl:pt-[180px] md:pt-42 sm:pt-36 pt-32">
  <div className="main-container">
    <div className="text-center space-y-5">
      <span data-ns-animate data-delay="0.2" className="badge badge-cyan">FAQ</span>
      <div className="space-y-3 text-center">
        <h2 data-ns-animate data-delay="0.3">Commonly asked questions</h2>
        <p data-ns-animate data-delay="0.4" className="max-w-[600px] mx-auto">
          By offering concise and informative responses, this section helps users find solutions
          without the need to contact customer support, saving time
        </p>
      </div>
    </div>

<div className="py-[70px]">
  <div
    role="tablist"
    data-ns-animate
    data-delay="0.5"
    className="hidden md:flex tab-bar justify-center items-center border-b border-stroke-2 dark:border-stroke-6 relative"
  >
    <div className="active-tab-bar"></div>

    <button
      className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
    >
      <span className="text-tagline-1 font-medium">General</span>
    </button>
    <button
      className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
    >
      <span className="text-tagline-1 font-medium">Changelog</span>
    </button>
    <button
      className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
    >
      <span className="text-tagline-1 font-medium">Privacy</span>
    </button>
    <button
      className="py-3 cursor-pointer focus-visible:outline-0 px-10 -mb-px data-[state=selected]:text-secondary text-secondary/60 dark:data-[state=selected]:text-accent dark:text-accent/60"
    >
      <span className="text-tagline-1 font-medium">Terms & Condition</span>
    </button>
  </div>

  <div className="tab-mobile flex items-center flex-wrap md:hidden gap-4">
    <button
      className="px-3.5 py-2 min-w-16 text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
    >
      General
    </button>
    <button
      className="px-3.5 py-2 min-w-16 text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
    >
      Changelog
    </button>
    <button
      className="px-3.5 py-2 min-w-16 text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7"
    >
      Privacy
    </button>
    <button
      className="px-3.5 py-2 min-w-16 text-tagline-2 font-medium text-secondary/60 dark:text-accent/60 border border-stroke-2 dark:border-stroke-7 rounded-full dark:bg-background-7 text-nowrap"
    >
      Terms & Condition
    </button>
  </div>
</div>


<div data-ns-animate data-delay="0.6" data-instant>
  <div className="tab-content max-w-[850px] mx-auto space-y-4 {=$class}" data-display="block">
    <div
      className="accordion-item active-accordion bg-background-1 dark:bg-background-6 rounded-[20px] px-8"
    >
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What is the primary role of a business agency?
        </span>
       
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What kinds of services should I anticipate from a business agency?
        </span>
       
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          How often should I consider updating my website?
        </span>
 
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          How often is it recommended to refresh my website?
        </span>
       
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What’s the ideal frequency for updating my website?
        </span>
 
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          How frequently should I consider refreshing my website?
        </span>
       
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            When collaborating with a business agency, you can generally expect an extensive array
            of services designed to not only support your current operations but also to foster
            growth and innovation within your business. These services often include strategic
            planning, marketing solutions, financial consulting, and operational improvements.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>



<div data-ns-animate data-delay="0.6" data-instant>
  <div className="tab-content max-w-[850px] mx-auto space-y-4 {=$class}" data-display="block">
    <div
      className="accordion-item active-accordion bg-background-1 dark:bg-background-6 rounded-[20px] px-8"
    >
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What is a changelog?
        </span>
   
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          How often is the changelog updated?
        </span>
    
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Where can I view the latest changelog?
        </span>
     
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>

    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Am I get notified when something changes?
        </span>
        
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>
    <!-- accordion five -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What types of updates are included?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion six -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Are minor fixes always included in the changelog?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            We diligently update the changelog each time we roll out new features, implement
            enhancements, or address bugs. This process usually occurs on a biweekly or monthly
            schedule, ensuring that our users are always informed about the latest improvements and
            fixes.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    <!-- privacy tab  -->
    <!-- =========================
Privacy Faq section
===========================-->
<div data-ns-animate data-delay="0.6" data-instant>
  <div className="tab-content max-w-[850px] mx-auto space-y-4 {=$class}" data-display="block">
    <!-- accordion one  -->
    <div
      className="accordion-item active-accordion bg-background-1 dark:bg-background-6 rounded-[20px] px-8"
    >
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What is privacy in the digital world?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion two  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Why is online privacy important?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion three  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          How can I protect my privacy online?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion four  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Are my messages really private?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion five  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What data do websites collect about me?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion six  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What is a privacy policy?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Your online presence can disclose a wealth of personal information—your habits,
            whereabouts, and even your identity. Safeguarding your privacy is crucial in thwarting
            identity theft, avoiding unwanted surveillance, and preventing the misuse of your
            private information.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


    <!-- terms & condition tab  -->
    <!-- =========================
Terms & Condition Faq section
===========================-->
<div data-ns-animate data-delay="0.6" data-instant>
  <div className="tab-content max-w-[850px] mx-auto space-y-4 {=$class}" data-display="block">
    <!-- accordion one  -->
    <div
      className="accordion-item active-accordion bg-background-1 dark:bg-background-6 rounded-[20px] px-8"
    >
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What are terms & conditions?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion two  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Why do i need to accept the terms & conditions?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion three  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Can the terms & conditions change?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion four  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What happens if I violate the terms & conditions?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion five  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          Where can I read the full terms & conditions?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>

    <!-- accordion six  -->
    <div className="accordion-item bg-background-1 dark:bg-background-6 rounded-[20px] px-8">
      <!-- heading  -->
      <button
        className="accordion-action flex items-center cursor-pointer justify-between pt-8 pb-8 w-full"
      >
        <span className="flex-1 text-left text-heading-6 font-normal text-secondary dark:text-accent">
          What kind of activities are prohibited under your terms?
        </span>
        <!-- =========================
Accordian Icon
===========================-->
<span className="sm:ml-auto ml-2.5 block accordion-arrow">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    width="16"
    height="16"
  >
    <path
      stroke-opacity="0.8"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
      className="stroke-secondary dark:stroke-accent"
    />
  </svg>
</span>

      </button>
      <!-- content  -->
      <div className="accordion-content">
        <div className="border-t border-t-stroke-2 dark:border-t-stroke-6 pt-6 pb-8">
          <p>
            Accepting the Terms & Conditions ensures that you understand your rights,
            responsibilities, and our policies while using our services. It protects both you and
            our platform.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
</section>

      <!-- =========================
Contact section
===========================-->
<section className="pt-[100px] pb-[200px]">
  <div className="main-container">
    <div className="space-y-[70px]">
      <!-- heading  -->
      <div className="main-w-[850px] md:w-full mx-auto text-center space-y-5">
        <span data-ns-animate data-delay="0.2" className="badge badge-cyan">Contact</span>
        <div className="space-y-3">
          <h2 id="contact-heading" data-ns-animate data-delay="0.3">Still have questions?</h2>
          <p data-ns-animate data-delay="0.4" className="max-w-[442px] sm:w-full mx-auto">
            If your question isn't listed here, feel free to contact us or start a live chat with
            our team. We're happy to help!
          </p>
        </div>
      </div>

      <!-- form -->
      <div
        data-ns-animate
        data-delay="0.5"
        className="contact-form max-w-[850px] md:w-full mx-auto bg-white dark:bg-background-6 rounded-[20px] p-5 sm:p-[42px]"
      >
        <form action="https://next-sass-html.vercel.app/index.html" method="POST">
          <!-- full name -->
          <div className="space-y-2 mb-8">
            <label
              for="fullname"
              className="block text-tagline-1 text-secondary dark:text-accent font-medium"
              >Full name</label
            >
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your name"
              required
              autocomplete="name"
              className="w-full px-[18px] shadow-1 dark:text-accent dark:bg-background-6 py-2 rounded-full border border-stroke-3 dark:border-stroke-6 bg-background-1 text-tagline-1 dark:placeholder:text-accent/60 placeholder:text-secondary/60 focus:outline-none focus:border-primary-500 placeholder:text-tagline-1 placeholder:font-normal font-normal"
            />
          </div>

          <!-- email -->
          <div className="space-y-2 mb-8">
            <label
              for="email"
              className="block text-tagline-1 text-secondary dark:text-accent font-medium"
              >Email address</label
            >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              autocomplete="email"
              className="w-full px-[18px] py-2 dark:text-accent rounded-full border dark:bg-background-6 border-stroke-3 dark:border-stroke-6 bg-background-1 text-tagline-1 dark:placeholder:text-accent/60 placeholder:text-secondary/60 focus:outline-none focus:border-primary-500 placeholder:text-tagline-1 placeholder:font-normal font-normal"
            />
          </div>

          <!-- message -->
          <div className="space-y-2 mb-4">
            <label
              for="message"
              className="block text-tagline-1 text-secondary dark:text-accent font-medium"
              >Messages</label
            >
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your messages"
              required
              className="w-full px-[18px] py-2 rounded-xl dark:bg-background-6 border dark:text-accent border-stroke-3 dark:border-stroke-6 bg-background-1 text-tagline-1 dark:placeholder:text-accent/60 placeholder:text-secondary/60 focus:outline-none focus:border-primary-500 placeholder:text-tagline-1 placeholder:font-normal font-normal"
            ></textarea>
          </div>

          <!-- terms checkbox -->
          <fieldset className="flex items-center gap-2 mb-4">
            <label for="terms" className="flex items-center gap-x-3">
              <input id="terms" type="checkbox" className="sr-only peer" required />
              <span
                className="size-4 rounded-full border border-stroke-3 dark:border-stroke-7 relative after:absolute after:size-2.5 after:bg-primary-500 after:rounded-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:opacity-0 peer-checked:after:opacity-100 peer-checked:border-primary-500 cursor-pointer"
              ></span>
            </label>
            <label
              for="terms"
              className="text-tagline-3 text-secondary/60 dark:text-accent/60 cursor-pointer"
            >
              I agree with the
              <a href="#" className="text-primary-500 underline text-tagline-3">terms and conditions</a>
            </label>
          </fieldset>

          <!-- submit button -->
          <button
            type="submit"
            className="btn btn-md btn-secondary dark:btn-accent w-full before:content-none first-letter:uppercase hover:btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

      <!-- =========================
CTA v1 section
===========================-->
<section className="py-[50px] md:py-20 lg:py-28 dark:bg-background-6 bg-white" aria-label="Use Case Overview">
  <div className="main-container">
    <div className="flex items-center flex-col lg:flex-row justify-between">
      <div
        className="xl:max-w-[650px] lg:max-w-[476px] max-[400px]:max-w-[300px] w-full space-y-5 text-center lg:text-left"
      >
        <span data-ns-animate data-delay="0.3" className="badge badge-green badge-cyan"
          >Get started</span
        >
        <div className="space-y-3">
          <h2
            data-ns-animate
            data-delay="0.4"
            className="text-secondary dark:text-accent text-heading-5 sm:text-heading-4 lg:text-heading-2"
          >
            Build a complete website using the assistance
            <span className="text-primary-500 hidden">{=$span-text}</span>
          </h2>
          <p data-ns-animate data-delay="0.5">Start your free trial today and see your ideas come to life easily and creatively.</p>
        </div>
      </div>

      <div
        className="lg:basis-[486px] space-y-6 md:ml-0 xl:ml-[80px] pt-[40px] lg:pt-[67px] w-full sm:w-[80%] md:w-[60%]"
      >
        <form
          data-ns-animate
          data-delay="0.6"
          action="#"
          method="post"
          className="flex items-center flex-col gap-5 sm:flex-row justify-start lg:gap-3"
        >
          <input
            type="email"
            name="email"
            id="userEmail-cta-v1"
            placeholder="Enter your email"
            required
            className="px-[18px] shadow-1 h-12 py-3 placeholder:text-secondary/50 rounded-full border border-stroke-1 lg:max-w-[340px] md:w-[71%] w-full max-[376px]:w-full dark:border-stroke-7 dark:placeholder:text-accent/60 focus:outline-none focus:border-primary-600 dark:focus:border-primary-400 dark:text-accent placeholder:font-normal font-normal"
          />

          <div className="group w-full md:w-auto inline-block">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full cursor-pointer gap-1.5 group-hover:bg-secondary text-center transition-all duration-500 ease-in-out md:h-12 font-normal text-nowrap group-hover:scale-101 lowercase shadow-1 bg-primary-500 border-stroke-7 text-white text-tagline-1 px-5 py-2.5 w-full md:w-auto mx-auto md:mx-0 hover:btn-secondary dark:hover:btn-accent"
            >
              <span
                className="inline-block transition-transform duration-300 ease-in-out first-letter:uppercase"
                >Get started
              </span>

              <div className="relative overflow-hidden size-6">
                <!-- one  -->
                <span
                  className="group-hover:translate-x-1 -translate-x-6 absolute inset-0 transition-transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M11 5H13V7H11V5Z" fill="white" />
                    <path d="M5 5H7V7H5V5Z" fill="white" />
                    <path d="M14 8H16V10H14V8Z" fill="white" />
                    <path d="M8 8H10V10H8V8Z" fill="white" />
                    <path d="M17 11H19V13H17V11Z" fill="white" />
                    <path d="M11 11H13V13H11V11Z" fill="white" />
                    <path d="M14 14H16V16H14V14Z" fill="white" />
                    <path d="M8 14H10V16H8V14Z" fill="white" />
                    <path d="M11 17H13V19H11V17Z" fill="white" />
                    <path d="M5 17H7V19H5V17Z" fill="white" />
                  </svg>
                </span>

                <!-- two  -->
                <span
                  className="group-hover:translate-x-6 absolute -translate-x-2 transition-transform duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M11 5H13V7H11V5Z" fill="white" />
                    <path d="M5 5H7V7H5V5Z" fill="white" />
                    <path d="M14 8H16V10H14V8Z" fill="white" />
                    <path d="M8 8H10V10H8V8Z" fill="white" />
                    <path d="M17 11H19V13H17V11Z" fill="white" />
                    <path d="M11 11H13V13H11V11Z" fill="white" />
                    <path d="M14 14H16V16H14V14Z" fill="white" />
                    <path d="M8 14H10V16H8V14Z" fill="white" />
                    <path d="M11 17H13V19H11V17Z" fill="white" />
                    <path d="M5 17H7V19H5V17Z" fill="white" />
                  </svg>
                </span>
              </div>
            </button>
          </div>
        </form>
        <ul
          className="flex flex-row items-center justify-center gap-x-4 sm:gap-x-6 sm:gap-y-0 gap-y-5 lg:justify-start"
        >
          <li data-ns-animate data-delay="0.7" className="flex items-center justify-center gap-2">
            <span
              className="size-[18px] bg-secondary dark:bg-accent rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                aria-hidden="true"
                className="fill-white dark:fill-secondary"
              >
                <path
                  d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"
                />
              </svg>
            </span>
            <p className="text-tagline-3 sm:text-tagline-2">No credit card required</p>
          </li>
          <li data-ns-animate data-delay="0.8" className="flex items-center justify-center gap-2">
            <span
              className="size-[18px] bg-secondary dark:bg-accent rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="7"
                viewBox="0 0 10 7"
                fill="none"
                aria-hidden="true"
                className="fill-white dark:fill-secondary"
              >
                <path
                  d="M4.31661 6.75605L9.74905 1.42144C10.0836 1.0959 10.0836 0.569702 9.74905 0.244158C9.41446 -0.081386 8.87363 -0.081386 8.53904 0.244158L3.7116 4.99012L1.46096 2.78807C1.12636 2.46253 0.585538 2.46253 0.250945 2.78807C-0.0836483 3.11362 -0.0836483 3.63982 0.250945 3.96536L3.1066 6.75605C3.27347 6.91841 3.49253 7 3.7116 7C3.93067 7 4.14974 6.91841 4.31661 6.75605Z"
                />
              </svg>
            </span>
            <p className="text-tagline-3 sm:text-tagline-2">14-Day free trial</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

    </main>
  )
}

export default FaqBlockOne