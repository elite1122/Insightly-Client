import React from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const UserTestimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      title: "Business Executive",
      location: "New York, NY",
      feedback:
        "Insightly has become my daily companion for staying informed. The investigative pieces are exceptionally well-researched, and the premium content provides insights I can't find anywhere else. It's completely transformed how I approach industry news.",
      image: "https://i.ibb.co.com/RC6H27c/download.jpg",
      rating: 5,
      subscriptionLength: "2 years"
    },
    {
      name: "Jane Smith",
      title: "College Professor",
      location: "Boston, MA",
      feedback:
        "As an educator, I need reliable, fact-checked news sources. Insightly delivers exactly that with their rigorous editorial standards. My students appreciate the diverse perspectives and in-depth coverage of global affairs.",
      image: "https://i.ibb.co.com/NYKG04f/download.jpg",
      rating: 5,
      subscriptionLength: "18 months"
    },
    {
      name: "Michael Lee",
      title: "Tech Entrepreneur",
      location: "San Francisco, CA",
      feedback:
        "The technology coverage is outstanding. The journalists clearly understand the industry and explain complex topics in an accessible way. The clean, distraction-free reading experience is perfect for busy professionals.",
      image: "https://i.ibb.co.com/RvYw87B/images.jpg",
      rating: 5,
      subscriptionLength: "3 years"
    },
    {
      name: "Sarah Williams",
      title: "Healthcare Worker",
      location: "Chicago, IL",
      feedback:
        "During the pandemic, Insightly was my trusted source for medical news updates. The scientific accuracy and responsible reporting helped me stay informed professionally and personally.",
      image: "https://i.ibb.co.com/RC6H27c/download.jpg",
      rating: 5,
      subscriptionLength: "1 year"
    }
  ];

  return (
    <section className="bg-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Newspaper-style section header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="flex-1 border-t-2 border-gray-900 max-w-8 sm:max-w-16 lg:max-w-32"></div>
            <h2 className="newspaper-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl mx-3 sm:mx-4 lg:mx-6 text-gray-900">
              READER TESTIMONIALS
            </h2>
            <div className="flex-1 border-t-2 border-gray-900 max-w-8 sm:max-w-16 lg:max-w-32"></div>
          </div>
          <p className="newspaper-meta text-gray-600 uppercase tracking-widest mb-3 sm:mb-4 text-xs sm:text-sm">
            What Our Community Says
          </p>
          <div className="newspaper-body text-gray-700 max-w-3xl mx-auto">
            <p className="text-sm sm:text-base lg:text-lg">Join thousands of satisfied readers who trust Insightly for their daily news consumption. 
            Here's what they have to say about their experience.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="newspaper-card bg-white border-2 sm:border-4 border-gray-300 p-4 sm:p-6 lg:p-8 group hover:bg-gray-50 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              {/* Quote Mark */}
              <div className="text-3xl sm:text-4xl lg:text-6xl text-gray-300 font-serif leading-none mb-3 sm:mb-4">"</div>
              
              {/* Testimonial Content */}
              <div className="newspaper-body text-gray-800 leading-relaxed mb-4 sm:mb-6 italic">
                <p className="text-sm sm:text-base lg:text-lg">{testimonial.feedback}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-base sm:text-lg lg:text-xl">★</span>
                  ))}
                </div>
                <span className="ml-2 newspaper-meta text-gray-500 text-xs sm:text-sm">
                  {testimonial.rating}/5 STARS
                </span>
              </div>

              {/* Reader Info */}
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4 sm:pt-6 border-t-2 border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full object-cover border-2 sm:border-4 border-gray-300 mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="newspaper-subheadline text-base sm:text-lg lg:text-xl text-gray-900 font-black uppercase tracking-wider">
                    {testimonial.name}
                  </h4>
                  <div className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-wider font-semibold">
                    {testimonial.title}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">
                    📍 {testimonial.location}
                  </div>
                </div>
                <div className="text-center sm:text-right bg-gray-50 border-2 border-gray-300 p-2 sm:p-3">
                  <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest font-black">
                    SUBSCRIBER
                  </div>
                  <div className="text-xs sm:text-sm text-gray-700 font-bold">
                    {testimonial.subscriptionLength}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Stats */}
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 lg:pt-12 border-t-2 sm:border-t-4 border-gray-200">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            <div className="bg-white border-2 sm:border-4 border-gray-900 p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1 sm:mb-2">98%</div>
              <div className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-black">
                Reader Satisfaction
              </div>
            </div>
            <div className="bg-white border-2 sm:border-4 border-gray-900 p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1 sm:mb-2">4.9</div>
              <div className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-black">
                Average Rating
              </div>
            </div>
            <div className="bg-white border-2 sm:border-4 border-gray-900 p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1 sm:mb-2">50K+</div>
              <div className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-black">
                Active Readers
              </div>
            </div>
            <div className="bg-white border-2 sm:border-4 border-gray-900 p-3 sm:p-4 lg:p-6 shadow-lg">
              <div className="newspaper-headline text-xl sm:text-2xl lg:text-3xl text-gray-900 mb-1 sm:mb-2">24/7</div>
              <div className="newspaper-meta text-gray-600 text-xs sm:text-sm uppercase tracking-widest font-black">
                News Coverage
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-10 lg:mt-12">
          <div className="newspaper-body text-gray-600 mb-4 sm:mb-6">
            <p className="text-sm sm:text-base lg:text-lg">Join our community of informed readers today</p>
          </div>
          <button className="newspaper-border bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 hover:bg-gray-800 transition-all duration-300 uppercase tracking-wide font-black text-xs sm:text-sm lg:text-base hover:scale-105 shadow-lg">
            🚀 Start Your Subscription
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
