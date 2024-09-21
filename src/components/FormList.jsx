import {
  Box,
  Button,
  Checkbox,
  Popover,
  SimpleGrid,
  Text,
  NumberInput,
  Modal,
  TextInput,
  FileInput,
  Loader,
  Image,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import FilteredItem from "./FilteredItem"; // Import the new component

import checkIcon from "../assets/check.svg";

import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";

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

  const [unfilteredData, setUnfilteredData] = useState([]); // State for unfiltered data

  const [loading, setLoading] = useState(true); // Loading state

  const [regions, setRegions] = useState([]);

  // Modal state and form handling
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      avatar: null,
      phone: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" : null,
      surname: (value) =>
        value.length < 2 ? "გვარი უნდა იყოს მინიმუმ 2 სიმბოლო" : null,
      email: (value) =>
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "უნდა მთავრდებოდეს @redberry.ge-თ"
          : null,
      avatar: (value) => (value === null ? "გთხოვთ ატვირთოთ სურათი" : null),
      phone: (value) =>
        !/^5\d{8}$/.test(value) ? "უნდა იყოს ფორმატის 5XXXXXXXX" : null,
    },
  });
  const handleSubmit = async (values) => {
    try {
      // Validate the form
      const validation = form.validate();
      if (validation.hasErrors) {
        console.log("Form validation failed:", validation.errors);
        return;
      }

      // Prepare form data for submission
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("avatar", values.avatar);
      formData.append("phone", values.phone);

      console.log("Phone Number: ", values.phone);
      const response = await axios.post(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        formData,
        {
          headers: {
            Authorization: "Bearer 9d069399-3db0-42ac-a2fd-28aa276e5c95",
          },
        }
      );

      console.log("Response: ", response);
      // Close the modal upon successful submission
      close();
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error:", error);
    }
  };

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
      setLoading(true); // Set loading to true before starting fetch
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        const data = await response.json();
        setUnfilteredData(data);
        setFilteredData(data);
      } catch (error) {
        console.error("Error fetching real estate data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
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
    const filtered = unfilteredData.filter((item) => {
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
    <Box className="flex w-[1596px] mx-auto flex-col gap-[24px] rounded-[10px]">
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
                    rightSection={<Text size="sm">₾</Text>}
                  />
                  <NumberInput
                    value={maxPrice}
                    placeholder="დან"
                    hideControls={true}
                    onChange={(value) => setMaxPrice(value)}
                    rightSection={<Text size="sm">₾</Text>}
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
                    rightSection={<Text size="sm">მ²</Text>}
                  />
                  <NumberInput
                    value={maxArea}
                    hideControls={true}
                    onChange={(value) => setMaxArea(value)}
                    rightSection={<Text size="sm">მ²</Text>}
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
              c={"#021526"}
              size="1000px"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(form.values);
                }}
              >
                <Text size="32px" fw={500} ta="center" pt={87} pb={61}>
                  აგენტის დამატება
                </Text>
                <Box className="flex flex-col  items-center">
                  <SimpleGrid cols={2} w={800}>
                    <Box>
                      <TextInput
                        label="სახელი"
                        labelProps={{
                          className: "pb-[5px]",
                        }}
                        {...form.getInputProps("name")}
                        // error={form.errors.name}
                      />
                      {!form.errors.name && (
                        <Text
                          className="flex gap-1 pt-1"
                          size="12px"
                          c="#021526"
                        >
                          <Image w={10} h={10} src={checkIcon} />
                          მინიმუმ ორი სიმბოლო
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <TextInput
                        label="გვარი"
                        labelProps={{
                          className: "pb-[5px]",
                        }}
                        {...form.getInputProps("surname")}
                        // error={form.errors.surname}
                      />
                      {!form.errors.surname && (
                        <Text
                          className="flex gap-1 pt-1"
                          size="12px"
                          c="#021526"
                        >
                          <Image w={10} h={10} src={checkIcon} />
                          მინიმუმ ორი სიმბოლო
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <TextInput
                        label="ელ-ფოსტა"
                        labelProps={{
                          className: "pb-[5px]",
                        }}
                        {...form.getInputProps("email")}
                        // error={form.errors.email}
                      />
                      {!form.errors.email && (
                        <Text
                          className="flex gap-1 pt-1"
                          size="12px"
                          c="#021526"
                        >
                          <Image w={10} h={10} src={checkIcon} />
                          გამოიყენეთ @redberry.ge ფოსტა
                        </Text>
                      )}
                    </Box>
                    <Box>
                      <NumberInput
                        label="ტელ-ნომერი"
                        hideControls={true}
                        labelProps={{
                          className: "pb-[5px]",
                        }}
                        {...form.getInputProps("phone")}
                        // error={form.errors.phone}
                      />
                      {!form.errors.email && (
                        <Text
                          className="flex gap-1 pt-1"
                          size="12px"
                          c="#021526"
                        >
                          <Image w={10} h={10} src={checkIcon} />
                          მხოლოდ რიცხვები
                        </Text>
                      )}
                    </Box>
                  </SimpleGrid>
                  <FileInput
                    classNames={{
                      input:
                        "h-[135px] w-[800px]   border-2 border-dashed rounded-[8px]",
                    }}
                    label="ატვირთეთ ფოტო"
                    labelProps={{
                      className: "pt-[28px] pb-[5px] ",
                    }}
                    {...form.getInputProps("avatar")}
                  />
                  <Box className="flex w-[800px] justify-end items-end  mt-auto gap-[15px] pt-[91px]">
                    <Button
                      variant="outline"
                      color="#F93B1D"
                      radius="10px"
                      className="text-[16px]"
                      onClick={close}
                    >
                      გაუქმება
                    </Button>
                    <Button
                      type="submit"
                      color="#F93B1D"
                      radius="10px"
                      className="text-[16px]"
                    >
                      დაამატე აგენტი
                    </Button>
                  </Box>
                </Box>
              </form>
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
        {loading ? (
          <Box className="flex justify-center items-center w-full h-full">
            <Loader size={50} type="dots" />
          </Box>
        ) : filteredData.length === 0 ? (
          <Box className="flex justify-center items-center w-full h-full">
            <Text size="lg" fw={500} align="center">
              აღნიშნული მონაცემებით განცხადება არ იძებნება
            </Text>
          </Box>
        ) : (
          filteredData.map((item) => <FilteredItem key={item.id} item={item} />)
        )}
      </Box>
    </Box>
  );
}

export default FormList;
