import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1596px] mx-auto pt-[77px]">
      <h1>Something went wrong 😢</h1>
      <p>This URL doesnt exists</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
}

export default NotFound;
