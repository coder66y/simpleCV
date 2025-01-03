import { Form } from "antd";
import { useTheme, useThemeDispatch } from "../../store/theme-context";
import temp1 from '@/assets/template/template-1.png'
import temp2 from '@/assets/template/template-2.png'
import temp3 from '@/assets/template/template-3.png'
import temp4 from '@/assets/template/template-4.png'
export default function TemplateSetForm({onClose}: {
  onClose?: () => void;
}) {
  const theme = useTheme();
  const dispatch = useThemeDispatch();

  const data = [
    {
      tempName: '简历模板1-经典',
      url: temp1,
      tempId: '1'
    },
    {
      tempName: '简历模板2-简洁',
      url: temp2,
      tempId: '2'
    },
    {
      tempName: '简历模板3-简洁',
      url: temp3,
      tempId: '3'
    },
    {
      tempName: '简历模板4-简洁',
      url: temp4,
      tempId: '4'
    },
  ]

  const onClickItem = (id: string) => {
    dispatch?.({
      type: 'changeThemeKey',
      payload: {
        key: "templateId",
        value: id,
      }
    })
    onClose?.()
  }

  return (
    <div className="template-set-form">
      {
        data.map(item => {
          return (
            <div
              key={item.tempId}
              className={`template-item ${theme.templateId === item.tempId ? 'active-template-item' : ''}`}
              onClick={() => {
                onClickItem(item.tempId)
              }}>
              <div className="template-item-mask">{item.tempName}</div>
              <img src={item.url} width={"100%"} alt={item.tempName}/>
            </div>
          )
        })
      }
    </div>
  )
}