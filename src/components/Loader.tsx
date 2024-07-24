import lodingAnim from "../assets/netflix_spinner.gif";
const Loader = () => {
  return (
    <div className="w-full  h-screen flex justify-center items-center">
      <img src={lodingAnim} />
    </div>
  );
};

export default Loader;
