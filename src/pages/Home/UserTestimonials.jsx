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
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Newspaper-style section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-1 border-t-2 border-gray-900"></div>
            <h2 className="newspaper-headline text-3xl md:text-4xl mx-6 text-gray-900">
              READER TESTIMONIALS
            </h2>
            <div className="flex-1 border-t-2 border-gray-900"></div>
          </div>
          <p className="newspaper-meta text-gray-600 uppercase tracking-widest mb-4">
            What Our Community Says
          </p>
          <div className="newspaper-body text-gray-700 max-w-3xl mx-auto">
            <p>Join thousands of satisfied readers who trust Insightly for their daily news consumption. 
            Here's what they have to say about their experience.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="newspaper-card bg-white border border-gray-300 p-8 group hover:bg-gray-50 transition-colors duration-300"
            >
              {/* Quote Mark */}
              <div className="text-6xl text-gray-300 font-serif leading-none mb-4">"</div>
              
              {/* Testimonial Content */}
              <div className="newspaper-body text-gray-800 leading-relaxed mb-6 italic">
                <p>{testimonial.feedback}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-500 text-lg">★</span>
                ))}
                <span className="ml-2 newspaper-meta text-gray-500 text-sm">
                  {testimonial.rating}/5 stars
                </span>
              </div>

              {/* Reader Info */}
              <div className="flex items-center space-x-4 pt-6 border-t border-gray-200">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                />
                <div className="flex-1">
                  <h4 className="newspaper-subheadline text-lg text-gray-900">
                    {testimonial.name}
                  </h4>
                  <div className="newspaper-meta text-gray-600 text-sm uppercase tracking-wider">
                    {testimonial.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="newspaper-meta text-gray-500 text-xs uppercase tracking-widest">
                    Subscriber
                  </div>
                  <div className="text-sm text-gray-700 font-semibold">
                    {testimonial.subscriptionLength}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Reader Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="newspaper-headline text-3xl text-gray-900 mb-2">98%</div>
              <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">
                Reader Satisfaction
              </div>
            </div>
            <div>
              <div className="newspaper-headline text-3xl text-gray-900 mb-2">4.9</div>
              <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">
                Average Rating
              </div>
            </div>
            <div>
              <div className="newspaper-headline text-3xl text-gray-900 mb-2">50K+</div>
              <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">
                Active Readers
              </div>
            </div>
            <div>
              <div className="newspaper-headline text-3xl text-gray-900 mb-2">24/7</div>
              <div className="newspaper-meta text-gray-600 text-xs uppercase tracking-widest">
                News Coverage
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="newspaper-body text-gray-600 mb-6">
            <p>Join our community of informed readers today</p>
          </div>
          <button className="newspaper-border bg-gray-900 text-white px-8 py-4 hover:bg-gray-800 transition-colors duration-300 uppercase tracking-wide font-semibold">
            Start Your Subscription
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
