import { useState } from "react";
import { Link } from "react-router-dom";

const PastPaperYearCard = ({ data }) => {
  const [hoveredYear, setHoveredYear] = useState(null);

  return (
    <div className="py-3 flex justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6 w-full px-1">
        {data.map((yearData) => {
          const { year, months = [], links } = yearData;
          const isHovered = hoveredYear === year;
          const hasMonths = months.length > 0;

          return (
            <div
              key={year}
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
              className={`group relative border border-green-800 rounded-xl bg-gradient-to-br from-green-100/40 to-green-200/20 
              backdrop-blur-md transition-all duration-300 ease-in-out
              text-green-900 flex flex-col items-center justify-center text-center
              shadow-md hover:shadow-2xl hover:scale-110 hover:backdrop-blur-lg hover:bg-opacity-50
              overflow-hidden h-[180px]`}
            >
              {/* Year Title */}
              <h3
                className={`text-2xl md:text-3xl font-bold transition-all duration-300
                ${
                  isHovered && hasMonths
                    ? "translate-y-[-50px] scale-50 opacity-90"
                    : "translate-y-0 scale-100"
                }`}
              >
                {year}
              </h3>

              {/* Months List */}
              <div
                className={`absolute top-[60px] flex flex-col items-center transition-all duration-300 ease-in-out
                ${
                  isHovered && hasMonths
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                {months.map((month) => {
                  const monthLink = links
                    ? `${links}`
                    : "#";

                  return (
                    <Link
                      key={month}
                      to={monthLink}
                      className="text-green-700 hover:text-green-900 text-base font-medium cursor-pointer transition"
                    >
                      {month}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PastPaperYearCard;
