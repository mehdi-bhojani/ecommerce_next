import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FileTextIcon } from "lucide-react";
import Invoice from "../admin/invoice/Template";

interface RequestEvaluationDocumentButtonProps {
  values: FormData;
  signature: string;
}

const PrintButton = ({
  values,
  signature,
}: RequestEvaluationDocumentButtonProps) => {
  const documentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => documentRef.current,
    documentTitle: `Invoice`,
    bodyClass: "p-16",
  });

  return (
    <div>
      {/* <MainButton
        onClick={() => {
          handlePrint();
        }}
        className="py-6 flex gap-2"
      >
        <FileTextIcon className="size-4" /> PDF herunterladen
      </MainButton>
      <Invoice ref={documentRef} values={values} signature={signature} /> */}
    </div>
  );
};

export default PrintButton;
