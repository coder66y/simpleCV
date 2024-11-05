import { ContentConfigKeyEnum } from "../../config";
import BaseInfo from "./base-info";
import EducationInfo from "./education-info";
import Honors from "./honors";
import './index.less'
import InternshipExperience from "./internship-experience";
import ProjectExperience from "./project-experience";
import SchoolExperience from "./school-experience";
import SelfEvaluation from "./self-evaluation";
import Skills from "./skills";
import WorkExperience from "./work-experience";

export interface IShowModuleContentProps {
  configKey?: ContentConfigKeyEnum;
}

const rootClassName = 'show-module-content-wrapper'
export default function ShowModuleContent(props: IShowModuleContentProps) {
  const { configKey } = props;

  const moduleMap = new Map<ContentConfigKeyEnum, React.ReactNode>([
    [ContentConfigKeyEnum.BASIC_INFO, <BaseInfo />],
    [ContentConfigKeyEnum.EDUCATION, <EducationInfo />],
    [ContentConfigKeyEnum.WORK_EXPERIENCE, <WorkExperience />],
    [ContentConfigKeyEnum.PROJECT_EXPERIENCE, <ProjectExperience />],
    [ContentConfigKeyEnum.SCHOOL_EXPERIENCE, <SchoolExperience />],
    [ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE, <InternshipExperience />],
    [ContentConfigKeyEnum.SKILLS, <Skills />],
    [ContentConfigKeyEnum.HONOR, <Honors />],
    [ContentConfigKeyEnum.SELF_EVALUATION, <SelfEvaluation />],
  ])

  return (
    <div className={rootClassName}>
      {
       configKey ? moduleMap.get(configKey) : null
      }
    </div>
  )
}