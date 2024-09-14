export default function Card(props) {
  const { address, zip_code, price, area, bedrooms, is_rental, image, city } =
    props;
  return (
    <div>
      <p>
        {(address, zip_code, price, area, bedrooms, is_rental, image, city)}
      </p>
    </div>
  );
}
