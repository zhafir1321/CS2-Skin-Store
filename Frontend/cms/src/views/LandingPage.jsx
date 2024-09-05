import video from '../assets/csgo.mp4';

export default function LandingPage() {
  return (
    <>
      <div className="w-full h-screen">
        <video
          src={video}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="text-white justify-items-center align-baseline grid grid-rows-4">
            <h1 className="text-3xl font-extrabold items-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              CS2 Skin Store
            </h1>
            <p className="font-semibold text-xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
              Tempat Beli Skin CS2 Terpercaya
            </p>
            <div className="flex">
              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none transition delay-150 hover:bg-black hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Register Now
              </button>
              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none transition delay-150 hover:bg-black hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
