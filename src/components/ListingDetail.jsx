import { Box, Button, SimpleGrid, Text, Image } from "@mantine/core";
import { Link } from "react-router-dom";

import "@mantine/carousel/styles.css";

import backIcon from "../assets/icon-right.svg";
import locationIcon from "../assets/location-marker.svg";
import vectorIcon from "../assets/Vector.svg";
import bedIcon from "../assets/bed.svg";
import zipCodeIcon from "../assets/zip-code.svg";
import mailIcon from "../assets/gmail-icon.svg";
import phoneIcon from "../assets/phone-icon.svg";
import test from "../assets/text.png";
import { Carousel } from "@mantine/carousel";

export default function ListingDetail() {
  return (
    <Box w={1591}>
      <Link to="/">
        <Image w={32} src={backIcon} alt="back arrow" />
      </Link>
      <SimpleGrid cols={2} spacing={68} pt={29}>
        <Box className=" flex flex-col">
          <Box>
            <Box w="full" h={670} className="relative overflow-hidden">
              <Image
                src={test}
                alt="image"
                className="w-full h-full object-cover rounded-t-[14px] "
              />
            </Box>
          </Box>
          <Text size="16px" pt={11} c={"#808A93"} ta={"right"}>
            გამოქვეყნების თარიღი
          </Text>
        </Box>
        <Box className="flex flex-col">
          <Text size="48px" c={"#021526"} fw={700}>
            80000 ₾
          </Text>
          <Box pt={24} className="flex flex-col gap-4">
            <Text
              size="24px"
              c={"#808A93"}
              className="flex  items-start gap-[6px]"
            >
              <Image w={22} h={22} src={locationIcon} alt="location-icon" />
              თბილისი, ი. ჭავჭავაძის 53
            </Text>
            <Text
              size="24px"
              c={"#808A93"}
              className="flex  items-start gap-[6px]"
            >
              <Image w={22} h={22} src={vectorIcon} alt="location-icon" />
              ფართი 55
            </Text>
            <Text
              size="24px"
              c={"#808A93"}
              className="flex  items-start gap-[6px]"
            >
              <Image w={22} h={22} src={bedIcon} alt="location-icon" />
              საძინებელი 2
            </Text>
            <Text
              size="24px"
              c={"#808A93"}
              className="flex  items-start gap-[6px]"
            >
              <Image w={22} h={22} src={zipCodeIcon} alt="location-icon" />
              საფოსტო ინდექსი 2523
            </Text>
          </Box>
          <Text size="16px" c={"#808A93"} pt={40} pb={50} className="leading-6">
            იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
            ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯითა და ტექნიკით.
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
                  src={test}
                  className="w-full h-full object-cover"
                  alt="agneti"
                />
              </Box>
              <Box className="flex flex-col gap-1">
                <Text size="16px" c={"#021526"}>
                  სოფიო გელოვანი
                </Text>
                <Text size="12px" c={"#676E76"}>
                  აგენტი
                </Text>
              </Box>
            </Box>
            <Box pt={16} c={"#808A93"} className="flex flex-col gap-1">
              <Text size="14px" className="flex gap-[5px]">
                <Image w={16} h={13} src={mailIcon} alt="mail icon" />
                sophio.gelovani@redberry.ge
              </Text>
              <Text size="14px" className="flex gap-[5px]">
                <Image w={16} h={16} src={phoneIcon} alt="phone icon" />
                577 777 777
              </Text>
            </Box>
          </Box>
          <Box>
            <Button
              className="text-[12px] p-[10px]"
              mt={40}
              variant="filled"
              color="gray"
              radius="md"
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
          height={400}
          slideSize="33.333333%"
          slideGap="md"
          align="start"
          slidesToScroll={3}
        >
          <Carousel.Slide>
            <Image src={test} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={test} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={test} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={test} />
          </Carousel.Slide>
          <Carousel.Slide>
            <Image src={test} />
          </Carousel.Slide>
        </Carousel>
      </Box>
    </Box>
  );
}
