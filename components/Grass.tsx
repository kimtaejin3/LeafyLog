type Props = {
  depth: number;
};

export default function Grass({ depth }: Props) {
  let grass_color;

  if (depth === 0) {
    grass_color = "#DADADA";
  } else if (depth <= 25) {
    grass_color = "#B9FFC8";
  } else if (depth <= 50) {
    grass_color = "#6AC47D";
  } else if (depth <= 75) {
    grass_color = "#4ACC66";
  } else if (depth <= 90) {
    grass_color = "#369B4C";
  } else {
    grass_color = "#0A4918";
  }

  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "6px",
        backgroundColor: `${grass_color}`,
      }}
    ></div>
  );
}
