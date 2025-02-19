import React from "react";
import SectionTitle from "../../component/SectionTitle/SectionTitle";

const UserTestimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "This platform completely changed how I consume news. The premium articles are worth every penny!",
      image: "https://i.ibb.co.com/RC6H27c/download.jpg",
    },
    {
      name: "Jane Smith",
      feedback:
        "A seamless reading experience with all the top stories in one place. Highly recommended!",
      image: "https://i.ibb.co.com/NYKG04f/download.jpg",
    },
    {
      name: "Michael Lee",
      feedback:
        "Love the clean design and premium content. It's my go-to site for daily news updates!",
      image: "https://i.ibb.co.com/RvYw87B/images.jpg",
    },
  ];

  return (
    <section className="">
      <div className="p-6">
        <SectionTitle
          heading="What Our Readers Say"
          subHeading="Hear from our valued readers about their experience"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 border-blue-500 transform rounded-lg p-6 border text-center shadow-md hover:shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border border-gray-300"
              />
              <h3 className="text-lg font-semibold">{testimonial.name}</h3>
              <p className="dark:text-gray-700 italic mt-2">
                "{testimonial.feedback}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserTestimonials;
