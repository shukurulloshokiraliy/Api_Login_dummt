import { Container, Text, Group, Anchor, Divider, Box } from "@mantine/core";
import { IconBrandInstagram, IconBrandFacebook, IconBrandYoutube } from "@tabler/icons-react";

const FaqFooter = () => {
  return (
    <footer
      style={{
        padding: "50px 0",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e9ecf3 100%)",
        borderTop: "1px solid #dcdfe6",
      }}
    >
      <Container size="lg">
        {/* Top */}
        <Group justify="space-between" style={{ marginBottom: 30 }} align="flex-start">
          {/* Left text */}
          <Box>
            <Text size="xl" fw={700} c="blue.7">
              YourCompany
            </Text>
            <Text size="sm" c="dimmed" mt={5} maw={300}>
              Savollaringiz bo‘lsa bemalol bog‘laning. Biz yordam berishga tayyormiz!
            </Text>

            {/* Social Icons */}
            <Group mt="md">
              <Anchor href="https://instagram.com" target="_blank">
                <IconBrandInstagram size={22} stroke={1.5} />
              </Anchor>

              <Anchor href="https://facebook.com" target="_blank">
                <IconBrandFacebook size={22} stroke={1.5} />
              </Anchor>

              <Anchor href="https://youtube.com" target="_blank">
                <IconBrandYoutube size={22} stroke={1.5} />
              </Anchor>
            </Group>
          </Box>

          {/* Links */}
          <Box>
            <Text fw={600} mb={10}>Tez linklar</Text>

            <Group gap={5} direction="column" wrap="nowrap">
              <Anchor href="/faq" size="sm" c="dark" underline="hover">
                FAQ
              </Anchor>

              <Anchor href="/privacy" size="sm" c="dark" underline="hover">
                Privacy Policy
              </Anchor>

              <Anchor href="/terms" size="sm" c="dark" underline="hover">
                Terms of Service
              </Anchor>

              <Anchor href="/contact" size="sm" c="dark" underline="hover">
                Contact
              </Anchor>
            </Group>
          </Box>
        </Group>

        <Divider my="lg" />

        {/* Bottom */}
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            © {new Date().getFullYear()} YourCompany — Barcha huquqlar himoyalangan.
          </Text>

          <Text size="xs" c="dimmed">
            Made with for FAQ page
          </Text>
        </Group>
      </Container>
    </footer>
  );
};

export default FaqFooter;
