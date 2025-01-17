import React, { Dispatch, SetStateAction } from "react";
import { getContrastingColor } from "../../functions";
import { TpeValue, ValuesAttributes } from "../../interfaces";
import { CircleX } from "lucide-react";

interface Props {
  valuesAttributes: ValuesAttributes;
  setValuesAttributes: Dispatch<SetStateAction<ValuesAttributes>>;
}

const AttributeRender = ({ valuesAttributes, setValuesAttributes }: Props) => {
  const removeSize = (type: TpeValue, value: string) => {
    switch (type) {
      case "Color":
        const result1 = valuesAttributes.Color.filter((i) => i.name !== value);
        setValuesAttributes({ ...valuesAttributes, Color: result1 });
        break;

      case "Dimensión":
        const result2 = valuesAttributes.Dimensión.filter((i) => i !== value);
        setValuesAttributes({ ...valuesAttributes, Dimensión: result2 });
        break;
      case "Género":
        const result3 = valuesAttributes.Género.filter((i) => i !== value);
        setValuesAttributes({ ...valuesAttributes, Género: result3 });
        break;
      case "Mililitro":
        const result4 = valuesAttributes.Mililitro.filter((i) => i !== value);
        setValuesAttributes({ ...valuesAttributes, Mililitro: result4 });
        break;
      case "Peso":
        const result5 = valuesAttributes.Peso.filter((i) => i !== value);
        setValuesAttributes({ ...valuesAttributes, Peso: result5 });
        break;

      case "Talla":
        const result6 = valuesAttributes.Talla.filter((i) => i !== value);
        setValuesAttributes({ ...valuesAttributes, Talla: result6 });
        break;
    }
  };

  const attributesMapping = {
    Color: (item: { name: string; color: string }) => (
      <div
        className="rounded-lg py-1 px-3 text-sm flex items-center gap-2"
        key={item.name}
        style={{
          backgroundColor: item.color,
          color: getContrastingColor(item.name),
        }}
      >
        {item.name}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Color", item.name)}
        />
      </div>
    ),
    Género: (item: string) => (
      <div key={item} className="burble">
        {item}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Género", item)}
        />
      </div>
    ),
    Mililitro: (item: string) => (
      <div key={item} className="burble">
        {item}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Mililitro", item)}
        />
      </div>
    ),
    Peso: (item: string) => (
      <div key={item} className="burble">
        {item}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Peso", item)}
        />
      </div>
    ),
    Talla: (item: string) => (
      <div key={item} className="burble">
        {item}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Talla", item)}
        />
      </div>
    ),
    Dimensión: (item: string) => (
      <div key={item} className="burble">
        {item}
        <CircleX
          size={14}
          className="cursor-pointer"
          onClick={() => removeSize("Dimensión", item)}
        />
      </div>
    ),
  };

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(valuesAttributes).flatMap(([key, values]) =>
        values.map((item: any) =>
          attributesMapping[key as keyof typeof attributesMapping]
            ? attributesMapping[key as keyof typeof attributesMapping](item)
            : null
        )
      )}
    </div>
  );
};

export default AttributeRender;
