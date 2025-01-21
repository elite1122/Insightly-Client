
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-6/12 my-8">
            
            <h3 className="text-3xl uppercase border-y-4 py-4 font-bold">{heading}</h3>
            <p className="text-green-600 mt-2">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;