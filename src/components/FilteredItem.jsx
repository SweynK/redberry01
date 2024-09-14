/* eslint-disable react/prop-types */
import { Box, Text, Image } from "@mantine/core";

function FilteredItem({ item }) {
  return (
    <Box className="flex w-[384px] flex-col gap-[8px] border p-[16px] rounded-[8px]">
      <Text>Address: {item.address}</Text>
      <Text>Region: {item.city.region.name}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Area: {item.area} sqm</Text>
      <Text>Bedrooms: {item.bedrooms}</Text>
      {item.image && <Image src={item.image} alt={item.address} width={100} />}
    </Box>
  );
}

export default FilteredItem;
