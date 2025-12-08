import React, { useState } from "react";
import { accordianData } from "./utils/accordian";
import { ChevronDown, ChevronUp, Lightbulb } from "lucide-react";

const About = () => {
  const [openItem, setOpenItem] = useState(null);

  return (
    <div className="w-full px-4 py-6">
      {/* ---- TOP HEADING SECTION ---- */}
      <div className="max-w-xl mx-auto mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">About</h1>
          <p className="text-sm text-gray-500 -mt-1">
            Learn more about the features of Focus Zone
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Lightbulb size={18} className="text-teal-500" />
          <span>Click an item to expand & read more</span>
        </div>
      </div>

      {/* ---- ACCORDION SECTION ---- */}
      <div className="max-w-xl mx-auto space-y-3">
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
              <div className="flex items-center justify-between px-4 py-3">
                <h2 className="text-gray-800 font-medium text-sm">
                  {data.heading}
                </h2>

                {isOpen ? (
                  <ChevronUp size={18} className="text-teal-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>

              {/* CONTENT */}
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-600 space-y-3">
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
                            underline underline-offset-2
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
