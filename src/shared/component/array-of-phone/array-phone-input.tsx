import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, Input, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const schema = yup.object().shape({
  phoneNumbers: yup
    .array()
    .of(yup.string().matches(/^\d{10}$/, "Invalid phone number")),
});

const PohoneNumberArray = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<any>(schema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form className="bg-danger" onFinish={handleSubmit(onSubmit)}>
      {fields.map(
        (field, index) => (
          console.log(field),
          (
            <Form.Item
              key={field.id}
              label={index === 0 ? "Phone Numbers" : ""}
            >
              <Input
                className="bg-black"
                name={`phoneNumbers[${index}]`}
                {...control.register}
              />
              <h1>hellow</h1>
              {index === fields.length - 1 && (
                <Button
                  type="dashed"
                  onClick={() => append("")}
                  style={{ marginTop: "10px" }}
                  icon={<PlusOutlined />}
                >
                  Add Phone Number
                </Button>
              )}
              {index > 0 && (
                <Button
                  type="dashed"
                  onClick={() => remove(index)}
                  style={{ marginTop: "10px" }}
                  icon={<MinusCircleOutlined />}
                >
                  Remove
                </Button>
              )}
            </Form.Item>
          )
        )
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PohoneNumberArray;
