import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/Input.js"; // ui5-input
import "@ui5/webcomponents/dist/List.js"; // ui5-list
import "@ui5/webcomponents/dist/StandardListItem.js"; // ui5-li
import { Button, Icon } from "@ui5/webcomponents-react"; // loads ui5-button wrapped in a ui5-webcomponents-react component
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme";
import "@ui5/webcomponents-react/dist/Assets";
import { useEffect, useState } from "react";
import "@ui5/webcomponents-react/dist/Assets";
import "@ui5/webcomponents-icons/dist/home.js";
import "@ui5/webcomponents-icons/dist/settings";
import "@ui5/webcomponents-icons/dist/source-code";
import "@ui5/webcomponents-icons/dist/palette";
import "@ui5/webcomponents-icons/dist/ai";
import "@ui5/webcomponents-icons/dist/synchronize";
import "@ui5/webcomponents-icons/dist/add";
import "@ui5/webcomponents-icons/dist/s4hana";
import "@ui5/webcomponents-icons/dist/download";

import { useNavigate } from "react-router-dom";
import {
  Page,
  Bar,
  Label,
  Title,
  Input,
  Card,
  ResponsiveGridLayout,
  CardHeader,
  Form,
  FormItem,
  CheckBox,
  FormGroup,
  Text,
  Select,
  Option,
  Link,
  Tab,
  TabContainer,
} from "@ui5/webcomponents-react";
import { o } from "odata";

function Metadata() {
  const [url, setUrl] = useState("");
  const [odataModel, setOdataModel] = useState();
  const handleChange = (event) => {
    setUrl(event.target.value);
  };
  const loadODataModel = async () => {
    var oHandler = o(
      "https://services.odata.org/V4/(S(wptr35qf3bz4kb5oatn432ul))/TripPinServiceRW/People"
    );
    oHandler.get(function (data) {
      console.log(data); // data of the TripPinService/People endpoint
    });
  };
  let navigate = useNavigate();
  return (
    <div>
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
            height: "500px",
          }}
        >
          <div
            style={{
              padding: "30px",
            }}
          >
            <Title>Metadaten Generator</Title>
            <p>
              Generiere Metadten für dein Datenmodell um kinderleicht Fiori
              Elements Apps zu designen und entwickeln!
            </p>
            <div>
              <TabContainer
                contentBackgroundDesign={"Transparent"}
                backgroundDesign={"Transparent"}
                onTabSelect={function _a() {}}
              >
                <Tab icon="synchronize" selected text="OData Service laden">
                  <div
                    style={{
                      padding: "10px",
                    }}
                  >
                    <Text>{url}</Text>
                    <Input
                      onChange={handleChange}
                      value={url}
                      style={{
                        margin: "10px",
                        width: "500px",
                      }}
                    >
                      OData Service Name
                    </Input>
                    <Button onClick={loadODataModel} icon="download">
                      Laden
                    </Button>
                  </div>
                </Tab>
                <Tab icon="add" text="Datenmodell manuell definieren">
                  Content Tab 2
                </Tab>
              </TabContainer>
            </div>
            <div
              style={{
                paddingTop: "10px",
              }}
            >
              <Title level="H3">Datenmodell</Title>
              <div>
                {/* Hier können Sie Ihren Code mit dem OData-Modell verwenden */}
                {odataModel && <pre>{JSON.stringify(odataModel, null, 2)}</pre>}
              </div>
            </div>
          </div>
        </Page>
      </div>
    </div>
  );
}

export default Metadata;
