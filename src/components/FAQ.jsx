import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How do I book a trip on Tourfinity?",
      answer: "Simply search for your destination, select flights, hotels, or packages, and complete your booking through our secure payment gateway."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, cancellations and modifications are possible depending on airline or hotel policies. Check your booking details for more info."
    },
    {
      question: "Is my payment information secure?",
      answer: "Absolutely! We use encrypted payment systems and follow the latest security standards to protect your information."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes, we offer special discounts for students at Chitkara University and other partnered institutes. Look out for promotions!"
    }
  ];

  return (
    <div>
      <style jsx>{`
        /* General page styling */
        body {
          font-family: Arial, sans-serif;
          background: #f5f8fc;
          margin: 0;
          padding: 0;
        }

        .faq-container {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
          text-align: center;
        }

        .faq-container h2 {
          font-size: 2rem;
          color: #0a2a66;
        }

        .subtitle {
          color: #444;
          margin-bottom: 30px;
        }

        /* FAQ Items */
        .faq-item {
          background: #ffffff;
          margin: 10px 0;
          border-radius: 8px;
          box-shadow: 0px 4px 10px rgba(0,0,0,0.08);
          overflow: hidden;
          text-align: left;
          transition: 0.3s;
        }

        .faq-item:hover {
          box-shadow: 0px 6px 14px rgba(0,0,0,0.12);
        }

        .faq-question {
          width: 100%;
          padding: 15px 20px;
          background: none;
          border: none;
          outline: none;
          text-align: left;
          font-size: 1.1rem;
          font-weight: bold;
          color: #0a2a66;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: #f9fbff;
        }

        .faq-question i {
          color: #0a2a66;
          transition: transform 0.3s ease;
        }

        .faq-question i.rotate {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0 20px;
          color: #333;
          background: #f9fbff;
        }

        .faq-answer.active {
          max-height: 200px;
          padding: 15px 20px;
        }

        /* More Questions Section */
        .more-questions {
          margin-top: 40px;
          background: #ffffff;
          padding: 30px 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
        }

        .more-questions h3 {
          color: #0a2a66;
          margin-bottom: 10px;
        }

        .more-questions p {
          color: #555;
          margin-bottom: 20px;
        }

        .contact-btn {
          display: inline-block;
          padding: 12px 20px;
          background: #0a2a66;
          color: white;
          border-radius: 6px;
          text-decoration: none;
          font-size: 1rem;
          transition: background 0.3s ease;
        }

        .contact-btn:hover {
          background: #08305f;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .faq-container {
            margin: 20px auto;
            padding: 15px;
          }
          
          .faq-container h2 {
            font-size: 1.5rem;
          }
          
          .faq-question {
            font-size: 1rem;
            padding: 12px 15px;
          }
          
          .faq-answer {
            padding: 0 15px;
          }
          
          .faq-answer.active {
            padding: 12px 15px;
          }
        }
      `}</style>

      <section className="faq-container">
        <h2>Frequently Asked Questions</h2>
        <p className="subtitle">Here are some common questions our travelers ask.</p>

        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              <span>{item.question}</span>
              <i className={`fa-solid fa-chevron-down ${activeIndex === index ? 'rotate' : ''}`}></i>
            </button>
            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}

        {/* Got more questions section */}
        <div className="more-questions">
          <h3>Got any other questions?</h3>
          <p>If you can't find your answer here, feel free to reach out to us directly.</p>
          <a href="/contact" className="contact-btn">Contact Us</a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;