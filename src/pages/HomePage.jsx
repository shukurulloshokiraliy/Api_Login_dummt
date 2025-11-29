import React, { useState } from 'react';
import { 
  Container, Title, Button, TextInput, Textarea, Group, Stack, Modal, Text,
  Loader, Center, ActionIcon, Flex, Badge, Card, SimpleGrid
} from '@mantine/core';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IconEdit, IconTrash, IconPlus, IconSearch, IconChevronDown } from '@tabler/icons-react';
import { motion } from "framer-motion";
import useAuthStore from '../store/useAuth';
import axios from 'axios';

const API = 'https://faq-crud.onrender.com/api/faqs';

const Homepage = () => {
  const [opened, setOpened] = useState(false);
  const [editId, setEditId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

  const { isAuth, user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: faqs = [], isLoading } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const { data } = await axios.get(API);
      return Array.isArray(data) ? data : data.data || [];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (newFaq) => {
      const { data } = await axios.post(API, newFaq);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      handleClose();
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`${API}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
      handleClose();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API}/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['faqs']);
    }
  });

  const handleSubmit = () => {
    if (!question.trim() || !answer.trim()) return;
    const faqData = { question: question.trim(), answer: answer.trim() };

    if (editId) updateMutation.mutate({ id: editId, data: faqData });
    else createMutation.mutate(faqData);
  };

  const handleEdit = (faq) => {
    setEditId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setOpened(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Sen o‘chirmoqchimisan?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpened(false);
    setEditId(null);
    setQuestion('');
    setAnswer('');
  };

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <Center h="100vh" style={{ backdropFilter: "blur(15px)" }}>
        <Loader size="xl" color="white" />
      </Center>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
      backdropFilter: "blur(10px)"
    }}>
      <Container size="lg">
        <Stack spacing="xl">

          {/* HEADER */}
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="md">
              <Title
                order={1}
                style={{
                  color: 'white',
                  fontWeight: '800',
                  textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                FAQ Bo‘limi
              </Title>

              {isAuth && user && (
                <Badge 
                  color="yellow"
                  size="lg"
                  radius="xl"
                  style={{ boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}
                >
                  {user.firstName}
                </Badge>
              )}
            </Flex>

            {isAuth && (
              <Button
                leftSection={<IconPlus size={20} />}
                onClick={() => setOpened(true)}
                radius="xl"
                size="lg"
                style={{
                  background: "white",
                  color: "#6366f1",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                }}
              >
                Qo‘shish
              </Button>
            )}
          </Flex>

          {/* SEARCH */}
          <TextInput
            leftSection={<IconSearch size={18} />}
            placeholder="FAQ qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            radius="xl"
            size="md"
            styles={{
              input: {
                paddingLeft: "45px",
                border: "2px solid #e5e7eb",
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)"
              }
            }}
          />

          {/* GRID */}
          <SimpleGrid
            cols={3}
            spacing="xl"
            breakpoints={[
              { maxWidth: 'md', cols: 2 },
              { maxWidth: 'sm', cols: 1 },
            ]}
          >
            {filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card
                  shadow="lg"
                  radius="xl"
                  padding="lg"
                  style={{
                    background: "rgba(255,255,255,0.35)",
                    backdropFilter: "blur(10px)",
                    border: expandedId === faq.id 
                      ? "2px solid #6366f1"
                      : "2px solid rgba(255,255,255,0.4)",
                    transition: "0.3s",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleCard(faq.id)}
                >
                  {/* Title */}
                  <Flex justify="space-between" align="center">
                    <Text weight={700} size="lg" color="#111">
                      {faq.question}
                    </Text>

                    <IconChevronDown
                      size={22}
                      style={{
                        color: "#6366f1",
                        transform:
                          expandedId === faq.id ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "0.3s"
                      }}
                    />
                  </Flex>

                  {/* Answer */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{
                      height: expandedId === faq.id ? "auto" : 0,
                      opacity: expandedId === faq.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <Text color="dimmed" size="sm" mt="md">
                      {faq.answer}
                    </Text>

                    {isAuth && (
                      <Group mt="md" spacing="xs">
                        <ActionIcon
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(faq);
                          }}
                        >
                          <IconEdit size={18} />
                        </ActionIcon>

                        <ActionIcon
                          color="red"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(faq.id);
                          }}
                        >
                          <IconTrash size={18} />
                        </ActionIcon>
                      </Group>
                    )}
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </SimpleGrid>
        </Stack>

        {/* MODAL */}
        <Modal
          opened={opened}
          onClose={handleClose}
          title={<Text weight={700} size="xl" color="#6366f1">{editId ? 'Tahrirlash' : 'Yangi FAQ'}</Text>}
          centered
          radius="lg"
          size="lg"
        >
          <Stack spacing="lg">
            <TextInput
              label="Savol"
              placeholder="Savol..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              radius="md"
            />

            <Textarea
              label="Javob"
              placeholder="Javob..."
              minRows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              radius="md"
            />

            <Group position="right">
              <Button variant="default" radius="xl" onClick={handleClose}>Bekor qilish</Button>
              <Button
                radius="xl"
                onClick={handleSubmit}
                loading={createMutation.isLoading || updateMutation.isLoading}
                style={{
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                }}
              >
                {editId ? "Saqlash" : "Yaratish"}
              </Button>
            </Group>
          </Stack>
        </Modal>
      </Container>
    </div>
  );
};

export default Homepage;
