import { Attribute } from "@/app/dashboard/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import SelectGender from "../../select-gender/SelectGender";
import { dataGenders } from "@/app/dashboard/functions";

interface Props {
  nameAttribute: string;
  attributes: Attribute;
  setisValid: Dispatch<SetStateAction<boolean>>;
  setValueAttribute: Dispatch<SetStateAction<Attribute>>;
}

const AttributeGender = ({
  attributes,
  setValueAttribute,
  nameAttribute,
  setisValid,
}: Props) => {
  const [genders, setGenders] = useState<string[]>([]);

  useEffect(() => {
    if (attributes.gender.length) {
      setGenders(attributes.gender);
    }
  }, [genders]);

  const removeGender = (name: string) => {
    const newGenders = attributes.gender.filter((i) => i !== name);
    setGenders(newGenders);
    setValueAttribute({ ...attributes, gender: newGenders });
  };

  useEffect(() => {
    if (nameAttribute !== "" && genders.length) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [nameAttribute, genders]);

  return (
    <div>
      <label className="text-slate-600 block mb-2">Valor</label>
      <div className="flex gap-2">
        <SelectGender
          setValueAttribute={setValueAttribute}
          data={dataGenders}
          setValue={setGenders}
          value={genders}
        />
      </div>

      {attributes.gender.length === 10 && (
        <span className="text-xs text-gray-600">
          Ha alcanzado el límite máximo de valores (10)
        </span>
      )}

      <div className="flex flex-wrap gap-2 mt-3">
        {attributes.gender.map((item, index) => (
          <div key={index} className="burble">
            {item}

            <CircleX
              size={14}
              className="cursor-pointer"
              onClick={() => removeGender(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttributeGender;
