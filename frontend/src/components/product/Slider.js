import Slider from "@mui/material/Slider";

export default function RangeSlider({ price: value, setPrice: setValue }) {
  function valuetext(value) {
    return `${value}`;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Slider
      size="small"
      spacing={8}
      min={0}
      step={300}
      max={10000}
      getAriaLabel={() => "Temperature range"}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      marks={[
        {
          value: 10,
          label: "10$",
        },
        {
          value: 10000,
          label: "10000$",
        },
      ]}
    />
  );
}
