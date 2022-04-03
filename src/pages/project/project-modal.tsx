import styled from "@emotion/styled";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import { UserSelect } from "components/user-select";
import { useProjectModal, useProjectQueryKey } from "pages/project-list/utils";
import { useEffect } from "react";
import { useAddProject, useEditProject } from "utils/project";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();

  const useMutationProject = editingProject ? useEditProject : useAddProject;
  const {
    isLoading: mutateLoading,
    mutateAsync,
    error,
  } = useMutationProject(useProjectQueryKey());

  const [form] = useForm();
  const onFinish = (value: any) => {
    mutateAsync({ ...editingProject, ...value }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "添加项目";

  return (
    <Drawer
      forceRender
      onClose={closeModal}
      visible={projectModalOpen}
      width="100%"
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="名称"
                key={"name"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名"}></Input>
              </Form.Item>
              <Form.Item
                label="部门"
                key={"organization"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名"}></Input>
              </Form.Item>
              <Form.Item label="负责人" key={"person"} name={"personId"}>
                <UserSelect defaultOptionName="负责人"></UserSelect>
              </Form.Item>
              <Form.Item key={"submit"} style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"ghost"}
                  style={{ marginRight: "2rem" }}
                  onClick={close}
                >
                  取消
                </Button>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
