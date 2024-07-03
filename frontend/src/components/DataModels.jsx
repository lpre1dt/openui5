import React, { useState } from "react";
import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li
import "@ui5/webcomponents/dist/Select.js"; // ui5-select
import "@ui5/webcomponents/dist/Option.js"; // ui5-option
import {
  Button,
  Icon,
  List,
  StandardListItem,
  Bar,
  Input,
  Label,
  Title,
  Page,
  Select,
  Option,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/settings.js";
import { useNavigate } from "react-router-dom";

const DataModels = () => {
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const data = [
    {
      id: 1,
      name: "Data Model 1",
      description: "Description 1",
      type: "custom",
    },
    {
      id: 2,
      name: "Data Model 2",
      description: "Description 2",
      type: "standard",
    },
    {
      id: 3,
      name: "Data Model 3",
      description: "Description 3",
      type: "custom",
    },
  ];

  let navigate = useNavigate();

  const filteredData = data.filter(
    (model) =>
      model.name.toLowerCase().includes(filter.toLowerCase()) &&
      (typeFilter === "all" || model.type === typeFilter)
  );

  return (
    <div>
      <Page
        backgroundDesign="List"
        header={
          <Bar
            endContent={<Button icon="settings" title="Go to Settings" />}
            startContent={
              <Button
                icon="home"
                title="Go Home"
                onClick={() => {
                  navigate("/");
                }}
              />
            }
          >
            <Label>ABAP-GPT</Label>
          </Bar>
        }
        hideFooter
        style={{
          height: "100vh",
        }}
      >
        <div style={{ padding: "20px" }}>
          <Title>Datamodels</Title>
          <p>
            Manage and create data models. The base for your decision trees.
          </p>

          <div
            style={{ margin: "20px 0", display: "flex", alignItems: "center" }}
          >
            <Input
              placeholder="Search Data Models"
              value={filter}
              onInput={(e) => setFilter(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              style={{ marginRight: "10px" }}
            >
              <Option value="all">All</Option>
              <Option value="custom">Custom</Option>
              <Option value="standard">Standard</Option>
            </Select>
            <Button
              icon="synchronize"
              onClick={() => {
                setFilter("");
                setTypeFilter("all");
              }}
            >
              Clear
            </Button>
          </div>

          <List>
            {filteredData.map((model) => (
              <StandardListItem key={model.id} description={model.description}>
                {model.name} ({model.type})
              </StandardListItem>
            ))}
          </List>
        </div>
      </Page>
    </div>
  );
};

export default DataModels;
