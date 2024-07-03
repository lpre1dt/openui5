import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li
import { Button, Icon } from "@ui5/webcomponents-react"; // loads ui5-button wrapped in a ui5-webcomponents-react component
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";
import { useEffect } from "react";
import "@ui5/webcomponents-react/dist/Assets";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/settings";
import "@ui5/webcomponents-icons/dist/database";
import "@ui5/webcomponents-icons/dist/upload-to-cloud";
import "@ui5/webcomponents-icons/dist/tree";
import "@ui5/webcomponents-icons/dist/palette";
import "@ui5/webcomponents-icons/dist/ai";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Bar,
  Label,
  Title,
  Card,
  ResponsiveGridLayout,
  CardHeader,
} from "@ui5/webcomponents-react";

function Home() {
  let navigate = useNavigate();
  return (
    <div>
      <div>
        <Page
          backgroundDesign="List"
          header={
            <Bar
              endContent={<Button icon="settings" title="Go to Settings" />}
              startContent={<Button icon="home" title="Go Home" />}
            >
              <Label>MHP-Decision-Framework</Label>
            </Bar>
          }
          hideFooter
          style={{
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "30px",
            }}
          >
            <Title>Welcome to the MHP-Decision-Framework</Title>
            <p>
              The interactive Decision Framework helps you to create awsesome
              decsiontrees based advanced machine learning algorithms.
            </p>
            <Title level="H3">Creator Tools:</Title>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="database" />}
                  subtitleText="Create or manage data models"
                  titleText="Data modeler"
                  onClick={() => {
                    navigate("datamodels");
                  }}
                />
              }
              style={{
                width: "300px",

                padding: "10px",
              }}
            ></Card>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="tree" />}
                  titleText="Decison tree generator"
                  subtitleText="Generate and manage decision trees based on data models"
                  onClick={() => {
                    navigate("metadata");
                  }}
                />
              }
              style={{
                width: "300px",

                padding: "10px",
              }}
            ></Card>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="upload-to-cloud" />}
                  titleText="Deploy to customer"
                  subtitleText="Manage and deploy decision trees to customers"
                  onClick={{}}
                />
              }
              style={{
                width: "300px",

                padding: "10px",
              }}
            ></Card>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="ai" />}
                  titleText="Documentation editor"
                  subtitleText="Create and manage awsome documentations"
                  onClick={() => {
                    navigate("editor");
                  }}
                />
              }
              style={{
                width: "300px",

                padding: "10px",
              }}
            ></Card>
            <Title style={{ paddingTop: 10 }} level="H3">
              My decision trees:
            </Title>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="palette" />}
                  titleText="My Decision Trees"
                  subtitleText="Manage and deploy decision trees to customers"
                  onClick={() => {
                    navigate("metadata");
                  }}
                />
              }
              style={{
                width: "300px",

                padding: "10px",
              }}
            ></Card>
          </div>
        </Page>
      </div>
    </div>
  );
}

export default Home;
