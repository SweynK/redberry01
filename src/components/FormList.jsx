import {
  Box,
  Button,
  Checkbox,
  Popover,
  SimpleGrid,
  Text,
  NumberInput,
  Select,
} from "@mantine/core";
import regions from "../constants/regions";
import { useState } from "react";
import FilteredItem from "./FilteredItem"; // Import the new component

import apiData from "../apiData/api";
import { Link } from "react-router-dom";

function FormList() {
  const [openedRegion, setOpenedRegion] = useState(false);
  const [openedArea, setOpenedArea] = useState(false);
  const [openedPrice, setOpenedPrice] = useState(false);
  const [openedBedrooms, setOpenedBedrooms] = useState(false);

  const [selectedRegions, setSelectedRegions] = useState([]); // State for selected region IDs
  const [minArea, setMinArea] = useState(null); // Minimum area
  const [maxArea, setMaxArea] = useState(null); // Maximum area
  const [minPrice, setMinPrice] = useState(null); // Minimum price
  const [maxPrice, setMaxPrice] = useState(null); // Maximum price
  const [bedrooms, setBedrooms] = useState(null); // Number of bedrooms
  const [filteredData, setFilteredData] = useState(apiData); // State for filtered data

  // Handle region selection
  const handleCheckboxChange = (regionId) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  // Filter function to be applied in each popover's button
  const applyFilter = () => {
    const filtered = apiData.filter((item) => {
      // Filter by region
      const regionFilter =
        selectedRegions.length === 0 ||
        selectedRegions.includes(item.city.region_id);

      // Filter by area
      const areaFilter =
        (!minArea || item.area >= minArea) &&
        (!maxArea || item.area <= maxArea);

      // Filter by price
      const priceFilter =
        (!minPrice || item.price >= minPrice) &&
        (!maxPrice || item.price <= maxPrice);

      // Filter by number of bedrooms
      const bedroomFilter = !bedrooms || item.bedrooms === bedrooms;

      return regionFilter && areaFilter && priceFilter && bedroomFilter;
    });

    setFilteredData(filtered);
  };

  return (
    <Box className="flex w-[1596px]  flex-col justify-start gap-[24px] rounded-[10px]">
      <div className="flex justify-between">
        <Box className="flex gap-[8px] rounded-[10px] border w-[785px]">
          {/* Filter for Region */}
          <Popover
            opened={openedRegion}
            onChange={setOpenedRegion}
            position="bottom-right"
          >
            <Popover.Target>
              <Button
                variant="subtle"
                color="white"
                radius={6}
                onClick={() => setOpenedRegion(true)}
              >
                <Text fw={600} size="16px" c="black">
                  რეგიონი
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown className="flex flex-col h-auto p-6">
              <Box w={730} className="flex-1">
                <SimpleGrid cols={3} verticalSpacing={16}>
                  {regions.map((region) => (
                    <Box
                      key={region.id}
                      className="flex w-40 items-center gap-[8px]"
                    >
                      <Checkbox
                        color="#45A849"
                        checked={selectedRegions.includes(region.id)}
                        onChange={() => handleCheckboxChange(region.id)}
                      />
                      <Text>{region.name}</Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>
              <Button
                onClick={() => {
                  applyFilter();
                  setOpenedRegion(false);
                }}
                className="self-end mt-4" // Position the button at the end of the flex container
                color="#F93B1D"
                radius={8}
              >
                არჩევა
              </Button>
            </Popover.Dropdown>
          </Popover>

          {/* Filter for Price */}
          <Popover
            opened={openedPrice}
            onChange={setOpenedPrice}
            position="bottom-right"
          >
            <Popover.Target>
              <Button
                variant="subtle"
                color="white"
                radius={6}
                onClick={() => setOpenedPrice(true)}
              >
                <Text fw={600} size="16px" c="black">
                  საფასო კატეგორია
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Box w={300} p={24}>
                <NumberInput
                  label="Min Price"
                  value={minPrice}
                  onChange={(value) => setMinPrice(value)}
                />
                <NumberInput
                  label="Max Price"
                  value={maxPrice}
                  onChange={(value) => setMaxPrice(value)}
                />
                <Button
                  onClick={() => {
                    applyFilter();
                    setOpenedPrice(false);
                  }}
                  className="self-end"
                  color="#F93B1D"
                  radius={8}
                >
                  არჩევა
                </Button>
              </Box>
            </Popover.Dropdown>
          </Popover>
          {/* Filter for Area */}
          <Popover
            opened={openedArea}
            onChange={setOpenedArea}
            position="bottom-right"
          >
            <Popover.Target>
              <Button
                variant="subtle"
                color="white"
                radius={6}
                onClick={() => setOpenedArea(true)}
              >
                <Text fw={600} size="16px" c="black">
                  ფართობი
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Box w={300} p={24}>
                <NumberInput
                  label="Min Area"
                  value={minArea}
                  onChange={(value) => setMinArea(value)}
                />
                <NumberInput
                  label="Max Area"
                  value={maxArea}
                  onChange={(value) => setMaxArea(value)}
                />
                <Button
                  onClick={() => {
                    applyFilter();
                    setOpenedArea(false);
                  }}
                  className="self-end"
                  color="#F93B1D"
                  radius={8}
                >
                  არჩევა
                </Button>
              </Box>
            </Popover.Dropdown>
          </Popover>

          {/* Filter for Bedrooms */}
          <Popover
            opened={openedBedrooms}
            onChange={setOpenedBedrooms}
            position="bottom-right"
          >
            <Popover.Target>
              <Button
                variant="subtle"
                color="white"
                radius={6}
                onClick={() => setOpenedBedrooms(true)}
              >
                <Text fw={600} size="16px" c="black">
                  საძინებლების რაოდენობა
                </Text>
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <Box w={300} p={24}>
                <Select
                  label="Number of Bedrooms"
                  placeholder="Select number of bedrooms"
                  value={bedrooms}
                  onChange={(value) => setBedrooms(Number(value))}
                  data={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5+" },
                  ]}
                />
                <Button
                  onClick={() => {
                    applyFilter();
                    setOpenedBedrooms(false);
                  }}
                  className="self-end"
                  color="#F93B1D"
                  radius={8}
                >
                  არჩევა
                </Button>
              </Box>
            </Popover.Dropdown>
          </Popover>
        </Box>
        <div>
          <Link to="/ful" className="bg-slate-500 mr-2">
            + ლისტრინგის დამატება
          </Link>
          <Link to="/" className="bg-lime-700">
            + აგენტის დამატება
          </Link>
        </div>
        {/* Display the filtered results */}
      </div>
      <Box className="mt-[24px] flex gap-[16px] flex-wrap">
        {filteredData.length > 0 ? (
          filteredData.map((item) => <FilteredItem key={item.id} item={item} />)
        ) : (
          <Text>No items found for selected filters.</Text>
        )}
      </Box>
    </Box>
  );
}

export default FormList;
