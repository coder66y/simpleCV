import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const _html2Canvas = async (element: HTMLElement) => {
  return await html2canvas(element, {
    backgroundColor: "#ffffff",
    scale: window.devicePixelRatio ?? 2,
  });
}

export async function exportPdf (element: HTMLElement, filename = '未命名', callback = (output?: Blob) => {}, needSave = true) {
  if (!element) {
    callback();
    return;
  }
  // 尺寸的确定
  /** 元素主体宽 */
  const originWidth = element.offsetWidth || 700;

  // 创建一个容器，用于克隆元素
  const container = document.createElement('div');
  container.style.cssText = `position:fixed;left: ${-2 * originWidth}px; top:0;width:${originWidth}px;box-sizing:content-box;`;
  // 插入到body中
  document.body.appendChild(container);
  // 克隆元素
  container.appendChild(element.cloneNode(true));

  // 为了保证显示质量
  const scale = window.devicePixelRatio ?? 2;
  const width = originWidth;

  const PDF_WIDTH = width * scale;
  const PDF_HEIGHT = width * 1.414 * scale;

  // 渲染方法
  const render = async function () {
    const canvas = await _html2Canvas(element);
    const contentWidth = canvas.width;
    const contentHeight = canvas.height;

    // 一页pdf显示html页面生成的canvas高度
    const pageHeight = contentWidth / PDF_WIDTH * PDF_HEIGHT;

    // canvas图像在画布上的尺寸
    const imgWidth = PDF_WIDTH;
    const imgHeight = PDF_WIDTH / contentWidth * contentHeight;

    let leftHeight = contentHeight;
    let position = 0;

    const doc = new jsPDF('p', 'px', [PDF_WIDTH, PDF_HEIGHT], true);

    // 不足一页
    if (leftHeight < pageHeight) {
      doc.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight);
    } else {
      // 多页
      while (leftHeight > 0) {
        doc.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight;
        position -= PDF_HEIGHT;
        //避免添加空白页
        if (leftHeight > 0) {
          doc.addPage();
        }
      }
    }
    needSave && doc.save(filename + '.pdf');

    // 移除创建的元素
    container.remove();

    callback(doc.output('blob'));
  }

  await render()
}