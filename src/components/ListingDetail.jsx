import {
  Box,
  Button,
  SimpleGrid,
  Text,
  Image,
  Loader,
  Modal,
} from "@mantine/core";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import "@mantine/carousel/styles.css";

import backIcon from "../assets/icon-right.svg";
import locationIcon from "../assets/location-marker.svg";
import vectorIcon from "../assets/Vector.svg";
import bedIcon from "../assets/bed.svg";
import zipCodeIcon from "../assets/zip-code.svg";
import mailIcon from "../assets/gmail-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";
// import iConArrowRight from "../assets/right-arrow.svg";
// import iConArrowLeft from "../assets/left-arrow.svg";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

// import test from "../assets/text.png";
import { Carousel } from "@mantine/carousel";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

const TOKEN = "9d069399-3db0-42ac-a2fd-28aa276e5c95";

export default function ListingDetail() {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [dataSlider, setDataSlider] = useState([]);
  const [lists, setLists] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [opened, { open, close }] = useDisclosure(false);

  //fetch estate data and agent
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        const listData = await response.json();
        setData(listData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchData();
  }, [id]);

  //fetch listing for slider

  useEffect(() => {
    const fecthListing = async () => {
      try {
        const response = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );
        const listingData = await response.json();
        setLists(listingData);
      } catch (error) {
        console.log(error);
      }
    };
    fecthListing();
  }, []);

  /// Scroll to top when the route changes
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  /// filter for slider
  useEffect(() => {
    if (data && lists.length > 0) {
      const filteredListings = lists.filter(
        (item) => item.city.region_id === data.city.region_id
      );
      setDataSlider(filteredListings);
    }
  }, [data, lists]);

  // Check if the data is still loading or filtered is undefined
  if (loading || !data) {
    return (
      <Box className="flex justify-center items-center w-full h-full">
        <Loader size={50} type="dots" />
      </Box>
    );
  }

  //handleDeleteListing
  const handleDeleteListing = async () => {
    try {
      const response = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${data.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer 9d069399-3db0-42ac-a2fd-28aa276e5c95",
          },
        }
      );
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //date transform

  const date = new Date(data.created_at);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Box w={1591}>
        <Link to="/">
          <Image w={32} src={backIcon} alt="back arrow" />
        </Link>
        <SimpleGrid cols={2} spacing={68} pt={29}>
          <Box className=" flex flex-col">
            <Box>
              <Box w="full" h={670} className="relative overflow-hidden">
                <Image
                  src={data.image}
                  alt="image"
                  className="w-full h-full object-cover rounded-t-[14px] "
                />
              </Box>
            </Box>
            <Text size="16px" pt={11} c={"#808A93"} ta={"right"}>
              გამოქვეყნების თარიღი: {formattedDate}
            </Text>
          </Box>
          <Box className="flex flex-col">
            <Text size="48px" c={"#021526"} fw={700}>
              {data.price}
            </Text>
            <Box pt={24} className="flex flex-col gap-4">
              <Text
                size="24px"
                c={"#808A93"}
                className="flex  items-start gap-[6px]"
              >
                <Image w={22} h={22} src={locationIcon} alt="location-icon" />
                {data.address}
              </Text>
              <Text
                size="24px"
                c={"#808A93"}
                className="flex  items-start gap-[6px]"
              >
                <Image w={22} h={22} src={vectorIcon} alt="location-icon" />
                {data.area}
              </Text>
              <Text
                size="24px"
                c={"#808A93"}
                className="flex  items-start gap-[6px]"
              >
                <Image w={22} h={22} src={bedIcon} alt="location-icon" />
                {data.bedrooms}
              </Text>
              <Text
                size="24px"
                c={"#808A93"}
                className="flex  items-start gap-[6px]"
              >
                <Image w={22} h={22} src={zipCodeIcon} alt="location-icon" />
                {data.zip_code}
              </Text>
            </Box>
            <Text
              size="16px"
              c={"#808A93"}
              pt={40}
              pb={50}
              className="leading-6"
            >
              {data.description}
            </Text>
            <Box
              pt={24}
              pl={20}
              className=" border rounded-lg border-[#DBDBDB] flex flex-col"
            >
              <Box className="flex items-center gap-[14px]">
                <Box
                  w={72}
                  h={72}
                  className="relative overflow-hidden rounded-full"
                >
                  <Image
                    src={data.agent.avatar}
                    className="w-full h-full object-cover"
                    alt="agneti"
                  />
                </Box>
                <Box className="flex flex-col gap-1">
                  <Text size="16px" c={"#021526"}>
                    {data.agent.name}
                  </Text>
                  <Text size="12px" c={"#676E76"}>
                    აგენტი
                  </Text>
                </Box>
              </Box>
              <Box
                pt={16}
                pb={10}
                c={"#808A93"}
                className="flex flex-col gap-2"
              >
                <Text size="14px" className="flex gap-[5px]">
                  <Image w={16} h={13} src={mailIcon} alt="mail icon" />
                  {data.agent.email}
                </Text>
                <Text size="14px" className="flex gap-[5px]">
                  <Image w={16} h={16} src={phoneIcon} alt="phone icon" />
                  {data.agent.phone}
                </Text>
              </Box>
            </Box>
            <Box>
              <Modal opened={opened} onClose={close} centered>
                <Text size="20px" ta="center" pt={10} pb={30}>
                  გსურთ წშალოთ ლისტინგი?
                </Text>
                <Box className="flex  justify-center items-end  mt-auto gap-[10px] pb-[30px]">
                  <Button
                    variant="outline"
                    color="#F93B1D"
                    radius="10px"
                    className="text-[14px]"
                    onClick={close}
                  >
                    გაუქმება
                  </Button>
                  <Button
                    type="submit"
                    color="#F93B1D"
                    radius="10px"
                    className="text-[14px]"
                    onClick={handleDeleteListing}
                  >
                    დადასტურება
                  </Button>
                </Box>
              </Modal>
              <Button
                className="text-[12px] p-[10px]"
                mt={40}
                variant="filled"
                color="gray"
                radius="md"
                onClick={open}
              >
                ლისტინგის წაშლა
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
        <Text size="32px" fw={500} c={"#021526"} pt={53}>
          ბინები მსგავს ლოკაციაზე
        </Text>
        <Box pt={52}>
          <Carousel
            withIndicators
            height={500}
            slideSize="33.333333%"
            slideGap="md"
            align="start"
            slidesToScroll={3}
            controlSize={0}
            loop
            nextControlIcon={
              <IconArrowRight className="w-[30px] h-[30px] absolute right-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-none" />
            }
            previousControlIcon={
              <IconArrowLeft className="w-[30px] h-[30px] absolute left-[-60px] top-1/2 transform -translate-y-1/2 z-10 bg-none" />
            }
          >
            {dataSlider.map((item) => (
              <Carousel.Slide key={item.id}>
                <Link
                  to={`/listing/${item.id}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top
                    setTimeout(() => {
                      navigate(`/listing/${item.id}`); // Navigate after delay
                    }, 500); // Match this duration with the scroll duration
                  }}
                >
                  <Box className="flex flex-col h-[455px] border border-[#02152680] rounded-md">
                    <Image
                      src={item.image}
                      alt={`Image of ${item.address}`}
                      className="h-[307px] w-full object-cover  rounded-t-md"
                    />
                    <Box className="flex flex-col gap-2 p-4">
                      <Text className="font-bold text-lg">{item.price} ₾</Text>
                      <Text className="flex gap-1">
                        <Image
                          w={22}
                          h={22}
                          src={locationIcon}
                          alt="location-icon"
                        />
                        {item.address}
                      </Text>
                      <Box className="flex gap-4">
                        <Text className="flex gap-1">
                          <Image w={22} h={22} src={bedIcon} alt="bed-icon" />
                          {item.bedrooms}
                        </Text>
                        <Text className="flex gap-1">
                          <Image
                            w={22}
                            h={22}
                            src={vectorIcon}
                            alt="area-icon"
                          />
                          {item.area}
                        </Text>
                        <Text className="flex gap-1">
                          <Image
                            w={22}
                            h={22}
                            src={zipCodeIcon}
                            alt="zip-code-icon"
                          />
                          {item.zip_code}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Box>
      </Box>
    </motion.div>
  );
}
