import { Box, SimpleGrid, Text } from "@mantine/core";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  NumberInput,
  Select,
  Radio,
  Textarea,
  Button,
  FileInput,
  Image,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

import checkIcon from "./assets/check.svg";

const listingTypes = [
  { value: "0", label: "იყიდება" },
  { value: "1", label: "ქირავდება" },
];

export default function AddListing() {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  ///

  const form = useForm({
    initialValues: {
      address: "",
      zip_code: "",
      price: "",
      area: "",
      bedrooms: "",
      description: "",
      is_rental: "sale", // sale/rent radio
      agent_id: "",
      region_id: null,
      city_id: null,
      image: null,
    },

    validate: {
      address: (value) =>
        value.length < 2 ? "მისამართი უნდა იყოს მინიმუმ 2 სიმბოლო" : null,
      zip_code: (value) => {
        if (!/^\d+$/.test(value)) return "საფოსტო ინდექსი უნდა იყოს რიცხვი";
        return null;
      },
      price: (value) => (value ? null : "ფასი უნდა იყოს რიცხობრივი"),
      area: (value) => (value ? null : "ფართობი უნდა იყოს რიცხობრივი"),
      bedrooms: (value) =>
        value && Number.isInteger(value)
          ? null
          : "საძინებლების რაოდენობა უნდა იყოს მთელი რიცხვი",
      description: (value) =>
        value.split(" ").length < 5
          ? "აღწერა უნდა შეიცავდეს მინიმუმ 5 სიტყვას"
          : null,
      region_id: (value) => (value ? null : "გთხოვთ აირჩიოთ რეგიონი"),
      city_id: (value) => (value ? null : "გთხოვთ აირჩიოთ ქალაქი"),
      image: (value) => (!value ? "გთხოვთ ატვირთოთ სურათი" : null),
      agent_id: (value) => (value ? null : "გთხოვთ აირჩიოთ აგენტი"),
    },
  });
  //////

  const fetchRegionsAndCities = useCallback(async () => {
    try {
      const regionsResponse = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      const citiesResponse = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/cities`
      );

      const regions = await regionsResponse.json();
      const cities = await citiesResponse.json();

      setRegions(regions);
      setCities(cities);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchAgents = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          headers: {
            Authorization: "Bearer 9d069399-3db0-42ac-a2fd-28aa276e5c95",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }

      const agentsData = await response.json();
      setAgents(agentsData);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, []);

  const handleSelectRegion = (regionId) => {
    form.setFieldValue("region_id", regionId);

    setFilteredCities(cities.filter((city) => city.region_id === +regionId));
  };
  //send data to api

  const handleSubmit = async (values) => {
    try {
      const validation = form.validate();
      if (validation.hasErrors) {
        console.log("Form validation failed:", validation.errors);
        return;
      }

      // Create a new FormData object
      const formData = new FormData();

      // Append all form fields to the FormData object
      formData.append("address", values.address);
      formData.append("zip_code", values.zip_code);
      formData.append("price", +values.price);
      formData.append("area", +values.area);
      formData.append("bedrooms", +values.bedrooms);
      formData.append("description", values.description);
      formData.append("is_rental", +values.is_rental);
      formData.append("agent_id", +values.agent_id);
      formData.append("region_id", +values.region_id);
      formData.append("city_id", +values.city_id);
      formData.append("image", values.image);

      // Send a POST request to the API endpoint
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/real-estates",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer 9d069399-3db0-42ac-a2fd-28aa276e5c95",
          },
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Something went wrong with the API request");
      }

      const data = await response.json();
      console.log("Successfully submitted:", data);

      //redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Fetch regions and cities, agents when component mounts
  useEffect(() => {
    fetchRegionsAndCities();
    fetchAgents();
  }, [fetchRegionsAndCities, fetchAgents]);

  return (
    <Box>
      <Text c=" #261e02" size="xl" fw={500} ta="center">
        ლისტინგის დამატება
      </Text>
      <Box w={920} h={300} mt={61} mx="auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form.values);
          }}
        >
          <Radio.Group
            label="გარიგების ტიპი"
            labelProps={{
              className: "text-[16px] text-[#1A1A1F;] font-[500]",
            }}
            {...form.getInputProps("is_rental")}
          >
            <Box className="flex gap-8 pt-2">
              {listingTypes.map((type) => (
                <Radio
                  color="#021526"
                  key={type.value}
                  value={type.value}
                  label={type.label}
                />
              ))}
            </Box>
          </Radio.Group>
          <Box c={"#021526"} pt={80}>
            <Text className="text-[16px] text-[#1A1A1F;] font-[500] ">
              მდებარეობა
            </Text>
            <SimpleGrid spacing={20} cols={2} pt={22}>
              <Box>
                <TextInput
                  label="მისამართი"
                  labelProps={{
                    className: "text-[14px] text-[#021526] font-[500]",
                  }}
                  {...form.getInputProps("address")}
                />
                {!form.errors.address && (
                  <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                    <Image w={10} h={10} src={checkIcon} />
                    მინიმუმ ორი სიმბოლო
                  </Text>
                )}
              </Box>
              <Box>
                <TextInput
                  label="საფოსტო ინდექსი"
                  {...form.getInputProps("zip_code")}
                />
                {!form.errors.zip_code && (
                  <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                    <Image w={10} h={10} src={checkIcon} />
                    მხოლოდ რიცხვები
                  </Text>
                )}
              </Box>
              <Select
                label="რეგიონი"
                data={regions.map((region) => ({
                  value: region.id.toString(),
                  label: region.name,
                }))}
                {...form.getInputProps("region_id")}
                onChange={handleSelectRegion}
              />
              <Select
                label="ქალაქი"
                data={filteredCities.map((city) => ({
                  value: city.id.toString(),
                  label: city.name,
                }))}
                {...form.getInputProps("city_id")}
                disabled={!form.values.region_id}
              />
            </SimpleGrid>
          </Box>
          <Box c={"#021526"} pt={80}>
            <Text className="text-[16px] text-[#1A1A1F;] font-[500] ">
              ბინის დეტალები
            </Text>
            <SimpleGrid spacing={20} cols={2} pt={22}>
              <Box>
                <NumberInput
                  hideControls={true}
                  label="ფასი"
                  {...form.getInputProps("price")}
                />
                {!form.errors.price && (
                  <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                    <Image w={10} h={10} src={checkIcon} />
                    მხოლოდ რიცხვები
                  </Text>
                )}
              </Box>
              <Box>
                <NumberInput
                  hideControls={true}
                  label="ფართობი"
                  {...form.getInputProps("area")}
                />
                {!form.errors.area && (
                  <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                    <Image w={10} h={10} src={checkIcon} />
                    მხოლოდ რიცხვები
                  </Text>
                )}
              </Box>
              <Box>
                <NumberInput
                  label="საძინებლების რაოდენობა"
                  hideControls={true}
                  {...form.getInputProps("bedrooms")}
                />
                {!form.errors.bedrooms && (
                  <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                    <Image w={10} h={10} src={checkIcon} />
                    მხოლოდ რიცხვები
                  </Text>
                )}
              </Box>
            </SimpleGrid>
          </Box>
          <Box>
            <Textarea
              pt={20}
              label="აღწერა"
              radius={6}
              classNames={{
                input: "h-[135px]",
              }}
              {...form.getInputProps("description")}
            />
            {!form.errors.description && (
              <Text className="flex gap-1 pt-1" size="12px" c="#021526">
                <Image w={10} h={10} src={checkIcon} />
                მინიმუმ 5 სიტყვა
              </Text>
            )}
          </Box>
          <FileInput
            pt={20}
            label="ატვირთე ფოტო"
            clearable
            accept="image/*"
            classNames={{
              input: "h-[135px]  border-2 border-dashed rounded-[8px]",
            }}
            onChange={(file) => {
              // Check if the file size is less than or equal to 1 MB (1 * 1024 * 1024 bytes)
              const maxSizeInBytes = 1 * 1024 * 1024;
              if (file && file.size > maxSizeInBytes) {
                alert(
                  "The file size exceeds the limit of 1 MB. Please choose a smaller file."
                );
                form.setFieldValue("image", null); // Reset the field value if the file is too large
              } else {
                form.setFieldValue("image", file); // Set the file if it's valid
              }
            }}
            {...form.getInputProps("image")}
          />

          <Box c={"#021526"} py={80}>
            <Text className="text-[16px] text-[#1A1A1F;] font-[500] ">
              აგენტი
            </Text>
            <Select
              pt={15}
              label="აირჩიე"
              data={agents.map((agent) => ({
                value: agent.id.toString(),
                label: agent.name,
              }))} // Populate agents in the dropdown
              {...form.getInputProps("agent_id")}
              comboboxProps={{
                position: "bottom",
                middlewares: { flip: false, shift: false },
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
          </Box>
          <Box pt={80} className="flex justify-end gap-[15px]">
            <Link to="/">
              <Text
                py={5}
                px={16}
                className="text-[16px] text-[#F93B1D] font-[500] border inline-block mb-[100px] border-[#F93B1D] rounded-[10px]"
              >
                გაუქმება
              </Text>
            </Link>
            <Button
              type="submit"
              color="#F93B1D"
              radius="10px"
              className="text-[16px]"
            >
              დაამატე ლისტინგი
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
