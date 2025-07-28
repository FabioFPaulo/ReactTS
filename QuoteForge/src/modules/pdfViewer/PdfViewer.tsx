import {
  Page,
  PDFViewer,
  View,
  Text,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { memo } from "react";

type Props = {
  email: string | null;
  phone: string | null;
  title: string;
  to: string;
  budgets: string[];
  total: string;
};

function PdfView(props: Props) {
  return (
    <PDFViewer width="100%" height="99%" showToolbar={false}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text
            style={{ ...styles.header3, textAlign: "center" }}
            render={() => props.title}
          />

          <View
            style={styles.personalContainer}
            render={() =>
              props.email !== null && (
                <>
                  <Text
                    style={{
                      ...styles.paragraph,
                      width: "15%",
                      fontWeight: "bold",
                      marginBottom: props.phone ? 0 : 50,
                    }}
                  >
                    Email
                  </Text>
                  <Text style={{ ...styles.paragraph, marginBottom: 0 }}>
                    {props.email}
                  </Text>
                </>
              )
            }
          />
          <View
            style={styles.personalContainer}
            render={() =>
              props.phone !== null && (
                <>
                  <Text
                    style={{
                      ...styles.paragraph,
                      width: "15%",
                      fontWeight: "bold",
                      marginBottom: 50,
                    }}
                  >
                    Telemóvel
                  </Text>
                  <Text style={styles.paragraph}>{props.phone}</Text>
                </>
              )
            }
          />

          <View style={styles.personalContainer}>
            <Text
              style={{
                ...styles.paragraph,
                width: "25%",
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Orçamento para
            </Text>
            <Text style={styles.paragraph}>{props.to}</Text>
          </View>

          <View
            render={() =>
              props.budgets.map((budget) => (
                <Text style={styles.paragraph}>{budget}</Text>
              ))
            }
          />

          <View style={{ ...styles.personalContainer, marginTop: 50 }}>
            <Text
              style={{
                ...styles.paragraph,
                width: "50%",
                fontWeight: "bold",
              }}
            >
              Total orçamento
            </Text>
            <Text
              style={{ ...styles.paragraph, width: "50%", textAlign: "right" }}
            >
              {new Intl.NumberFormat("pt-PT", {
                style: "currency",
                currency: "EUR",
              }).format(
                Number.isNaN(Number(props.total)) ? 0 : Number(props.total),
              )}
            </Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    paddingTop: 72,
    paddingBottom: 72,
    paddingHorizontal: 72,
  },
  personalContainer: {
    display: "flex",
    flexDirection: "row",
  },
  personalLabel: {
    width: "20%",
    fontWeight: "bold",
  },
  personalValue: {
    width: "30%",
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  title2: {
    color: "#333",
    fontSize: 18,
    marginBottom: 10,
    marginTop: 20,
  },
  content: {
    fontSize: 14,
    paddingHorizontal: 20,
  },
  contentText: {
    marginBottom: 3,
  },
  header1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  header2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header3: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  header4: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  // Paragraph
  paragraph: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 3,
    textAlign: "justify",
  },
});

export default memo(PdfView);
