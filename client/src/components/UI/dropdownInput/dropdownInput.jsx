import React, { useState } from 'react';
import { Dropdown, DropdownButton, FormControl } from 'react-bootstrap';

const DropdownInput = ({ title, items, setSelected }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <DropdownButton
      title={title}
      className="clinic mb-3"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </DropdownButton>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value ||
                child.props.children
                  .toLowerCase()
                  .startsWith(value.toLowerCase())
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <Dropdown>
      <Dropdown.Toggle
        as={CustomToggle}
        id="dropdown-custom-components"
      ></Dropdown.Toggle>

      <Dropdown.Menu
        style={{ height: 200, overflow: 'auto', width: '100%' }}
        as={CustomMenu}
      >
        {items.map((item) => (
          <Dropdown.Item
            onClick={(e) => setSelected(e.target.innerHTML)}
            key={Object.values(item)[0]}
          >
            {Object.values(item)[0]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownInput;
