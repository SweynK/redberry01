import {
  Box,
  Button,
  Checkbox,
  Popover,
  SimpleGrid,
  Text,
  NumberInput,
  Modal,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import FilteredItem from "./FilteredItem"; // Import the new component

// import downArror from "../assets/arrows/down-arrow.png";

import { Link } from "react-router-dom";

const API_URL =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
const TOKEN = "9d069399-3db0-42ac-a2fd-28aa276e5c95";

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
  const [filteredData, setFilteredData] = useState([]); // State for filtered data

  const [regions, setRegions] = useState([]);

  // Modal state and form handling
  const [opened, { open, close }] = useDisclosure(false);

  //   const form = useForm({
  //     initialValues: {
  //       name: "",
  //       surname: "",
  //       email: "",
  //       avatar: null,
  //       phone: "",
  //     },
  //     validate: {
  //       name: (value) =>
  //         value.length < 2
  //           ? "Name is required and must be at least 2 characters long"
  //           : null,
  //       surname: (value) =>
  //         value.length < 2
  //           ? "Surname is required and must be at least 2 characters long"
  //           : null,
  //       email: (value) =>
  //         !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  //           ? "Invalid email format"
  //           : null,
  //       avatar: (value) => (value === null ? "Avatar is required" : null),
  //       phoneNumber: (value) =>
  //         !/^5\d{8}$/.test(value)
  //           ? "Phone number must be numeric and in format 5XXXXXXXX"
  //           : null,
  //     },
  //   });

  //   const handleSubmit = (values) => {
  //     // Implement your submission logic here
  //     console.log(values);
  //   };

  // Fetch regions
  useEffect(() => {
    const fetchRegions = async () => {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      const data = await response.json();

      setRegions(data);
    };

    fetchRegions();
  }, []);

  //fetch estate data
  useEffect(() => {
    const fetchRealEstateData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = await response.json();
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching real estate data:", error);
      }
    };

    fetchRealEstateData();
  }, []);

  // Handle region selection
  const handleCheckboxChange = (regionId) => {
    setSelectedRegions((prev) =>
      prev.includes(regionId)
        ? prev.filter((id) => id !== regionId)
        : [...prev, regionId]
    );
  };

  // Filter function to be applied in each popover's button
  const ApplyFilter = () => {
    const filtered = filteredData.filter((item) => {
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
      <Box className="flex justify-between">
        <Box className="flex gap-[8px] justify-between rounded-[10px] border w-[785px]">
          {/* Filter for Region */}
          <Popover
            opened={openedRegion}
            onChange={setOpenedRegion}
            position="bottom-start"
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
            <Popover.Dropdown className="flex flex-col h-auto p-6 ovwerflow-auto ">
              <Box w={730} className="flex-1 ">
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
                  ApplyFilter();
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
            position="bottom-start"
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
              <Box w={334} p={24}>
                <Text c="#021526">ფასის მიხედვით</Text>
                <Box className="flex gap-[15px] py-6">
                  <NumberInput
                    value={minPrice}
                    placeholder="დან"
                    hideControls={true}
                    onChange={(value) => setMinPrice(value)}
                  />
                  <NumberInput
                    value={maxPrice}
                    placeholder="დან"
                    hideControls={true}
                    onChange={(value) => setMaxPrice(value)}
                  />
                </Box>
                <Button
                  onClick={() => {
                    ApplyFilter();
                    setOpenedPrice(false);
                  }}
                  className="self-left"
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
            position="bottom-start"
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
              <Box w={334} p={24}>
                <Text c="#021526">ფართობის მიხედვით</Text>
                <Box className="flex gap-[15px] py-6">
                  <NumberInput
                    value={minArea}
                    hideControls={true}
                    onChange={(value) => setMinArea(value)}
                  />
                  <NumberInput
                    value={maxArea}
                    hideControls={true}
                    onChange={(value) => setMaxArea(value)}
                  />
                </Box>
                <Button
                  onClick={() => {
                    ApplyFilter();
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
            position="bottom-start"
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
              <Box w={300} p={24} className="gap-6 flex flex-col">
                <Text c="#021526">საძინებლების რაოდენობა</Text>
                <NumberInput
                  value={bedrooms}
                  hideControls={true}
                  onChange={(value) => setBedrooms(Number(value))}
                  className="w-[41px]"
                />
                <Button
                  onClick={() => {
                    ApplyFilter();
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
        <Box className="flex gap-4">
          <Link to="/add-listing">
            <Button variant="filled" radius={10} color="#F93B1D">
              + ლისტრინგის დამატება
            </Button>
          </Link>
          <Box>
            <Modal
              opened={opened}
              onClose={close}
              withCloseButton={false}
              size="lg"
            >
              {/* <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(form.values);
                }}
              >
                <TextInput
                  label="სახელი"
                  {...form.getInputProps("name")}
                  required
                />
                <TextInput
                  label="გვარი"
                  {...form.getInputProps("surname")}
                  required
                />
                <TextInput
                  label="ელ-ფოსტა"
                  {...form.getInputProps("email")}
                  required
                />
                <FileInput
                  label="ავატარი"
                  {...form.getInputProps("avatar")}
                  required
                />
                <TextInput
                  label="ტელ-ნომერი"
                  {...form.getInputProps("phoneNumber")}
                  required
                />
                <Box className="flex justify-end gap-[15px] pt-[20px]">
                  <Link to="/">
                    <Text className="text-[16px] text-[#F93B1D] font-[500] border inline-block mb-[100px] border-[#F93B1D] rounded-[10px] py-[5px] px-[16px]">
                      გაუქმება
                    </Text>
                  </Link>
                  <Button
                    type="submit"
                    color="#F93B1D"
                    radius="10px"
                    className="text-[16px]"
                  >
                    დაამატე აგენტი
                  </Button>
                </Box>
              </form> */}
            </Modal>

            <Button
              variant="outline"
              color="#F93B1D"
              radius={10}
              onClick={open}
            >
              აგენტის დამატება
            </Button>
          </Box>
        </Box>
        {/* Display the filtered results */}
      </Box>
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
