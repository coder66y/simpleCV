import { Form } from "antd";
import { useTheme, useThemeDispatch } from "../../store/theme-context";

export interface TemplateSetFormValues {
  templateCode: string;
}
export default function TemplateSetForm() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const [form] = Form.useForm<TemplateSetFormValues>()
  const initValues = {
    templateCode: "0001",
  }

  return (
    <div>
      muban13
    </div>
  )
}