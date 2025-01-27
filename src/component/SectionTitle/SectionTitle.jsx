
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center md:w-7/12 my-8">
            
            <h3 className="text-3xl uppercase border-b-4 pb-4 font-bold">{heading}</h3>
            <p className="text-yellow-200 mt-2 text-md font-semibold">{subHeading}</p>
        </div>
    );
};

export default SectionTitle;