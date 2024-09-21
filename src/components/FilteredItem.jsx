/* eslint-disable react/prop-types */
import { Box, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import locationIcon from "../assets/location-marker.svg";
import bedroomIcon from "../assets/bed.svg";
import sizeIcon from "../assets/Vector.svg";
import zipCode from "../assets/zip-code.svg";

function FilteredItem({ item }) {
  return (
    <Link to={`/listing/${item.id}`}>
      <Box
        w={384}
        h={455}
        className=" flex  flex-col gap-[8px] border rounded-[14px]"
      >
        <Box w="full" h={307} className="relative overflow-hidden">
          {item.image && (
            <Image
              src={item.image}
              alt={item.address}
              className="w-full h-full object-cover rounded-t-[14px] "
            />
          )}
          <Text className="text-[#fff] p-[6px] bg-[#02152680] absolute top-[23px] left-[23px] rounded-[15px] font-medium">
            {item.is_rental ? "იყიდება" : "ქირავდება"}
          </Text>
        </Box>
        <Box p={22}>
          <Text size="28px" c="#021526" fw={700}>
            {item.price} ₾
          </Text>
          <Box c={"#021526B2"} className="flex pt-[12px]  gap-[8px]">
            <Image src={locationIcon}></Image>
            <Text>{item.city.name} ,</Text>
            <Text>{item.address}</Text>
          </Box>
          <Box c={"#021526B2"} className="flex gap-8 pt-[20px]">
            <Box className="flex gap-1">
              <Image w={24} h={24} src={bedroomIcon}></Image>
              <Text>{item.bedrooms}</Text>
            </Box>
            <Box className="flex gap-1">
              <Image w={24} h={24} src={sizeIcon}></Image>
              <Text>{item.area}</Text>
            </Box>
            <Box className="flex gap-1">
              <Image w={24} h={24} src={zipCode}></Image>
              <Text>{item.zip_code}</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

export default FilteredItem;
