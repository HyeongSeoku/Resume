import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const printPDF = (e) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`;
  const day = `${date.getDay()}`;

  const dateString = `${year}_${month.padStart(2, "0")}_${day.padStart(
    2,
    "0"
  )}`;

  const pdfContainer = document.querySelector(".pdf-container") as HTMLElement;
  if (!pdfContainer) {
    alert("출력할 대상이 없습니다.");
    return;
  }
  pdfContainer.classList.add("visible");

  html2canvas(pdfContainer).then((canvas) => {
    // 캔버스를 이미지로 변환
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 210; // 이미지 가로 길이(mm) A4 기준
    const pageHeight = imgWidth * 1.414; // 출력 페이지 세로 길이 계산 A4 기준
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    const doc = new jsPDF("p", "mm");
    let position = 0;

    // 첫 페이지 출력
    doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 한 페이지 이상일 경우 루프 돌면서 출력
    while (heightLeft >= 20) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // 파일 저장
    doc.save(`FE Developer 김형석_${dateString}.pdf`);

    //이미지로 표현
    //document.write('<img src="'+imgData+'" />');
  });
  pdfContainer.classList.remove("visible");
};

export const intersectionFadeIn = (entry: IntersectionObserverEntry) => {};
