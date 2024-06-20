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
import "@ui5/webcomponents-icons/dist/source-code";
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
            <Title>Wilkommen bei ABAP-GPT!</Title>
            <p>
              Dem interaktiven Co-Piloten zu Erstellung von modernen
              SAP-Anwendungen
            </p>
            <Title level="H3">Verfügbare Tools:</Title>

            <Card
              header={
                <CardHeader
                  interactive={true}
                  avatar={<Icon name="source-code" />}
                  subtitleText="CDS-Views generieren"
                  titleText="CDS-View"
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
                  avatar={<Icon name="palette" />}
                  titleText="Metadaten Generator"
                  subtitleText="Generiere Metadtaen für dein CDS-View"
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
                  avatar={<Icon name="source-code" />}
                  titleText="RAP Projekt"
                  subtitleText="Vollständiges RAP-Projekt erstellen"
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
                  titleText="Ask me"
                  subtitleText="AI basierter Co-Pilot"
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
