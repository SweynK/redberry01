import { useForm } from "react-hook-form";
export default function FilterForm() {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit = (data) => {
    console.log("Filtered Data:", data);
    // Perform filtering logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-white rounded shadow-md space-y-4 w-full"
    >
      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ფასი (რეინჯი)
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="მინ."
            className="w-1/2 p-2 border rounded"
            {...register("minPrice", {
              validate: (value) =>
                !value ||
                !parseFloat(value) ||
                parseFloat(value) <= parseFloat(errors.maxPrice?.ref?.value) ||
                "მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი",
            })}
          />
          <input
            type="number"
            placeholder="მაქს."
            className="w-1/2 p-2 border rounded"
            {...register("maxPrice", {
              validate: (value) =>
                !value ||
                !parseFloat(value) ||
                parseFloat(value) >= parseFloat(errors.minPrice?.ref?.value) ||
                "მაქსიმალური მნიშვნელობა არ უნდა იყოს მინიმალურზე ნაკლები",
            })}
          />
        </div>
        {errors.minPrice && (
          <p className="text-red-500 text-xs">{errors.minPrice.message}</p>
        )}
        {errors.maxPrice && (
          <p className="text-red-500 text-xs">{errors.maxPrice.message}</p>
        )}
      </div>

      {/* Area Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ფართობი (რეინჯი)
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="მინ."
            className="w-1/2 p-2 border rounded"
            {...register("minArea", {
              validate: (value) =>
                !value ||
                !parseFloat(value) ||
                parseFloat(value) <= parseFloat(errors.maxArea?.ref?.value) ||
                "მინიმალური მნიშვნელობა არ უნდა იყოს მაქსიმალურზე მეტი",
            })}
          />
          <input
            type="number"
            placeholder="მაქს."
            className="w-1/2 p-2 border rounded"
            {...register("maxArea", {
              validate: (value) =>
                !value ||
                !parseFloat(value) ||
                parseFloat(value) >= parseFloat(errors.minArea?.ref?.value) ||
                "მაქსიმალური მნიშვნელობა არ უნდა იყოს მინიმალურზე ნაკლები",
            })}
          />
        </div>
        {errors.minArea && (
          <p className="text-red-500 text-xs">{errors.minArea.message}</p>
        )}
        {errors.maxArea && (
          <p className="text-red-500 text-xs">{errors.maxArea.message}</p>
        )}
      </div>

      {/* Region Select Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          რეგიონი
        </label>
        <select
          className="w-full p-2 border rounded"
          {...register("region", { required: "გთხოვთ აირჩიეთ რეგიონი" })}
        >
          <option value="">აირჩიეთ რეგიონი</option>
          <option value="tbilisi">თბილისი</option>
          <option value="batumi">ბათუმი</option>
          <option value="kutaisi">ქუთაისი</option>
          {/* Add more regions as needed */}
        </select>
        {errors.region && (
          <p className="text-red-500 text-xs">{errors.region.message}</p>
        )}
      </div>

      {/* Bedrooms Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          საძინებლების რაოდენობა
        </label>
        <input
          type="number"
          placeholder="რაოდენობა"
          className="w-full p-2 border rounded"
          {...register("bedrooms", { min: 0, max: 10 })}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ფილტრი
      </button>
    </form>
  );
}
