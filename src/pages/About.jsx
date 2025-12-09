import React, { useState } from "react";
import { accordianData } from "./utils/accordian";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const About = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="w-full px-3 sm:px-4 py-4 sm:py-6">
      {/* ---- TOP HEADING SECTION ---- */}
      <div className="max-w-xl mx-auto mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">About</h1>
          <p className="text-xs sm:text-sm text-gray-500 -mt-1">
            Learn more about the features of Focus Zone
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
          <Lightbulb size={16} className="sm:w-[18px] sm:h-[18px] text-teal-500" />
          <span>Click an item to expand & read more</span>
        </div>
      </div>

      {/* ---- ACCORDION SECTION ---- */}
      <div className="max-w-xl mx-auto space-y-2 sm:space-y-3">
        {accordianData.map((data) => {
          const isOpen = data.id === openItem;

          return (
            <div
              key={data.id}
              onClick={() => setOpenItem(isOpen ? null : data.id)}
              className="
                bg-white border rounded-lg shadow-sm 
                transition-all duration-200 cursor-pointer
                border-teal-100 hover:border-teal-300 
                hover:shadow-md
              "
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3">
                <h2 className="text-gray-800 font-medium text-xs sm:text-sm pr-2">
                  {data.heading}
                </h2>

                {isOpen ? (
                  <ChevronUp size={16} className="sm:w-[18px] sm:h-[18px] text-teal-500 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="sm:w-[18px] sm:h-[18px] text-gray-500 shrink-0" />
                )}
              </div>

              {/* CONTENT */}
              {isOpen && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm text-gray-600 space-y-2 sm:space-y-3">
                  <p>{data.text}</p>

                  {data.links && (
                    <div className="flex flex-col gap-1">
                      {data.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            text-teal-600 hover:text-teal-800 
                            underline underline-offset-2 wrap-break-word
                           "
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;