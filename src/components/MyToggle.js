import { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Switch from "react-switch";

const MyToggle = (props) => {
  const [checked, setChecked] = useState(props.defaultChecked);
  const tip = props.tip;

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    props.onChange(nextChecked, props.label);
  };

  return (
    <div className="d-flex align-items-center">
      {tip ? (
        <OverlayTrigger
          placement="top"
          trigger="click"
          rootCloseEvent="mousedown"
          overlay={(props) => <Tooltip {...props}>{tip}</Tooltip>}
          rootClose="true"
        >
          <span>{props.label}</span>
        </OverlayTrigger>
      ) : (
        <span>{props.label}</span>
      )}
      <Switch
        onChange={handleChange}
        checked={checked}
        className="react-switch ms-2"
      />
    </div>
  );
};

export default MyToggle;
