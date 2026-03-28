import React, { useState, useRef, useEffect } from 'react';

const FAQS = [
  {
    q: 'What is included in the pooja service?',
    a: 'Our pooja service includes experienced, vetted pandits who perform authentic Vedic rituals according to traditional procedures. Services typically include pre-pooja consultation, the full ceremony (including mantras and homa where applicable), provision or coordination of samagri, and post-pooja blessings and guidance. You can also request add-ons such as photography, special homa materials, or an extended ritual — these are available at an additional cost.'
  },
  {
    q: 'Do you provide pooja samagri?',
    a: 'Yes — we offer complete, curated pooja samagri kits prepared according to the specific ritual. Each kit is quality-checked and can be customized to include additional items on request. You may choose delivery to your venue ahead of the pooja or opt for the pandit to bring and set up the required samagri.'
  },
  {
    q: 'Can I choose my preferred date and time?',
    a: 'Absolutely. During booking you can select your preferred date and time subject to the availability of pandits and any auspicious muhurta requirements. After you request a slot we will confirm availability and send a booking confirmation with the assigned pandit and any pre-pooja instructions.'
  },
  {
    q: 'Can I reschedule or cancel the booking?',
    a: 'Yes — bookings may be rescheduled or canceled in line with our booking policy. Typically rescheduling is free if requested with sufficient notice; cancellations may be eligible for a full or partial refund depending on the timing. Please review our cancellation policy or contact support for help with a specific booking.'
  },
  {
    q: 'How do I book a pandit?',
    a: 'To book a pandit, select the desired pooja from our listings and click "Book Now". Complete the booking form with your details (date, time, location, and any special requests), choose a samagri option if required, and proceed to payment. You will receive a confirmation with the assigned pandit and instructions for the day of the pooja.'
  },
  {
    q: 'Is online pooja available?',
    a: 'Yes — we provide online pooja (virtual) services via secure video call for clients who cannot host an in-person ritual. Online sessions include live chanting and guidance from the pandit; we can arrange to deliver a samagri kit to your address beforehand if needed. Recordings of the session can be provided upon request.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  useEffect(() => {
    // adjust maxHeight of content panels for smooth transition
    contentRefs.current.forEach((el, idx) => {
      if (!el) return;
      if (openIndex === idx) {
        el.style.maxHeight = el.scrollHeight + 'px';
      } else {
        el.style.maxHeight = '0px';
      }
    });
  }, [openIndex]);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 overflow-visible">
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-600 mb-6">Answers to the most common questions about our pooja services.</p>

          <div className="space-y-4">
            {FAQS.map((f, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="relative">
                  <div className={`bg-white rounded-2xl shadow-md border border-gray-100 overflow-visible transition-all duration-200 ${isOpen ? 'scale-[1.002] z-20 shadow-xl' : 'hover:shadow-lg'}`}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggle(i)}
                      className={`w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-200 ${isOpen ? 'bg-orange-50' : 'hover:bg-orange-50'}`}
                    >
                      <span className="flex-1 whitespace-normal break-words">
                        <span className="text-gray-800 font-semibold text-base sm:text-lg">{f.q}</span>
                      </span>

                      <svg
                        className={`ml-4 h-5 w-5 text-orange-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                      </svg>
                    </button>

                    <div
                      ref={(el) => (contentRefs.current[i] = el)}
                      className="px-4 pb-5 sm:px-5 overflow-hidden bg-white"
                      style={{ maxHeight: '0px', transition: 'max-height 340ms cubic-bezier(.2,.9,.2,1)', willChange: 'max-height' }}
                    >
                      <div className={`pt-3 text-gray-700 text-sm sm:text-base leading-relaxed transform transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
