import { Link } from "react-router-dom";

const SubjectsPastPaperCard = ({ title, path }) => {
  return (
    <>
      <style>
        {`
          .custom-bullet li::marker {
            color: #750e6e; 
          }
        `}
      </style>

      <div
        className="group relative border border-green-800 rounded-xl bg-gradient-to-br from-green-100/40 to-green-200/20 
        backdrop-blur-md transition-transform duration-300 ease-in-out
        text-green-900 px-8 py-12 flex flex-col items-center justify-center text-center gap-4
        shadow-md hover:shadow-2xl hover:scale-[1.10] active:scale-[1.10] hover:backdrop-blur-lg hover:bg-opacity-50"
      >
        <ul className="list-disc list-inside text-base md:text-lg font-bold group-hover:opacity-90 custom-bullet">
           <li className="flex items-center gap-1 list-none">
            <span className="text-green-900 text-lg">•</span>
            <Link
              to={path}
              className="relative text-green-900 cursor-pointer inline-block
                before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px] before:bg-green-900
                before:transition-[width] before:duration-300 hover:before:w-full
                transition-transform duration-300 ease-in-out
                 group-active:scale-[1.10] text-xl md:text-2xl lg:text-2xl font-bold  group-hover:scale-[1.10] "
            >
              {title}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SubjectsPastPaperCard;



