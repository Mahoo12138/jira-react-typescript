import styled from "@emotion/styled";
import { Divider, List, Popover, Typography } from "antd";
import { ButtonNoPadding } from "components/lib";
import { useProjects } from "utils/project";

export const ProjectPopover = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProjects();

  const pinProjects = projects?.filter((pro) => pro.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>项目收藏</Typography.Text>
      <List>
        {pinProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => props.setProjectModalOpen(true)}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <h3>项目</h3>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
