import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTasksQueryKey } from "./utils";

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, editingTaskId, close } = useTaskModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const { mutateAsync: deleteTask, isLoading: deleteLoading } = useDeleteTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };
  const onDelete = async () => {
    close();
    Modal.confirm({
      title: "确定要删除该任务吗？",
      content: "点击确认删除",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return deleteTask({ id: +editingTaskId });
      },
    });
  };
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={onOk}
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          取消
        </Button>,
        editingTask ? (
          <Button
            danger
            key="delete"
            loading={deleteLoading}
            onClick={onDelete}
          >
            删除
          </Button>
        ) : null,
        <Button key={"ok"} type="primary" loading={editLoading} onClick={onOk}>
          确认
        </Button>,
      ]}
    >
      <Form {...layout} form={form} initialValues={editingTask}>
        <Form.Item
          key={"name"}
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          key={"processor"}
          label={"经办人"}
          name={"processorId"}
          rules={[{ required: true, message: "请输入经办人" }]}
        >
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item
          key={"label"}
          label={"类型"}
          name={"typeId"}
          rules={[{ required: true, message: "请输入任务类型" }]}
        >
          <TaskTypeSelect defaultOptionName="类型" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
