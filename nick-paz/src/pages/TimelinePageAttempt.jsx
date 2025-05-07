import React from "react";
import timelineElements from "../assets/timelineElements"
import schoolIcon from "../assets/school.svg"
import workIcon from "../assets/work.svg"

export default function TimelinePageAttempt({ defaultColor }) {
    return(
      <div className="flex flex-col justify-center items-center bg-gray-900 text-white text-base pb-8 sm:text-lg">
        <div className="mt-[5%]">
        {timelineElements.map((element) => {
            const colors = [
              "bg-red-500",
              "bg-blue-500",
              "bg-yellow-500",
              "bg-purple-500",
              "bg-orange-500",
            ];
            const color = defaultColor ||`bg-${element.color}-500`

            return (
              <div key={element.id} className="flex m-4 relative">
                <div
                  className={`${color} w-0.5 h-6 translate-x-20 translate-y-56 opacity-60 sm:hidden`}
                ></div>
                <div
                  className={`${color} w-0.5 h-6 translate-x-80 translate-y-56 opacity-60 sm:hidden`}
                ></div>
                <div className="hidden items-start w-44 pt-0.5 relative sm:flex">
                  <div className="w-4/5"></div>
                  <div
                    className={`${color} w-px h-full translate-x-5 translate-y-10 opacity-30`}
                  ></div>
                  <img
                    src={element.icon === "school" ? schoolIcon : workIcon}
                    alt="icon"
                    className={`${color} w-10 p-1 rounded-lg z-20`}
                  />
                  <div
                    className={`${color} h-px w-8 translate-y-5 opacity-30`}
                  ></div>
                </div>
                <div className="border border-gray-600 rounded-lg px-8 py-4 bg-gray-800 w-full text-center z-10 sm:w-96">
                  <div className="text-xl font-medium">{element.title}</div>
                  <div className="text-gray-300 mb-6 sm:mb-8 sm:text-xs">
                    {element.date}
                    <span className="sm:hidden"></span>
                  </div>
                  <div className="mb-4 text-left">{element.description}</div>
                  <img
                    src={element.icon === "school" ? schoolIcon : workIcon}
                    alt="icon"
                    className={`${color} w-8 p-1 rounded-lg z-20 absolute left-4 top-4 sm:hidden`}
                  />
                </div>
              </div>
            );
        })}
        </div>

      </div>  
    );
}