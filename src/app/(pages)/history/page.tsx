import { carHistories } from "@/shared/contents/carHistories/carHistories";

export default function Histories() {
  return (
    <>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-gray-950 dark:text-gray-50 text-center mb-12 drop-shadow-md">
            The Legacy of Iconic Cars
          </h1>

          <div className="grid md:grid-cols-3 gap-8">
            {carHistories.map((car, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-3 hover:translate-y-2"
              >
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-50 mb-4">
                    {car.company}
                  </h2>
                  <p className="text-lg text-gray-700  dark:text-gray-50 mb-6">{car.fact}</p>
                  <div className="relative mt-6">
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
