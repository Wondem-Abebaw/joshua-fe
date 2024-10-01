import {
  Modal,
  Radio,
  Button,
  Input,
  Checkbox,
  Typography,
  Divider,
  Form,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { RadioChangeEvent } from "antd/lib";
const { Title, Text } = Typography;
const { TextArea } = Input;
import { ReactNode, useState } from "react";
interface Props {
  type?: "notify" | "danger";
  icon?: ReactNode;
  header: string;
  subHeader?: string;
  headerAlignment?: "left" | "center" | "right";
  message?: any;
  selectorLabel?: string;
  labelDescription?: string;
  result?: "single" | "multiple";
  resultRequired?: boolean;
  options?: { label: string; value: string }[];
  customInput?: boolean;
  onYes: Function;
  yesText?: string;
  cancelOption?: boolean;
  onNo?: Function;
  noText?: string;
  loading?: boolean;
  children: ReactNode;
  optionalConfirmation?: boolean;
  optionalStatus?: boolean;
  size?: string;
}
export default function Confirmation(props: Props) {
  const [inputData, setInputData] = useState("");
  const [radioValue, setRadioValue] = useState<string>();
  const [checkBoxValue, setCheckBoxValue] = useState<CheckboxValueType[]>([]);
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState("");
  const radioOnChange = (e: RadioChangeEvent) => {
    setRadioValue(e.target.value);
  };

  const checkBoxOnChange = (checkedValues: CheckboxValueType[]) => {
    setCheckBoxValue(checkedValues);
  };

  function getResult() {
    if (props.result === "single") {
      if (props.resultRequired && (radioValue || inputData)) {
        return radioValue ?? inputData;
      } else {
        setError("Please select an item!");
        return -1;
      }
    } else if (props.result === "multiple") {
      if (props.resultRequired && (checkBoxValue.length > 0 || inputData)) {
        if (inputData) {
          checkBoxValue.push(inputData);
        }
        return checkBoxValue;
      } else {
        setError("Please select at least one item or write your own!");
        return -1;
      }
    }
    return undefined;
  }

  return (
    <>
      <Modal
        style={{ top: 20 }}
        open={opened}
        width={450}
        className={` scrollable-modal  ${
          props.type === "notify" ? "border-yellow-500" : "border-red-500"
        }`}
        onCancel={() => setOpened(false)}
        title={props?.header}
        footer={[
          <div key="container" className="flex  space-x-3 justify-end">
            <Button
              className="flex space-x-1 dark:text-white hover:bg-primary hover:dark:bg_dark_primary hover:text-white"
              onClick={() => {
                setOpened(false);
                if (props.onNo) {
                  props.onNo();
                }
              }}
            >
              <span>{props.noText ?? "Cancel"}</span>
            </Button>
            <Button
              className={`flex space-x-1 bg-${
                props.type === "danger" ? "danger" : "primary"
              } text-white`}
              loading={props.loading}
              onClick={() => {
                const result = getResult();
                if (result !== -1) {
                  setOpened(false);
                  if (result) {
                    props.onYes(result);
                  } else {
                    props.onYes();
                  }
                }
              }}
            >
              <span>{props.yesText ?? "OK"}</span>
            </Button>
          </div>,
        ]}
      >
        {/*Modal Header*/}
        <div key="modal-header" className={"-mt-4 mb-3 flex overflow-y-auto "}>
          <div
            className={`flex-col ${
              props.headerAlignment === "left"
                ? "flex-start"
                : props.headerAlignment === "center"
                ? "center"
                : "flex-end"
            }`}
          >
            {props.icon && <div className={"mb-3"}>{props.icon}</div>}
            {props.subHeader && <Title>{props.subHeader}</Title>}
          </div>
        </div>

        {/*Modal Content*/}
        {props.message && (
          <div key="modal-Content" className={"my-3"}>
            {props.message}
          </div>
        )}

        {/*Single result options*/}
        {props.result === "single" && props.options && (
          <div key="singel-resul-option" className="overflow-x-auto  mx-2 h-60">
            <Title level={5}>{props.selectorLabel}</Title>
            <Text className="text-neutral-400">{props.labelDescription}</Text>
            <Radio.Group value={radioValue} onChange={radioOnChange}>
              <div className="flex flex-col flex-start my-4 space-y-2">
                {props.options.map((option, index) => {
                  return (
                    <Radio key={index} value={option.value}>
                      {option.label}
                    </Radio>
                  );
                })}
              </div>
            </Radio.Group>
          </div>
        )}

        {/*Multiple result options*/}
        {props.result === "multiple" && props.options && (
          <div key="mutliplerewslut2" className={"overflow-x-auto mx-2"}>
            <Title level={5}>{props.selectorLabel}</Title>
            <Text className="text-neutral-400">{props.labelDescription}</Text>
            <Checkbox.Group value={checkBoxValue} onChange={checkBoxOnChange}>
              <div className="my-4 flex space-y-2">
                {props.options.map((option, index) => {
                  return (
                    <Checkbox key={index} value={option.value}>
                      {option.label}
                    </Checkbox>
                  );
                })}
              </div>
            </Checkbox.Group>
          </div>
        )}

        {/*Custom Input*/}
        {props.customInput && (
          <Form key="custominput">
            <Form.Item label="Or other">
              <TextArea
                value={inputData}
                rows={4}
                placeholder="max length is 100 character"
                maxLength={100}
                onChange={(event) => setInputData(event.target.value)}
              />
            </Form.Item>
          </Form>
        )}
        <Divider className={"my-3"} />

        {/*Modal Footer*/}
        {/*Modal Footer Error*/}
        {error && (
          <div key="modalerro" className={"font-semibold text-danger my-2"}>
            * {error}
          </div>
        )}
      </Modal>
      <div
        onClick={() => {
          if (props.optionalConfirmation && !props.optionalStatus) {
            props.onYes();
          } else {
            setOpened(true);
          }
        }}
      >
        {props.children}
      </div>
    </>
  );
}
