import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Button,
    Section,
    Text,
    Hr,
} from "@react-email/components";

interface WelcomeMailProps {
    dashboardUrl?: string;
    supportEmail?: string;
}

export const welcomeMail = ({
    dashboardUrl = "https://app.ai-dsa.com/dashboard",
    supportEmail = "support@ai-dsa.com",
}: WelcomeMailProps = {}) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                <Text style={tertiary}>Welcome to AI-DSA</Text>
                <Heading style={secondary}>"Hola User!"</Heading>
                <Text style={paragraph}>
                    Thank you for joining AI-DSA. Your account has been
                    successfully created and you're ready to start your journey
                    with us.
                </Text>

                <Section style={buttonContainer}>
                    <Button style={button} href={dashboardUrl}>
                        Get Started
                    </Button>
                </Section>

                <Hr style={divider} />

                <Section style={featuresSection}>
                    <Text style={featuresTitle}>
                        What you can do with AI-DSA:
                    </Text>
                    <Text style={featureItem}>
                        <strong>🚀 Advanced Analytics:</strong> Get insights
                        from your data
                    </Text>
                    <Text style={featureItem}>
                        <strong>🤖 AI-Powered Tools:</strong> Leverage
                        cutting-edge algorithms
                    </Text>
                    <Text style={featureItem}>
                        <strong>📊 Real-time Dashboards:</strong> Monitor your
                        progress
                    </Text>
                </Section>

                <Hr style={divider} />

                <Text style={paragraph}>
                    Need help getting started? Check out our{" "}
                    <Link href="https://docs.ai-dsa.com" style={link}>
                        documentation
                    </Link>{" "}
                    or reach out to our support team.
                </Text>

                <Text style={paragraph}>
                    Questions? Contact us at{" "}
                    <Link href={`mailto:${supportEmail}`} style={link}>
                        {supportEmail}
                    </Link>
                </Text>
            </Container>
            <Text style={footer}>Securely powered by AI-DSA.</Text>
        </Body>
    </Html>
);

const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    marginTop: "20px",
    maxWidth: "460px",
    margin: "0 auto",
    padding: "68px 40px 130px",
};

const tertiary = {
    color: "#0a85ea",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    height: "16px",
    letterSpacing: "0",
    lineHeight: "16px",
    margin: "16px 8px 8px 8px",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
};

const secondary = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "28px",
    marginBottom: "20px",
    marginTop: "0",
    textAlign: "center" as const,
};

const paragraph = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    letterSpacing: "0",
    lineHeight: "23px",
    margin: "16px 0",
    textAlign: "center" as const,
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#0a85ea",
    borderRadius: "6px",
    color: "#ffffff",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: "20px",
    padding: "14px 28px",
    textAlign: "center" as const,
    textDecoration: "none",
    display: "inline-block",
};

const divider = {
    border: "none",
    borderTop: "1px solid #eee",
    margin: "32px 0",
    width: "100%",
};

const featuresSection = {
    margin: "24px 0",
};

const featuresTitle = {
    color: "#000",
    fontSize: "16px",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontWeight: 500,
    letterSpacing: "0",
    lineHeight: "20px",
    margin: "0 0 16px 0",
    textAlign: "center" as const,
};

const featureItem = {
    color: "#444",
    fontSize: "14px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    letterSpacing: "0",
    lineHeight: "20px",
    margin: "8px 0",
    textAlign: "left" as const,
    padding: "0 20px",
};

const link = {
    color: "#0a85ea",
    textDecoration: "underline",
};

const footer = {
    color: "#000",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0",
    lineHeight: "23px",
    margin: "0",
    marginTop: "20px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
};
